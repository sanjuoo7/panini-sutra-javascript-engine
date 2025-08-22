/**
 * Sutra 1.4.88: अन्तरेण अभावार्थे (antareṇa abhāvārthe)
 * "The particle 'antareṇa' is karmapravacanīya when it means absence/without."
 * 
 * @param {string} particle - The particle to analyze
 * @param {object} context - Context containing meaning information
 * @returns {object} Analysis result
 */
export default function sutra_1_4_88(particle, context = {}) {
    if (!particle || !context) {
        return { applies: false, error: 'Invalid input' };
    }
    
    if ((particle === 'antareṇa' || particle === 'अन्तरेण') && 
        (context.meaning === 'abhāvārtha' || context.meaning === 'without' || context.meaning === 'absence')) {
        return { 
            applies: true, 
            designation: 'karmapravacanīya',
            reason: "antareṇa has abhāvārtha meaning"
        };
    }
    
    return { applies: false, reason: 'Conditions not met' };
}
