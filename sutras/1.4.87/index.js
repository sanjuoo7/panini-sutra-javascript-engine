/**
 * Sutra 1.4.87: यावदर्थे (yāvad-arthe)
 * "The particle 'yāvat' is karmapravacanīya when it has yāvad meaning."
 * 
 * @param {string} particle - The particle to analyze
 * @param {object} context - Context containing meaning information
 * @returns {object} Analysis result
 */
export default function sutra_1_4_87(particle, context = {}) {
    if (!particle || !context) {
        return { applies: false, error: 'Invalid input' };
    }
    
    if ((particle === 'yāvat' || particle === 'यावत्') && 
        (context.meaning === 'yāvad-artha' || context.meaning === 'extent' || context.meaning === 'until')) {
        return { 
            applies: true, 
            designation: 'karmapravacanīya',
            reason: "yāvat has yāvad-artha meaning"
        };
    }
    
    return { applies: false, reason: 'Conditions not met' };
}
