// Utility: eka-shesha-determination.js supports ekaśeṣa rules 1.2.64–1.2.73 (base rule implemented here)
// Phase 1: Implement base identical-form retention (1.2.64). Later sutras will extend with specialization & precedence.

function toArray(input) {
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') {
    return input.split(/[+\s]+/).filter(Boolean);
  }
  return [];
}

function normalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str.trim().toLowerCase();
}

function extractSurface(item) {
  if (item == null) return '';
  if (typeof item === 'string') return item;
  // word object { lemma, form, surface }
  return item.surface || item.form || item.lemma || '';
}

function allSameNormalized(forms) {
  if (forms.length < 2) return false; // need at least two
  const first = normalize(forms[0]);
  if (!first) return false;
  for (let i=1;i<forms.length;i++) {
    if (normalize(forms[i]) !== first) return false;
  }
  return true;
}

/**
 * Base ekaśeṣa determination for 1.2.64
 * सरूपाणामेकशेष एकविभक्तौ – Of words having the same form & same case the last alone remains.
 * 
 * Input forms can be:
 * - array of strings ["gajaḥ","gajaḥ"]
 * - space/plus separated string "gajaḥ gajaḥ" or "gajaḥ+gajaḥ"
 * - array of word objects [{surface:"gajaḥ", case:"nom"}, ...]
 * Context:
 *   { forceCaseCheck?: boolean } when true we verify all provided word objects share identical case property.
 */
export function applySutra1_2_64(wordsInput, context = {}) {
  const result = {
    sutra: '1.2.64',
    applied: false,
    retainedIndex: null,
    retainedForm: null,
    droppedIndices: [],
    droppedForms: [],
    explanation: '',
    forms: [],
    reason: null
  };

  const arrayInput = toArray(wordsInput);
  if (!arrayInput.length) { result.explanation = 'No input forms'; return result; }

  // Extract surface forms & collect meta
  const surfaces = arrayInput.map(extractSurface);
  result.forms = [...surfaces];

  // Validate sufficient count
  if (surfaces.length < 2) { result.explanation = 'Need at least two forms'; return result; }

  // Optional case check
  if (context.forceCaseCheck) {
    const cases = arrayInput.map(w => (w && typeof w === 'object') ? w.case || w.vibhakti || null : null);
    const filtered = cases.filter(c => c != null);
    if (filtered.length && filtered.some(c => c !== filtered[0])) {
      result.explanation = 'Not all in same case';
      result.reason = 'case-mismatch';
      return result;
    }
  }

  // All identical?
  if (!allSameNormalized(surfaces)) {
    result.explanation = 'Forms not identical';
    result.reason = 'form-mismatch';
    return result;
  }

  // Apply retention: keep last
  const lastIndex = surfaces.length - 1;
  result.retainedIndex = lastIndex;
  result.retainedForm = surfaces[lastIndex];
  for (let i=0;i<lastIndex;i++) { result.droppedIndices.push(i); result.droppedForms.push(surfaces[i]); }
  result.applied = true;
  result.explanation = 'Identical forms in same case: only last retained (ekaśeṣa)';
  result.reason = 'identical-forms';
  return result;
}

// ==================== SUTRA 1.2.65 ====================
// वृद्धो यूना तल्लक्षणश्चेदेव विशेषः – Retain Vṛddha (or gotra) form when paired with Yuvan form if only affix differs.
// We approximate by requiring objects with category 'vrddha' and 'yuvan' sharing same base/root.
export function applySutra1_2_65(wordsInput, context = {}) {
  const result = { sutra:'1.2.65', applied:false, retainedIndices:[], droppedIndices:[], explanation:'', reason:null };
  const arr = toArray(wordsInput).map(w => (typeof w === 'string'? { surface:w }: w));
  if (arr.length < 2) { result.explanation='Need pair'; return result; }
  const groups = {};
  arr.forEach((w,i)=>{ const base = w.base || normalize(extractSurface(w)); if(!groups[base]) groups[base]=[]; groups[base].push({w,i}); });
  let applied = false;
  for (const base of Object.keys(groups)) {
    const items = groups[base];
    const vrddha = items.filter(o=>o.w.category==='vrddha');
    const yuvan = items.filter(o=>o.w.category==='yuvan');
    if (vrddha.length && yuvan.length) {
      // choose last vrddha index to parallel 1.2.64 retention pattern
      const keep = vrddha[vrddha.length-1].i;
      items.forEach(o=>{ if (o.i !== keep) result.droppedIndices.push(o.i); });
      result.retainedIndices.push(keep);
      applied = true;
    }
  }
  if (applied) {
    result.applied = true;
    result.reason = 'vrddha-vs-yuvan';
    result.explanation = 'Vṛddha/gotra form retained over Yuvan counterpart (same base)';
  } else {
    result.explanation = 'No vrddha+yuvan pairing';
    result.reason = 'no-match';
  }
  return result;
}

