/**
 * Sutra 1.3.42: प्रोपाभ्यां समर्थाभ्याम् (propābhyāṃ samarthābhyām)
 * Type: Ātmanepada designation (vidhi)
 * Rule (from sources): After root क्रम् (kram) preceded by vi-, the Ātmanepada is used when (also) preceded by प्र-/उप- conveying the same sense (beginning/commencement).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1342(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasKram = checkKramRoot(clean, script, context);
  if (!hasKram.found) return fail('Root क्रम् not detected');

  const hasVi = detectViPrefix(clean, script, context);
  if (!hasVi) return no('Requires vi- (वि) prefix');

  const hasPra = detectPraPrefix(clean, script, context);
  const hasUpa = detectUpaPrefix(clean, script, context);
  if (!hasPra && !hasUpa) return no('Requires pra- (प्र) or upa- (उप) sense');

  const sem = analyzeBeginningSense(context);
  if (!sem.matches) return no('Requires beginning/commencement sense');

  const reason = `${hasPra ? 'प्र' : ''}${hasPra && hasUpa ? '+' : ''}${hasUpa ? 'उप' : ''} + वि + क्रम् in beginning sense`;
  const bonus = (hasPra && hasUpa) ? 0.1 : 0;
  return { applies: true, isAtmanepada: true, confidence: 0.85 + bonus, reason, sutraApplied: '1.3.42', details: { hasKram, hasVi, hasPra, hasUpa, sem } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.42', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.42', details:{} }; }

function checkKramRoot(word, script, context){
  const deva = [/क्रम/];
  const iast = [/kram/i];
  const fromCtx = (context.root && /^(क्रम्?|kram)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function detectViPrefix(word, script, context){
  if (context.prefix === 'vi' || context.prefix === 'वि') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(vi|वि)$/i.test(p))) return true;
  return (script==='Devanagari') ? /^वि/.test(word) : /^vi/i.test(word);
}

function detectPraPrefix(word, script, context){
  if (context.prefix === 'pra' || context.prefix === 'प्र') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(pra|प्र)$/i.test(p))) return true;
  return (script==='Devanagari') ? /^प्र/.test(word) : /^pra/i.test(word);
}

function detectUpaPrefix(word, script, context){
  if (context.prefix === 'upa' || context.prefix === 'उप') return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>/^(upa|उप)$/i.test(p))) return true;
  return (script==='Devanagari') ? /^उप/.test(word) : /^upa/i.test(word);
}

function analyzeBeginningSense(context){
  const m = (context.semanticContext||context.meaning||'').toString().toLowerCase();
  const keys = ['begin', 'beginning', 'commence', 'commencement', 'start', 'incept', 'initiate', 'embark'];
  const matches = keys.some(k=>m.includes(k));
  return { matches };
}
