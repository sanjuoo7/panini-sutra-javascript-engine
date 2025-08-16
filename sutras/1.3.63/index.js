/**
 * Sutra 1.3.63: आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य
 * Type: Atideśa (carry-over)
 * Rule: When auxiliary कृ (kṛ) is used with a verb that (like an ām‑pratyaya verb) is Ātmanepada, the construction with auxiliary कृ also takes Ātmanepada, even if fruit does not accrue to agent.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1363(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return no('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return no('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return no('Unknown script');

  const isAuxKri = /(कृ|kṛ|kri)/i.test(String(context.auxiliaryRoot||''));
  const mainHasAm = context.mainHasAm === true || /\b(ām|आम्)\b/i.test(String(context.mainAffix||''));
  const mainAt = context.mainAtmanepada === true || context.baseAtmanepada === true;
  if (!(isAuxKri && mainAt && mainHasAm)) return no('Requires auxiliary कृ with main verb having ām and Ātmanepada');

  // Fruit to agent irrelevant (can be false)
  return { applies: true, isAtmanepada: true, confidence: 0.76, reason: 'Auxiliary कृ with ām‑class main verb carries Ātmanepada', sutraApplied: '1.3.63', details: { isAuxKri, mainHasAm, mainAt, fruitToAgent: context.fruitToAgent } };
}

function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.63', details:{} }; }

export default sutra1363;
