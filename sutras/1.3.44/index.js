/**
 * Sutra 1.3.44: अपह्नवे ज्ञः (apahanave jñaḥ)
 * Rule: After root ज्ञ (jñā 'to know') in sense of denying (apahanana), use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1344(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasJna = checkJnaRoot(clean, script, context);
  if (!hasJna.found) return fail('Root ज्ञ not detected');

  const sem = analyzeDenialSense(context);
  if (!sem.matches) return { applies: false, isAtmanepada: false, confidence: 0.4, reason: 'Requires apahnava (denial) sense', sutraApplied: '1.3.44', details: { sem } };

  return { applies: true, isAtmanepada: true, confidence: 0.9, reason: 'ज्ञ in denying sense', sutraApplied: '1.3.44', details: { sem } };
}

function fail(reason){ return { applies:false,isAtmanepada:false,confidence:0,reason,sutraApplied:'1.3.44',details:{} }; }

function checkJnaRoot(word, script, context){
  const deva = [/ज्ञा/, /जानाति/, /जानाते/, /अजानीत/];
  const iast = [/jñā/i, /jānāti/i, /jānāte/i, /ajānit/i, /jñ/i];
  const fromCtx = (context.root && /^(ज्ञा|jñā|jna)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function analyzeDenialSense(context){
  const m = (context.semanticContext||context.meaning||'').toString().toLowerCase();
  const keys = ['deny','denial','disown','disavow','repudiate','apahnava','apahnav'];
  const matches = keys.some(k=>m.includes(k));
  return { matches };
}
