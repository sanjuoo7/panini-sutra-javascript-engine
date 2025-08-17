/**
 * Sutra 1.4.38: क्रुधद्रुहोरुपसृष्टयोः कर्म — with prefixes, object becomes कर्म (accusative)
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const baseVerbsDeva = ['अभिक्रुध्यति','अभिद्रुह्यति','प्रतिक्रुध्यति','प्रतिद्रुह्यति'];
const baseVerbsIAST = ['abhikrudhyati','abhidruhyati','pratikrudhyati','pratidruhyati'];

function base(extra = {}) { return { applies: false, sutra: '1.4.38', karaka: 'कर्म', case_required: 'accusative', ...extra }; }

export function identifyPrefixedAngerKarma(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });

  const v = context.verb || '';
  const hasPrefix = !!context.prefix || baseVerbsDeva.includes(v) || baseVerbsIAST.includes(v) || /^(अधि|अवि|अभि|प्रति|सम्|उप|आ)/.test(v);
  if (hasPrefix) {
    return base({ applies: true, script, word_iast: norm });
  }
  return base();
}

export default identifyPrefixedAngerKarma;
