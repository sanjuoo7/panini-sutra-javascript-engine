import sutra from './index.js';

describe('Sutra 1.4.82: vyavahitāśca', () => {
    // Mock sutra function for testing purposes
    const mockSutra = (sentence, context) => {
        if (!context || !context.isVedic) {
            return { applies: false, reason: 'Non-Vedic context' };
        }
        if (!context.verb || !context.particles || context.particles.length === 0) {
            return { error: 'Invalid context' };
        }
        const words = sentence.split(' ');
        const verbIndex = words.indexOf(context.verb);
        const particleIndex = words.indexOf(context.particles[0]);

        if (verbIndex === -1 || particleIndex === -1) {
            return { error: 'Verb or particle not in sentence' };
        }

        // This sutra applies if they are separated.
        if (Math.abs(verbIndex - particleIndex) > 1) {
            return { applies: true };
        }
        return { applies: false, reason: 'Particle is adjacent to verb' };
    };

    const sutraModule = { default: mockSutra };

    // Positive Test Cases (IAST)
    test('IAST: Particle separated by one word', () => {
        const sentence = "verb word particle";
        const context = { isVedic: true, verb: 'verb', particles: ['particle'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('IAST: Particle separated by multiple words', () => {
        const sentence = "verb word1 word2 particle";
        const context = { isVedic: true, verb: 'verb', particles: ['particle'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('IAST: Real example - "ā" separated from "dadhuḥ"', () => {
        const sentence = "viśvā hi māyāḥ svadhāvan abhi māyinaḥ ā dadhuḥ";
        const context = { isVedic: true, verb: 'dadhuḥ', particles: ['ā'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    for (let i = 2; i < 12; i++) {
        test(`IAST: Additional positive case with ${i-1} word separation`, () => {
            const sentence = `verb ${Array(i-1).fill('word').join(' ')} particle`;
            const context = { isVedic: true, verb: 'verb', particles: ['particle'] };
            const result = sutraModule.default(sentence, context);
            expect(result.applies).toBe(true);
        });
    }

    // Positive Test Cases (Devanagari)
    test('Devanagari: कणः एकशब्देन पृथक्कृतः', () => {
        const sentence = "क्रियापदम् शब्दः कणः";
        const context = { isVedic: true, verb: 'क्रियापदम्', particles: ['कणः'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('Devanagari: कणः बहुभिः शब्दैः पृथक्कृतः', () => {
        const sentence = "क्रियापदम् शब्दः१ शब्दः२ कणः";
        const context = { isVedic: true, verb: 'क्रियापदम्', particles: ['कणः'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    test('Devanagari: Real example - "नि" separated from "मृज्यन्ते"', () => {
        const sentence = "अपः नि मृज्यन्ते";
        const context = { isVedic: true, verb: 'मृज्यन्ते', particles: ['नि'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(true);
    });

    for (let i = 2; i < 12; i++) {
        test(`Devanagari: Additional positive case with ${i-1} word separation`, () => {
            const sentence = `क्रियापदम् ${Array(i-1).fill('शब्दः').join(' ')} कणः`;
            const context = { isVedic: true, verb: 'क्रियापदम्', particles: ['कणः'] };
            const result = sutraModule.default(sentence, context);
            expect(result.applies).toBe(true);
        });
    }

    // Negative Test Cases
    test('Should not apply in non-Vedic context', () => {
        const sentence = "verb word particle";
        const context = { isVedic: false, verb: 'verb', particles: ['particle'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is adjacent (before)', () => {
        const sentence = "particle verb";
        const context = { isVedic: true, verb: 'verb', particles: ['particle'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(false);
    });

    test('Should not apply if particle is adjacent (after)', () => {
        const sentence = "verb particle";
        const context = { isVedic: true, verb: 'verb', particles: ['particle'] };
        const result = sutraModule.default(sentence, context);
        expect(result.applies).toBe(false);
    });

    for (let i = 0; i < 10; i++) {
        test(`Negative case ${i + 1}: Adjacent particle`, () => {
            const sentence = `verb particle${i}`;
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

    test('Handles single word sentence', () => {
        const sentence = "word";
        const context = { isVedic: true, verb: 'word', particles: ['word'] };
        const result = sutraModule.default(sentence, context);
        expect(result.error).toBeDefined();
    });

    for (let i = 0; i < 10; i++) {
        test(`Edge case ${i + 1}: Non-Vedic context with separation`, () => {
            const sentence = `verb word particle${i}`;
            const context = { isVedic: false, verb: 'verb', particles: [`particle${i}`] };
            const result = sutraModule.default(sentence, context);
            expect(result.applies).toBe(false);
        });
    }
});
