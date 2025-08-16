/**
 * Sutra 1.3.37: कर्तृस्थे चाशरीरे कर्मणि (kartṛsthe cāśarīre karmaṇi)
 * Type: Ātmanepada designation (vidhi)
 * Rule: After the verb नी (nī 'to lead'), when the object is incorporeal and located in the agent (kartṛ-stha aśarīra karma), use Ātmanepada.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if Sutra 1.3.37 applies (nī with incorporeal object located in agent)
 * @param {string} word - Sanskrit form containing/related to root नी
 * @param {Object} context
 * @param {string} [context.root] - Explicit dhātu (e.g., 'नी'/'nī')
 * @param {string} [context.objectType] - 'aśarīra' | 'incorporeal' | 'quality' | 'knowledge' | etc.
 * @param {boolean} [context.kartrstha] - Whether the object is located in the agent (कर्तृस्थे)
 * @param {string} [context.meaning] - Optional gloss/meaning to aid analysis
 * @returns {{applies:boolean,isAtmanepada:boolean,confidence:number,reason:string,sutraApplied:string,details:Object}}
 */
export function sutra1337(word, context = {}) {
  // Basic validation
  if (!word || typeof word !== 'string' || !word.trim()) {
    return fail('Invalid input');
  }
  const clean = word.trim();
  if (!validateSanskritWord(clean)) {
    return fail('Invalid Sanskrit word format');
  }
  const script = detectScript(clean);
  if (script === 'Unknown') {
    return fail('Unknown script');
  }

  // Root detection (नी family: nī/nay forms)
  const hasNi = checkNiRoot(clean, script, context);
  if (!hasNi.found) {
    return fail('Root नी not detected');
  }

  // Semantic/object analysis
  const obj = analyzeObjectContext(context);
  if (!obj.isIncorporeal || !obj.isKartrstha) {
    return {
      applies: false,
      isAtmanepada: false,
      confidence: 0.4,
      reason: 'Requires incorporeal object located in agent (कर्तृस्थे अशरीरे कर्मणि)',
      sutraApplied: '1.3.37',
      details: { hasNi, obj }
    };
  }

  return {
    applies: true,
    isAtmanepada: true,
    confidence: 0.9,
    reason: 'नी with incorporeal object located in agent',
    sutraApplied: '1.3.37',
    details: { hasNi, obj }
  };
}

function fail(reason) {
  return { applies: false, isAtmanepada: false, confidence: 0, reason, sutraApplied: '1.3.37', details: {} };
}

function checkNiRoot(word, script, context) {
  const formsDeva = [/नी/, /नय/, /नयति/, /नयते/, /नेते/, /निनय/];
  const formsIast = [/nī/i, /nay/i, /nayati/i, /nayate/i, /ninate/i, /ninaya/i];
  const fromCtx = (context.root && /^(नी|nī|nay)$/i.test(context.root)) ? 0.9 : 0;
  const match = (script === 'Devanagari' ? formsDeva : formsIast).some(r => r.test(word));
  return { found: match || !!fromCtx, confidence: match ? 0.9 : fromCtx };
}

function analyzeObjectContext(context) {
  const t = (context.objectType || '').toLowerCase();
  const isIncorp = ['aśarīra', 'aśarīra', 'aśarira', 'incorporeal', 'intangible', 'quality', 'knowledge', 'dharma', 'guṇa'].includes(t);
  const kartr = !!(context.kartrstha || context.kartṛstha || context.kartaristha || context.locatedInAgent);
  return { isIncorporeal: isIncorp, isKartrstha: kartr };
}
