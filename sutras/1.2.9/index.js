/**
 * Sutra 1.2.9: इको झल्
 * "The affix सन् beginning with a letter of the प्रत्यहार झल् is like कित् after the verbs ending in इक् vowels."
 * 
 * This sutra extends कित् designation to affixes that begin with झल् consonants when they come after roots ending in इक् (i, u, ṛ, ḷ).
 */

import { 
    validateSanskritWord, 
    detectScript,
    analyzeKitDesignation
} from '../sanskrit-utils/index.js';

import {
    constructPratyahara,
    isPhonemeInPratyahara,
    COMMON_PRATYAHARAS
} from '../sanskrit-utils/pratyahara-construction.js';

/**
 * Main function implementing Sutra 1.2.9
 * @param {string} word - The input word or morphological combination
 * @param {Object} [context={}] - Optional context containing morphological information
 * @param {string} [context.root] - The root from which the word is derived
 * @param {string} [context.affix] - The affix being applied
 * @param {Array} [context.affixes] - Array of affixes for compound analysis
 * @param {boolean} [context.debug=false] - Enable debug output
 * @returns {Object} Analysis result with कित् designation status
 */
export function analyzeKitDesignationSutra129(word, context = {}) {
    try {
        // Input validation
        const validation = validateSanskritWord(word);
        if (!validation.isValid) {
            throw new Error(`Invalid input: ${validation.error}`);
        }

        const { root, affix, affixes, debug = false } = context;
        const result = {
            sutra: '1.2.9',
            text: 'इको झल्',
            applies: false,
            kitDesignated: false,
            analysis: {
                word: word.trim(),
                script: detectScript(word),
                root: root || null,
                affix: affix || null,
                affixes: affixes || [],
                rootEndsInIka: false,
                affixBeginsWithJhal: false,
                debug: debug ? [] : null
            },
            explanation: ''
        };

        // Debug helper
        const addDebug = (message) => {
            if (debug && result.analysis.debug) {
                result.analysis.debug.push(message);
            }
        };

        addDebug(`Analyzing Sutra 1.2.9 for word: ${word}`);

        // If we have explicit root and affix context, analyze them
        if (root && affix) {
            result.analysis.rootEndsInIka = checkRootEndsInIka(root);
            result.analysis.affixBeginsWithJhal = checkAffixBeginsWithJhal(affix);
            
            addDebug(`Root '${root}' ends in इक्: ${result.analysis.rootEndsInIka}`);
            addDebug(`Affix '${affix}' begins with झल्: ${result.analysis.affixBeginsWithJhal}`);

            if (result.analysis.rootEndsInIka && result.analysis.affixBeginsWithJhal) {
                result.applies = true;
                result.kitDesignated = true;
                result.explanation = `The affix '${affix}' is designated as कित् because it begins with a झल् consonant and follows the इक्-ending root '${root}' (Sutra 1.2.9).`;
            }
        }
        // If we have multiple affixes, analyze each one
        else if (affixes && affixes.length > 0) {
            for (const affixInfo of affixes) {
                if (affixInfo.root && affixInfo.affix) {
                    const rootEndsInIka = checkRootEndsInIka(affixInfo.root);
                    const affixBeginsWithJhal = checkAffixBeginsWithJhal(affixInfo.affix);
                    
                    addDebug(`Checking affix '${affixInfo.affix}' with root '${affixInfo.root}'`);
                    addDebug(`Root ends in इक्: ${rootEndsInIka}, Affix begins with झल्: ${affixBeginsWithJhal}`);
                    
                    if (rootEndsInIka && affixBeginsWithJhal) {
                        result.applies = true;
                        result.kitDesignated = true;
                        result.analysis.root = affixInfo.root;
                        result.analysis.affix = affixInfo.affix;
                        result.analysis.rootEndsInIka = true;
                        result.analysis.affixBeginsWithJhal = true;
                        result.explanation = `The affix '${affixInfo.affix}' is designated as कित् because it begins with a झल् consonant and follows the इक्-ending root '${affixInfo.root}' (Sutra 1.2.9).`;
                        break;
                    }
                }
            }
        }
        // Try to use shared kit-designation utility as fallback
        else {
            try {
                const kitResult = analyzeKitDesignation(word, '', context);
                if (kitResult.applicableSutras && kitResult.applicableSutras.includes('1.2.9')) {
                    result.applies = true;
                    result.kitDesignated = kitResult.isKit;
                    result.explanation = `Analyzed using shared kit-designation utility: ${kitResult.explanation || 'कित् designation by Sutra 1.2.9'}`;
                    addDebug('Used shared kit-designation utility for analysis');
                }
            } catch (utilError) {
                addDebug(`Kit-designation utility error: ${utilError.message}`);
            }
        }

        // Final explanation if not applied
        if (!result.applies) {
            result.explanation = 'Sutra 1.2.9 does not apply. This rule requires a root ending in इक् (i, u, ṛ, ḷ) followed by an affix beginning with झल् consonants.';
        }

        addDebug(`Final result: applies=${result.applies}, kitDesignated=${result.kitDesignated}`);
        return result;

    } catch (error) {
        return {
            sutra: '1.2.9',
            text: 'इको झल्',
            applies: false,
            kitDesignated: false,
            error: error.message,
            analysis: {
                word: word || '',
                script: word ? detectScript(word) : null
            }
        };
    }
}

