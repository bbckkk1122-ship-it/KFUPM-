// محرك التصحيح المعياري الصرف: 3PL-IRT (Warm's WLE) على التوزيع الطبيعي المعياري N(0, 1)
// المقياس القياسي المعتمد: الدرجة = 650 + 100 × theta (بدون تضخيم اصطناعي للسقف)

const D_CONST = 1.702;         // ثابت التحويل بين الدالة اللوجستية والمنحنى الطبيعي
const A_DISC = 0.65;           // معامل التمييز القياسي (يعطي تشتتاً طبيعياً ~16 خطأ لـ 110 أسئلة)
const C_GUESS = 0.25;          // معامل التخمين (4 خيارات)
const PRIOR_WEIGHT_K = 20;     // وزن التقدير المبدئي في المزج البايزي (Empirical Bayes)
const SCALE_MEAN = 650;        // المتوسط المعياري على مقياس 1000
const SCALE_SD = 100;          // الانحراف المعياري القياسي للمقياس (كل 1σ = 100 درجة)

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function logit(p) {
  const pc = clamp(p, 0.01, 0.99);
  return Math.log(pc / (1 - pc));
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-clamp(x, -30, 30)));
}

/**
 * تقريب دالة الخطأ erf لحساب التوزيع الطبيعي التراكمي Phi بدقة عالية
 */
