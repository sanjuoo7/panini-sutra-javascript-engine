import { 
    applySutra1_1_33, 
    hasTayaAffix, 
    getWordBase,
    isNominativePlural,
    validateWord1_1_33,
    testSutra1_1_33 
} from './index.js';

describe('Sutra 1.1.33: प्रथमचरमतयाल्पार्धकतिपयनेमाश्च', () => {
    
    describe('applySutra1_1_33', () => {
        test('should apply for prathama before jas', () => {
            const context = {
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_33('prathamāḥ', context);
            expect(result.applies).toBe(true);
            expect(result.sarvanama_status).toBe('optional');
        });

        test('should apply for carama before jas', () => {
            const context = {
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_33('caramāḥ', context);
            expect(result.applies).toBe(true);
            expect(result.sarvanama_status).toBe('optional');
        });

        test('should apply for alpa before jas', () => {
            const context = {
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_33('alpāḥ', context);
            expect(result.applies).toBe(true);
            expect(result.sarvanama_status).toBe('optional');
        });

        test('should apply for words with taya affix', () => {
            const context = {
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                },
                affixes: ['taya']
            };
            
            const result = applySutra1_1_33('dvitayāḥ', context);
            expect(result.applies).toBe(true);
            expect(result.sarvanama_status).toBe('optional');
        });

        test('should not apply when not followed by jas', () => {
            const context = {
                case: {
                    vibhakti: 'dvitiya',
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_33('prathamān', context);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Not followed by nominative plural');
        });

        test('should not apply for non-specified words', () => {
            const context = {
                case: {
                    vibhakti: 'prathama',
                    vacana: 'bahuvacana'
                }
            };
            
            const result = applySutra1_1_33('rāmāḥ', context);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('not among the specified words');
        });
    });

    describe('hasTayaAffix', () => {
        test('should detect taya affix from context', () => {
            const context = { affixes: ['taya'] };
            expect(hasTayaAffix('dvitaya', context)).toBe(true);
        });

        test('should detect taya pattern in word', () => {
            expect(hasTayaAffix('tritaya', {})).toBe(true);
            expect(hasTayaAffix('dvitīya', {})).toBe(true);
        });

        test('should return false for words without taya', () => {
            expect(hasTayaAffix('prathama', {})).toBe(false);
        });
    });

    describe('getWordBase', () => {
        test('should extract base from inflected forms', () => {
            expect(getWordBase('prathamāḥ')).toBe('pratham');
            expect(getWordBase('caramān')).toBe('caram');
            expect(getWordBase('alpaiḥ')).toBe('alp');
        });
    });

    describe('validateWord1_1_33', () => {
        test('should validate specified words', () => {
            const result = validateWord1_1_33('prathamāḥ', {});
            expect(result.is_specified_word).toBe(true);
            expect(result.qualifies).toBe(true);
        });

        test('should validate taya affix words', () => {
            const context = { affixes: ['taya'] };
            const result = validateWord1_1_33('dvitayāḥ', context);
            expect(result.has_taya_affix).toBe(true);
            expect(result.qualifies).toBe(true);
        });
    });
});
