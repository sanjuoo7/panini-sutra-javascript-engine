import sutra from './index.js';

describe("Sutra 1.4.86: prati sāmye", () => {
    // Positive Test Cases (IAST)
    test('IAST: Should apply when particle is "prati" and meaning is "sāmya"', () => {
        const result = sutra('prati', { meaning: 'sāmya' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('IAST: Should apply when particle is "prati" and meaning is "equality"', () => {
        const result = sutra('prati', { meaning: 'equality' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Positive case ${i + 1}`, () => {
            const result = sutra('prati', { meaning: 'sāmya', note: `test case ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: Should apply when particle is "प्रति" and meaning is "sāmya"', () => {
        const result = sutra('प्रति', { meaning: 'sāmya' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('Devanagari: Should apply when particle is "प्रति" and meaning is "equality"', () => {
        const result = sutra('प्रति', { meaning: 'equality' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    test('Devanagari: Should apply when particle is "प्रति" and meaning is "समानता"', () => {
        const result = sutra('प्रति', { meaning: 'समानता' });
        expect(result.applies).toBe(true);
        expect(result.designation).toBe('karmapravacanīya');
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Positive case ${i + 1}`, () => {
            const result = sutra('प्रति', { meaning: 'sāmya', note: `परीक्षणं ${i}` });
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply if particle is not "prati"', () => {
        const result = sutra('upa', { meaning: 'sāmya' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if meaning is not correct', () => {
        const result = sutra('prati', { meaning: 'lakṣaṇa' });
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is "प्रति" but meaning is wrong', () => {
        const result = sutra('प्रति', { meaning: "tṛtīyā'rtha" });
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Wrong particle`, () => {
            const result = sutra(`pari${i}`, { meaning: 'sāmya' });
            expect(result.applies).toBe(false);
        });
    }

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 11}: Wrong meaning`, () => {
            const result = sutra('prati', { meaning: `some-other-meaning-${i}` });
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles null particle', () => {
        const result = sutra(null, { meaning: 'sāmya' });
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles undefined context', () => {
        const result = sutra('prati', undefined);
        expect(result.error || result.applies === false).toBeTruthy();
    });

    test('Handles context with no meaning property', () => {
        const result = sutra('prati', {});
        expect(result.applies).toBe(false);
    });

    test('Handles empty string as particle', () => {
        const result = sutra('', { meaning: 'sāmya' });
        expect(result.applies).toBe(false);
    });
});
