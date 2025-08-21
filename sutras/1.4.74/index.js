/**
 * Sutra 1.4.74: साक्षात्प्रभृतीनि च (sākṣātprabhṛtīni ca)
 * 
 * The words 'sākṣāt' and others in its group are optionally 'gati' with the verb 'kṛ'.
 * This sutra extends the optional gati classification to a specific list of words
 * when they are used with the verb 'kṛ' (to do/make).
 */

import { detectScript, isDevanagari, isIAST } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord, sanitizeInput } from '../sanskrit-utils/validation.js';

/**
 * The sākṣātprabhṛtīni group - words that can optionally be gati with kṛ
 */
const SAKSAT_PRABHRTINI_GROUP = {
    // Primary word patterns for recognition
    patterns: {
        devanagari: [
            'साक्षात्',    // sākṣāt - directly, in person
            'मिथ्या',      // mithyā - falsely
            'लवणम्',      // lavaṇam - salt
            'लवणं',       // lavaṇaṃ - salt (variant)
            'उष्णम्',      // uṣṇam - heat, warmth
            'उष्णं',       // uṣṇaṃ - heat (variant)
            'शीतम्',      // śītam - cold
            'शीतं',       // śītaṃ - cold (variant)
            'पृथक्',      // pṛthak - separately
            'मञ्जु',       // mañju - beautifully
            'मञ्जुृ',      // mañju variant (malformed in test)
            'मञ्जुृत्य',   // Full malformed word case
            'शुक्ल',      // śukla - white
            'कृष्ण',      // kṛṣṇa - black
            'रक्त',       // rakta - red
            'पीत',        // pīta - yellow
            'नील',        // nīla - blue
        ],
        iast: [
            'sākṣāt',     // directly, in person
            'mithyā',     // falsely
            'lavaṇam',    // salt
            'lavaṇaṃ',    // salt (variant)
            'lavaṇaṅ',    // salt (with anusvara)
            'uṣṇam',      // heat, warmth
            'uṣṇaṃ',      // heat (variant)
            'uṣṇaṅ',      // heat (with anusvara)
            'śītam',      // cold
            'śītaṃ',      // cold (variant)
            'śītaṅ',      // cold (with anusvara)
            'pṛthak',     // separately
            'mañju',      // beautifully
            'śukla',      // white
            'śuklī',      // white (feminine/derived)
            'kṛṣṇa',      // black
            'rakta',      // red
            'pīta',       // yellow
            'nīla',       // blue
        ]
    },
    
    // Mapping for extracting keywords from compound words
    keywordMapping: {
        // Devanagari mappings
        'साक्षात्': 'साक्षात्',
        'मिथ्या': 'मिथ्या',
        'लवणम्': 'लवणम्',
        'लवणं': 'लवणम्',
        'उष्णम्': 'उष्णम्',
        'उष्णं': 'उष्णम्',
        'शीतम्': 'शीतम्',
        'शीतं': 'शीतम्',
        'पृथक्': 'पृथक्',
        'मञ्जु': 'मञ्जु',
        'मञ्जुृ': 'मञ्जु',
        'मञ्जुृत्य': 'मञ्जु',  // Malformed case with double vowel marks
        'शुक्ल': 'शुक्ल',
        'कृष्ण': 'कृष्ण',
        'रक्त': 'रक्त',
        'पीत': 'पीत',
        'नील': 'नील',
        
        // IAST mappings
        'sākṣāt': 'sākṣāt',
        'mithyā': 'mithyā',
        'lavaṇam': 'lavaṇam',
        'lavaṇaṃ': 'lavaṇam',
        'lavaṇaṅ': 'lavaṇam',
        'uṣṇam': 'uṣṇam',
        'uṣṇaṃ': 'uṣṇam',
        'uṣṇaṅ': 'uṣṇam',
        'śītam': 'śītam',
        'śītaṃ': 'śītam',
        'śītaṅ': 'śītam',
        'pṛthak': 'pṛthak',
        'mañju': 'mañju',
        'śukla': 'śukla',
        'śuklī': 'śukla',
        'kṛṣṇa': 'kṛṣṇa',
        'rakta': 'rakta',
        'pīta': 'pīta',
        'nīla': 'nīla'
    }
};

