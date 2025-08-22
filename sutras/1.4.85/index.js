/**
 * Sutra 1.4.85: तृतीयार्थे (tṛtīyā'rthe)
 * "The particle 'anu' is karmapravacanīya when it has the meaning of the third case (instrumental)."
 * 
 * This sutra specifies another condition for 'anu' to be designated as karmapravacanīya:
 * when it conveys the meaning typically expressed by the instrumental case (tṛtīyā vibhakti).
 * 
 * @param {string} particle - The particle to analyze
 * @param {object} context - Context containing meaning information
 * @param {string} context.meaning - The meaning conveyed
 * @returns {object} Analysis result
 */
export default function sutra_1_4_85(particle, context = {}) {
    if (!particle || typeof particle !== 'string' || particle.trim() === '') {
        return { applies: false };
    }
    
    if (!context || typeof context !== 'object') {
        return { applies: false };
    }
    
    if ((particle === 'anu' || particle === 'अनु') && context.meaning === "tṛtīyā'rtha") {
        return { 
            applies: true, 
            designation: 'karmapravacanīya',
            reason: "anu has tṛtīyā'rtha meaning"
        };
    }
    
    return { applies: false, reason: 'Conditions not met' };
}
