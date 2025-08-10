/**
 * Sutra 1.1.45: इगुपधाच्च धातोः
 * ig-upadhāc-ca dhātoḥ
 * "And from a root whose penultimate (upadha) is an ik sound"
 * 
 * This sutra states that the term 'guna' (strengthening grade) applies 
 * to vowels that come from roots whose penultimate sound is an ik vowel (i, u, ṛ, ḷ).
 * This is a crucial rule for understanding Sanskrit vowel gradation (guna/vriddhi).
 */

import { SanskritWordLists } from '../sanskrit-utils/constants.js';
const { verbalSuffixes, ikVowels, gunaMap, vriddhiMap, knownDhatus } = SanskritWordLists;

/**
 * Main function to apply Sutra 1.1.45
 * @param {string} word - The word/root to analyze
 * @param {Object} context - Additional context for analysis
 * @returns {Object} Analysis result
 */
export function applySutra1_1_45(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            applies: false,
            reason: 'Invalid input: word must be a non-empty string'
        };
    }

    // Analyze if the root has ik upadha (penultimate)
    const rootAnalysis = analyzeRootStructure(word, context);
    const upadhaAnalysis = analyzeUpadha(word, context);
    const ikAnalysis = analyzeIkSound(upadhaAnalysis.upadha, context);

    // Check if this is a dhatu (verbal root)
    const isDhatu = context.is_dhatu || isLikelyDhatu(word, context);

    if (!isDhatu) {
        return {
            applies: false,
            is_dhatu: false,
            reason: 'Word does not appear to be a verbal root (dhatu)'
        };
    }

    if (!ikAnalysis.is_ik) {
        return {
            applies: false,
            is_dhatu: isDhatu,
            has_ik_upadha: false,
            upadha: upadhaAnalysis.upadha,
            reason: 'Root does not have ik vowel (i, u, ṛ, ḷ) as penultimate sound'
        };
    }

    return {
        applies: true,
        is_dhatu: true,
        has_ik_upadha: true,
        root: rootAnalysis.root,
        upadha: upadhaAnalysis.upadha,
        ik_type: ikAnalysis.ik_type,
        guna_applicable: true,
        context_type: context.grammatical_context || 'general',
        vowel_gradation: analyzeVowelGradation(word, context)
    };
}

/**
 * Analyzes the structure of a verbal root
 * @param {string} word - Word to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Root structure analysis
 */
function analyzeRootStructure(word, context = {}) {
    // If root is provided in context
    if (context.root) {
        return {
            root: context.root,
            source: 'context'
        };
    }

    // Basic root extraction - remove common suffixes
    let root = word.toLowerCase();
    
    // Remove common verbal suffixes to get to root
    const verbal_suffixes = verbalSuffixes;

    for (const suffix of verbal_suffixes) {
        if (root.endsWith(suffix) && root.length > suffix.length) {
            const potential_root = root.substring(0, root.length - suffix.length);
            // For 'gatvā' -> 'gat', we want 'gam' (the actual root)
            if (suffix === 'tvā' && potential_root.endsWith('t')) {
                root = potential_root.substring(0, potential_root.length - 1) + 'am';
            } else {
                root = potential_root;
            }
            break;
        }
    }

    return {
        root: root,
        original: word,
        source: 'analysis'
    };
}

/**
 * Analyzes the upadha (penultimate sound) of a word
 * @param {string} word - Word to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Upadha analysis
 */
function analyzeUpadha(word, context = {}) {
    // If upadha is provided in context
    if (context.upadha) {
        return {
            upadha: context.upadha,
            position: 'penultimate',
            source: 'context'
        };
    }

    const rootAnalysis = analyzeRootStructure(word, context);
    const root = rootAnalysis.root;

    // Extract sounds from the root
    const sounds = extractSounds(root);
    
    if (sounds.length < 2) {
        // For single sound roots like 'i' or 'u', there's no upadha
        return {
            upadha: null,
            reason: 'Root too short to have penultimate sound',
            sounds: sounds,
            source: 'analysis'
        };
    }

    // For roots like 'kṛ', 'ci', 'yu' - the vowel IS the final sound, not upadha
    // We need to check if the final sound is ik, not the penultimate
    const finalSound = sounds[sounds.length - 1]; // final sound
    const penultimateSound = sounds.length > 1 ? sounds[sounds.length - 2] : null; // penultimate sound

    // Special case: if the final sound is ik vowel, treat it as upadha for this sutra
    // This is because in roots like 'kṛ', the 'ṛ' is effectively the upadha vowel
    const ikAnalysis = analyzeIkSound(finalSound);
    if (ikAnalysis.is_ik) {
        return {
            upadha: finalSound,
            antya: penultimateSound, // consonant before the ik vowel
            position: 'final_ik_as_upadha',
            all_sounds: sounds,
            source: 'analysis',
            note: 'Final ik vowel treated as upadha for gradation purposes'
        };
    }

    // Normal case: penultimate sound
    return {
        upadha: penultimateSound,
        antya: finalSound,
        position: 'penultimate',
        all_sounds: sounds,
        source: 'analysis'
    };
}

