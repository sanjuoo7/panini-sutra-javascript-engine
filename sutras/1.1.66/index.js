/**
 * Sutra 1.1.66: tasminniti nirdiṣṭe pūrvasya
 * "When a term is exhibited in the seventh case (locative) in these sūtras, the operation directed,
 * is to be understood as affecting the state of what immediately precedes that which the term denotes."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.66
 */

/**
 * This sutra is a `paribhāṣā` (meta-rule) that defines how to interpret context in the grammar.
 * Specifically, it handles the locative case (saptamī vibhakti). When a rule specifies a condition
 * in the locative case (e.g., "when [X] follows..."), the operation applies to the element
 * *immediately preceding* X.
 *
 * This function is a conceptual representation of this principle. In a full grammar engine, this
 * logic would be part of the core rule application mechanism that determines the target of an operation.
 *
 * @param {Object} context - The current grammatical context, containing a sequence of elements.
 * @param {string} locativeTerm - The element specified in the locative case, which acts as the right-hand context.
 * @returns {Object|null} The element immediately preceding the `locativeTerm`, which is the target of the operation.
 */
export function getPrecedingElement(context, locativeTerm) {
  if (!context || !Array.isArray(context.elements) || !locativeTerm) {
    return null;
  }

  const { elements } = context;
  const termIndex = elements.indexOf(locativeTerm);

  // If the term is not found, or it's the very first element, there is nothing preceding it.
  if (termIndex <= 0) {
    return null;
  }

  return elements[termIndex - 1];
}