/**
 * Check if a root ends in इक् (i, u, ṛ, ḷ) vowels
 * @param {string} root - The root to check
 * @returns {boolean} True if root ends in इक्
 */
function checkRootEndsInIka(root) {
    if (!root || typeof root !== 'string') return false;
    
    const normalizedRoot = root.trim();
    if (!normalizedRoot) return false;
    
    // Use the predefined इक् pratyahara
    const ikaPratyahara = COMMON_PRATYAHARAS.ik;
    
    // For Devanagari, check for vowel signs and independent vowels
    if (detectScript(root) === 'Devanagari') {
        // Check for vowel signs (matras)
        const devanagariMatras = {
            'ि': 'i',    // i-matra
            'ु': 'u',    // u-matra  
            'ृ': 'ṛ',    // ṛ-matra
            'ॢ': 'ḷ'     // ḷ-matra
        };
        
        // Check if root ends with any of these matras
        for (const [matra, iast] of Object.entries(devanagariMatras)) {
            if (normalizedRoot.endsWith(matra) && ikaPratyahara.includes(iast)) {
                return true;
            }
        }
        
        // Check for independent vowels at the end
        const devanagariVowels = {
            'इ': 'i',
            'उ': 'u', 
            'ऋ': 'ṛ',
            'ऌ': 'ḷ'
        };
        
        for (const [vowel, iast] of Object.entries(devanagariVowels)) {
            if (normalizedRoot.endsWith(vowel) && ikaPratyahara.includes(iast)) {
                return true;
            }
        }
    } else {
        // For IAST, check directly
        const lastChar = normalizedRoot[normalizedRoot.length - 1].toLowerCase();
        return ikaPratyahara.includes(lastChar);
    }
    
    return false;
}

/**
 * Check if an affix begins with झल् (consonants)
 * @param {string} affix - The affix to check
 * @returns {boolean} True if affix begins with झल्
 */
function checkAffixBeginsWithJhal(affix) {
    if (!affix || typeof affix !== 'string') return false;
    
    const normalizedAffix = affix.trim();
    if (!normalizedAffix) return false;
    
    // Get the first character
    const firstChar = normalizedAffix[0];
    
    // Use the predefined हल् pratyahara (which is equivalent to झल्)
    const jhalPratyahara = COMMON_PRATYAHARAS.hal;
    
    // Check if the first character is in the झल् pratyahara
    if (jhalPratyahara.includes(firstChar.toLowerCase())) {
        return true;
    }
    
    // Convert Devanagari to IAST and check
    const iastEquivalent = convertToIAST(firstChar);
    return jhalPratyahara.includes(iastEquivalent);
}

