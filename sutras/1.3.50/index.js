/**
 * Sutra 1.3.50: विभाषा विप्रलापे
 * Type: Ātmanepada designation (optional)
 * Rule: For root वद् (vad), optionally Ātmanepada in the sense of mutual contradiction/arguing (विप्रलाप).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1350(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasVad = detectVadRoot(clean, script, context);
  if (!hasVad.found) return fail('Root वद् not detected');

  const sem = analyzeVipralapa(context);
  if (!sem.matched) return no('Requires contradiction/arguing sense');

  const reason = 'वद् in विप्रलाप (mutual contradiction) sense — optional Ātmanepada';
  return { applies: true, isAtmanepada: true, optional: true, confidence: 0.78, reason, sutraApplied: '1.3.50', details: { hasVad, sem } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.50', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.50', details:{} }; }

function detectVadRoot(word, script, context){
  const deva = [/\u0935\u0926\u094d/];
  const iast = [/\bvad/i];
  const fromCtx = (context.root && /(वद्?|vad)/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function analyzeVipralapa(context){
  const m = (context.semanticContext || context.meaning || '').toString().toLowerCase();
  const keys = ['contradict','contradiction','argue','arguing','arguing against each other','debate','quarrel','bicker','dispute'];
  const matched = keys.some(k=>m.includes(k));
  return { matched };
}

export default sutra1350;
