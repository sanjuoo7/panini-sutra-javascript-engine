import isGatiPradhvam from './index.js';

describe('Sutra 1.4.78: prādhvaṃ bandhane', () => {
    // Positive Test Cases (20 tests)
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
                expect(result.applies).toBe(true);
                expect(result.optional).toBe(false);
            });
        });
    });

    // Negative Test Cases (20 tests)
    describe('Negative Cases', () => {
        const negativeCases = [
            // Wrong meaning
            { word: 'prādhvaṅkṛtya', context: { verb: 'kṛ', meaning: 'sending' } },
            { word: 'प्राध्वंकृत्य', context: { verb: 'कृ', meaning: 'sending' } },
            { word: 'prādhvaṅkaroti', context: { verb: 'kṛ', meaning: 'decorating' } },
            { word: 'प्राध्वंकरोति', context: { verb: 'कृ', meaning: 'decorating' } },

            // Wrong verb
            { word: 'prādhvaṅgacchati', context: { verb: 'gam', meaning: 'binding' } },
            { word: 'प्राध्वंगच्छति', context: { verb: 'गम्', meaning: 'binding' } },
            { word: 'prādhvaṃbhavati', context: { verb: 'bhū', meaning: 'binding' } },
            { word: 'प्राध्वंभवति', context: { verb: 'भू', meaning: 'binding' } },

            // Word is not prādhvam
            { word: 'bandhanaṃ kṛtvā', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'बन्धनं कृत्वा', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'anyat kṛtvā', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'अन्यत् कृत्वा', context: { verb: 'कृ', meaning: 'binding' } },

            // Incomplete words
            { word: 'prādhvam', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'प्राध्वम्', context: { verb: 'कृ', meaning: 'binding' } },
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'binding' } },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'binding' } },

            // Similar sounding words
            { word: 'prādhānyam kṛtvā', context: { verb: 'kṛ', meaning: 'making important' } },
            { word: 'प्राधान्यं कृत्वा', context: { verb: 'कृ', meaning: 'making important' } },
            { word: 'dhvaṃsanam kṛtvā', context: { verb: 'kṛ', meaning: 'destroying' } },
            { word: 'ध्वंसनं कृत्वा', context: { verb: 'कृ', meaning: 'destroying' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}"`, () => {
                const result = isGatiPradhvam(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiPradhvam(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiPradhvam(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiPradhvam(12345);
            expect(result.applies).toBe(false);
        });

        test('should handle empty string', () => {
            const result = isGatiPradhvam('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiPradhvam('prādhvaṅkṛtya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context', () => {
            const result = isGatiPradhvam('prādhvaṅkṛtya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context missing verb', () => {
            const result = isGatiPradhvam('prādhvaṅkṛtya', { meaning: 'binding' });
            expect(result.applies).toBe(false);
        });

        test('should handle context missing meaning', () => {
            const result = isGatiPradhvam('prādhvaṅkṛtya', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should handle context with null verb', () => {
            const result = isGatiPradhvam('prādhvaṅkṛtya', { verb: null, meaning: 'binding' });
            expect(result.applies).toBe(false);
        });

        test('should handle word with special characters', () => {
            const result = isGatiPradhvam('prādhvam-kṛtya!', { verb: 'kṛ', meaning: 'binding' });
            expect(result.applies).toBe(false);
        });
    });
});
