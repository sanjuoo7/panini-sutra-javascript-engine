/**
 * Sutra 1.3.38: वृत्तिसर्गतायनेषु क्रमः (vṛttisargatāyaneṣu kramaḥ)
 * Rule: After root क्रम् (kram), in senses of continuity (vṛtti), energy/production (sarga), development/progression (āyana), use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1338(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasKram = checkKramRoot(clean, script, context);
  if (!hasKram.found) return fail('Root क्रम् not detected');

  const sem = analyzeSemantic1338(context);
  if (!sem.matches) {
    return { applies: false, isAtmanepada: false, confidence: 0.4, reason: 'Requires vṛtti/sarga/āyana sense', sutraApplied: '1.3.38', details: { hasKram, sem } };
  }

  return { applies: true, isAtmanepada: true, confidence: 0.9, reason: 'क्रम् in vṛtti/sarga/āyana sense', sutraApplied: '1.3.38', details: { hasKram, sem } };
}

function fail(reason){ return { applies:false,isAtmanepada:false,confidence:0,reason,sutraApplied:'1.3.38',details:{} } }

function checkKramRoot(word, script, context){
  const deva = [/क्रम/, /क्रमते/, /विक्रम/, /परिक्रम/, /उपक्रम/, /आक्रम/];
  const iast = [/kram/i, /vikram/i, /parikram/i, /upakram/i, /ākram/i, /akram/i];
  const fromCtx = (context.root && /^(क्रम्?|kram)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function analyzeSemantic1338(context){
  const m = (context.semanticContext||context.meaning||'').toString().toLowerCase();
  const keys = ['vṛtti','vrtti','continuity','sarga','creation','energy','ayana','development','progression','advance'];
  const matches = keys.some(k=>m.includes(k));
  return { matches };
}
