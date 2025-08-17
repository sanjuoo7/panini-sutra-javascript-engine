/**
 * Sutra 1.4.32: कर्मणा यमभिप्रैति स सम्प्रदानम् — core recipient (dative)
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const giveVerbsDeva = ['ददाति','प्रयच्छति','अर्पयति','समर्पयति','निवेदयति','वितरति','करोति','आनयति'];
const giveVerbsIAST = ['dadāti','prayacchati','arpayati','samarpayati','nivedayati','vitarati','karoti','ānayati'];

function base(extra = {}) { return { applies: false, sutra: '1.4.32', karaka: 'सम्प्रदान', case_required: 'dative', ...extra }; }

export function identifyCoreSampradana(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });

  const v = context.verb || '';
  const isGive = giveVerbsDeva.includes(v) || giveVerbsIAST.includes(v) || ['giving','offering','beneficiary','purpose'].some(t => context.action_type === t || context.purpose_oriented);

  if (isGive && (!context.element_role || context.element_role === 'recipient')) {
    return base({ applies: true, script, word_iast: norm, case_valid: /[ाय|े|भ्यः|वे]$/.test(word) });
  }
  if (isGive && context.element_role === 'given_object') {
    return { applies: true, sutra: '1.4.32', karaka: 'कर्म', case_required: 'accusative', script, word_iast: norm };
  }
  return base();
}

export default identifyCoreSampradana;
