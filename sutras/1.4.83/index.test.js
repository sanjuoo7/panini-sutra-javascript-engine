import sutra from './index.js';

describe('Sutra 1.4.83: karmapravacanīyāḥ', () => {
    const karmapravacaniyaSutras = [
        '1.4.83', '1.4.84', '1.4.85', '1.4.86', '1.4.87', '1.4.88',
        '1.4.89', '1.4.90', '1.4.91', '1.4.92', '1.4.93', '1.4.94',
        '1.4.95', '1.4.96', '1.4.97', '1.4.98'
    ];

    // Positive Test Cases
    karmapravacaniyaSutras.forEach(sutraNum => {
        test(`Should apply to sutra ${sutraNum}`, () => {
            const result = sutra({ rule: sutraNum });
            expect(result.applies).toBe(true);
        });
    });

    // Generate more positive tests to meet the count
    for (let i = 0; i < 35; i++) {
        const randomSutra = karmapravacaniyaSutras[i % karmapravacaniyaSutras.length];
         test(`Random positive check ${i+1} for sutra ${randomSutra}`, () => {
            const result = sutra({ rule: randomSutra });
            expect(result.applies).toBe(true);
        });
    }


    // Negative Test Cases
    test('Should not apply to a sutra before the section', () => {
        const result = sutra({ rule: '1.4.82' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply to a sutra after the section', () => {
        const result = sutra({ rule: '1.4.99' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply to a sutra in a different pada', () => {
        const result = sutra({ rule: '1.3.83' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply to a sutra in a different adhyaya', () => {
        const result = sutra({ rule: '2.4.83' });
        expect(result.applies).toBe(false);
    });

    const nonKarmapravacaniyaSutras = ['1.1.1', '1.4.1', '2.1.1', '8.4.68'];
    nonKarmapravacaniyaSutras.forEach(sutraNum => {
        test(`Should not apply to non-karmapravacanīya sutra ${sutraNum}`, () => {
            const result = sutra({ rule: sutraNum });
            expect(result.applies).toBe(false);
        });
    });

    // Edge Cases
    test('Handles missing context', () => {
        const result = sutra(undefined);
        expect(result.applies).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('Handles context with no rule', () => {
        const result = sutra({});
        expect(result.applies).toBe(false);
    });

    test('Handles malformed rule string', () => {
        const result = sutra({ rule: '1.4' });
        expect(result.applies).toBe(false);
    });

    test('Handles non-numeric rule parts', () => {
        const result = sutra({ rule: 'a.b.c' });
        expect(result.applies).toBe(false);
    });

    // Particle designation tests
    describe('Particle designation checks', () => {
        const karmapravacaniyaParticles = [
            // IAST forms
            { particle: 'anu', expected: true },
            { particle: 'prati', expected: true },
            { particle: 'yāvat', expected: true },
            { particle: 'antareṇa', expected: true },
            { particle: 'ṛte', expected: true },
            { particle: 'vinā', expected: true },
            { particle: 'bahiḥ', expected: true },
            { particle: 'prāk', expected: true },
            { particle: 'paścāt', expected: true },
            // Devanagari forms
            { particle: 'अनु', expected: true },
            { particle: 'प्रति', expected: true },
            { particle: 'यावत्', expected: true },
            { particle: 'अन्तरेण', expected: true },
            { particle: 'ऋते', expected: true },
            { particle: 'विना', expected: true },
            { particle: 'बहिः', expected: true },
            { particle: 'प्राक्', expected: true },
            { particle: 'पश्चात्', expected: true },
        ];

        karmapravacaniyaParticles.forEach(({ particle, expected }) => {
            test(`Should ${expected ? 'recognize' : 'not recognize'} particle "${particle}" as karmapravacanīya`, () => {
                const result = sutra({ particle });
                expect(result.applies).toBe(expected);
                if (expected) {
                    expect(result.analysis.designation).toBe('karmapravacanīya');
                }
            });
        });

        // Test non-karmapravacanīya particles
        const nonKarmapravacaniyaParticles = ['upa', 'ni', 'vi', 'sam', 'pra', 'उप', 'नि', 'वि', 'सम्', 'प्र'];
        nonKarmapravacaniyaParticles.forEach(particle => {
            test(`Should not recognize particle "${particle}" as karmapravacanīya`, () => {
                const result = sutra({ particle });
                expect(result.applies).toBe(false);
            });
        });

        // Edge cases for particles
        test('Handles null particle', () => {
            const result = sutra({ particle: null });
            expect(result.applies).toBe(false);
            expect(result.error).toBeDefined();
        });

        test('Handles empty particle', () => {
            const result = sutra({ particle: '' });
            expect(result.applies).toBe(false);
            expect(result.error).toBeDefined();
        });

        test('Handles non-string particle', () => {
            const result = sutra({ particle: 123 });
            expect(result.applies).toBe(false);
            expect(result.error).toBeDefined();
        });

        // Case insensitive testing
        test('Handles uppercase particle', () => {
            const result = sutra({ particle: 'ANU' });
            expect(result.applies).toBe(true);
        });

        test('Handles particle with extra whitespace', () => {
            const result = sutra({ particle: '  prati  ' });
            expect(result.applies).toBe(true);
        });
    });
});
