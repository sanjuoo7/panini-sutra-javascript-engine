import isGatiJivikaUpanisad from './index.js';

describe('Sutra 1.4.79: jīvikopaniṣadāvaupamaye', () => {
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
                expect(result).toMatchObject({
                    applies: true,
                    optional: false,
                    classification: 'गति',
                    confidence: expect.any(Number),
                    reason: expect.any(String)
                });
            });
        });
    });

    describe('Negative Cases', () => {
        const negativeCases = [
            // Wrong meaning
            { word: 'jīvikākṛtya', context: { verb: 'kṛ', meaning: 'earning' }, reason: "The meaning is not 'likeness'." },
            { word: 'जीविकाकृत्य', context: { verb: 'कृ', meaning: 'earning' }, reason: "The meaning is not 'likeness'." },
            { word: 'upaniṣatkṛtya', context: { verb: 'kṛ', meaning: 'studying' }, reason: "The meaning is not 'likeness'." },
            { word: 'उपनिषत्कृत्य', context: { verb: 'कृ', meaning: 'studying' }, reason: "The meaning is not 'likeness'." },

            // Wrong verb
            { word: 'jīvikāgacchati', context: { verb: 'gam', meaning: 'likeness' }, reason: "The verb is not 'kṛ'." },
            { word: 'जीविकागच्छति', context: { verb: 'गम्', meaning: 'likeness' }, reason: "The verb is not 'kṛ'." },
            { word: 'upaniṣadbhavati', context: { verb: 'bhū', meaning: 'likeness' }, reason: "The verb is not 'kṛ'." },
            { word: 'उपनिषद्भवति', context: { verb: 'भू', meaning: 'likeness' }, reason: "The verb is not 'kṛ'." },

            // Word is not jīvikā or upaniṣad
            { word: 'vedam kṛtvā', context: { verb: 'kṛ', meaning: 'likeness' }, reason: "The word is not 'jīvikā' or 'upaniṣad'." },
            { word: 'वेदं कृत्वा', context: { verb: 'कृ', meaning: 'likeness' }, reason: "The word is not 'jīvikā' or 'upaniṣad'." },
            { word: 'anyat kṛtvā', context: { verb: 'kṛ', meaning: 'likeness' }, reason: "The word is not 'jīvikā' or 'upaniṣad'." },
            { word: 'अन्यत् कृत्वा', context: { verb: 'कृ', meaning: 'likeness' }, reason: "The word is not 'jīvikā' or 'upaniṣad'." },

            // Incomplete words
            { word: 'jīvikā', context: { verb: 'kṛ', meaning: 'likeness' }, reason: "The word is incomplete." },
            { word: 'जीविका', context: { verb: 'कृ', meaning: 'likeness' }, reason: "The word is incomplete." },
            { word: 'upaniṣad', context: { verb: 'kṛ', meaning: 'likeness' }, reason: "The word is incomplete." },
            { word: 'उपनिषद्', context: { verb: 'कृ', meaning: 'likeness' }, reason: "The word is incomplete." },
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'likeness' }, reason: "The word is not 'jīvikā' or 'upaniṣad'." },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'likeness' }, reason: "The word is not 'jīvikā' or 'upaniṣad'." },

            // Similar sounding words
            { word: 'jīvati', context: { verb: 'jīv', meaning: 'lives' }, reason: "The word is not 'jīvikā' or 'upaniṣad'." },
            { word: 'जीवति', context: { verb: 'जीव्', meaning: 'lives' }, reason: "The word is not 'jīvikā' or 'upaniṣad'." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiJivikaUpanisad(word, context);
                expect(result).toMatchObject({
                    applies: false,
                    reason: expect.any(String)
                });
            });
        });
    });

    describe('Edge Cases and Error Handling', () => {
        const edgeCases = [
            { input: null, description: 'null input' },
            { input: undefined, description: 'undefined input' },
            { input: 54321, description: 'non-string input' },
            { input: '', description: 'empty string' },
            { input: 'jīvikākṛtya', context: undefined, description: 'missing context' },
            { input: 'jīvikākṛtya', context: {}, description: 'empty context' },
            { input: 'jīvikākṛtya', context: { meaning: 'likeness' }, description: 'context missing verb' },
            { input: 'jīvikākṛtya', context: { verb: 'kṛ' }, description: 'context missing meaning' },
            { input: 'jīvikākṛtya', context: { verb: 'kṛ', meaning: null }, description: 'context with null meaning' },
            { input: 'jīvikā-kṛtya!', context: { verb: 'kṛ', meaning: 'likeness' }, description: 'word with special characters' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiJivikaUpanisad(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });

        // Additional comprehensive edge cases
        test('should handle boolean input', () => {
            const result = isGatiJivikaUpanisad(true, { verb: 'kṛ', meaning: 'likeness' });
            expect(result.applies).toBe(false);
            expect(result.error).toBeDefined();
        });

        test('should handle object input', () => {
            const result = isGatiJivikaUpanisad({ word: 'jīvikā' }, { verb: 'kṛ', meaning: 'likeness' });
            expect(result.applies).toBe(false);
            expect(result.error).toBeDefined();
        });

        test('should handle context with invalid verb type', () => {
            const result = isGatiJivikaUpanisad('jīvikākṛtya', { verb: [], meaning: 'likeness' });
            expect(result.applies).toBe(false);
            // Note: Implementation may not return explicit error for invalid context
        });

        test('should handle context with invalid meaning type', () => {
            const result = isGatiJivikaUpanisad('jīvikākṛtya', { verb: 'kṛ', meaning: 123 });
            expect(result.applies).toBe(false);
            // Note: Implementation may not return explicit error for invalid context
        });

        test('should handle context that is a string', () => {
            const result = isGatiJivikaUpanisad('jīvikākṛtya', 'invalid-context');
            expect(result.applies).toBe(false);
            expect(result.error).toBeDefined();
        });
    });
});
