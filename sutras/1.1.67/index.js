/**
 * Sutra 1.1.67: tasmādityuttarasya
 * "An operation caused by the exhibition of a term in the Ablative 5th case, is to be understood
 * to enjoin the substitution of something in the room of that which immediately follows the word
 * denoted by the term."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.67
 */

/**
 * This sutra is a `paribhāṣā` (meta-rule) and a companion to 1.1.66. It defines how to
 * interpret context when a term is in the ablative case (pañcamī vibhakti). When a rule
 * specifies a condition in the ablative case (e.g., "after [X]..."), the operation applies
 * to the element *immediately following* X.
 *
 * This function is a conceptual representation of this principle.
 *
 * @param {Object} context - The current grammatical context, containing a sequence of elements.
 * @param {string} ablativeTerm - The element specified in the ablative case, which acts as the left-hand context.
 * @returns {Object|null} The element immediately following the `ablativeTerm`, which is the target of the operation.
 */
export function getFollowingElement(context, ablativeTerm) {
  if (!context || !Array.isArray(context.elements) || !ablativeTerm) {
    return null;
  }

  const { elements } = context;
  const termIndex = elements.indexOf(ablativeTerm);

  // If the term is not found, or it's the very last element, there is nothing following it.
  if (termIndex === -1 || termIndex === elements.length - 1) {
    return null;
  }

  return elements[termIndex + 1];
}
