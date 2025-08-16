/**
 * Sutra 1.3.67: णेरणौ यत् कर्म णौ चेत् स कर्ताऽनाध्याने
 * Type: Ātmanepada designation (vidhi)
 * Rule: After causative (णिच्) verbs, Ātmanepada when the non-causative object becomes the agent in the causative; not in the sense of regretful remembering; fruit-to-agent irrelevant.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1367(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return no('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return no('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return no('Unknown script');

  const isCausative = context.isCausative === true || /(णि|णिच्|ṇic|causative)/i.test(String(context.affix||context.lakara||''));
  if (!isCausative) return no('Requires causative (ṇic)');

  const objectBecomesAgent = context.objectBecomesAgent === true;
  if (!objectBecomesAgent) return no('Requires object→agent condition');

  const regretRemembering = context.isRegretfulRemembering === true || /(regret|अनुध्य|अनुस्म)/i.test(String(context.semantic||''));
  if (regretRemembering) return { applies:false, isAtmanepada:false, confidence:0.6, reason:'Excluded in regretful remembering sense', sutraApplied:'1.3.67', details:{} };

  return { applies: true, isAtmanepada: true, confidence: 0.79, reason: 'Causative with object→agent, not regret-remembering', sutraApplied: '1.3.67', details: { isCausative, objectBecomesAgent } };
}

function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.67', details:{} }; }

export default sutra1367;
