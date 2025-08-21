import sutra from './index.js';

describe('Sutra 1.4.81: chandasi pare\'pi', () => {
    // Use the actual sutra implementation
    const sutraModule = { default: sutra };

    // Positive Test Cases (IAST)
    test('IAST: Gati "ā" after verb', () => {
        const sentence = "purohitam yajñasya devam r̥tvijam hōtāram ratnadhātamam ā";
        const context = { isVedic: true, verb: 'īḷate', particles: ['ā'] };
        const result = sutraModule.default(sentence.replace('īḷate', ''), context);
        expect(result.applies).toBe(true);
    });

    test('IAST: Upasarga "ni" after verb', () => {
        const sentence = "tanūṣu dadhimahi ni";
        const context = { isVedic: true, verb: 'dadhimahi', particles: ['ni'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('IAST: Particle "pra" after verb with separation', () => {
        const sentence = "agnir hotāram pra īḷe";
        const context = { isVedic: true, verb: 'īḷe', particles: ['pra'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('IAST: Particle "sam" after verb', () => {
        const sentence = "indram yajamahe sam";
        const context = { isVedic: true, verb: 'yajamahe', particles: ['sam'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`IAST: Additional positive case ${i + 1}`, () => {
            const sentence = `verb particle${i}`;
            const context = { isVedic: true, verb: 'verb', particles: [`particle${i}`] };
            const result = sutraModule.default(sentence, context);
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: गति "आ" after verb', () => {
        const sentence = "पुरोहितं यज्ञस्य देवं ऋत्विजं होतारं रत्नधातमम् आ";
        const context = { isVedic: true, verb: 'ईळते', particles: ['आ'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('Devanagari: उपसर्ग "नि" after verb', () => {
        const sentence = "तनूषु दधिमहि नि";
        const context = { isVedic: true, verb: 'दधिमहि', particles: ['नि'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Particle "प्र" after verb with separation', () => {
        const sentence = "अग्निर् होतारं प्र ईळे";
        const context = { isVedic: true, verb: 'ईळे', particles: ['प्र'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Particle "सम्" after verb', () => {
        const sentence = "इन्द्रं यजामहे सम्";
        const context = { isVedic: true, verb: 'यजामहे', particles: ['सम्'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    for (let i = 0; i < 10; i++) {
        test(`Devanagari: Additional positive case ${i + 1}`, () => {
            const sentence = `क्रियापदम् कणः${i}`;
            const context = { isVedic: true, verb: 'क्रियापदम्', particles: [`कणः${i}`] };
            const result = sutraModule.default(sentence, context);
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply in non-Vedic context', () => {
        const sentence = "rāmaḥ gṛham gacchati";
        const context = { isVedic: false, verb: 'gacchati', particles: ['pra'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle precedes verb', () => {
        const sentence = "pra gacchati rāmaḥ";
        const context = { isVedic: true, verb: 'gacchati', particles: ['pra'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(false);
    });

    test('Should not apply if there are no particles', () => {
        const sentence = "agnim īḷate purohitam";
        const context = { isVedic: true, verb: 'īḷate', particles: [] };
        const result = sutraModule.default(sentence, context);
        expect(result.error).toBeDefined();
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Particle before verb`, () => {
            const sentence = `particle${i} verb`;
            const context = { isVedic: true, verb: 'verb', particles: [`particle${i}`] };
            const result = sutraModule.default(sentence, context);
            expect(result.applies).toBe(false);
        });
    }

    // Edge Cases
    test('Handles empty sentence', () => {
        const sentence = "";
        const context = { isVedic: true, verb: 'verb', particles: ['particle'] };
        const result = sutraModule.default(sentence, context);
        expect(result.error).toBeDefined();
    });

    test('Handles context with missing verb', () => {
        const sentence = "some sentence";
        const context = { isVedic: true, particles: ['particle'] };
        const result = sutraModule.default(sentence, context);
        expect(result.error).toBeDefined();
    });

    test('Handles context with missing particles', () => {
        const sentence = "some sentence";
        const context = { isVedic: true, verb: 'verb' };
        const result = sutraModule.default(sentence, context);
        expect(result.error).toBeDefined();
    });

    test('Handles sentence with verb not present', () => {
        const sentence = "a b c";
        const context = { isVedic: true, verb: 'd', particles: ['a'] };
        const result = sutraModule.default(sentence, context);
        expect(result.error).toBeDefined();
    });

    test('Handles sentence with particle not present', () => {
        const sentence = "a b c";
        const context = { isVedic: true, verb: 'a', particles: ['d'] };
        const result = sutraModule.default(sentence, context);
        expect(result.error).toBeDefined();
    });

    for (let i = 0; i < 10; i++) {
        test(`Edge case ${i + 1}: Non-Vedic context`, () => {
            const sentence = `verb particle${i}`;
            const context = { isVedic: false, verb: 'verb', particles: [`particle${i}`] };
            const result = sutraModule.default(sentence, context);
            expect(result.applies).toBe(false);
        });
    }
});
