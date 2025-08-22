/**
 * Sutra 1.4.75: अनत्यधान उरसिमनसी (anatatyādhāna urasimanasī)
 * The words 'urasi' and 'manasi' are optionally classified as 'gati' 
 * when used with the verb 'kṛ', provided the meaning is not 'placing' (anatyādhāna).
 * 
 * @param {string} word The word to check for gati classification
 * @param {object} context Context containing verb and meaning information
 * @returns {object} Result with applies, classification, confidence, and other properties
 */
export default function isGatiUrasiManasi(word, context) {
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
        
        // Check if the word contains 'urasi' or 'manasi'
        const containsUrasi = normalizedWord.includes('urasi') || normalizedWord.includes('उरसि');
        const containsManasi = normalizedWord.includes('manasi') || normalizedWord.includes('मनसि');
        
        if (!containsUrasi && !containsManasi) {
            return { 
                applies: false, 
                reason: "The word does not contain 'urasi' or 'manasi'" 
            };
        }
        
        // Check if the word is just 'urasi' or 'manasi' alone (incomplete)
        if (normalizedWord === 'urasi' || normalizedWord === 'उरसि' ||
            normalizedWord === 'manasi' || normalizedWord === 'मनसि') {
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
        
        // Check if the meaning is 'placing' (anatyādhāna) - exclusion condition
        const placingMeanings = [
            'placing', 'putting', 'setting', 'anatyādhāna', 'adhāna',
            'स्थापन', 'धारण', 'न्यास', 'निधान'
        ];
        
        const isPlacing = placingMeanings.some(meaning => 
            context.meaning.toLowerCase().includes(meaning.toLowerCase())
        );
        
        if (isPlacing) {
            return { 
                applies: false, 
                reason: "The meaning is 'placing' (anatyādhāna)" 
            };
        }
        
        // Calculate confidence based on various factors
        let confidence = 0.7; // Base confidence
        
        // Increase confidence for clear morphological markers
        if (normalizedWord.includes('kṛt') || normalizedWord.includes('कृत्') ||
            normalizedWord.includes('kar') || normalizedWord.includes('कर्')) {
            confidence += 0.1;
        }
        
        // Increase confidence for mental activities with manasi
        if (containsManasi) {
            const mentalMeanings = [
                'thinking', 'pondering', 'considering', 'deciding', 'contemplating',
                'reflecting', 'meditating', 'thought', 'mental',
                'चिन्तन', 'मनन', 'विचार', 'निर्णय'
            ];
            
            if (mentalMeanings.some(m => context.meaning.toLowerCase().includes(m.toLowerCase()))) {
                confidence += 0.15;
            }
        }
        
        // Increase confidence for chest-related activities with urasi
        if (containsUrasi) {
            const chestMeanings = [
                'embracing', 'accepting', 'acknowledging', 'approving',
                'welcoming', 'receiving', 'chest', 'heart',
                'आलिङ्गन', 'स्वीकार', 'अङ्गीकार', 'हृदय'
            ];
            
            if (chestMeanings.some(m => context.meaning.toLowerCase().includes(m.toLowerCase()))) {
                confidence += 0.15;
            }
        }
        
        confidence = Math.min(confidence, 0.95); // Cap at 95%
        
        return {
            applies: true,
            optional: true, // This sutra provides optional classification
            classification: 'गति',
            confidence: confidence,
            reason: `Optional gati classification for '${containsUrasi ? 'urasi' : 'manasi'}' with verb 'kṛ' when not meaning 'placing'`,
            details: {
                word: word,
                containsUrasi: containsUrasi,
                containsManasi: containsManasi,
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
