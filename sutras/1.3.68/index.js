/**
 * Sutra 1.3.68: भीस्म्योर्हेतुभये
 * Type: Ātmanepada designation (vidhi)
 * Rule: After causatives (णिच्) of भी ‘to fear’ and स्मि/स्मय् ‘to wonder’, Ātmanepada when fear is directly caused by the agent (हेतुभय), fruit-to-agent irrelevant.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1368(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return no('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return no('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return no('Unknown script');

  const isCausative = context.isCausative === true || /(णि|णिच्|ṇic|causative)/i.test(String(context.affix||context.lakara||''));
  if (!isCausative) return no('Requires causative (ṇic)');

  const root = String(context.root||'');
  const isBhiOrSmi = /(भी|bhī)/i.test(root) || /(स्मि|स्मय|smi|smay)/i.test(root);
  if (!isBhiOrSmi) return no('Requires roots भी/स्मि (causative)');

  const directCauseFear = context.directCauseFear === true || context.hetuBhaya === true;
  if (!directCauseFear) return no('Requires direct fear caused by agent (हेतुभय)');

  return { applies: true, isAtmanepada: true, confidence: 0.78, reason: 'Causative of भी/स्मि with direct fear', sutraApplied: '1.3.68', details: { isCausative, root, directCauseFear } };
}

function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.68', details:{} }; }

export default sutra1368;
