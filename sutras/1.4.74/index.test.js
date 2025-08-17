import isGatiSaksatPrabhrtini from './index.js';

describe('Sutra 1.4.74: sākaṣātaparabhṛtīni ca', () => {
    // Positive Test Cases (32 tests)
    describe('Positive Cases: Optional "gati" for "sākṣāt" and other words with "kṛ"', () => {
        const positiveCases = [
            // IAST - sākṣāt
            { word: 'sākṣātkṛtya', context: { verb: 'kṛ' } },
            { word: 'sākṣātkṛtvā', context: { verb: 'kṛ' } },
            { word: 'sākṣātkaroti', context: { verb: 'kṛ' } },
            { word: 'sākṣātkṛtam', context: { verb: 'kṛ' } },
            // IAST - mithyā
            { word: 'mithyākṛtya', context: { verb: 'kṛ' } },
            { word: 'mithyākaroti', context: { verb: 'kṛ' } },
            // IAST - lavaṇam
            { word: 'lavaṇankṛtya', context: { verb: 'kṛ' } },
            { word: 'lavaṇamkaroti', context: { verb: 'kṛ' } },
            // IAST - uṣṇam
            { word: 'uṣṇankṛtya', context: { verb: 'kṛ' } },
            { word: 'uṣṇamkaroti', context: { verb: 'kṛ' } },
             // IAST - mañju
            { word: 'mañjukṛtya', context: { verb: 'kṛ' } },
            { word: 'mañjukaroti', context: { verb: 'kṛ' } },
            // IAST - pṛthak
            { word: 'pṛthakkṛtya', context: { verb: 'kṛ' } },
            { word: 'pṛthakkaroti', context: { verb: 'kṛ' } },
             // IAST - śukla
            { word: 'śuklīkṛtya', context: { verb: 'kṛ' } },
            { word: 'śuklīkaroti', context: { verb: 'kṛ' } },


            // Devanagari - साक्षात्
            { word: 'साक्षात्कृत्य', context: { verb: 'कृ' } },
            { word: 'साक्षात्कृत्वा', context: { verb: 'कृ' } },
            { word: 'साक्षात्कारोति', context: { verb: 'कृ' } },
            { word: 'साक्षात्कृतम्', context: { verb: 'कृ' } },
            // Devanagari - मिथ्या
            { word: 'मिथ्याकृत्य', context: { verb: 'कृ' } },
            { word: 'मिथ्याकरोति', context: { verb: 'कृ' } },
            // Devanagari - लवणम्
            { word: 'लवणंकृत्य', context: { verb: 'कृ' } },
            { word: 'लवणंकरोति', context: { verb: 'कृ' } },
            // Devanagari - उष्णम्
            { word: 'उष्णंकृत्य', context: { verb: 'कृ' } },
            { word: 'उष्णंकरोति', context: { verb: 'कृ' } },
            // Devanagari - मञ्जु
            { word: 'मञ्जुृत्य', context: { verb: 'कृ' } },
            { word: 'मञ्जुकरोति', context: { verb: 'कृ' } },
             // Devanagari - पृथक्
            { word: 'पृथक्कृत्य', context: { verb: 'कृ' } },
            { word: 'पृथक्करोति', context: { verb: 'कृ' } },
             // Devanagari - शुक्ल
            { word: 'शुक्लीकृत्य', context: { verb: 'कृ' } },
            { word: 'शुक्लीकरोति', context: { verb: 'कृ' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply optionally to "${word}"`, () => {
                const result = isGatiSaksatPrabhrtini(word, context);
                expect(result.applies).toBe(true);
                expect(result.optional).toBe(true);
            });
        });
    });

    // Negative Test Cases (12 tests)
    describe('Negative Cases', () => {
        const negativeCases = [
            // Wrong verb
            { word: 'sākṣātbhavati', context: { verb: 'bhū' } },
            { word: 'साक्षाद्भवति', context: { verb: 'भू' } },
            { word: 'mithyāvadati', context: { verb: 'vad' } },
            { word: 'मिथ्यावदति', context: { verb: 'वद्' } },

            // Word not in the group
            { word: 'anyathākṛtya', context: { verb: 'kṛ' } },
            { word: 'अन्यथाकृत्य', context: { verb: 'कृ' } },
            { word: 'gṛhaṃkṛtvā', context: { verb: 'kṛ' } },
            { word: 'गृहंकृत्वा', context: { verb: 'कृ' } },

            // Incomplete word
            { word: 'sākṣāt', context: { verb: 'kṛ' } },
            { word: 'साक्षात्', context: { verb: 'कृ' } },
            { word: 'mithyā', context: { verb: 'kṛ' } },
            { word: 'मिथ्या', context: { verb: 'कृ' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}"`, () => {
                const result = isGatiSaksatPrabhrtini(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiSaksatPrabhrtini(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiSaksatPrabhrtini(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiSaksatPrabhrtini(54321);
            expect(result.applies).toBe(false);
        });

        test('should handle empty string', () => {
            const result = isGatiSaksatPrabhrtini('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiSaksatPrabhrtini('sākṣātkṛtya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context object', () => {
            const result = isGatiSaksatPrabhrtini('sākṣātkṛtya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context missing verb', () => {
            const result = isGatiSaksatPrabhrtini('sākṣātkṛtya', { meaning: 'some meaning' });
            expect(result.applies).toBe(false);
        });

        test('should handle word with special characters', () => {
            const result = isGatiSaksatPrabhrtini('sākṣāt-kṛtya!', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should handle long string input', () => {
            const longString = 'sākṣātkṛtya' + 'b'.repeat(1000);
            const result = isGatiSaksatPrabhrtini(longString, { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should require a full word from the gana, not a substring', () => {
            const result = isGatiSaksatPrabhrtini('asākṣātkṛtya', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });
    });
});
