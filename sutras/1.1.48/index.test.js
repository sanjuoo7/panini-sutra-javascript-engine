/**
 * Test cases for Sutra 1.1.48: एच इग्घ्रस्वादेशे
 * Tests the ik substitution for ec vowels when short substitution is required
 */

import { applySutra1_1_48, applyIkSubstitution, validateIkSubstitution } from './index.js';

describe('Sutra 1.1.48: एच इग्घ्रस्वादेशे (Ik substitution for ec vowels)', () => {
    
    describe('Basic Ec to Ik Substitution Tests', () => {
        test('should substitute e with i', () => {
            const result = applySutra1_1_48('e');
            expect(result.applies).toBe(true);
            expect(result.ik_substitute.ik_substitute).toBe('i');
            expect(result.ik_substitute.substitution_type).toBe('simple_shortening');
        });

        test('should substitute o with u', () => {
            const result = applySutra1_1_48('o');
            expect(result.applies).toBe(true);
            expect(result.ik_substitute.ik_substitute).toBe('u');
            expect(result.ik_substitute.substitution_type).toBe('simple_shortening');
        });

        test('should substitute ai with i', () => {
            const result = applySutra1_1_48('ai');
            expect(result.applies).toBe(true);
            expect(result.ik_substitute.ik_substitute).toBe('i');
            expect(result.ik_substitute.substitution_type).toBe('vriddhi_shortening');
        });

        test('should substitute au with u', () => {
            const result = applySutra1_1_48('au');
            expect(result.applies).toBe(true);
            expect(result.ik_substitute.ik_substitute).toBe('u');
            expect(result.ik_substitute.substitution_type).toBe('vriddhi_shortening');
        });
    });

    describe('Devanagari Vowel Tests', () => {
        test('should substitute ै with ि', () => {
            const result = applySutra1_1_48('ै');
            expect(result.applies).toBe(true);
            expect(result.ik_substitute.ik_substitute).toBe('ि');
            expect(result.ik_substitute.substitution_type).toBe('vriddhi_shortening');
        });

        test('should substitute ौ with ु', () => {
            const result = applySutra1_1_48('ौ');
            expect(result.applies).toBe(true);
            expect(result.ik_substitute.ik_substitute).toBe('ु');
            expect(result.ik_substitute.substitution_type).toBe('vriddhi_shortening');
        });
    });

    describe('Ec Vowel Classification Tests', () => {
        test('should correctly identify e as guna vowel', () => {
            const result = applySutra1_1_48('e');
            expect(result.ec_analysis.is_ec_vowel).toBe(true);
            expect(result.ec_analysis.vowel_type).toBe('simple_guna');
            expect(result.ec_analysis.phonetic_class).toBe('guna_vowel');
        });

        test('should correctly identify ai as vriddhi vowel', () => {
            const result = applySutra1_1_48('ai');
            expect(result.ec_analysis.is_ec_vowel).toBe(true);
            expect(result.ec_analysis.vowel_type).toBe('vriddhi');
            expect(result.ec_analysis.phonetic_class).toBe('vriddhi_vowel');
        });

        test('should correctly analyze base composition', () => {
            const result = applySutra1_1_48('o');
            expect(result.ec_analysis.base_composition).toBe('a+u');
            expect(result.ec_analysis.description).toBe('guna of a and u');
        });
    });

    describe('Vowel Quality Change Analysis', () => {
        test('should analyze front vowel series preservation', () => {
            const result = applySutra1_1_48('e');
            expect(result.ik_substitute.vowel_quality_change.articulatory_change).toBe('front_series_preserved');
            expect(result.ik_substitute.vowel_quality_change.phonetic_similarity).toBe('high');
        });

        test('should analyze back vowel series preservation', () => {
            const result = applySutra1_1_48('o');
            expect(result.ik_substitute.vowel_quality_change.articulatory_change).toBe('back_series_preserved');
            expect(result.ik_substitute.vowel_quality_change.phonetic_similarity).toBe('high');
        });

        test('should identify length change as shortened', () => {
            const result = applySutra1_1_48('au');
            expect(result.ik_substitute.vowel_quality_change.length_change).toBe('shortened');
        });
    });

    describe('Word-level Substitution Tests', () => {
        test('should apply ik substitution to complete words', () => {
            const result = applyIkSubstitution('देव', 'े', {});
            expect(result.success).toBe(true);
            expect(result.result_word).toBe('दिव');
            expect(result.substitution_details.original_vowel).toBe('े');
            expect(result.substitution_details.substitute_vowel).toBe('ि');
        });

        test('should handle multiple vowel substitutions', () => {
            const result = applyIkSubstitution('केशवो', 'े', {});
            expect(result.success).toBe(true);
            expect(result.result_word).toBe('किशवो');
        });

        test('should handle au substitution in words', () => {
            const result = applyIkSubstitution('गौरव', 'ौ', {});
            expect(result.success).toBe(true);
            expect(result.result_word).toBe('गुरव');
        });
    });

    describe('Grammatical Process Analysis', () => {
        test('should identify guna to simple process', () => {
            const result = applySutra1_1_48('e');
            expect(result.ik_substitute.grammatical_process).toBe('guna_to_simple');
            expect(result.ik_substitute.linguistic_reasoning).toBe('e (guna) → i (original simple vowel)');
        });

        test('should identify vriddhi to simple process', () => {
            const result = applySutra1_1_48('ai');
            expect(result.ik_substitute.grammatical_process).toBe('vriddhi_to_simple');
            expect(result.ik_substitute.linguistic_reasoning).toBe('ai (vriddhi) → i (simple vowel)');
        });
    });

    describe('Edge Cases and Validation', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_48('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Empty vowel');
        });

        test('should handle invalid input types', () => {
            const result = applySutra1_1_48(123);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should reject non-ec vowels', () => {
            const result = applySutra1_1_48('a');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('not an ec vowel');
        });

        test('should reject consonants', () => {
            const result = applySutra1_1_48('k');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('not an ec vowel');
        });
    });

    describe('Substitution Validation Tests', () => {
        test('should validate correct e → i substitution', () => {
            const result = validateIkSubstitution('e', 'i');
            expect(result.is_valid).toBe(true);
            expect(result.sutra_compliance).toBe('compliant');
        });

        test('should validate correct o → u substitution', () => {
            const result = validateIkSubstitution('o', 'u');
            expect(result.is_valid).toBe(true);
            expect(result.sutra_compliance).toBe('compliant');
        });

        test('should reject incorrect substitutions', () => {
            const result = validateIkSubstitution('e', 'a');
            expect(result.is_valid).toBe(false);
            expect(result.sutra_compliance).toBe('non_compliant');
            expect(result.expected_substitute).toBe('i');
        });

        test('should reject incorrect au substitution', () => {
            const result = validateIkSubstitution('au', 'a');
            expect(result.is_valid).toBe(false);
            expect(result.expected_substitute).toBe('u');
        });
    });

    describe('Context-based Tests', () => {
        test('should handle morphological context', () => {
            const context = { morphological_process: 'declension', position: 'stem' };
            const result = applySutra1_1_48('e', context);
            expect(result.applies).toBe(true);
            expect(result.grammatical_function).toBe('vowel_shortening');
        });

        test('should handle sandhi context', () => {
            const context = { sandhi_type: 'internal', boundary: 'morpheme' };
            const result = applySutra1_1_48('ai', context);
            expect(result.applies).toBe(true);
            expect(result.substitution_type).toBe('short_vowel_substitution');
        });
    });

    describe('Sanskrit Linguistic Examples', () => {
        test('should handle nominal stem shortening', () => {
            const result = applyIkSubstitution('गुरे', 'े');
            expect(result.success).toBe(true);
            expect(result.result_word).toBe('गुरि');
        });

        test('should handle compound formation', () => {
            const result = applyIkSubstitution('देवराज', 'े');
            expect(result.success).toBe(true);
            expect(result.result_word).toBe('दिवराज');
        });

        test('should handle verbal root modifications', () => {
            const result = applyIkSubstitution('नेत्र', 'े');
            expect(result.success).toBe(true);
            expect(result.result_word).toBe('नित्र');
        });
    });

    describe('Phonetic Consistency Tests', () => {
        test('should maintain articulatory consistency for front vowels', () => {
            const eResult = applySutra1_1_48('e');
            const aiResult = applySutra1_1_48('ai');
            
            expect(eResult.ik_substitute.ik_substitute).toBe('i');
            expect(aiResult.ik_substitute.ik_substitute).toBe('i');
            // Both front vowels map to front high vowel
        });

        test('should maintain articulatory consistency for back vowels', () => {
            const oResult = applySutra1_1_48('o');
            const auResult = applySutra1_1_48('au');
            
            expect(oResult.ik_substitute.ik_substitute).toBe('u');
            expect(auResult.ik_substitute.ik_substitute).toBe('u');
            // Both back vowels map to back high vowel
        });
    });

    describe('Source Attribution Tests', () => {
        test('should correctly attribute to sutra 1.1.48', () => {
            const result = applySutra1_1_48('e');
            expect(result.source).toBe('sutra_1_1_48');
            expect(result.applies).toBe(true);
        });
    });

    describe('Normalization Tests', () => {
        test('should normalize input correctly', () => {
            const result = applySutra1_1_48('  E  ');
            expect(result.normalized_vowel).toBe('e');
            expect(result.applies).toBe(true);
        });

        test('should preserve original input in result', () => {
            const result = applySutra1_1_48('E');
            expect(result.original_vowel).toBe('E');
            expect(result.normalized_vowel).toBe('e');
        });
    });
});
