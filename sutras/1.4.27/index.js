/**
 * Sutra 1.4.27: निवारणे — Ablative for prevention/protection/blocking source
 */
import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

function baseResult(extra = {}) {
  return { applies: false, karaka: 'अपादान', case_required: 'ablative', sutra: '1.4.27', ...extra };
}

export function identifyPreventionAblative(word, context = {}) {
  if (!word) return baseResult({ error: 'empty_input' });
  const script = context.script || detectScript(word);
  const norm = normalizeScript(word);
  if (validateSanskritWord && !validateSanskritWord(word)) return baseResult({ error: 'invalid_word' });

  const verbs = ['निवारयति', 'रक्षति', 'वारयति', 'अवरोधयति'];
  const verbsIAST = ['nivārayati', 'rakṣati', 'vārayati', 'avarodhayati'];
  const v = context.verb || '';
  const matchesVerb = verbs.includes(v) || verbsIAST.includes(v);
  const types = ['prevention', 'protection', 'blocking'];
  const matchesType = types.includes(context.action_type);

  if (matchesVerb || matchesType) {
    return baseResult({ applies: true, script, word_iast: norm, case_valid: /[भ्यः|ात्|ोः|ेभ्यः]$/.test(word) ? true : false });
  }
  return baseResult();
}

export default identifyPreventionAblative;
