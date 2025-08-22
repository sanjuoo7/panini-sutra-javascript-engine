import sutra from './index.js';

describe("Sutra 1.4.87: yāvad-arthe", () => {
    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "yāvat" and meaning is "yāvad-artha"', () => {
        const result = sutra('yāvat', { meaning: 'yāvad-artha' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "yāvat" and meaning is "extent"', () => {
        const result = sutra('yāvat', { meaning: 'extent' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "yāvat" and meaning is "until"', () => {
        const result = sutra('yāvat', { meaning: 'until' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case (yāvad-artha) ${i + 1}`, () => {
            const result = sutra('yāvat', { meaning: 'yāvad-artha', note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "यावत्" and meaning is "yāvad-artha"', () => {
        const result = sutra('यावत्', { meaning: 'yāvad-artha' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "यावत्" and meaning is "extent"', () => {
        const result = sutra('यावत्', { meaning: 'extent' });
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Should apply when particle is "यावत्" and meaning is "until"', () => {
        const result = sutra('यावत्', { meaning: 'until' });
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case (extent) ${i + 1}`, () => {
            const result = sutra('यावत्', { meaning: 'extent', note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "yāvat"', () => {
        const result = sutra('upa', { meaning: 'yāvad-artha' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not valid', () => {
        const result = sutra('yāvat', { meaning: 'adhika' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is "यावत्" but meaning is wrong', () => {
        const result = sutra('यावत्', { meaning: 'lakṣaṇa' });
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Wrong particle`, () => {
            const result = sutra(`ati${i}`, { meaning: 'yāvad-artha' });
            expect(result.applies).toBe(false);
        });
    }

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 11}: Wrong meaning`, () => {
            const result = sutra('yāvat', { meaning: `wrong-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutra(null, { meaning: 'yāvad-artha' });
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles undefined context', () => {
        const result = sutra('yāvat', undefined);
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles context with no meaning property', () => {
        const result = sutra('yāvat', {});
        expect(result.applies).toBe(false);
    });
});
