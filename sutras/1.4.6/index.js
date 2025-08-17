/**
 * Sutra 1.4.6: ṅiti hrasvaśca
 *
 * @param {string} word The word to be processed.
 * @param {object} context The context of the word.
 * @returns {object} The result of the sutra application.
 */
export default function applySutra(word, context) {
  // This is a placeholder implementation.
  if (!context.nextAffixIsNit || word === 'strī') {
    return { applies: false };
  }

  const isShortVowelFeminine = context.gender === 'feminine' && (word.endsWith('i') || word.endsWith('u'));
  const isIyanUvanSthana = context.isIyanUvanSthana;

  // This rule should not re-apply to words that are already mandatorily nadī
  const isMandatoryNadi = word.endsWith('ī') || word.endsWith('ū') && !isIyanUvanSthana;
  if(isMandatoryNadi) {
    return { applies: false };
  }


  if (isShortVowelFeminine || isIyanUvanSthana) {
    return { applies: true, optional_sanjna: 'nadī' };
  }

  return { applies: false };
}
