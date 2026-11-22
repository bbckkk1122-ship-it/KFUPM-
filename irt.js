import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateIRTResult, calibrateItems, getCalibrationStatus } from './irt.js';

// Synthetic 110-question mock: 22 skills + 88 science, pPrior spread 0.45..0.90 (deterministic).
const QUESTIONS = Array.from({ length: 110 }, (_, i) => ({
  id: `q${i + 1}`,
  section: i < 22 ? 'skills' : 'sci',
  pPrior: 0.45 + 0.45 * ((i * 37) % 110) / 109
}));
const noPrior = QUESTIONS.map(({ id, section }) => ({ id, section })); // like mock1/2/3

const bitsWithWrong = (wrong, n = 110) => {
  const b = Array(n).fill('1');
  wrong.forEach((i) => { b[i] = '0'; });
  return b.join('');
};
const total = (wrong, stats = null, mode = 'qiyas', qs = QUESTIONS) =>
  calculateIRTResult(qs, bitsWithWrong(wrong), stats, mode).totalScore;

// tiny deterministic RNG
const makeRng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);

describe('score scale anchors', () => {
  test('perfect paper = 910 for both sections and total', () => {
    const r = calculateIRTResult(QUESTIONS, bitsWithWrong([]), null);
    assert.equal(r.sciScore, 910);
    assert.equal(r.skillsScore, 910);
    assert.equal(r.totalScore, 910);
    assert.equal(r.thSci, 2.6);
  });

  test('all wrong = 300', () => {
    const r = calculateIRTResult(QUESTIONS, bitsWithWrong([...Array(110).keys()]), null);
    assert.equal(r.totalScore, 300);
  });

  test('a total is always the 75/25 blend of the rounded section scores', () => {
    const r = calculateIRTResult(QUESTIONS, bitsWithWrong([0, 5, 30, 31, 70, 100]), null);
    assert.equal(r.totalScore, Math.round(0.75 * r.sciScore + 0.25 * r.skillsScore));
  });

  test('scores always stay within 200..1000', () => {
    const rng = makeRng(7);
    for (let t = 0; t < 30; t++) {
      const wrong = [...Array(110).keys()].filter(() => rng() < rng());
      const r = calculateIRTResult(QUESTIONS, bitsWithWrong(wrong), null);
      for (const s of [r.totalScore, r.sciScore, r.skillsScore]) assert.ok(s >= 200 && s <= 1000, `score ${s}`);
    }
  });
});

describe('monotonicity (a wrong answer must never RAISE the score)', () => {
  test('no single mistake outscores a perfect paper', () => {
    const perfect = total([]);
    for (let i = 0; i < 110; i++) {
      const s = total([i]);
      assert.ok(s <= perfect, `one mistake on Q${i + 1} scored ${s} > perfect ${perfect}`);
    }
  });

  test('no paper with a single correct answer scores below the all-wrong paper', () => {
    const allWrong = [...Array(110).keys()];
    const floor = total(allWrong);
    for (let i = 0; i < 110; i += 5) {
      const s = total(allWrong.filter((x) => x !== i));
      assert.ok(s >= floor, `only Q${i + 1} correct scored ${s} < all-wrong ${floor}`);
    }
  });

  test('adding mistakes one at a time never increases the score (random orders)', () => {
    const rng = makeRng(2024);
    for (let t = 0; t < 4; t++) {
      const order = [...Array(110).keys()].sort(() => rng() - 0.5);
      // check the top end (1..8 mistakes), the middle, and the bottom end (102..110 mistakes)
      const steps = [0, 1, 2, 3, 4, 5, 6, 8, 20, 40, 55, 70, 90, 102, 105, 107, 108, 109, 110];
      let prev = Infinity;
      for (const k of steps) {
        const s = total(order.slice(0, k));
        assert.ok(s <= prev, `trial ${t}: going to ${k} mistakes raised the score ${prev} -> ${s}`);
        prev = s;
      }
    }
  });
});

describe('item difficulty weighting', () => {
  test('missing an easy question costs at least as much as missing a hard one (same section)', () => {
    const sci = calibrateItems(QUESTIONS, null).filter((x) => x.section === 'sci').sort((a, b) => a.pCal - b.pCal);
    const hard = sci[0].idx;
    const easy = sci[sci.length - 1].idx;
    assert.ok(sci[0].b > sci[sci.length - 1].b);
    assert.ok(total([easy]) <= total([hard]));
  });

  test('without pPrior every question counts the same (documents the mock1/2/3 situation)', () => {
    const cal = calibrateItems(noPrior, null);
    assert.equal(new Set(cal.map((c) => c.b.toFixed(9))).size, 1);
    assert.ok(cal.every((c) => c.pPrior === 0.7));
    // Two mistakes in the same section are interchangeable
    assert.equal(total([30, 31], null, 'qiyas', noPrior), total([60, 90], null, 'qiyas', noPrior));
  });
});

