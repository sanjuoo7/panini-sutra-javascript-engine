/**
 * Sutra 1.3.58: नानोर्ज्ञः
 * Type: Restriction (pratiṣedha)
 * Rule: After desiderative (सन्) of ज्ञा with prefix अनु (anu-), do NOT use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1358(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return pass('Invalid input gate');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return pass('Validation bypass');
  const script = detectScript(clean);
  if (script === 'Unknown') return pass('Unknown script');

  // Must be desiderative of jñā
  const isSan = context.isDesiderative === true || /\b(san|सन्)\b/.test(String(context.affix||context.affixes||''));
  const isJna = /(ज्ञा|jñā)/i.test(String(context.root||''));
  if (!isSan || !isJna) return pass('Not in scope');

  // Requires अनु prefix
  const hasAnu = hasAnuPrefix(clean, script, context);
  if (!hasAnu) return pass('No अनु prefix');

  return { applies: true, isAtmanepada: false, confidence: 0.86, reason: 'Desiderative of ज्ञा with अनु — prohibits Ātmanepada', sutraApplied: '1.3.58', details: { isSan, isJna, hasAnu } };
}

function pass(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.58', details:{} }; }

function hasAnuPrefix(word, script, ctx){
  if (ctx.prefix === 'अनु' || /^anu$/i.test(ctx.prefix||'')) return true;
  if (Array.isArray(ctx.prefixes) && ctx.prefixes.some(p=>/^(अनु|anu)$/i.test(p))) return true;
  return script==='Devanagari' ? /^\u0905\u0928\u0941/.test(word) : /^anu/i.test(word);
}

export default sutra1358;
