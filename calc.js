import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_STATE,
  SD_CONFIG,
  TOTAL_SCI,
  TOTAL_SKILLS,
  calculateScenario,
  clamp,
  erf,
  normalCDF
} from './calc.js';

const makeState = (overrides = {}) => ({ ...DEFAULT_STATE, ...overrides });
const approx = (actual, expected, tol = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `expected ${actual} to be within ${tol} of ${expected}`
  );

describe('calculateScenario: happy path', () => {
  test('perfect paper with default settings', () => {
    const r = calculateScenario(makeState(), 0);
    assert.equal(r.skillsScore, 850);
    assert.equal(r.sciScore, 885);
    assert.equal(r.totalScore, 876);
    assert.equal(r.totalCorrect, 110);
    approx(r.zWeighted, 2.26);
  });

  test('errors exactly at the student average give Z = 0 and a score of 650', () => {
    // avgMistakes 25 => 5 skills errors and 20 science errors on average
    const r = calculateScenario(makeState({ skillsConfirmed: 5, sciConfirmed: 20 }), 0);
    approx(r.zWeighted, 0, 1e-9);
    assert.equal(r.skillsScore, 650);
    assert.equal(r.sciScore, 650);
    assert.equal(r.totalScore, 650);
    assert.equal(r.totalCorrect, 85);
  });

  test('scores rise as confirmed errors fall', () => {
    const worse = calculateScenario(makeState({ sciConfirmed: 15 }), 0);
    const better = calculateScenario(makeState({ sciConfirmed: 5 }), 0);
    assert.ok(better.sciScore > worse.sciScore);
    assert.ok(better.totalScore > worse.totalScore);
    assert.ok(better.zWeighted > worse.zWeighted);
  });

  test('does not mutate the state it is given', () => {
    const state = makeState({ sciConfirmed: 7, sciUncertain: 3 });
    const snapshot = structuredClone(state);
    calculateScenario(state, 0.5);
    assert.deepEqual(state, snapshot);
  });
});

describe('calculateScenario: uncertain questions', () => {
  const state = makeState({
    sciConfirmed: 8,
    sciUncertain: 10,
    skillsConfirmed: 2,
    skillsUncertain: 4
  });

  test('optimistic >= expected >= worst for score, Z and correct count', () => {
    const opt = calculateScenario(state, 0);
    const mid = calculateScenario(state, 0.5);
    const worst = calculateScenario(state, 1);
    assert.ok(opt.totalScore >= mid.totalScore && mid.totalScore >= worst.totalScore);
    assert.ok(opt.zWeighted > mid.zWeighted && mid.zWeighted > worst.zWeighted);
    assert.ok(opt.totalCorrect > mid.totalCorrect && mid.totalCorrect > worst.totalCorrect);
  });

  test('raw correct counts follow the error factor', () => {
    assert.equal(calculateScenario(state, 0).userSciCorrect, 80);   // 88 - 8
    assert.equal(calculateScenario(state, 0.5).userSciCorrect, 75); // 88 - 8 - 5
    assert.equal(calculateScenario(state, 1).userSciCorrect, 70);   // 88 - 8 - 10
    assert.equal(calculateScenario(state, 0.5).userSkillsCorrect, 18); // 22 - 2 - 2
  });

  test('the three scenarios are identical when nothing is uncertain', () => {
    const plain = makeState({ sciConfirmed: 12, skillsConfirmed: 3 });
    const a = calculateScenario(plain, 0);
    const b = calculateScenario(plain, 0.5);
    const c = calculateScenario(plain, 1);
    assert.deepEqual(a, b);
    assert.deepEqual(b, c);
  });

  test('fractional correct counts (odd number of uncertain questions) are handled', () => {
    const odd = makeState({ sciUncertain: 3 });
    const r = calculateScenario(odd, 0.5);
    assert.equal(r.userSciCorrect, 86.5);
  });
});

describe('calculateScenario: clamping and boundaries', () => {
  test('all questions wrong floors every score at 0', () => {
    const r = calculateScenario(
      makeState({ sciConfirmed: TOTAL_SCI, skillsConfirmed: TOTAL_SKILLS }),
      0
    );
    assert.equal(r.skillsScore, 0);
    assert.equal(r.sciScore, 0);
    assert.equal(r.totalScore, 0);
    assert.equal(r.totalCorrect, 0);
  });

  test('an easy-looking paper on a very hard test is capped at 1000', () => {
    // avgMistakes 50 => student mean is far below a perfect paper
    const r = calculateScenario(makeState({ avgMistakes: 50 }), 0);
    assert.equal(r.skillsScore, 1000);
    assert.equal(r.sciScore, 1000);
    assert.equal(r.totalScore, 1000);
  });

  test('the conservative cap limits scores to 950', () => {
    const r = calculateScenario(makeState({ avgMistakes: 50, maxCap: 950 }), 0);
    assert.equal(r.skillsScore, 950);
    assert.equal(r.sciScore, 950);
    assert.equal(r.totalScore, 950);
  });

  test('the 950 cap uses its own center and step', () => {
    const r = calculateScenario(makeState({ maxCap: 950, skillsConfirmed: 5, sciConfirmed: 20 }), 0);
    assert.equal(r.skillsScore, 618); // 617.5 rounds to 618
    assert.equal(r.sciScore, 618);
  });

  test('confirmed + uncertain equal to the section total works at the extremes', () => {
    const state = makeState({ sciConfirmed: 40, sciUncertain: 48 });
    assert.equal(calculateScenario(state, 0).userSciCorrect, 48);
    assert.equal(calculateScenario(state, 1).userSciCorrect, 0);
  });

  test('section scores never leave the 0..cap range across a sweep of inputs', () => {
    for (const maxCap of [1000, 950]) {
      for (let sci = 0; sci <= TOTAL_SCI; sci += 11) {
        for (let skills = 0; skills <= TOTAL_SKILLS; skills += 2) {
          for (const avgMistakes of [10, 25, 50]) {
            const r = calculateScenario(
              makeState({ sciConfirmed: sci, skillsConfirmed: skills, avgMistakes, maxCap }),
              0
            );
            for (const s of [r.skillsScore, r.sciScore, r.totalScore]) {
              assert.ok(s >= 0 && s <= maxCap, `score ${s} outside 0..${maxCap}`);
            }
          }
        }
      }
    }
  });

  test('an unknown sdMode falls back to the medium curve', () => {
    const weird = calculateScenario(makeState({ sdMode: 'extreme', sciConfirmed: 10 }), 0);
    const medium = calculateScenario(makeState({ sdMode: 'medium', sciConfirmed: 10 }), 0);
    assert.deepEqual(weird, medium);
  });

  test('correct counts are clamped to 0..section total even for inconsistent input', () => {
    // 80 confirmed + 20 uncertain science errors = 100 > 88 questions
    const r = calculateScenario(makeState({ sciConfirmed: 80, sciUncertain: 20 }), 1);
    assert.equal(r.userSciCorrect, 0);
    assert.ok(r.totalCorrect >= 0);
    assert.equal(calculateScenario(makeState({ sciConfirmed: -5 }), 0).userSciCorrect, TOTAL_SCI);
  });
});

