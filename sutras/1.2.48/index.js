/** Sutra 1.2.48: गोस्त्रियोरुपसर्जनस्य */
import { shortenFinalVowel } from '../sanskrit-utils/vowel-length-transformation.js';
import { isPratipadika } from '../sanskrit-utils/pratipadika-classification.js';

function endsWithGo(word, script) {
  if (script === 'Devanagari') return /गो$/.test(word);
  return /go$/.test(word);
}

export function applySutra1_2_48(word, context = {}, options = {}) {
  const res = { sutra: '1.2.48', input: word, applies: false, changed: false, transformed: null, metadata: null, explanation: '' };
  if (typeof word !== 'string' || !word) {
    res.explanation = 'Invalid input';
    return res;
  }
  if (!context.isUpasarjana) {
    res.explanation = 'Not an upasarjana';
    return res;
  }
  if (!context.assumePratipadika && !isPratipadika(word)) {
    res.explanation = 'Not identified as prātipadika';
    return res;
  }
  const script = context.script;
  const goCase = endsWithGo(word, script);
  const feminineCase = context.gender === 'feminine' || context.feminineAffixApplied === true;
  if (!goCase && !feminineCase) {
    res.explanation = 'Neither go-ending nor feminine-affix case';
    return res;
  }
  const shortened = shortenFinalVowel(word, { script, transform: options.transform !== false });
  if (!shortened.applies) {
    res.explanation = shortened.explanation || 'No shortening applicable';
    return res;
  }
  res.applies = true;
  res.changed = shortened.changed;
  res.transformed = shortened.transformed || word;
  res.metadata = {
    finalVowelOriginal: shortened.finalVowelOriginal,
    finalVowelNew: shortened.finalVowelNew,
    reason: goCase ? 'go-upasarjana-shortening' : 'feminine-upasarjana-shortening'
  };
  res.explanation = 'Upasarjana final vowel shortened';
  return res;
}
export default applySutra1_2_48;
