/**
 * Sutra 1.3.57: ज्ञाश्रुस्मृदृशां सनः
 * Type: Ātmanepada designation
 * Rule: After the desiderative (सन्) forms of roots ज्ञा (to know), श्रु (to hear),
 *       स्मृ (to remember), and दृश् (to see), use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1357(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return fail('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return fail('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return fail('Unknown script');

  const isSan = isDesiderative(context);
  if (!isSan) return no('Requires desiderative (सन्) formation');

  const rootHit = detectTargetRoot(context, script);
  if (!rootHit.matched) return fail('Root not in {ज्ञा, श्रु, स्मृ, दृश्}');

  const reason = `Desiderative of ${rootHit.root} → Ātmanepada`;
  return { applies: true, isAtmanepada: true, confidence: 0.82, reason, sutraApplied: '1.3.57', details: { isSan, rootHit } };
}

function fail(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.57', details:{} }; }
function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.57', details:{} }; }

function isDesiderative(ctx){
  if (!ctx) return false;
  if (ctx.category === 'desiderative' || ctx.isDesiderative === true) return true;
  const aff = (ctx.affix || ctx.affixes || []).toString().toLowerCase();
  return /\b(san|सन्)\b/.test(aff);
}

function detectTargetRoot(ctx, script){
  const candidatesDeva = ['ज्ञा','श्रु','स्मृ','दृश्','दृश'];
  const candidatesIAST = ['jñā','śru','smṛ','dṛś','dr̥ś','drish'];
  const r = (ctx.root || ctx.dhatu || '').toString();
  const root = r.trim();
  if (!root) return { matched:false, root:null };
  if (script === 'Devanagari') {
    return { matched: candidatesDeva.includes(root), root };
  } else {
    const rootLower = root.normalize('NFC');
    return { matched: candidatesIAST.includes(rootLower), root };
  }
}

export default sutra1357;
