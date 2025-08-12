/** Sutra 1.2.50: इद्गोण्याः */
import { shortenFinalVowel } from '../sanskrit-utils/vowel-length-transformation.js';

export function applySutra1_2_50(word, context = {}, options = {}) {
  const res = { sutra: '1.2.50', input: word, applies: false, changed: false, transformed: null, explanation: '' };
  if (typeof word !== 'string' || !word) { res.explanation = 'Invalid input'; return res; }
  const elision = (context.taddhitaElisionType || '').toLowerCase();
  if (!['luk','lup'].includes(elision)) { res.explanation = 'No luk/lup elision'; return res; }
  // Detect final long ī: IAST ī, Devanagari independent ई or matra 'ी'
  if (!/(ī|ई|ी)$/.test(word)) { res.explanation = 'No long ī ending'; return res; }
  const shortened = shortenFinalVowel(word, { script: context.script, transform: options.transform !== false });
  // Accept either IAST long ī or Devanagari long ई; in preview mode applies=false so check mapping separately
  const longIOriginals = new Set(['ī','ई','ी']); // include Devanagari long ī matra
  if (!longIOriginals.has(shortened.finalVowelOriginal)) { res.explanation = 'Final vowel not long ī'; return res; }
  if (options.transform === false) {
    res.applies = true;
    res.changed = false;
    res.transformed = word;
    res.explanation = 'Preview: final long ī would shorten under luk/lup';
    return res;
  }
  if (!shortened.applies) { res.explanation = 'Shortening utility did not apply'; return res; }
  res.applies = true;
  res.changed = shortened.changed;
  res.transformed = shortened.transformed || word;
  res.explanation = 'Final ī shortened under luk/lup taddhita elision domain (goṇyāḥ)';
  return res;
}
export default applySutra1_2_50;
