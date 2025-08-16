/**
 * Sutra 1.3.46: सम्प्रतिभ्यामनाध्याने (sampratibhyām anādhyāne)
 * Rule: After root ज्ञ, preceded by sam- and prati-, use Ātmanepada when not in the sense of remembering with regret (anādhyāna here interpreted as non-regretful recollection block lifted).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1346(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const hasJna = checkJnaRoot(clean, script, context);
  if (!hasJna.found) return fail('Root ज्ञ not detected');

  const hasSam = detectPrefix(clean, script, context, 'sam');
  const hasPrati = detectPrefix(clean, script, context, 'prati');
  if (!(hasSam && hasPrati)) return no('Requires both sam- and prati-');

  const sem = analyzeRegretSense(context);
  if (sem.isRegret) return no('Blocked in regretful remembering sense');

  return { applies: true, isAtmanepada: true, confidence: 0.85, reason: 'सम्+प्रति + ज्ञ without regret sense', sutraApplied: '1.3.46', details: { hasSam, hasPrati } };
}

function fail(reason){ return { applies:false,isAtmanepada:false,confidence:0,reason,sutraApplied:'1.3.46',details:{} }; }
function no(reason){ return { applies:false,isAtmanepada:false,confidence:0.4,reason,sutraApplied:'1.3.46',details:{} }; }

function checkJnaRoot(word, script, context){
  const deva = [/ज्ञा/, /जानाति/, /जानाते/, /अजानीत/];
  const iast = [/jñā/i, /jānāti/i, /jānāte/i, /ajānit/i, /jñ/i];
  const fromCtx = (context.root && /^(ज्ञा|jñā|jna)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script==='Devanagari'?deva:iast).some(r=>r.test(word));
  return { found: match || !!fromCtx, confidence: match?0.9:fromCtx };
}

function detectPrefix(word, script, context, which){
  const map = { sam: ['सम्','sam'], prati: ['प्रति','prati'] };
  const [deva, iast] = map[which] || [];
  if (context.prefix === deva || context.prefix === iast) return true;
  if (Array.isArray(context.prefixes) && context.prefixes.some(p=>p===deva || p===iast)) return true;
  const reDeva = which==='sam' ? /^सम/ : /^प्रति/;
  const reIast = which==='sam' ? /^sam/i : /^prati/i;
  return script==='Devanagari' ? reDeva.test(word) : reIast.test(word);
}

function analyzeRegretSense(context){
  const m = (context.semanticContext||context.meaning||'').toString().toLowerCase();
  const regretKeys = ['regret','repent','lament','feel sorry','remember with regret','smaraṇa with regret','anuśocati'];
  const isRegret = regretKeys.some(k=>m.includes(k));
  return { isRegret };
}
