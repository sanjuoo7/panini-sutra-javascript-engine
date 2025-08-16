/**
 * Sutra 1.3.52: समः प्रतिज्ञाने
 * For root गॄ (to swallow), with prefix सम् (sam-), in promising sense (प्रतिज्ञान), Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1352(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasSam = detectSamPrefix(clean, script, context);
  if (!hasSam) return no('Requires सम् (sam-) prefix');

  const hasGru = detectGruRoot(clean, script, context);
  if (!hasGru.found) return fail('Root गॄ not detected');

  const sem = analyzePromise(context);
  if (!sem.matched) return no('Requires promising (प्रतिज्ञान) sense');

  const reason = 'सम् + गॄ in promising sense';
  return { applies: true, isAtmanepada: true, confidence: 0.8, reason, sutraApplied: '1.3.52', details: { hasSam, hasGru, sem } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.52', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.52', details:{} }; }

function detectSamPrefix(word, script, context){
  if (context.prefix === 'सम्' || context.prefix === 'sam') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(सम्|sam)$/i.test(p))) return true;
  return script==='Devanagari' ? /^\u0938\u092E/.test(word) : /^sam/i.test(word);
}

function detectGruRoot(word, script, context){
  const fromCtx = (context.root && /(गॄ|गृ|gṛ|gṝ|gru|gra)/i.test(context.root)) ? 0.9 : 0;
  if (fromCtx) return { found:true, confidence:fromCtx };
  const iast = [/(gṛ|gṝ|gr[uiā]?)/i];
  const match = script==='Devanagari' ? /\u0917/.test(word) && /\u0943?/.test(word) : iast.some(r=>r.test(word));
  return { found: !!match, confidence: match?0.6:0 };
}

function analyzePromise(context){
  const m = (context.semanticContext || context.meaning || '').toString().toLowerCase();
  const keys = ['promise','promising','pledge','vow','undertake','commit'];
  return { matched: keys.some(k=>m.includes(k)) };
}

export default sutra1352;
