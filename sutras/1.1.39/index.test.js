import { 
    applySutra1_1_39,
    analyzeKrit, 
    analyzeKritEnding,
    validateKritAvyaya, 
    testSutra1_1_39 
} from './index.js';

describe('Sutra 1.1.39: कृन्मेजन्तः Tests', () => {
    
    describe('Core Functionality - applySutra1_1_39', () => {
        test('should classify krit forms ending in म् as avyaya', () => {
            const result = applySutra1_1_39('gatvam', { affixes: ['krit'] });
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
            expect(result.affix_type).toBe('krit');
        });

        test('should classify krit forms ending in ए as avyaya', () => {
            const result = applySutra1_1_39('game', { affixes: ['krit'] });
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });

        test('should classify krit forms ending in ओ as avyaya', () => {
            const result = applySutra1_1_39('gamo', { affixes: ['krit'] });
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });

        test('should not apply to non-krit words', () => {
            const result = applySutra1_1_39('rāma');
            expect(result.applies).toBe(false);
            expect(result.avyaya_status).toBe(false);
            expect(result.reason).toContain('Word does not have कृत्');
        });

        test('should not apply to krit words with wrong endings', () => {
            const result = applySutra1_1_39('gata', { affixes: ['krit'] });
            expect(result.applies).toBe(false);
            expect(result.avyaya_status).toBe(false);
        });
    });

    describe('Krit Analysis - analyzeKrit', () => {
        test('should detect krit from context', () => {
            const result = analyzeKrit('gatvam', { affixes: ['krit'] });
            expect(result.is_krit).toBe(true);
            expect(result.affix_type).toBe('krit');
            expect(result.source).toBe('context');
        });

        test('should detect krit patterns', () => {
            const kritExamples = ['gatvam', 'kritam', 'tamam', 'vam'];
            kritExamples.forEach(word => {
                const result = analyzeKrit(word);
                expect(result.is_krit).toBe(true);
                expect(result.source).toBe('pattern_matching');
            });
        });

        test('should detect absolutive patterns', () => {
            const result = analyzeKrit('gatvā');
            expect(result.is_krit).toBe(true);
            expect(result.pattern_type).toBe('absolutive');
        });

        test('should detect infinitive patterns', () => {
            const result = analyzeKrit('gantum');
            expect(result.is_krit).toBe(true);
            expect(result.pattern_type).toBe('infinitive');
        });

        test('should detect participial patterns', () => {
            const result = analyzeKrit('gataḥ');
            expect(result.is_krit).toBe(true);
            expect(result.pattern_type).toBe('participle');
        });

        test('should not detect non-krit words', () => {
            const result = analyzeKrit('ordinary');
            expect(result.is_krit).toBe(false);
        });
    });

    describe('Ending Analysis - analyzeKritEnding', () => {
        test('should detect म् endings', () => {
            const mEndings = ['gatvam', 'kritam', 'tamam'];
            mEndings.forEach(word => {
                const result = analyzeKritEnding({}, word);
                expect(result.has_qualifying_ending).toBe(true);
                expect(result.ending_type).toBe('म्');
            });
        });

        test('should detect ए endings', () => {
            const eEndings = ['game', 'krite', 'tame'];
            eEndings.forEach(word => {
                const result = analyzeKritEnding({}, word);
                expect(result.has_qualifying_ending).toBe(true);
                expect(result.ending_type).toBe('ए');
            });
        });

        test('should detect ओ endings', () => {
            const oEndings = ['gamo', 'krito', 'tamo'];
            oEndings.forEach(word => {
                const result = analyzeKritEnding({}, word);
                expect(result.has_qualifying_ending).toBe(true);
                expect(result.ending_type).toBe('ओ');
            });
        });

        test('should detect ऐ endings', () => {
            const aiEndings = ['gamai', 'kritai', 'tamai'];
            aiEndings.forEach(word => {
                const result = analyzeKritEnding({}, word);
                expect(result.has_qualifying_ending).toBe(true);
                expect(result.ending_type).toBe('ऐ');
            });
        });

        test('should detect औ endings', () => {
            const auEndings = ['gamau', 'kritau', 'tamau'];
            auEndings.forEach(word => {
                const result = analyzeKritEnding({}, word);
                expect(result.has_qualifying_ending).toBe(true);
                expect(result.ending_type).toBe('औ');
            });
        });

        test('should not detect non-qualifying endings', () => {
            const nonQualifying = ['gata', 'kriti', 'tamu'];
            nonQualifying.forEach(word => {
                const result = analyzeKritEnding({}, word);
                expect(result.has_qualifying_ending).toBe(false);
            });
        });
    });

    describe('Validation - validateKritAvyaya', () => {
        test('should validate qualifying krit avyaya', () => {
            const result = validateKritAvyaya('gatvam', { affixes: ['krit'] });
            expect(result.is_avyaya).toBe(true);
            expect(result.confidence).toBeGreaterThan(0.8);
        });

        test('should provide usage notes', () => {
            const result = validateKritAvyaya('gatvam', { affixes: ['krit'] });
            expect(result.usage_note).toContain('participial');
            expect(result.usage_note).toContain('verbal');
        });

        test('should handle non-qualifying words', () => {
            const result = validateKritAvyaya('rāma');
            expect(result.is_avyaya).toBe(false);
            expect(result.explanation).toContain('not कृत्-derived');
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classical krit forms with म् ending', () => {
            const examples = [
                { word: 'gatvam', meaning: 'having gone' },
                { word: 'hatvam', meaning: 'having killed' },
                { word: 'kritvam', meaning: 'having done' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_39(example.word, { affixes: ['krit'] });
                expect(result.applies).toBe(true);
                expect(result.avyaya_status).toBe(true);
            });
        });

        test('should handle classical krit forms with ए ending', () => {
            const examples = [
                { word: 'gane', meaning: 'in counting' },
                { word: 'dane', meaning: 'in giving' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_39(example.word, { affixes: ['krit'] });
                expect(result.applies).toBe(true);
                expect(result.avyaya_status).toBe(true);
            });
        });

        test('should handle classical krit forms with ओ ending', () => {
            const examples = [
                { word: 'gamo', meaning: 'going (adverbial)' },
                { word: 'dano', meaning: 'giving (adverbial)' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_39(example.word, { affixes: ['krit'] });
                expect(result.applies).toBe(true);
                expect(result.avyaya_status).toBe(true);
            });
        });
    });

    describe('Context Integration', () => {
        test('should prioritize context over pattern matching', () => {
            const result = applySutra1_1_39('irregularm', { affixes: ['krit'] });
            expect(result.applies).toBe(true);
            expect(result.affix_type).toBe('krit');
        });

        test('should handle multiple affix context', () => {
            const result = applySutra1_1_39('complexam', { 
                affixes: ['krit', 'taddhita'], 
                primary_affix: 'krit' 
            });
            expect(result.applies).toBe(true);
            expect(result.affix_type).toBe('krit');
        });

        test('should not apply without krit context', () => {
            const result = applySutra1_1_39('normalm', { affixes: ['taddhita'] });
            expect(result.applies).toBe(false);
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_39('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle null input', () => {
            const result = applySutra1_1_39(null);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle non-string input', () => {
            const result = applySutra1_1_39(123);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle missing context', () => {
            const result = applySutra1_1_39('gatvam');
            expect(result).toBeDefined();
            expect(typeof result.applies).toBe('boolean');
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis', () => {
            const result = testSutra1_1_39('gatvam', { affixes: ['krit'] });
            expect(result.analysis.applies).toBe(true);
            expect(result.validation.is_avyaya).toBe(true);
            expect(result.examples).toBeDefined();
            expect(result.timestamp).toBeDefined();
        });

        test('should handle non-qualifying words', () => {
            const result = testSutra1_1_39('rāma');
            expect(result.analysis.applies).toBe(false);
            expect(result.validation.is_avyaya).toBe(false);
        });
    });

    describe('Linguistic Patterns', () => {
        test('should handle various krit patterns', () => {
            const patterns = [
                { type: 'am', examples: ['gatvam', 'hatvam', 'kritvam'] },
                { type: 'tam', examples: ['gatam', 'hatam', 'kritam'] },
                { type: 'vam', examples: ['gatvām', 'hatvām', 'kritvām'] }
            ];

            patterns.forEach(patternInfo => {
                patternInfo.examples.forEach(example => {
                    const result = analyzeKrit(example);
                    expect(result.is_krit).toBe(true);
                });
            });
        });

        test('should handle complex Sanskrit formations', () => {
            const complexForms = [
                'prāptavantam', 'kṛtavantam', 'gatavantam'
            ];

            complexForms.forEach(form => {
                const result = analyzeKrit(form);
                expect(result.is_krit).toBe(true);
            });
        });
    });

    describe('Integration with Test Cases', () => {
        test('should handle ending analysis integration', () => {
            const endingTests = [
                { ending: 'म्', examples: ['gatvam', 'kritam'] },
                { ending: 'ए', examples: ['game', 'krite'] },
                { ending: 'ओ', examples: ['gamo', 'krito'] },
                { ending: 'ऐ', examples: ['gamai', 'kritai'] },
                { ending: 'औ', examples: ['gamau', 'kritau'] }
            ];

            endingTests.forEach(test => {
                test.examples.forEach(word => {
                    const result = analyzeKritEnding({}, word);
                    expect(result.has_qualifying_ending).toBe(true);
                    expect(result.ending_type).toBe(test.ending);
                });
            });
        });
    });
});