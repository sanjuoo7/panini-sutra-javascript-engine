/**
 * Sutra 1.3.64: प्रोपाभ्यां युजेरयज्ञपात्रेषु
 * Type: Ātmanepada designation (vidhi)
 * Rule: After युज् (yuj 'to join'), with prefixes प्र or उप, use Ātmanepada except in sacrificial-vessel contexts (अयज्ञपात्रेषु), even if fruit doesn’t accrue to agent.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1364(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return no('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return no('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return no('Unknown script');

  const isYuj = /(युज्?|yuj)/i.test(String(context.root||''));
  if (!isYuj) return no('Root युज् not detected');

  const hasPra = hasPrefix(clean, script, context, ['प्र','pra']);
  const hasUpa = hasPrefix(clean, script, context, ['उप','upa']);
  if (!(hasPra || hasUpa)) return no('Requires प्र/उप prefix');

  const sacrificialContext = context.isSacrificialVesselContext === true || /yaj(ña)?-?pātra/i.test(String(context.domain||''));
  if (sacrificialContext) return { applies:false, isAtmanepada:false, confidence:0.5, reason:'Excluded in sacrificial vessel context', sutraApplied:'1.3.64', details:{ hasPra, hasUpa, sacrificialContext } };

  return { applies: true, isAtmanepada: true, confidence: 0.8, reason: 'युज् with प्र/उप, excluding sacrificial vessel context', sutraApplied: '1.3.64', details: { hasPra, hasUpa, sacrificialContext } };
}

function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.64', details:{} }; }

function hasPrefix(word, script, ctx, forms){
  if (typeof ctx.prefix === 'string' && forms.some(f=>eq(ctx.prefix,f))) return true;
  if (Array.isArray(ctx.prefixes) && ctx.prefixes.some(p=>forms.some(f=>eq(p,f)))) return true;
  if (script==='Devanagari'){
    if (forms.some(f=>/^प्र$/.test(f))) return /^\u092a\u094d\u0930/.test(word);
    if (forms.some(f=>/^उप$/.test(f))) return /^\u0909\u092a/.test(word);
  }
  if (forms.some(f=>/^pra$/i.test(f))) return /^pra/i.test(word);
  if (forms.some(f=>/^upa$/i.test(f))) return /^upa/i.test(word);
  return false;
}

function eq(a,b){ return String(a).toLowerCase()===String(b).toLowerCase(); }

export default sutra1364;
