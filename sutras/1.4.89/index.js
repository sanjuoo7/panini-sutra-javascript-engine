/**
 * Sutra 1.4.89: ऋते अभावार्थे (ṛte abhāvārthe)
 * "The particle 'ṛte' is karmapravacanīya when it means absence/without."
 * 
 * @param {string} particle - The particle to analyze
 * @param {object} context - Context containing meaning information
 * @returns {object} Analysis result
 */
export default function sutra_1_4_89(particle, context = {}) {
    if (!particle || !context) {
        return { applies: false, error: 'Invalid input' };
    }
    
    if ((particle === 'ṛte' || particle === 'ऋते') && 
        (context.meaning === 'abhāvārtha' || context.meaning === 'without' || context.meaning === 'absence')) {
        return { 
            applies: true, 
            designation: 'karmapravacanīya',
            reason: "ṛte has abhāvārtha meaning"
        };
    }
    
    return { applies: false, reason: 'Conditions not met' };
}
