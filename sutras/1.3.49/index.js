/**
 * Sutra 1.3.49: अनोरकर्मकात्
 * Type: Ātmanepada designation (vidhi)
 * Rule: For root वद् (vad), when preceded by अनु (anu-) and intransitive usage (अकर्मक),
 * in the same articulate/unison sense of 1.3.48, designate Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1349(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasVad = detectVadRoot(clean, script, context);
  if (!hasVad.found) return fail('Root वद् not detected');

  const hasAnu = detectAnuPrefix(clean, script, context);
  if (!hasAnu) return no('Requires अनु (anu-) prefix');

  const isIntrans = isIntransitive(context);
  if (!isIntrans) return no('Requires intransitive (akarmaka) usage');

  const sem = analyzeSamuccharana(context);
  if (!sem.matched) return no('Requires articulate/unison utterance sense');

  const reason = 'अनु + वद्, अकर्मक, समुच्चारणे';
  return { applies: true, isAtmanepada: true, confidence: 0.83, reason, sutraApplied: '1.3.49', details: { hasVad, hasAnu, isIntrans, sem } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.49', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.49', details:{} }; }

function detectVadRoot(word, script, context){
  const deva = [/\u0935\u0926\u094d/];
  const iast = [/\bvad/i];
  const fromCtx = (context.root && /(वद्?|vad)/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function detectAnuPrefix(word, script, context){
  if (context.prefix === 'अनु' || context.prefix === 'anu') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(अनु|anu)$/i.test(p))) return true;
  return script==='Devanagari' ? /^\u0905\u0928\u0941/.test(word) : /^anu/i.test(word);
}

function isIntransitive(context){
  if (typeof context.isTransitive === 'boolean') return !context.isTransitive;
  if (typeof context.transitivity === 'string') return /intrans/i.test(context.transitivity);
  return false;
}

function analyzeSamuccharana(context){
  const m = (context.semanticContext || context.meaning || '').toString().toLowerCase();
  const keys = ['articulate','articulately','clear speech','enunciate','enunciation','pronounce clearly','pronunciation','in unison','together','chorus','echo','similar manner','same utterance'];
  const matched = keys.some(k=>m.includes(k));
  return { matched };
}

export default sutra1349;
