/**
 * Sutra 1.3.79: अनुपराभ्यां कृञः (anuparābhyāṁ kṛñaḥ)
 * After the root कृ (kṛ ‘to do/make’), when prefixed by अनु or पर, use Parasmaipada
 * even when the fruit accrues to the agent, especially in divulging/revealing senses.
 *
 * RULE TYPE: vidhāna (Parasmaipada designation overriding Ātmanepada conditions)
 * SCOPE: कृ (kṛ) with prefixes अनु or पर
 * CONDITIONS: 1) Root is कृ (kṛ), 2) Prefix is अनु or पर, 3) Overrides agent-benefit
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1379(word, context = {}) {
  try {
    if (!word || typeof word !== 'string') {
      return { applies: false, isParasmaipada: false, reason: 'Invalid input', sutra: '1.3.79', confidence: 0 };
    }
    if (!validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, reason: 'Invalid Sanskrit word', sutra: '1.3.79', confidence: 0 };
    }

    const script = detectScript(word);

    // Root detection: कृ (kṛ)
    const rootMatches = (() => {
      const root = (context.root || '').toLowerCase();
      const devMatches = ['कृ', 'कॄ', 'कर'].some(r => (context.root || '').includes(r));
      const iastMatches = ['kṛ', 'kri', 'kar'].some(r => root.includes(r));
      if (devMatches || iastMatches) return true;
      const rx = script === 'Devanagari' ? /(कृ|कॄ|कर)/ : /(kṛ|kri|kar)/i;
      return rx.test(word);
    })();

    if (!rootMatches) {
      return { applies: false, isParasmaipada: false, reason: 'Root is not कृ (kṛ)', sutra: '1.3.79', confidence: 0.9 };
    }

    // Prefix detection: अनु or पर
    const hasRequiredPrefix = (() => {
      const prefix = (context.prefix || context.upasarga || '').toLowerCase();
      const devSet = ['अनु', 'पर'];
      const iastSet = ['anu', 'para'];
      const explicit = devSet.some(p => (context.prefix || context.upasarga || '').includes(p)) ||
                       iastSet.some(p => prefix.includes(p));
      if (explicit) return true;
      const hasDev = /अनु|पर/.test(word);
      const hasIast = /\b(anu|para)/i.test(word);
      return hasDev || hasIast;
    })();

    if (!hasRequiredPrefix) {
      return { applies: false, isParasmaipada: false, reason: 'Required prefix (अनु/पर) not found', sutra: '1.3.79', confidence: 0.9 };
    }

    // Semantic hint (divulging/revealing etc.) boosts confidence
    const meaning = (context.meaning || '').toLowerCase();
    const divulgeHints = ['divulge', 'reveal', 'publish', 'announce', 'प्रकाश', 'उद्घोष', 'प्रकट'];
    const hasDivulgeSense = meaning && divulgeHints.some(k => meaning.includes(k.toLowerCase()));

    return {
      applies: true,
      isParasmaipada: true,
      reason: 'कृ with अनु/पर → Parasmaipada even with agent-benefit',
      sutra: '1.3.79',
      details: { detectedScript: script, hasDivulgeSense },
      confidence: hasDivulgeSense ? 0.96 : 0.9
    };
  } catch (e) {
    return { applies: false, isParasmaipada: false, reason: `Error: ${e.message}`, sutra: '1.3.79', confidence: 0 };
  }
}

export default sutra1379;
