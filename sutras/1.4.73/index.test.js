import isGatiUpajeAnavaje from './index.js';

describe('Sutra 1.4.73: upāje\'navāje', () => {
    // Positive Test Cases (24 tests)
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
                expect(result.applies).toBe(true);
                expect(result.optional).toBe(true);
            });
        });
    });

    // Negative Test Cases (20 tests)
    describe('Negative Cases', () => {
        const negativeCases = [
            // Wrong verb
            { word: 'upāje-gacchati', context: { verb: 'gam', meaning: 'supporting the weak' } },
            { word: 'उपाजे-गच्छति', context: { verb: 'गम्', meaning: 'supporting the weak' } },
            { word: 'anavāje-bhavati', context: { verb: 'bhū', meaning: 'supporting the weak' } },
            { word: 'अन्वाजे-भवति', context: { verb: 'भू', meaning: 'supporting the weak' } },

            // Wrong meaning
            { word: 'upājekṛtya', context: { verb: 'kṛ', meaning: 'doing something else' } },
            { word: 'उपाजेकृत्य', context: { verb: 'कृ', meaning: 'doing something else' } },
            { word: 'anavājekṛtya', context: { verb: 'kṛ', meaning: 'another action' } },
            { word: 'अन्वाजेकृत्य', context: { verb: 'कृ', meaning: 'another action' } },

            // Word does not contain upāje or anavāje
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'doing' } },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'doing' } },
            { word: 'gacchati', context: { verb: 'gam', meaning: 'going' } },
            { word: 'गच्छति', context: { verb: 'गम्', meaning: 'going' } },

            // Similar sounding words
            { word: 'upayojya', context: { verb: 'yuj', meaning: 'using' } },
            { word: 'उपयोज्य', context: { verb: 'युज्', meaning: 'using' } },

            // Only one part of the condition is met
            { word: 'upāje', context: { verb: 'kṛ', meaning: 'supporting the weak' } }, // word is incomplete
            { word: 'उपाजे', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'anavāje', context: { verb: 'kṛ', meaning: 'supporting the weak' } },
            { word: 'अन्वाजे', context: { verb: 'कृ', meaning: 'supporting the weak' } },
            { word: 'kṛtya', context: { verb: 'kṛ', meaning: 'supporting the weak' } }, // missing upāje/anavāje
            { word: 'कृत्य', context: { verb: 'कृ', meaning: 'supporting the weak' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}"`, () => {
                const result = isGatiUpajeAnavaje(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiUpajeAnavaje(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiUpajeAnavaje(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiUpajeAnavaje(12345);
            expect(result.applies).toBe(false);
        });

        test('should handle empty string', () => {
            const result = isGatiUpajeAnavaje('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiUpajeAnavaje('upājekṛtya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context object', () => {
            const result = isGatiUpajeAnavaje('upājekṛtya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context missing verb', () => {
            const result = isGatiUpajeAnavaje('upājekṛtya', { meaning: 'supporting the weak' });
            expect(result.applies).toBe(false);
        });

        test('should handle context missing meaning', () => {
            const result = isGatiUpajeAnavaje('upājekṛtya', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should handle word with special characters', () => {
            const result = isGatiUpajeAnavaje('upāje-kṛtya!', { verb: 'kṛ', meaning: 'supporting the weak' });
            expect(result.applies).toBe(false);
        });

        test('should handle long string input', () => {
            const longString = 'upājekṛtya' + 'a'.repeat(1000);
            const result = isGatiUpajeAnavaje(longString, { verb: 'kṛ', meaning: 'supporting the weak' });
            expect(result.applies).toBe(false);
        });
    });
});
