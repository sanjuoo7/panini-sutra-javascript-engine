/**
 * Sutra 1.3.85: विभाषाऽकर्मकात् (vibhāṣā'karmakāt)
 * After उप + रम (from 1.3.84), when used intransitively (अकर्मक), Parasmaipada is optional.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1385(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.85', confidence: 0 };
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
    if (!hasRoot) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Root is not रम', sutra: '1.3.85', confidence: 0.9 };

    const hasUpa = /उप/.test(word) || /(upa)/i.test((context.prefix || context.upasarga || word));
    if (!hasUpa) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Prefix उप not found', sutra: '1.3.85', confidence: 0.9 };

    const intransitive = context.transitivity ? context.transitivity === 'intransitive' : true;

    return { applies: intransitive, isParasmaipada: intransitive, isOptional: intransitive, reason: 'उप + रम intransitive → optional Parasmaipada', sutra: '1.3.85', confidence: intransitive ? 0.85 : 0.3 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, isOptional: false, reason: `Error: ${e.message}`, sutra: '1.3.85', confidence: 0 };
  }
}

export default sutra1385;