// ==================== SUTRA 1.2.66 ====================
// स्त्री पुंवच्च – Feminine vrddha form retained over its yuvan counterpart and treated like masculine.
export function applySutra1_2_66(wordsInput, context = {}) {
  const result = { sutra:'1.2.66', applied:false, retainedIndices:[], droppedIndices:[], genderOverride:'masculine', explanation:'', reason:null };
  const arr = toArray(wordsInput).map(w => (typeof w === 'string'? { surface:w }: w));
  if (arr.length < 2) { result.explanation='Need pair'; return result; }
  let applied = false;
  arr.forEach((w,i)=>{ w._idx=i; });
  // Group by base
  const byBase = {};
  arr.forEach(w=>{ const b = w.base || normalize(extractSurface(w)); if(!byBase[b]) byBase[b]=[]; byBase[b].push(w); });
  Object.values(byBase).forEach(items => {
    const femVrddha = items.filter(w=>w.gender==='f' && w.category==='vrddha');
    const yuvan = items.filter(w=>w.category==='yuvan');
    if (femVrddha.length && yuvan.length) {
      const keepIdx = femVrddha[femVrddha.length-1]._idx;
      items.forEach(it=>{ if (it._idx !== keepIdx) result.droppedIndices.push(it._idx); });
      result.retainedIndices.push(keepIdx);
      applied = true;
    }
  });
  if (applied) {
    result.applied = true;
    result.reason = 'feminine-vrddha-retained';
    result.explanation = 'Feminine vrddha form retained; treated as masculine in effect';
  } else {
    result.explanation = 'No feminine vrddha with yuvan counterpart';
    result.reason = 'no-match';
  }
  return result;
}

// ==================== SUTRA 1.2.67 ====================
// पुमान् स्त्रिया – Masculine retained when paired with feminine counterpart (same base).
export function applySutra1_2_67(wordsInput, context = {}) {
  const result = { sutra:'1.2.67', applied:false, retainedIndices:[], droppedIndices:[], explanation:'', reason:null };
  const arr = toArray(wordsInput).map(w => (typeof w === 'string'? { surface:w }: w));
  if (arr.length < 2) { result.explanation='Need pair'; return result; }
  arr.forEach((w,i)=>{ w._idx=i; });
  const byBase={};
  arr.forEach(w=>{ const b=w.base || normalize(extractSurface(w)); if(!byBase[b]) byBase[b]=[]; byBase[b].push(w); });
  let applied=false;
  Object.values(byBase).forEach(items => {
    const masc = items.filter(w=>w.gender==='m');
    const fem = items.filter(w=>w.gender==='f');
    if (masc.length && fem.length) {
      const keepIdx = masc[masc.length-1]._idx;
      items.forEach(it=>{ if (it._idx !== keepIdx) result.droppedIndices.push(it._idx); });
      result.retainedIndices.push(keepIdx);
      applied=true;
    }
  });
  if (applied) { result.applied=true; result.reason='masculine-retained'; result.explanation='Masculine form retained over feminine counterpart'; }
  else { result.explanation='No masculine+feminine pairing'; result.reason='no-match'; }
  return result;
}

// ==================== SUTRA 1.2.68 ====================
// भ्रातृपुत्रौ स्वसृदुहितृभ्याम् – bhrātṛ & putra retained when paired with svasṛ / duhitṛ respectively.
const LEX_BHRATR = new Set(['bhrātṛ','भ्रातृ']);
const LEX_SVASR = new Set(['svasṛ','स्वसृ']);
const LEX_PUTRA = new Set(['putra','पुत्र']);
const LEX_DUHITR = new Set(['duhitṛ','दुहितृ']);

