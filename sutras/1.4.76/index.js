/**
 * Sutra 1.4.76: मध्येपदेनिवचने च (madhyepadenivacane ca)
 * The words 'madhye', 'pade', and 'nivacane' are optionally classified as 'gati' 
 * when used with the verb 'kṛ', provided the meaning is not 'placing'.
 * 
 * @param {string} word The word to check for gati classification
 * @param {object} context Context containing verb and meaning information
 * @returns {object} Result with applies, classification, confidence, and other properties
 */
export default function isGatiMadhyePadeNivacane(word, context = {}) {
    try {
        // Input validation
        if (!word || typeof word !== 'string') {
            return { 
                applies: false, 
                error: 'Invalid word: must be a non-empty string' 
            };
        }
        
        if (!context || typeof context !== 'object') {
            return { 
                applies: false, 
                error: 'Invalid context: must be an object' 
            };
        }
        
        // Length validation - prevent excessive input
        if (word.length > 100) {
            return { 
                applies: false, 
                error: 'Input too long: word exceeds maximum length' 
            };
        }
        
        if (!context.verb || typeof context.verb !== 'string') {
            return { applies: false, error: 'Invalid context: verb must be a string' };
        }
        
        if (!context.meaning || typeof context.meaning !== 'string') {
            return { applies: false, error: 'Invalid context: meaning must be a string' };
        }
        
        // Normalize the word for analysis
        const normalizedWord = word.toLowerCase().trim();
        
        // Check if the word contains 'madhye', 'pade', or 'nivacane'
        const containsMadhye = normalizedWord.includes('madhye') || normalizedWord.includes('मध्ये');
        const containsPade = normalizedWord.includes('pade') || normalizedWord.includes('पदे');
        const containsNivacane = normalizedWord.includes('nivacane') || normalizedWord.includes('निवचने');
        
        if (!containsMadhye && !containsPade && !containsNivacane) {
            return { 
                applies: false, 
                reason: "The word does not contain 'madhye', 'pade', or 'nivacane'" 
            };
        }
        
        // Check if the word is just the base form alone (incomplete)
        if (normalizedWord === 'madhye' || normalizedWord === 'मध्ये' ||
            normalizedWord === 'pade' || normalizedWord === 'पदे' ||
            normalizedWord === 'nivacane' || normalizedWord === 'निवचने') {
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
        
        // Check if the meaning is 'placing' (exclusion condition)
        const placingMeanings = [
            'placing', 'putting', 'setting', 'adhāna', 'धारण', 'स्थापन', 'न्यास', 'निधान'
        ];
        
        const isPlacing = placingMeanings.some(meaning => 
            context.meaning.toLowerCase().includes(meaning.toLowerCase())
        );
        
        if (isPlacing) {
            return { 
                applies: false, 
                reason: "The meaning is 'placing'" 
            };
        }
        
        // Calculate confidence based on various factors
        let confidence = 0.7; // Base confidence
        
        // Increase confidence for clear morphological markers
        if (normalizedWord.includes('kṛt') || normalizedWord.includes('कृत्') ||
            normalizedWord.includes('kar') || normalizedWord.includes('कर्')) {
            confidence += 0.1;
        }
        
        // Increase confidence for specific meaning patterns
        if (containsMadhye) {
            const madhyeMeanings = [
                'interrupting', 'halting', 'bisecting', 'cutting', 'dividing',
                'बाधा', 'विभाजन', 'छेदन', 'मध्य'
            ];
            
            if (madhyeMeanings.some(m => context.meaning.toLowerCase().includes(m.toLowerCase()))) {
                confidence += 0.15;
            }
        }
        
        if (containsPade) {
            const padeMeanings = [
                'stumbling', 'trapping', 'tripping', 'catching', 'hindering',
                'स्खलन', 'बन्धन', 'अवरोध', 'पाद'
            ];
            
            if (padeMeanings.some(m => context.meaning.toLowerCase().includes(m.toLowerCase()))) {
                confidence += 0.15;
            }
        }
        
        if (containsNivacane) {
            const nivacaneMeanings = [
                'silencing', 'muting', 'speechless', 'stopping speech', 'quieting',
                'मौनता', 'वाक्‌निरोध', 'चुप', 'निवचन'
            ];
            
            if (nivacaneMeanings.some(m => context.meaning.toLowerCase().includes(m.toLowerCase()))) {
                confidence += 0.15;
            }
        }
        
        confidence = Math.min(confidence, 0.95); // Cap at 95%
        
        let whichWord = containsMadhye ? 'madhye' : containsPade ? 'pade' : 'nivacane';
        
        return {
            applies: true,
            optional: true, // This sutra provides optional classification
            classification: 'गति',
            confidence: confidence,
            reason: `Optional gati classification for '${whichWord}' with verb 'kṛ' when not meaning 'placing'`,
            details: {
                word: word,
                containsMadhye: containsMadhye,
                containsPade: containsPade,
                containsNivacane: containsNivacane,
                meaning: context.meaning,
                verb: context.verb,
                excludesPlacing: !isPlacing
            }
        };
        
    } catch (error) {
        return { 
            applies: false, 
            error: `Error in gati analysis: ${error.message}` 
        };
    }
}
