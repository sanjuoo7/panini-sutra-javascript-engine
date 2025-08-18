import isGatiMadhyePadeNivacane from './index.js';

describe('Sutra 1.4.76: madhayepadenivacane ca', () => {
    describe('Positive Cases: Optional "gati" when not meaning "placing"', () => {
        const positiveCases = [
            // IAST - madhye
            { word: 'madhyekṛtya', context: { verb: 'kṛ', meaning: 'interrupting' } },
            { word: 'madhyekṛtvā', context: { verb: 'kṛ', meaning: 'halting' } },
            { word: 'madhyekaroti', context: { verb: 'kṛ', meaning: 'bisecting' } },
            { word: 'madhyekariṣyati', context: { verb: 'kṛ', meaning: 'will bisect' } },
            { word: 'madhyecakāra', context: { verb: 'kṛ', meaning: 'bisected' } },

            // IAST - pade
            { word: 'padekṛtya', context: { verb: 'kṛ', meaning: 'stumbling' } },
            { word: 'padekṛtvā', context: { verb: 'kṛ', meaning: 'trapping' } },
            { word: 'padekaroti', context: { verb: 'kṛ', meaning: 'tripping' } },
            { word: 'padekariṣyati', context: { verb: 'kṛ', meaning: 'will trip' } },
            { word: 'padecakāra', context: { verb: 'kṛ', meaning: 'tripped' } },

            // IAST - nivacane
            { word: 'nivacanekṛtya', context: { verb: 'kṛ', meaning: 'silencing' } },
            { word: 'nivacanekṛtvā', context: { verb: 'kṛ', meaning: 'muting' } },
            { word: 'nivacanekaroti', context: { verb: 'kṛ', meaning: 'making speechless' } },
            { word: 'nivacanekariṣyati', context: { verb: 'kṛ', meaning: 'will silence' } },
            { word: 'nivacanecakāra', context: { verb: 'kṛ', meaning: 'silenced' } },

            // Devanagari - madhye
            { word: 'मध्येकृत्य', context: { verb: 'कृ', meaning: 'interrupting' } },
            { word: 'मध्येकृत्वा', context: { verb: 'कृ', meaning: 'halting' } },
            { word: 'मध्येकरोति', context: { verb: 'कृ', meaning: 'bisecting' } },

            // Devanagari - pade
            { word: 'पदेकृत्य', context: { verb: 'कृ', meaning: 'stumbling' } },
            { word: 'पदेकृत्वा', context: { verb: 'कृ', meaning: 'trapping' } },
            { word: 'पदेकरोति', context: { verb: 'कृ', meaning: 'tripping' } },

            // Devanagari - nivacane
            { word: 'निवचनेकृत्य', context: { verb: 'कृ', meaning: 'silencing' } },
            { word: 'निवचनेकृत्वा', context: { verb: 'कृ', meaning: 'muting' } },
            { word: 'निवचनेकरोति', context: { verb: 'कृ', meaning: 'making speechless' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply optionally to "${word}" with meaning "${context.meaning}"`, () => {
                const result = isGatiMadhyePadeNivacane(word, context);
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
            { word: 'madhyekṛtya dhanam', context: { verb: 'kṛ', meaning: 'placing' }, reason: "The meaning is 'placing' (anatyādhāna)." },
            { word: 'मध्येकृत्य धनम्', context: { verb: 'कृ', meaning: 'placing' }, reason: "The meaning is 'placing' (anatyādhāna)." },
            { word: 'padekṛtya jalam', context: { verb: 'kṛ', meaning: 'placing' }, reason: "The meaning is 'placing' (anatyādhāna)." },
            { word: 'पदेकृत्य जलम्', context: { verb: 'कृ', meaning: 'placing' }, reason: "The meaning is 'placing' (anatyādhāna)." },

            // Wrong verb
            { word: 'madhyebhavati', context: { verb: 'bhū', meaning: 'interrupting' }, reason: "The verb is not 'kṛ'." },
            { word: 'मध्येभवति', context: { verb: 'भू', meaning: 'interrupting' }, reason: "The verb is not 'kṛ'." },
            { word: 'padegacchati', context: { verb: 'gam', meaning: 'stumbling' }, reason: "The verb is not 'kṛ'." },
            { word: 'पदेगच्छति', context: { verb: 'गम्', meaning: 'stumbling' }, reason: "The verb is not 'kṛ'." },

            // Word is not one of the three
            { word: 'hastekṛtya', context: { verb: 'kṛ', meaning: 'taking in hand' }, reason: "The word is not 'madhye', 'pade', or 'nivacane'." },
            { word: 'हस्तेकृत्य', context: { verb: 'कृ', meaning: 'taking in hand' }, reason: "The word is not 'madhye', 'pade', or 'nivacane'." },
            { word: 'manasikṛtya', context: { verb: 'kṛ', meaning: 'pondering' }, reason: "The word is not 'madhye', 'pade', or 'nivacane'." },
            { word: 'मनसिकृत्य', context: { verb: 'कृ', meaning: 'pondering' }, reason: "The word is not 'madhye', 'pade', or 'nivacane'." },

            // Incomplete words
            { word: 'madhye', context: { verb: 'kṛ', meaning: 'interrupting' }, reason: "The word is incomplete." },
            { word: 'मध्ये', context: { verb: 'कृ', meaning: 'interrupting' }, reason: "The word is incomplete." },
            { word: 'pade', context: { verb: 'kṛ', meaning: 'stumbling' }, reason: "The word is incomplete." },
            { word: 'पदे', context: { verb: 'कृ', meaning: 'stumbling' }, reason: "The word is incomplete." },
            { word: 'nivacane', context: { verb: 'kṛ', meaning: 'silencing' }, reason: "The word is incomplete." },
            { word: 'निवचने', context: { verb: 'कृ', meaning: 'silencing' }, reason: "The word is incomplete." },
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'interrupting' }, reason: "The word is not 'madhye', 'pade', or 'nivacane'." },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'stumbling' }, reason: "The word is not 'madhye', 'pade', or 'nivacane'." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiMadhyePadeNivacane(word, context);
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
            { input: [1, 2, 3], description: 'non-string input' },
            { input: '', description: 'empty string' },
            { input: 'madhyekṛtya', context: undefined, description: 'missing context' },
            { input: 'madhyekṛtya', context: {}, description: 'empty context' },
            { input: 'madhyekṛtya', context: { meaning: 'interrupting' }, description: 'context missing verb' },
            { input: 'madhyekṛtya', context: { verb: 'kṛ' }, description: 'context missing meaning' },
            { input: 'madhyekṛtya', context: { verb: null, meaning: 'interrupting' }, description: 'context with null verb' },
            { input: 'madhyekṛtya' + 'a'.repeat(1000), context: { verb: 'kṛ', meaning: 'interrupting' }, description: 'long string input' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiMadhyePadeNivacane(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });
    });
});
