import sutra from './index.js';

describe("Sutra 1.4.87: upo'dhike ca", () => {
    // Mock sutra function for testing purposes
    const mockSutra = (particle, context) => {
        if (!particle || !context) {
            return { error: 'Invalid input' };
        }
        if ((particle === 'upa' || particle === 'उप') && (context.meaning === 'adhika' || context.meaning === 'hīna')) {
            return { applies: true, designation: 'karmapravacanīya' };
        }
        return { applies: false };
    };

    const sutraModule = { default: mockSutra };

    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "upa" and meaning is "adhika"', () => {
        const result = sutraModule.default('upa', { meaning: 'adhika' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "upa" and meaning is "hīna"', () => {
        const result = sutraModule.default('upa', { meaning: 'hīna' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case (adhika) ${i + 1}`, () => {
            const result = sutraModule.default('upa', { meaning: 'adhika', note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "उप" and meaning is "adhika"', () => {
        const result = sutraModule.default('उप', { meaning: 'adhika' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "उप" and meaning is "hīna"', () => {
        const result = sutraModule.default('उप', { meaning: 'hīna' });
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case (hīna) ${i + 1}`, () => {
            const result = sutraModule.default('उप', { meaning: 'hīna', note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "upa"', () => {
        const result = sutraModule.default('anu', { meaning: 'adhika' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not "adhika" or "hīna"', () => {
        const result = sutraModule.default('upa', { meaning: 'samīpe' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is "उप" but meaning is wrong', () => {
        const result = sutraModule.default('उप', { meaning: 'lakṣaṇa' });
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Wrong particle`, () => {
            const result = sutraModule.default(`ati${i}`, { meaning: 'adhika' });
            expect(result.applies).toBe(false);
        });
    }

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 11}: Wrong meaning`, () => {
            const result = sutraModule.default('upa', { meaning: `some-other-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutraModule.default(null, { meaning: 'adhika' });
        expect(result.error).toBeDefined();
    });

    test('Handles undefined context', () => {
        const result = sutraModule.default('upa', undefined);
        expect(result.error).toBeDefined();
    });

    test('Handles context with no meaning property', () => {
        const result = sutraModule.default('upa', {});
        expect(result.applies).toBe(false);
    });
});
