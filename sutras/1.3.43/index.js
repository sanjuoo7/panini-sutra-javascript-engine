/**
 * Sutra 1.3.43: अनुपसर्गाद्वा (anupasargād vā)
 * Rule: For root क्रम्, optionally Ātmanepada when not preceded by any prefix (upasarga).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1343(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasKram = checkKramRoot(clean, script, context);
  if (!hasKram.found) return fail('Root क्रम् not detected');

  const hasAnyPrefix = detectAnyPrefix(clean, script, context);
  if (hasAnyPrefix) return { applies: false, isAtmanepada: false, optional: false, confidence: 0.4, reason: 'Has prefix; rule requires no upasarga', sutraApplied: '1.3.43', details: { hasKram, hasAnyPrefix } };

  // Optional usage marker
  return { applies: true, isAtmanepada: true, optional: true, confidence: 0.7, reason: 'Anupasarga (no prefix) with क्रम् permits Ātmanepada optionally', sutraApplied: '1.3.43', details: { hasKram } };
}

function fail(reason){ return { applies:false,isAtmanepada:false,confidence:0,reason,sutraApplied:'1.3.43',details:{} }; }

function checkKramRoot(word, script, context){
  const deva = [/क्रम/];
  const iast = [/kram/i];
  const fromCtx = (context.root && /^(क्रम्?|kram)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function detectAnyPrefix(word, script, context){
  if (typeof context.prefix === 'string' && context.prefix.trim()) return true;
  if (Array.isArray(context.prefixes) && context.prefixes.length) return true;
  // Heuristic: surface prefixes at word start in both scripts
  const deva = [/^(प्र|वि|उप|आ|परि|सम|अधि|निर|नि|दुर|सु|अप|अभि|आवि)/];
  const iast = [/^(pra|vi|upa|ā|pari|sam|adhi|nir|ni|dur|su|apa|abhi|āvi)/i];
  return script==='Devanagari' ? deva.some(r=>r.test(word)) : iast.some(r=>r.test(word));
}
