/**
 * Prātipadika Classification (Sutras 1.2.45-1.2.46)
 */
import { SanskritWordLists } from './constants.js';
import { analyzeTaddhita } from '../1.1.38/index.js';

function isRoot(form){
  const roots = SanskritWordLists?.rootsList || [];
  return roots.includes(form);
}

function hasKrtAffix(form){
  const krt = SanskritWordLists?.krtAffixes || [];
  return krt.some(a => form.endsWith(a) && form.length > a.length);
}

function hasTaddhita(form, context){
  const analysis = analyzeTaddhita(form, context || {});
  return analysis.has_taddhita;
}

function isPureAffix(form){
  const allAff = SanskritWordLists?.allAffixes || [];
  return allAff.includes(form);
}

function lexicalMeaningHeuristic(form, context){
  if (context?.explicitMeaningful) return true;
  return form && form.length > 1; // crude heuristic
}

export function isPratipadikaBase(form, context = {}) {
  if (!form || typeof form !== 'string') return false;
  if (isRoot(form)) return false;
  if (isPureAffix(form)) return false;
  return lexicalMeaningHeuristic(form, context);
}

export function isPratipadika(form, context = {}) {
  if (isPratipadikaBase(form, context)) return true;
  if (hasKrtAffix(form)) return true;
  if (hasTaddhita(form, context)) return true;
  if (context.isCompound) return true;
  return false;
}

export function getPratipadikaAnalysis(form, context = {}) {
  const reasons = [];
  let source = null;
  if (isPratipadikaBase(form, context)) { source = 'base'; reasons.push('1.2.45-base'); }
  else {
    if (hasKrtAffix(form)) { source = 'krt'; reasons.push('1.2.46-krt'); }
    if (!source && hasTaddhita(form, context)) { source = 'taddhita'; reasons.push('1.2.46-taddhita'); }
    if (!source && context.isCompound) { source = 'compound'; reasons.push('1.2.46-compound'); }
  }
  return { form, isPratipadika: !!source || isPratipadikaBase(form, context), source, reasons };
}

export default { isPratipadikaBase, isPratipadika, getPratipadikaAnalysis };
