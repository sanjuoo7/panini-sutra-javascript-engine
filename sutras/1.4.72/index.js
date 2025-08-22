/**
 * Sutra 1.4.72: विभाषा कृञि (vibhāṣā kṛñi)
 * The word 'tiras', in the sense of 'disappearance', is optionally called 'gati'
 * when the verb 'kṛ' follows.
 * 
 * @param {string} word The word to check for gati classification
 * @param {object} context Context containing verb and meaning information
 * @returns {object} Result with applies, classification, confidence, and other properties
 */
export default function isGatiTirasOptionalWithKr(word, context) {
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
        
        // Normalize the word for analysis
        const normalizedWord = word.toLowerCase().trim();
        
        // Check if the word contains 'tiras'
        const containsTiras = normalizedWord.includes('tiras') || normalizedWord.includes('तिरस्') || normalizedWord.includes('तिरश्');
        
        if (!containsTiras) {
            return { 
                applies: false, 
                reason: "The word does not contain 'tiras'" 
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
        
        // Check if the meaning is 'disappearance'
        const disappearanceMeanings = [
            'disappearance', 'vanishing', 'hiding', 'concealment', 'removal',
            'अन्तर्धान', 'लोप', 'छुप', 'गुप्त', 'अदृश्य'
        ];
        
        const isDisappearance = disappearanceMeanings.some(meaning => 
            context.meaning.toLowerCase().includes(meaning.toLowerCase())
        );
        
        if (!isDisappearance) {
            return { 
                applies: false, 
                reason: "The meaning is not 'disappearance'" 
            };
        }
        
        // Calculate confidence based on various factors
        let confidence = 0.75; // Base confidence for optional gati
        
        // Increase confidence for clear morphological markers
        if (normalizedWord.includes('kṛt') || normalizedWord.includes('कृत्') ||
            normalizedWord.includes('kar') || normalizedWord.includes('कर्')) {
            confidence += 0.1;
        }
        
        // Increase confidence for clear tiras + kṛ combinations
        if ((normalizedWord.includes('tiraskṛ') || normalizedWord.includes('तिरस्कृ')) && isDisappearance) {
            confidence += 0.15;
        }
        
        confidence = Math.min(confidence, 0.95); // Cap at 95%
        
        return {
            applies: true,
            optional: true, // This sutra provides optional classification
            classification: 'गति',
            confidence: confidence,
            reason: `Optional gati classification for 'tiras' with verb 'kṛ' in the sense of 'disappearance'`,
            details: {
                word: word,
                containsTiras: containsTiras,
                meaning: context.meaning,
                verb: context.verb,
                isDisappearance: isDisappearance
            }
        };
        
    } catch (error) {
        return { 
            applies: false, 
            error: `Error in gati analysis: ${error.message}` 
        };
    }
}
