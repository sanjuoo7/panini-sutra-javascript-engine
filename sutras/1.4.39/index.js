/**
 * Sutra 1.4.39: धारेर्द्वितीया वा स्थाने — optional accusative for holding location
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

function base(extra = {}) { return { applies: false, sutra: '1.4.39', optional: true, case_options: ['accusative','locative'], ...extra }; }

export function identifyHoldingLocationCase(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });
  const v = context.verb || '';
  const isDhara = ['धारयति','धृ'].includes(v) || ['dhārayati','dhṛ'].includes(v);
  if (isDhara && (context.spatial_relationship === 'location' || !context.spatial_relationship)) {
    return base({ applies: true, script, word_iast: norm });
  }
  return base();
}

export default identifyHoldingLocationCase;
