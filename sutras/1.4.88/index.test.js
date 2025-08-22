import sutra from './index.js';

describe("Sutra 1.4.88: antareṇa abhāvārthe", () => {
    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "antareṇa" and meaning is "abhāvārtha"', () => {
        const result = sutra('antareṇa', { meaning: 'abhāvārtha' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "antareṇa" and meaning is "without"', () => {
        const result = sutra('antareṇa', { meaning: 'without' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "antareṇa" and meaning is "absence"', () => {
        const result = sutra('antareṇa', { meaning: 'absence' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case (antareṇa) ${i + 1}`, () => {
            const result = sutra('antareṇa', { meaning: 'abhāvārtha', note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "अन्तरेण" and meaning is "abhāvārtha"', () => {
        const result = sutra('अन्तरेण', { meaning: 'abhāvārtha' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "अन्तरेण" and meaning is "without"', () => {
        const result = sutra('अन्तरेण', { meaning: 'without' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "अन्तरेण" and meaning is "absence"', () => {
        const result = sutra('अन्तरेण', { meaning: 'absence' });
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case (अन्तरेण) ${i + 1}`, () => {
            const result = sutra('अन्तरेण', { meaning: 'without', note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "antareṇa"', () => {
        const result = sutra('anu', { meaning: 'abhāvārtha' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not correct', () => {
        const result = sutra('antareṇa', { meaning: 'direction' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is "अन्तरेण" but meaning is wrong', () => {
        const result = sutra('अन्तरेण', { meaning: 'lakṣaṇa' });
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Wrong particle`, () => {
            const result = sutra(`upa${i}`, { meaning: 'abhāvārtha' });
            expect(result.applies).toBe(false);
        });
    }

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 11}: Wrong meaning`, () => {
            const result = sutra('antareṇa', { meaning: `some-other-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutra(null, { meaning: 'abhāvārtha' });
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles undefined context', () => {
        const result = sutra('antareṇa', undefined);
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles context with no meaning property', () => {
        const result = sutra('antareṇa', {});
        expect(result.applies).toBe(false);
    });
});
