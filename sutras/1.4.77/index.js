/**
 * Sutra 1.4.77: नित्यं हस्ते पाणावुपयमने (nityaṃ haste pāṇāvupayamane)
 * The words 'haste' and 'pāṇau' are mandatorily classified as 'gati' 
 * when used with the verb 'kṛ' in the sense of marriage (upayamana).
 * 
 * @param {string} word The word to check for gati classification
 * @param {object} context Context containing verb and meaning information
 * @returns {object} Result with applies, classification, confidence, and other properties
 */
export default function isGatiHastePanau(word, context) {
    try {
        // Input validation
        if (!word || typeof word !== 'string') {
            return { applies: false, error: 'Invalid word: must be a non-empty string' };
        }
        
        if (!context || typeof context !== 'object') {
            return { applies: false, error: 'Invalid context: must be an object' };
        }
        
        if (!context.verb || typeof context.verb !== 'string') {
            return { applies: false, error: 'Invalid context: verb must be a string' };
        }
        
        if (!context.meaning || typeof context.meaning !== 'string') {
            return { applies: false, error: 'Invalid context: meaning must be a string' };
        }
        
        // Length validation - prevent excessive input
        if (word.length > 100) {
            return { 
                applies: false, 
                error: 'Input too long: word exceeds maximum length' 
            };
        }
        
        // Normalize the word for analysis
        const normalizedWord = word.toLowerCase().trim();
        
        // Check if the word contains 'haste' or 'pāṇau'
        const containsHaste = normalizedWord.includes('haste') || normalizedWord.includes('हस्ते');
        const containsPanau = normalizedWord.includes('pāṇau') || normalizedWord.includes('pāṇu') || normalizedWord.includes('पाणौ');
        
        if (!containsHaste && !containsPanau) {
            return { 
                applies: false, 
                reason: "The word does not contain 'haste' or 'pāṇau'" 
            };
        }
        
        // Check if the word is just the base form alone (incomplete)
        if (normalizedWord === 'haste' || normalizedWord === 'हस्ते' ||
            normalizedWord === 'pāṇau' || normalizedWord === 'पाणौ') {
            return { 
                applies: false, 
                reason: "The word is incomplete" 
            };
        }
        
        // Check if the verb is 'kṛ' (in various forms)
        const krVerbs = ['kṛ', 'kar', 'kuru', 'karoti', 'कृ', 'कर्', 'करोति', 'कुरु'];
        const isKrVerb = krVerbs.some(v => 
            context.verb.toLowerCase().includes(v.toLowerCase()) ||
            normalizedWord.includes(v.toLowerCase())
        );
        
        if (!isKrVerb) {
            return { 
                applies: false, 
                reason: "The verb is not 'kṛ'" 
            };
        }
        
        // Check if the meaning is 'marriage' (upayamana)
        const marriageMeanings = [
            'marriage', 'wedding', 'matrimony', 'nuptials', 'upayamana', 'vivāha',
            'विवाह', 'उपयमन', 'पाणिग्रहण', 'कन्यादान', 'दाम्पत्य'
        ];
        
        const isMarriage = marriageMeanings.some(meaning => 
            context.meaning.toLowerCase().includes(meaning.toLowerCase())
        );
        
        if (!isMarriage) {
            return { 
                applies: false, 
                reason: "The meaning is not 'marriage'" 
            };
        }
        
        // Calculate confidence based on various factors
        let confidence = 0.9; // High confidence for mandatory gati
        
        // Increase confidence for clear morphological markers
        if (normalizedWord.includes('kṛt') || normalizedWord.includes('कृत्') ||
            normalizedWord.includes('kar') || normalizedWord.includes('कर्')) {
            confidence += 0.05;
        }
        
        // Increase confidence for marriage-related context words
        const marriageContextWords = ['kanyā', 'vadhū', 'dāra', 'vivāha', 'कन्या', 'वधू', 'दार', 'विवाह'];
        if (marriageContextWords.some(w => normalizedWord.includes(w.toLowerCase()))) {
            confidence += 0.05;
        }
        
        confidence = Math.min(confidence, 0.98); // Cap at 98% for mandatory rules
        
        let whichWord = containsHaste ? 'haste' : 'pāṇau';
        
        return {
            applies: true,
            optional: false, // This sutra provides mandatory classification (nityam)
            classification: 'गति',
            confidence: confidence,
            reason: `Mandatory gati classification for '${whichWord}' with verb 'kṛ' in the sense of marriage`,
            details: {
                word: word,
                containsHaste: containsHaste,
                containsPanau: containsPanau,
                meaning: context.meaning,
                verb: context.verb,
                isMarriage: isMarriage
            }
        };
        
    } catch (error) {
        return { 
            applies: false, 
            error: `Error in gati analysis: ${error.message}` 
        };
    }
}
