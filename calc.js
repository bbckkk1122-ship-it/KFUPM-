// Pure calculation logic for the early Tahsili score calculator.
// No DOM access and no shared state: everything is passed in as arguments.

export const TOTAL_SKILLS = 22;
export const TOTAL_SCI = 88;
export const WEIGHT_SKILLS = 0.25;
export const WEIGHT_SCI = 0.75;

export const SD_CONFIG = {
  weak:   { skills: 3.2, sci: 11.0, visualSpread: 1.35, label: 'ضعيف' },
  medium: { skills: 2.5, sci: 8.5,  visualSpread: 1.0,  label: 'متوسط' },
  strong: { skills: 1.9, sci: 6.5,  visualSpread: 0.72, label: 'قوي' }
};

export const DEFAULT_STATE = {
  skillsConfirmed: 0,
  skillsUncertain: 0,
  sciConfirmed: 0,
  sciUncertain: 0,
  avgMistakes: 25,
  sdMode: 'medium',
  maxCap: 1000
};

// Error function approximation (Abramowitz-Stegun 7.1.26)
export function erf(x) {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function normalCDF(z) {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// uncertainErrorFactor: share of uncertain questions assumed wrong (0, 0.5, 1)
export function calculateScenario(state, uncertainErrorFactor) {
  const sd = SD_CONFIG[state.sdMode] || SD_CONFIG.medium;
  const meanSkillsCorrect = TOTAL_SKILLS - (state.avgMistakes * 0.20);
  const meanSciCorrect = TOTAL_SCI - (state.avgMistakes * 0.80);

  const userSkillsCorrect = clamp(
    TOTAL_SKILLS - (state.skillsConfirmed + state.skillsUncertain * uncertainErrorFactor),
    0,
    TOTAL_SKILLS
  );
  const userSciCorrect = clamp(
    TOTAL_SCI - (state.sciConfirmed + state.sciUncertain * uncertainErrorFactor),
    0,
    TOTAL_SCI
  );

  const zSkills = (userSkillsCorrect - meanSkillsCorrect) / sd.skills;
  const zSci = (userSciCorrect - meanSciCorrect) / sd.sci;

  const is1000 = state.maxCap === 1000;
  const center = is1000 ? 650 : 617.5;
  const step = is1000 ? 100 : 95;

  const skillsScore = clamp(center + zSkills * step, 0, state.maxCap);
  const sciScore = clamp(center + zSci * step, 0, state.maxCap);
  const totalScore = WEIGHT_SKILLS * skillsScore + WEIGHT_SCI * sciScore;

  const zWeighted = WEIGHT_SKILLS * zSkills + WEIGHT_SCI * zSci;

  return {
    skillsScore: Math.round(skillsScore),
    sciScore: Math.round(sciScore),
    totalScore: Math.round(totalScore),
    userSkillsCorrect,
    userSciCorrect,
    totalCorrect: userSkillsCorrect + userSciCorrect,
    zWeighted
  };
}
