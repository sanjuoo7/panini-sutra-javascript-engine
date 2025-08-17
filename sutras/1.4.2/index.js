/**
 * Sutra 1.4.2: vipratiṣedhe paraṃ kāryam
 *
 * This is a 'paribhāṣā' (meta-rule) for resolving conflicts.
 * It does not have a direct implementation on a word but is a core
 * principle for the sutra processing engine.
 *
 * @returns {object} An object indicating the nature of this meta-rule.
 */
export default function applySutra() {
  return {
    applies: false, // This rule doesn't apply directly to transform words
    meta: true,
    type: 'paribhāṣā',
    rule: 'vipratiṣedhe_param_kāryam', // In case of conflict, the later rule prevails.
  };
}
