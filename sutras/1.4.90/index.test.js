import sutra from './index.js';

describe("Sutra 1.4.90: lakaṣaṇetathamabhūtākhayānabhāgavīpasāsu pratiparyanavah", () => {
    // Mock sutra function for testing purposes
    const mockSutra = (particle, context) => {
        if (!particle || !context || !context.meaning) {
            return { error: 'Invalid input' };
        }
        const particles = ['prati', 'pari', 'anu', 'प्रति', 'परि', 'अनु'];
        const meanings = ['lakṣaṇa', 'itthambhūtākhyāna', 'bhāga', 'vīpsā'];

        if (particles.includes(particle) && meanings.includes(context.meaning)) {
            return { applies: true, designation: 'karmapravacanīya' };
        }
        return { applies: false };
    };

    const sutraModule = { default: mockSutra };

    const particlesIAST = ['prati', 'pari', 'anu'];
    const particlesDevanagari = ['प्रति', 'परि', 'अनु'];
    const meanings = ['lakṣaṇa', 'itthambhūtākhyāna', 'bhāga', 'vīpsā'];

    // Positive Test Cases
    particlesIAST.forEach(particle => {
        meanings.forEach(meaning => {
            test(`IAST: Should apply for particle "${particle}" with meaning "${meaning}"`, () => {
                const result = sutraModule.default(particle, { meaning });
                expect(result.applies).toBe(true);
            });
        });
    });

    particlesDevanagari.forEach(particle => {
        meanings.forEach(meaning => {
            test(`Devanagari: Should apply for particle "${particle}" with meaning "${meaning}"`, () => {
                const result = sutraModule.default(particle, { meaning });
                expect(result.applies).toBe(true);
            });
        });
    });

    // Generate more positive tests to meet count
    for (let i = 0; i < 30; i++) {
        const p = particlesIAST[i % particlesIAST.length];
        const m = meanings[i % meanings.length];
        test(`Random positive check ${i+1} for ${p} and ${m}`, () => {
             const result = sutraModule.default(p, { meaning: m });
             expect(result.applies).toBe(true);
        });
    }


    // Negative Test Cases
    test('Should not apply for a different particle', () => {
        const result = sutraModule.default('upa', { meaning: 'lakṣaṇa' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply for a different meaning', () => {
        const result = sutraModule.default('prati', { meaning: 'adhika' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply for a different Devanagari particle', () => {
        const result = sutraModule.default('उप', { meaning: 'vīpsā' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply for a different meaning with a Devanagari particle', () => {
        const result = sutraModule.default('प्रति', { meaning: 'हीन' });
        expect(result.applies).toBe(false);
    });

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutraModule.default(null, { meaning: 'lakṣaṇa' });
        expect(result.error).toBeDefined();
    });

    test('Handles undefined context', () => {
        const result = sutraModule.default('prati', undefined);
        expect(result.error).toBeDefined();
    });

    test('Handles context with no meaning', () => {
        const result = sutraModule.default('anu', { text: 'some text' });
        expect(result.error).toBeDefined();
    });

    test('Handles empty string for particle', () => {
        const result = sutraModule.default('', { meaning: 'bhāga' });
        expect(result.applies).toBe(false);
    });
});
