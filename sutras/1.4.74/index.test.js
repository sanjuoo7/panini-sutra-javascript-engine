import isGatiSaksatPrabhrtini from './index.js';

describe('Sutra 1.4.74: sākaṣātaparabhṛtīni ca', () => {
    describe('Positive Cases: Optional "gati" for "sākṣāt" and other words with "kṛ"', () => {
        const positiveCases = [
            // IAST
            { word: 'sākṣātkṛtya', keyword: 'sākṣāt', context: { verb: 'kṛ' } },
            { word: 'sākṣātkaroti', keyword: 'sākṣāt', context: { verb: 'kṛ' } },
            { word: 'mithyākṛtya', keyword: 'mithyā', context: { verb: 'kṛ' } },
            { word: 'mithyākaroti', keyword: 'mithyā', context: { verb: 'kṛ' } },
            { word: 'lavaṇaṅkṛtya', keyword: 'lavaṇam', context: { verb: 'kṛ' } },
            { word: 'lavaṇaṅkaroti', keyword: 'lavaṇam', context: { verb: 'kṛ' } },
            { word: 'uṣṇaṅkṛtya', keyword: 'uṣṇam', context: { verb: 'kṛ' } },
            { word: 'uṣṇaṅkaroti', keyword: 'uṣṇam', context: { verb: 'kṛ' } },
            { word: 'mañjukṛtya', keyword: 'mañju', context: { verb: 'kṛ' } },
            { word: 'mañjukaroti', keyword: 'mañju', context: { verb: 'kṛ' } },
            { word: 'pṛthakkṛtya', keyword: 'pṛthak', context: { verb: 'kṛ' } },
            { word: 'pṛthakkaroti', keyword: 'pṛthak', context: { verb: 'kṛ' } },
            { word: 'śuklīkṛtya', keyword: 'śukla', context: { verb: 'kṛ' } },
            { word: 'śuklīkaroti', keyword: 'śukla', context: { verb: 'kṛ' } },

            // Devanagari
            { word: 'साक्षात्कृत्य', keyword: 'साक्षात्', context: { verb: 'कृ' } },
            { word: 'साक्षात्कारोति', keyword: 'साक्षात्', context: { verb: 'कृ' } },
            { word: 'मिथ्याकृत्य', keyword: 'मिथ्या', context: { verb: 'कृ' } },
            { word: 'मिथ्याकरोति', keyword: 'मिथ्या', context: { verb: 'कृ' } },
            { word: 'लवणंकृत्य', keyword: 'लवणम्', context: { verb: 'कृ' } },
            { word: 'लवणंकरोति', keyword: 'लवणम्', context: { verb: 'कृ' } },
            { word: 'उष्णंकृत्य', keyword: 'उष्णम्', context: { verb: 'कृ' } },
            { word: 'उष्णंकरोति', keyword: 'उष्णम्', context: { verb: 'कृ' } },
            { word: 'मञ्जुृत्य', keyword: 'मञ्जु', context: { verb: 'कृ' } },
            { word: 'मञ्जुकरोति', keyword: 'मञ्जु', context: { verb: 'कृ' } },
            { word: 'पृथक्कृत्य', keyword: 'पृथक्', context: { verb: 'कृ' } },
            { word: 'पृथक्करोति', keyword: 'पृथक्', context: { verb: 'कृ' } },
            { word: 'शुक्लीकृत्य', keyword: 'शुक्ल', context: { verb: 'कृ' } },
            { word: 'शुक्लीकरोति', keyword: 'शुक्ल', context: { verb: 'कृ' } },
        ];

        positiveCases.forEach(({ word, keyword, context }) => {
            test(`should apply optionally to "${word}"`, () => {
                const result = isGatiSaksatPrabhrtini(word, context);
                expect(result).toMatchObject({
                    applies: true,
                    optional: true,
                    classification: 'गति',
                    keyword: keyword,
                    confidence: expect.any(Number),
                    reason: expect.any(String)
                });
            });
        });
    });

    describe('Negative Cases', () => {
        const negativeCases = [
            // Wrong verb
            { word: 'sākṣātbhavati', context: { verb: 'bhū' }, reason: "The verb is not 'kṛ'." },
            { word: 'साक्षाद्भवति', context: { verb: 'भू' }, reason: "The verb is not 'kṛ'." },
            { word: 'mithyāvadati', context: { verb: 'vad' }, reason: "The verb is not 'kṛ'." },
            { word: 'मिथ्यावदति', context: { verb: 'वद्' }, reason: "The verb is not 'kṛ'." },

            // Word not in the group
            { word: 'anyathākṛtya', context: { verb: 'kṛ' }, reason: "The word is not in the sākṣātprabhṛtīni group." },
            { word: 'अन्यथाकृत्य', context: { verb: 'कृ' }, reason: "The word is not in the sākṣātprabhṛtīni group." },
            { word: 'gṛhaṃkṛtvā', context: { verb: 'kṛ' }, reason: "The word is not in the sākṣātprabhṛtīni group." },
            { word: 'गृहंकृत्वा', context: { verb: 'कृ' }, reason: "The word is not in the sākṣātprabhṛtīni group." },

            // Incomplete word
            { word: 'sākṣāt', context: { verb: 'kṛ' }, reason: "The word is incomplete." },
            { word: 'साक्षात्', context: { verb: 'कृ' }, reason: "The word is incomplete." },
            { word: 'mithyā', context: { verb: 'kṛ' }, reason: "The word is incomplete." },
            { word: 'मिथ्या', context: { verb: 'कृ' }, reason: "The word is incomplete." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiSaksatPrabhrtini(word, context);
                expect(result).toMatchObject({
                    applies: false,
                    reason: expect.any(String)
                });
            });
        });
    });

    describe('Edge Cases and Error Handling', () => {
        const edgeCases = [
            { input: null, description: 'null input' },
            { input: undefined, description: 'undefined input' },
            { input: 54321, description: 'non-string input' },
            { input: '', description: 'empty string' },
            { input: 'sākṣātkṛtya', context: undefined, description: 'missing context' },
            { input: 'sākṣātkṛtya', context: {}, description: 'empty context object' },
            { input: 'sākṣātkṛtya', context: { meaning: 'some meaning' }, description: 'context missing verb' },
            { input: 'sākṣāt-kṛtya!', context: { verb: 'kṛ' }, description: 'word with special characters' },
            { input: 'sākṣātkṛtya' + 'b'.repeat(1000), context: { verb: 'kṛ' }, description: 'long string input' },
            { input: 'asākṣātkṛtya', context: { verb: 'kṛ' }, description: 'word not starting with a keyword from the gana' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiSaksatPrabhrtini(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });
    });
});
