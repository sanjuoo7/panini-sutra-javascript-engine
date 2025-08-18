import isGatiUrasiManasi from './index.js';

describe('Sutra 1.4.75: anatayādhāna urasimanasī', () => {
    describe('Positive Cases: Optional "gati" when not meaning "placing"', () => {
        const positiveCases = [
            // IAST - urasi
            { word: 'urasikṛtya', context: { verb: 'kṛ', meaning: 'accepting' } },
            { word: 'urasikṛtvā', context: { verb: 'kṛ', meaning: 'embracing' } },
            { word: 'urasikaroti', context: { verb: 'kṛ', meaning: 'acknowledging' } },
            { word: 'urasikṛtam', context: { verb: 'kṛ', meaning: 'approved' } },

            // IAST - manasi
            { word: 'manasikṛtya', context: { verb: 'kṛ', meaning: 'pondering' } },
            { word: 'manasikṛtvā', context: { verb: 'kṛ', meaning: 'considering' } },
            { word: 'manasikaroti', context: { verb: 'kṛ', meaning: 'thinking' } },
            { word: 'manasikṛtam', context: { verb: 'kṛ', meaning: 'decided' } },
            { word: 'manasikariṣyati', context: { verb: 'kṛ', meaning: 'will think' } },
            { word: 'manasicakāra', context: { verb: 'kṛ', meaning: 'thought' } },
            { word: 'manasikaraṇam', context: { verb: 'kṛ', meaning: 'act of thinking' } },
            { word: 'manasikartum', context: { verb: 'kṛ', meaning: 'to think' } },

            // Devanagari - उरसि
            { word: 'उरसिकृत्य', context: { verb: 'कृ', meaning: 'accepting' } },
            { word: 'उरसिकृत्वा', context: { verb: 'कृ', meaning: 'embracing' } },
            { word: 'उरसिकरोति', context: { verb: 'कृ', meaning: 'acknowledging' } },
            { word: 'उरसिकृतम्', context: { verb: 'कृ', meaning: 'approved' } },

            // Devanagari - मनसि
            { word: 'मनसिकृत्य', context: { verb: 'कृ', meaning: 'pondering' } },
            { word: 'मनसिकृत्वा', context: { verb: 'कृ', meaning: 'considering' } },
            { word: 'मनसिकरोति', context: { verb: 'कृ', meaning: 'thinking' } },
            { word: 'मनसिकृतम्', context: { verb: 'कृ', meaning: 'decided' } },
            { word: 'मनसिकरिष्यति', context: { verb: 'कृ', meaning: 'will think' } },
            { word: 'मनसिचकार', context: { verb: 'कृ', meaning: 'thought' } },
            { word: 'मनसिकरणम्', context: { verb: 'कृ', meaning: 'act of thinking' } },
            { word: 'मनसिकर्तुम्', context: { verb: 'कृ', meaning: 'to think' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply optionally to "${word}" with meaning "${context.meaning}"`, () => {
                const result = isGatiUrasiManasi(word, context);
                expect(result).toMatchObject({
                    applies: true,
                    optional: true,
                    classification: 'गति',
                    confidence: expect.any(Number),
                    reason: expect.any(String)
                });
            });
        });
    });

    describe('Negative Cases', () => {
        const negativeCases = [
            // anatyādhāna condition: meaning is 'placing'
            { word: 'urasikṛtya pāṇim', context: { verb: 'kṛ', meaning: 'placing' }, reason: "The meaning is 'placing' (anatyādhāna)." },
            { word: 'उरसिकृत्य पाणिम्', context: { verb: 'कृ', meaning: 'placing' }, reason: "The meaning is 'placing' (anatyādhāna)." },
            { word: 'manasikṛtya viṣayam', context: { verb: 'kṛ', meaning: 'placing' }, reason: "The meaning is 'placing' (anatyādhāna)." },
            { word: 'मनसिकृत्य विषयम्', context: { verb: 'कृ', meaning: 'placing' }, reason: "The meaning is 'placing' (anatyādhāna)." },

            // Wrong verb
            { word: 'urasigacchati', context: { verb: 'gam', meaning: 'accepting' }, reason: "The verb is not 'kṛ'." },
            { word: 'उरसिगच्छति', context: { verb: 'गम्', meaning: 'accepting' }, reason: "The verb is not 'kṛ'." },
            { word: 'manasibhavati', context: { verb: 'bhū', meaning: 'pondering' }, reason: "The verb is not 'kṛ'." },
            { word: 'मनसिभवति', context: { verb: 'भू', meaning: 'pondering' }, reason: "The verb is not 'kṛ'." },

            // Word is not urasi or manasi
            { word: 'hastekṛtya', context: { verb: 'kṛ', meaning: 'taking in hand' }, reason: "The word is not 'urasi' or 'manasi'." },
            { word: 'हस्तेकृत्य', context: { verb: 'कृ', meaning: 'taking in hand' }, reason: "The word is not 'urasi' or 'manasi'." },
            { word: 'śirasi kṛtvā', context: { verb: 'kṛ', meaning: 'placing on head' }, reason: "The word is not 'urasi' or 'manasi'." },
            { word: 'शिरसि कृत्वा', context: { verb: 'कृ', meaning: 'placing on head' }, reason: "The word is not 'urasi' or 'manasi'." },

            // Incomplete word
            { word: 'urasi', context: { verb: 'kṛ', meaning: 'accepting' }, reason: "The word is incomplete." },
            { word: 'उरसि', context: { verb: 'कृ', meaning: 'accepting' }, reason: "The word is incomplete." },
            { word: 'manasi', context: { verb: 'kṛ', meaning: 'pondering' }, reason: "The word is incomplete." },
            { word: 'मनसि', context: { verb: 'कृ', meaning: 'pondering' }, reason: "The word is incomplete." },
            { word: 'kṛtya', context: { verb: 'kṛ', meaning: 'accepting' }, reason: "The word is not 'urasi' or 'manasi'." },
            { word: 'कृत्य', context: { verb: 'कृ', meaning: 'pondering' }, reason: "The word is not 'urasi' or 'manasi'." },
            { word: 'anyat kṛtvā', context: { verb: 'kṛ', meaning: 'doing something else' }, reason: "The word is not 'urasi' or 'manasi'." },
            { word: 'अन्यत् कृत्वा', context: { verb: 'कृ', meaning: 'doing something else' }, reason: "The word is not 'urasi' or 'manasi'." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiUrasiManasi(word, context);
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
            { input: 123, description: 'non-string input' },
            { input: '', description: 'empty string' },
            { input: 'urasikṛtya', context: undefined, description: 'missing context' },
            { input: 'urasikṛtya', context: {}, description: 'empty context' },
            { input: 'urasikṛtya', context: { meaning: 'accepting' }, description: 'context missing verb' },
            { input: 'urasikṛtya', context: { verb: 'kṛ' }, description: 'context missing meaning' },
            { input: 'urasikṛtya', context: { verb: 'kṛ', meaning: null }, description: 'context with null meaning' },
            { input: 'urasikṛtya', context: { verb: 'kṛ', meaning: 123 }, description: 'context with non-string meaning' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiUrasiManasi(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });
    });
});
