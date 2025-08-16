/**
 * Sutra 1.3.84: उपाच्च (upācca)
 * And also after उप (upa), the root रम् takes Parasmaipada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1384(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, reason: 'Invalid input', sutra: '1.3.84', confidence: 0 };
    }
    const script = detectScript(word);

    const hasRoot = (() => {
      const root = (context.root || '').toLowerCase();
      const dev = (context.root || '').includes('रम्');
      const iast = ['ram'].some(r => root.includes(r));
      if (dev || iast) return true;
      const rx = script === 'Devanagari' ? /रम्/ : /(ram)/i;
      return rx.test(word);
    })();
    if (!hasRoot) return { applies: false, isParasmaipada: false, reason: 'Root is not रम', sutra: '1.3.84', confidence: 0.9 };

    const hasUpa = /उप/.test(word) || /(upa)/i.test((context.prefix || context.upasarga || word));
    if (!hasUpa) return { applies: false, isParasmaipada: false, reason: 'Prefix उप not found', sutra: '1.3.84', confidence: 0.9 };

    return { applies: true, isParasmaipada: true, reason: 'उप + रम् → Parasmaipada', sutra: '1.3.84', confidence: 0.88 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, reason: `Error: ${e.message}`, sutra: '1.3.84', confidence: 0 };
  }
}

export default sutra1384;
