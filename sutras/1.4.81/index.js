/**
 * Sutra 1.4.81: छन्दसि परेऽपि (chandasi pare'pi)
 *
 * This sutra states that in Vedic Sanskrit (chandas), particles/gatis can also be placed 
 * after the verb (pare api), in addition to their normal position before the verb.
 * 
 * Key points:
 * - छन्दसि (chandasi): In Vedic Sanskrit/meter
 * - परे (pare): After/following  
 * - अपि (api): Also/even
 * 
 * This allows for flexible word order in Vedic texts where gati particles can follow verbs.
 * 
 * @param {string} sentence - The sentence to analyze
 * @param {Object} context - Context with isVedic, verb, and particles information
 * @returns {Object} Analysis result indicating if the sutra applies
 */

import { detectScript, isDevanagari, isIAST } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord, sanitizeInput } from '../sanskrit-utils/validation.js';

/**
 * List of common gati particles that can appear after verbs in Vedic Sanskrit
 */
const VEDIC_GATI_PARTICLES = {
    iast: [
        'ā',        // आ - towards, near
        'vi',       // वि - apart, away
        'ava',      // अव - down, away
        'upa',      // उप - near, towards
        'ni',       // नि - down, into
        'pra',      // प्र - forth, forward
        'pari',     // परि - around, about
        'sam',      // सम् - together, with
        'anu',      // अनु - after, along
        'ati',      // अति - over, beyond
        'adhi',     // अधि - over, upon
        'abhi',     // अभि - towards, against
        'prāti',    // प्राति - towards, against
        'ud',       // उद् - up, out
        'nis',      // निस् - out, forth
        'dus',      // दुस् - bad, ill
        'su',       // सु - good, well
        'api',      // अपि - also, even
        'ca',       // च - and
        'vā',       // वा - or
        'ha',       // ह - indeed
        'vai',      // वै - indeed, truly
        'tu',       // तु - but, however
        'khalu',    // खलु - indeed, certainly
        'eva',      // एव - only, just
        'iva',      // इव - like, as
    ],
    devanagari: [
        'आ',        // ā - towards, near
        'वि',       // vi - apart, away  
        'अव',       // ava - down, away
        'उप',       // upa - near, towards
        'नि',       // ni - down, into
        'प्र',       // pra - forth, forward
        'परि',      // pari - around, about
        'सम्',      // sam - together, with
        'अनु',      // anu - after, along
        'अति',      // ati - over, beyond
        'अधि',      // adhi - over, upon
        'अभि',      // abhi - towards, against
        'प्राति',    // prāti - towards, against
        'उद्',      // ud - up, out
        'निस्',     // nis - out, forth
        'दुस्',     // dus - bad, ill
        'सु',       // su - good, well
        'अपि',      // api - also, even
        'च',        // ca - and
        'वा',       // vā - or
        'ह',        // ha - indeed
        'वै',       // vai - indeed, truly
        'तु',       // tu - but, however
        'खलु',      // khalu - indeed, certainly
        'एव',       // eva - only, just
        'इव',      // iva - like, as
    ]
};

/**
 * Common Vedic verb patterns for recognition
 */
const VEDIC_VERB_PATTERNS = {
    iast: [
        // Common verb endings
        'ti', 'si', 'mi',           // present active
        'te', 'se', 'e',            // present middle
        'tāt', 'sāt', 'āt',         // past active
        'tām', 'sām', 'ām',         // past middle
        'tu', 'su', 'u',            // imperative
        'ate', 'ase', 'e',          // present middle
        'īte', 'īse', 'īe',         // perfect middle
        // Common verb forms
        'īḷe', 'īḷate', 'dadhimahi', 'gacchati', 'bhavati', 'karoti', 'vadati',
        'śṛṇoti', 'paśyati', 'jānāti', 'icchati', 'yajati', 'hanti', 'eti',
        'āgacchati', 'tiṣṭhati', 'dhāvati', 'rudati', 'hasati', 'mṛtyate'
    ],
    devanagari: [
        // Common verb endings  
        'ति', 'सि', 'मि',           // present active
        'ते', 'से', 'ए',            // present middle
        'तात्', 'सात्', 'आत्',       // past active
        'ताम्', 'साम्', 'आम्',       // past middle
        'तु', 'सु', 'उ',            // imperative
        'अते', 'असे', 'ए',          // present middle
        'ईते', 'ईसे', 'ईए',         // perfect middle
        // Common verb forms
        'ईळे', 'ईळते', 'दधिमहि', 'गच्छति', 'भवति', 'करोति', 'वदति',
        'शृणोति', 'पश्यति', 'जानाति', 'इच्छति', 'यजति', 'हन्ति', 'एति',
        'आगच्छति', 'तिष्ठति', 'धावति', 'रुदति', 'हसति', 'म्रियते'
    ]
};