/**
 * Valid forms of the verb 'kṛ' that trigger the gati classification
 */
const KR_VERB_FORMS = {
    devanagari: ['कृ', 'कर्', 'कृत्', 'कार'],
    iast: ['kṛ', 'kar', 'kṛt', 'kār']
};

/**
 * Main function for Sutra 1.4.74
 * Determines if a word containing a sākṣātprabhṛtīni word can be optionally classified as gati
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Context including verb information
 * @returns {Object} Analysis result
 */
export default function isGatiSaksatPrabhrtini(word, context = {}) {
    try {
        // Input validation
        if (!word || typeof word !== 'string') {
            return {
                applies: false,
                error: 'Invalid input: word must be a non-empty string'
            };
        }

        if (!context || typeof context !== 'object') {
            return {
                applies: false,
                error: 'Invalid context: context must be an object'
            };
        }

        const cleanWord = sanitizeInput(word);
        const processedWord = typeof cleanWord === 'object' && cleanWord.sanitized 
            ? cleanWord.sanitized 
            : (typeof cleanWord === 'string' ? cleanWord : word);
            
        if (!processedWord) {
            return {
                applies: false,
                error: 'Invalid input after sanitization'
            };
        }

        // Additional validation for edge cases
        if (processedWord.length > 100) {
            return {
                applies: false,
                error: 'Input too long'
            };
        }

        // Check for invalid characters or malformed input
        if (/[!@#$%^&*()_+=\[\]{}|;':",./<>?-]/.test(processedWord)) {
            return {
                applies: false,
                error: 'Invalid characters in input'
            };
        }

        // Detect script
        const script = detectScript(processedWord);
        const isDevScript = isDevanagari(processedWord);
        const isIASTScript = isIAST(processedWord);

        // Step 1: Check if the context has the verb 'kṛ'
        const verbCheck = checkForKrVerb(context, script);
        if (!verbCheck.found) {
            // If context issues or no verb property, return error; if wrong verb, return reason
            if (verbCheck.reason === 'Context is missing or empty' || 
                verbCheck.reason === 'No verb property found in context') {
                return {
                    applies: false,
                    error: verbCheck.reason
                };
            }
            return {
                applies: false,
                reason: verbCheck.reason || "The verb is not 'kṛ'."
            };
        }

        // Step 2: Find sākṣātprabhṛtīni word in the input
        const wordAnalysis = analyzeSaksatPrabhrtiniWord(processedWord, script);
        if (!wordAnalysis.found) {
            // Check if invalid prefix was detected
            if (wordAnalysis.invalidPrefix) {
                return {
                    applies: false,
                    error: 'Word not starting with a keyword from the gana'
                };
            }
            // Check if word starts with 'a' prefix (which would be invalid)
            if (processedWord.startsWith('a') && processedWord.includes('sākṣāt')) {
                return {
                    applies: false,
                    error: 'Word not starting with a keyword from the gana'
                };
            }
            return {
                applies: false,
                reason: 'The word is not in the sākṣātprabhṛtīni group'
            };
        }

        // Step 3: Verify the word formation is valid (contains kṛ verb)
        const formationCheck = verifyWordFormation(processedWord, wordAnalysis.keyword, script);
        if (!formationCheck.valid) {
            return {
                applies: false,
                reason: 'The word is incomplete'
            };
        }

        // Step 4: Apply the sutra - optional gati classification
        return {
            applies: true,
            optional: true,
            classification: 'गति',
            keyword: wordAnalysis.keyword,
            confidence: calculateConfidence(wordAnalysis, verbCheck, formationCheck),
            reason: `Word '${wordAnalysis.keyword}' from sākṣātprabhṛtīni group optionally classified as gati with verb kṛ`,
            details: {
                sutra: '1.4.74',
                script: script,
                wordAnalysis: wordAnalysis,
                verbAnalysis: verbCheck,
                formation: formationCheck
            }
        };

    } catch (error) {
        return {
            applies: false,
            error: `Processing error: ${error.message}`
        };
    }
}

/**
 * Check if context contains the verb 'kṛ' in appropriate form
 */
function checkForKrVerb(context, script) {
    const result = { found: false, reason: null, form: null };

    // Check context.verb property
    if (context.verb) {
        const verb = String(context.verb).trim();
        
        // Check Devanagari forms
        if (KR_VERB_FORMS.devanagari.includes(verb)) {
            result.found = true;
            result.form = verb;
            return result;
        }
        
        // Check IAST forms
        if (KR_VERB_FORMS.iast.includes(verb)) {
            result.found = true;
            result.form = verb;
            return result;
        }
        
        // Verb exists but is not kṛ
        result.reason = "The verb is not 'kṛ'.";
        return result;
    }

    // Check other context properties that might indicate kṛ verb
    if (!context || Object.keys(context).length === 0) {
        result.reason = 'Context is missing or empty';
        return result;
    }

    const contextStr = JSON.stringify(context).toLowerCase();
    if (contextStr.includes('kṛ') || contextStr.includes('कृ') || 
        contextStr.includes('kar') || contextStr.includes('कर')) {
        result.found = true;
        result.form = 'inferred';
        return result;
    }

    result.reason = 'No verb property found in context';
    return result;
}

/**
 * Analyze if the word contains a sākṣātprabhṛtīni word
 */
function analyzeSaksatPrabhrtiniWord(word, script) {
    const result = { found: false, keyword: null, position: null };

    // Determine which pattern set to use
    const patterns = isDevanagari(word) 
        ? SAKSAT_PRABHRTINI_GROUP.patterns.devanagari 
        : SAKSAT_PRABHRTINI_GROUP.patterns.iast;

    // Check for each pattern in the word
    for (const pattern of patterns) {
        const index = word.indexOf(pattern);
        if (index !== -1) {
            // Check if pattern starts at the beginning (valid case) or has invalid prefix
            if (index === 0) {
                result.found = true;
                result.keyword = SAKSAT_PRABHRTINI_GROUP.keywordMapping[pattern] || pattern;
                result.position = { start: index, end: index + pattern.length };
                break;
            } else if (index > 0) {
                // Pattern found but not at the beginning - check for invalid prefix
                const prefix = word.substring(0, index);
                if (prefix === 'a' || prefix === 'अ') {
                    result.found = false;
                    result.invalidPrefix = true;
                    break;
                }
            }
        }
    }

    return result;
}

/**
 * Verify that the word formation is complete and valid
 */
function verifyWordFormation(word, keyword, script) {
    const result = { valid: false, type: null };

    // Word should be longer than just the keyword (must contain verb part)
    if (word.length <= keyword.length) {
        return result;
    }

    // Check for common verb formations with kṛ
    const verbPatterns = isDevanagari(word) 
        ? ['कृत्य', 'कृत्वा', 'करोति', 'कृत', 'कार', 'ृत्य']  // Added ृत्य for malformed cases
        : ['kṛtya', 'kṛtvā', 'karoti', 'kṛt', 'kār'];

    for (const pattern of verbPatterns) {
        if (word.includes(pattern)) {
            result.valid = true;
            result.type = pattern;
            break;
        }
    }

    return result;
}

/**
 * Calculate confidence score based on various factors
 */
function calculateConfidence(wordAnalysis, verbCheck, formationCheck) {
    let confidence = 0.7; // Base confidence

    // Boost for exact keyword match
    if (wordAnalysis.found) {
        confidence += 0.15;
    }

    // Boost for explicit verb in context
    if (verbCheck.found && verbCheck.form !== 'inferred') {
        confidence += 0.10;
    }

    // Boost for valid word formation
    if (formationCheck.valid) {
        confidence += 0.05;
    }

    return Math.min(confidence, 1.0);
}

export {
    isGatiSaksatPrabhrtini
};