/**
 * Simple conversion helper for common Devanagari to IAST
 * @param {string} char - Character to convert
 * @returns {string} IAST equivalent
 */
function convertToIAST(char) {
    const devanagariToIAST = {
        'इ': 'i', 'उ': 'u', 'ऋ': 'ṛ', 'ऌ': 'ḷ',
        'त': 't', 'क': 'k', 'न': 'n', 'स': 's',
        'च': 'c', 'ग': 'g', 'ज': 'j', 'द': 'd',
        'प': 'p', 'ब': 'b', 'म': 'm', 'य': 'y',
        'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'ś',
        'ष': 'ṣ', 'ह': 'h', 'ध': 'dh', 'भ': 'bh',
        'घ': 'gh', 'ख': 'kh', 'छ': 'ch', 'झ': 'jh',
        'थ': 'th', 'फ': 'ph', 'ट': 'ṭ', 'ठ': 'ṭh',
        'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ', 'ञ': 'ñ',
        'ङ': 'ṅ'
    };
    return devanagariToIAST[char] || char;
}

/**
 * Check if this sutra applies to a given word and context
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Morphological context
 * @returns {boolean} True if Sutra 1.2.9 applies
 */
export function appliesSutra129(word, context = {}) {
    const result = analyzeKitDesignationSutra129(word, context);
    return result.applies;
}

/**
 * Get examples demonstrating Sutra 1.2.9
 * @returns {Array} Array of example objects
 */
export function getSutra129Examples() {
    return [
        {
            root: 'चि',
            affix: 'त',
            combination: 'चित',
            explanation: 'चि (to gather) + त (past participle) → चित (gathered). The affix त begins with a झल् consonant after the इक्-ending root चि.',
            kitDesignated: true
        },
        {
            root: 'शु',
            affix: 'क्त',
            combination: 'शुक्त',
            explanation: 'शु (to be pure) + क्त → शुक्त (purified). The affix क्त begins with झल् after the इक्-ending root शु.',
            kitDesignated: true
        },
        {
            root: 'कृ',
            affix: 'त',
            combination: 'कृत',
            explanation: 'कृ (to do) + त → कृत (done). The affix त begins with झल् after the इक्-ending root कृ.',
            kitDesignated: true
        },
        {
            root: 'गम्',
            affix: 'त',
            combination: 'गत',
            explanation: 'गम् (to go) + त → गत (gone). This does not apply because गम् does not end in इक्.',
            kitDesignated: false
        },
        {
            root: 'भू',
            affix: 'अन',
            combination: 'भवन',
            explanation: 'भू (to be) + अन → भवन (house). This does not apply because अन begins with a vowel, not झल्.',
            kitDesignated: false
        }
    ];
}

/**
 * Get detailed morphological analysis according to Sutra 1.2.9
 * @param {string} word - The word to analyze
 * @param {Object} [context={}] - Additional context
 * @returns {Object} Detailed morphological analysis
 */
export function getMorphologicalAnalysis129(word, context = {}) {
    const baseResult = analyzeKitDesignationSutra129(word, { ...context, debug: true });
    
    return {
        ...baseResult,
        morphology: {
            sutraType: 'कित्त्वातिदेश (Kit-designation rule)',
            grammaticalScope: 'Applies to affixes beginning with झल् consonants after इक्-ending roots',
            phoneticCondition: 'Root must end in इ, उ, ऋ, or ऌ; affix must begin with a consonant',
            semanticImpact: 'Designates the affix as कित्, affecting accent and morphophonemic changes',
            examples: getSutra129Examples(),
            relatedSutras: ['1.2.8', '1.2.10', '1.2.11', '1.2.12', '1.2.13', '1.2.14', '1.2.15']
        }
    };
}

// Export the main function as default
export default analyzeKitDesignationSutra129;
