/**
 * Sutra 1.4.33: रुच्यर्थानां प्रीयमाणः — liking/pleasure dative
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const verbsDeva = ['रोचते','प्रीयते','हर्षयति','आह्लादयति'];
const verbsIAST = ['rocate','prīyate','harṣayati','āhlādayati'];

function base(extra = {}) { return { applies: false, sutra: '1.4.33', karaka: 'सम्प्रदान', case_required: 'dative', ...extra }; }

export function identifyPleasureDative(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });

  const v = context.verb || '';
  const ok = verbsDeva.includes(v) || verbsIAST.includes(v) || context.action_type === 'pleasure';

  if (ok) {
    return base({ applies: true, script, word_iast: norm });
  }
  return base();
}

export default identifyPleasureDative;
