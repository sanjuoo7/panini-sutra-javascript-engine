/**
 * Sutra 1.3.39: उपपराभ्याम् (upaparābhyām)
 * Rule: After root क्रम्, when preceded by उप (upa-) or पर (para-) and used in senses of 1.3.38, use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1339(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasKram = checkKramRoot(clean, script, context);
  if (!hasKram.found) return fail('Root क्रम् not detected');

  const prefix = detectPrefixUpaPara(clean, script, context);
  if (!prefix.has) {
    return { applies: false, isAtmanepada: false, confidence: 0.4, reason: 'Requires upa- or para- prefix', sutraApplied: '1.3.39', details: { hasKram, prefix } };
  }

  const sem = analyzeSemantic1338(context);
  if (!sem.matches) {
    return { applies: false, isAtmanepada: false, confidence: 0.4, reason: 'Requires vṛtti/sarga/āyana sense', sutraApplied: '1.3.39', details: { hasKram, prefix, sem } };
  }

  return { applies: true, isAtmanepada: true, confidence: 0.9, reason: 'उप/पर + क्रम् in required senses', sutraApplied: '1.3.39', details: { hasKram, prefix, sem } };
}

function fail(reason){ return { applies:false,isAtmanepada:false,confidence:0,reason,sutraApplied:'1.3.39',details:{} } }

function checkKramRoot(word, script, context){
  const deva = [/क्रम/, /परिक्रम/, /उपक्रम/];
  const iast = [/kram/i, /parikram/i, /upakram/i];
  const fromCtx = (context.root && /^(क्रम्?|kram)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function detectPrefixUpaPara(word, script, context){
  const fromCtx = (context.prefix && /^(उप|upa|पर|para)$/i.test(context.prefix));
  const patterns = script==='Devanagari' ? [/^उप/, /^परि/] : [/^upa/i, /^pari/i];
  const has = fromCtx || patterns.some(r=>r.test(word));
  return { has };
}

function analyzeSemantic1338(context){
  const m = (context.semanticContext||context.meaning||'').toString().toLowerCase();
  const keys = ['vṛtti','vrtti','continuity','sarga','creation','energy','ayana','development','progression','advance'];
  const matches = keys.some(k=>m.includes(k));
  return { matches };
}
