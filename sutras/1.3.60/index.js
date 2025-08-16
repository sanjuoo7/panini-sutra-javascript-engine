/**
 * Sutra 1.3.60: शदेः शितः
 * Type: Ātmanepada designation
 * Rule: After शद् (śad ‘to decay’), when the affix is śit (indicator श्), use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1360(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const isShad = /(शद्?|\bśad)/i.test(String(context.root||''));
  if (!isShad) return no('Root शद् not detected');

  const hasSIT = hasShitIndicator(context);
  if (!hasSIT) return no('Requires śit affix (शित्)');

  return { applies: true, isAtmanepada: true, confidence: 0.8, reason: 'शद् with śit affix', sutraApplied: '1.3.60', details: { isShad, hasSIT } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.60', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.60', details:{} }; }

function hasShitIndicator(ctx){
  if (ctx.isShitAffix === true || ctx.hasShit === true) return true;
  const ind = String(ctx.affixIndicators||ctx.indicators||'').toLowerCase();
  return /\b(ś|श)\b/.test(ind) || /\bshit\b/.test(ind) || /शित/.test(String(ctx.affix||''));
}

export default sutra1360;
