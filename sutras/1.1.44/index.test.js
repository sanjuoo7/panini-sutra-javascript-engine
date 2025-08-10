import { 
    applySutra1_1_44,
    analyzeNañPrefix,
    analyzeÑuElement,
    analyzeUpasarga,
    analyzeGrammaticalFunction,
    validateNañÑuUpasarga,
    testSutra1_1_44
} from './index.js';

describe('Sutra 1.1.44: नञ्ञुपसर्गश्च Tests', () => {
    
    describe('Core Functionality - applySutra1_1_44', () => {
        test('should identify words with nañ prefixes', () => {
            const result = applySutra1_1_44('adhama', { grammatical_context: 'prefix_analysis' });
            expect(result.applies).toBe(true);
            expect(result.has_nañ).toBe(true);
            expect(result.sup_like_behavior).toBe(true);
        });

        test('should identify words with upasarga prefixes', () => {
            const result = applySutra1_1_44('pragam', { grammatical_context: 'verbal_analysis' });
            expect(result.applies).toBe(true);
            expect(result.has_upasarga).toBe(true);
            expect(result.sup_like_behavior).toBe(true);
        });

        test('should identify words with ñu suffixes', () => {
            const result = applySutra1_1_44('kāraka', { grammatical_context: 'morphological_analysis' });
            expect(result.applies).toBe(true);
            expect(result.has_ñu).toBe(true);
            expect(result.sup_like_behavior).toBe(true);
        });

        test('should not apply to words without nañ, ñu, or upasarga', () => {
            const result = applySutra1_1_44('phala');
            expect(result.applies).toBe(false);
            expect(result.has_nañ).toBe(false);
            expect(result.has_ñu).toBe(false);
            expect(result.has_upasarga).toBe(false);
            expect(result.reason).toContain('does not contain nañ, ñu, or upasarga');
        });

        test('should handle context-provided information', () => {
            const result = applySutra1_1_44('testword', { 
                has_nañ: true,
                nañ_prefix: 'an'
            });
            expect(result.applies).toBe(true);
            expect(result.has_nañ).toBe(true);
        });

        test('should handle multiple elements', () => {
            const result = applySutra1_1_44('anupagam', { 
                grammatical_context: 'complex_analysis'
            });
            expect(result.applies).toBe(true);
            // Could have both nañ and upasarga
        });
    });

    describe('Nañ Prefix Analysis - analyzeNañPrefix', () => {
        test('should identify basic negative prefixes', () => {
            const nañPrefixes = [
                { word: 'adhama', prefix: 'a' },
                { word: 'ananta', prefix: 'an' },
                { word: 'nirguṇa', prefix: 'nir' },
                { word: 'duḥkha', prefix: 'duḥ' }
            ];

            nañPrefixes.forEach(test => {
                const result = analyzeNañPrefix(test.word);
                expect(result.has_nañ).toBe(true);
                expect(result.prefix).toBe(test.prefix);
                expect(result.type).toBe('negative');
            });
        });

        test('should identify complex negative prefixes', () => {
            const complexPrefixes = [
                { word: 'niḥśaṅka', prefix: 'niḥ' },
                { word: 'nisphala', prefix: 'nis' },
                { word: 'durgama', prefix: 'dur' },
                { word: 'duskṛta', prefix: 'dus' }
            ];

            complexPrefixes.forEach(test => {
                const result = analyzeNañPrefix(test.word);
                expect(result.has_nañ).toBe(true);
                expect(result.prefix).toBe(test.prefix);
            });
        });

        test('should provide remainder after prefix removal', () => {
            const result = analyzeNañPrefix('ananta');
            expect(result.has_nañ).toBe(true);
            expect(result.remainder).toBe('anta');
            expect(result.meaning).toBe('not/without');
        });

        test('should handle context-provided nañ', () => {
            const result = analyzeNañPrefix('unknown', { 
                has_nañ: true,
                nañ_prefix: 'na'
            });
            expect(result.has_nañ).toBe(true);
            expect(result.prefix).toBe('na');
            expect(result.source).toBe('context');
        });

        test('should not identify non-nañ words', () => {
            const nonNañWords = ['phala', 'gṛha', 'karma'];
            nonNañWords.forEach(word => {
                const result = analyzeNañPrefix(word);
                expect(result.has_nañ).toBe(false);
            });
        });
    });

    describe('Ñu Element Analysis - analyzeÑuElement', () => {
        test('should identify kṛt suffixes', () => {
            const kṛtSuffixes = [
                { word: 'kāraka', suffix: 'aka', type: 'kṛt' },
                { word: 'kārya', suffix: 'ya', type: 'kṛt' },
                { word: 'karaṇa', suffix: 'ana', type: 'kṛt' }
            ];

            kṛtSuffixes.forEach(test => {
                const result = analyzeÑuElement(test.word);
                expect(result.has_ñu).toBe(true);
                expect(result.suffix).toBe(test.suffix);
                expect(result.type).toBe(test.type);
            });
        });

        test('should identify taddhita suffixes', () => {
            const taddhitaSuffixes = [
                { word: 'vaidika', suffix: 'ika', type: 'taddhita' },
                { word: 'pūjiya', suffix: 'iya', type: 'taddhita' },
                { word: 'balin', suffix: 'in', type: 'taddhita' },
                { word: 'dhanavat', suffix: 'vat', type: 'taddhita' }
            ];

            taddhitaSuffixes.forEach(test => {
                const result = analyzeÑuElement(test.word);
                expect(result.has_ñu).toBe(true);
                expect(result.suffix).toBe(test.suffix);
                expect(result.type).toBe(test.type);
            });
        });

        test('should provide stem information', () => {
            const result = analyzeÑuElement('kāraka');
            expect(result.has_ñu).toBe(true);
            expect(result.stem).toBe('kārak');
            expect(result.meaning).toBe('doer/agent');
        });

        test('should handle context-provided ñu', () => {
            const result = analyzeÑuElement('unknown', { 
                has_ñu: true,
                ñu_suffix: 'aka',
                ñu_type: 'kṛt'
            });
            expect(result.has_ñu).toBe(true);
            expect(result.suffix).toBe('aka');
            expect(result.type).toBe('kṛt');
            expect(result.source).toBe('context');
        });

        test('should not identify non-ñu words', () => {
            const nonÑuWords = ['phala', 'gṛha', 'nara'];
            nonÑuWords.forEach(word => {
                const result = analyzeÑuElement(word);
                expect(result.has_ñu).toBe(false);
            });
        });
    });

    describe('Upasarga Analysis - analyzeUpasarga', () => {
        test('should identify basic upasargas', () => {
            const basicUpasargas = [
                { word: 'pragam', prefix: 'pra' },
                { word: 'vicar', prefix: 'vi' },
                { word: 'samgam', prefix: 'sam' },
                { word: 'upagam', prefix: 'upa' },
                { word: 'nipat', prefix: 'ni' }
            ];

            basicUpasargas.forEach(test => {
                const result = analyzeUpasarga(test.word);
                expect(result.has_upasarga).toBe(true);
                expect(result.prefix).toBe(test.prefix);
            });
        });

        test('should identify complex upasargas', () => {
            const complexUpasargas = [
                { word: 'adhigam', prefix: 'adhi' },
                { word: 'abhigam', prefix: 'abhi' },
                { word: 'parigam', prefix: 'pari' },
                { word: 'pratigam', prefix: 'prati' }
            ];

            complexUpasargas.forEach(test => {
                const result = analyzeUpasarga(test.word);
                expect(result.has_upasarga).toBe(true);
                expect(result.prefix).toBe(test.prefix);
            });
        });

        test('should provide remainder and meaning', () => {
            const result = analyzeUpasarga('pragam');
            expect(result.has_upasarga).toBe(true);
            expect(result.remainder).toBe('gam');
            expect(result.meaning).toBe('forth/forward');
        });

        test('should handle context-provided upasarga', () => {
            const result = analyzeUpasarga('unknown', { 
                has_upasarga: true,
                upasarga_prefix: 'pra'
            });
            expect(result.has_upasarga).toBe(true);
            expect(result.prefix).toBe('pra');
            expect(result.source).toBe('context');
        });

        test('should not identify non-upasarga words', () => {
            const nonUpasargaWords = ['phala', 'gṛha', 'karma'];
            nonUpasargaWords.forEach(word => {
                const result = analyzeUpasarga(word);
                expect(result.has_upasarga).toBe(false);
            });
        });

        test('should handle longer prefixes correctly', () => {
            // Should match 'abhi' not just 'a'
            const result = analyzeUpasarga('abhigam');
            expect(result.prefix).toBe('abhi');
            expect(result.remainder).toBe('gam');
        });
    });

    describe('Grammatical Function Analysis - analyzeGrammaticalFunction', () => {
        test('should identify negative modification function', () => {
            const result = analyzeGrammaticalFunction('adhama');
            expect(result.function).toBe('negative_modification');
            expect(result.role).toBe('modifier');
            expect(result.sup_like_behavior).toBe(true);
        });

        test('should identify verbal derivation function', () => {
            const result = analyzeGrammaticalFunction('kāraka');
            expect(result.function).toBe('verbal_derivation');
            expect(result.role).toBe('derived_nominal');
        });

        test('should identify nominal derivation function', () => {
            const result = analyzeGrammaticalFunction('vaidika');
            expect(result.function).toBe('nominal_derivation');
            expect(result.role).toBe('derived_adjective');
        });

        test('should identify verbal modification function', () => {
            const result = analyzeGrammaticalFunction('pragam');
            expect(result.function).toBe('verbal_modification');
            expect(result.role).toBe('modified_verb');
        });

        test('should handle unknown functions', () => {
            const result = analyzeGrammaticalFunction('phala');
            expect(result.function).toBe('unknown');
            expect(result.role).toBe('unspecified');
        });
    });

    describe('Validation - validateNañÑuUpasarga', () => {
        test('should validate words with nañ prefixes', () => {
            const result = validateNañÑuUpasarga('adhama', { 
                grammatical_context: 'prefix_analysis'
            });
            expect(result.is_valid_application).toBe(true);
            expect(result.has_nañ_ñu_upasarga).toBe(true);
            expect(result.confidence).toBeGreaterThan(0.6);
        });

        test('should provide usage notes', () => {
            const result = validateNañÑuUpasarga('pragam');
            expect(result.usage_note).toContain('elements covered by Sutra 1.1.44');
            expect(result.usage_note).toContain('sup-like behavior');
        });

        test('should provide grammatical properties', () => {
            const result = validateNañÑuUpasarga('kāraka');
            expect(result.grammatical_properties.sup_like_behavior).toBe(true);
            expect(result.grammatical_properties.function).toBeDefined();
        });

        test('should handle non-qualifying words', () => {
            const result = validateNañÑuUpasarga('phala');
            expect(result.is_valid_application).toBe(false);
            expect(result.has_nañ_ñu_upasarga).toBe(false);
            expect(result.confidence).toBe(0);
        });

        test('should handle invalid input', () => {
            const result = validateNañÑuUpasarga(null);
            expect(result.is_valid_application).toBe(false);
            expect(result.explanation).toContain('Invalid input');
        });

        test('should boost confidence for multiple elements', () => {
            const result = validateNañÑuUpasarga('anupagam'); // potential multiple elements
            if (result.is_valid_application) {
                expect(result.confidence).toBeGreaterThan(0.5);
            }
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classic nañ examples', () => {
            const nañExamples = [
                { word: 'adhama', prefix: 'a', meaning: 'not-dharma' },
                { word: 'ananta', prefix: 'an', meaning: 'endless' },
                { word: 'nirguṇa', prefix: 'nir', meaning: 'without qualities' },
                { word: 'duḥkha', prefix: 'duḥ', meaning: 'suffering' }
            ];

            nañExamples.forEach(example => {
                const result = applySutra1_1_44(example.word);
                expect(result.applies).toBe(true);
                expect(result.has_nañ).toBe(true);
            });
        });

        test('should handle classic ñu examples', () => {
            const ñuExamples = [
                { word: 'kāraka', suffix: 'aka', type: 'kṛt' },
                { word: 'vaidika', suffix: 'ika', type: 'taddhita' },
                { word: 'kārya', suffix: 'ya', type: 'kṛt' },
                { word: 'balin', suffix: 'in', type: 'taddhita' }
            ];

            ñuExamples.forEach(example => {
                const result = applySutra1_1_44(example.word);
                expect(result.applies).toBe(true);
                expect(result.has_ñu).toBe(true);
            });
        });

        test('should handle classic upasarga examples', () => {
            const upasargaExamples = [
                { word: 'pragam', prefix: 'pra', meaning: 'go forth' },
                { word: 'vicar', prefix: 'vi', meaning: 'move about' },
                { word: 'samgam', prefix: 'sam', meaning: 'come together' },
                { word: 'upagam', prefix: 'upa', meaning: 'approach' }
            ];

            upasargaExamples.forEach(example => {
                const result = applySutra1_1_44(example.word);
                expect(result.applies).toBe(true);
                expect(result.has_upasarga).toBe(true);
            });
        });
    });

    describe('Complex Cases', () => {
        test('should handle words with multiple elements', () => {
            // Words that might have both nañ and upasarga
            const complexWords = ['anupagam', 'durupagam'];
            
            complexWords.forEach(word => {
                const result = applySutra1_1_44(word);
                if (result.applies) {
                    const elementCount = [result.has_nañ, result.has_ñu, result.has_upasarga]
                        .filter(Boolean).length;
                    expect(elementCount).toBeGreaterThan(0);
                }
            });
        });

        test('should distinguish between similar patterns', () => {
            // 'kara' vs 'kāraka' - only the latter has ñu suffix
            const karaResult = applySutra1_1_44('kara');
            const kārakaResult = applySutra1_1_44('kāraka');
            
            expect(karaResult.has_ñu).toBe(false);
            expect(kārakaResult.has_ñu).toBe(true);
        });

        test('should handle ambiguous prefixes correctly', () => {
            // Make sure 'a' prefix is properly identified vs random 'a' sounds
            const aWords = ['adhama', 'agni']; // only 'adhama' should have nañ
            
            const adhamaResult = applySutra1_1_44('adhama');
            const agniResult = applySutra1_1_44('agni');
            
            expect(adhamaResult.has_nañ).toBe(true);
            expect(agniResult.has_nañ).toBe(false);
        });
    });

    describe('Context Integration', () => {
        test('should work with prefix analysis context', () => {
            const result = applySutra1_1_44('adhama', { 
                grammatical_context: 'prefix_analysis'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('prefix_analysis');
        });

        test('should work with morphological analysis context', () => {
            const result = applySutra1_1_44('kāraka', { 
                grammatical_context: 'morphological_analysis'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('morphological_analysis');
        });

        test('should work with verbal analysis context', () => {
            const result = applySutra1_1_44('pragam', { 
                grammatical_context: 'verbal_analysis'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('verbal_analysis');
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_44('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle null input', () => {
            const result = applySutra1_1_44(null);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle non-string input', () => {
            const result = applySutra1_1_44(123);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle very short words', () => {
            const result = applySutra1_1_44('a');
            expect(result).toBeDefined();
            expect(typeof result.applies).toBe('boolean');
        });

        test('should handle words with unclear structure', () => {
            const result = applySutra1_1_44('xyzabc');
            expect(result.applies).toBe(false);
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis for nañ words', () => {
            const result = testSutra1_1_44('adhama');
            expect(result.analysis.applies).toBe(true);
            expect(result.validation.has_nañ_ñu_upasarga).toBe(true);
            expect(result.examples.nañ_examples).toBeDefined();
            expect(result.linguistic_notes.nañ_function).toContain('negative');
        });

        test('should provide complete analysis for ñu words', () => {
            const result = testSutra1_1_44('kāraka');
            expect(result.analysis.applies).toBe(true);
            expect(result.examples.ñu_examples).toBeDefined();
            expect(result.linguistic_notes.ñu_function).toContain('suffixes');
        });

        test('should provide complete analysis for upasarga words', () => {
            const result = testSutra1_1_44('pragam');
            expect(result.analysis.applies).toBe(true);
            expect(result.examples.upasarga_examples).toBeDefined();
            expect(result.linguistic_notes.upasarga_function).toContain('prefixes');
        });

        test('should handle non-qualifying words', () => {
            const result = testSutra1_1_44('phala');
            expect(result.analysis.applies).toBe(false);
            expect(result.validation.has_nañ_ñu_upasarga).toBe(false);
        });

        test('should explain grammatical concepts', () => {
            const result = testSutra1_1_44('adhama');
            expect(result.linguistic_notes.sutra_purpose).toContain('extends the definition of sup');
            expect(result.linguistic_notes.sup_like_behavior).toContain('case endings');
        });
    });

    describe('Pattern Recognition', () => {
        test('should recognize nañ patterns consistently', () => {
            const nañPatterns = ['a', 'an', 'nir', 'nis', 'niḥ', 'dur', 'dus', 'duḥ'];
            
            nañPatterns.forEach(pattern => {
                const testWord = pattern + 'test';
                const result = analyzeNañPrefix(testWord);
                expect(result.has_nañ).toBe(true);
                expect(result.prefix).toBe(pattern);
            });
        });

        test('should recognize ñu patterns consistently', () => {
            const ñuPatterns = ['aka', 'ika', 'iya', 'ya', 'ana', 'in', 'vat', 'mat'];
            
            ñuPatterns.forEach(pattern => {
                const testWord = 'test' + pattern;
                const result = analyzeÑuElement(testWord);
                expect(result.has_ñu).toBe(true);
                expect(result.suffix).toBe(pattern);
            });
        });

        test('should recognize upasarga patterns consistently', () => {
            const upasargaPatterns = ['pra', 'vi', 'sam', 'upa', 'ni', 'anu', 'ava'];
            
            upasargaPatterns.forEach(pattern => {
                const testWord = pattern + 'test';
                const result = analyzeUpasarga(testWord);
                expect(result.has_upasarga).toBe(true);
                expect(result.prefix).toBe(pattern);
            });
        });
    });

    describe('Integration with Sanskrit Grammar', () => {
        test('should properly identify sup-like behavior', () => {
            const result = applySutra1_1_44('adhama');
            expect(result.applies).toBe(true);
            expect(result.sup_like_behavior).toBe(true);
            
            const validation = validateNañÑuUpasarga('adhama');
            expect(validation.grammatical_properties.sup_like_behavior).toBe(true);
        });

        test('should integrate with morphological analysis', () => {
            const result = applySutra1_1_44('kāraka', { 
                grammatical_context: 'morphological_analysis'
            });
            expect(result.applies).toBe(true);
            expect(result.has_ñu).toBe(true);
            expect(result.grammatical_function.function).toBe('verbal_derivation');
        });

        test('should support prefix-verb analysis', () => {
            const result = applySutra1_1_44('pragam', { 
                grammatical_context: 'verbal_analysis'
            });
            expect(result.applies).toBe(true);
            expect(result.has_upasarga).toBe(true);
            expect(result.grammatical_function.function).toBe('verbal_modification');
        });
    });
});
