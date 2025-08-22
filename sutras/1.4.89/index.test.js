import sutra from './index.js';

describe("Sutra 1.4.89: ṛte abhāvārthe", () => {
    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "ṛte" and meaning is "abhāvārtha"', () => {
        const result = sutra('ṛte', { meaning: 'abhāvārtha' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "ṛte" and meaning is "without"', () => {
        const result = sutra('ṛte', { meaning: 'without' });
        expect(result.applies).toBe(true);
    });

    test('IAST: Should apply when particle is "ṛte" and meaning is "absence"', () => {
        const result = sutra('ṛte', { meaning: 'absence' });
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case (ṛte) ${i + 1}`, () => {
            const result = sutra('ṛte', { meaning: 'abhāvārtha', note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "ऋते" and meaning is "abhāvārtha"', () => {
        const result = sutra('ऋते', { meaning: 'abhāvārtha' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "ऋते" and meaning is "without"', () => {
        const result = sutra('ऋते', { meaning: 'without' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "ऋते" and meaning is "absence"', () => {
        const result = sutra('ऋते', { meaning: 'absence' });
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case (ऋते) ${i + 1}`, () => {
            const result = sutra('ऋते', { meaning: 'without', note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "ṛte"', () => {
        const result = sutra('anu', { meaning: 'abhāvārtha' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not correct', () => {
        const result = sutra('ṛte', { meaning: 'direction' });
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
            const result = sutra('ṛte', { meaning: `wrong-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutra(null, { meaning: 'abhāvārtha' });
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles undefined context', () => {
        const result = sutra('ṛte', undefined);
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles context with no meaning property', () => {
        const result = sutra('ṛte', {});
        expect(result.applies).toBe(false);
    });
});
