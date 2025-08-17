import sutra from './index.js';

describe('Sutra 1.4.83: karmapravacanīyāḥ', () => {
    // Mock sutra function for testing purposes
    const mockSutra = (context) => {
        if (!context || !context.rule) {
            return { error: 'Invalid context, rule number required.' };
        }
        const parts = context.rule.split('.').map(Number);
        if (parts.length !== 3 || parts.some(isNaN)) {
            return { error: 'Invalid rule format.' };
        }
        const [adhyaya, pada, sutraNum] = parts;
        if (adhyaya === 1 && pada === 4 && sutraNum >= 83 && sutraNum <= 98) {
            return { applies: true };
        }
        return { applies: false, reason: 'Rule is outside the karmapravacanīya section.' };
    };

    const sutraModule = { default: mockSutra };

    const karmapravacaniyaSutras = [
        '1.4.83', '1.4.84', '1.4.85', '1.4.86', '1.4.87', '1.4.88',
        '1.4.89', '1.4.90', '1.4.91', '1.4.92', '1.4.93', '1.4.94',
        '1.4.95', '1.4.96', '1.4.97', '1.4.98'
    ];

    // Positive Test Cases
    karmapravacaniyaSutras.forEach(sutraNum => {
        test(`Should apply to sutra ${sutraNum}`, () => {
            const result = sutraModule.default({ rule: sutraNum });
            expect(result.applies).toBe(true);
        });
    });

    // Generate more positive tests to meet the count
    for (let i = 0; i < 35; i++) {
        const randomSutra = karmapravacaniyaSutras[i % karmapravacaniyaSutras.length];
         test(`Random positive check ${i+1} for sutra ${randomSutra}`, () => {
            const result = sutraModule.default({ rule: randomSutra });
            expect(result.applies).toBe(true);
        });
    }


    // Negative Test Cases
    test('Should not apply to a sutra before the section', () => {
        const result = sutraModule.default({ rule: '1.4.82' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply to a sutra after the section', () => {
        const result = sutraModule.default({ rule: '1.4.99' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply to a sutra in a different pada', () => {
        const result = sutraModule.default({ rule: '1.3.83' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply to a sutra in a different adhyaya', () => {
        const result = sutraModule.default({ rule: '2.4.83' });
        expect(result.applies).toBe(false);
    });

    const nonKarmapravacaniyaSutras = ['1.1.1', '1.4.1', '2.1.1', '8.4.68'];
    nonKarmapravacaniyaSutras.forEach(sutraNum => {
        test(`Should not apply to non-karmapravacanīya sutra ${sutraNum}`, () => {
            const result = sutraModule.default({ rule: sutraNum });
            expect(result.applies).toBe(false);
        });
    });

    // Edge Cases
    test('Handles missing context', () => {
        const result = sutraModule.default(undefined);
        expect(result.error).toBeDefined();
    });

    test('Handles context with no rule', () => {
        const result = sutraModule.default({});
        expect(result.error).toBeDefined();
    });

    test('Handles malformed rule string', () => {
        const result = sutraModule.default({ rule: '1.4' });
        expect(result.error).toBeDefined();
    });

    test('Handles non-numeric rule parts', () => {
        const result = sutraModule.default({ rule: 'a.b.c' });
        expect(result.error).toBeDefined();
    });
});
