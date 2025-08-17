/**
 * Sutra 1.4.7: śeṣo ghyasakhi
 *
 * @param {string} word The word to be processed.
 * @param {object} context The context of the word.
 * @returns {object} The result of the sutra application.
 */
export default function applySutra(word, context) {
  // This is a placeholder implementation.
  if (word === 'sakhi' || context.hasNadīSaṃjñā) {
    return { applies: false };
  }

  const endsInShortI = word.endsWith('i');
  const endsInShortU = word.endsWith('u');

  if (endsInShortI || endsInShortU) {
    return { applies: true, sanjna: 'ghi' };
  }

  return { applies: false };
}
