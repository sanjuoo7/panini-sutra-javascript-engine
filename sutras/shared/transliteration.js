class TransliterationUtil {
    constructor() {
        this.devanagariToIastMap = {
            'आ': 'ā', 'ा': 'ā',
            'ऐ': 'ai', 'ै': 'ai',
            'औ': 'au', 'ौ': 'au',
            'अ': 'a',
            'इ': 'i', 'ि': 'i',
            'ई': 'ī', 'ी': 'ī',
            'उ': 'u', 'ु': 'u',
            'ऊ': 'ū', 'ू': 'ū',
            'ऋ': 'ṛ', 'ृ': 'ṛ',
            'ॠ': 'ṝ', 'ॄ': 'ṝ',
            'ऌ': 'ḷ', 'ॢ': 'ḷ',
            'ॡ': 'ḹ', 'ॣ': 'ḹ',
            'ए': 'e', 'े': 'e',
            'ओ': 'o', 'ो': 'o'
        };

        // Extended mapping for consonants and other characters
        this.fullDevanagariToIastMap = {
            ...this.devanagariToIastMap,
            // Consonants
            'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
            'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
            'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
            'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
            'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
            'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
            'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h',
            '्': '', 'ं': 'ṃ', 'ः': 'ḥ'
        };

        this.devanagariVowelRegex = /[ऐऔआअइईउऊऋॠऌॡएओाैौिीुूृॄेो]/;
    }

    getFirstDevanagariVowel(word) {
        const match = word.match(this.devanagariVowelRegex);
        if (match) {
            return match[0];
        }

        const consonantRegex = /^[क-ह]/;
        if (consonantRegex.test(word)) {
            const nextChar = word.charAt(1);
            if (!nextChar || !this.devanagariVowelRegex.test(nextChar) && nextChar !== '्') {
                return 'अ';
            }
        }
        return undefined;
    }

    transliterate(devanagariVowel) {
        return this.devanagariToIastMap[devanagariVowel];
    }

    /**
     * Converts Devanagari text to IAST for normalized processing
     * @param {string} text - Text in Devanagari or IAST
     * @returns {string} - Normalized text in IAST
     */
    normalizeToIAST(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }

        // If already IAST, return as is
        if (!/[\u0900-\u097F]/.test(text)) {
            return text;
        }

        // Convert Devanagari to IAST
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const mapped = this.fullDevanagariToIastMap[char];
            result += mapped !== undefined ? mapped : char;
        }

        return result;
    }
}

/**
 * Normalizes script by converting Devanagari to IAST
 * @param {string} text - Text to normalize
 * @returns {string} - Normalized text
 */
export function normalizeScript(text) {
    return transliterationUtilInstance.normalizeToIAST(text);
}

const transliterationUtilInstance = new TransliterationUtil();
export default transliterationUtilInstance;
