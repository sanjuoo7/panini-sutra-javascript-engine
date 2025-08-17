/**
 * Sutra 1.4.30: जनिकर्तुः प्रकृतिः — birth/generation source takes ablative
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const genVerbsDeva = ['जायते','उत्पद्यते','निर्गच्छति','जनयति','उत्पादयति'];
const genVerbsIAST = ['jāyate','utpadyate','nirgacchati','janayati','utpādayati'];

function base(extra = {}) { return { applies: false, sutra: '1.4.30', karaka: 'अपादान', case_required: 'ablative', ...extra }; }

export function identifyBirthSourceAblative(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });

  const v = context.verb || '';
  const isGen = genVerbsDeva.includes(v) || genVerbsIAST.includes(v) || ['birth','generation','origination'].includes(context.action_type);

  const isNatural = context.generation_type === 'natural';
  if ((isGen || isNatural) && (!context.element_role || context.element_role === 'source')) {
    let case_valid = undefined;
    if (context.validate_case) {
      case_valid = /(?:ोः|ात्|ेभ्यः|ात्|ात)$/.test(word);
    }
    return base({ applies: true, script, word_iast: norm, case_valid });
  }
  if (isGen && context.element_role === 'created_entity') {
    return { applies: true, sutra: '1.4.30', karaka: 'कर्म', case_required: 'accusative', script, word_iast: norm };
  }
  return base();
}

export default identifyBirthSourceAblative;
