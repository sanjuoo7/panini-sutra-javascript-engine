/**
 * Sutra 1.4.1: ā kaḍārādekā saṃjañā
 *
 * This is an 'adhikāra' (governing rule) and does not have a direct implementation
 * that applies to a word. Instead, it defines a scope and a meta-rule for other sutras.
 *
 * @returns {object} An object indicating the nature of this meta-rule.
 */
export default function applySutra() {
  return {
    applies: false, // This rule doesn't apply directly to transform words
    meta: true,
    type: 'adhikāra',
    scopeStart: '1.4.1',
    scopeEnd: '2.2.38',
    rule: 'eka_samjna', // Only one technical term is to be applied
  };
}
