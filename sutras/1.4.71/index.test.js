import isGatiTiras from './index.js';

describe("Sutra 1.4.71: tiro'nataradadhau", () => {
    describe('Positive Cases: "tiras" is designated as gati', () => {
        const positiveCases = [
            // IAST
            { word: 'tirobhūya', context: { verb: 'bhū', meaning: 'disappearance' } },
            { word: 'tirobhavati', context: { verb: 'bhū', meaning: 'disappearance' } },
            { word: 'tirodhatte', context: { verb: 'dhā', meaning: 'disappearance' } },
            { word: 'tirobhūtvā', context: { verb: 'bhū', meaning: 'disappearance' } },
            { word: 'tirodadhāti', context: { verb: 'dhā', meaning: 'disappearance' } },
            { word: 'tirohita', context: { verb: 'dhā', meaning: 'disappearance' } },
            { word: 'tirodhānam', context: { verb: 'dhā', meaning: 'disappearance' } },
            { word: 'tirobhāvaḥ', context: { verb: 'bhū', meaning: 'disappearance' } },
            { word: 'tirodhāsyati', context: { verb: 'dhā', meaning: 'disappearance' } },
            { word: 'tirobhaviṣyati', context: { verb: 'bhū', meaning: 'disappearance' } },
            { word: 'tirobabhūva', context: { verb: 'bhū', meaning: 'disappearance' } },
            { word: 'tirodadhe', context: { verb: 'dhā', meaning: 'disappearance' } },
            { word: 'tiro\'bhavat', context: { verb: 'bhū', meaning: 'disappearance' } },

            // Devanagari
            { word: 'तिरोभूय', context: { verb: 'भू', meaning: 'disappearance' } },
            { word: 'तिरोभवति', context: { verb: 'भू', meaning: 'disappearance' } },
            { word: 'तिरोधत्ते', context: { verb: 'धा', meaning: 'disappearance' } },
            { word: 'तिरोभूत्वा', context: { verb: 'भू', meaning: 'disappearance' } },
            { word: 'तिरोदधाति', context: { verb: 'धा', meaning: 'disappearance' } },
            { word: 'तिरोहित', context: { verb: 'धा', meaning: 'disappearance' } },
            { word: 'तिरोधानम्', context: { verb: 'धा', meaning: 'disappearance' } },
            { word: 'तिरोभावः', context: { verb: 'भू', meaning: 'disappearance' } },
            { word: 'तिरोधास्यति', context: { verb: 'धा', meaning: 'disappearance' } },
            { word: 'तिरोभविष्यति', context: { verb: 'भू', meaning: 'disappearance' } },
            { word: 'तिरोबभूव', context: { verb: 'भू', meaning: 'disappearance' } },
            { word: 'तिरोदधे', context: { verb: 'धा', meaning: 'disappearance' } },
            { word: 'तिरोऽभवत्', context: { verb: 'भू', meaning: 'disappearance' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should correctly identify "${word}" as gati`, () => {
                const result = isGatiTiras(word, context);
                expect(result).toMatchObject({
                    applies: true,
                    classification: 'गति',
                    confidence: expect.any(Number),
                    reason: expect.any(String)
                });
            });
        });
    });

    describe('Negative Cases: "tiras" is not designated as gati', () => {
        const negativeCases = [
            // Not meaning disappearance
            { word: 'tiraskṛtya', context: { verb: 'kṛ', meaning: 'reproach' }, reason: "The meaning is not 'disappearance'." },
            { word: 'तिरस्कृत्य', context: { verb: 'कृ', meaning: 'reproach' }, reason: "The meaning is not 'disappearance'." },
            { word: 'tiraskāraḥ', context: { verb: 'kṛ', meaning: 'reproach' }, reason: "The meaning is not 'disappearance'." },
            { word: 'तिरस्कारः', context: { verb: 'कृ', meaning: 'reproach' }, reason: "The meaning is not 'disappearance'." },
            { word: 'tirobhūya', context: { verb: 'bhū', meaning: 'existence' }, reason: "The meaning is not 'disappearance'." },
            { word: 'तिरोभूय', context: { verb: 'भू', meaning: 'existence' }, reason: "The meaning is not 'disappearance'." },

            // No verb context
            { word: 'tiraḥ', context: { meaning: 'disappearance' }, reason: "The word 'tiras' is not used with a verb." },
            { word: 'तिरः', context: { meaning: 'disappearance' }, reason: "The word 'tiras' is not used with a verb." },

            // No 'tiras' in word
            { word: 'gacchati', context: { verb: 'gam', meaning: 'going' }, reason: "The word 'tiras' is not present." },
            { word: 'गच्छति', context: { verb: 'गम्', meaning: 'going' }, reason: "The word 'tiras' is not present." },
            { word: 'paṭhati', context: { verb: 'paṭh', meaning: 'reading' }, reason: "The word 'tiras' is not present." },
            { word: 'पठति', context: { verb: 'पठ्', meaning: 'reading' }, reason: "The word 'tiras' is not present." },

            // 'tiras' present but context doesn't indicate disappearance
            { word: 'tiraskartum', context: { verb: 'kṛ', meaning: 'to do' }, reason: "The meaning is not 'disappearance'." },
            { word: 'तिरस्कर्तुम्', context: { verb: 'कृ', meaning: 'to do' }, reason: "The meaning is not 'disappearance'." },
            { word: 'tiraskriyā', context: { verb: 'kṛ', meaning: 'action' }, reason: "The meaning is not 'disappearance'." },
            { word: 'तिरस्क्रिया', context: { verb: 'कृ', meaning: 'action' }, reason: "The meaning is not 'disappearance'." },

            // Similar sounding words
            { word: 'tīra', context: { verb: 'gam', meaning: 'shore' }, reason: "The word 'tiras' is not present." },
            { word: 'तीर', context: { verb: 'गम्', meaning: 'shore' }, reason: "The word 'tiras' is not present." },
            { word: 'tarati', context: { verb: 'tṝ', meaning: 'to cross' }, reason: "The word 'tiras' is not present." },
            { word: 'तरति', context: { verb: 'तॄ', meaning: 'to cross' }, reason: "The word 'tiras' is not present." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiTiras(word, context);
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
            { input: '', description: 'empty string input' },
            { input: 'tirobhūya', context: undefined, description: 'missing context' },
            { input: 'tirobhūya', context: {}, description: 'empty context object' },
            { input: 'tirobhūya', context: { meaning: 'disappearance' }, description: 'context with missing verb' },
            { input: 'tirobhūya', context: { verb: 'bhū' }, description: 'context with missing meaning' },
            { input: 'tiro-bhūya!', context: { verb: 'bhū', meaning: 'disappearance' }, description: 'input with special characters' },
            { input: 'tiras' + 'a'.repeat(1000), context: { verb: 'bhū', meaning: 'disappearance' }, description: 'very long string input' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiTiras(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });
    });
});
