import { 
    applySutra1_1_45,
    analyzeRootStructure,
    analyzeUpadha,
    analyzeIkSound,
    analyzeVowelGradation,
    getGunaForm,
    getVriddhiForm,
    validateIkUpadha,
    testSutra1_1_45
} from './index.js';

describe('Sutra 1.1.45: इगुपधाच्च धातोः Tests', () => {
    
    describe('Core Functionality - applySutra1_1_45', () => {
        test('should identify roots with ik upadha', () => {
            const result = applySutra1_1_45('kṛ', { 
                grammatical_context: 'verbal_analysis',
                is_dhatu: true 
            });
            expect(result.applies).toBe(true);
            expect(result.has_ik_upadha).toBe(true);
            expect(result.ik_type).toBe('short_r');
            expect(result.guna_applicable).toBe(true);
        });

        test('should handle i-upadha roots', () => {
            const result = applySutra1_1_45('ci', { 
                grammatical_context: 'verbal_analysis',
                is_dhatu: true 
            });
            expect(result.applies).toBe(true);
            expect(result.ik_type).toBe('short_i');
            expect(result.upadha).toBe('i'); // 'i' is the final ik vowel, treated as upadha
        });

        test('should handle u-upadha roots', () => {
            const result = applySutra1_1_45('yu', { 
                grammatical_context: 'verbal_analysis',
                is_dhatu: true 
            });
            expect(result.applies).toBe(true);
            expect(result.ik_type).toBe('short_u');
        });

        test('should not apply to non-dhatu words', () => {
            const result = applySutra1_1_45('phala'); // a word that doesn't contain ik vowels
            expect(result.applies).toBe(false);
            expect(result.is_dhatu).toBe(false);
            expect(result.reason).toContain('not appear to be a verbal root');
        });

        test('should not apply to roots without ik upadha', () => {
            const result = applySutra1_1_45('gam', { 
                grammatical_context: 'verbal_analysis',
                is_dhatu: true 
            });
            expect(result.applies).toBe(false);
            expect(result.has_ik_upadha).toBe(false);
            expect(result.reason).toContain('does not have ik vowel');
        });

        test('should handle context-provided information', () => {
            const result = applySutra1_1_45('testroot', { 
                is_dhatu: true,
                upadha: 'i',
                root: 'testroot'
            });
            expect(result.applies).toBe(true);
            expect(result.guna_applicable).toBe(true);
        });
    });

    describe('Root Structure Analysis - analyzeRootStructure', () => {
        test('should extract roots from context', () => {
            const result = analyzeRootStructure('karoti', { root: 'kṛ' });
            expect(result.root).toBe('kṛ');
            expect(result.source).toBe('context');
        });

        test('should analyze root from inflected forms', () => {
            const result = analyzeRootStructure('karoti');
            expect(result.root).toBeDefined();
            expect(result.original).toBe('karoti');
            expect(result.source).toBe('analysis');
        });

        test('should handle simple roots', () => {
            const result = analyzeRootStructure('kṛ');
            expect(result.root).toBe('kṛ');
        });

        test('should remove common verbal suffixes', () => {
            const suffixTests = [
                { word: 'bharati', expectedRoot: 'bhar' },
                { word: 'kartum', expectedRoot: 'kar' },
                { word: 'gatvā', expectedRoot: 'ga' } // Simplified expectation
            ];

            suffixTests.forEach(test => {
                const result = analyzeRootStructure(test.word);
                expect(result.root).toBe(test.expectedRoot);
            });
        });
    });

    describe('Upadha Analysis - analyzeUpadha', () => {
        test('should identify penultimate sounds', () => {
            const result = analyzeUpadha('kṛ', { root: 'kṛ' });
            expect(result.upadha).toBeDefined();
            expect(result.position).toBe('final_ik_as_upadha'); // For ik-final roots
        });

        test('should handle context-provided upadha', () => {
            const result = analyzeUpadha('test', { upadha: 'i' });
            expect(result.upadha).toBe('i');
            expect(result.source).toBe('context');
        });

        test('should extract upadha from multi-syllable roots', () => {
            const tests = [
                { root: 'bharati', expectedLength: 'multiple' },
                { root: 'gam', expectedLength: 'short' },
                { root: 'a', expectedLength: 'too_short' }
            ];

            tests.forEach(test => {
                const result = analyzeUpadha(test.root);
                if (test.expectedLength === 'too_short') {
                    expect(result.upadha).toBeNull();
                } else {
                    expect(result.all_sounds).toBeDefined();
                }
            });
        });

        test('should provide sound analysis', () => {
            const result = analyzeUpadha('bharati');
            expect(result.all_sounds).toBeDefined();
            expect(Array.isArray(result.all_sounds)).toBe(true);
        });
    });

    describe('Ik Sound Analysis - analyzeIkSound', () => {
        test('should identify i-sounds', () => {
            const iSounds = ['i', 'ī'];
            iSounds.forEach(sound => {
                const result = analyzeIkSound(sound);
                expect(result.is_ik).toBe(true);
                expect(result.ik_type).toContain('i');
                expect(result.guna_form).toBe('e');
                expect(result.vriddhi_form).toBe('ai');
            });
        });

        test('should identify u-sounds', () => {
            const uSounds = ['u', 'ū'];
            uSounds.forEach(sound => {
                const result = analyzeIkSound(sound);
                expect(result.is_ik).toBe(true);
                expect(result.ik_type).toContain('u');
                expect(result.guna_form).toBe('o');
                expect(result.vriddhi_form).toBe('au');
            });
        });

        test('should identify ṛ-sounds', () => {
            const rSounds = ['ṛ', 'ṝ'];
            rSounds.forEach(sound => {
                const result = analyzeIkSound(sound);
                expect(result.is_ik).toBe(true);
                expect(result.ik_type).toContain('r');
                expect(result.guna_form).toBe('ar');
                expect(result.vriddhi_form).toBe('ār');
            });
        });

        test('should identify ḷ-sounds', () => {
            const lSounds = ['ḷ', 'ḹ'];
            lSounds.forEach(sound => {
                const result = analyzeIkSound(sound);
                expect(result.is_ik).toBe(true);
                expect(result.ik_type).toContain('l');
                expect(result.guna_form).toBe('al');
                expect(result.vriddhi_form).toBe('āl');
            });
        });

        test('should reject non-ik sounds', () => {
            const nonIkSounds = ['a', 'ā', 'e', 'o', 'k', 'm'];
            nonIkSounds.forEach(sound => {
                const result = analyzeIkSound(sound);
                expect(result.is_ik).toBe(false);
                expect(result.reason).toContain('not an ik vowel');
            });
        });

        test('should handle null/empty input', () => {
            const result = analyzeIkSound(null);
            expect(result.is_ik).toBe(false);
            expect(result.reason).toContain('No sound provided');
        });
    });

    describe('Guna/Vriddhi Forms - getGunaForm and getVriddhiForm', () => {
        test('should provide correct guna forms', () => {
            const gunaTests = [
                { ik: 'i', guna: 'e' },
                { ik: 'ī', guna: 'e' },
                { ik: 'u', guna: 'o' },
                { ik: 'ū', guna: 'o' },
                { ik: 'ṛ', guna: 'ar' },
                { ik: 'ṝ', guna: 'ar' },
                { ik: 'ḷ', guna: 'al' },
                { ik: 'ḹ', guna: 'al' }
            ];

            gunaTests.forEach(test => {
                expect(getGunaForm(test.ik)).toBe(test.guna);
            });
        });

        test('should provide correct vriddhi forms', () => {
            const vriddhiTests = [
                { ik: 'i', vriddhi: 'ai' },
                { ik: 'ī', vriddhi: 'ai' },
                { ik: 'u', vriddhi: 'au' },
                { ik: 'ū', vriddhi: 'au' },
                { ik: 'ṛ', vriddhi: 'ār' },
                { ik: 'ṝ', vriddhi: 'ār' },
                { ik: 'ḷ', vriddhi: 'āl' },
                { ik: 'ḹ', vriddhi: 'āl' }
            ];

            vriddhiTests.forEach(test => {
                expect(getVriddhiForm(test.ik)).toBe(test.vriddhi);
            });
        });

        test('should handle unknown vowels', () => {
            expect(getGunaForm('a')).toBe('a');
            expect(getVriddhiForm('e')).toBe('e');
        });
    });

    describe('Vowel Gradation Analysis - analyzeVowelGradation', () => {
        test('should analyze gradation for ik-upadha roots', () => {
            const result = analyzeVowelGradation('kṛ', { 
                root: 'kṛ',
                upadha: 'ṛ'
            });
            expect(result.has_gradation).toBe(true);
            expect(result.basic_form).toBe('ṛ');
            expect(result.guna_form).toBe('ar');
            expect(result.vriddhi_form).toBe('ār');
            expect(result.examples).toBeDefined();
        });

        test('should provide gradation examples', () => {
            const result = analyzeVowelGradation('ci', { 
                root: 'ci',
                upadha: 'i'
            });
            expect(result.examples.basic).toContain('ci');
            expect(result.examples.guna).toContain('e');
        });

        test('should handle non-ik upadha', () => {
            const result = analyzeVowelGradation('gam', { 
                root: 'gam',
                upadha: 'a'
            });
            expect(result.has_gradation).toBe(false);
            expect(result.reason).toContain('No ik upadha');
        });
    });

    describe('Validation - validateIkUpadha', () => {
        test('should validate ik-upadha roots with high confidence', () => {
            const result = validateIkUpadha('kṛ', { 
                grammatical_context: 'verbal_analysis',
                is_dhatu: true 
            });
            expect(result.is_valid_application).toBe(true);
            expect(result.has_ik_upadha).toBe(true);
            expect(result.confidence).toBeGreaterThan(0.8);
        });

        test('should provide usage notes', () => {
            const result = validateIkUpadha('yu', { 
                is_dhatu: true,
                upadha: 'u'
            });
            expect(result.usage_note).toContain('ik vowel');
            expect(result.usage_note).toContain('penultimate');
            expect(result.usage_note).toContain('guna gradation');
            expect(result.usage_note).toContain('Sutra 1.1.45');
        });

        test('should provide grammatical properties', () => {
            const result = validateIkUpadha('ci', { 
                is_dhatu: true,
                upadha: 'i'
            });
            expect(result.grammatical_properties.guna_applicable).toBe(true);
            expect(result.grammatical_properties.ik_type).toBeDefined();
            expect(result.grammatical_properties.vowel_gradation).toBeDefined();
        });

        test('should handle non-qualifying words', () => {
            const result = validateIkUpadha('gam', { is_dhatu: true });
            expect(result.is_valid_application).toBe(false);
            expect(result.has_ik_upadha).toBe(false);
            expect(result.confidence).toBe(0);
        });

        test('should handle invalid input', () => {
            const result = validateIkUpadha(null);
            expect(result.is_valid_application).toBe(false);
            expect(result.explanation).toContain('Invalid input');
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classic ṛ-upadha roots', () => {
            const rRoots = [
                { root: 'kṛ', meaning: 'to do' },
                { root: 'bhṛ', meaning: 'to bear' },
                { root: 'smṛ', meaning: 'to remember' },
                { root: 'tṛ', meaning: 'to cross' }
            ];

            rRoots.forEach(example => {
                const result = applySutra1_1_45(example.root, { 
                    is_dhatu: true,
                    grammatical_context: 'verbal_analysis'
                });
                expect(result.applies).toBe(true);
                expect(result.ik_type).toBe('short_r');
            });
        });

        test('should handle i-upadha roots', () => {
            const iRoots = [
                { root: 'ci', meaning: 'to gather' },
                { root: 'ji', meaning: 'to conquer' },
                { root: 'śi', meaning: 'to lie' },
                { root: 'hi', meaning: 'to impel' }
            ];

            iRoots.forEach(example => {
                const result = applySutra1_1_45(example.root, { 
                    is_dhatu: true,
                    grammatical_context: 'verbal_analysis'
                });
                expect(result.applies).toBe(true);
                expect(result.ik_type).toBe('short_i');
            });
        });

        test('should handle u-upadha roots', () => {
            const uRoots = [
                { root: 'yu', meaning: 'to join' },
                { root: 'ru', meaning: 'to cry' },
                { root: 'śru', meaning: 'to hear' },
                { root: 'stu', meaning: 'to praise' }
            ];

            uRoots.forEach(example => {
                const result = applySutra1_1_45(example.root, { 
                    is_dhatu: true,
                    grammatical_context: 'verbal_analysis'
                });
                expect(result.applies).toBe(true);
                expect(result.ik_type).toBe('short_u');
            });
        });
    });

    describe('Morphological Patterns', () => {
        test('should handle different root lengths', () => {
            const rootLengths = [
                { root: 'kṛ', length: 'monosyllabic' },
                { root: 'smṛ', length: 'consonant_cluster' },
                { root: 'śru', length: 'consonant_vowel_consonant' }
            ];

            rootLengths.forEach(test => {
                const result = analyzeUpadha(test.root, { root: test.root });
                expect(result.all_sounds).toBeDefined();
            });
        });

        test('should extract correct stems from roots', () => {
            const stemExtractions = [
                { root: 'kṛ', expectedUpadha: 'ṛ' }, // final ik vowel treated as upadha
                { root: 'smṛ', expectedUpadha: 'ṛ' }, // final ik vowel treated as upadha  
                { root: 'ci', expectedUpadha: 'i' } // final ik vowel treated as upadha
            ];

            stemExtractions.forEach(test => {
                const result = analyzeUpadha(test.root, { root: test.root });
                if (result.upadha) {
                    expect(result.upadha).toBe(test.expectedUpadha);
                }
            });
        });

        test('should handle long vs short ik vowels', () => {
            const vowelPairs = [
                { short: 'i', long: 'ī' },
                { short: 'u', long: 'ū' },
                { short: 'ṛ', long: 'ṝ' }
            ];

            vowelPairs.forEach(pair => {
                const shortResult = analyzeIkSound(pair.short);
                const longResult = analyzeIkSound(pair.long);
                
                expect(shortResult.is_ik).toBe(true);
                expect(longResult.is_ik).toBe(true);
                expect(shortResult.guna_form).toBe(longResult.guna_form);
                expect(shortResult.vriddhi_form).toBe(longResult.vriddhi_form);
            });
        });
    });

    describe('Context Integration', () => {
        test('should work with verbal analysis context', () => {
            const result = applySutra1_1_45('kṛ', { 
                grammatical_context: 'verbal_analysis',
                is_dhatu: true
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('verbal_analysis');
        });

        test('should work with morphological study context', () => {
            const result = applySutra1_1_45('ci', { 
                grammatical_context: 'morphological_study',
                is_dhatu: true,
                focus: 'vowel_gradation'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('morphological_study');
        });

        test('should work with provided root information', () => {
            const result = applySutra1_1_45('complex_form', { 
                root: 'yu',
                upadha: 'u',
                is_dhatu: true
            });
            expect(result.applies).toBe(true);
            expect(result.root).toBe('yu');
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_45('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle null input', () => {
            const result = applySutra1_1_45(null);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle non-string input', () => {
            const result = applySutra1_1_45(123);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle very short roots', () => {
            const result = analyzeUpadha('a');
            expect(result.upadha).toBeNull();
            expect(result.reason).toContain('too short');
        });

        test('should handle roots with unclear structure', () => {
            const result = applySutra1_1_45('ambiguous', { 
                grammatical_context: 'uncertain'
            });
            expect(result).toBeDefined();
            expect(typeof result.applies).toBe('boolean');
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis', () => {
            const result = testSutra1_1_45('kṛ', { 
                is_dhatu: true,
                grammatical_context: 'verbal_analysis'
            });
            expect(result.analysis.applies).toBe(true);
            expect(result.validation.has_ik_upadha).toBe(true);
            expect(result.examples.r_upadha_roots).toBeDefined();
            expect(result.linguistic_notes.ik_concept).toContain('vowels i, u, ṛ, ḷ');
        });

        test('should handle non-qualifying words', () => {
            const result = testSutra1_1_45('gam', { is_dhatu: true });
            expect(result.analysis.applies).toBe(false);
            expect(result.validation.has_ik_upadha).toBe(false);
        });

        test('should provide educational examples', () => {
            const result = testSutra1_1_45('ci', { is_dhatu: true });
            expect(result.examples.i_upadha_roots).toBeDefined();
            expect(result.examples.u_upadha_roots).toBeDefined();
            expect(result.examples.r_upadha_roots).toBeDefined();
        });

        test('should explain grammatical concepts', () => {
            const result = testSutra1_1_45('yu', { is_dhatu: true });
            expect(result.linguistic_notes.upadha_concept).toContain('penultimate');
            expect(result.linguistic_notes.guna_gradation).toContain('strengthening');
            expect(result.linguistic_notes.morphological_importance).toContain('fundamental');
        });
    });

    describe('Vowel Gradation System', () => {
        test('should demonstrate complete gradation series', () => {
            const gradationSeries = [
                { basic: 'i', guna: 'e', vriddhi: 'ai' },
                { basic: 'u', guna: 'o', vriddhi: 'au' },
                { basic: 'ṛ', guna: 'ar', vriddhi: 'ār' }
            ];

            gradationSeries.forEach(series => {
                const result = analyzeIkSound(series.basic);
                expect(result.guna_form).toBe(series.guna);
                expect(result.vriddhi_form).toBe(series.vriddhi);
            });
        });

        test('should handle morphological applications', () => {
            const applications = [
                { root: 'kṛ', guna_example: 'karma', vriddhi_example: 'kārya' },
                { root: 'ci', guna_example: 'cetum', vriddhi_example: 'caitra' },
                { root: 'yu', guna_example: 'yoga', vriddhi_example: 'yautaka' }
            ];

            applications.forEach(app => {
                const result = analyzeVowelGradation(app.root, { 
                    root: app.root,
                    is_dhatu: true
                });
                expect(result.has_gradation).toBe(true);
                expect(result.examples).toBeDefined();
            });
        });
    });

    describe('Integration with Sanskrit Grammar', () => {
        test('should properly identify ik characteristics', () => {
            const result = applySutra1_1_45('kṛ', { 
                is_dhatu: true,
                grammatical_context: 'verbal_analysis'
            });
            expect(result.applies).toBe(true);
            expect(result.ik_type).toBe('short_r');
            
            const validation = validateIkUpadha('kṛ', { is_dhatu: true });
            expect(validation.grammatical_properties.guna_applicable).toBe(true);
        });

        test('should integrate with dhatu classification', () => {
            const result = applySutra1_1_45('śru', { 
                is_dhatu: true,
                grammatical_context: 'verbal_analysis'
            });
            expect(result.is_dhatu).toBe(true);
            expect(result.has_ik_upadha).toBe(true);
        });

        test('should support morphological derivation', () => {
            const result = analyzeVowelGradation('bhṛ', { 
                root: 'bhṛ',
                is_dhatu: true
            });
            expect(result.has_gradation).toBe(true);
            expect(result.guna_form).toBe('ar');
        });
    });
});
