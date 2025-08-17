import isGatiJivikaUpanisad from './index.js';

describe('Sutra 1.4.79: jīvikopaniṣadāvaupamaye', () => {
    // Positive Test Cases (24 tests)
    describe('Positive Cases: Mandatory "gati" in the sense of likeness', () => {
        const positiveCases = [
            // IAST - jīvikā
            { word: 'jīvikākṛtya', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'jīvikākaroti', context: { verb: 'kṛ', meaning: 'resemblance' } },
            { word: 'jīvikākṛtam', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'jīvikākariṣyati', context: { verb: 'kṛ', meaning: 'resemblance' } },

            // IAST - upaniṣad
            { word: 'upaniṣatkṛtya', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'upaniṣatkaroti', context: { verb: 'kṛ', meaning: 'resemblance' } },
            { word: 'upaniṣatkṛtam', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'upaniṣatkariṣyati', context: { verb: 'kṛ', meaning: 'resemblance' } },
            { word: 'upaniṣaccakāra', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'upaniṣatkartum', context: { verb: 'kṛ', meaning: 'resemblance' } },
            { word: 'upaniṣatkaraṇam', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'upaniṣatkṛtvā', context: { verb: 'kṛ', meaning: 'resemblance' } },

            // Devanagari - जीविका
            { word: 'जीविकाकृत्य', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'जीविकाकरोति', context: { verb: 'कृ', meaning: 'resemblance' } },
            { word: 'जीविकाकृतम्', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'जीविकाकरिष्यति', context: { verb: 'कृ', meaning: 'resemblance' } },

            // Devanagari - उपनिषद्
            { word: 'उपनिषत्कृत्य', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'उपनिषत्करोति', context: { verb: 'कृ', meaning: 'resemblance' } },
            { word: 'उपनिषत्कृतम्', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'उपनिषत्करिष्यति', context: { verb: 'कृ', meaning: 'resemblance' } },
            { word: 'उपनिषच्चकार', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'उपनिषत्कर्तुम्', context: { verb: 'कृ', meaning: 'resemblance' } },
            { word: 'उपनिषत्करणम्', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'उपनिषत्कृत्वा', context: { verb: 'कृ', meaning: 'resemblance' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply mandatorily to "${word}"`, () => {
                const result = isGatiJivikaUpanisad(word, context);
                expect(result.applies).toBe(true);
                expect(result.optional).toBe(false);
            });
        });
    });

    // Negative Test Cases (20 tests)
    describe('Negative Cases', () => {
        const negativeCases = [
            // Wrong meaning
            { word: 'jīvikākṛtya', context: { verb: 'kṛ', meaning: 'earning' } },
            { word: 'जीविकाकृत्य', context: { verb: 'कृ', meaning: 'earning' } },
            { word: 'upaniṣatkṛtya', context: { verb: 'kṛ', meaning: 'studying' } },
            { word: 'उपनिषत्कृत्य', context: { verb: 'कृ', meaning: 'studying' } },

            // Wrong verb
            { word: 'jīvikāgacchati', context: { verb: 'gam', meaning: 'likeness' } },
            { word: 'जीविकागच्छति', context: { verb: 'गम्', meaning: 'likeness' } },
            { word: 'upaniṣadbhavati', context: { verb: 'bhū', meaning: 'likeness' } },
            { word: 'उपनिषद्भवति', context: { verb: 'भू', meaning: 'likeness' } },

            // Word is not jīvikā or upaniṣad
            { word: 'vedam kṛtvā', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'वेदं कृत्वा', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'anyat kṛtvā', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'अन्यत् कृत्वा', context: { verb: 'कृ', meaning: 'likeness' } },

            // Incomplete words
            { word: 'jīvikā', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'जीविका', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'upaniṣad', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'उपनिषद्', context: { verb: 'कृ', meaning: 'likeness' } },
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'likeness' } },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'likeness' } },

            // Similar sounding words
            { word: 'jīvati', context: { verb: 'jīv', meaning: 'lives' } },
            { word: 'जीवति', context: { verb: 'जीव्', meaning: 'lives' } },
        ];

        negativeCases.forEach(({ word, context }) => {
            test(`should not apply to "${word}"`, () => {
                const result = isGatiJivikaUpanisad(word, context);
                expect(result.applies).toBe(false);
            });
        });
    });

    // Edge Cases (10 tests)
    describe('Edge Cases', () => {
        test('should handle null input gracefully', () => {
            const result = isGatiJivikaUpanisad(null);
            expect(result.applies).toBe(false);
        });

        test('should handle undefined input gracefully', () => {
            const result = isGatiJivikaUpanisad(undefined);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = isGatiJivikaUpanisad(54321);
            expect(result.applies).toBe(false);
        });

        test('should handle empty string', () => {
            const result = isGatiJivikaUpanisad('');
            expect(result.applies).toBe(false);
        });

        test('should handle missing context', () => {
            const result = isGatiJivikaUpanisad('jīvikākṛtya');
            expect(result.applies).toBe(false);
        });

        test('should handle empty context', () => {
            const result = isGatiJivikaUpanisad('jīvikākṛtya', {});
            expect(result.applies).toBe(false);
        });

        test('should handle context missing verb', () => {
            const result = isGatiJivikaUpanisad('jīvikākṛtya', { meaning: 'likeness' });
            expect(result.applies).toBe(false);
        });

        test('should handle context missing meaning', () => {
            const result = isGatiJivikaUpanisad('jīvikākṛtya', { verb: 'kṛ' });
            expect(result.applies).toBe(false);
        });

        test('should handle context with null meaning', () => {
            const result = isGatiJivikaUpanisad('jīvikākṛtya', { verb: 'kṛ', meaning: null });
            expect(result.applies).toBe(false);
        });

        test('should handle word with special characters', () => {
            const result = isGatiJivikaUpanisad('jīvikā-kṛtya!', { verb: 'kṛ', meaning: 'likeness' });
            expect(result.applies).toBe(false);
        });
    });
});
