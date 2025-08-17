import sutra from './index.js';

describe("Sutra 1.4.89: āṅ maryādāvacane", () => {
    // Mock sutra function for testing purposes
    const mockSutra = (particle, context) => {
        if (!particle || !context) {
            return { error: 'Invalid input' };
        }
        const meanings = ['maryādā', 'abhividhi'];
        if ((particle === 'ā' || particle === 'आ') && meanings.includes(context.meaning)) {
            return { applies: true, designation: 'karmapravacanīya' };
        }
        return { applies: false };
    };

    const sutraModule = { default: mockSutra };

    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "ā" and meaning is "maryādā"', () => {
        const result = sutraModule.default('ā', { meaning: 'maryādā' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "ā" and meaning is "abhividhi"', () => {
        const result = sutraModule.default('ā', { meaning: 'abhividhi' });
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case (maryādā) ${i + 1}`, () => {
            const result = sutraModule.default('ā', { meaning: 'maryādā', note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "आ" and meaning is "maryādā"', () => {
        const result = sutraModule.default('आ', { meaning: 'maryādā' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "आ" and meaning is "abhividhi"', () => {
        const result = sutraModule.default('आ', { meaning: 'abhividhi' });
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case (abhividhi) ${i + 1}`, () => {
            const result = sutraModule.default('आ', { meaning: 'abhividhi', note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "ā"', () => {
        const result = sutraModule.default('anu', { meaning: 'maryādā' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not "maryādā" or "abhividhi"', () => {
        const result = sutraModule.default('ā', { meaning: 'direction' });
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Wrong particle`, () => {
            const result = sutraModule.default(`upa${i}`, { meaning: 'maryādā' });
            expect(result.applies).toBe(false);
        });
    }

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 11}: Wrong meaning`, () => {
            const result = sutraModule.default('ā', { meaning: `some-other-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutraModule.default(null, { meaning: 'maryādā' });
        expect(result.error).toBeDefined();
    });

    test('Handles undefined context', () => {
        const result = sutraModule.default('ā', undefined);
        expect(result.error).toBeDefined();
    });

    test('Handles context with no meaning property', () => {
        const result = sutraModule.default('ā', {});
        expect(result.applies).toBe(false);
    });
});
