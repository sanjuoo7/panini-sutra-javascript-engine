/**
 * Test cases for Sutra 1.1.50: स्थानेऽन्तरतमः
 * Tests the selection of the most similar substitute among available options
 */

import { applySutra1_1_50, validateAntartamaSelection } from './index.js';

describe('Sutra 1.1.50: स्थानेऽन्तरतमः (Closest substitute selection)', () => {
    
    describe('Basic Similarity Analysis Tests', () => {
        test('should select most similar vowel substitute', () => {
            const result = applySutra1_1_50('इ', ['अ', 'ई', 'उ']);
            expect(result.applies).toBe(true);
            expect(result.closest_substitute.selected_substitute).toBe('ई');
            expect(result.closest_substitute.similarity_score).toBeGreaterThan(0.4);
        });

        test('should select most similar consonant substitute', () => {
            const result = applySutra1_1_50('क', ['ग', 'च', 'त']);
            expect(result.applies).toBe(true);
            expect(result.closest_substitute.selected_substitute).toBe('ग');
            // ग is closest to क (same place of articulation, only voicing differs)
        });

        test('should handle single substitute option', () => {
            const result = applySutra1_1_50('अ', ['आ']);
            expect(result.applies).toBe(true);
            expect(result.closest_substitute.selected_substitute).toBe('आ');
        });
    });

    describe('Phonetic Similarity Tests', () => {
        test('should prefer same vowel length', () => {
            const result = applySutra1_1_50('इ', ['ई', 'अ', 'आ']);
            // ई should be preferred over आ due to length similarity with इ
            expect(result.similarity_analysis[0].phonetic_similarity.score).toBeGreaterThan(0);
        });

        test('should analyze consonant voicing similarity', () => {
            const result = applySutra1_1_50('क', ['ख', 'ग', 'प']);
            const analysis = result.similarity_analysis;
            
            // Find the analysis for 'ग' and 'ख'
            const gAnalysis = analysis.find(a => a.substitute === 'ग');
            const khAnalysis = analysis.find(a => a.substitute === 'ख');
            
            // Both should have some similarity but ग might be closer due to voicing pattern
            expect(gAnalysis.similarity_score).toBeGreaterThan(0);
            expect(khAnalysis.similarity_score).toBeGreaterThan(0);
        });

        test('should analyze feature overlap correctly', () => {
            const result = applySutra1_1_50('त', ['द', 'न', 'प']);
            const dAnalysis = result.similarity_analysis.find(a => a.substitute === 'द');
            expect(dAnalysis.phonetic_similarity.common_features.length).toBeGreaterThan(0);
        });
    });

    describe('Articulatory Similarity Tests', () => {
        test('should prefer same place of articulation', () => {
            const result = applySutra1_1_50('क', ['ग', 'च', 'त']);
            const gAnalysis = result.similarity_analysis.find(a => a.substitute === 'ग');
            expect(gAnalysis.articulatory_similarity.similarity_type).toBe('same_place');
            expect(gAnalysis.articulatory_similarity.score).toBe(1.0);
        });

        test('should give partial credit for adjacent places', () => {
            const result = applySutra1_1_50('त', ['द', 'ट', 'च']);
            const tAnalysis = result.similarity_analysis.find(a => a.substitute === 'ट');
            expect(tAnalysis.articulatory_similarity.score).toBeGreaterThan(0.5);
            expect(tAnalysis.articulatory_similarity.similarity_type).toBe('adjacent_place');
        });

        test('should identify articulatory places correctly', () => {
            const result = applySutra1_1_50('प', ['ब', 'म', 'क']);
            const bAnalysis = result.similarity_analysis.find(a => a.substitute === 'ब');
            expect(bAnalysis.articulatory_similarity.original_place).toBe('labial');
            expect(bAnalysis.articulatory_similarity.substitute_place).toBe('labial');
        });
    });

    describe('Grammatical Similarity Tests', () => {
        test('should prefer same vowel length in grammatical context', () => {
            const result = applySutra1_1_50('उ', ['ऊ', 'अ', 'इ']);
            const iAnalysis = result.similarity_analysis.find(a => a.substitute === 'इ');
            expect(iAnalysis.grammatical_similarity.similarities).toContain('same_vowel_length');
            // इ and उ are both short vowels, so they should have same_vowel_length similarity
        });

        test('should prefer same consonant type', () => {
            const result = applySutra1_1_50('म', ['न', 'क', 'र']);
            const nAnalysis = result.similarity_analysis.find(a => a.substitute === 'न');
            expect(nAnalysis.grammatical_similarity.similarities).toContain('same_consonant_type');
        });

        test('should handle grammatical function context', () => {
            const context = { 
                grammatical_function: 'ending',
                preferred_substitute_type: 'vowel'
            };
            const result = applySutra1_1_50('अ', ['आ', 'क'], context);
            expect(result.closest_substitute.selected_substitute).toBe('आ');
        });
    });

    describe('Positional Context Tests', () => {
        test('should consider word position', () => {
            const context = { position: 'initial' };
            const result = applySutra1_1_50('अ', ['आ', 'इ'], context);
            expect(result.applies).toBe(true);
            // Should have position analysis
            expect(result.similarity_analysis[0].positional_similarity.position_context).toBe('initial');
        });

        test('should handle environment context', () => {
            const context = { 
                position: 'medial',
                preceding_sound: 'र',
                following_sound: 'म'
            };
            const result = applySutra1_1_50('अ', ['आ', 'इ'], context);
            expect(result.similarity_analysis[0].positional_similarity.environment_analysis.preceding).toBe('र');
        });
    });

    describe('Ranking and Selection Tests', () => {
        test('should provide complete ranking of substitutes', () => {
            const result = applySutra1_1_50('इ', ['अ', 'ई', 'उ', 'आ']);
            expect(result.closest_substitute.ranking).toHaveLength(4);
            expect(result.closest_substitute.ranking[0].rank).toBe(1);
            expect(result.closest_substitute.ranking[0].substitute).toBe(result.closest_substitute.selected_substitute);
        });

        test('should handle tie-breaking in similarity scores', () => {
            const result = applySutra1_1_50('अ', ['आ', 'इ']);
            expect(result.closest_substitute.selected_substitute).toBeDefined();
            expect(result.closest_substitute.similarity_score).toBeGreaterThan(0);
        });

        test('should provide detailed selection reasoning', () => {
            const result = applySutra1_1_50('क', ['ग', 'च']);
            expect(result.closest_substitute.selection_reasoning).toContain('similarity score');
            expect(result.closest_substitute.detailed_analysis).toBeDefined();
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle empty original element', () => {
            const result = applySutra1_1_50('', ['अ', 'आ']);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Empty original element');
        });

        test('should handle invalid input types', () => {
            const result = applySutra1_1_50(123, ['अ']);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle non-array substitutes', () => {
            const result = applySutra1_1_50('अ', 'आ');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('must be an array');
        });

        test('should handle empty substitutes array', () => {
            const result = applySutra1_1_50('अ', []);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('No substitute elements');
        });

        test('should handle invalid substitute types', () => {
            const result = applySutra1_1_50('अ', ['आ', 123, null]);
            expect(result.applies).toBe(true);
            const invalidAnalysis = result.similarity_analysis.find(a => a.substitute === 123);
            expect(invalidAnalysis.error).toContain('Invalid substitute type');
        });
    });

    describe('Complex Sanskrit Examples', () => {
        test('should handle vowel gradation choices', () => {
            // Choosing between guna and vriddhi options
            const result = applySutra1_1_50('इ', ['ए', 'ऐ', 'अ']);
            // ए (guna) should be closer than ऐ (vriddhi) for simple gradation
            expect(result.applies).toBe(true);
        });

        test('should handle consonant assimilation choices', () => {
            // Choosing nasals for assimilation
            const result = applySutra1_1_50('न', ['म', 'ण', 'ङ']);
            expect(result.applies).toBe(true);
            expect(result.closest_substitute.selected_substitute).toBeDefined();
        });

        test('should handle sandhi substitute selection', () => {
            const context = { 
                grammatical_function: 'sandhi',
                position: 'boundary'
            };
            const result = applySutra1_1_50('त्', ['द्', 'न्', 'ल्'], context);
            expect(result.applies).toBe(true);
        });
    });

    describe('Validation Tests', () => {
        test('should validate optimal substitute selection', () => {
            const result = validateAntartamaSelection('क', 'ग', ['च', 'त', 'प']);
            expect(result.is_valid).toBe(true);
            expect(result.paribhasha_compliance).toBe('compliant');
        });

        test('should detect suboptimal selection', () => {
            const result = validateAntartamaSelection('इ', 'अ', ['ई', 'उ']);
            // ई should be more similar to इ than अ
            expect(result.is_valid).toBe(false);
            expect(result.paribhasha_compliance).toBe('non_compliant');
            expect(result.selected_substitute).toBe('ई');
        });

        test('should provide alternative ranking in validation', () => {
            const result = validateAntartamaSelection('प', 'क', ['ब', 'म']);
            expect(result.alternative_ranking).toBeDefined();
            expect(result.alternative_ranking.length).toBeGreaterThan(0);
        });
    });

    describe('Source Attribution Tests', () => {
        test('should correctly attribute to sutra 1.1.50', () => {
            const result = applySutra1_1_50('अ', ['आ']);
            expect(result.source).toBe('sutra_1_1_50');
            expect(result.paribhasha_type).toBe('substitution_selection');
        });

        test('should identify grammatical function', () => {
            const result = applySutra1_1_50('इ', ['ए', 'ऐ']);
            expect(result.grammatical_function).toBe('similarity_based_selection');
        });
    });

    describe('Comprehensive Similarity Scoring Tests', () => {
        test('should weight different similarity factors appropriately', () => {
            const result = applySutra1_1_50('त', ['द', 'ध', 'न']);
            const dAnalysis = result.similarity_analysis.find(a => a.substitute === 'द');
            
            // Should have high score due to same place of articulation
            expect(dAnalysis.articulatory_similarity.score).toBe(1.0);
            expect(dAnalysis.similarity_score).toBeGreaterThan(0.6);
        });

        test('should handle vowel system relationships', () => {
            const result = applySutra1_1_50('अ', ['आ', 'इ', 'उ']);
            const aaAnalysis = result.similarity_analysis.find(a => a.substitute === 'आ');
            
            // आ should be most similar to अ (same quality, different length)
            expect(aaAnalysis.similarity_score).toBeGreaterThan(0.4);
            expect(result.closest_substitute.selected_substitute).toBe('आ');
        });
    });

    describe('Normalization Tests', () => {
        test('should normalize inputs correctly', () => {
            const result = applySutra1_1_50('  अ  ', ['  आ  ', 'इ']);
            expect(result.normalized_original).toBe('अ');
            expect(result.normalized_substitutes).toEqual(['आ', 'इ']);
        });

        test('should preserve original inputs in result', () => {
            const result = applySutra1_1_50('अ', ['आ', 'इ']);
            expect(result.original_element).toBe('अ');
            expect(result.possible_substitutes).toEqual(['आ', 'इ']);
        });
    });
});
