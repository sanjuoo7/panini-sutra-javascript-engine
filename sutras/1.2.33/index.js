/**
 * Sutra 1.2.33: एकश्रुति दूरात् सम्बुद्धौ (ekaśruti dūrāt sambuddhau)
 * "In a vocative uttered from a distance, (the tone) is monotone (ekashruti)."
 *
 * Rule Type: Vidhi (contextual prosodic override)
 * Dependencies: prior accent categories; interacts with forthcoming 1.2.34 exceptions.
 */
import { applyEkashruti } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/index.js';

/**
 * Applies ekashruti monotone rule for distant vocatives.
 * @param {string} text - Word or phrase (potentially accented)
 * @param {Object} context - { case: 'vocative', distanceCategory?, distanceMeters? }
 * @param {Object} options - { flatten?: boolean }
 * @returns {Object} result structure
 */
export function sutra1233(text, context = {}, options = {}) {
  const script = detectScript(text);
  const result = applyEkashruti(text, context, options);
  return { ...result, sutra: '1.2.33', script };
}

export default sutra1233;
