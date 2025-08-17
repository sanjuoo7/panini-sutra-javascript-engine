import applyGati from './index.js';

describe('Sutra 1.4.80: te prāgdhātoḥ', () => {
    // Positive Test Cases (40 tests)
    describe('Positive Cases: Prepending gati to verbs', () => {
        const testCases = [
            // Simple concatenation
            { gati: 'pra', verb: 'bhavati', expected: 'prabhavati' },
            { gati: 'upa', verb: 'karoti', expected: 'upakaroti' },
            { gati: 'sam', verb: 'gacchate', expected: 'saṃgacchate' }, // with anusvāra
            { gati: 'anu', verb: 'dhāvati', expected: 'anudhāvati' },
            { gati: 'apa', verb: 'harati', expected: 'apaharati' },
            { gati: 'ni', verb: 'patati', expected: 'nipatati' },
            { gati: 'dus', verb: 'carati', expected: 'duścarati' }, // sandhi
            { gati: 'vi', verb: 'jayati', expected: 'vijayati' },
            { gati: 'ā', verb: 'gacchati', expected: 'āgacchati' },
            { gati: 'adhi', verb: 'vasati', expected: 'adhivasati' },
            { gati: 'su', verb: 'uktam', expected: 'sūktam' }, // dīrgha sandhi
            { gati: 'ati', verb: 'iva', expected: 'atīva' }, // dīrgha sandhi

            // Sandhi cases
            { gati: 'pra', verb: 'eti', expected: 'praiti' }, // vṛddhi
            { gati: 'upa', verb: 'eti', expected: 'upaiti' }, // vṛddhi
            { gati: 'prati', verb: 'ekam', expected: 'pratyekam' }, // yaṇ
            { gati: 'anu', verb: 'ayaḥ', expected: 'anvayaḥ' }, // yaṇ
            { gati: 'abhi', verb: 'āgataḥ', expected: 'abhyāgataḥ' }, // yaṇ
            { gati: 'upa', verb: 'ikṣate', expected: 'upekṣate' }, // guṇa
            { gati: 'ava', verb: 'īkṣate', expected: 'avekṣate' }, // guṇa
            { gati: 'pari', verb: 'āvaraṇam', expected: 'paryāvaraṇam' }, // yaṇ

            // Devanagari
            { gati: 'प्र', verb: 'भवति', expected: 'प्रभवति' },
            { gati: 'उप', verb: 'करोति', expected: 'उपकरोति' },
            { gati: 'सम्', verb: 'गच्छते', expected: 'संगच्छते' },
            { gati: 'अनु', verb: 'धावति', expected: 'अनुधावति' },
            { gati: 'अप', verb: 'हरति', expected: 'अपहरति' },
            { gati: 'नि', verb: 'पतति', expected: 'निपतति' },
            { gati: 'दुस्', verb: 'चरति', expected: 'दुश्चरति' },
            { gati: 'वि', verb: 'जयति', expected: 'विजयति' },
            { gati: 'आ', verb: 'गच्छति', expected: 'आगच्छति' },
            { gati: 'अधि', verb: 'वसति', expected: 'अधिवसति' },
            { gati: 'सु', verb: 'उक्तम्', expected: 'सूक्तम्' },
            { gati: 'अति', verb: 'इव', expected: 'अतीव' },
            { gati: 'प्र', verb: 'एति', expected: 'प्रैति' },
            { gati: 'उप', verb: 'एति', expected: 'उपैति' },
            { gati: 'प्रति', verb: 'एकम्', expected: 'प्रत्येकम्' },
            { gati: 'अनु', verb: 'अयः', expected: 'अन्वयः' },
            { gati: 'अभि', verb: 'आगतः', expected: 'अभ्यागतः' },
            { gati: 'उप', verb: 'ईक्षते', expected: 'उपेक्षते' },
        ];

        testCases.forEach(({ gati, verb, expected }) => {
            test(`should prepend "${gati}" to "${verb}" to get "${expected}"`, () => {
                const result = applyGati(gati, verb);
                expect(result).toBe(expected);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle empty gati', () => {
            const result = applyGati('', 'bhavati');
            expect(result).toBe('bhavati');
        });

        test('should handle empty verb', () => {
            const result = applyGati('pra', '');
            expect(result).toBe('pra');
        });

        test('should handle both empty', () => {
            const result = applyGati('', '');
            expect(result).toBe('');
        });

        test('should handle null gati', () => {
            const result = applyGati(null, 'bhavati');
            expect(result).toBe('bhavati');
        });

        test('should handle null verb', () => {
            const result = applyGati('pra', null);
            expect(result).toBe('pra');
        });

        test('should handle undefined gati', () => {
            const result = applyGati(undefined, 'bhavati');
            expect(result).toBe('bhavati');
        });

        test('should handle undefined verb', () => {
            const result = applyGati('pra', undefined);
            expect(result).toBe('pra');
        });

        test('should handle non-string gati', () => {
            const result = applyGati(123, 'bhavati');
            expect(result).toBe('123bhavati');
        });

        test('should handle non-string verb', () => {
            const result = applyGati('pra', 456);
            expect(result).toBe('pra456');
        });

        test('should handle multiple gatis (chaining)', () => {
            const result1 = applyGati('sam', 'āgacchati');
            const result2 = applyGati('abhi', result1);
            expect(result2).toBe('abhisamāgacchati');
        });
    });
});
