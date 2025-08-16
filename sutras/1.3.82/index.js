/**
 * Sutra 1.3.82: परेर्मृषः (parer mṛṣaḥ)
 * After the root मृष् (mṛṣ ‘to bear/endure’) when preceded by परि (pari), Parasmaipada is used
 * when the fruit accrues to the agent.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1382(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, reason: 'Invalid input', sutra: '1.3.82', confidence: 0 };
    }
    const script = detectScript(word);

    const hasRoot = (() => {
      const root = (context.root || '').toLowerCase();
      const dev = (context.root || '').includes('मृष');
      const iast = ['mṛṣ', 'mrish', 'mṛś'].some(r => root.includes(r));
      if (dev || iast) return true;
      const rx = script === 'Devanagari' ? /मृष/ : /(mṛṣ|mrish|mṛś)/i;
      return rx.test(word);
    })();

    if (!hasRoot) return { applies: false, isParasmaipada: false, reason: 'Root is not मृष् (mṛṣ)', sutra: '1.3.82', confidence: 0.9 };

    const hasPari = /परि/.test(word) || /(pari)/i.test((context.prefix || context.upasarga || word));
    if (!hasPari) return { applies: false, isParasmaipada: false, reason: 'Prefix परि not found', sutra: '1.3.82', confidence: 0.9 };

    // Applies when fruit accrues to agent; if not specified assume allowed
    const benefitsAgent = context.benefitsAgent !== false;

    return { applies: benefitsAgent, isParasmaipada: benefitsAgent, reason: 'परि + मृष् with agent fruit → Parasmaipada', sutra: '1.3.82', confidence: benefitsAgent ? 0.9 : 0.3 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, reason: `Error: ${e.message}`, sutra: '1.3.82', confidence: 0 };
  }
}

export default sutra1382;
