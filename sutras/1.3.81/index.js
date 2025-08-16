/**
 * Sutra 1.3.81: प्राद्वहः (prādvahaḥ)
 * After the root वह् (vah ‘to bear/carry’) when preceded by प्र (pra), Parasmaipada is used
 * even if the fruit accrues to the agent.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1381(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, reason: 'Invalid input', sutra: '1.3.81', confidence: 0 };
    }
    const script = detectScript(word);

    const hasRoot = (() => {
      const root = (context.root || '').toLowerCase();
      const dev = (context.root || '').includes('वह');
      const iast = ['vah', 'vaha'].some(r => root.includes(r));
      if (dev || iast) return true;
      const rx = script === 'Devanagari' ? /वह/ : /(vah)/i;
      return rx.test(word);
    })();

    if (!hasRoot) return { applies: false, isParasmaipada: false, reason: 'Root is not वह् (vah)', sutra: '1.3.81', confidence: 0.9 };

    const hasPrefixPra = /प्र/.test(word) || /(pra)/i.test((context.prefix || context.upasarga || word));
    if (!hasPrefixPra) return { applies: false, isParasmaipada: false, reason: 'Prefix प्र not found', sutra: '1.3.81', confidence: 0.9 };

    return { applies: true, isParasmaipada: true, reason: 'प्र + वह् → Parasmaipada', sutra: '1.3.81', confidence: 0.9 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, reason: `Error: ${e.message}`, sutra: '1.3.81', confidence: 0 };
  }
}

export default sutra1381;
