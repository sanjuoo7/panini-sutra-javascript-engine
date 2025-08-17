/**
 * Sutra 1.4.37: क्रुधहिंसयोः — anger/harm dative
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const verbsDeva = ['क्रुध्यति','हिनस्ति','द्रुह्यति','कुप्यति'];
const verbsIAST = ['krudhyati','hinasti','druhyati','kupyati'];

function base(extra = {}) { return { applies: false, sutra: '1.4.37', karaka: 'सम्प्रदान', case_required: 'dative', ...extra }; }

export function identifyAngerDative(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });
  const v = context.verb || '';
  const ok = verbsDeva.includes(v) || verbsIAST.includes(v) || ['anger','harm'].includes(context.action_type);
  if (ok) {
    return base({ applies: true, script, word_iast: norm });
  }
  return base();
}

export default identifyAngerDative;
