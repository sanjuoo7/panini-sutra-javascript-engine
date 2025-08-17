/**
 * Sutra 1.4.36: वशे — desire/longing dative
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const verbsDeva = ['वशयति','इच्छति','कामयते','स्पृहयति'];
const verbsIAST = ['vaśayati','icchati','kāmayate','spṛhayati'];

function base(extra = {}) { return { applies: false, sutra: '1.4.36', karaka: 'सम्प्रदान', case_required: 'dative', ...extra }; }

export function identifyDesireDative(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });
  const v = context.verb || '';
  const ok = verbsDeva.includes(v) || verbsIAST.includes(v) || context.action_type === 'desire' || context.desire_type === 'longing';
  if (ok) {
    return base({ applies: true, script, word_iast: norm });
  }
  return base();
}

export default identifyDesireDative;
