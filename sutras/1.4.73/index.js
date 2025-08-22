/**
 * Sutra 1.4.73: उपाजेऽनवाजे (upāje'navāje)
 * "The words 'upāje' and 'anavāje', meaning 'supporting the weak', are optionally 'gati' with the verb 'kṛ'."
 * 
 * This sutra states that the words "upāje" and "anavāje" can optionally be classified as "gati" 
 * when they are used with the verb "kṛ" and specifically mean "supporting the weak".
 * 
 * @param {string} word - The word to analyze
 * @param {object} context - Context containing verb and meaning information
 * @param {string} context.verb - The associated verb
 * @param {string} context.meaning - The meaning of the compound/phrase
 * @returns {object} Analysis result with applies, optional, classification, confidence, reason, and error fields
 */
export default function isGatiUpajeAnavaje(word, context) {
    // Input validation and error handling
    if (word === null || word === undefined) {
        return {
            applies: false,
            error: "Input word cannot be null or undefined"
        };
    }
    
    if (typeof word !== 'string') {
        return {
            applies: false,
            error: "Input word must be a string"
        };
    }
    
    if (word.trim() === '') {
        return {
            applies: false,
            error: "Input word cannot be empty"
        };
    }
    
    if (!context) {
        return {
            applies: false,
            error: "Context is required for analysis"
        };
    }
    
    if (typeof context !== 'object') {
        return {
            applies: false,
            error: "Context must be an object"
        };
    }
    
    // Handle special characters and long strings gracefully
    // Allow hyphens as they're used in Sanskrit compounds, but reject other special chars
    if (word.length > 100 || /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\?]/.test(word)) {
        return {
            applies: false,
            error: "Word contains invalid characters or is too long"
        };
    }
    
    // Check for required context fields
    if (!context.verb) {
        return {
            applies: false,
            error: "Context must include 'verb' field"
        };
    }
    
    if (!context.meaning) {
        return {
            applies: false,
            error: "Context must include 'meaning' field"
        };
    }
    
    // Normalize the word for analysis (remove common separators)
    const normalizedWord = word.toLowerCase().replace(/[-\s]/g, '');
    
    // Define the target words in both scripts
    const targetWords = {
        iast: ['upāje', 'anavāje'],
        devanagari: ['उपाजे', 'अन्वाजे']
    };
    
    // Define acceptable verb forms
    const acceptableVerbs = {
        iast: ['kṛ', 'kar', 'kart'],
        devanagari: ['कृ', 'कर्', 'कृत्']
    };
    
    // Check if word contains upāje or anavāje
    let containsTargetWord = false;
    let foundWord = '';
    
    // Check IAST forms
    for (const target of targetWords.iast) {
        if (normalizedWord.includes(target.toLowerCase())) {
            containsTargetWord = true;
            foundWord = target;
            break;
        }
    }
    
    // Check Devanagari forms if not found in IAST
    if (!containsTargetWord) {
        for (const target of targetWords.devanagari) {
            if (normalizedWord.includes(target)) {
                containsTargetWord = true;
                foundWord = target;
                break;
            }
        }
    }
    
    if (!containsTargetWord) {
        return {
            applies: false,
            reason: "The word does not contain 'upāje' or 'anavāje'"
        };
    }
    
    // Check if it's just the target word alone (incomplete)
    if (normalizedWord === 'upāje' || normalizedWord === 'anavāje' || 
        normalizedWord === 'उपाजे' || normalizedWord === 'अन्वाजे') {
        return {
            applies: false,
            reason: "The word is incomplete - requires verb combination"
        };
    }
    
    // Check if the verb is 'kṛ' (in any acceptable form)
    // We need to check both the context verb and any verb present in the word itself
    const normalizedVerb = context.verb.toLowerCase();
    let isCorrectVerb = false;
    
    // Check IAST verb forms in context
    for (const verb of acceptableVerbs.iast) {
        if (normalizedVerb.includes(verb.toLowerCase())) {
            isCorrectVerb = true;
            break;
        }
    }
    
    // Check Devanagari verb forms in context if not found in IAST
    if (!isCorrectVerb) {
        for (const verb of acceptableVerbs.devanagari) {
            if (normalizedVerb.includes(verb)) {
                isCorrectVerb = true;
                break;
            }
        }
    }
    
    // Also check if the word itself contains non-kṛ verbs
    const nonKrVerbs = {
        iast: ['gacchati', 'gam', 'bhavati', 'bhū', 'bhav'],
        devanagari: ['गच्छति', 'गम्', 'भवति', 'भू', 'भव']
    };
    
    let containsNonKrVerb = false;
    // Check for non-kṛ verbs in the word
    for (const verb of nonKrVerbs.iast) {
        if (normalizedWord.includes(verb.toLowerCase())) {
            containsNonKrVerb = true;
            break;
        }
    }
    
    if (!containsNonKrVerb) {
        for (const verb of nonKrVerbs.devanagari) {
            if (normalizedWord.includes(verb)) {
                containsNonKrVerb = true;
                break;
            }
        }
    }
    
    if (!isCorrectVerb || containsNonKrVerb) {
        return {
            applies: false,
            reason: "The verb is not 'kṛ' or its acceptable forms"
        };
    }
    
    // Check if the meaning is 'supporting the weak'
    const normalizedMeaning = context.meaning.toLowerCase();
    const acceptableMeanings = [
        'supporting the weak',
        'support the weak',
        'helping the weak',
        'aid the weak',
        'assist the weak',
        'दुर्बल का समर्थन', // Hindi equivalent
        'दुर्बलों की सहायता'  // Hindi equivalent
    ];
    
    let hasCorrectMeaning = false;
    for (const meaning of acceptableMeanings) {
        if (normalizedMeaning.includes(meaning.toLowerCase())) {
            hasCorrectMeaning = true;
            break;
        }
    }
    
    if (!hasCorrectMeaning) {
        return {
            applies: false,
            reason: "The meaning is not 'supporting the weak' or equivalent"
        };
    }
    
    // All conditions met - sutra applies optionally
    const confidence = calculateConfidence(word, context, foundWord);
    
    return {
        applies: true,
        optional: true,
        classification: 'गति',
        confidence: confidence,
        reason: `The word '${foundWord}' with verb 'kṛ' meaning 'supporting the weak' optionally receives 'gati' classification per Sutra 1.4.73`
    };
}

/**
 * Calculate confidence score based on various factors
 * @param {string} word - The input word
 * @param {object} context - The context object
 * @param {string} foundWord - The target word found in input
 * @returns {number} Confidence score between 0.7 and 0.95
 */
function calculateConfidence(word, context, foundWord) {
    let confidence = 0.7; // Base confidence for optional rules
    
    // Higher confidence for exact word matches
    if (word.toLowerCase().startsWith(foundWord.toLowerCase())) {
        confidence += 0.1;
    }
    
    // Higher confidence for explicit verb forms
    if (context.verb === 'kṛ' || context.verb === 'कृ') {
        confidence += 0.1;
    }
    
    // Higher confidence for exact meaning match
    if (context.meaning.toLowerCase() === 'supporting the weak') {
        confidence += 0.05;
    }
    
    return Math.min(confidence, 0.95); // Cap at 0.95 for optional rules
}
