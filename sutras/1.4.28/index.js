/**
 * Sutra 1.4.28: Concealment verbs source in ablative; object is कर्म
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

const concealmentVerbsDeva = ['गुप्नाति', 'जुप्नाति', 'छुप्नाति', 'रुप्नाति', 'लुप्नाति', 'शुप्नाति'];
const concealmentVerbsIAST = ['gupnāti', 'jupnāti', 'chupnāti', 'rupnāti', 'lupnāti', 'śupnāti'];

function base(extra = {}) { return { applies: false, sutra: '1.4.28', ...extra }; }

export function identifyConcealmentAblative(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });

  const v = context.verb || '';
  const isConceal = concealmentVerbsDeva.includes(v) || concealmentVerbsIAST.includes(v) || context.action_type === 'concealment';

  // object is कर्म accusative (prefer object detection when ambiguous)
  const looksAccusative = /म्$/.test(word) || /(am|ṃ|m)$/.test(norm);
  if (isConceal && (context.element_role === 'object' || context.object_type || looksAccusative)) {
    return { applies: true, sutra: '1.4.28', karaka: 'कर्म', case_required: 'accusative', script, word_iast: norm };
  }
  // source takes ablative
  const looksAblativeDeva = /(भ्यः|ात्|ोः|ेभ्यः)$/.test(word);
  const looksAblativeIAST = /(bhyaḥ|āt|oḥ|ebhyaḥ)$/.test(norm);
  if (isConceal && (context.element_role === 'source' || looksAblativeDeva || looksAblativeIAST || context.compound_type === 'dvandva')) {
    let case_valid;
    if (context.validate_case) case_valid = looksAblativeDeva || looksAblativeIAST;
    return base({ applies: true, karaka: 'अपादान', case_required: 'ablative', script, word_iast: norm, case_valid });
  }

  if (context.validate_case) return base({ case_valid: false });
  return base({ applies: false });
}

export default identifyConcealmentAblative;
