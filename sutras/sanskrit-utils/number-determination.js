// Utility: number-determination.js supports 1.2.58–1.2.63 optional and enforced number logic

const PRONOUN_ASMAD_FORMS = new Set(['asmad', 'अस्मद्']);

// ==================== ASTRAL LEXICAL SETS (1.2.60–1.2.63) ====================
// Store both IAST & Devanagari variants; normalization is light (trim + lowercase)
const STAR_SETS = {
  PHALGUNI: new Set(['phalgunī','फाल्गुनी','phalguṇī']),
  PROSTHAPADA: new Set(['proṣṭhapadā','प्रोष्ठपदा','proshthapada']),
  PUNARVASU: new Set(['punarvasū','पुनर्वसू','punarvasu']),
  VISAKHA: new Set(['viśākhā','विशाखा','visakha','vishakha']),
  TISYA: new Set(['tiṣya','तिष्य','tishya','tiśya'])
};

function normalizeTerm(term){
  if (typeof term !== 'string') return '';
  return term.trim().toLowerCase();
}

function isNakshatraDomain(context={}) {
  return context.domain === 'nakshatra' || context.semanticCategory === 'nakshatra';
}

function inAnyStarSet(term, sets) {
  const norm = normalizeTerm(term);
  return sets.some(set => Array.from(set).some(v => normalizeTerm(v) === norm));
}

function detectStarGroup(term){
  const norm = normalizeTerm(term);
  for (const [key,set] of Object.entries(STAR_SETS)) {
    for (const v of set){ if (normalizeTerm(v) === norm) return key; }
  }
  return null;
}

// ==================== SUTRA 1.2.60 ====================
export function applySutra1_2_60(term, context = {}) {
  const res = {
    sutra: '1.2.60', applied: false, baseTerm: term, numberOptions: [], semanticPlural: false, explanation: ''
  };
  if (!term || typeof term !== 'string'){ res.explanation='Invalid term'; return res; }
  if (!isNakshatraDomain(context)) { res.explanation='Not nakshatra domain'; return res; }
  const group = detectStarGroup(term);
  const isPhalguni = group === 'PHALGUNI';
  const isProsth = group === 'PROSTHAPADA';
  if (!(isPhalguni || isProsth)) { res.explanation='Not Phalgunī/Proṣṭhapadā pair'; return res; }
  // Dual form (assumed input) can convey plural sense optionally.
  res.numberOptions = ['dual'];
  res.semanticPlural = true; // indicates plural sense allowed
  res.applied = true;
  res.explanation = 'Dual star name optionally conveys plural sense (1.2.60)';
  return res;
}

// ==================== SUTRA 1.2.61 & 1.2.62 (optional singular in chandas) ====================
function optionalSingularForDualStar(term, targetGroups, sutraId, context={}) {
  const res = { sutra: sutraId, applied:false, baseTerm: term, numberOptions: [], optionalSingular:false, explanation:'' };
  if (!term || typeof term !== 'string'){ res.explanation='Invalid term'; return res; }
  if (!isNakshatraDomain(context)) { res.explanation='Not nakshatra domain'; return res; }
  if (!context.chandas) { res.explanation='Not chandas context'; return res; }
  const group = detectStarGroup(term);
  if (!targetGroups.includes(group)) { res.explanation='Not target star pair'; return res; }
  // Singular form optionally stands for dual: expose both options
  res.numberOptions = ['singular','dual'];
  res.optionalSingular = true;
  res.applied = true;
  res.explanation = 'Singular optionally represents dual star pair in chandas';
  return res;
}

export function applySutra1_2_61(term, context={}) { return optionalSingularForDualStar(term, ['PUNARVASU'], '1.2.61', context); }
export function applySutra1_2_62(term, context={}) { return optionalSingularForDualStar(term, ['VISAKHA'], '1.2.62', context); }

// ==================== SUTRA 1.2.63 (enforced dual in dvandva) ====================
function parseCompoundInput(compound){
  if (!compound) return { type:null, members:[] };
  if (typeof compound === 'string') {
    const rawParts = compound.split(/[+\s]+/).map(s=>s).filter(Boolean);
    const members = rawParts.map(p=>({ lemma:p }));
    return { type:'unknown', members };
  }
  return compound;
}

function hasLemma(members, group){
  return members.some(m => group === detectStarGroup(m.lemma || ''));
}

export function applySutra1_2_63(compoundOrString, context={}) {
  const res = { sutra:'1.2.63', applied:false, enforcedNumber:'dual', replaced:false, explanation:'', originalNumber:null };
  const data = parseCompoundInput(compoundOrString);
  if (!Array.isArray(data.members) || !data.members.length){ res.explanation='Invalid compound'; return res; }
  if (!isNakshatraDomain(context)) { res.explanation='Not nakshatra domain'; return res; }
  // Need both Tiṣya and Punarvasū present.
  const hasTisya = hasLemma(data.members,'TISYA');
  const hasPunarvasu = hasLemma(data.members,'PUNARVASU');
  if (!(hasTisya && hasPunarvasu)) { res.explanation='Not Tiṣya+Punarvasu dvandva'; return res; }
  // Determine if plural present (surface or context.number === 'plural').
  const surfacePlural = context.number === 'plural' || data.members.some(m => m.number === 'plural');
  if (surfacePlural) {
    res.replaced = true;
    res.originalNumber = 'plural';
    res.applied = true;
    res.explanation = 'Plural replaced by mandatory dual in Tiṣya+Punarvasu dvandva';
    return res;
  }
  // Even if already dual we still mark applied (enforcement context)
  res.applied = true;
  res.explanation = 'Dual enforced (rule context) for Tiṣya+Punarvasu dvandva';
  return res;
}

export function determineOptionalNumber(term, context = {}) {
  const res = {
    sutra: '1.2.58',
    applied: false,
    baseTerm: term,
    numberOptions: [],
    optionalPlural: false,
    explanation: ''
  };
  if (typeof term !== 'string' || !term) {
    res.explanation = 'Invalid term';
    return res;
  }
  const isClass = context.isClassNoun || context.semanticCategory === 'jati';
  if (!isClass) {
    res.explanation = 'Not a class noun';
    return res;
  }
  res.numberOptions = ['singular', 'plural'];
  res.optionalPlural = true;
  res.applied = true;
  res.explanation = 'Class noun allows optional plural for singular sense';
  return res;
}

export function extendOptionalNumberWithAsmad(term, priorResult, context = {}) {
  const res = {
    sutra: '1.2.59',
    applied: false,
    numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : [],
    explanation: ''
  };
  if (typeof term !== 'string' || !term) {
    res.explanation = 'Invalid term';
    return res;
  }
  const normalized = term.trim();
  const isAsmad = PRONOUN_ASMAD_FORMS.has(normalized);
  if (!isAsmad) {
    res.explanation = 'Not asmad pronoun';
    return res;
  }
  if (!res.numberOptions.length) res.numberOptions = ['singular'];
  if (!res.numberOptions.includes('plural')) res.numberOptions.push('plural');
  res.applied = true;
  res.explanation = 'Asmad pronoun allows optional plural even for singular/dual sense';
  return res;
}

export default { determineOptionalNumber, extendOptionalNumberWithAsmad, applySutra1_2_60, applySutra1_2_61, applySutra1_2_62, applySutra1_2_63 };
