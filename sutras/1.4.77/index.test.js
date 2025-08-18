import isGatiHastePanau from './index.js';

describe('Sutra 1.4.77: nityaṃ haste pāṇāvupayamane', () => {
    describe('Positive Cases: Mandatory "gati" in the sense of marriage', () => {
        const positiveCases = [
            // IAST - haste
            { word: 'hastekṛtya kanyām', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'hastekṛtvā dāram', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'hastekaroti vadhūm', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'hastekṛtaḥ vivāhaḥ', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'hastekariṣyati kanyām', context: { verb: 'kṛ', meaning: 'marriage' } },

            // IAST - pāṇau
            { word: 'pāṇaukṛtya kanyām', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'pāṇaukṛtvā dāram', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'pāṇaukaroti vadhūm', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'pāṇaukṛtaḥ vivāhaḥ', context: { verb: 'kṛ', meaning: 'marriage' } },
            { word: 'pāṇaukariṣyati kanyām', context: { verb: 'kṛ', meaning: 'marriage' } },

            // Devanagari - हस्ते
            { word: 'हस्तेकृत्य कन्याम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'हस्तेकृत्वा दारम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'हस्तेकरोति वधूम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'हस्तेकृतः विवाहः', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'हस्तेकरिष्यति कन्याम्', context: { verb: 'कृ', meaning: 'marriage' } },

            // Devanagari - पाणौ
            { word: 'पाणौकृत्य कन्याम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'पाणौकृत्वा दारम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'पाणौकरोति वधूम्', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'पाणौकृतः विवाहः', context: { verb: 'कृ', meaning: 'marriage' } },
            { word: 'पाणौकरिष्यति कन्याम्', context: { verb: 'कृ', meaning: 'marriage' } },
        ];

        positiveCases.forEach(({ word, context }) => {
            test(`should apply mandatorily to "${word}"`, () => {
                const result = isGatiHastePanau(word, context);
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
            { word: 'hastekṛtya dhanam', context: { verb: 'kṛ', meaning: 'taking money' }, reason: "The meaning is not 'marriage'." },
            { word: 'हस्तेकृत्य धनम्', context: { verb: 'कृ', meaning: 'taking money' }, reason: "The meaning is not 'marriage'." },
            { word: 'pāṇaukṛtya jalam', context: { verb: 'kṛ', meaning: 'cupping water' }, reason: "The meaning is not 'marriage'." },
            { word: 'पाणौकृत्य जलम्', context: { verb: 'कृ', meaning: 'cupping water' }, reason: "The meaning is not 'marriage'." },

            // Wrong verb
            { word: 'hastegacchati kanyām', context: { verb: 'gam', meaning: 'marriage' }, reason: "The verb is not 'kṛ'." },
            { word: 'हस्तेगच्छति कन्याम्', context: { verb: 'गम्', meaning: 'marriage' }, reason: "The verb is not 'kṛ'." },
            { word: 'pāṇubhavati vadhūm', context: { verb: 'bhū', meaning: 'marriage' }, reason: "The verb is not 'kṛ'." },
            { word: 'पाणौभवति वधूम्', context: { verb: 'भू', meaning: 'marriage' }, reason: "The verb is not 'kṛ'." },

            // Word is not haste or pāṇau
            { word: 'urasikṛtya', context: { verb: 'kṛ', meaning: 'marriage' }, reason: "The word is not 'haste' or 'pāṇau'." },
            { word: 'उरसिकृत्य', context: { verb: 'कृ', meaning: 'marriage' }, reason: "The word is not 'haste' or 'pāṇau'." },
            { word: 'śirasi kṛtvā', context: { verb: 'kṛ', meaning: 'marriage' }, reason: "The word is not 'haste' or 'pāṇau'." },
            { word: 'शिरसि कृत्वा', context: { verb: 'कृ', meaning: 'marriage' }, reason: "The word is not 'haste' or 'pāṇau'." },

            // Incomplete words
            { word: 'haste', context: { verb: 'kṛ', meaning: 'marriage' }, reason: "The word is incomplete." },
            { word: 'हस्ते', context: { verb: 'कृ', meaning: 'marriage' }, reason: "The word is incomplete." },
            { word: 'pāṇau', context: { verb: 'kṛ', meaning: 'marriage' }, reason: "The word is incomplete." },
            { word: 'पाणौ', context: { verb: 'कृ', meaning: 'marriage' }, reason: "The word is incomplete." },
            { word: 'kṛtvā', context: { verb: 'kṛ', meaning: 'marriage' }, reason: "The word is not 'haste' or 'pāṇau'." },
            { word: 'कृत्वा', context: { verb: 'कृ', meaning: 'marriage' }, reason: "The word is not 'haste' or 'pāṇau'." },
            { word: 'anyat kṛtvā', context: { verb: 'kṛ', meaning: 'doing something else' }, reason: "The word is not 'haste' or 'pāṇau'." },
            { word: 'अन्यत् कृत्वा', context: { verb: 'कृ', meaning: 'doing something else' }, reason: "The word is not 'haste' or 'pāṇau'." },
        ];

        negativeCases.forEach(({ word, context, reason }) => {
            test(`should not apply to "${word}" because ${reason}`, () => {
                const result = isGatiHastePanau(word, context);
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
            { input: { key: 'value' }, description: 'non-string input' },
            { input: '', description: 'empty string' },
            { input: 'hastekṛtya', context: undefined, description: 'missing context' },
            { input: 'hastekṛtya', context: {}, description: 'empty context' },
            { input: 'hastekṛtya', context: { meaning: 'marriage' }, description: 'context missing verb' },
            { input: 'hastekṛtya', context: { verb: 'kṛ' }, description: 'context missing meaning' },
            { input: 'hastekṛtya', context: { verb: 'kṛ', meaning: 123 }, description: 'context with wrong type for meaning' },
            { input: 'hastekṛtya' + 'a'.repeat(1000), context: { verb: 'kṛ', meaning: 'marriage' }, description: 'long string input' },
        ];

        edgeCases.forEach(({ input, context, description }) => {
            test(`should handle ${description} gracefully`, () => {
                const result = isGatiHastePanau(input, context);
                expect(result).toMatchObject({
                    applies: false,
                    error: expect.any(String)
                });
            });
        });
    });
});
