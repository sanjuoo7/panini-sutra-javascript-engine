/**
 * Sutra 1.1.46: आद्यन्तौ टकितौ
 * ādyantau ṭakitau
 * "The initial and final (sounds) are called ṭakita"
 * 
 * This sutra defines the technical term 'ṭakita' (ṭ-kit) which refers to
 * the first and last sounds in a sequence. This is important for various
 * grammatical operations that affect only the beginning or end of words,
 * roots, or suffixes.
 * 
 * The term ṭakita is formed from ṭ (first letter of alphabet) + kit (particle),
 * indicating the boundary positions in phonetic sequences.
 */

import { SanskritWordLists } from '../sanskrit-utils/constants.js';
const { vowelProperties, consonantProperties } = SanskritWordLists;

/**
 * Main function to apply Sutra 1.1.46
 * @param {string} word - The word or sequence to analyze
 * @param {Object} context - Additional context for analysis
 * @returns {Object} Analysis result showing ṭakita identification
 */
export function applySutra1_1_46(word, context = {}) {
    // Input validation
    if (typeof word !== 'string') {
        return {
            applies: false,
            reason: 'Invalid input: word must be a string'
        };
    }

    // Normalize the word for analysis
    const normalized_word = word.toLowerCase().trim();
    
    if (normalized_word.length === 0) {
        return {
            applies: false,
            reason: 'Empty word after normalization'
        };
    }

    // Analyze initial and final sounds
    const initialSound = analyzeInitialSound(normalized_word, context);
    const finalSound = analyzeFinalSound(normalized_word, context);

    return {
        applies: true,
        word: word,
        normalized_word: normalized_word,
        takita_analysis: {
            initial_sound: initialSound,
            final_sound: finalSound,
            word_length: normalized_word.length,
            boundary_positions: {
                first: 0,
                last: normalized_word.length - 1
            }
        },
        grammatical_function: 'boundary_identification',
        source: 'sutra_1_1_46'
    };
}

/**
 * Analyzes the initial sound (ādya)
 * @param {string} word - Normalized word
 * @param {Object} context - Contextual information
 * @returns {Object} Analysis of initial sound
 */
function analyzeInitialSound(word, context = {}) {
    const firstChar = word.charAt(0);
    
    return {
        character: firstChar,
        position: 'initial',
        takita_type: 'ādya',
        phonetic_properties: analyzePhoneticProperties(firstChar),
        grammatical_significance: 'Affects word-initial processes, sandhi rules, and morphological operations'
    };
}

/**
 * Analyzes the final sound (anta)
 * @param {string} word - Normalized word
 * @param {Object} context - Contextual information
 * @returns {Object} Analysis of final sound
 */
function analyzeFinalSound(word, context = {}) {
    const lastChar = word.charAt(word.length - 1);
    
    return {
        character: lastChar,
        position: 'final',
        takita_type: 'anta',
        phonetic_properties: analyzePhoneticProperties(lastChar),
        grammatical_significance: 'Affects word-final processes, case ending attachment, and compound formation'
    };
}

/**
 * Analyzes phonetic properties of a character
 * @param {string} char - Character to analyze
 * @returns {Object} Phonetic analysis
 */
function analyzePhoneticProperties(char) {
    // Vowel patterns
    const vowels = vowelProperties;

    // Consonant patterns
    const consonantGroups = consonantProperties;

    if (vowels[char]) {
        return vowels[char];
    } else if (consonantGroups[char]) {
        return consonantGroups[char];
    } else {
        return {
            type: 'unknown',
            character: char,
            note: 'Character not in standard Sanskrit phoneme inventory'
        };
    }
}

/**
 * Identifies ṭakita elements in morphological analysis
 * @param {string} word - Word to analyze
 * @param {string} analysisType - Type of analysis (root, suffix, compound, etc.)
 * @param {Object} context - Analysis context
 * @returns {Object} ṭakita identification for morphological processes
 */
export function identifyTakitaElements(word, analysisType = 'general', context = {}) {
    const analysis = applySutra1_1_46(word, context);
    
    if (!analysis.applies) {
        return analysis;
    }

    const takitaElements = {
        word: word,
        analysis_type: analysisType,
        initial_takita: {
            sound: analysis.takita_analysis.initial_sound,
            relevant_processes: getRelevantProcesses(analysis.takita_analysis.initial_sound, 'initial', analysisType)
        },
        final_takita: {
            sound: analysis.takita_analysis.final_sound,
            relevant_processes: getRelevantProcesses(analysis.takita_analysis.final_sound, 'final', analysisType)
        },
        boundary_analysis: {
            can_affect_initial: true,
            can_affect_final: true,
            morphological_boundaries: identifyMorphologicalBoundaries(word, context)
        }
    };

    return {
        applies: true,
        takita_elements: takitaElements,
        source: 'sutra_1_1_46'
    };
}

