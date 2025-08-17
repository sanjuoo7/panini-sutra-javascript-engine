/**
 * Sutra 1.4.40: आधारोऽधिकरणम् — substrate/support is adhikaraṇa (locative)
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

function base(extra = {}) { return { applies: false, sutra: '1.4.40', karaka: 'अधिकरण', case_required: 'locative', ...extra }; }

export function identifySubstrateAdhikarana(word, context = {}) {
  if (!word) return base({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return base({ error: 'invalid_word' });
  const isSubstrate = (context.spatial_relationship === 'substrate' || context.foundation_type === 'spatial' || context.temporal_aspect || !!context.verb) && context.element_role !== 'object';
  if (isSubstrate) {
    return base({ applies: true, script, word_iast: norm });
  }
  return base();
}

export default identifySubstrateAdhikarana;
