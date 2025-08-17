/**
 * Sutra 1.4.34: शापानुग्रहयोश्च — praise/curse dative
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const verbsDeva = ['प्रशंसति','शपति','अनुगृह्णाति','स्तौति'];
const verbsIAST = ['praśaṃsati','śapati','anugṛhṇāti','stauti'];

function base(extra = {}) { return { applies: false, sutra: '1.4.34', karaka: 'सम्प्रदान', case_required: 'dative', ...extra }; }

export function identifyPraiseCurseDative(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });
  const v = context.verb || '';
  const ok = verbsDeva.includes(v) || verbsIAST.includes(v) || ['praise','curse'].includes(context.action_type);
  if (ok) {
    return base({ applies: true, script, word_iast: norm });
  }
  return base();
}

export default identifyPraiseCurseDative;