/**
 * Extracts individual sounds from a Sanskrit word
 * @param {string} word - Word to analyze
 * @returns {Array} Array of sounds
 */
function extractSounds(word) {
    // Simple sound extraction for Sanskrit
    const sounds = [];
    let i = 0;
    
    while (i < word.length) {
        let sound = word[i];
        
        // Check for long vowels and special characters
        if (i < word.length - 1) {
            const twoChar = word.substring(i, i + 2);
            if (['ā', 'ī', 'ū', 'ai', 'au', 'ṛ', 'ṝ', 'ḷ', 'ḹ'].includes(twoChar)) {
                sound = twoChar;
                i += 2;
            } else {
                i++;
            }
        } else {
            i++;
        }
        
        sounds.push(sound);
    }
    
    return sounds;
}

/**
 * Analyzes if a sound is an ik vowel
 * @param {string} sound - Sound to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Ik sound analysis
 */
function analyzeIkSound(sound, context = {}) {
    if (!sound) {
        return {
            is_ik: false,
            reason: 'No sound provided'
        };
    }

    // Ik vowels are i, u, ṛ, ḷ (and their long counterparts)
    const ik_vowels = ikVowels;

    const normalized_sound = sound.toLowerCase();
    
    if (ik_vowels[normalized_sound]) {
        return {
            is_ik: true,
            ik_type: ik_vowels[normalized_sound].type,
            grade: ik_vowels[normalized_sound].grade,
            sound: normalized_sound,
            guna_form: getGunaForm(normalized_sound),
            vriddhi_form: getVriddhiForm(normalized_sound)
        };
    }

    return {
        is_ik: false,
        sound: normalized_sound,
        reason: 'Sound is not an ik vowel (i, u, ṛ, ḷ)'
    };
}

/**
 * Gets the guna form of an ik vowel
 * @param {string} ikVowel - The ik vowel
 * @returns {string} Guna form
 */
function getGunaForm(ikVowel) {
    return gunaMap[ikVowel] || ikVowel;
}

/**
 * Gets the vriddhi form of an ik vowel
 * @param {string} ikVowel - The ik vowel
 * @returns {string} Vriddhi form
 */
function getVriddhiForm(ikVowel) {
    return vriddhiMap[ikVowel] || ikVowel;
}

/**
 * Checks if a word is likely a dhatu (verbal root)
 * @param {string} word - Word to check
 * @param {Object} context - Contextual information
 * @returns {boolean} Whether likely a dhatu
 */
function isLikelyDhatu(word, context = {}) {
    // Known verbal roots with ik upadha
    const known_dhatus = knownDhatus;

    const normalized = word.toLowerCase();
    
    // Check if it's a known dhatu
    if (known_dhatus.includes(normalized)) {
        return true;
    }

    // Check if it has characteristics of a verbal root
    if (context.grammatical_context === 'verbal_analysis') {
        return true;
    }

    // Basic pattern matching for likely dhatus
    if (normalized.length >= 1 && normalized.length <= 5) {
        // Check if it contains ik vowels
        if (normalized.includes('ṛ') || normalized.includes('i') || normalized.includes('u') || 
            normalized.includes('ī') || normalized.includes('ū') || normalized.includes('ḷ')) {
            return true;
        }
    }

    return false;
}

/**
 * Analyzes vowel gradation patterns
 * @param {string} word - Word to analyze
 * @param {Object} context - Contextual information
 * @returns {Object} Vowel gradation analysis
 */