function lemmaOf(w){
  if (!w) return '';
  if (typeof w === 'string') return normalize(w);
  return normalize(w.lemma || w.surface || w.form || '');
}
function inSet(norm, set){ return [...set].some(v=>normalize(v)===norm); }

export function applySutra1_2_68(wordsInput, context = {}) {
  const result = { sutra:'1.2.68', applied:false, retainedIndices:[], droppedIndices:[], explanation:'', reason:null };
  const arr = toArray(wordsInput).map(w => (typeof w === 'string'? { surface:w }: w));
  if (arr.length < 2) { result.explanation='Need at least two words'; return result; }
  arr.forEach((w,i)=>{ w._idx=i; });
  let applied=false;
  // Scan for pairs
  const bhratrIdx = arr.filter(w=> inSet(lemmaOf(w), LEX_BHRATR));
  const svasrIdx = arr.filter(w=> inSet(lemmaOf(w), LEX_SVASR));
  const putraIdx = arr.filter(w=> inSet(lemmaOf(w), LEX_PUTRA));
  const duhitIdx = arr.filter(w=> inSet(lemmaOf(w), LEX_DUHITR));
  const retainSet = new Set();
  const dropSet = new Set();
  if (bhratrIdx.length && svasrIdx.length) {
    // retain last bhrātṛ, drop all svasṛ in its pairing scope
    retainSet.add(bhratrIdx[bhratrIdx.length-1]._idx);
    svasrIdx.forEach(w=> dropSet.add(w._idx));
    applied=true;
  }
  if (putraIdx.length && duhitIdx.length) {
    retainSet.add(putraIdx[putraIdx.length-1]._idx);
    duhitIdx.forEach(w=> dropSet.add(w._idx));
    applied=true;
  }
  if (applied) {
    result.retainedIndices = [...retainSet];
    result.droppedIndices = [...dropSet];
    result.applied=true;
    result.reason='kinship-retention';
    result.explanation='Kinship masculine terms retained over corresponding feminine (bhrātṛ/svasṛ, putra/duhitṛ)';
  } else {
    result.explanation='No target kinship pairings';
    result.reason='no-match';
  }
  return result;
}

// ==================== SUTRA 1.2.69 ====================
// नपुंसकमनपुंसकेनैकवच्चास्यान्यतरस्याम् – Neuter optionally retained over non-neuter; treated as singular.
export function applySutra1_2_69(wordsInput, context = {}) {
  const result = { sutra:'1.2.69', applied:false, retainedIndices:[], droppedIndices:[], numberOverride:'singular', optional:true, explanation:'', reason:null };
  const arr = toArray(wordsInput).map(w=> typeof w==='string'? { surface:w }: w);
  if (arr.length < 2) { result.explanation='Need pair'; return result; }
  arr.forEach((w,i)=>{ w._idx=i; });
  // Group by base
  const byBase={}; arr.forEach(w=>{ const b = w.base || normalize(extractSurface(w)); if(!byBase[b]) byBase[b]=[]; byBase[b].push(w); });
  let applied=false;
  Object.values(byBase).forEach(items => {
    const neuters = items.filter(w=>w.gender==='n');
    const others = items.filter(w=>w.gender && w.gender!=='n');
    if (neuters.length && others.length) {
      const keepIdx = neuters[neuters.length-1]._idx;
      items.forEach(it=>{ if (it._idx !== keepIdx) result.droppedIndices.push(it._idx); });
      result.retainedIndices.push(keepIdx);
      applied=true;
    }
  });
  if (applied) { result.applied=true; result.reason='neuter-optional'; result.explanation='Neuter optionally retained over non-neuter with singular treatment'; }
  else { result.explanation='No neuter/non-neuter pairing'; result.reason='no-match'; }
  return result;
}