/**
 * Main function for Sutra 1.4.81
 * Determines if gati particles can follow verbs in Vedic context
 * 
 * @param {string} sentence - The sentence to analyze
 * @param {Object} context - Context including isVedic, verb, and particles information
 * @returns {Object} Analysis result
 */
export default function chandasiPareApi(sentence, context = {}) {
    try {
        // Input validation
        if (!sentence || typeof sentence !== 'string') {
            return {
                applies: false,
                error: 'Invalid input: sentence must be a non-empty string'
            };
        }

        if (!context || typeof context !== 'object') {
            return {
                applies: false,
                error: 'Invalid context: context must be an object'
            };
        }

        // Check if this is a Vedic context
        if (!context.isVedic) {
            return {
                applies: false,
                reason: 'Non-Vedic context'
            };
        }

        // Validate context requirements
        if (!context.verb || !context.particles || !Array.isArray(context.particles) || context.particles.length === 0) {
            return {
                error: 'Invalid context'
            };
        }

        const cleanSentence = sanitizeInput(sentence);
        const processedSentence = typeof cleanSentence === 'object' && cleanSentence.sanitized 
            ? cleanSentence.sanitized 
            : (typeof cleanSentence === 'string' ? cleanSentence : sentence);

        // Determine script type
        const isDevScript = isDevanagari(processedSentence);
        const particles = isDevScript ? VEDIC_GATI_PARTICLES.devanagari : VEDIC_GATI_PARTICLES.iast;

        // Split sentence into words
        const words = processedSentence.split(/\s+/).filter(word => word.length > 0);
        
        // Find verb position
        const verbIndex = words.indexOf(context.verb);
        
        // If verb is not found explicitly, check if we should handle implied verb
        if (verbIndex === -1) {
            // In Vedic Sanskrit, verbs can be implied/understood
            // Only apply this for recognizable Vedic verb forms and valid particles
            const particleExists = context.particles.some(p => words.includes(p));
            const isRecognizableVedicVerb = isRecognizableVedicVerbForm(context.verb, isDevScript);
            const hasValidParticles = context.particles.some(p => particles.includes(p));
            
            if (particleExists && isRecognizableVedicVerb && hasValidParticles) {
                // Treat as if verb is at position -1 (before all words), so any particle position is "after"
                return analyzeWithImpliedVerb(words, context, particles);
            }
            return {
                error: 'Verb or particle not in sentence'
            };
        }

        // Check each particle in context
        let foundPostVerbalParticle = false;
        let foundFlexibleParticle = false;
        let particleDetails = [];

        for (const particle of context.particles) {
            const particleIndex = words.indexOf(particle);
            
            if (particleIndex === -1) {
                return {
                    error: 'Verb or particle not in sentence'
                };
            }

            // Check if particle comes after verb (standard application)
            if (particleIndex > verbIndex) {
                foundPostVerbalParticle = true;
                particleDetails.push({
                    particle,
                    position: particleIndex,
                    verbPosition: verbIndex,
                    isValidGati: particles.includes(particle),
                    placement: 'post-verbal'
                });
            }
            // In Vedic, also check for flexible placement where valid gati particles
            // can have non-standard order due to metrical requirements
            // But not if the particle is at the absolute beginning (that's clearly pre-verbal)
            else if (particles.includes(particle) && 
                     Math.abs(particleIndex - verbIndex) <= 2 && 
                     particleIndex > 0) {  // Not at sentence beginning
                foundFlexibleParticle = true;
                particleDetails.push({
                    particle,
                    position: particleIndex,
                    verbPosition: verbIndex,
                    isValidGati: particles.includes(particle),
                    placement: 'flexible-vedic'
                });
            }
        }

        if (foundPostVerbalParticle || foundFlexibleParticle) {
            return {
                applies: true,
                vedicContext: true,
                verb: context.verb,
                verbPosition: verbIndex,
                postVerbalParticles: particleDetails,
                confidence: calculateConfidence(words, context.verb, context.particles, isDevScript)
            };
        }

        return {
            applies: false,
            reason: 'Particle does not follow verb'
        };

    } catch (error) {
        return {
            applies: false,
            error: `Processing error: ${error.message}`
        };
    }
}

