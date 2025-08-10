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
}

export default new TransliterationUtil();
