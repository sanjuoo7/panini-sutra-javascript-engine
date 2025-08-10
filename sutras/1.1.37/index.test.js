import { 
    applySutra1_1_37, 
    isNipata, 
    isSvaradi,
    getAvyayaCategory,
    validateAvyaya,
    testSutra1_1_37 
} from './index.js';

describe('Sutra 1.1.37: स्वरादिनिपातमव्ययम्', () => {
    
    describe('applySutra1_1_37', () => {
        test('should classify nipata as avyaya', () => {
            const context = { type: 'nipata' };
            
            const result = applySutra1_1_37('ca', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
            expect(result.category).toBe('nipata');
        });

        test('should classify svaradi words as avyaya', () => {
            const context = { type: 'svaradi' };
            
            const result = applySutra1_1_37('svar', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
            expect(result.category).toBe('svaradi');
        });

        test('should not classify regular words as avyaya', () => {
            const context = {};
            
            const result = applySutra1_1_37('rāma', context);
            expect(result.applies).toBe(false);
            expect(result.avyaya_status).toBe(false);
        });
    });

    describe('isNipata', () => {
        test('should identify common particles', () => {
            expect(isNipata('ca', {})).toBe(true);
            expect(isNipata('vā', {})).toBe(true);
            expect(isNipata('hi', {})).toBe(true);
            expect(isNipata('tu', {})).toBe(true);
            expect(isNipata('eva', {})).toBe(true);
        });

        test('should identify single vowel particles', () => {
            expect(isNipata('a', {})).toBe(true);
            expect(isNipata('i', {})).toBe(true);
            expect(isNipata('u', {})).toBe(true);
        });

        test('should identify from context', () => {
            const context = { type: 'nipata' };
            expect(isNipata('anyword', context)).toBe(true);
        });

        test('should not identify regular words', () => {
            expect(isNipata('rāma', {})).toBe(false);
            expect(isNipata('gacchati', {})).toBe(false);
        });
    });

    describe('isSvaradi', () => {
        test('should identify svaradi words', () => {
            expect(isSvaradi('svar', {})).toBe(true);
            expect(isSvaradi('punar', {})).toBe(true);
            expect(isSvaradi('antar', {})).toBe(true);
            expect(isSvaradi('prātar', {})).toBe(true);
        });

        test('should identify words with svaradi prefixes', () => {
            expect(isSvaradi('svarga', {})).toBe(true);
            expect(isSvaradi('punarāpi', {})).toBe(true);
        });

        test('should identify from context', () => {
            const context = { type: 'svaradi' };
            expect(isSvaradi('anyword', context)).toBe(true);
        });

        test('should not identify regular words', () => {
            expect(isSvaradi('rāma', {})).toBe(false);
            expect(isSvaradi('kṛṣṇa', {})).toBe(false);
        });
    });

    describe('getAvyayaCategory', () => {
        test('should return nipata category', () => {
            expect(getAvyayaCategory('ca', { type: 'nipata' })).toBe('nipata');
        });

        test('should return svaradi category', () => {
            expect(getAvyayaCategory('svar', { type: 'svaradi' })).toBe('svaradi');
        });

        test('should return unknown for unclassified words', () => {
            expect(getAvyayaCategory('rāma', {})).toBe('unknown');
        });
    });

    describe('validateAvyaya', () => {
        test('should validate avyaya words', () => {
            const context = { type: 'nipata' };
            const result = validateAvyaya('ca', context);
            
            expect(result.is_avyaya).toBe(true);
            expect(result.should_be_invariant).toBe(true);
            expect(result.category).toBe('nipata');
        });

        test('should validate non-avyaya words', () => {
            const result = validateAvyaya('rāma', {});
            
            expect(result.is_avyaya).toBe(false);
            expect(result.should_be_invariant).toBe(false);
            expect(result.category).toBe('unknown');
        });
    });

    describe('Integration tests', () => {
        test('should handle complete word analysis', () => {
            const testWord = 'ca';
            const context = { type: 'nipata' };

            const result = testSutra1_1_37(testWord, context);
            
            expect(result.word).toBe(testWord);
            expect(result.sutra).toBe('1.1.37');
            expect(result.analysis.applies).toBe(true);
            expect(result.analysis.avyaya_status).toBe(true);
        });
    });
});