function analyzeVowelGradation(word, context = {}) {
    const upadhaAnalysis = analyzeUpadha(word, context);
    const ikAnalysis = analyzeIkSound(upadhaAnalysis.upadha, context);

    if (!ikAnalysis.is_ik) {
        return {
            has_gradation: false,
            reason: 'No ik upadha for gradation'
        };
    }

    return {
        has_gradation: true,
        basic_form: ikAnalysis.sound,
        guna_form: ikAnalysis.guna_form,
        vriddhi_form: ikAnalysis.vriddhi_form,
        gradation_type: ikAnalysis.ik_type,
        examples: getGradationExamples(ikAnalysis.sound)
    };
}

/**
 * Gets examples of vowel gradation
 * @param {string} ikVowel - The ik vowel
 * @returns {Object} Examples
 */
function getGradationExamples(ikVowel) {
    const examples = {
        'i': {
            basic: 'ci (to gather)',
            guna: 'ce-tum (to gather - infinitive)',
            vriddhi: 'cai-tra (relating to gathering)'
        },
        'u': {
            basic: 'yu (to join)',
            guna: 'yo-ga (union)',
            vriddhi: 'yau-taka (relating to joining)'
        },
        'ṛ': {
            basic: 'kṛ (to do)',
            guna: 'kar-ma (action)',
            vriddhi: 'kār-ya (to be done)'
        }
    };

    return examples[ikVowel] || {
        basic: `${ikVowel} form`,
        guna: `${getGunaForm(ikVowel)} form`,
        vriddhi: `${getVriddhiForm(ikVowel)} form`
    };
}

/**
 * Validates the application of Sutra 1.1.45
 * @param {string} word - Word to validate
 * @param {Object} context - Validation context
 * @returns {Object} Validation result
 */
export function validateIkUpadha(word, context = {}) {
    // Input validation
    if (!word || typeof word !== 'string') {
        return {
            is_valid_application: false,
            explanation: 'Invalid input: word must be a non-empty string',
            confidence: 0
        };
    }

    const analysis = applySutra1_1_45(word, context);

    if (!analysis.applies) {
        return {
            is_valid_application: false,
            has_ik_upadha: false,
            explanation: analysis.reason,
            confidence: 0
        };
    }

    // Calculate confidence based on clarity of identification
    let confidence = 0.6; // base confidence
    
    if (analysis.is_dhatu) confidence += 0.2;
    if (analysis.has_ik_upadha) confidence += 0.2;
    
    return {
        is_valid_application: true,
        has_ik_upadha: true,
        confidence: Math.min(confidence, 1.0),
        usage_note: `This root has an ik vowel (${analysis.ik_type}) as penultimate sound, making it eligible for guna gradation according to Sutra 1.1.45.`,
        grammatical_properties: {
            root: analysis.root,
            upadha: analysis.upadha,
            ik_type: analysis.ik_type,
            guna_applicable: analysis.guna_applicable,
            vowel_gradation: analysis.vowel_gradation
        }
    };
}

/**
 * Test function for comprehensive analysis
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Comprehensive test results
 */
export function testSutra1_1_45(word, context = {}) {
    const analysis = applySutra1_1_45(word, context);
    const validation = validateIkUpadha(word, context);

    return {
        analysis: analysis,
        validation: validation,
        examples: {
            i_upadha_roots: [
                'ci (to gather) → ce-tum (guna)',
                'ji (to conquer) → je-tum (guna)',
                'śi (to lie) → śe-te (guna)'
            ],
            u_upadha_roots: [
                'yu (to join) → yo-ga (guna)',
                'ru (to cry) → ro-diti (guna)',
                'śru (to hear) → śro-tum (guna)'
            ],
            r_upadha_roots: [
                'kṛ (to do) → kar-ma (guna)',
                'bhṛ (to bear) → bhar-ati (guna)',
                'smṛ (to remember) → smar-ati (guna)'
            ]
        },
        linguistic_notes: {
            ik_concept: 'Ik refers to the vowels i, u, ṛ, ḷ in Sanskrit grammar',
            upadha_concept: 'Upadha is the penultimate (second-to-last) sound in a word',
            guna_gradation: 'Guna is the first level of vowel strengthening: i/ī→e, u/ū→o, ṛ/ṝ→ar, ḷ/ḹ→al',
            vriddhi_gradation: 'Vriddhi is the second level: i/ī→ai, u/ū→au, ṛ/ṝ→ār, ḷ/ḹ→āl',
            morphological_importance: 'This rule is fundamental for understanding Sanskrit verb conjugation and noun formation'
        }
    };
}

// Export for testing
export { 
    analyzeRootStructure,
    analyzeUpadha,
    analyzeIkSound,
    analyzeVowelGradation,
    getGunaForm,
    getVriddhiForm
};