describe('calibrateItems', () => {
  test('pPrior is clamped to 0.30..0.94 and b decreases as the question gets easier', () => {
    const qs = [0.01, 0.5, 0.99].map((p, i) => ({ id: i, section: 'sci', pPrior: p }));
    const [lo, mid, hi] = calibrateItems(qs, null);
    assert.equal(lo.pPrior, 0.3);
    assert.equal(hi.pPrior, 0.94);
    assert.ok(lo.b > mid.b && mid.b > hi.b);
  });

  test('null / empty stats give the prior back', () => {
    for (const stats of [null, undefined, {}, { attempts: 0, qCorrect: [] }]) {
      const cal = calibrateItems(QUESTIONS, stats, 'students');
      cal.forEach((c) => assert.ok(Math.abs(c.pEmp - Math.min(0.96, Math.max(0.28, c.pPrior))) < 1e-12));
    }
  });

  test('student data moves difficulty toward what students actually did, with prior smoothing (K=20)', () => {
    const attempts = 20;
    const stats = { attempts, qCorrect: QUESTIONS.map(() => 20) }; // everybody got everything right
    const [first] = calibrateItems(QUESTIONS, stats, 'students');
    const expected = (20 * first.pPrior + 20) / 40;
    assert.ok(Math.abs(first.pEmp - Math.min(0.96, expected)) < 1e-12);
  });

  test('qCorrect larger than attempts is clamped; wrong-length qCorrect does not crash', () => {
    const cal = calibrateItems(QUESTIONS, { attempts: 5, qCorrect: [999] }, 'students');
    assert.ok(cal[0].pEmp <= 0.96);
    assert.equal(cal.length, 110);
    assert.doesNotThrow(() => calibrateItems(QUESTIONS, { attempts: 5, qCorrect: [1, 2, 3] }, 'qiyas'));
  });

  test("'qiyas' mode re-centres sample bias; 'students' mode does not", () => {
    const stats = { attempts: 200, qCorrect: QUESTIONS.map(() => 190) }; // a very strong sample
    const meanB = (mode) => {
      const c = calibrateItems(QUESTIONS, stats, mode);
      return c.reduce((s, x) => s + x.b, 0) / c.length;
    };
    const prior = calibrateItems(QUESTIONS, null, 'qiyas');
    const meanPrior = prior.reduce((s, x) => s + x.b, 0) / prior.length;
    assert.ok(meanB('students') < meanPrior - 0.3, 'students mode should see the test as much easier');
    assert.ok(Math.abs(meanB('qiyas') - meanPrior) < 0.25, 'qiyas mode should stay close to the prior difficulty');
  });

  test('same answers score lower in students mode when the sample found the test easy', () => {
    const stats = { attempts: 200, qCorrect: QUESTIONS.map(() => 190) };
    const wrong = [3, 9, 27, 40, 41, 77, 80];
    assert.ok(total(wrong, stats, 'students') < total(wrong, stats, 'qiyas'));
  });
});

describe('calibration over a simulated cohort', () => {
  test('students of average ability (theta = 0) score about 650 on average', () => {
    const cal = calibrateItems(QUESTIONS, null);
    const rng = makeRng(99);
    const D = 1.702, a = 0.65, c = 0.25;
    let sum = 0;
    const N = 120;
    for (let s = 0; s < N; s++) {
      const wrong = [];
      cal.forEach((it, i) => {
        const q = 1 / (1 + Math.exp(-D * a * (0 - it.b)));
        if (rng() >= c + (1 - c) * q) wrong.push(i);
      });
      sum += total(wrong);
    }
    const mean = sum / N;
    assert.ok(Math.abs(mean - 650) < 25, `mean score ${mean.toFixed(1)} should be near 650`);
  });
});

describe('itemDiagnostics', () => {
  test('wrong answers lose >= 1 point, correct answers lose 0, and every question has an entry', () => {
    const wrong = [2, 25, 60];
    const r = calculateIRTResult(QUESTIONS, bitsWithWrong(wrong), null);
    assert.equal(Object.keys(r.itemDiagnostics).length, 110);
    for (let i = 0; i < 110; i++) {
      const d = r.itemDiagnostics[i];
      if (wrong.includes(i)) assert.ok(d.pointsLost >= 1);
      else assert.equal(d.pointsLost, 0);
      assert.ok(['مرتفع', 'متوسط', 'منخفض'].includes(d.impactLevel));
    }
  });

  test('missing or short bitstrings are treated as wrong, not as a crash', () => {
    assert.doesNotThrow(() => calculateIRTResult(QUESTIONS, '', null));
    assert.doesNotThrow(() => calculateIRTResult(QUESTIONS, null, null));
    assert.equal(calculateIRTResult(QUESTIONS, '', null).totalScore, 300);
  });
});

describe('getCalibrationStatus', () => {
  test('thresholds at 5 and 25 attempts', () => {
    assert.match(getCalibrationStatus(0).label, /مبدئية/);
    assert.match(getCalibrationStatus(4).label, /مبدئية/);
    assert.match(getCalibrationStatus(5).label, /هجينة/);
    assert.match(getCalibrationStatus(24).label, /هجينة/);
    assert.match(getCalibrationStatus(25).label, /عالية الدقة/);
  });
  test('junk input is treated as zero attempts', () => {
    assert.match(getCalibrationStatus(undefined).label, /مبدئية/);
    assert.match(getCalibrationStatus('abc').label, /مبدئية/);
  });
});
