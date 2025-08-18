import applyGati from './index.js';

describe('Sutra 1.4.80: te prāgdhātoḥ', () => {
    describe('Positive Cases: Prepending gati to verbs', () => {
        const testCases = [
            // Simple concatenation
            { gati: 'pra', verb: 'bhavati', expected: 'prabhavati', sandhi_rule: null },
            { gati: 'upa', verb: 'karoti', expected: 'upakaroti', sandhi_rule: null },
            { gati: 'sam', verb: 'gacchate', expected: 'saṃgacchate', sandhi_rule: 'anusvāra' },
            { gati: 'anu', verb: 'dhāvati', expected: 'anudhāvati', sandhi_rule: null },
            { gati: 'apa', verb: 'harati', expected: 'apaharati', sandhi_rule: null },
            { gati: 'ni', verb: 'patati', expected: 'nipatati', sandhi_rule: null },
            { gati: 'dus', verb: 'carati', expected: 'duścarati', sandhi_rule: 'schutva' },
            { gati: 'vi', verb: 'jayati', expected: 'vijayati', sandhi_rule: null },
            { gati: 'ā', verb: 'gacchati', expected: 'āgacchati', sandhi_rule: null },
            { gati: 'adhi', verb: 'vasati', expected: 'adhivasati', sandhi_rule: null },

            // Savarna Dīrgha Sandhi (Vowel Lengthening)
            { gati: 'su', verb: 'uktam', expected: 'sūktam', sandhi_rule: 'savarṇa-dīrgha' },
            { gati: 'ati', verb: 'iva', expected: 'atīva', sandhi_rule: 'savarṇa-dīrgha' },
            { gati: 'pari', verb: 'īkṣate', expected: 'parīkṣate', sandhi_rule: 'savarṇa-dīrgha' },

            // Guṇa Sandhi
            { gati: 'upa', verb: 'ikṣate', expected: 'upekṣate', sandhi_rule: 'guṇa' },
            { gati: 'ava', verb: 'īkṣate', expected: 'avekṣate', sandhi_rule: 'guṇa' },
            { gati: 'mahā', verb: 'indraḥ', expected: 'mahendraḥ', sandhi_rule: 'guṇa' },

            // Vṛddhi Sandhi
            { gati: 'pra', verb: 'eti', expected: 'praiti', sandhi_rule: 'vṛddhi' },
            { gati: 'upa', verb: 'eti', expected: 'upaiti', sandhi_rule: 'vṛddhi' },
            { gati: 'adya', verb: 'eva', expected: 'adyaiva', sandhi_rule: 'vṛddhi' },

            // Yaṇ Sandhi (Semivowel Conversion)
            { gati: 'prati', verb: 'ekam', expected: 'pratyekam', sandhi_rule: 'yaṇ' },
            { gati: 'anu', verb: 'ayaḥ', expected: 'anvayaḥ', sandhi_rule: 'yaṇ' },
            { gati: 'abhi', verb: 'āgataḥ', expected: 'abhyāgataḥ', sandhi_rule: 'yaṇ' },
            { gati: 'pari', verb: 'āvaraṇam', expected: 'paryāvaraṇam', sandhi_rule: 'yaṇ' },

            // Devanagari
            { gati: 'प्र', verb: 'भवति', expected: 'प्रभवति', sandhi_rule: null },
            { gati: 'उप', verb: 'करोति', expected: 'उपकरोति', sandhi_rule: null },
            { gati: 'सम्', verb: 'गच्छते', expected: 'संगच्छते', sandhi_rule: 'anusvāra' },
            { gati: 'सु', verb: 'उक्तम्', expected: 'सूक्तम्', sandhi_rule: 'savarṇa-dīrgha' },
            { gati: 'अति', verb: 'इव', expected: 'अतीव', sandhi_rule: 'savarṇa-dīrgha' },
            { gati: 'प्र', verb: 'एति', expected: 'प्रैति', sandhi_rule: 'vṛddhi' },
            { gati: 'उप', verb: 'एति', expected: 'उपैति', sandhi_rule: 'vṛddhi' },
            { gati: 'प्रति', verb: 'एकम्', expected: 'प्रत्येकम्', sandhi_rule: 'yaṇ' },
            { gati: 'अनु', verb: 'अयः', expected: 'अन्वयः', sandhi_rule: 'yaṇ' },
            { gati: 'अभि', verb: 'आगतः', expected: 'अभ्यागतः', sandhi_rule: 'yaṇ' },
            { gati: 'उप', verb: 'ईक्षते', expected: 'उपेक्षते', sandhi_rule: 'guṇa' },
        ];

        testCases.forEach(({ gati, verb, expected, sandhi_rule }) => {
            test(`should prepend "${gati}" to "${verb}" to get "${expected}"`, () => {
                const result = applyGati(gati, verb);
                expect(result).toMatchObject({
                    success: true,
                    result: expected,
                    components: { gati, verb },
                    sandhi_rule: sandhi_rule,
                });
            });
        });
    });

    describe('Edge Cases and Error Handling', () => {
        const edgeCases = [
            { gati: '', verb: 'bhavati', description: 'empty gati' },
            { gati: 'pra', verb: '', description: 'empty verb' },
            { gati: '', verb: '', description: 'both empty' },
            { gati: null, verb: 'bhavati', description: 'null gati' },
            { gati: 'pra', verb: null, description: 'null verb' },
            { gati: undefined, verb: 'bhavati', description: 'undefined gati' },
            { gati: 'pra', verb: undefined, description: 'undefined verb' },
            { gati: 123, verb: 'bhavati', description: 'non-string gati' },
            { gati: 'pra', verb: 456, description: 'non-string verb' },
        ];

        edgeCases.forEach(({ gati, verb, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = applyGati(gati, verb);
                expect(result).toMatchObject({
                    success: false,
                    error: expect.any(String),
                });
            });
        });

        test('should handle multiple gatis (chaining)', () => {
            const result1 = applyGati('sam', 'āgacchati');
            const result2 = applyGati('abhi', result1.result);
            expect(result2).toMatchObject({
                success: true,
                result: 'abhisamāgacchati'
            });
        });
    });
});