// ==================== SUTRA 1.2.70 ====================
// पिता मात्रा – pitṛ optionally retained over mātṛ
const LEX_PITR = new Set(['pitṛ','पितृ','पिता']);
const LEX_MATR = new Set(['mātṛ','मातृ','माता']);
export function applySutra1_2_70(wordsInput, context = {}) {
  const result = { sutra:'1.2.70', applied:false, retainedIndices:[], droppedIndices:[], optional:true, explanation:'', reason:null };
  const arr = toArray(wordsInput).map(w=> typeof w==='string'? { surface:w }: w);
  if (arr.length < 2) { result.explanation='Need pair'; return result; }
  arr.forEach((w,i)=>{ w._idx=i; });
  const pitrs = arr.filter(w=> inSet(lemmaOf(w), LEX_PITR));
  const matrs = arr.filter(w=> inSet(lemmaOf(w), LEX_MATR));
  if (pitrs.length && matrs.length) {
    const keepIdx = pitrs[pitrs.length-1]._idx;
    matrs.forEach(w=> result.droppedIndices.push(w._idx));
    result.retainedIndices.push(keepIdx);
    result.applied=true;
    result.reason='pitr-optional';
    result.explanation='Father optionally retained over mother';
  } else {
    result.explanation='No pitṛ + mātṛ pairing';
    result.reason='no-match';
  }
  return result;
}

// ==================== SUTRA 1.2.71 ====================
// श्वशुरः श्वश्र्वा – śvaśura optionally retained over śvaśrū
const LEX_SVASHURA = new Set(['śvaśura','श्वशुर','श्वशुरः']);
const LEX_SVASHRU = new Set(['śvaśrū','श्वश्रू','श्वश्र्वा']);
export function applySutra1_2_71(wordsInput, context = {}) {
  const result = { sutra:'1.2.71', applied:false, retainedIndices:[], droppedIndices:[], optional:true, explanation:'', reason:null };
  const arr = toArray(wordsInput).map(w=> typeof w==='string'? { surface:w }: w);
  if (arr.length < 2) { result.explanation='Need pair'; return result; }
  arr.forEach((w,i)=>{ w._idx=i; });
  const shuras = arr.filter(w=> inSet(lemmaOf(w), LEX_SVASHURA));
  const shrus = arr.filter(w=> inSet(lemmaOf(w), LEX_SVASHRU));
  if (shuras.length && shrus.length) {
    const keepIdx = shuras[shuras.length-1]._idx;
    shrus.forEach(w=> result.droppedIndices.push(w._idx));
    result.retainedIndices.push(keepIdx);
    result.applied=true;
    result.reason='inlaw-optional';
    result.explanation='Father-in-law optionally retained over mother-in-law';
  } else {
    result.explanation='No śvaśura + śvaśrū pairing'; result.reason='no-match';
  }
  return result;
}

// ==================== SUTRA 1.2.72 ====================
// त्यदादीनि सर्वैर्नित्यम् – tyad-pronouns always retained over others.
const PRONOUN_TYAD_SERIES = new Set(['tyad','त्यद्','tad','तद्','tat','तत्','etad','एतद्']);
export function applySutra1_2_72(wordsInput, context = {}) {
  const result = { sutra:'1.2.72', applied:false, retainedIndices:[], droppedIndices:[], mandatory:true, explanation:'', reason:null };
  const arr = toArray(wordsInput).map(w=> typeof w==='string'? { surface:w }: w);
  if (!arr.length) { result.explanation='No input'; return result; }
  arr.forEach((w,i)=>{ w._idx=i; });
  const tyads = arr.filter(w=> PRONOUN_TYAD_SERIES.has(w.lemma) || PRONOUN_TYAD_SERIES.has(normalize(w.surface||''))); 
  if (!tyads.length) { result.explanation='No tyad-series pronoun'; result.reason='no-match'; return result; }
  // Retain all tyad-series indices, drop all others
  const retain = tyads.map(t=>t._idx);
  const drop = arr.filter(w=> !retain.includes(w._idx)).map(w=> w._idx);
  result.retainedIndices = retain;
  result.droppedIndices = drop;
  result.applied = true;
  result.reason = 'tyad-mandatory';
  result.explanation = 'Tyad-series pronoun(s) mandatorily retained';
  return result;
}

