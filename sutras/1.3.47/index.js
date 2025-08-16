/**
 * Sutra 1.3.47: भासनोपसम्भाषाज्ञानयत्नविमत्युपमन्त्रणेषु वदः
 * Type: Ātmanepada designation (vidhi)
 * Rule: For root वद् (vad ‘to speak’), Ātmanepada when the intended sense is any of:
 *  - भासन (showing brilliance/proficiency),
 *  - उपसंभाषा (pacifying/conciliatory speech),
 *  - ज्ञान (knowledge/knowing statement),
 *  - यत्न (effort/attempt),
 *  - विमति (difference of opinion/dissent),
 *  - उपमन्त्रण (flattering/solicitation).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1347(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasVad = detectVadRoot(clean, script, context);
  if (!hasVad.found) return fail('Root वद् not detected');

  const sense = analyzeSenses(context);
  if (!sense.matched) return no('Required senses not detected');

  const reason = `वद् with sense: ${sense.key}`;
  return { applies: true, isAtmanepada: true, confidence: 0.82, reason, sutraApplied: '1.3.47', details: { hasVad, sense } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.47', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.47', details:{} }; }

function detectVadRoot(word, script, context){
  const deva = [/\u0935\u0926\u094d/]; // वद्
  const iast = [/\bvad/i];
  const fromCtx = (context.root && /(वद्?|vad)/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function analyzeSenses(context){
  const m = (context.semanticContext || context.meaning || context.gloss || '').toString().toLowerCase();
  const senseMap = [
    { key: 'brilliance/proficiency', keys: ['brilliance','brilliant','shine','proficiency','skill','expertise','display','show off'] },
    { key: 'pacifying/conciliation', keys: ['pacify','pacifying','appease','appeasing','conciliate','conciliation','soothe','calm'] },
    { key: 'knowledge', keys: ['knowledge','knowingly','knowing','awareness'] },
    { key: 'effort', keys: ['effort','attempt','try','endeavor','yatna'] },
    { key: 'difference of opinion', keys: ['difference of opinion','dissent','disagree','disagreement','vimate','vimati'] },
    { key: 'flattering/soliciting', keys: ['flatter','flattering','cajole','coax','solicit','entreat','upamantra','butter'] }
  ];
  for (const s of senseMap){
    if (s.keys.some(k=>m.includes(k))) return { matched:true, key:s.key };
  }
  return { matched:false, key:null };
}

export default sutra1347;
