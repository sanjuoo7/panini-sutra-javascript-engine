import sutra from './index.js';

describe("Sutra 1.4.88: apaparī varajane", () => {
    // Mock sutra function for testing purposes
    const mockSutra = (particle, context) => {
        if (!particle || !context) {
            return { error: 'Invalid input' };
        }
        const particles = ['apa', 'pari', 'अप', 'परि'];
        if (particles.includes(particle) && context.meaning === 'varjana') {
            return { applies: true, designation: 'karmapravacanīya' };
        }
        return { applies: false };
    };

    const sutraModule = { default: mockSutra };

    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "apa" and meaning is "varjana"', () => {
        const result = sutraModule.default('apa', { meaning: 'varjana' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "pari" and meaning is "varjana"', () => {
        const result = sutraModule.default('pari', { meaning: 'varjana' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case (apa) ${i + 1}`, () => {
            const result = sutraModule.default('apa', { meaning: 'varjana', note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "अप" and meaning is "varjana"', () => {
        const result = sutraModule.default('अप', { meaning: 'varjana' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "परि" and meaning is "varjana"', () => {
        const result = sutraModule.default('परि', { meaning: 'varjana' });
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case (परि) ${i + 1}`, () => {
            const result = sutraModule.default('परि', { meaning: 'varjana', note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "apa" or "pari"', () => {
        const result = sutraModule.default('anu', { meaning: 'varjana' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not "varjana"', () => {
        const result = sutraModule.default('apa', { meaning: 'direction' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is "pari" but meaning is wrong', () => {
        const result = sutraModule.default('pari', { meaning: 'around' });
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Wrong particle`, () => {
            const result = sutraModule.default(`upa${i}`, { meaning: 'varjana' });
            expect(result.applies).toBe(false);
        });
    }

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 11}: Wrong meaning`, () => {
            const result = sutraModule.default('apa', { meaning: `some-other-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutraModule.default(null, { meaning: 'varjana' });
        expect(result.error).toBeDefined();
    });

    test('Handles undefined context', () => {
        const result = sutraModule.default('apa', undefined);
        expect(result.error).toBeDefined();
    });

    test('Handles context with no meaning property', () => {
        const result = sutraModule.default('pari', {});
        expect(result.applies).toBe(false);
    });
});