describe('calculateScenario: test difficulty and curve strength', () => {
  test('a harder test (higher student average errors) raises the score for the same paper', () => {
    const easy = calculateScenario(makeState({ avgMistakes: 20, sciConfirmed: 15 }), 0);
    const hard = calculateScenario(makeState({ avgMistakes: 38, sciConfirmed: 15 }), 0);
    assert.ok(hard.totalScore > easy.totalScore);
    assert.ok(hard.zWeighted > easy.zWeighted);
  });

  test('stronger curve amplifies an above-average paper: weak < medium < strong', () => {
    const z = (sdMode) => calculateScenario(makeState({ sdMode }), 0).zWeighted;
    assert.ok(z('weak') < z('medium'));
    assert.ok(z('medium') < z('strong'));
  });

  test('stronger curve punishes a below-average paper more', () => {
    const base = { sciConfirmed: 30, skillsConfirmed: 10 };
    const z = (sdMode) => calculateScenario(makeState({ ...base, sdMode }), 0).zWeighted;
    assert.ok(z('strong') < z('medium'));
    assert.ok(z('medium') < z('weak'));
    assert.ok(z('weak') < 0);
  });

  test('zWeighted is the 25/75 blend of the two section Z values', () => {
    // skills exactly average (z = 0), science perfect (z = 20 / 8.5)
    const r = calculateScenario(makeState({ skillsConfirmed: 5 }), 0);
    approx(r.zWeighted, 0.75 * (20 / SD_CONFIG.medium.sci), 1e-9);
  });

  test('a student average split follows the 20/80 skills/science weighting', () => {
    // With avgMistakes = 10: mean skills correct = 20, mean science correct = 80.
    const r = calculateScenario(makeState({ avgMistakes: 10, skillsConfirmed: 2, sciConfirmed: 8 }), 0);
    approx(r.zWeighted, 0, 1e-9);
  });
});

describe('helpers', () => {
  test('erf(0) is 0 and erf is odd', () => {
    // The Abramowitz-Stegun approximation is accurate to ~1.5e-7, so erf(0) is only near 0.
    approx(erf(0), 0, 1e-7);
    approx(erf(0.7), -erf(-0.7), 1e-12);
  });

  test('erf approaches +-1 at large magnitudes', () => {
    approx(erf(6), 1, 1e-6);
    approx(erf(-6), -1, 1e-6);
  });

  test('erf matches a known value', () => {
    approx(erf(1), 0.8427, 1e-4);
  });

  test('normalCDF(0) is 0.5', () => {
    approx(normalCDF(0), 0.5, 1e-7);
  });

  test('normalCDF matches known quantiles', () => {
    approx(normalCDF(1.96), 0.975, 1e-3);
    approx(normalCDF(-1.96), 0.025, 1e-3);
    approx(normalCDF(1), 0.8413, 1e-3);
  });

  test('normalCDF is symmetric and monotonic', () => {
    for (const z of [0.3, 1, 2.26, 3.5]) {
      approx(normalCDF(z) + normalCDF(-z), 1, 1e-7);
    }
    let prev = -Infinity;
    for (let z = -5; z <= 5; z += 0.25) {
      const v = normalCDF(z);
      assert.ok(v > prev, `CDF not increasing at z=${z}`);
      prev = v;
    }
  });

  test('normalCDF stays within [0, 1] for extreme inputs', () => {
    for (const z of [-40, -10, 10, 40]) {
      const v = normalCDF(z);
      assert.ok(v >= 0 && v <= 1);
    }
  });

  test('clamp keeps values in range and passes in-range values through', () => {
    assert.equal(clamp(5, 0, 10), 5);
    assert.equal(clamp(-3, 0, 10), 0);
    assert.equal(clamp(14, 0, 10), 10);
    assert.equal(clamp(0, 0, 10), 0);
    assert.equal(clamp(10, 0, 10), 10);
  });
});
