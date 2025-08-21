/**
 * Sutra 1.3.62: पूर्ववत् सन्
 * Type: Atideśa (carry-over)
 * Rule: After a Desiderative (सन्), use Ātmanepada if it would have been used for the primitive base verb.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1362(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return no('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return no('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return no('Unknown script');

  const isSan = context.isDesiderative === true || /(san|सन्)/i.test(String(context.affix||context.affixes||''));
  if (!isSan) return no('Not desiderative');

  const baseAt = context.baseAtmanepada === true || context.baseWouldBeAtmanepada === true;
  if (!baseAt) return { applies:false, isAtmanepada:false, confidence:0.4, reason:'Primitive not Ātmanepada', sutraApplied:'1.3.62', details:{ isSan, baseAt } };

  return { applies: true, isAtmanepada: true, confidence: 0.78, reason: 'Atideśa from primitive Ātmanepada to desiderative', sutraApplied: '1.3.62', details: { isSan, baseAt } };
}

function no(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.62', details:{} }; }

export default sutra1362;
