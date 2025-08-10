import { 
    applySutra1_1_34,
    analyzeNipata, 
    analyzepratipadikaContext,
    validateNipatapratipadika, 
    testSutra1_1_34 
} from './index.js';

describe('Sutra 1.1.34: सिद्धं तु निपाते प्रातिपदिकग्रहणे Tests', () => {
    
    describe('Core Functionality - applySutra1_1_34', () => {
        test('should allow coordinating nipātas as prātipadikas', () => {
            const result = applySutra1_1_34('ca', { grammatical_context: 'compound_formation' });
            expect(result.applies).toBe(true);
            expect(result.can_be_pratipadika).toBe(true);
            expect(result.nipata_type).toBe('coordinating');
        });

        test('should allow emphatic nipātas as prātipadikas', () => {
            const result = applySutra1_1_34('eva', { grammatical_context: 'derivational_process' });
            expect(result.applies).toBe(true);
            expect(result.can_be_pratipadika).toBe(true);
            expect(result.nipata_type).toBe('emphatic');
        });

        test('should allow temporal nipātas as prātipadikas', () => {
            const result = applySutra1_1_34('tadā', { grammatical_context: 'grammatical_analysis' });
            expect(result.applies).toBe(true);
            expect(result.can_be_pratipadika).toBe(true);
            expect(result.nipata_type).toBe('temporal');
        });

        test('should not apply to non-nipāta words', () => {
            const result = applySutra1_1_34('rāma');
            expect(result.applies).toBe(false);
            expect(result.can_be_pratipadika).toBe(false);
            expect(result.reason).toContain('not a nipāta');
        });

        test('should handle context-provided nipātas', () => {
            const result = applySutra1_1_34('special', { 
                word_type: 'nipata', 
                nipata_type: 'custom',
                grammatical_context: 'morphological_study'
            });
            expect(result.applies).toBe(true);
            expect(result.can_be_pratipadika).toBe(true);
        });
    });

    describe('Nipāta Analysis - analyzeNipata', () => {
        test('should identify coordinating nipātas', () => {
            const coordinating = ['ca', 'va', 'api', 'tu'];
            coordinating.forEach(word => {
                const result = analyzeNipata(word);
                expect(result.is_nipata).toBe(true);
                expect(result.nipata_type).toBe('coordinating');
            });
        });

        test('should identify emphatic nipātas', () => {
            const emphatic = ['eva', 'hi', 'khalu', 'nūnam'];
            emphatic.forEach(word => {
                const result = analyzeNipata(word);
                expect(result.is_nipata).toBe(true);
                expect(result.nipata_type).toBe('emphatic');
            });
        });

        test('should identify negative nipātas', () => {
            const negative = ['na', 'mā', 'no'];
            negative.forEach(word => {
                const result = analyzeNipata(word);
                expect(result.is_nipata).toBe(true);
                expect(result.nipata_type).toBe('negative');
            });
        });

        test('should identify temporal nipātas', () => {
            const temporal = ['tadā', 'yadā', 'kadā', 'sarvadā'];
            temporal.forEach(word => {
                const result = analyzeNipata(word);
                expect(result.is_nipata).toBe(true);
                expect(result.nipata_type).toBe('temporal');
            });
        });

        test('should identify locative nipātas', () => {
            const locative = ['yatra', 'tatra', 'sarvatra'];
            locative.forEach(word => {
                const result = analyzeNipata(word);
                expect(result.is_nipata).toBe(true);
                expect(result.nipata_type).toBe('locative');
            });
        });

        test('should identify manner nipātas', () => {
            const manner = ['tathā', 'yathā', 'kathāñcit'];
            manner.forEach(word => {
                const result = analyzeNipata(word);
                expect(result.is_nipata).toBe(true);
                expect(result.nipata_type).toBe('manner');
            });
        });

        test('should identify pattern-based nipātas', () => {
            const patternWords = [
                { word: 'ūrdhvatas', type: 'directional' },
                { word: 'adhostāt', type: 'directional' },
                { word: 'anyatra', type: 'locative' },
                { word: 'itarathā', type: 'manner' }
            ];

            patternWords.forEach(test => {
                const result = analyzeNipata(test.word);
                expect(result.is_nipata).toBe(true);
                expect(result.nipata_type).toBe(test.type);
            });
        });

        test('should not identify non-nipātas', () => {
            const nonNipatas = ['deva', 'grāma', 'putra', 'karma'];
            nonNipatas.forEach(word => {
                const result = analyzeNipata(word);
                expect(result.is_nipata).toBe(false);
            });
        });

        test('should handle context-provided nipāta information', () => {
            const result = analyzeNipata('unknown', { word_type: 'nipata', nipata_type: 'special' });
            expect(result.is_nipata).toBe(true);
            expect(result.nipata_type).toBe('special');
            expect(result.source).toBe('context');
        });
    });

    describe('Prātipadika Context Analysis - analyzepratipadikaContext', () => {
        test('should allow compound formation context', () => {
            const result = analyzepratipadikaContext('ca', { grammatical_context: 'compound_formation' });
            expect(result.allows_pratipadika_treatment).toBe(true);
            expect(result.context_type).toBe('compound_formation');
        });

        test('should allow derivational process context', () => {
            const result = analyzepratipadikaContext('eva', { grammatical_context: 'derivational_process' });
            expect(result.allows_pratipadika_treatment).toBe(true);
            expect(result.context_type).toBe('derivational_process');
        });

        test('should allow grammatical analysis context', () => {
            const result = analyzepratipadikaContext('hi', { grammatical_context: 'grammatical_analysis' });
            expect(result.allows_pratipadika_treatment).toBe(true);
            expect(result.context_type).toBe('grammatical_analysis');
        });

        test('should allow semantic grouping context', () => {
            const result = analyzepratipadikaContext('tu', { grammatical_context: 'semantic_grouping' });
            expect(result.allows_pratipadika_treatment).toBe(true);
            expect(result.context_type).toBe('semantic_grouping');
        });

        test('should allow morphological study context', () => {
            const result = analyzepratipadikaContext('api', { grammatical_context: 'morphological_study' });
            expect(result.allows_pratipadika_treatment).toBe(true);
            expect(result.context_type).toBe('morphological_study');
        });

        test('should allow default contexts', () => {
            const result = analyzepratipadikaContext('na');
            expect(result.allows_pratipadika_treatment).toBe(true);
            expect(result.context_type).toBe('general_linguistic');
        });

        test('should handle explicit permission in context', () => {
            const result = analyzepratipadikaContext('special', { 
                allows_pratipadika: true, 
                context_type: 'custom' 
            });
            expect(result.allows_pratipadika_treatment).toBe(true);
            expect(result.context_type).toBe('custom');
        });
    });

    describe('Validation - validateNipatapratipadika', () => {
        test('should validate known nipātas with high confidence', () => {
            const result = validateNipatapratipadika('eva', { grammatical_context: 'compound_formation' });
            expect(result.can_be_pratipadika).toBe(true);
            expect(result.is_valid_application).toBe(true);
            expect(result.confidence).toBeGreaterThan(0.8);
        });

        test('should provide usage notes for valid applications', () => {
            const result = validateNipatapratipadika('ca', { grammatical_context: 'derivational_process' });
            expect(result.usage_note).toContain('nipāta');
            expect(result.usage_note).toContain('prātipadika');
            expect(result.usage_note).toContain('contexts');
        });

        test('should handle invalid applications', () => {
            const result = validateNipatapratipadika('deva');
            expect(result.can_be_pratipadika).toBe(false);
            expect(result.is_valid_application).toBe(false);
            expect(result.explanation).toContain('does not qualify');
        });

        test('should provide appropriate confidence levels', () => {
            const contextResult = validateNipatapratipadika('special', { 
                word_type: 'nipata', 
                grammatical_context: 'compound_formation' 
            });
            expect(contextResult.confidence).toBeGreaterThan(0.9);

            const patternResult = validateNipatapratipadika('ūrdhvatas');
            expect(patternResult.confidence).toBeGreaterThan(0.7);
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classical coordinating particles', () => {
            const examples = [
                { word: 'ca', meaning: 'and', context: 'compound_formation' },
                { word: 'va', meaning: 'or', context: 'derivational_process' },
                { word: 'api', meaning: 'even', context: 'grammatical_analysis' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_34(example.word, { grammatical_context: example.context });
                expect(result.applies).toBe(true);
                expect(result.can_be_pratipadika).toBe(true);
                expect(result.nipata_type).toBe('coordinating');
            });
        });

        test('should handle classical emphatic particles', () => {
            const examples = [
                { word: 'eva', meaning: 'indeed' },
                { word: 'hi', meaning: 'for, indeed' },
                { word: 'khalu', meaning: 'certainly' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_34(example.word, { grammatical_context: 'semantic_grouping' });
                expect(result.applies).toBe(true);
                expect(result.can_be_pratipadika).toBe(true);
                expect(result.nipata_type).toBe('emphatic');
            });
        });

        test('should handle directional particles with patterns', () => {
            const examples = [
                { word: 'ūrdhvatas', meaning: 'from above' },
                { word: 'adhastāt', meaning: 'from below' },
                { word: 'paritas', meaning: 'around' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_34(example.word, { grammatical_context: 'morphological_study' });
                expect(result.applies).toBe(true);
                expect(result.can_be_pratipadika).toBe(true);
                expect(result.nipata_type).toBe('directional');
            });
        });
    });

    describe('Context Integration', () => {
        test('should work in compound formation context', () => {
            const result = applySutra1_1_34('ca', { 
                grammatical_context: 'compound_formation',
                compound_type: 'dvandva'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('compound_formation');
        });

        test('should work in derivational context', () => {
            const result = applySutra1_1_34('eva', { 
                grammatical_context: 'derivational_process',
                derivation_type: 'secondary'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('derivational_process');
        });

        test('should handle multiple context indicators', () => {
            const result = applySutra1_1_34('hi', { 
                grammatical_context: 'grammatical_analysis',
                allows_pratipadika: true,
                context_type: 'scholarly_analysis'
            });
            expect(result.applies).toBe(true);
            expect(result.can_be_pratipadika).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_34('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle null input', () => {
            const result = applySutra1_1_34(null);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle non-string input', () => {
            const result = applySutra1_1_34(123);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle missing context gracefully', () => {
            const result = applySutra1_1_34('ca');
            expect(result).toBeDefined();
            expect(typeof result.applies).toBe('boolean');
        });

        test('should handle unknown words gracefully', () => {
            const result = applySutra1_1_34('unknownword');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('not a nipāta');
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis', () => {
            const result = testSutra1_1_34('eva', { grammatical_context: 'compound_formation' });
            expect(result.analysis.applies).toBe(true);
            expect(result.validation.can_be_pratipadika).toBe(true);
            expect(result.examples).toBeDefined();
            expect(result.timestamp).toBeDefined();
        });

        test('should handle non-qualifying words', () => {
            const result = testSutra1_1_34('deva');
            expect(result.analysis.applies).toBe(false);
            expect(result.validation.can_be_pratipadika).toBe(false);
        });

        test('should provide educational examples', () => {
            const result = testSutra1_1_34('ca');
            expect(result.examples.coordinating).toContain('ca');
            expect(result.examples.emphatic).toContain('eva');
            expect(result.examples.temporal).toContain('tadā');
        });
    });

    describe('Linguistic Categories', () => {
        test('should handle all major nipāta categories', () => {
            const categories = [
                { words: ['ca', 'va', 'api'], type: 'coordinating' },
                { words: ['eva', 'hi', 'khalu'], type: 'emphatic' },
                { words: ['na', 'mā', 'no'], type: 'negative' },
                { words: ['tadā', 'yadā', 'sarvadā'], type: 'temporal' },
                { words: ['yatra', 'tatra', 'sarvatra'], type: 'locative' },
                { words: ['tathā', 'yathā'], type: 'manner' }
            ];

            categories.forEach(category => {
                category.words.forEach(word => {
                    const result = analyzeNipata(word);
                    expect(result.is_nipata).toBe(true);
                    expect(result.nipata_type).toBe(category.type);
                });
            });
        });

        test('should handle pattern-based categories', () => {
            const patterns = [
                { words: ['ūrdhvatas', 'adhastāt'], type: 'directional' },
                { words: ['anyatra', 'sarvatra'], type: 'locative' },
                { words: ['itarathā', 'anyathā'], type: 'manner' }
            ];

            patterns.forEach(pattern => {
                pattern.words.forEach(word => {
                    const result = analyzeNipata(word);
                    expect(result.is_nipata).toBe(true);
                    expect(result.nipata_type).toBe(pattern.type);
                });
            });
        });
    });

    describe('Integration with Grammatical Contexts', () => {
        test('should handle compound formation scenarios', () => {
            const compounds = ['ca', 'va', 'api'];
            compounds.forEach(word => {
                const result = applySutra1_1_34(word, { 
                    grammatical_context: 'compound_formation',
                    compound_participants: ['deva', 'asura']
                });
                expect(result.applies).toBe(true);
                expect(result.context_type).toBe('compound_formation');
            });
        });

        test('should handle semantic analysis scenarios', () => {
            const semanticWords = ['eva', 'hi', 'tu'];
            semanticWords.forEach(word => {
                const result = applySutra1_1_34(word, { 
                    grammatical_context: 'semantic_grouping',
                    semantic_field: 'emphasis'
                });
                expect(result.applies).toBe(true);
                expect(result.context_type).toBe('semantic_grouping');
            });
        });
    });
});
