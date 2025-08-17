import isGatiMadhyePadeNivacane from './index.js';

describe('Sutra 1.4.76: madhayepadenivacane ca', () => {
    // Positive Test Cases (36 tests)
    describe('Positive Cases: Optional "gati" when not meaning "placing"', () => {
        const positiveCases = [
            // IAST - madhye
            { word: 'madhyekṛtya', context: { verb: 'kṛ', meaning: 'interrupting' } },
            { word: 'madhyekṛtvā', context: { verb: 'kṛ', meaning: 'halting' } },
            { word: 'madhyekaroti', context: { verb: 'kṛ', meaning: 'bisecting' } },

            // IAST - pade
            { word: 'padekṛtya', context: { verb: 'kṛ', meaning: 'stumbling' } },
            { word: 'padekṛtvā', context: { verb: 'kṛ', meaning: 'trapping' } },
            { word: 'padekaroti', context: { verb: 'kṛ', meaning: 'tripping' } },

            // IAST - nivacane
            { word: 'nivacanekṛtya', context: { verb: 'kṛ', meaning: 'silencing' } },
            { word: 'nivacanekṛtvā', context: { verb: 'kṛ', meaning: 'muting' } },
            { word: 'nivacanekaroti', context: { verb: 'kṛ', meaning: 'making speechless' } },

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
                expect(result.applies).toBe(true);
                expect(result.optional).toBe(true);
            });
        });
    });

    // Negative Test Cases (20 tests)
    describe('Negative Cases', () => {
        const negativeCases = [
            // anatyādhāna condition: meaning is 'placing'
            { word: 'madhyekṛtya dhanam', context: { verb: 'kṛ', meaning: 'placing' } },
            { word: 'मध्येकृत्य धनम्', context: { verb: 'कृ', meaning: 'placing' } },
            { word: 'padekṛtya jalam', context: { verb: 'kṛ', meaning: 'placing' } },
            { word: 'पदेकृत्य जलम्', context: { verb: 'कृ', meaning: 'placing' } },

            // Wrong verb
            { word: 'madhyebhavati', context: { verb: 'bhū', meaning: 'interrupting' } },
            { word: 'मध्येभवति', context: { verb: 'भू', meaning: 'interrupting' } },
            { word: 'padegacchati', context: { verb: 'gam', meaning: 'stumbling' } },
            { word: 'पदेगच्छति', context: { verb: 'गम्', meaning: 'stumbling' } },

            // Word is not one of the three
            { word: 'hastekṛtya', context: { verb: 'kṛ', meaning: 'taking in hand' } },
            { word: 'हस्तेकृत्य', context: { verb: 'कृ', meaning: 'taking in hand' } },
            { word: 'manasikṛtya', context: { verb: 'kṛ', meaning: 'pondering' } },
            { word: 'मनसिकृत्य', context: { verb: 'कृ', meaning: 'pondering' } },

            // Incomplete words
            { word: 'madhye', context: { verb: 'kṛ', meaning: 'interrupting' } },
            { word: 'मध्ये', context: { verb: 'कृ', meaning: 'interrupting' } },
            { word: 'pade', context: { verb: 'kṛ', meaning: 'stumbling' } },
            { word: 'पदे', context: { verb: 'कृ', meaning: 'stumbling' } },
            { word: 'nivacane', context: { verb: 'kṛ', meaning: 'silencing' } },
            { word: 'निवचने', context: { verb: 'कृ', meaning: 'silencing' } },
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'interrupting' } },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'stumbling' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}" with meaning "${context.meaning}"`, () => {
                const result = isGatiMadhyePadeNivacane(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiMadhyePadeNivacane(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiMadhyePadeNivacane(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiMadhyePadeNivacane([1, 2, 3]);
            expect(result.applies).toBe(false);
        });

        test('should handle empty string', () => {
            const result = isGatiMadhyePadeNivacane('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiMadhyePadeNivacane('madhyekṛtya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context', () => {
            const result = isGatiMadhyePadeNivacane('madhyekṛtya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context missing verb', () => {
            const result = isGatiMadhyePadeNivacane('madhyekṛtya', { meaning: 'interrupting' });
            expect(result.applies).toBe(false);
        });

        test('should handle context missing meaning', () => {
            const result = isGatiMadhyePadeNivacane('madhyekṛtya', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should handle context with null verb', () => {
            const result = isGatiMadhyePadeNivacane('madhyekṛtya', { verb: null, meaning: 'interrupting' });
            expect(result.applies).toBe(false);
        });

        test('should handle long string input', () => {
            const longString = 'madhyekṛtya' + 'a'.repeat(1000);
            const result = isGatiMadhyePadeNivacane(longString, { verb: 'kṛ', meaning: 'interrupting' });
            expect(result.applies).toBe(false); // Assuming it looks for exact words
        });
    });
});
