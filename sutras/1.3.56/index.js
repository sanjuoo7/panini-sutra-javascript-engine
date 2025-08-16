/**
 * Sutra 1.3.56: उपाद्यमः स्वकरणे
 * For root यम् (to restrain/receive; tradition gloss uses ‘to marry/espouse’ here), with उप (upa-), in sense of espousing → Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1356(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasUpa = detectUpaPrefix(clean, script, context);
  if (!hasUpa) return no('Requires उप (upa-) prefix');

  const hasYam = detectYamRoot(clean, script, context);
  if (!hasYam.found) return fail('Root यम् not detected');

  const sem = analyzeEspousing(context);
  if (!sem.matched) return no('Requires espousing/marrying sense');

  return { applies: true, isAtmanepada: true, confidence: 0.82, reason: 'उप + यम् in espousing sense', sutraApplied: '1.3.56', details: { hasUpa, hasYam, sem } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.56', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.56', details:{} }; }

function detectUpaPrefix(word, script, context){
  if (context.prefix === 'उप' || context.prefix === 'upa') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(उप|upa)$/i.test(p))) return true;
  return script==='Devanagari' ? /^\u0909\u092A/.test(word) : /^upa/i.test(word);
}

function detectYamRoot(word, script, context){
  const fromCtx = (context.root && /(यम्?|yam)/i.test(context.root)) ? 0.9 : 0;
  const deva = [/\u092F\u092E/];
  const iast = [/\byam/i];
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function analyzeEspousing(context){
  const m = (context.semanticContext || context.meaning || '').toString().toLowerCase();
  const keys = ['espouse','espousing','marry','marriage','wed','wedding','take as spouse'];
  return { matched: keys.some(k=>m.includes(k)) };
}

export default sutra1356;
