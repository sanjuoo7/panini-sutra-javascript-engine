/**
 * Sutra 1.3.59: प्रत्याङ्भ्यां श्रुवः
 * Type: Restriction (pratiṣedha)
 * Rule: After desiderative (सन्) of श्रु (to hear), when preceded by प्रति or आङ् (either), do NOT use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1359(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return pass('Invalid input gate');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return pass('Validation bypass');
  const script = detectScript(clean);
  if (script === 'Unknown') return pass('Unknown script');

  const isSan = context.isDesiderative === true || /\b(san|सन्)\b/.test(String(context.affix||context.affixes||''));
  // Accept both Devanagari and IAST for root śru without word-boundary constraints
  const isShru = /(श्रु|śru)/i.test(String(context.root||''));
  if (!isSan || !isShru) return pass('Not in scope');

  const hasPrati = hasPrefix(clean, script, context, ['प्रति','prati']);
  const hasAng = hasPrefix(clean, script, context, ['आ','ā','आङ्','āṅ']);
  if (!(hasPrati || hasAng)) return pass('No प्रति/आङ् prefix');

  return { applies: true, isAtmanepada: false, confidence: 0.84, reason: 'Desiderative of श्रु with प्रति/आङ् — prohibits Ātmanepada', sutraApplied: '1.3.59', details: { isSan, isShru, hasPrati, hasAng } };
}

function pass(reason){ return { applies:false, isAtmanepada:false, confidence:0, reason, sutraApplied:'1.3.59', details:{} }; }

function hasPrefix(word, script, ctx, forms){
  if (typeof ctx.prefix === 'string' && forms.some(f=>eq(ctx.prefix,f))) return true;
  if (Array.isArray(ctx.prefixes) && ctx.prefixes.some(p=>forms.some(f=>eq(p,f)))) return true;
  if (script==='Devanagari') return forms.some(f=>/^(.{0,2})/.test(f)) && ( /^\u092a\u094d\u0930\u0924\u093f/.test(word) || /^\u0906/.test(word) );
  return /^prati/i.test(word) || /^ā/i.test(word);
}

function eq(a,b){ return String(a).toLowerCase()===String(b).toLowerCase(); }

export default sutra1359;
