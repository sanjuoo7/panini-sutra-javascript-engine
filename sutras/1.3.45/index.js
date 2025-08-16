/**
 * Sutra 1.3.45: अकर्मकाच्च (akarmakāc ca)
 * Rule: And for ज्ञ used intransitively where fruit does not accrue to agent, use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1345(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasJna = checkJnaRoot(clean, script, context);
  if (!hasJna.found) return fail('Root ज्ञ not detected');

  const trans = analyzeTransitivity(context);
  if (!trans.isIntransitive) return no('Requires intransitive usage');
  if (trans.fruitToAgent) return no('Requires non-accrual of fruit to agent');

  return { applies: true, isAtmanepada: true, confidence: 0.85, reason: 'ज्ञ intransitive with non-agent fruit', sutraApplied: '1.3.45', details: trans };
}

function fail(reason){ return { applies:false,isAtmanepada:false,confidence:0,reason,sutraApplied:'1.3.45',details:{} }; }
function no(reason){ return { applies:false,isAtmanepada:false,confidence:0.4,reason,sutraApplied:'1.3.45',details:{} }; }

function checkJnaRoot(word, script, context){
  const deva = [/ज्ञा/, /जानाति/, /जानाते/, /अजानीत/];
  const iast = [/jñā/i, /jānāti/i, /jānāte/i, /ajānit/i, /jñ/i];
  const fromCtx = (context.root && /^(ज्ञा|jñā|jna)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function analyzeTransitivity(context){
  const isIntransitive = !!(context.intransitive || context.valency==='intransitive' || context.karmaka===false);
  const fruitToAgent = !!(context.phalaToAgent || context.phala === 'agent');
  return { isIntransitive, fruitToAgent };
}
