/**
 * Sutra 1.3.80: अभिप्रत्यतिभ्यः क्षिपः (abhipratyatibhyaḥ kṣipaḥ)
 * After the root क्षिप् (kṣip ‘to throw’) when preceded by अभि, प्रति, or अति,
 * Parasmaipada is used even if the fruit accrues to the agent.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1380(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, reason: 'Invalid input', sutra: '1.3.80', confidence: 0 };
    }
    const script = detectScript(word);

    // Root: क्षिप् (kṣip)
    const hasRoot = (() => {
      const root = (context.root || '').toLowerCase();
      const dev = (context.root || '').includes('क्षिप');
      const iast = ['kṣip', 'kship', 'kṣepa'].some(r => root.includes(r));
      if (dev || iast) return true;
      const rx = script === 'Devanagari' ? /क्षि(प|प्)/ : /(kṣip|kship)/i;
      return rx.test(word);
    })();
    if (!hasRoot) {
      return { applies: false, isParasmaipada: false, reason: 'Root is not क्षिप् (kṣip)', sutra: '1.3.80', confidence: 0.9 };
    }

    // Prefix: अभि, प्रति, अति
    const prefixesDev = ['अभि', 'प्रति', 'अति'];
    const prefixesIast = ['abhi', 'prati', 'ati'];
    const explicit = prefixesDev.some(p => (context.prefix || context.upasarga || '').includes(p)) ||
                     prefixesIast.some(p => (context.prefix || context.upasarga || '').toLowerCase().includes(p));
    const surface = /अभि|प्रति|अति/.test(word) || /(abhi|prati|ati)/i.test(word);
    if (!(explicit || surface)) {
      return { applies: false, isParasmaipada: false, reason: 'Required prefix not found (अभि/प्रति/अति)', sutra: '1.3.80', confidence: 0.9 };
    }

    return {
      applies: true,
      isParasmaipada: true,
      reason: 'क्षिप् with अभि/प्रति/अति → Parasmaipada',
      sutra: '1.3.80',
      confidence: 0.9,
    };
  } catch (e) {
    return { applies: false, isParasmaipada: false, reason: `Error: ${e.message}`, sutra: '1.3.80', confidence: 0 };
  }
}

export default sutra1380;
