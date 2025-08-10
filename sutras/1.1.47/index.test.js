/**
 * Test cases for Sutra 1.1.47: मिदचो ऽन्त्यात् परः
 * Tests the mid substitution functionality where substitute comes after final sound
 */

import { applySutra1_1_47 } from './index.js';

describe('Sutra 1.1.47: मिदचो ऽन्त्यात् परः (Mid substitution after final sound)', () => {
    
    describe('Basic Mid Substitution Tests', () => {
        test('should apply mid substitution for basic Sanskrit word', () => {
            const result = applySutra1_1_47('राम', 'स्य');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('रामस्य');
            expect(result.mid_analysis.original_final).toBe('म');
            expect(result.mid_analysis.substitute_element).toBe('स्य');
        });

        test('should handle consonant substitution', () => {
            const result = applySutra1_1_47('गुण', 'त्व');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('गुणत्व');
            expect(result.mid_analysis.original_final).toBe('ण');
        });

        test('should handle vowel substitution', () => {
            const result = applySutra1_1_47('कवि', 'ता');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('कविता');
            expect(result.mid_analysis.original_final).toBe('ि');
        });
    });

    describe('Complex Sanskrit Examples', () => {
        test('should handle compound substitution', () => {
            const result = applySutra1_1_47('धर्म', 'ज्ञ');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('धर्मज्ञ');
        });

        test('should handle suffix substitution', () => {
            const result = applySutra1_1_47('कर्म', 'णि');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('कर्मणि');
        });

        test('should handle verbal root substitution', () => {
            const result = applySutra1_1_47('गम्', 'अ');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('गम्अ');
        });
    });

    describe('Position Analysis Tests', () => {
        test('should correctly identify position analysis', () => {
            const result = applySutra1_1_47('वेद', 'इक');
            expect(result.mid_analysis.position_analysis.substitution_position).toBe('after_final');
            expect(result.mid_analysis.position_analysis.final_element).toBe('द');
            expect(result.mid_analysis.position_analysis.added_element).toBe('इक');
        });

        test('should handle multiple character final sounds', () => {
            const result = applySutra1_1_47('शास्त्र', 'कार');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('शास्त्रकार');
        });
    });

    describe('Grammatical Process Tests', () => {
        test('should identify as mid substitution process', () => {
            const result = applySutra1_1_47('योग', 'िन्');
            expect(result.mid_analysis.grammatical_process).toBe('mid_substitution');
            expect(result.grammatical_function).toBe('sound_substitution');
        });

        test('should handle declension-related substitutions', () => {
            const result = applySutra1_1_47('राज', 'न्');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('राजन्');
        });
    });

    describe('Edge Cases and Validation', () => {
        test('should handle empty strings', () => {
            const result = applySutra1_1_47('', 'अ');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Empty word');
        });

        test('should handle invalid input types', () => {
            const result = applySutra1_1_47(123, 'अ');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle null substitute', () => {
            const result = applySutra1_1_47('राम', null);
            expect(result.applies).toBe(false);
        });

        test('should handle single character words', () => {
            const result = applySutra1_1_47('अ', 'त्');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('अत्');
        });
    });

    describe('Sanskrit Linguistic Examples', () => {
        test('should handle anusvara substitution', () => {
            const result = applySutra1_1_47('रामं', 'च');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('रामंच');
        });

        test('should handle visarga substitution', () => {
            const result = applySutra1_1_47('रामः', 'अपि');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('रामःअपि');
        });

        test('should handle conjunct consonant substitution', () => {
            const result = applySutra1_1_47('सत्य', 'म्');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('सत्यम्');
        });
    });

    describe('Morphological Analysis', () => {
        test('should handle nominal substitution', () => {
            const result = applySutra1_1_47('गृह', 'म्');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.word_without_final).toBe('गृ');
            expect(result.mid_analysis.original_final).toBe('ह');
        });

        test('should handle verbal substitution', () => {
            const result = applySutra1_1_47('भू', 'त');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('भूत');
        });

        test('should handle adjectival substitution', () => {
            const result = applySutra1_1_47('सुन्दर', 'ता');
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('सुन्दरता');
        });
    });

    describe('Context-based Tests', () => {
        test('should handle context with grammatical information', () => {
            const context = { grammatical_role: 'subject', case: 'nominative' };
            const result = applySutra1_1_47('पुत्र', 'ः', context);
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('पुत्रः');
        });

        test('should handle sandhi context', () => {
            const context = { sandhi_type: 'external', position: 'word_boundary' };
            const result = applySutra1_1_47('गच्छ', 'ति', context);
            expect(result.applies).toBe(true);
            expect(result.mid_analysis.result_after_mid).toBe('गच्छति');
        });
    });

    describe('Normalization Tests', () => {
        test('should normalize input correctly', () => {
            const result = applySutra1_1_47('  राम  ', '  स्य  ');
            expect(result.normalized_original).toBe('राम');
            expect(result.normalized_substitute).toBe('स्य');
            expect(result.applies).toBe(true);
        });

        test('should preserve original input in result', () => {
            const result = applySutra1_1_47('राम', 'स्य');
            expect(result.original_word).toBe('राम');
            expect(result.substitute).toBe('स्य');
        });
    });

    describe('Source Attribution Tests', () => {
        test('should correctly attribute to sutra 1.1.47', () => {
            const result = applySutra1_1_47('तत्', 'र');
            expect(result.source).toBe('sutra_1_1_47');
            expect(result.applies).toBe(true);
        });
    });
});
