import isGatiUrasiManasi from './index.js';

describe('Sutra 1.4.75: anatayādhāna urasimanasī', () => {
    // Positive Test Cases (24 tests)
    describe('Positive Cases: Optional "gati" when not meaning "placing"', () => {
        const positiveCases = [
            // IAST - urasi
            { word: 'urasikṛtya', context: { verb: 'kṛ', meaning: 'accepting' } },
            { word: 'urasikṛtvā', context: { verb: 'kṛ', meaning: 'embracing' } },
            { word: 'urasikaroti', context: { verb: 'kṛ', meaning: 'acknowledging' } },
            { word: 'urasikṛtam', context: { verb: 'kṛ', meaning: 'approved' } },

            // IAST - manasi
            { word: 'manasikṛtya', context: { verb: 'kṛ', meaning: 'pondering' } },
            { word: 'manasikṛtvā', context: { verb: 'kṛ', meaning: 'considering' } },
            { word: 'manasikaroti', context: { verb: 'kṛ', meaning: 'thinking' } },
            { word: 'manasikṛtam', context: { verb: 'kṛ', meaning: 'decided' } },
            { word: 'manasikariṣyati', context: { verb: 'kṛ', meaning: 'will think' } },
            { word: 'manasicakāra', context: { verb: 'kṛ', meaning: 'thought' } },
            { word: 'manasikaraṇam', context: { verb: 'kṛ', meaning: 'act of thinking' } },
            { word: 'manasikartum', context: { verb: 'kṛ', meaning: 'to think' } },

            // Devanagari - उरसि
            { word: 'उरसिकृत्य', context: { verb: 'कृ', meaning: 'accepting' } },
            { word: 'उरसिकृत्वा', context: { verb: 'कृ', meaning: 'embracing' } },
            { word: 'उरसिकरोति', context: { verb: 'कृ', meaning: 'acknowledging' } },
            { word: 'उरसिकृतम्', context: { verb: 'कृ', meaning: 'approved' } },

            // Devanagari - मनसि
            { word: 'मनसिकृत्य', context: { verb: 'कृ', meaning: 'pondering' } },
            { word: 'मनसिकृत्वा', context: { verb: 'कृ', meaning: 'considering' } },
            { word: 'मनसिकरोति', context: { verb: 'कृ', meaning: 'thinking' } },
            { word: 'मनसिकृतम्', context: { verb: 'कृ', meaning: 'decided' } },
            { word: 'मनसिकरिष्यति', context: { verb: 'कृ', meaning: 'will think' } },
            { word: 'मनसिचकार', context: { verb: 'कृ', meaning: 'thought' } },
            { word: 'मनसिकरणम्', context: { verb: 'कृ', meaning: 'act of thinking' } },
            { word: 'मनसिकर्तुम्', context: { verb: 'कृ', meaning: 'to think' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply optionally to "${word}" with meaning "${context.meaning}"`, () => {
                const result = isGatiUrasiManasi(word, context);
                expect(result.applies).toBe(true);
                expect(result.optional).toBe(true);
            });
        });
    });

    // Negative Test Cases (20 tests)
    describe('Negative Cases', () => {
        const negativeCases = [
            // anatyādhāna condition: meaning is 'placing'
            { word: 'urasikṛtya pāṇim', context: { verb: 'kṛ', meaning: 'placing' } },
            { word: 'उरसिकृत्य पाणिम्', context: { verb: 'कृ', meaning: 'placing' } },
            { word: 'manasikṛtya viṣayam', context: { verb: 'kṛ', meaning: 'placing' } },
            { word: 'मनसिकृत्य विषयम्', context: { verb: 'कृ', meaning: 'placing' } },

            // Wrong verb
            { word: 'urasigacchati', context: { verb: 'gam', meaning: 'accepting' } },
            { word: 'उरसिगच्छति', context: { verb: 'गम्', meaning: 'accepting' } },
            { word: 'manasibhavati', context: { verb: 'bhū', meaning: 'pondering' } },
            { word: 'मनसिभवति', context: { verb: 'भू', meaning: 'pondering' } },

            // Word is not urasi or manasi
            { word: 'hastekṛtya', context: { verb: 'kṛ', meaning: 'taking in hand' } },
            { word: 'हस्तेकृत्य', context: { verb: 'कृ', meaning: 'taking in hand' } },
            { word: 'śirasi kṛtvā', context: { verb: 'kṛ', meaning: 'placing on head' } },
            { word: 'शिरसि कृत्वा', context: { verb: 'कृ', meaning: 'placing on head' } },

            // Incomplete word
            { word: 'urasi', context: { verb: 'kṛ', meaning: 'accepting' } },
            { word: 'उरसि', context: { verb: 'कृ', meaning: 'accepting' } },
            { word: 'manasi', context: { verb: 'kṛ', meaning: 'pondering' } },
            { word: 'मनसि', context: { verb: 'कृ', meaning: 'pondering' } },
            { word: 'kṛtya', context: { verb: 'kṛ', meaning: 'accepting' } },
            { word: 'कृत्य', context: { verb: 'कृ', meaning: 'pondering' } },
            { word: 'anyat kṛtvā', context: { verb: 'kṛ', meaning: 'doing something else' } },
            { word: 'अन्यत् कृत्वा', context: { verb: 'कृ', meaning: 'doing something else' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}" with meaning "${context.meaning}"`, () => {
                const result = isGatiUrasiManasi(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiUrasiManasi(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiUrasiManasi(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiUrasiManasi(123);
            expect(result.applies).toBe(false);
        });

        test('should handle empty string', () => {
            const result = isGatiUrasiManasi('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiUrasiManasi('urasikṛtya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context', () => {
            const result = isGatiUrasiManasi('urasikṛtya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context missing verb', () => {
            const result = isGatiUrasiManasi('urasikṛtya', { meaning: 'accepting' });
            expect(result.applies).toBe(false);
        });

        test('should handle context missing meaning', () => {
            const result = isGatiUrasiManasi('urasikṛtya', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should handle context with null meaning', () => {
            const result = isGatiUrasiManasi('urasikṛtya', { verb: 'kṛ', meaning: null });
            expect(result.applies).toBe(false);
        });

        test('should handle context with non-string meaning', () => {
            const result = isGatiUrasiManasi('urasikṛtya', { verb: 'kṛ', meaning: 123 });
            expect(result.applies).toBe(false);
        });
    });
});
