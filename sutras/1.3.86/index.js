/**
 * Sutra 1.3.86: बुधयुधनशजनेङ्प्रुद्रुस्रुभ्यो णेः (budhayudhanaśajaneṅ prudrusrubhyo ṇeḥ)
 * After the roots बुध् (budh, to know), युध् (yudh, to fight), नश् (naś, to destroy),
 * जन् (jan, to be born), इ (i, to go — denoted by एङ्), प्रु (pru, to move),
 * द्रु (dru, to run), and स्रु (sru, to flow), when ending in the causative affix (णे/ṇe i.e., ṇic),
 * Parasmaipada is designated even when the fruit accrues to the agent (overrides 1.3.74).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determine Parasmaipada designation per 1.3.86 for specified roots in causative (ṇe/ṇic)
 * @param {string} word - Surface form (IAST or Devanagari)
 * @param {Object} context - Analysis context
 * @param {string} [context.root] - Verbal root in IAST or Devanagari (preferred for accuracy)
 * @param {boolean} [context.hasCausative] - Explicit flag if causative (ṇic) is present
 * @param {string} [context.affix] - Affix marker, e.g., 'णे', 'णि', 'ṇe', 'ṇi', 'ṇij'
 * @param {boolean} [context.benefitsAgent] - Whether fruit accrues to agent (ignored here by override)
 * @returns {{applies:boolean,isParasmaipada:boolean,isOptional?:boolean,reason:string,sutra:string,confidence:number,details?:Object}}
 */
export function sutra1386(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.86', confidence: 0 };
    }
    const script = detectScript(word);

  const ROOTS_DEV = ['बुध', 'युध', 'नश', 'जन्', 'इ', 'प्रु', 'द्रु', 'स्रु'];
  const ROOTS_IAST = ['budh', 'yudh', 'naś', 'nas', 'jan', 'i', 'iṅ', 'pru', 'dru', 'sru'];

    // Root detection prefers explicit context.root
    const rootFromContext = (context.root || '').trim();
    const rootLower = rootFromContext.toLowerCase();

    let hasTargetRoot = false;
    if (rootFromContext) {
      // Check both scripts against provided root
      hasTargetRoot = ROOTS_DEV.some(r => rootFromContext.includes(r)) ||
                      ROOTS_IAST.some(r => rootLower.includes(r));
    }
    // Fallback: try to infer from surface word (best-effort)
    if (!hasTargetRoot) {
      // Fallback inference from surface form should NOT treat the very common 'i/इ' as a reliable marker.
      // Hence exclude 'i', 'iṅ', and 'इ' from fallback lists to avoid false positives like 'karayati'.
      const FALLBACK_DEV = ['बुध', 'युध', 'नश', 'जन्', 'प्रु', 'द्रु', 'स्रु'];
      const FALLBACK_IAST = ['budh', 'yudh', 'naś', 'nas', 'jan', 'pru', 'dru', 'sru'];
      if (script === 'Devanagari') {
        hasTargetRoot = FALLBACK_DEV.some(r => word.includes(r));
      } else {
        const w = word.toLowerCase();
        hasTargetRoot = FALLBACK_IAST.some(r => w.includes(r));
      }
    }

    if (!hasTargetRoot) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Root not in {बुध्, युध्, नश्, जन्, इ, प्रु, द्रु, स्रु}', sutra: '1.3.86', confidence: 0.9 };
    }

    // Causative (ṇic) / specific णे marker detection
    const affix = (context.affix || '').trim();
    const affixLower = affix.toLowerCase();
    const causativeAffix = ['णि', 'णिज्', 'णी', 'णे', 'ṇi', 'ṇij', 'ṇī', 'ṇe'];

    let hasCausative = context.hasCausative === true || (affix && causativeAffix.includes(affix) || causativeAffix.includes(affixLower));
    // Heuristic patterns in surface word that often mark causative
    if (!hasCausative) {
      const patterns = script === 'Devanagari'
        ? ['य', 'पय', 'आपय', 'एय']
        : ['ya', 'paya', 'āpaya', 'eya'];
      hasCausative = patterns.some(p => word.includes(p));
    }

    if (!hasCausative) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Not causative (ṇic/णे)', sutra: '1.3.86', confidence: 0.85 };
    }

    // Rule applies; explicit override of agent-benefit (कर्त्रार्थे अपि)
    const applies = true;
    return {
      applies,
      isParasmaipada: true,
      isOptional: false,
      reason: 'Specified roots + causative (णे/ṇic) → Parasmaipada (overrides 1.3.74)',
      sutra: '1.3.86',
      confidence: 0.92,
      details: {
        detectedScript: script,
        rootMatched: rootFromContext || '(inferred)',
        causativeDetected: hasCausative,
        override: 'Ignores benefitsAgent per exception'
      }
    };
  } catch (e) {
    return { applies: false, isParasmaipada: false, isOptional: false, reason: `Error: ${e.message}`, sutra: '1.3.86', confidence: 0 };
  }
}

export default sutra1386;
