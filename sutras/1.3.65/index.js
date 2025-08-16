/**
 * Sutra 1.3.65: समः क्ष्णुवः
 * Type: Ātmanepada designation (vidhi)
 * Rule: After क्ष्णु/क्षणु (to sharpen), when preceded by सम्, use Ātmanepada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1365(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return no('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return no('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return no('Unknown script');

  const isKsnu = /(क्ष्णु|क्षणु|kṣṇu|kṣaṇu)/i.test(String(context.root||''));
  if (!isKsnu) return no('Root क्ष्णु/क्षणु not detected');

  const hasSam = hasPrefix(clean, script, context, ['सम्','sam']);
  if (!hasSam) return no('Requires सम् prefix');

  return { applies: true, isAtmanepada: true, confidence: 0.77, reason: 'सम् + क्ष्णु/क्षणु', sutraApplied: '1.3.65', details: { hasSam, isKsnu } };
}

function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.65', details:{} }; }

function hasPrefix(word, script, ctx, forms){
  if (typeof ctx.prefix === 'string' && forms.some(f=>eq(ctx.prefix,f))) return true;
  if (Array.isArray(ctx.prefixes) && ctx.prefixes.some(p=>forms.some(f=>eq(p,f)))) return true;
  return script==='Devanagari' ? /^\u0938\u092e/.test(word) : /^sam/i.test(word);
}

function eq(a,b){ return String(a).toLowerCase()===String(b).toLowerCase(); }

export default sutra1365;
