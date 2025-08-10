import { 
    applySutra1_1_38, 
    analyzeTaddhita, 
    analyzeDeclension,
    isTypicallyIndeclinable,
    validateTaddhitaAvyaya,
    testSutra1_1_38 
} from './index.js';

describe('Sutra 1.1.38: तद्धितश्चासर्वविभक्तिः', () => {
    
    describe('applySutra1_1_38', () => {
        test('should classify taddhita word as avyaya when not fully declined', () => {
            const context = {
                affixes: ['tas'],
                taddhita_affixes: ['tas'],
                declension: {
                    type: 'asarvaviKbhakti',
                    missing_cases: ['instrumental', 'dative']
                }
            };
            
            const result = applySutra1_1_38('ūrdhvatas', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
            expect(result.taddhita_type).toBe('tas');
        });

        test('should not classify taddhita word as avyaya when fully declined', () => {
            const context = {
                affixes: ['ya'],
                taddhita_affixes: ['ya'],
                declension: {
                    type: 'sarvaviKbhakti'
                }
            };
            
            const result = applySutra1_1_38('rāmāyaṇa', context);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('declined in all cases');
        });

        test('should not apply to words without taddhita affixes', () => {
            const context = {};
            
            const result = applySutra1_1_38('rāma', context);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('does not have taddhita');
        });

        test('should recognize tas affix pattern as typically indeclinable', () => {
            const context = {};
            
            const result = applySutra1_1_38('pṛṣṭhatas', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });

        test('should recognize tra affix pattern as typically indeclinable', () => {
            const context = {};
            
            const result = applySutra1_1_38('sarvatra', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });
    });

    describe('analyzeTaddhita', () => {
        test('should detect taddhita from context', () => {
            const context = {
                affixes: ['tas'],
                taddhita_affixes: ['tas']
            };
            
            const result = analyzeTaddhita('ūrdhvatas', context);
            expect(result.has_taddhita).toBe(true);
            expect(result.affix_type).toBe('tas');
            expect(result.source).toBe('context');
        });

        test('should detect tas affix pattern', () => {
            const result = analyzeTaddhita('pṛṣṭhatas', {});
            expect(result.has_taddhita).toBe(true);
            expect(result.affix_type).toBe('tas');
            expect(result.source).toBe('pattern_matching');
        });

        test('should detect tra affix pattern', () => {
            const result = analyzeTaddhita('sarvatra', {});
            expect(result.has_taddhita).toBe(true);
            expect(result.affix_type).toBe('tra');
        });

        test('should detect tva affix pattern', () => {
            const result = analyzeTaddhita('rāmatva', {});
            expect(result.has_taddhita).toBe(true);
            expect(result.affix_type).toBe('tva');
        });

        test('should detect maya affix pattern', () => {
            const result = analyzeTaddhita('suvarṇamaya', {});
            expect(result.has_taddhita).toBe(true);
            expect(result.affix_type).toBe('maya');
        });

        test('should not detect taddhita in regular words', () => {
            const result = analyzeTaddhita('rāma', {});
            expect(result.has_taddhita).toBe(false);
        });
    });

    describe('analyzeDeclension', () => {
        test('should analyze from context declension info', () => {
            const context = {
                declension: {
                    type: 'asarvaviKbhakti',
                    missing_cases: ['instrumental']
                }
            };
            
            const result = analyzeDeclension('test', context);
            expect(result.is_fully_declined).toBe(false);
            expect(result.declension_type).toBe('asarvaviKbhakti');
        });

        test('should identify typically indeclinable affixes', () => {
            const result = analyzeDeclension('pṛṣṭhatas', {});
            expect(result.is_fully_declined).toBe(false);
            expect(result.declension_type).toBe('asarvaviKbhakti');
        });

        test('should default to fully declined for unknown words', () => {
            const result = analyzeDeclension('rāma', {});
            expect(result.is_fully_declined).toBe(true);
            expect(result.declension_type).toBe('sarvaviKbhakti');
        });
    });

    describe('isTypicallyIndeclinable', () => {
        test('should identify indeclinable affix types', () => {
            expect(isTypicallyIndeclinable('tas')).toBe(true);
            expect(isTypicallyIndeclinable('tra')).toBe(true);
            expect(isTypicallyIndeclinable('dha')).toBe(true);
            expect(isTypicallyIndeclinable('kalpa')).toBe(true);
        });

        test('should not identify declinable affix types', () => {
            expect(isTypicallyIndeclinable('ya')).toBe(false);
            expect(isTypicallyIndeclinable('ika')).toBe(false);
            expect(isTypicallyIndeclinable('tva')).toBe(false);
        });
    });

    describe('validateTaddhitaAvyaya', () => {
        test('should validate avyaya words', () => {
            const context = {
                affixes: ['tas'],
                taddhita_affixes: ['tas']
            };
            
            const result = validateTaddhitaAvyaya('ūrdhvatas', context);
            expect(result.is_avyaya).toBe(true);
            expect(result.should_be_invariant).toBe(true);
        });

        test('should validate non-avyaya words', () => {
            const result = validateTaddhitaAvyaya('rāma', {});
            expect(result.is_avyaya).toBe(false);
            expect(result.should_be_invariant).toBe(false);
        });
    });

    describe('Integration tests', () => {
        test('should handle complete word analysis', () => {
            const testWord = 'sarvatra';
            const context = {};

            const result = testSutra1_1_38(testWord, context);
            
            expect(result.word).toBe(testWord);
            expect(result.sutra).toBe('1.1.38');
            expect(result.analysis.applies).toBe(true);
            expect(result.analysis.avyaya_status).toBe(true);
        });

        test('should provide educational examples', () => {
            const examples = [
                { word: 'ūrdhvatas', meaning: 'from above', expected: true },
                { word: 'sarvatra', meaning: 'everywhere', expected: true },
                { word: 'pṛṣṭhatas', meaning: 'from behind', expected: true },
                { word: 'tridhā', meaning: 'in three ways', expected: true }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_38(example.word, {});
                expect(result.applies).toBe(example.expected);
                if (example.expected) {
                    expect(result.avyaya_status).toBe(true);
                }
            });
        });
    });
});
