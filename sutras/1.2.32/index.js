/**
 * Sutra 1.2.32: तस्यादित उदात्तमर्धह्रस्वम् (tasyādita udāttam ardha-hrasvam)
 * "Of it (the svarita), the initial portion is udātta to the extent of half a short unit."
 *
 * Rule Type: Vidhi (specifying internal prosodic structure of previously defined svarita)
 * Dependencies: 1.2.29-1.2.31 (accent categories), 1.2.27 (duration units)
 *
 * This implementation provides a decomposition of a svarita-marked vowel into
 * two temporal/pitch segments for downstream prosody-aware logic.
 */
import { decomposeSvarita } from '../sanskrit-utils/accent-prosody-analysis.js';
import { analyzeVowelAccent, ACCENT_TYPES } from '../sanskrit-utils/accent-analysis.js';
import { detectScript } from '../sanskrit-utils/index.js';

/**
 * Main decomposition function for Sutra 1.2.32
 * @param {string} vowel - Accent-bearing vowel string
 * @param {Object} context - Options { script?, strict? }
 * @returns {Object} decomposition result
 */
export function sutra1232(vowel, context = {}) {
  const script = context.script || detectScript(vowel);
  const accent = analyzeVowelAccent(vowel, { script, strict: !!context.strict });
  if (!accent.isValid || accent.accentType !== ACCENT_TYPES.SVARITA) {
    return {
      applies: false,
      reason: 'Not a svarita vowel',
      input: vowel,
      script
    };
  }
  const decomposition = decomposeSvarita(vowel, { script, strict: !!context.strict });
  return {
    ...decomposition,
    sutra: '1.2.32'
  };
}

export default sutra1232;
