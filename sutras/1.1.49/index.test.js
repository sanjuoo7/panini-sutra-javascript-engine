/**
 * Test cases for Sutra 1.1.49: षष्ठी स्थानेयोगा
 * Tests the interpretation of genitive case as "in the place of" for substitution
 */

import { 
    applySutra1_1_49, 
    interpretSutraWithParibhasha, 
    validateGenitiveUsage, 
    analyzeSubstitutionScope 
} from './index.js';

describe('Sutra 1.1.49: षष्ठी स्थानेयोगा (Genitive case indicates substitution)', () => {
    
    describe('Basic Genitive Interpretation Tests', () => {
        test('should interpret masculine singular genitive', () => {
            const result = applySutra1_1_49('रामस्य');
            expect(result.applies).toBe(true);
            expect(result.genitive_analysis.is_genitive).toBe(true);
            expect(result.substitution_interpretation.substitution_force).toBe('in_place_of');
            expect(result.substitution_interpretation.meaning).toBe('In the place of राम');
        });

        test('should interpret feminine singular genitive', () => {
            const result = applySutra1_1_49('सीतायाः');
            expect(result.applies).toBe(true);
            expect(result.genitive_analysis.stem).toBe('सीताया'); // The actual stem based on visarga ending
            expect(result.substitution_interpretation.original_stem).toBe('सीताया');
        });

        test('should interpret plural genitive', () => {
            const result = applySutra1_1_49('रामानाम्');
            expect(result.applies).toBe(true);
            expect(result.genitive_analysis.grammatical_info.number).toBe('plural');
            expect(result.substitution_interpretation.meaning).toBe('In the place of राम');
        });
    });

    describe('Genitive Pattern Recognition Tests', () => {
        test('should recognize a-stem genitive patterns', () => {
            const result = applySutra1_1_49('देवस्य');
            expect(result.genitive_analysis.grammatical_info.declension).toBe('a_stem');
            expect(['masculine', 'neuter']).toContain(result.genitive_analysis.grammatical_info.gender);
            expect(result.genitive_analysis.genitive_ending).toBe('स्य');
        });

        test('should recognize dual genitive patterns', () => {
            const result = applySutra1_1_49('देवयोः');
            expect(result.genitive_analysis.grammatical_info.number).toBe('dual');
            expect(result.genitive_analysis.genitive_ending).toBe('योः');
        });

        test('should recognize consonant stem patterns', () => {
            const result = applySutra1_1_49('राजः');
            expect(result.genitive_analysis.grammatical_info.declension).toBe('consonant_stem');
            expect(result.genitive_analysis.genitive_ending).toBe('ः');
        });
    });

    describe('Substitution Force Analysis Tests', () => {
        test('should indicate correct substitution force', () => {
            const result = applySutra1_1_49('गुणस्य');
            expect(result.substitution_interpretation.substitution_force).toBe('in_place_of');
            expect(result.substitution_interpretation.interpretation_type).toBe('sthane_yoga');
        });

        test('should provide proper explanation', () => {
            const result = applySutra1_1_49('वृद्धेः');
            expect(result.substitution_interpretation.explanation).toContain('substitution');
            expect(result.substitution_interpretation.explanation).toContain('वृद्धे');
        });

        test('should identify paribhasha application', () => {
            const result = applySutra1_1_49('अचः');
            expect(result.substitution_interpretation.paribhasha_application).toBe('षष्ठी स्थानेयोगा applies');
        });
    });

    describe('Substitution Type Determination Tests', () => {
        test('should identify phonemic substitution for single characters', () => {
            const result = applySutra1_1_49('अस्य');
            expect(result.substitution_interpretation.grammatical_process).toBe('phonemic_substitution');
        });

        test('should identify morphemic substitution with root context', () => {
            const context = { grammatical_category: 'root' };
            const result = applySutra1_1_49('गमस्य', context);
            expect(result.substitution_interpretation.grammatical_process).toBe('morphemic_substitution');
        });

        test('should identify affixal substitution with affix context', () => {
            const context = { grammatical_category: 'affix' };
            const result = applySutra1_1_49('तिङस्य', context);
            expect(result.substitution_interpretation.grammatical_process).toBe('affixal_substitution');
        });
    });

    describe('Sutra Text Interpretation Tests', () => {
        test('should interpret simple sutra with genitive', () => {
            const result = interpretSutraWithParibhasha('अचः गुणः');
            expect(result.substitution_count).toBe(2); // Both अचः and गुणः are genitive
            expect(result.word_interpretations.some(w => w.force === 'substitution')).toBe(true);
        });

        test('should handle multiple genitives in sutra', () => {
            const result = interpretSutraWithParibhasha('अचः एचः गुणः');
            expect(result.substitution_count).toBe(3); // All three are genitive
            expect(result.paribhasha_applied).toBe('षष्ठी स्थानेयोगा');
        });

        test('should identify non-genitive words', () => {
            const result = interpretSutraWithParibhasha('अच् गुण वृद्धि');
            expect(result.word_interpretations.some(w => w.force === 'literal')).toBe(true);
        });
    });

    describe('Genitive Usage Validation Tests', () => {
        test('should validate correct genitive usage', () => {
            const result = validateGenitiveUsage('रामस्य', 'राम');
            expect(result.is_valid).toBe(true);
            expect(result.paribhasha_compliance).toBe('compliant');
        });

        test('should validate with expected substitution meaning', () => {
            const result = validateGenitiveUsage('देवस्य', 'देव');
            expect(result.interpreted_meaning).toBe('In the place of देव');
            expect(result.substitution_force).toBe('in_place_of');
        });

        test('should detect usage mismatch', () => {
            const result = validateGenitiveUsage('रामस्य', 'सीता');
            expect(result.is_valid).toBe(false);
            expect(result.paribhasha_compliance).toBe('needs_review');
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_49('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Empty expression');
        });

        test('should handle invalid input types', () => {
            const result = applySutra1_1_49(123);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle non-genitive expressions', () => {
            const result = applySutra1_1_49('राम');
            expect(result.genitive_analysis.is_genitive).toBe(false);
            expect(result.substitution_interpretation.interpretation_type).toBe('non_genitive');
        });
    });

    describe('Case Analysis Tests', () => {
        test('should correctly identify case information', () => {
            const result = applySutra1_1_49('गुणस्य');
            expect(result.genitive_analysis.case_analysis.case).toBe('genitive');
            expect(result.genitive_analysis.case_analysis.case_number).toBe(6);
            expect(result.genitive_analysis.case_analysis.vibhakti).toBe('षष्ठी');
        });

        test('should indicate substitution force in case analysis', () => {
            const result = applySutra1_1_49('वृद्धेः');
            expect(result.genitive_analysis.case_analysis.force).toBe('substitution_indicator');
        });
    });

    describe('Grammatical Function Tests', () => {
        test('should identify as substitution indicator', () => {
            const result = applySutra1_1_49('अकारस्य');
            expect(result.grammatical_function).toBe('substitution_indicator');
            expect(result.paribhasha_type).toBe('case_interpretation');
        });

        test('should provide source attribution', () => {
            const result = applySutra1_1_49('इकारस्य');
            expect(result.source).toBe('sutra_1_1_49');
        });
    });

    describe('Substitution Scope Analysis Tests', () => {
        test('should analyze scope for multiple expressions', () => {
            const expressions = ['रामस्य', 'सीतायाः', 'देवानाम्'];
            const result = analyzeSubstitutionScope(expressions);
            expect(result.valid_genitives).toBe(3);
            expect(result.overall_substitution_force).toBe('active');
        });

        test('should handle mixed genitive and non-genitive', () => {
            const expressions = ['रामस्य', 'राम', 'देवस्य'];
            const result = analyzeSubstitutionScope(expressions);
            expect(result.valid_genitives).toBe(2);
            expect(result.total_expressions).toBe(3);
        });

        test('should provide substitution patterns', () => {
            const expressions = ['अस्य', 'गुणस्य'];
            const result = analyzeSubstitutionScope(expressions);
            expect(result.substitution_patterns).toHaveLength(2);
            expect(result.substitution_patterns[0].stem).toBe('अ');
        });
    });

    describe('Complex Grammatical Context Tests', () => {
        test('should handle morphological context', () => {
            const context = { 
                morphological_process: 'sandhi', 
                position: 'boundary',
                grammatical_category: 'phoneme'
            };
            const result = applySutra1_1_49('अकारस्य', context);
            expect(result.substitution_interpretation.grammatical_process).toBe('phonemic_substitution');
        });

        test('should handle derivational context', () => {
            const context = { 
                grammatical_category: 'affix',
                derivational_type: 'primary'
            };
            const result = applySutra1_1_49('तिप्स्य', context);
            expect(result.substitution_interpretation.grammatical_process).toBe('affixal_substitution');
        });
    });

    describe('Paribhasha Interpretation Tests', () => {
        test('should correctly apply paribhasha principle', () => {
            const result = applySutra1_1_49('गुणस्य');
            expect(result.substitution_interpretation.interpretation_type).toBe('sthane_yoga');
            expect(result.substitution_interpretation.meaning).toContain('In the place of');
        });

        test('should maintain interpretation consistency', () => {
            const result1 = applySutra1_1_49('अस्य');
            const result2 = applySutra1_1_49('इस्य');
            
            expect(result1.substitution_interpretation.substitution_force).toBe(result2.substitution_interpretation.substitution_force);
            expect(result1.substitution_interpretation.interpretation_type).toBe(result2.substitution_interpretation.interpretation_type);
        });
    });

    describe('Normalization and Input Handling Tests', () => {
        test('should handle whitespace normalization', () => {
            const result = applySutra1_1_49('  रामस्य  ');
            expect(result.normalized_expression).toBe('रामस्य');
            expect(result.applies).toBe(true);
        });

        test('should preserve original expression', () => {
            const result = applySutra1_1_49('रामस्य');
            expect(result.original_expression).toBe('रामस्य');
            expect(result.normalized_expression).toBe('रामस्य');
        });
    });
});
