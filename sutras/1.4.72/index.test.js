import isGatiTirasOptionalWithKr from './index.js';

describe('Sutra 1.4.72: vibhāṣā kṛñi', () => {
    describe('Positive Cases: Optional "gati" for "tiras" with "kṛ"', () => {
        const positiveCases = [
            // IAST
            { word: 'tiraskṛtya', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tiraskṛtvā', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tiraskṛtaḥ', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tiraskriyā', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tiraskāraḥ', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tiraskaroti', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tiraskariṣyati', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tirascakāra', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tiraskartum', context: { verb: 'kṛ', meaning: 'disappearance' } },
            { word: 'tiraskaraṇam', context: { verb: 'kṛ', meaning: 'disappearance' } },

            // Devanagari
            { word: 'तिरस्कृत्य', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरस्कृत्वा', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरस्कृतः', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरस्क्रिया', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरस्कारः', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरस्करोति', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरस्करिष्यति', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरश्चकार', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरस्कर्तुम्', context: { verb: 'कृ', meaning: 'disappearance' } },
            { word: 'तिरस्करणम्', context: { verb: 'कृ', meaning: 'disappearance' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply optionally to "${word}"`, () => {
                const result = isGatiTirasOptionalWithKr(word, context);
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
            // Verb is not 'kṛ'
            { word: 'tirobhūya', context: { verb: 'bhū', meaning: 'disappearance' }, reason: "The verb is not 'kṛ'." },
            { word: 'तिरोभूय', context: { verb: 'भू', meaning: 'disappearance' }, reason: "The verb is not 'kṛ'." },
            { word: 'tirodhatte', context: { verb: 'dhā', meaning: 'disappearance' }, reason: "The verb is not 'kṛ'." },
            { word: 'तिरोधत्ते', context: { verb: 'धा', meaning: 'disappearance' }, reason: "The verb is not 'kṛ'." },

            // Meaning is not 'disappearance'
            { word: 'tiraskṛtya', context: { verb: 'kṛ', meaning: 'reproach' }, reason: "The meaning is not 'disappearance'." },
            { word: 'तिरस्कृत्य', context: { verb: 'कृ', meaning: 'reproach' }, reason: "The meaning is not 'disappearance'." },
            { word: 'tiraskāraḥ', context: { verb: 'kṛ', meaning: 'insult' }, reason: "The meaning is not 'disappearance'." },
            { word: 'तिरस्कारः', context: { verb: 'कृ', meaning: 'insult' }, reason: "The meaning is not 'disappearance'." },

            // Word does not contain 'tiras'
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'doing' }, reason: "The word 'tiras' is not present." },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'doing' }, reason: "The word 'tiras' is not present." },
            { word: 'kurute', context: { verb: 'kṛ', meaning: 'does' }, reason: "The word 'tiras' is not present." },
            { word: 'कुरुते', context: { verb: 'कृ', meaning: 'does' }, reason: "The word 'tiras' is not present." },

            // Other random words
            { word: 'gacchati', context: { verb: 'gam', meaning: 'going' }, reason: "This sutra does not apply." },
            { word: 'गच्छति', context: { verb: 'गम्', meaning: 'going' }, reason: "This sutra does not apply." },
            { word: 'upakaroti', context: { verb: 'kṛ', meaning: 'helps' }, reason: "This sutra does not apply." },
            { word: 'उपकरोति', context: { verb: 'कृ', meaning: 'helps' }, reason: "This sutra does not apply." },
            { word: 'alaṅkṛtvā', context: { verb: 'kṛ', meaning: 'decorating' }, reason: "This sutra does not apply." },
            { word: 'अलं कृत्वा', context: { verb: 'कृ', meaning: 'decorating' }, reason: "This sutra does not apply." },

            // Context is for 1.4.71, not this sutra
            { word: 'tirobhavati', context: { verb: 'bhū', meaning: 'disappearance' }, reason: "The verb is not 'kṛ'." },
            { word: 'तिरोभवति', context: { verb: 'भू', meaning: 'disappearance' }, reason: "The verb is not 'kṛ'." },
            { word: 'tirohita', context: { verb: 'dhā', meaning: 'disappearance' }, reason: "The verb is not 'kṛ'." },
            { word: 'तिरोहित', context: { verb: 'धा', meaning: 'disappearance' }, reason: "The verb is not 'kṛ'." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiTirasOptionalWithKr(word, context);
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
            { input: 'tiraskṛtya', context: undefined, description: 'missing context' },
            { input: 'tiraskṛtya', context: {}, description: 'empty context object' },
            { input: 'tiraskṛtya', context: { meaning: 'disappearance' }, description: 'context missing verb' },
            { input: 'tiraskṛtya', context: { verb: 'kṛ' }, description: 'context missing meaning' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiTirasOptionalWithKr(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });

        test('should handle verb with different form', () => {
            const result = isGatiTirasOptionalWithKr('tiraskuru', { verb: 'kṛ', meaning: 'disappearance' });
            expect(result).toMatchObject({
                applies: true,
                optional: true,
            });
        });

        test('should handle Devanagari verb form in context', () => {
            const result = isGatiTirasOptionalWithKr('tiraskuru', { verb: 'कृ', meaning: 'disappearance' });
            expect(result).toMatchObject({
                applies: true,
                optional: true,
            });
        });
    });
});
