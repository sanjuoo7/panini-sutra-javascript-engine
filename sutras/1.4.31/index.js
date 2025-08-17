/**
 * Sutra 1.4.31: भुवः प्रभवः — source of becoming/transformation takes ablative
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const bhavaVerbsDeva = ['भवति','जायते','निर्गच्छति','परिणमति','विकसति'];
const bhavaVerbsIAST = ['bhavati','jāyate','nirgacchati','pariṇamati','vikasati'];

function base(extra = {}) { return { applies: false, sutra: '1.4.31', karaka: 'अपादान', case_required: 'ablative', ...extra }; }

export function identifyBecomingSourceAblative(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });

  const v = context.verb || '';
  const isBhava = bhavaVerbsDeva.includes(v) || bhavaVerbsIAST.includes(v) || ['becoming','transformation','development'].includes(context.action_type);

  if (isBhava && (!context.element_role || context.element_role === 'source')) {
    return base({ applies: true, script, word_iast: norm, case_valid: /[ोः|ात्|ेभ्यः|ात्]$/.test(word) });
  }
  if (isBhava && context.element_role === 'result_entity') {
    return { applies: true, sutra: '1.4.31', karaka: 'कर्तृ', case_required: 'nominative', script, word_iast: norm };
  }
  return base();
}

export default identifyBecomingSourceAblative;
