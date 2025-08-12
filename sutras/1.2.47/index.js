/** Sutra 1.2.47: ह्रस्वो नपुंसके प्रातिपदिकस्य */
import { shortenFinalVowel } from '../sanskrit-utils/vowel-length-transformation.js';
import { isPratipadika } from '../sanskrit-utils/pratipadika-classification.js';

export function applySutra1_2_47(word, context = {}, options = {}) {
  const res = { sutra: '1.2.47', input: word, applies: false, changed: false, transformed: null, metadata: null, explanation: '' };
  if (typeof word !== 'string' || !word) {
    res.explanation = 'Invalid input';
    return res;
  }
  if (context.gender !== 'neuter') {
    res.explanation = 'Not neuter gender';
    return res;
  }
  if (!context.assumePratipadika && !isPratipadika(word)) {
    res.explanation = 'Not identified as prātipadika';
    return res;
  }
  const shortened = shortenFinalVowel(word, { script: context.script, transform: options.transform !== false });
  if (!shortened.applies) {
    res.explanation = shortened.explanation || 'No shortening applied';
    return res;
  }
  res.applies = true;
  res.changed = shortened.changed;
  res.transformed = shortened.transformed || word;
  res.metadata = {
    finalVowelOriginal: shortened.finalVowelOriginal,
    finalVowelNew: shortened.finalVowelNew,
    reason: 'neuter-shortening'
  };
  res.explanation = 'Neuter prātipadika final vowel shortened';
  return res;
}
export default applySutra1_2_47;
