/**
 * Sutra 1.4.86: प्रति साम्ये (prati sāmye)
 * "The particle 'prati' is karmapravacanīya when it means equality/sameness."
 * 
 * @param {string} particle - The particle to analyze
 * @param {object} context - Context containing meaning information
 * @returns {object} Analysis result
 */
export default function sutra_1_4_86(particle, context = {}) {
    if (!particle || typeof particle !== 'string' || particle.trim() === '') {
        return { applies: false };
    }
    
    if (!context || typeof context !== 'object') {
        return { applies: false };
    }
    
    if ((particle === 'prati' || particle === 'प्रति') && 
        (context.meaning === 'sāmya' || context.meaning === 'equality' || context.meaning === 'समानता')) {
        return { 
            applies: true, 
            designation: 'karmapravacanīya',
            reason: "prati has sāmya meaning"
        };
    }
    
    return { applies: false, reason: 'Conditions not met' };
}