/**
 * Check if a verb form is recognizable as a Vedic verb
 */
function isRecognizableVedicVerbForm(verb, isDevanagari) {
    const verbPatterns = isDevanagari ? VEDIC_VERB_PATTERNS.devanagari : VEDIC_VERB_PATTERNS.iast;
    
    // Check if it's in our list of known verb forms
    if (verbPatterns.includes(verb)) {
        return true;
    }
    
    // Check if it ends with common verb endings
    const endings = isDevanagari 
        ? ['ति', 'सि', 'मि', 'ते', 'से', 'ए', 'तु', 'सु', 'उ']
        : ['ti', 'si', 'mi', 'te', 'se', 'e', 'tu', 'su', 'u'];
    
    return endings.some(ending => verb.endsWith(ending)) && verb.length > 2;
}

/**
 * Analyze sentence with implied verb (common in Vedic Sanskrit)
 */
function analyzeWithImpliedVerb(words, context, particles) {
    let foundParticle = false;
    let particleDetails = [];

    for (const particle of context.particles) {
        const particleIndex = words.indexOf(particle);
        
        if (particleIndex === -1) {
            return {
                error: 'Verb or particle not in sentence'
            };
        }

        // With implied verb, any particle in the sentence can be considered "post-verbal"
        foundParticle = true;
        particleDetails.push({
            particle,
            position: particleIndex,
            verbPosition: -1, // implied verb
            isValidGati: particles.includes(particle),
            impliedVerb: true
        });
    }

    if (foundParticle) {
        return {
            applies: true,
            vedicContext: true,
            verb: context.verb,
            verbPosition: -1, // implied
            impliedVerb: true,
            postVerbalParticles: particleDetails,
            confidence: calculateConfidence(words, context.verb, context.particles, particles === VEDIC_GATI_PARTICLES.devanagari) * 0.8 // Lower confidence for implied verb
        };
    }

    return {
        applies: false,
        reason: 'No valid particles found'
    };
}

/**
 * Calculate confidence score for the Vedic gati placement
 */
function calculateConfidence(words, verb, particles, isDevanagari) {
    let confidence = 0.6; // Base confidence for Vedic context

    // Check if verb is recognizable Vedic form
    const verbPatterns = isDevanagari ? VEDIC_VERB_PATTERNS.devanagari : VEDIC_VERB_PATTERNS.iast;
    const particleList = isDevanagari ? VEDIC_GATI_PARTICLES.devanagari : VEDIC_GATI_PARTICLES.iast;

    // Boost for recognized verb forms
    if (verbPatterns.some(pattern => verb.includes(pattern))) {
        confidence += 0.15;
    }

    // Boost for valid gati particles
    const validParticles = particles.filter(p => particleList.includes(p));
    confidence += (validParticles.length / particles.length) * 0.15;

    // Boost for typical Vedic word order patterns
    if (words.length > 3) {
        confidence += 0.05;
    }

    // Boost for multiple post-verbal particles (common in Vedic)
    if (particles.length > 1) {
        confidence += 0.05;
    }

    return Math.min(confidence, 1.0);
}

export {
    chandasiPareApi,
    VEDIC_GATI_PARTICLES,
    VEDIC_VERB_PATTERNS
};
