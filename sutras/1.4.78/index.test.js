import isGatiPradhvam from './index.js';

describe('Sutra 1.4.78: prādhvaṃ bandhane', () => {
    describe('Positive Cases: Mandatory "gati" in the sense of binding', () => {
        const positiveCases = [
            // IAST
            { word: 'prādhvaṅkṛtya', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'prādhvaṅkṛtvā', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'prādhvaṅkaroti', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'prādhvaṅkṛtam', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'prādhvaṅkariṣyati', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'prādhvañcakāra', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'prādhvaṅkartum', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'prādhvaṅkaraṇam', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'prādhvamkṛtya', context: { verb: 'kṛ', meaning: 'binding' } }, // alternate form
            { word: 'prādhvamkaroti', context: { verb: 'kṛ', meaning: 'binding' } },

            // Devanagari
            { word: 'प्राध्वंकृत्य', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वंकृत्वा', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वंकरोति', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वंकृतम्', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वंकरिष्यति', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वञ्चकार', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वंकर्तुम्', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वंकरणम्', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वम्कृत्य', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'प्राध्वम्करोति', context: { verb: 'कृ', meaning: 'binding' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply mandatorily to "${word}"`, () => {
                const result = isGatiPradhvam(word, context);
                expect(result).toMatchObject({
                    applies: true,
                    optional: false,
                    classification: 'गति',
                    confidence: expect.any(Number),
                    reason: expect.any(String)
                });
            });
        });
    });

    describe('Negative Cases', () => {
        const negativeCases = [
            // Wrong meaning
            { word: 'prādhvaṅkṛtya', context: { verb: 'kṛ', meaning: 'sending' }, reason: "The meaning is not 'binding'." },
            { word: 'प्राध्वंकृत्य', context: { verb: 'कृ', meaning: 'sending' }, reason: "The meaning is not 'binding'." },
            { word: 'prādhvaṅkaroti', context: { verb: 'kṛ', meaning: 'decorating' }, reason: "The meaning is not 'binding'." },
            { word: 'प्राध्वंकरोति', context: { verb: 'कृ', meaning: 'decorating' }, reason: "The meaning is not 'binding'." },

            // Wrong verb
            { word: 'prādhvaṅgacchati', context: { verb: 'gam', meaning: 'binding' }, reason: "The verb is not 'kṛ'." },
            { word: 'प्राध्वंगच्छति', context: { verb: 'गम्', meaning: 'binding' }, reason: "The verb is not 'kṛ'." },
            { word: 'prādhvaṃbhavati', context: { verb: 'bhū', meaning: 'binding' }, reason: "The verb is not 'kṛ'." },
            { word: 'प्राध्वंभवति', context: { verb: 'भू', meaning: 'binding' }, reason: "The verb is not 'kṛ'." },

            // Word is not prādhvam
            { word: 'bandhanaṃ kṛtvā', context: { verb: 'kṛ', meaning: 'binding' }, reason: "The word is not 'prādhvam'." },
            { word: 'बन्धनं कृत्वा', context: { verb: 'कृ', meaning: 'binding' }, reason: "The word is not 'prādhvam'." },
            { word: 'anyat kṛtvā', context: { verb: 'kṛ', meaning: 'binding' }, reason: "The word is not 'prādhvam'." },
            { word: 'अन्यत् कृत्वा', context: { verb: 'कृ', meaning: 'binding' }, reason: "The word is not 'prādhvam'." },

            // Incomplete words
            { word: 'prādhvam', context: { verb: 'kṛ', meaning: 'binding' }, reason: "The word is incomplete." },
            { word: 'प्राध्वम्', context: { verb: 'कृ', meaning: 'binding' }, reason: "The word is incomplete." },
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'binding' }, reason: "The word is not 'prādhvam'." },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'binding' }, reason: "The word is not 'prādhvam'." },

            // Similar sounding words
            { word: 'prādhānyam kṛtvā', context: { verb: 'kṛ', meaning: 'making important' }, reason: "The word is not 'prādhvam'." },
            { word: 'प्राधान्यं कृत्वा', context: { verb: 'कृ', meaning: 'making important' }, reason: "The word is not 'prādhvam'." },
            { word: 'dhvaṃsanam kṛtvā', context: { verb: 'kṛ', meaning: 'destroying' }, reason: "The word is not 'prādhvam'." },
            { word: 'ध्वंसनं कृत्वा', context: { verb: 'कृ', meaning: 'destroying' }, reason: "The word is not 'prādhvam'." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiPradhvam(word, context);
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
            { input: 12345, description: 'non-string input' },
            { input: '', description: 'empty string' },
            { input: 'prādhvaṅkṛtya', context: undefined, description: 'missing context' },
            { input: 'prādhvaṅkṛtya', context: {}, description: 'empty context' },
            { input: 'prādhvaṅkṛtya', context: { meaning: 'binding' }, description: 'context missing verb' },
            { input: 'prādhvaṅkṛtya', context: { verb: 'kṛ' }, description: 'context missing meaning' },
            { input: 'prādhvaṅkṛtya', context: { verb: null, meaning: 'binding' }, description: 'context with null verb' },
            { input: 'prādhvam-kṛtya!', context: { verb: 'kṛ', meaning: 'binding' }, description: 'word with special characters' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiPradhvam(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });
    });
});
