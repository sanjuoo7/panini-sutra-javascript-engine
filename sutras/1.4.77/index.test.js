import isGatiHastePanau from './index.js';

describe('Sutra 1.4.77: nityaṃ haste pāṇāvupayamane', () => {
    // Positive Test Cases (20 tests)
    describe('Positive Cases: Mandatory "gati" in the sense of marriage', () => {
        const positiveCases = [
            // IAST - haste
            { word: 'hastekṛtya kanyām', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'hastekṛtvā dāram', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'hastekaroti vadhūm', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'hastekṛtaḥ vivāhaḥ', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'hastekariṣyati kanyām', context: { verb: 'kṛ', meaning: 'marriage' } },

            // IAST - pāṇau
            { word: 'pāṇaukṛtya kanyām', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'pāṇaukṛtvā dāram', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'pāṇaukaroti vadhūm', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'pāṇaukṛtaḥ vivāhaḥ', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'pāṇaukariṣyati kanyām', context: { verb: 'kṛ', meaning: 'marriage' } },

            // Devanagari - हस्ते
            { word: 'हस्तेकृत्य कन्याम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'हस्तेकृत्वा दारम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'हस्तेकरोति वधूम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'हस्तेकृतः विवाहः', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'हस्तेकरिष्यति कन्याम्', context: { verb: 'कृ', meaning: 'marriage' } },

            // Devanagari - पाणौ
            { word: 'पाणौकृत्य कन्याम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'पाणौकृत्वा दारम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'पाणौकरोति वधूम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'पाणौकृतः विवाहः', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'पाणौकरिष्यति कन्याम्', context: { verb: 'कृ', meaning: 'marriage' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply mandatorily to "${word}"`, () => {
                const result = isGatiHastePanau(word, context);
                expect(result.applies).toBe(true);
                expect(result.optional).toBe(false);
            });
        });
    });

    // Negative Test Cases (20 tests)
    describe('Negative Cases', () => {
        const negativeCases = [
            // Wrong meaning
            { word: 'hastekṛtya dhanam', context: { verb: 'kṛ', meaning: 'taking money' } },
            { word: 'हस्तेकृत्य धनम्', context: { verb: 'कृ', meaning: 'taking money' } },
            { word: 'pāṇaukṛtya jalam', context: { verb: 'kṛ', meaning: 'cupping water' } },
            { word: 'पाणौकृत्य जलम्', context: { verb: 'कृ', meaning: 'cupping water' } },

            // Wrong verb
            { word: 'hastegacchati kanyām', context: { verb: 'gam', meaning: 'marriage' } },
            { word: 'हस्तेगच्छति कन्याम्', context: { verb: 'गम्', meaning: 'marriage' } },
            { word: 'pāṇubhavati vadhūm', context: { verb: 'bhū', meaning: 'marriage' } },
            { word: 'पाणौभवति वधूम्', context: { verb: 'भू', meaning: 'marriage' } },

            // Word is not haste or pāṇau
            { word: 'urasikṛtya', context: { verb: 'kṛ', meaning: 'marriage' } }, // from previous sutra
            { word: 'उरसिकृत्य', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'śirasi kṛtvā', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'शिरसि कृत्वा', context: { verb: 'कृ', meaning: 'marriage' } },

            // Incomplete words
            { word: 'haste', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'हस्ते', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'pāṇau', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'पाणौ', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'anyat kṛtvā', context: { verb: 'kṛ', meaning: 'doing something else' } },
            { word: 'अन्यत् कृत्वा', context: { verb: 'कृ', meaning: 'doing something else' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}"`, () => {
                const result = isGatiHastePanau(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiHastePanau(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiHastePanau(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiHastePanau({ key: 'value' });
            expect(result.applies).toBe(false);
        });

        test('should handle empty string', () => {
            const result = isGatiHastePanau('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiHastePanau('hastekṛtya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context', () => {
            const result = isGatiHastePanau('hastekṛtya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context missing verb', () => {
            const result = isGatiHastePanau('hastekṛtya', { meaning: 'marriage' });
            expect(result.applies).toBe(false);
        });

        test('should handle context missing meaning', () => {
            const result = isGatiHastePanau('hastekṛtya', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should handle context with wrong type for meaning', () => {
            const result = isGatiHastePanau('hastekṛtya', { verb: 'kṛ', meaning: 123 });
            expect(result.applies).toBe(false);
        });

        test('should handle long string input', () => {
            const longString = 'hastekṛtya' + 'a'.repeat(1000);
            const result = isGatiHastePanau(longString, { verb: 'kṛ', meaning: 'marriage' });
            expect(result.applies).toBe(false);
        });
    });
});
