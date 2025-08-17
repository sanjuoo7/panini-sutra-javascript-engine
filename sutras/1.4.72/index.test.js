import isGatiTirasOptionalWithKr from './index.js';

describe('Sutra 1.4.72: vibhāṣā kṛñi', () => {
    // Positive Test Cases (20 tests)
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
                expect(result.applies).toBe(true);
                expect(result.optional).toBe(true);
            });
        });
    });

    // Negative Test Cases (22 tests)
    describe('Negative Cases', () => {
        const negativeCases = [
            // Verb is not 'kṛ'
            { word: 'tirobhūya', context: { verb: 'bhū', meaning: 'disappearance' } },
            { word: 'तिरोभूय', context: { verb: 'भू', meaning: 'disappearance' } },
            { word: 'tirodhatte', context: { verb: 'dhā', meaning: 'disappearance' } },
            { word: 'तिरोधत्ते', context: { verb: 'धा', meaning: 'disappearance' } },

            // Meaning is not 'disappearance'
            { word: 'tiraskṛtya', context: { verb: 'kṛ', meaning: 'reproach' } },
            { word: 'तिरस्कृत्य', context: { verb: 'कृ', meaning: 'reproach' } },
            { word: 'tiraskāraḥ', context: { verb: 'kṛ', meaning: 'insult' } },
            { word: 'तिरस्कारः', context: { verb: 'कृ', meaning: 'insult' } },

            // Word does not contain 'tiras'
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'doing' } },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'doing' } },
            { word: 'kurute', context: { verb: 'kṛ', meaning: 'does' } },
            { word: 'कुरुते', context: { verb: 'कृ', meaning: 'does' } },

            // Other random words
            { word: 'gacchati', context: { verb: 'gam', meaning: 'going' } },
            { word: 'गच्छति', context: { verb: 'गम्', meaning: 'going' } },
            { word: 'up करोति', context: { verb: 'kṛ', meaning: 'helps' } },
            { word: 'उप करोति', context: { verb: 'कृ', meaning: 'helps' } },
            { word: 'alam kṛtvā', context: { verb: 'kṛ', meaning: 'decorating' } },
            { word: 'अलं कृत्वा', context: { verb: 'कृ', meaning: 'decorating' } },

            // Context is for 1.4.71, not this sutra
            { word: 'tirobhavati', context: { verb: 'bhū', meaning: 'disappearance' } },
            { word: 'तिरोभवति', context: { verb: 'भू', meaning: 'disappearance' } },
            { word: 'tirohita', context: { verb: 'dhā', meaning: 'disappearance' } },
            { word: 'तिरोहित', context: { verb: 'धा', meaning: 'disappearance' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}"`, () => {
                const result = isGatiTirasOptionalWithKr(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiTirasOptionalWithKr(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiTirasOptionalWithKr(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiTirasOptionalWithKr(123);
            expect(result.applies).toBe(false);
        });

        test('should handle empty string', () => {
            const result = isGatiTirasOptionalWithKr('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiTirasOptionalWithKr('tiraskṛtya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context object', () => {
            const result = isGatiTirasOptionalWithKr('tiraskṛtya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context missing verb', () => {
            const result = isGatiTirasOptionalWithKr('tiraskṛtya', { meaning: 'disappearance' });
            expect(result.applies).toBe(false);
        });

        test('should handle context missing meaning', () => {
            const result = isGatiTirasOptionalWithKr('tiraskṛtya', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should handle verb with different form', () => {
            const result = isGatiTirasOptionalWithKr('tiraskuru', { verb: 'kṛ', meaning: 'disappearance' });
            expect(result.applies).toBe(true);
            expect(result.optional).toBe(true);
        });

        test('should handle Devanagari verb form in context', () => {
            const result = isGatiTirasOptionalWithKr('tiraskuru', { verb: 'कृ', meaning: 'disappearance' });
            expect(result.applies).toBe(true);
            expect(result.optional).toBe(true);
        });
    });
});
