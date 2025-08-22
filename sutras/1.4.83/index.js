/**
 * Sutra 1.4.83: कर्मप्रवचनीयाः (karmapravacanīyāḥ)
 * "The term 'karmapravacanīya' is to be used."
 * 
 * This is a governing rule (adhikāra sūtra) that establishes the scope for karmapravacanīya 
 * particles. It governs sutras 1.4.83 through 1.4.98, defining which particles get the 
 * karmapravacanīya designation. These are particles that govern noun cases like prepositions 
 * but are not verb prefixes (upasarga).
 * 
 * @param {object} context - Context containing rule or particle information
 * @param {string} [context.rule] - Rule number to check if it falls under karmapravacanīya scope
 * @param {string} [context.particle] - Particle to check for karmapravacanīya designation
 * @returns {object} Analysis result indicating if the rule applies
 */
export default function sutra_1_4_83(context) {
    // Input validation
    if (!context || typeof context !== 'object') {
        return {
            applies: false,
            error: 'Invalid context - object required'
        };
    }
    
    // If checking rule scope
    if (context.rule) {
        return checkRuleScope(context.rule);
    }
    
    // If checking particle designation
    if (context.particle) {
        return checkParticleDesignation(context.particle);
    }
    
    return {
        applies: false,
        error: 'Context must include either rule number or particle'
    };
}

/**
 * Check if a rule falls within the karmapravacanīya scope
 * @param {string} rule - Rule number (e.g., "1.4.85")
 * @returns {object} Result indicating if rule is in scope
 */
function checkRuleScope(rule) {
    if (!rule || typeof rule !== 'string') {
        return {
            applies: false,
            error: 'Invalid rule format'
        };
    }
    
    // Parse rule number
    const parts = rule.split('.').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
        return {
            applies: false,
            error: 'Invalid rule format - expected X.Y.Z format'
        };
    }
    
    const [adhyaya, pada, sutraNum] = parts;
    
    // Check if within karmapravacanīya scope (1.4.83 to 1.4.98)
    if (adhyaya === 1 && pada === 4 && sutraNum >= 83 && sutraNum <= 98) {
        return {
            applies: true,
            reason: `Rule ${rule} falls within the karmapravacanīya scope (1.4.83-1.4.98)`,
            analysis: {
                ruleScope: 'karmapravacanīya',
                scopeStart: '1.4.83',
                scopeEnd: '1.4.98',
                rulePosition: sutraNum - 83 + 1,
                totalRulesInScope: 16
            },
            confidence: 1.0 // Definitional rule - absolute confidence
        };
    } else {
        return {
            applies: false,
            reason: `Rule ${rule} is outside the karmapravacanīya section (1.4.83-1.4.98)`,
            analysis: {
                ruleScope: 'outside_karmapravacanīya',
                actualPosition: `${adhyaya}.${pada}.${sutraNum}`,
                expectedRange: '1.4.83-1.4.98'
            }
        };
    }
}

/**
 * Check if a particle should get karmapravacanīya designation
 * @param {string} particle - Particle to check
 * @returns {object} Result indicating designation
 */
function checkParticleDesignation(particle) {
    if (!particle || typeof particle !== 'string') {
        return {
            applies: false,
            error: 'Invalid particle - string required'
        };
    }
    
    // Common karmapravacanīya particles (examples from traditional grammar)
    const karmapravacaniyaParticles = {
        iast: ['anu', 'prati', 'yāvat', 'antareṇa', 'ṛte', 'vinā', 'bahiḥ', 'prāk', 'paścāt'],
        devanagari: ['अनु', 'प्रति', 'यावत्', 'अन्तरेण', 'ऋते', 'विना', 'बहिः', 'प्राक्', 'पश्चात्']
    };
    
    const normalizedParticle = particle.toLowerCase().trim();
    
    // Check if particle is a known karmapravacanīya
    let isKarmapravacaniya = false;
    let foundForm = '';
    
    // Check IAST forms
    for (const p of karmapravacaniyaParticles.iast) {
        if (normalizedParticle === p.toLowerCase() || normalizedParticle.includes(p.toLowerCase())) {
            isKarmapravacaniya = true;
            foundForm = p;
            break;
        }
    }
    
    // Check Devanagari forms
    if (!isKarmapravacaniya) {
        for (const p of karmapravacaniyaParticles.devanagari) {
            if (normalizedParticle === p || normalizedParticle.includes(p)) {
                isKarmapravacaniya = true;
                foundForm = p;
                break;
            }
        }
    }
    
    if (isKarmapravacaniya) {
        return {
            applies: true,
            reason: `Particle '${particle}' receives karmapravacanīya designation`,
            analysis: {
                particle: particle,
                normalizedForm: foundForm,
                designation: 'karmapravacanīya',
                function: 'governs_noun_case',
                distinguishedFrom: 'upasarga'
            },
            confidence: 0.9 // High confidence for known particles
        };
    } else {
        return {
            applies: false,
            reason: `Particle '${particle}' is not a recognized karmapravacanīya`,
            analysis: {
                particle: particle,
                suggestion: 'Check against sutras 1.4.83-1.4.98 for specific particle rules'
            }
        };
    }
}