// ==================== SUTRA 1.2.73 ====================
// ग्राम्यपशुसंघेषु अतरुणेषु स्त्री – feminine retained for collection of domestic animals (non-young)
export function applySutra1_2_73(wordsInput, context = {}) {
  const result = { sutra:'1.2.73', applied:false, retainedIndices:[], droppedIndices:[], domain:'animal-collection', explanation:'', reason:null };
  if (!context.collection || context.domain !== 'domestic-animals' || context.young) {
    result.explanation = 'Not a non-young domestic animal collection context';
    result.reason = 'domain-mismatch';
    return result;
  }
  const arr = toArray(wordsInput).map(w=> typeof w==='string'? { surface:w }: w);
  if (!arr.length) { result.explanation='No input'; return result; }
  arr.forEach((w,i)=>{ w._idx=i; });
  const fem = arr.filter(w=> w.gender==='f');
  if (!fem.length) { result.explanation='No feminine form'; result.reason='no-match'; return result; }
  // Retain last feminine form; drop others (simplification)
  const keepIdx = fem[fem.length-1]._idx;
  arr.forEach(w=> { if (w._idx !== keepIdx) result.droppedIndices.push(w._idx); });
  result.retainedIndices = [keepIdx];
  result.applied = true;
  result.reason='feminine-collection';
  result.explanation='Feminine retained in non-young domestic animal collection context';
  return result;
}

export default { applySutra1_2_64, applySutra1_2_65, applySutra1_2_66, applySutra1_2_67, applySutra1_2_68, applySutra1_2_69, applySutra1_2_70, applySutra1_2_71, applySutra1_2_72, applySutra1_2_73 };

// ==================== ORCHESTRATOR (Phase 2 Enhancement) ====================
// Consolidates ekaśeṣa logic selecting highest-precedence applicable rule.
// Precedence weights (higher wins): mandatory pronoun (1.2.72)=100, kinship & gender/gotra (1.2.65–68)=70,
// contextual collection (1.2.73)=60, neuter & parental/in-law optionals (1.2.69–71)=50, base identical (1.2.64)=10.

const EKA_SHESHA_RULES = [
  { id:'1.2.72', fn:applySutra1_2_72, weight:100 },
  { id:'1.2.65', fn:applySutra1_2_65, weight:70 },
  { id:'1.2.66', fn:applySutra1_2_66, weight:70 },
  { id:'1.2.67', fn:applySutra1_2_67, weight:70 },
  { id:'1.2.68', fn:applySutra1_2_68, weight:70 },
  { id:'1.2.73', fn:applySutra1_2_73, weight:60 },
  { id:'1.2.69', fn:applySutra1_2_69, weight:50 },
  { id:'1.2.70', fn:applySutra1_2_70, weight:50 },
  { id:'1.2.71', fn:applySutra1_2_71, weight:50 },
  { id:'1.2.64', fn:applySutra1_2_64, weight:10 }
];

export function resolveEkaShesha(wordsInput, context = {}) {
  const evaluations = [];
  for (const rule of EKA_SHESHA_RULES) {
    let res;
    try { res = rule.fn(wordsInput, context) || {}; } catch (e) { res = { sutra:rule.id, applied:false, error:e.message }; }
    if (res.applied) evaluations.push({ weight:rule.weight, result:res });
    // Early exit if mandatory rule applied
    if (res.applied && res.mandatory) break;
  }
  if (!evaluations.length) {
    return {
      applied:false,
      sutra:null,
      retainedIndices:[],
      droppedIndices:[],
      precedenceTrace:[],
      explanation:'No ekaśeṣa rule applied'
    };
  }
  // Choose highest weight; tie -> later (more specific lexical) preference by order in list
  evaluations.sort((a,b)=> b.weight - a.weight);
  const winner = evaluations[0].result;
  const aggregate = {
    applied:true,
    sutra:winner.sutra,
    retainedIndices:winner.retainedIndices ?? (winner.retainedIndex!=null ? [winner.retainedIndex] : []),
    droppedIndices:winner.droppedIndices || winner.droppedIndices === 0 ? winner.droppedIndices : (winner.droppedIndices || []),
    explanation:`Selected ekaśeṣa rule ${winner.sutra}`,
    precedenceTrace:evaluations.map(e=>({ sutra:e.result.sutra, weight:e.weight, reason:e.result.reason }))
  };
  // Pass through useful overrides
  ['genderOverride','numberOverride','optional','mandatory','reason'].forEach(k=>{ if (winner[k]!==undefined) aggregate[k]=winner[k]; });
  return aggregate;
}

// Named export in default bundle
export const EkaShesha = { resolveEkaShesha };
