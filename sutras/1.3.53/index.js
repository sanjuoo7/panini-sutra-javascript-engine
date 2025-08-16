/**
 * Sutra 1.3.53: उदश्चरः सकर्मकात्
 * For root चर् (to walk), preceded by उद् (ud-), intransitive usage → Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1353(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasUd = detectUdPrefix(clean, script, context);
  if (!hasUd) return no('Requires उद् (ud-) prefix');

  const hasCar = detectCarRoot(clean, script, context);
  if (!hasCar.found) return fail('Root चर् not detected');

  const isIntrans = isIntransitive(context);
  if (!isIntrans) return no('Requires intransitive (akarmaka) usage');

  return { applies: true, isAtmanepada: true, confidence: 0.8, reason: 'उद् + चर्, अकर्मक', sutraApplied: '1.3.53', details: { hasUd, hasCar, isIntrans } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.53', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.53', details:{} }; }

function detectUdPrefix(word, script, context){
  if (context.prefix === 'उद्' || context.prefix === 'ud') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(उद्|ud)$/i.test(p))) return true;
  return script==='Devanagari' ? /^\u0909\u0926/.test(word) : /^ud/i.test(word);
}

function detectCarRoot(word, script, context){
  const fromCtx = (context.root && /(चर्?|car)/i.test(context.root)) ? 0.9 : 0;
  const deva = [/\u091A\u0930/];
  const iast = [/\bcar/i];
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function isIntransitive(context){
  if (typeof context.isTransitive === 'boolean') return !context.isTransitive;
  if (typeof context.transitivity === 'string') return /intrans/i.test(context.transitivity);
  return false;
}

export default sutra1353;
