/**
 * Sutra 1.1.60: अदर्शनं लोपः (adarśanaṃ lopaḥ)
 * "The substitution of a blank (लोप) signifies disappearance."
 *
 * RULE TYPE: saṃjñā (definition)
 * SCOPE: Defines the term 'lopa' (elision).
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.60
 */

/**
 * Defines 'lopa' (elision) as 'adarśana' (disappearance or non-perception).
 * This function serves as a definitional reference for the concept of elision in Paninian grammar.
 *
 * @returns {string} The definition of lopa.
 *
 * @example
 * // Basic usage
 * const definition = getLopaDefinition();
 * console.log(definition); // "Lopa (elision) signifies disappearance or non-perception."
 */
export function getLopaDefinition() {
  return "Lopa (elision) signifies disappearance or non-perception.";
}

/**
 * Checks if a given action or state represents 'lopa' (elision) according to Sutra 1.1.60.
 * This function is a conceptual check based on the definition.
 *
 * @param {any} action - The action or state to check.
 * @returns {boolean} True if the action signifies disappearance/non-perception (lopa), false otherwise.
 *
 * @example
 * // Checking if a conceptual disappearance is lopa
 * isLopa(null); // true (conceptual disappearance)
 * isLopa(undefined); // true (conceptual disappearance)
 * isLopa("removed"); // false (not a direct representation of adarśana)
 */
export function isLopa(action) {
  // In Paninian grammar, 'adarśana' (non-perception/disappearance) is defined as 'lopa'.
  // This function conceptually checks if an action implies disappearance.
  // For practical purposes in a computational system, 'lopa' often means removal or absence.
  return action === null || action === undefined;
}
