/**
 * Sutra 1.1.62: pratyayalope pratyayalakṣaṇam
 * "When elision of an affix has taken place (lopa), the affix still exerts its influence and the operations
 * dependant upon it, take place as if it were present."
 *
 * @fileoverview Implementation of Panini's Sutra 1.1.62
 */

/**
 * This sutra is a `paribhāṣā` (meta-rule) that governs how other rules behave. It establishes the principle
 * of `pratyayalakṣaṇam`, where an elided affix (`pratyaya`) still has grammatical effects.
 *
 * The implementation of this sutra is not a simple function but a principle that must be woven into the
 * grammar engine's logic. This function serves as a conceptual representation of applying that principle.
 * In a real engine, this logic would be part of the core derivation process.
 *
 * @param {Object} base - The base form (aṅga) to which the affix was attached.
 * @param {Object} elidedAffix - The affix that was elided, containing its properties.
 * @returns {Object} - The base, augmented with the properties of the elided affix.
 */
export function applyPratyayalakshanam(base, elidedAffix) {
  if (!base || typeof base !== 'object' || !elidedAffix || typeof elidedAffix !== 'object') {
    // In a real implementation, this would throw an error or handle it more gracefully.
    return base;
  }

  // The core principle: merge the properties of the elided affix into the base's context.
  // This allows subsequent rules to "see" the properties of the affix as if it were still there.
  const augmentedBase = {
    ...base,
    context: {
      ...base.context,
      elidedAffixProperties: { ...elidedAffix.properties }
    }
  };

  return augmentedBase;
}
