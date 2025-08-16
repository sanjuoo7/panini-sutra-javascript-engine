/**
 * Sutra 1.3.55: दाणश्च सा चेच्चतुर्थ्यर्थे
 * Extension: For root दा (to give), with सम् and instrumental linkage that semantically functions as dative (चतुर्थी अर्थ), Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1355(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasSam = detectSamPrefix(clean, script, context);
  if (!hasSam) return no('Requires सम् (sam-) prefix');

  const hasDa = detectDaRoot(clean, script, context);
  if (!hasDa.found) return fail('Root दा not detected');

  const hasInstr = hasInstrumentalLink(context);
  if (!hasInstr) return no('Requires तृतीया (instrumental) linkage');

  const hasDativeSense = hasInstrumentalWithDativeSense(context);
  if (!hasDativeSense) return no('Requires instrumental with dative sense (चतुर्थ्यर्थ)');

  return { applies: true, isAtmanepada: true, confidence: 0.82, reason: 'सम् + दा with instrumental having dative sense', sutraApplied: '1.3.55', details: { hasSam, hasDa, hasInstr, hasDativeSense } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.55', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.55', details:{} }; }

function detectSamPrefix(word, script, context){
  if (context.prefix === 'सम्' || context.prefix === 'sam') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(सम्|sam)$/i.test(p))) return true;
  return script==='Devanagari' ? /^\u0938\u092E/.test(word) : /^sam/i.test(word);
}

function detectDaRoot(word, script, context){
  const fromCtx = (context.root && /(दा|dā)/i.test(context.root)) ? 0.9 : 0;
  const deva = [/\u0926\u093E\u094D/]; // दा
  const iast = [/\bdā/i];
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function hasInstrumentalLink(context){
  if (Array.isArray(context.cases)) return context.cases.some(c=>/^(tṛtīyā|instrumental|ins|tritiya)$/i.test(c.case || c));
  if (typeof context.instrumental === 'boolean') return context.instrumental;
  if (typeof context.case === 'string') return /instrumental|tṛtīyā|tritiya|ins/i.test(context.case);
  return false;
}

function hasInstrumentalWithDativeSense(context){
  // Look for semantic role markers
  if (Array.isArray(context.caseRoles)) return context.caseRoles.some(r=>/dative|recipient|benefactive|purpose/i.test(r.role || r));
  if (typeof context.dativeSense === 'boolean') return context.dativeSense;
  if (typeof context.semanticRole === 'string') return /recipient|benefactive|purpose|to someone/i.test(context.semanticRole);
  const gloss = (context.semanticContext || context.meaning || '').toString().toLowerCase();
  if (/(for|to) (him|her|them|someone)/.test(gloss)) return true;
  return false;
}

export default sutra1355;
