import isGatiUpajeAnavaje from './index.js';

describe("Sutra 1.4.73: upāje'navāje", () => {
    describe('Positive Cases: Optional "gati" for "upāje" and "anavāje" with "kṛ"', () => {
        const positiveCases = [
            // IAST - upāje
            { word: 'upājekṛtya', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'upājekṛtvā', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'upājekaroti', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'upājekṛtam', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'upājekariṣyati', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'upājecakāra', context: { verb: 'kṛ', meaning: 'supporting the weak' } },

            // IAST - anavāje
            { word: 'anavājekṛtya', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'anavājekṛtvā', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'anavājekaroti', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'anavājekṛtam', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'anavājekariṣyati', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'anavājecakāra', context: { verb: 'kṛ', meaning: 'supporting the weak' } },

            // Devanagari - उपाजे
            { word: 'उपाजेकृत्य', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'उपाजेकृत्वा', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'उपाजेकरोति', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'उपाजेकृतम्', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'उपाजेकरिष्यति', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'उपाजेचकार', context: { verb: 'कृ', meaning: 'supporting the weak' } },

            // Devanagari - अन्वाजे
            { word: 'अन्वाजेकृत्य', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'अन्वाजेकृत्वा', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'अन्वाजेकरोति', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'अन्वाजेकृतम्', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'अन्वाजेकरिष्यति', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'अन्वाजेचकार', context: { verb: 'कृ', meaning: 'supporting the weak' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply optionally to "${word}"`, () => {
                const result = isGatiUpajeAnavaje(word, context);
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
            // Wrong verb
            { word: 'upāje-gacchati', context: { verb: 'gam', meaning: 'supporting the weak' }, reason: "The verb is not 'kṛ'." },
            { word: 'उपाजे-गच्छति', context: { verb: 'गम्', meaning: 'supporting the weak' }, reason: "The verb is not 'kṛ'." },
            { word: 'anavāje-bhavati', context: { verb: 'bhū', meaning: 'supporting the weak' }, reason: "The verb is not 'kṛ'." },
            { word: 'अन्वाजे-भवति', context: { verb: 'भू', meaning: 'supporting the weak' }, reason: "The verb is not 'kṛ'." },

            // Wrong meaning
            { word: 'upājekṛtya', context: { verb: 'kṛ', meaning: 'doing something else' }, reason: "The meaning is not 'supporting the weak'." },
            { word: 'उपाजेकृत्य', context: { verb: 'कृ', meaning: 'doing something else' }, reason: "The meaning is not 'supporting the weak'." },
            { word: 'anavājekṛtya', context: { verb: 'kṛ', meaning: 'another action' }, reason: "The meaning is not 'supporting the weak'." },
            { word: 'अन्वाजेकृत्य', context: { verb: 'कृ', meaning: 'another action' }, reason: "The meaning is not 'supporting the weak'." },

            // Word does not contain upāje or anavāje
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'doing' }, reason: "The word is not 'upāje' or 'anavāje'." },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'doing' }, reason: "The word is not 'upāje' or 'anavāje'." },
            { word: 'gacchati', context: { verb: 'gam', meaning: 'going' }, reason: "The word is not 'upāje' or 'anavāje'." },
            { word: 'गच्छति', context: { verb: 'गम्', meaning: 'going' }, reason: "The word is not 'upāje' or 'anavāje'." },

            // Similar sounding words
            { word: 'upayojya', context: { verb: 'yuj', meaning: 'using' }, reason: "The word is not 'upāje' or 'anavāje'." },
            { word: 'उपयोज्य', context: { verb: 'युज्', meaning: 'using' }, reason: "The word is not 'upāje' or 'anavāje'." },

            // Only one part of the condition is met
            { word: 'upāje', context: { verb: 'kṛ', meaning: 'supporting the weak' }, reason: "The word is incomplete." },
            { word: 'उपाजे', context: { verb: 'कृ', meaning: 'supporting the weak' }, reason: "The word is incomplete." },
            { word: 'anavāje', context: { verb: 'kṛ', meaning: 'supporting the weak' }, reason: "The word is incomplete." },
            { word: 'अन्वाजे', context: { verb: 'कृ', meaning: 'supporting the weak' }, reason: "The word is incomplete." },
            { word: 'kṛtya', context: { verb: 'kṛ', meaning: 'supporting the weak' }, reason: "The word is not 'upāje' or 'anavāje'." },
            { word: 'कृत्य', context: { verb: 'कृ', meaning: 'supporting the weak' }, reason: "The word is not 'upāje' or 'anavāje'." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiUpajeAnavaje(word, context);
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
            { input: 'upājekṛtya', context: undefined, description: 'missing context' },
            { input: 'upājekṛtya', context: {}, description: 'empty context object' },
            { input: 'upājekṛtya', context: { meaning: 'supporting the weak' }, description: 'context missing verb' },
            { input: 'upājekṛtya', context: { verb: 'kṛ' }, description: 'context missing meaning' },
            { input: 'upāje-kṛtya!', context: { verb: 'kṛ', meaning: 'supporting the weak' }, description: 'word with special characters' },
            { input: 'upājekṛtya' + 'a'.repeat(1000), context: { verb: 'kṛ', meaning: 'supporting the weak' }, description: 'long string input' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiUpajeAnavaje(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });
    });
});
