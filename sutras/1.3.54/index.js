/**
 * Sutra 1.3.54: समस्तृतीयायुक्तात्
 * For root चर् with सम्, and linked to an Instrumental (3rd case) argument → Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1354(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasSam = detectSamPrefix(clean, script, context);
  if (!hasSam) return no('Requires सम् (sam-) prefix');

  const hasCar = detectCarRoot(clean, script, context);
  if (!hasCar.found) return fail('Root चर् not detected');

  const hasInstr = hasInstrumentalLink(context);
  if (!hasInstr) return no('Requires तृतीया (instrumental) linkage');

  return { applies: true, isAtmanepada: true, confidence: 0.8, reason: 'सम् + चर् with instrumental linkage', sutraApplied: '1.3.54', details: { hasSam, hasCar, hasInstr } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.54', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.54', details:{} }; }

function detectSamPrefix(word, script, context){
  if (context.prefix === 'सम्' || context.prefix === 'sam') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(सम्|sam)$/i.test(p))) return true;
  return script==='Devanagari' ? /^\u0938\u092E/.test(word) : /^sam/i.test(word);
}

function detectCarRoot(word, script, context){
  const fromCtx = (context.root && /(चर्?|car)/i.test(context.root)) ? 0.9 : 0;
  const deva = [/\u091A\u0930/];
  const iast = [/\bcar/i];
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function hasInstrumentalLink(context){
  // Expect case marking info in context; minimal heuristic
  if (Array.isArray(context.cases)) return context.cases.some(c=>/^(tṛtīyā|instrumental|ins|tritiya)$/i.test(c.case || c));
  if (typeof context.instrumental === 'boolean') return context.instrumental;
  if (typeof context.case === 'string') return /instrumental|tṛtīyā|tritiya|ins/i.test(context.case);
  return false;
}

export default sutra1354;
