import { 
    applySutra1_1_32, 
    isDvandvaCompound, 
    isNominativePlural,
    testSutra1_1_32 
} from './index.js';

describe('Sutra 1.1.32: विभाषा जसि (vibhāṣā jasi)', () => {
    
    describe('applySutra1_1_32', () => {
        test('should apply when dvandva compound with sarvaadi words followed by jas', () => {
            const context = {
                compound: {
                    type: 'dvandva',
                    parts: ['sarva', 'viśva']
                },
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_32('sarvaviśvāḥ', context);
            expect(result.applies).toBe(true);
            expect(result.sarvanama_status).toBe('optional');
        });

        test('should not apply when not a dvandva compound', () => {
            const context = {
                compound: {
                    type: 'tatpurusha',
                    parts: ['sarva', 'jana']
                },
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_32('sarvajanaḥ', context);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Not a dvandva compound');
        });

        test('should not apply when not followed by jas (nominative plural)', () => {
            const context = {
                compound: {
                    type: 'dvandva',
                    parts: ['sarva', 'viśva']
                },
                case: {
                    vibhakti: 'dvitiya',  // accusative
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_32('sarvaviśvān', context);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Not followed by nominative plural');
        });

        test('should not apply when compound lacks sarvaadi words', () => {
            const context = {
                compound: {
                    type: 'dvandva',
                    parts: ['rāma', 'kṛṣṇa']
                },
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_32('rāmakṛṣṇāḥ', context);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('does not contain sarvaadi words');
        });

        test('should apply with various sarvaadi words in dvandva', () => {
            const testCases = [
                { parts: ['sarva', 'ubha'] },
                { parts: ['anya', 'para'] },
                { parts: ['pūrva', 'uttara'] },
                { parts: ['viśva', 'sama'] }
            ];

            const baseContext = {
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };

            testCases.forEach(testCase => {
                const context = {
                    ...baseContext,
                    compound: {
                        type: 'dvandva',
                        parts: testCase.parts
                    }
                };

                const result = applySutra1_1_32('test', context);
                expect(result.applies).toBe(true);
                expect(result.sarvanama_status).toBe('optional');
            });
        });
    });

    describe('isDvandvaCompound', () => {
        test('should return true for dvandva compound', () => {
            const compound = { type: 'dvandva', parts: ['a', 'b'] };
            expect(isDvandvaCompound(compound)).toBe(true);
        });

        test('should return false for non-dvandva compound', () => {
            const compound = { type: 'tatpurusha', parts: ['a', 'b'] };
            expect(isDvandvaCompound(compound)).toBe(false);
        });

        test('should return false for undefined compound', () => {
            expect(isDvandvaCompound(undefined)).toBe(false);
            expect(isDvandvaCompound({})).toBe(false);
        });
    });

    describe('isNominativePlural', () => {
        test('should return true for nominative plural', () => {
            const caseInfo = { vibhakti: 'prathama', vacana: 'bahuvacana' };
            expect(isNominativePlural(caseInfo)).toBe(true);
        });

        test('should return false for other cases', () => {
            expect(isNominativePlural({ vibhakti: 'dvitiya', vacana: 'bahuvacana' })).toBe(false);
            expect(isNominativePlural({ vibhakti: 'prathama', vacana: 'ekavacana' })).toBe(false);
            expect(isNominativePlural(undefined)).toBe(false);
        });
    });

    describe('Integration tests', () => {
        test('should handle complete word analysis', () => {
            const testWord = 'sarvaviśvāḥ';
            const context = {
                compound: {
                    type: 'dvandva',
                    parts: ['sarva', 'viśva']
                },
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };

            const result = testSutra1_1_32(testWord, context);
            
            expect(result.word).toBe(testWord);
            expect(result.sutra).toBe('1.1.32');
            expect(result.analysis.applies).toBe(true);
            expect(result.analysis.sarvanama_status).toBe('optional');
        });
    });
});
