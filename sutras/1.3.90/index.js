/**
 * Sutra 1.3.90: वा क्यषः (vā kayaṣaḥ)
 * Parasmaipada optionally after denominatives ending in क्यष (kyaṣ).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1390(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.90', confidence: 0 };
    }
    detectScript(word);

    // Denominatives in kyaṣ are typically formed with क्य (kya) extension markers
    const isKyasDenom = context.isDenominative === true && /क्य|kya/i.test(context.affix || '');
    if (!isKyasDenom) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Not kyaṣ denominative', sutra: '1.3.90', confidence: 0.8 };

    return { applies: true, isParasmaipada: true, isOptional: true, reason: 'kyaṣ denominative → optional Parasmaipada', sutra: '1.3.90', confidence: 0.8 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, isOptional: false, reason: `Error: ${e.message}`, sutra: '1.3.90', confidence: 0 };
  }
}

export default sutra1390;
