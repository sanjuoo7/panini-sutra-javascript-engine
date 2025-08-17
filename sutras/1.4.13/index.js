/**
 * Sutra 1.4.13: yasmāt pratyayavidhistadādi pratyaye'ṅgam
 *
 * This is a 'saṃjñā' (definitional) sutra for the term 'aṅga' (base).
 * It does not have a direct implementation but is a core concept for the
 * morphological engine.
 *
 * @returns {object} An object indicating the nature of this definitional rule.
 */
export default function applySutra() {
  return {
    applies: false, // This rule doesn't apply directly to transform words
    meta: true,
    defines: 'aṅga',
  };
}
