/**
 * Sutra 1.4.14: suptiṅantaṃ padam
 *
 * This is a 'saṃjñā' (definitional) sutra for the term 'pada' (inflected word).
 * It does not have a direct implementation but is a core concept for the
 * engine to determine what constitutes a finished word.
 *
 * @returns {object} An object indicating the nature of this definitional rule.
 */
export default function applySutra() {
  return {
    applies: false, // This rule doesn't apply directly to transform words
    meta: true,
    defines: 'pada',
    conditions: ['ends_in_sup', 'ends_in_tin'],
  };
}
