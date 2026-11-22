// محرك التصحيح المعياري 3PL-IRT (EAP) + المزج البايزي (Empirical Bayes)
// يحاكي آلية قياس في ترجيح الأسئلة حسب صعوبتها الفعلية مع حماية ضد تحيز العينة

const C_GUESS = 0.25;          // معامل التخمين (4 خيارات)
const PRIOR_WEIGHT_K = 20;     // وزن التقدير المبدئي (20 مختبراً افتراضياً)
const EAP_PRIOR_SD = 2.2;      // انحراف التوزيع المبدئي لتقليل الانكماش عند القمم
const SCALE_BASE = 655;        // نقطة الارتكاز للدرجة المتوسطة
const SCALE_SLOPE = 1180;      // ميل التحويل (يعادل انحرافاً متوسطاً يميل للقوي)

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
 * تحويل نسبة الحل الصحيح (p) إلى معامل الصعوبة (b) في نموذج 3PL
 */
function pToB(p) {
  const pStar = clamp((p - C_GUESS) / (1 - C_GUESS), 0.04, 0.96);
  return -Math.log(pStar / (1 - pStar));
}

/**
 * احتمال الإجابة الصحيحة لطالب قدرته theta على سؤال صعوبته b
 */
function irtProb(theta, b) {
  const z = clamp(theta - b, -30, 30);
  return C_GUESS + (1 - C_GUESS) / (1 + Math.exp(-z));
}

/**
 * تقدير قدرة الطالب (theta_hat) بطريقة EAP العددية (101 نقطة تكامل)
 */
function estimateThetaEAP(itemsWithResp) {
  if (!itemsWithResp || itemsWithResp.length === 0) return 0;
  const grid = [];
  const logPosts = [];
  let maxLog = -Infinity;

  for (let k = 0; k <= 100; k++) {
    const th = -5.0 + 0.1 * k;
    grid.push(th);
    let ll = -0.5 * Math.pow(th / EAP_PRIOR_SD, 2);
    for (let i = 0; i < itemsWithResp.length; i++) {
      const { u, b } = itemsWithResp[i];
      const p = irtProb(th, b);
      ll += Math.log(u === 1 ? p : (1 - p));
    }
    logPosts.push(ll);
    if (ll > maxLog) maxLog = ll;
  }

  let sumW = 0;
  let sumThW = 0;
  for (let k = 0; k < grid.length; k++) {
    const w = Math.exp(logPosts[k] - maxLog);
    sumW += w;
    sumThW += grid[k] * w;
  }
  return sumW > 0 ? sumThW / sumW : 0;
}

/**
 * منحنى الدرجة الحقيقية (Test Characteristic Curve) عند قدرة theta
 */
function testCharacteristicPct(theta, sectionItems) {
  if (!sectionItems || sectionItems.length === 0) return 0.7;
  let sum = 0;
  for (let i = 0; i < sectionItems.length; i++) {
    sum += irtProb(theta, sectionItems[i].b);
  }
  return sum / sectionItems.length;
}

/**
 * معايرة صعوبة كل سؤال بدمج التقدير المبدئي مع بيانات الطلاب الفعلية (Empirical Bayes)
 * mode = 'qiyas'    -> حماية ضد تحيز العينة (إبقاء متوسط الصعوبة على معيار الاختبار الحقيقي مع أخذ الفروق النسبية من الطلاب)
 * mode = 'students' -> مقارنة مباشرة بمستوى طلاب الموقع
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

  // إذا كان الوضع 'qiyas'، نعيد توسيط متوسط الـ logit إلى متوسط الاختبار الحقيقي لمنع تحيز العينة (Selection Bias)
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
 * الحساب الكامل لنتيجة المحاكي بنظام 3PL-IRT (EAP) مع تشخيص تأثير كل خطأ
 */
export function calculateIRTResult(questions, answersBitstring, globalStats, mode = 'qiyas') {
  const calItems = calibrateItems(questions, globalStats, mode);
  const sciItems = calItems.filter((it) => it.section !== 'skills');
  const skillsItems = calItems.filter((it) => it.section === 'skills');

  const getU = (idx) => (answersBitstring && answersBitstring[idx] === '1') ? 1 : 0;

  const sciResp = sciItems.map((it) => ({ u: getU(it.idx), b: it.b }));
  const skillsResp = skillsItems.map((it) => ({ u: getU(it.idx), b: it.b }));

  const thSci = estimateThetaEAP(sciResp);
  const thSkills = estimateThetaEAP(skillsResp);

  const tccSci = testCharacteristicPct(thSci, sciItems);
  const tccSkills = testCharacteristicPct(thSkills, skillsItems);

  const meanPSci = sciItems.reduce((s, it) => s + it.pCal, 0) / Math.max(1, sciItems.length);
  const meanPSkills = skillsItems.reduce((s, it) => s + it.pCal, 0) / Math.max(1, skillsItems.length);

  // التحقق من الدرجة الكاملة (0 أخطاء)
  const sciAllCorrect = sciResp.every((r) => r.u === 1);
  const skillsAllCorrect = skillsResp.every((r) => r.u === 1);

  const sciScore = sciAllCorrect ? 1000 : clamp(Math.round(SCALE_BASE + (tccSci - meanPSci) * SCALE_SLOPE), 200, 995);
  const skillsScore = skillsAllCorrect ? 1000 : clamp(Math.round(SCALE_BASE + (tccSkills - meanPSkills) * SCALE_SLOPE), 200, 995);
  const totalScore = (sciAllCorrect && skillsAllCorrect) ? 1000 : Math.round(0.75 * sciScore + 0.25 * skillsScore);
  const zWeighted = (totalScore - SCALE_BASE) / 115;

  // حساب تأثير كل سؤال أخطأ فيه الطالب (كم درجة خسرها بسبب هذا السؤال تحديداً)
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
      // محاكاة: لو كان الطالب أجاب هذا السؤال صح، كم كانت سترتفع درجته؟
      if (it.section === 'skills') {
        const modResp = skillsResp.map((r, k) => (skillsItems[k].idx === it.idx ? { ...r, u: 1 } : r));
        const newTh = estimateThetaEAP(modResp);
        const newTcc = testCharacteristicPct(newTh, skillsItems);
        const newS = modResp.every((r) => r.u === 1) ? 1000 : clamp(Math.round(SCALE_BASE + (newTcc - meanPSkills) * SCALE_SLOPE), 200, 995);
        pointsLost = Math.max(1, Math.round(0.25 * (newS - skillsScore)));
      } else {
        const modResp = sciResp.map((r, k) => (sciItems[k].idx === it.idx ? { ...r, u: 1 } : r));
        const newTh = estimateThetaEAP(modResp);
        const newTcc = testCharacteristicPct(newTh, sciItems);
        const newS = modResp.every((r) => r.u === 1) ? 1000 : clamp(Math.round(SCALE_BASE + (newTcc - meanPSci) * SCALE_SLOPE), 200, 995);
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
