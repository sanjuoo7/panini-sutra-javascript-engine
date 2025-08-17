/**
 * Sutra 1.4.29: आख्यातोपयोगे — teacher/source in ablative in teaching/learning
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const teachVerbsDeva = ['अध्यापयति','अधीते','उपदिशति','शिक्षयति','बोधयति'];
const teachVerbsIAST = ['adhyāpayati','adhīte','upadiśati','śikṣayati','bodhayati'];

function base(extra = {}) { return { applies: false, sutra: '1.4.29', karaka: 'अपादान', case_required: 'ablative', ...extra }; }

export function identifyTeachingAblative(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });

  const v = context.verb || '';
  const isTeach = teachVerbsDeva.includes(v) || teachVerbsIAST.includes(v) || ['teaching','learning','instruction'].includes(context.action_type);

  if (isTeach && (!context.element_role || context.element_role === 'source')) {
    return base({ applies: true, script, word_iast: norm, case_valid: /[ोः|ात्|ेभ्यः]$/.test(word) });
  }
  if (isTeach && context.element_role === 'knowledge_object') {
    return { applies: true, sutra: '1.4.29', karaka: 'कर्म', case_required: 'accusative', script, word_iast: norm };
  }
  return base();
}

export default identifyTeachingAblative;
