/**
 * Sutra 1.3.83: व्याङ्परिभ्यो रमः (vyāṅparibhyo ramaḥ)
 * After prefixes वि (vi) and आङ् (āṅ), the root रम् (ram ‘to sport/delight’) takes Parasmaipada.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1383(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, reason: 'Invalid input', sutra: '1.3.83', confidence: 0 };
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
    if (!hasRoot) return { applies: false, isParasmaipada: false, reason: 'Root is not रम્ (ram)', sutra: '1.3.83', confidence: 0.9 };

    // Prefix: वि or आङ्
    const hasVi = /वि/.test(word) || /(vi)/i.test((context.prefix || context.upasarga || ''));
    const hasAng = /आ/.test(word) || /(āṅ|ā|ang)/i.test((context.prefix || context.upasarga || ''));
    if (!(hasVi || hasAng)) return { applies: false, isParasmaipada: false, reason: 'Prefixes वि/आङ् not found', sutra: '1.3.83', confidence: 0.9 };

    return { applies: true, isParasmaipada: true, reason: 'वि/आङ् + रम् → Parasmaipada', sutra: '1.3.83', confidence: 0.88 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, reason: `Error: ${e.message}`, sutra: '1.3.83', confidence: 0 };
  }
}

export default sutra1383;
