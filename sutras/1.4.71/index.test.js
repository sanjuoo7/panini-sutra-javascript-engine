import isGatiTiras from './index.js';

describe('Sutra 1.4.71: tiro\'nataradadhau', () => {
    // Positive Test Cases (26 tests)
    describe('Positive Cases: "tiras" as gati', () => {
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
            test(`should apply to "${word}" (meaning disappearance)`, () => {
                const result = isGatiTiras(word, context);
                expect(result.applies).toBe(true);
            });
        });
    });

    // Negative Test Cases (20 tests)
    describe('Negative Cases: "tiras" not as gati', () => {
        const negativeCases = [
            // Not meaning disappearance
            { word: 'tiraskṛtya', context: { verb: 'kṛ', meaning: 'reproach' } },
            { word: 'तिरस्कृत्य', context: { verb: 'कृ', meaning: 'reproach' } },
            { word: 'tiraskāraḥ', context: { verb: 'kṛ', meaning: 'reproach' } },
            { word: 'तिरस्कारः', context: { verb: 'कृ', meaning: 'reproach' } },
            { word: 'tirobhūya', context: { verb: 'bhū', meaning: 'existence' } }, // Wrong meaning
            { word: 'तिरोभूय', context: { verb: 'भू', meaning: 'existence' } },

            // No verb context
            { word: 'tiraḥ', context: { meaning: 'disappearance' } },
            { word: 'तिरः', context: { meaning: 'disappearance' } },

            // No 'tiras' in word
            { word: 'gacchati', context: { verb: 'gam', meaning: 'going' } },
            { word: 'गच्छति', context: { verb: 'गम्', meaning: 'going' } },
            { word: 'paṭhati', context: { verb: 'paṭh', meaning: 'reading' } },
            { word: 'पठति', context: { verb: 'पठ्', meaning: 'reading' } },

            // 'tiras' present but context doesn't indicate disappearance
            { word: 'tiraskartum', context: { verb: 'kṛ', meaning: 'to do' } },
            { word: 'तिरस्कर्तुम्', context: { verb: 'कृ', meaning: 'to do' } },
            { word: 'tiraskriyā', context: { verb: 'kṛ', meaning: 'action' } },
            { word: 'तिरस्क्रिया', context: { verb: 'कृ', meaning: 'action' } },

            // Similar sounding words
            { word: 'tīra', context: { verb: 'gam', meaning: 'shore' } },
            { word: 'तीर', context: { verb: 'गम्', meaning: 'shore' } },
            { word: 'tarati', context: { verb: 'tṝ', meaning: 'to cross' } },
            { word: 'तरति', context: { verb: 'तॄ', meaning: 'to cross' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}"`, () => {
                const result = isGatiTiras(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiTiras(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiTiras(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiTiras(12345);
            expect(result.applies).toBe(false);
        });

        test('should handle empty string input', () => {
            const result = isGatiTiras('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiTiras('tirobhūya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context object', () => {
            const result = isGatiTiras('tirobhūya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context with missing verb', () => {
            const result = isGatiTiras('tirobhūya', { meaning: 'disappearance' });
            expect(result.applies).toBe(false);
        });

        test('should handle context with missing meaning', () => {
            const result = isGatiTiras('tirobhūya', { verb: 'bhū' });
            expect(result.applies).toBe(false);
        });

        test('should handle input with special characters', () => {
            const result = isGatiTiras('tiro-bhūya!', { verb: 'bhū', meaning: 'disappearance' });
            expect(result.applies).toBe(false);
        });

        test('should handle very long string input', () => {
            const longString = 'tiras' + 'a'.repeat(1000);
            const result = isGatiTiras(longString, { verb: 'bhū', meaning: 'disappearance' });
            expect(result.applies).toBe(false);
        });
    });
});
