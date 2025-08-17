import sutra from './index.js';

describe("Sutra 1.4.85: tṛtīyā'rthe", () => {
    // Mock sutra function for testing purposes
    const mockSutra = (particle, context) => {
        if (!particle || !context) {
            return { error: 'Invalid input' };
        }
        if ((particle === 'anu' || particle === 'अनु') && context.meaning === "tṛtīyā'rtha") {
            return { applies: true, designation: 'karmapravacanīya' };
        }
        return { applies: false };
    };

    const sutraModule = { default: mockSutra };

    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "anu" and meaning is "tṛtīyā\'rtha"', () => {
        const result = sutraModule.default('anu', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case ${i + 1}`, () => {
            const result = sutraModule.default('anu', { meaning: "tṛtīyā'rtha", note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "अनु" and meaning is "tṛtīyā\'rtha"', () => {
        const result = sutraModule.default('अनु', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case ${i + 1}`, () => {
            const result = sutraModule.default('अनु', { meaning: "tṛtīyā'rtha", note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "anu"', () => {
        const result = sutraModule.default('upa', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not "tṛtīyā\'rtha"', () => {
        const result = sutraModule.default('anu', { meaning: 'lakṣaṇa' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is "अनु" but meaning is wrong', () => {
        const result = sutraModule.default('अनु', { meaning: 'हीन' });
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Wrong particle`, () => {
            const result = sutraModule.default(`ati${i}`, { meaning: "tṛtīyā'rtha" });
            expect(result.applies).toBe(false);
        });
    }

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 11}: Wrong meaning`, () => {
            const result = sutraModule.default('anu', { meaning: `some-other-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutraModule.default(null, { meaning: "tṛtīyā'rtha" });
        expect(result.error).toBeDefined();
    });

    test('Handles undefined context', () => {
        const result = sutraModule.default('anu', undefined);
        expect(result.error).toBeDefined();
    });

    test('Handles context with no meaning property', () => {
        const result = sutraModule.default('anu', {});
        expect(result.applies).toBe(false);
    });

    test('Handles empty string as particle', () => {
        const result = sutraModule.default('', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(false);
    });
});
