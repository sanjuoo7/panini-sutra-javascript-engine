/**
 * Sutra 1.3.61: म्रियतेर् लुङ्लिङोश्च
 * Type: Ātmanepada designation
 * Rule: After मृत्/मृ (mṛ ‘to die’), with śit affixes, and also with लुङ् (aorist) or लिङ् (benedictive), use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1361(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const isMr = /(मृ|मृत्|\bm[ṛr])/i.test(String(context.root||''));
  if (!isMr) return no('Root मृ not detected');

  const hasSIT = hasShitIndicator(context);
  const isLun = isTenseMood(context, ['luṅ','aorist']);
  const isLin = isTenseMood(context, ['liṅ','benedictive']);
  if (!(hasSIT || isLun || isLin)) return no('Requires śit affix or luṅ/liṅ');

  return { applies: true, isAtmanepada: true, confidence: 0.82, reason: 'मृ with śit or luṅ/liṅ', sutraApplied: '1.3.61', details: { hasSIT, isLun, isLin } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.61', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.61', details:{} }; }

function hasShitIndicator(ctx){
  if (ctx.isShitAffix === true || ctx.hasShit === true) return true;
  const ind = String(ctx.affixIndicators||ctx.indicators||'').toLowerCase();
  return /\b(ś|श)\b/.test(ind) || /\bshit\b/.test(ind) || /शित/.test(String(ctx.affix||''));
}

function isTenseMood(ctx, keys){
  const t = String(ctx.tenseMood||ctx.lakara||ctx.affix||'').toLowerCase();
  return keys.some(k=>t.includes(k.toLowerCase()));
}

export default sutra1361;
