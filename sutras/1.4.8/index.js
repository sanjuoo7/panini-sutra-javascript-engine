/**
 * Sutra 1.4.8: patiḥ samāsa eva
 *
 * This sutra restricts the 'ghi' saṃjñā for the word 'pati'.
 * It is a prohibition rule for when 'pati' is NOT in a compound.
 *
 * @param {string} word The word to be processed.
 * @param {object} context The context of the word.
 * @returns {object} The result of the sutra application.
 */
export default function applySutra(word, context) {
  const base = context.base || word;

  // This rule is only about 'pati'.
  if (base !== 'pati') {
    return { applies: false };
  }

  // It prohibits 'ghi' if 'pati' is NOT in a compound.
  if (context.inCompound === false) {
    return { applies: true, sanjna_prohibition: 'ghi' };
  }

  // If 'pati' is in a compound, this rule does nothing,
  // allowing 1.4.7 to make it 'ghi'.
  return { applies: false };
}
