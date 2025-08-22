/**
 * Sutra 1.4.90: विना अभावार्थे (vinā abhāvārthe)
 * "The particle 'vinā' is karmapravacanīya when it means absence/without."
 * 
 * @param {string} particle - The particle to analyze
 * @param {object} context - Context containing meaning information
 * @returns {object} Analysis result
 */
export default function sutra_1_4_90(particle, context = {}) {
    if (!particle || typeof particle !== 'string' || particle.trim() === '') {
        return { applies: false };
    }
    
    if (!context || typeof context !== 'object') {
        return { applies: false };
    }
    
    if ((particle === 'vinā' || particle === 'विना') && 
        (context.meaning === 'abhāvārtha' || context.meaning === 'without' || context.meaning === 'absence')) {
        return { 
            applies: true, 
            designation: 'karmapravacanīya',
            reason: "vinā has abhāvārtha meaning"
        };
    }
    
    return { applies: false, reason: 'Conditions not met' };
}