function normalCDF(z) {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

function inverseNormalCDF(p) {
  let lo = -4.0;
  let hi = 4.0;
  for (let i = 0; i < 40; i++) {
    const mid = 0.5 * (lo + hi);
    if (normalCDF(mid) < p) lo = mid;
    else hi = mid;
  }
  return 0.5 * (lo + hi);
}

/**
 * تحويل نسبة الحل الصحيح (p) إلى معامل الصعوبة الحقيقي (b) على توزيع N(0, 1)
 * باستخدام العلاقة الدقيقة: E[Phi(a*(theta - b))] = Phi(-a*b / sqrt(1 + a^2)) = p*
 */
function pToB(p) {
  const pStar = clamp((p - C_GUESS) / (1 - C_GUESS), 0.04, 0.96);
  const zP = inverseNormalCDF(pStar);
  return (-zP * Math.sqrt(1 + A_DISC * A_DISC)) / A_DISC;
}

/**
 * تقدير قدرة الطالب (theta_hat) باستخدام مقدّر Warm's WLE غير المتحيّز (1989)
 */
function estimateThetaWLE(itemsWithResp) {
  if (!itemsWithResp || itemsWithResp.length === 0) return 0;

  let uSum = 0;
  for (let i = 0; i < itemsWithResp.length; i++) uSum += itemsWithResp[i].u;
  if (uSum === itemsWithResp.length) return 2.6;   // سقف معياري للدرجة الكاملة (910)
  if (uSum === 0) return -3.5;

  const wleScore = (th) => {
    let s = 0;
    let info = 0;
    let jTerm = 0;
    for (let i = 0; i < itemsWithResp.length; i++) {
      const { u, b } = itemsWithResp[i];
      const z = clamp(D_CONST * A_DISC * (th - b), -30, 30);
      const q = 1 / (1 + Math.exp(-z));
      const p = C_GUESS + (1 - C_GUESS) * q;
      const p1 = D_CONST * A_DISC * (1 - C_GUESS) * q * (1 - q);
      const p2 = D_CONST * A_DISC * p1 * (1 - 2 * q);
      const denom = p * (1 - p);
      if (denom < 1e-9) continue;
      s += (u - p) * (p1 / denom);
      info += (p1 * p1) / denom;
      jTerm += (p1 * p2) / denom;
    }
    const biasCorr = info > 1e-9 ? jTerm / (2 * info) : 0;
    return s + biasCorr;
  };

  let lo = -4.0;
  let hi = 4.0;
  for (let iter = 0; iter < 38; iter++) {
    const mid = 0.5 * (lo + hi);
    if (wleScore(mid) > 0) lo = mid;
    else hi = mid;
  }
  return 0.5 * (lo + hi);
}

/**
 * التحويل المعياري المباشر من القدرة (theta) إلى الدرجة (200 - 1000)
 */
function scoreFromTheta(theta) {
  return clamp(Math.round(SCALE_MEAN + SCALE_SD * theta), 200, 1000);
}

/**
 * معايرة صعوبة كل سؤال بدمج التقدير المبدئي مع بيانات الطلاب الفعلية (Empirical Bayes)
 */
export function calibrateItems(questions, globalStats, mode = 'qiyas') {
  const attempts = (globalStats && Number(globalStats.attempts)) || 0;
  const qCorrect = (globalStats && Array.isArray(globalStats.qCorrect)) ? globalStats.qCorrect : null;

  const rawEmp = questions.map((q, idx) => {
    const pPrior = typeof q.pPrior === 'number' ? clamp(q.pPrior, 0.30, 0.94) : 0.70;
    let pEmp = pPrior;
    if (attempts > 0 && qCorrect && typeof qCorrect[idx] === 'number') {
      const c = clamp(qCorrect[idx], 0, attempts);
      pEmp = (PRIOR_WEIGHT_K * pPrior + c) / (PRIOR_WEIGHT_K + attempts);
    }
    return {
      idx,
      id: q.id,
      section: q.section,
      pPrior,
      pEmp: clamp(pEmp, 0.28, 0.96)
    };
  });

  // في وضع 'qiyas'، نعيد توسيط متوسط الـ logit إلى معيار الاختبار الحقيقي لمنع تحيّز العينة
  let shift = 0;
  if (mode === 'qiyas' && attempts > 0 && qCorrect) {
    const meanLogitEmp = rawEmp.reduce((s, it) => s + logit(it.pEmp), 0) / rawEmp.length;
    const meanLogitPrior = rawEmp.reduce((s, it) => s + logit(it.pPrior), 0) / rawEmp.length;
    shift = meanLogitEmp - meanLogitPrior;
  }

  return rawEmp.map((it) => {
    const pCal = mode === 'qiyas' ? clamp(sigmoid(logit(it.pEmp) - shift), 0.28, 0.96) : it.pEmp;
    return {
      ...it,
      pCal,
      b: pToB(pCal)
    };
  });
}

/**
 * حالة المعايرة بناءً على حجم العينة في Google Sheets
 */
export function getCalibrationStatus(attempts) {
  const n = Number(attempts) || 0;
  if (n < 5) {
    return {
      label: `معايرة مبدئية ذكية (العينة الحالية: ${n} مختبرين)`,
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }
  if (n < 25) {
    return {
      label: `معايرة هجينة متنامية (العينة الحالية: ${n} مختبراً)`,
      badgeClass: 'bg-teal-50 text-teal-800 border-teal-200'
    };
  }
  return {
    label: `معايرة عالية الدقة بناءً على أداء الطلاب (${n} مختبراً)`,
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  };
}

/**
 * الحساب الكامل لنتيجة المحاكي بنظام 3PL-IRT (Warm's WLE) على المقياس القياسي الصرف (650 + 100θ)
 */
export function calculateIRTResult(questions, answersBitstring, globalStats, mode = 'qiyas') {
  const calItems = calibrateItems(questions, globalStats, mode);
  const sciItems = calItems.filter((it) => it.section !== 'skills');
  const skillsItems = calItems.filter((it) => it.section === 'skills');

  const getU = (idx) => (answersBitstring && answersBitstring[idx] === '1') ? 1 : 0;

  const sciResp = sciItems.map((it) => ({ u: getU(it.idx), b: it.b }));
  const skillsResp = skillsItems.map((it) => ({ u: getU(it.idx), b: it.b }));

  const thSci = estimateThetaWLE(sciResp);
  const thSkills = estimateThetaWLE(skillsResp);

  const sciScore = scoreFromTheta(thSci);
  const skillsScore = scoreFromTheta(thSkills);
  const totalScore = Math.round(0.75 * sciScore + 0.25 * skillsScore);
  const zWeighted = 0.75 * thSci + 0.25 * thSkills;

  // حساب تأثير كل سؤال أخطأ فيه الطالب بدقة (كم درجة خسرها بسبب هذا السؤال تحديداً)
  const itemDiagnostics = {};
  for (let i = 0; i < calItems.length; i++) {
    const it = calItems[i];
    const u = getU(it.idx);
    const pctCorrect = Math.round(it.pEmp * 100);
    let impactLevel = 'متوسط';
    let impactColor = 'bg-amber-50 text-amber-800 border-amber-200';
    if (it.pCal >= 0.76) {
      impactLevel = 'مرتفع';
      impactColor = 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (it.pCal <= 0.56) {
      impactLevel = 'منخفض';
      impactColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }

    let pointsLost = 0;
    if (u === 0) {
      if (it.section === 'skills') {
        const modResp = skillsResp.map((r, k) => (skillsItems[k].idx === it.idx ? { ...r, u: 1 } : r));
        const newS = scoreFromTheta(estimateThetaWLE(modResp));
        pointsLost = Math.max(1, Math.round(0.25 * (newS - skillsScore)));
      } else {
        const modResp = sciResp.map((r, k) => (sciItems[k].idx === it.idx ? { ...r, u: 1 } : r));
        const newS = scoreFromTheta(estimateThetaWLE(modResp));
        pointsLost = Math.max(1, Math.round(0.75 * (newS - sciScore)));
      }
    }

    itemDiagnostics[it.idx] = {
      pctCorrect,
      impactLevel,
      impactColor,
      pointsLost
    };
  }

  return {
    totalScore,
    sciScore,
    skillsScore,
    zWeighted,
    thSci,
    thSkills,
    itemDiagnostics
  };
}