/**
 * Gets relevant grammatical processes for ṭakita elements
 * @param {Object} sound - Sound analysis
 * @param {string} position - Position (initial/final)
 * @param {string} analysisType - Type of morphological analysis
 * @returns {Array} List of relevant processes
 */
function getRelevantProcesses(sound, position, analysisType) {
    const processes = [];

    if (position === 'initial') {
        processes.push('word-initial sandhi');
        processes.push('prefix attachment');
        processes.push('compound formation (first element)');
        
        if (sound.phonetic_properties.type === 'vowel') {
            processes.push('vowel-initial word processes');
            processes.push('prothetic consonant rules');
        } else {
            processes.push('consonant cluster simplification');
            processes.push('aspiration changes');
        }
    } else if (position === 'final') {
        processes.push('word-final sandhi');
        processes.push('case ending attachment');
        processes.push('compound formation (final element)');
        processes.push('pada rules');
        
        if (sound.phonetic_properties.type === 'vowel') {
            processes.push('final vowel modifications');
        } else {
            processes.push('final consonant rules');
            processes.push('visarga formation');
        }
    }

    return processes;
}

/**
 * Identifies morphological boundaries within words
 * @param {string} word - Word to analyze
 * @param {Object} context - Analysis context
 * @returns {Object} Boundary analysis
 */
function identifyMorphologicalBoundaries(word, context = {}) {
    return {
        word_boundaries: {
            start: 0,
            end: word.length - 1
        },
        potential_internal_boundaries: [],
        boundary_types: ['word-initial', 'word-final'],
        note: 'Detailed internal boundary analysis requires morphological parsing'
    };
}

/**
 * Validates ṭakita identification
 * @param {string} word - Word to validate
 * @param {Object} context - Validation context
 * @returns {Object} Validation result
 */
export function validateTakita(word, context = {}) {
    const analysis = applySutra1_1_46(word, context);

    if (!analysis.applies) {
        return {
            is_valid: false,
            reason: analysis.reason
        };
    }

    return {
        is_valid: true,
        takita_identification: {
            initial: analysis.takita_analysis.initial_sound,
            final: analysis.takita_analysis.final_sound
        },
        confidence: 1.0,
        usage_note: `The initial sound '${analysis.takita_analysis.initial_sound.character}' and final sound '${analysis.takita_analysis.final_sound.character}' are ṭakita elements that can be affected by boundary-specific grammatical processes.`,
        grammatical_properties: {
            has_takita_elements: true,
            boundary_positions: analysis.takita_analysis.boundary_positions,
            phonetic_classes: {
                initial: analysis.takita_analysis.initial_sound.phonetic_properties.type,
                final: analysis.takita_analysis.final_sound.phonetic_properties.type
            }
        }
    };
}

/**
 * Test function for comprehensive analysis
 * @param {string} word - Word to test
 * @param {Object} context - Test context
 * @returns {Object} Comprehensive test results
 */
export function testSutra1_1_46(word, context = {}) {
    const analysis = applySutra1_1_46(word, context);
    const identification = identifyTakitaElements(word, 'test', context);
    const validation = validateTakita(word, context);

    return {
        analysis: analysis,
        identification: identification,
        validation: validation,
        examples: {
            takita_examples: [
                'gam (g-initial, m-final)',
                'asta (a-initial, a-final)',
                'kṛ (k-initial, ṛ-final)',
                'bhū (bh-initial, ū-final)'
            ],
            process_examples: [
                'Initial: k + vowel → sandhi changes',
                'Final: consonant + case ending → modifications',
                'Initial: vowel + prefix → compound rules',
                'Final: root + suffix → boundary processes'
            ]
        },
        linguistic_notes: {
            sutra_purpose: 'Defines ṭakita as the technical term for initial and final sounds in grammatical analysis',
            takita_function: 'Identifies boundary positions for morphological and phonological processes',
            initial_significance: 'Controls word-initial processes, sandhi, and prefix attachment',
            final_significance: 'Controls word-final processes, case endings, and compound formation',
            phonological_importance: 'Essential for understanding Sanskrit sound changes at word boundaries'
        }
    };
}

// Export for testing
export { 
    analyzeInitialSound,
    analyzeFinalSound,
    analyzePhoneticProperties,
    getRelevantProcesses
};
