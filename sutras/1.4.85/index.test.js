import sutra from './index.js';

describe("Sutra 1.4.85: tṛtīyā'rthe", () => {
    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "anu" and meaning is "tṛtīyā\'rtha"', () => {
        const result = sutra('anu', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case ${i + 1}`, () => {
            const result = sutra('anu', { meaning: "tṛtīyā'rtha", note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "अनु" and meaning is "tṛtīyā\'rtha"', () => {
        const result = sutra('अनु', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case ${i + 1}`, () => {
            const result = sutra('अनु', { meaning: "tṛtīyā'rtha", note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "anu"', () => {
        const result = sutra('upa', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not "tṛtīyā\'rtha"', () => {
        const result = sutra('anu', { meaning: 'lakṣaṇa' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is "अनु" but meaning is wrong', () => {
        const result = sutra('अनु', { meaning: 'हीन' });
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Wrong particle`, () => {
            const result = sutra(`ati${i}`, { meaning: "tṛtīyā'rtha" });
            expect(result.applies).toBe(false);
        });
    }

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 11}: Wrong meaning`, () => {
            const result = sutra('anu', { meaning: `some-other-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutra(null, { meaning: "tṛtīyā'rtha" });
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles undefined context', () => {
        const result = sutra('anu', undefined);
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles context with no meaning property', () => {
        const result = sutra('anu', {});
        expect(result.applies).toBe(false);
    });

    test('Handles empty string as particle', () => {
        const result = sutra('', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(false);
    });
});
