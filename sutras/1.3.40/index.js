/**
 * Sutra 1.3.40: आङ उद्गमने (āṅ udgamane)
 * Rule: After root क्रम्, with āṅ- prefix (आ-) in sense of the rising of a luminary (udgamana), use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1340(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasKram = checkKramRoot(clean, script, context);
  if (!hasKram.found) return fail('Root क्रम् not detected');

  const hasAng = detectAngPrefix(clean, script, context);
  if (!hasAng) return { applies: false, isAtmanepada: false, confidence: 0.4, reason: 'Requires āṅ prefix (आ-)', sutraApplied: '1.3.40', details: { hasKram } };

  const sem = analyzeUdgamana(context);
  if (!sem.matches) {
    return { applies: false, isAtmanepada: false, confidence: 0.4, reason: 'Requires udgamana (rising of luminary) sense', sutraApplied: '1.3.40', details: { hasKram, sem } };
  }

  return { applies: true, isAtmanepada: true, confidence: 0.9, reason: 'आङ + क्रम् in udgamana sense', sutraApplied: '1.3.40', details: { hasKram, sem } };
}

function fail(reason){ return { applies:false,isAtmanepada:false,confidence:0,reason,sutraApplied:'1.3.40',details:{} } }

function checkKramRoot(word, script, context){
  const deva = [/क्रम/, /आक्रम/];
  const iast = [/kram/i, /ākram/i, /akram/i];
  const fromCtx = (context.root && /^(क्रम्?|kram)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function detectAngPrefix(word, script, context){
  if (context.prefix && /^(आङ्|आ|āṅ|ā)$/i.test(context.prefix)) return true;
  return (script==='Devanagari') ? /^आ/.test(word) : /^(ā|aa)/i.test(word);
}

function analyzeUdgamana(context){
  const m = (context.semanticContext||context.meaning||'').toString().toLowerCase();
  const keys = ['udgamana','rising','rise','luminary','sunrise','moonrise','star'];
  const matches = keys.some(k=>m.includes(k));
  return { matches };
}
