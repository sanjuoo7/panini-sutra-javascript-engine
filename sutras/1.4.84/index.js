/**
 * Sutra 1.4.84: अनुर्लक्षणे (anurlakṣaṇe)
 * "The particle 'anu' is a karmapravacanīya when it means 'a sign' or 'indication' (lakṣaṇa)."
 * 
 * This sutra specifies that the particle 'anu' receives karmapravacanīya designation when 
 * it conveys the meaning of lakṣaṇa (sign, symptom, indication, or cause). This affects 
 * grammar rules like preventing retroflexion and governing noun cases.
 * 
 * @param {string} particle - The particle to analyze
 * @param {object} context - Context containing meaning and usage information
 * @param {string} [context.meaning] - The meaning conveyed by the particle
 * @param {string} [context.usage] - How the particle is used in context
 * @param {string} [context.associatedNoun] - The noun associated with the particle
 * @returns {object} Analysis result indicating karmapravacanīya designation
 */
export default function sutra_1_4_84(particle, context = {}) {
    if (!particle || typeof particle !== 'string' || particle.trim() === '') {
        return { applies: false };
    }
    
    if (!context || typeof context !== 'object') {
        return { applies: false };
    }
    
    // Normalize particle
    const normalizedParticle = particle.toLowerCase().trim();
    
    // Check if particle is 'anu' in any script
    const anuForms = ['anu', 'अनु'];
    let isAnu = false;
    let foundForm = '';
    
    for (const form of anuForms) {
        if (normalizedParticle === form.toLowerCase() || normalizedParticle.includes(form.toLowerCase())) {
            isAnu = true;
            foundForm = form;
            break;
        }
    }
    
    if (!isAnu) {
        return {
            applies: false,
            reason: `Particle '${particle}' is not 'anu' - sutra applies only to 'anu'`
        };
    }
    
    // Check for lakṣaṇa meaning
    if (!context.meaning) {
        return {
            applies: false,
            reason: 'Context must include meaning to determine lakṣaṇa usage'
        };
    }
    
    const normalizedMeaning = context.meaning.toLowerCase();
    
    // Define lakṣaṇa-related meanings
    const lakshanaMeanings = [
        'sign', 'indication', 'symptom', 'mark', 'characteristic', 
        'feature', 'attribute', 'cause', 'reason', 'evidence',
        'lakṣaṇa', 'लक्षण', 'चिह्न', 'निशान', 'कारण'
    ];
    
    let hasLakshanaMeaning = false;
    let matchedMeaning = '';
    
    for (const meaning of lakshanaMeanings) {
        if (normalizedMeaning.includes(meaning.toLowerCase())) {
            hasLakshanaMeaning = true;
            matchedMeaning = meaning;
            break;
        }
    }
    
    if (!hasLakshanaMeaning) {
        return {
            applies: false,
            reason: `'anu' does not convey lakṣaṇa meaning - current meaning: '${context.meaning}'`
        };
    }
    
    // Calculate confidence based on context clarity
    let confidence = 0.8; // Base confidence for clear anu + lakṣaṇa
    
    // Higher confidence for explicit lakṣaṇa terms
    if (matchedMeaning === 'lakṣaṇa' || matchedMeaning === 'लक्षण') {
        confidence += 0.1;
    }
    
    // Higher confidence if associated noun is provided
    if (context.associatedNoun) {
        confidence += 0.05;
    }
    
    // Higher confidence for traditional usage patterns
    if (context.usage && context.usage.toLowerCase().includes('traditional')) {
        confidence += 0.05;
    }
    
    return {
        applies: true,
        reason: `'anu' receives karmapravacanīya designation when meaning '${matchedMeaning}' (lakṣaṇa)`,
        analysis: {
            particle: particle,
            normalizedForm: foundForm,
            designation: 'karmapravacanīya',
            meaningType: 'lakṣaṇa',
            matchedMeaning: matchedMeaning,
            sutraReference: '1.4.84',
            grammaticalEffects: [
                'prevents_retroflexion_8_3_59',
                'governs_noun_case'
            ],
            associatedNoun: context.associatedNoun || null
        },
        confidence: Math.min(confidence, 0.95)
    };
}
