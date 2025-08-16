/**
 * Sutra 1.3.48: व्यक्तवाचां समुच्चारणे
 * Type: Ātmanepada designation (vidhi)
 * Rule: For root वद् (vad ‘to speak’), Ātmanepada when speaking articulately/in unison/similar manner (समुच्चारण).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1348(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasVad = detectVadRoot(clean, script, context);
  if (!hasVad.found) return fail('Root वद् not detected');

  const sem = analyzeSamuccharana(context);
  if (!sem.matched) return no('Requires articulate/similar/unison utterance sense');

  const reason = 'वद् with व्यक्तवाचां समुच्चारण (articulate/unison) sense';
  return { applies: true, isAtmanepada: true, confidence: 0.8, reason, sutraApplied: '1.3.48', details: { hasVad, sem } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.48', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.48', details:{} }; }

function detectVadRoot(word, script, context){
  const deva = [/\u0935\u0926\u094d/];
  const iast = [/\bvad/i];
  const fromCtx = (context.root && /(वद्?|vad)/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function analyzeSamuccharana(context){
  const m = (context.semanticContext || context.meaning || '').toString().toLowerCase();
  const keys = ['articulate','articulately','clear speech','enunciate','enunciation','pronounce clearly','pronunciation','in unison','together','chorus','echo','similar manner','same utterance'];
  const matched = keys.some(k=>m.includes(k));
  return { matched };
}

export default sutra1348;
