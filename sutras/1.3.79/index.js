/**
 * Sutra 1.3.79: अनुपराभ्यां कृञः (anuparābhyāṁ kṛñaḥ)
 * "After the verb कृ (kṛ, to do/make) preceded by अनु (anu-) and पर (para-),
 * Parasmaipada is used (active voice), even when the fruit of the action
 * accrues to the agent, particularly in senses like divulging, etc."
 *
 * RULE TYPE: vidhāna (Parasmaipada designation)
 * SCOPE: कृ root with both अनु and पर prefixes (together), active voice
 * CONDITIONS: 1) Root is कृ (kṛ), 2) Upasargas include अनु and पर (both),
 *             3) Active-voice (kartari) construction, 4) Overrides agent-benefit Ātmanepada rules
 * TRANSFORMATIONS: Forces Parasmaipada (blocks Ātmanepada) under these conditions
 *
 * @fileoverview Implementation of Panini's Sutra 1.3.79
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Checks if the given word/context matches Sutra 1.3.79 conditions
 * @param {string} word - Sanskrit word in Devanagari or IAST
 * @param {Object} context - Grammatical context
 * @param {string} [context.root] - Verbal root (should be कृ/kṛ)
 * @param {string|string[]} [context.upasarga] - Prefix(es) (must include अनु/पर)
 * @param {boolean} [context.isActiveVoice=true] - Whether it is कर्तरि (active)
 * @param {boolean} [context.benefitsAgent] - Agent-benefit flag (may be true but overridden)
 * @param {string} [context.meaning] - Semantic hints (e.g., divulging, revealing)
 * @returns {Object} Analysis result
 */
export function sutra1379(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return {
        applies: false,
        isParasmaipada: false,
        reason: 'Invalid input: word must be a non-empty string',
        sutra: '1.3.79',
        confidence: 0
      };
    }

    if (!validateSanskritWord(word)) {
      return {
        applies: false,
        isParasmaipada: false,
        reason: 'Invalid Sanskrit word format',
        sutra: '1.3.79',
        confidence: 0
      };
    }

    const script = detectScript(word);

    // Identify kṛ root presence
    const krPatterns = script === 'Devanagari'
      ? ['कृ', 'कर', 'कृत', 'कर्त', 'करण'] // stems/forms containing कृ semantics
      : ['kṛ', 'kar', 'kṛt', 'kart', 'karaṇa'];

    let hasKrRoot = false;
    if (context.root) {
      const ctxRoot = context.root;
      const rootMatch = script === 'Devanagari' ? ['कृ', 'कर'] : ['kṛ', 'kar'];
      hasKrRoot = rootMatch.includes(ctxRoot);
    }
    if (!hasKrRoot) {
      hasKrRoot = krPatterns.some(p => word.includes(p));
    }

    // Collect upasargas from context and/or detect from surface
    const upasargaList = new Set();
    const pushUpasarga = (u) => {
      if (!u) return;
      if (Array.isArray(u)) {
        u.forEach(x => typeof x === 'string' && upasargaList.add(x));
      } else if (typeof u === 'string') {
        upasargaList.add(u);
      }
    };

    pushUpasarga(context.upasarga);

    // Surface detection for common variants
    const upasargaVariants = script === 'Devanagari'
      ? {
          anu: ['अनु', 'अनुस्', 'अन्'],
          para: ['पर', 'परि', 'पार'] // include near variants that sometimes surface
        }
      : {
          anu: ['anu', 'anus', 'an'],
          para: ['para', 'pari', 'pāra']
        };

    const wordLower = word.toLowerCase();
    const hasAnuSurface = [...upasargaVariants.anu].some(v => wordLower.startsWith(v));
    const hasParaSurface = [...upasargaVariants.para].some(v => wordLower.startsWith(v));

    if (hasAnuSurface) upasargaList.add(script === 'Devanagari' ? 'अनु' : 'anu');
    if (hasParaSurface) upasargaList.add(script === 'Devanagari' ? 'पर' : 'para');

    // Normalize upasargas into canonical keys: 'anu' and 'para'
    const norm = (u) => {
      if (script === 'Devanagari') {
        if (['अनु', 'अनुस्', 'अन्'].includes(u)) return 'anu';
        if (['पर', 'परि', 'पार'].includes(u)) return 'para';
      } else {
        if (['anu', 'anus', 'an'].includes(u)) return 'anu';
        if (['para', 'pari', 'pāra'].includes(u)) return 'para';
      }
      return u;
    };

    const normalizedUpasargas = new Set(Array.from(upasargaList).map(norm));
    const hasAnu = normalizedUpasargas.has('anu');
    const hasPara = normalizedUpasargas.has('para');

    // Voice condition: default active if unspecified
    const isActiveVoice = context.isActiveVoice !== false;

    // Semantic cue for divulging/revealing etc. (not mandatory, informative)
    let semanticCue = false;
    if (context.meaning && typeof context.meaning === 'string') {
      const cues = script === 'Devanagari'
        ? ['प्रकाश', 'उज्जागर', 'उद्घोष', 'प्रकट']
        : ['divulge', 'reveal', 'announce', 'declare', 'make known'];
      const ml = context.meaning.toLowerCase();
      semanticCue = cues.some(k => ml.includes(k.toLowerCase())) || false;
    }

    // Apply rule: requires kṛ root, both anu and para upasargas, and active voice
    const applies = !!(hasKrRoot && hasAnu && hasPara && isActiveVoice);

    let reason = '';
    let confidence = 0;
    if (!hasKrRoot) {
      reason = 'Root is not कृ (kṛ)';
      confidence = 0;
    } else if (!(hasAnu && hasPara)) {
      reason = 'Both अनु and पर upasargas required';
      confidence = 0.25;
    } else if (!isActiveVoice) {
      reason = 'Not an active (कर्तरि) construction';
      confidence = 0.3;
    } else {
      reason = 'कृ with अनु and पर upasargas in active voice → Parasmaipada (overrides agent-benefit Ātmanepada)';
      confidence = semanticCue ? 0.98 : 0.93;
    }

    return {
      applies,
      isParasmaipada: applies,
      blocksAtmanepada: applies, // explicitly blocks earlier 1.3.72/causative agent-benefit rules
      reason,
      sutra: '1.3.79',
      details: {
        hasKrRoot,
        hasAnu,
        hasPara,
        normalizedUpasargas: Array.from(normalizedUpasargas),
        isActiveVoice,
        semanticCue,
        detectedScript: script,
        ruleType: 'Parasmaipada designation for kṛ with anu+para'
      },
      confidence
    };
  } catch (error) {
    return {
      applies: false,
      isParasmaipada: false,
      reason: `Error in sutra analysis: ${error.message}`,
      sutra: '1.3.79',
      confidence: 0
    };
  }
}

export default sutra1379;
