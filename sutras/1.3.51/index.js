/**
 * Sutra 1.3.51: अवाद्ग्रः (avādgraḥ)
 * Type: Ātmanepada designation (vidhi)
 * Rule: For root गॄ (to swallow), when preceded by अव (ava-), Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1351(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasAva = detectAvaPrefix(clean, script, context);
  if (!hasAva) return no('Requires अव (ava-) prefix');

  const hasGru = detectGruRoot(clean, script, context);
  if (!hasGru.found) return fail('Root गॄ (to swallow) not detected');

  const reason = 'अव + गॄ (to swallow)';
  return { applies: true, isAtmanepada: true, confidence: 0.8, reason, sutraApplied: '1.3.51', details: { hasAva, hasGru } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.51', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.51', details:{} }; }

function detectAvaPrefix(word, script, context){
  if (context.prefix === 'अव' || context.prefix === 'ava') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(अव|ava)$/i.test(p))) return true;
  return script==='Devanagari' ? /^\u0905\u0935/.test(word) : /^ava/i.test(word);
}

function detectGruRoot(word, script, context){
  // Heuristic acceptance via context; surface detection lenient due to orthography variance
  const fromCtx = (context.root && /(गॄ|गृ|gr̄|gṝ|gṛ|gru|gra)/i.test(context.root)) ? 0.9 : 0;
  if (fromCtx) return { found:true, confidence:fromCtx };
  const deva = [/[\u0917\u0943\u093C]?/, /\u0917\u094D\u0930/]; // गृ / ग्र
  const iast = [/(gṛ|gṝ|gr[uiā]?)/i];
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: !!match, confidence: match?0.6:0 };
}

export default sutra1351;
