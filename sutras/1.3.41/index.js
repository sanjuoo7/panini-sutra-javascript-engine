/**
 * Sutra 1.3.41: वेः पादविहरणे (veḥ pādaviharaṇe)
 * Rule: After root क्रम्, with vi- prefix (वि) in the sense of placing footsteps / walking, use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1341(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasKram = checkKramRoot(clean, script, context);
  if (!hasKram.found) return fail('Root क्रम् not detected');

  const hasVi = detectViPrefix(clean, script, context);
  if (!hasVi) return { applies: false, isAtmanepada: false, confidence: 0.4, reason: 'Requires vi- prefix (वि)', sutraApplied: '1.3.41', details: { hasKram } };

  const sem = analyzePadaViharana(context);
  if (!sem.matches) {
    return { applies: false, isAtmanepada: false, confidence: 0.4, reason: 'Requires pādaviharaṇa (placing footsteps) sense', sutraApplied: '1.3.41', details: { hasKram, sem } };
  }

  return { applies: true, isAtmanepada: true, confidence: 0.9, reason: 'वि + क्रम् in pādaviharaṇa sense', sutraApplied: '1.3.41', details: { hasKram, sem } };
}

function fail(reason){ return { applies:false,isAtmanepada:false,confidence:0,reason,sutraApplied:'1.3.41',details:{} } }

function checkKramRoot(word, script, context){
  const deva = [/क्रम/, /विक्रम/];
  const iast = [/kram/i, /vikram/i];
  const fromCtx = (context.root && /^(क्रम्?|kram)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function detectViPrefix(word, script, context){
  if (context.prefix && /^(वि|vi)$/i.test(context.prefix)) return true;
  return (script==='Devanagari') ? /^वि/.test(word) : /^vi/i.test(word);
}

function analyzePadaViharana(context){
  const m = (context.semanticContext||context.meaning||'').toString().toLowerCase();
  const keys = ['pādaviharaṇa','padaviharana','footstep','footsteps','walking','stride','step'];
  const matches = keys.some(k=>m.includes(k));
  return { matches };
}
