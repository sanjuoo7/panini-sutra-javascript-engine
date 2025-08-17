/**
 * Sutra 1.4.9: ṣaṣṭhīyuktaśchandasi vā
 *
 * This sutra provides an optional 'ghi' saṃjñā for 'pati' under specific
 * Vedic circumstances, overriding the prohibition from 1.4.8.
 *
 * @param {string} word The word to be processed.
 * @param {object} context The context of the word.
 * @returns {object} The result of the sutra application.
 */
export default function applySutra(word, context) {
  const base = context.base || word;

  // This rule is only about 'pati' when it's not in a compound.
  if (base !== 'pati' || context.inCompound === true) {
    return { applies: false };
  }

  const isChandasi = context.domain === 'chandasi';
  const isRelatedToGenitive = context.relatedToGenitive === true;

  // If all conditions are met, it optionally becomes 'ghi'.
  if (isChandasi && isRelatedToGenitive) {
    return { applies: true, optional_sanjna: 'ghi' };
  }

  return { applies: false };
}
