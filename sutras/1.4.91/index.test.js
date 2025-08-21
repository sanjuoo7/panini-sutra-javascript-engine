/**
 * Test Suite for Sutra 1.4.91: अभिरभागे (abhirabhāge)
 * Classification of अभि as कर्म-प्रवचनीय in specific semantic contexts
 */

import sutra_1_4_91 from './index.js';

describe('Sutra 1.4.91 (अभिरभागे) - Comprehensive Test Suite', () => {

    // Phase 1: Basic Application Tests
    describe('Phase 1: Basic Application Tests', () => {
        
        test('applies karma-pravachaniya classification for अभि with directional context', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction', 'towards'],
                meaning: 'in the direction of'
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
            expect(result.classification.applicableContexts).toContain('लक्षणे (direction/aim)');
        });

        test('applies for circumstantial context (इत्थंभूताख्यान)', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['circumstance', 'regarding'],
                translation: 'concerning the matter'
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
            expect(result.classification.applicableContexts).toContain('इत्थंभूताख्यान (stating circumstances)');
        });

        test('applies for pervasion context (वीप्सा)', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['pervasion', 'throughout'],
                meaning: 'all over the place'
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
            expect(result.classification.applicableContexts).toContain('वीप्सा (pervasion)');
        });

        test('applies for limited division context (भाग)', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['division', 'share'],
                meaning: 'divided portion'
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
            expect(result.classification.applicableContexts).toContain('भाग (division/share - limited)');
        });

        test('does not apply without semantic context', () => {
            const result = sutra_1_4_91('अभि');
            
            expect(result.applied).toBe(false);
            expect(result.classification.isKarmaPravachaniya).toBe(false);
            expect(result.reason).toBe('No supporting semantic context found');
        });

        test('does not apply for non-abhi particles', () => {
            const result = sutra_1_4_91('प्रति', {
                semantic: ['direction'],
                meaning: 'towards'
            });
            
            expect(result.applied).toBe(false);
            expect(result.reason).toBe('no_abhi_particle');
        });

        test('handles empty input gracefully', () => {
            const result = sutra_1_4_91('');
            
            expect(result.applied).toBe(false);
            expect(result.reason).toBe('invalid_input');
        });

        test('handles null/undefined input gracefully', () => {
            const result1 = sutra_1_4_91(null);
            const result2 = sutra_1_4_91(undefined);
            
            expect(result1.applied).toBe(false);
            expect(result2.applied).toBe(false);
            expect(result1.reason).toBe('invalid_input');
            expect(result2.reason).toBe('invalid_input');
        });
    });

    // Phase 2: Script Support Tests
    describe('Phase 2: Script Support Tests', () => {
        
        test('processes Devanagari अभि correctly', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction'],
                meaning: 'towards'
            });
            
            expect(result.applied).toBe(true);
            expect(result.scriptAnalysis.isDevanagari).toBe(true);
            expect(result.scriptAnalysis.primaryScript).toBe('Devanagari');
            expect(result.particleAnalysis.scriptForm).toBe('अभि');
        });

        test('processes IAST abhi correctly', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['direction'],
                meaning: 'towards'
            });
            
            expect(result.applied).toBe(true);
            expect(result.scriptAnalysis.isIAST).toBe(true);
            expect(result.scriptAnalysis.primaryScript).toBe('IAST');
            expect(result.particleAnalysis.scriptForm).toBe('abhi');
        });

        test('handles mixed script input', () => {
            const result = sutra_1_4_91('अभि and abhi', {
                semantic: ['direction'],
                meaning: 'both forms meaning towards'
            });
            
            expect(result.applied).toBe(true);
            expect(result.scriptAnalysis.isMixed).toBe(true);
            expect(result.particleAnalysis.forms.length).toBeGreaterThan(0);
        });

        test('recognizes अभि variants with visarga', () => {
            const result = sutra_1_4_91('अभिः', {
                semantic: ['direction'],
                meaning: 'towards (with visarga)'
            });
            
            expect(result.applied).toBe(true);
            expect(result.particleAnalysis.forms).toContain('अभिः');
        });

        test('recognizes IAST variants with visarga', () => {
            const result = sutra_1_4_91('abhiḥ', {
                semantic: ['direction'],
                meaning: 'towards (with visarga)'
            });
            
            expect(result.applied).toBe(true);
            expect(result.particleAnalysis.forms).toContain('abhiḥ');
        });

        test('preserves original script in output', () => {
            const devanagariResult = sutra_1_4_91('अभि', {
                semantic: ['direction']
            });
            const iastResult = sutra_1_4_91('abhi', {
                semantic: ['direction']
            });
            
            expect(devanagariResult.input).toBe('अभि');
            expect(iastResult.input).toBe('abhi');
        });
    });

    // Phase 3: Semantic Context Analysis Tests
    describe('Phase 3: Semantic Context Analysis Tests', () => {
        
        test('correctly identifies directional context (लक्षणे)', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction', 'aim', 'towards'],
                syntacticRole: ['adverbial']
            });
            
            expect(result.applied).toBe(true);
            expect(result.semanticAnalysis.primaryContext.type).toBe('lakshana');
            expect(result.semanticAnalysis.primaryContext.name).toBe('लक्षणे (direction/aim)');
        });

        test('correctly identifies circumstantial context (इत्थंभूताख्यान)', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['circumstance', 'regarding', 'concerning'],
                meaning: 'as regards the matter'
            });
            
            expect(result.applied).toBe(true);
            expect(result.semanticAnalysis.primaryContext.type).toBe('itthamBhuta');
            expect(result.semanticAnalysis.primaryContext.name).toBe('इत्थंभूताख्यान (stating circumstances)');
        });

        test('correctly identifies pervasion context (वीप्सा)', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['pervasion', 'throughout', 'all over'],
                translation: 'spreading throughout'
            });
            
            expect(result.applied).toBe(true);
            expect(result.semanticAnalysis.primaryContext.type).toBe('vipsa');
            expect(result.semanticAnalysis.primaryContext.name).toBe('वीप्सा (pervasion)');
        });

        test('handles multiple semantic contexts with prioritization', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['direction', 'pervasion', 'circumstance'],
                meaning: 'complex usage with multiple meanings'
            });
            
            expect(result.applied).toBe(true);
            expect(result.semanticAnalysis.detectedContexts.length).toBeGreaterThan(1);
            expect(result.semanticAnalysis.primaryContext).toBeDefined();
            expect(result.semanticAnalysis.confidence).toBeGreaterThan(0.5);
        });

        test('requires minimum confidence for application', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['vague_meaning'],
                strictMode: true
            });
            
            expect(result.applied).toBe(false);
            expect(result.classification.confidence).toBeLessThan(0.7);
        });

        test('supports verbal context enhancement', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['direction'],
                hasVerb: true,
                verbalContext: true
            });
            
            expect(result.applied).toBe(true);
            expect(result.semanticAnalysis.supportingIndicators).toContain('verbal_context');
        });
    });

    // Phase 4: Object Input Processing Tests
    describe('Phase 4: Object Input Processing Tests', () => {
        
        test('processes object input with word property', () => {
            const input = {
                word: 'अभि',
                context: 'directional usage'
            };
            const result = sutra_1_4_91(input, {
                semantic: ['direction']
            });
            
            expect(result.applied).toBe(true);
            expect(result.input).toBe('अभि');
            expect(result.metadata.inputFormat).toBe('object');
        });

        test('processes object input with text property', () => {
            const input = {
                text: 'abhi',
                meaning: 'towards'
            };
            const result = sutra_1_4_91(input, {
                semantic: ['direction']
            });
            
            expect(result.applied).toBe(true);
            expect(result.input).toBe('abhi');
            expect(result.metadata.inputFormat).toBe('object');
        });

        test('handles object without word/text property', () => {
            const input = {
                particle: 'अभि',
                meaning: 'direction'
            };
            const result = sutra_1_4_91(input);
            
            expect(result.applied).toBe(false);
            expect(result.reason).toBe('invalid_input');
            expect(result.analysis.issues).toContain('Missing word/text property in object input');
        });

        test('processes complex linguistic object', () => {
            const input = {
                word: 'अभि',
                morphology: 'indeclinable',
                function: 'particle'
            };
            const result = sutra_1_4_91(input, {
                semantic: ['pervasion'],
                syntacticRole: ['modifier']
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
        });
    });

    // Phase 5: Integration and Context Tests
    describe('Phase 5: Integration and Context Tests', () => {
        
        test('integrates with adverbial usage context', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction'],
                syntacticRole: ['adverbial'],
                function: ['modifier']
            });
            
            expect(result.applied).toBe(true);
            expect(result.contextualFactors.syntacticRole.classification).toBe('कर्म-प्रवचनीय');
            expect(result.semanticAnalysis.supportingIndicators).toContain('adverbial_usage');
        });

        test('handles context with expectAbhi flag', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction'],
                expectAbhi: true
            });
            
            expect(result.applied).toBe(true);
            expect(result.particleAnalysis.confidence).toBeGreaterThan(0.8);
        });

        test('provides comprehensive confidence analysis', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['direction', 'aim'],
                syntacticRole: ['adverbial'],
                hasVerb: true
            });
            
            expect(result.applied).toBe(true);
            expect(result.contextualFactors.confidenceFactors.particle).toBeGreaterThan(0);
            expect(result.contextualFactors.confidenceFactors.semantic).toBeGreaterThan(0);
            expect(result.contextualFactors.confidenceFactors.overall).toBeGreaterThan(0);
        });

        test('tracks applied rules correctly', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction']
            });
            
            expect(result.applied).toBe(true);
            expect(result.contextualFactors.appliedRules).toContain('sutra_1_4_91_abhirabhage');
            expect(result.contextualFactors.appliedRules).toContain('karma_pravachaniya_classification');
        });
    });

    // Phase 6: Performance and Metadata Tests
    describe('Phase 6: Performance and Metadata Tests', () => {
        
        test('includes performance metrics', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction']
            });
            
            expect(result.metadata.processingTime).toBeGreaterThan(0);
            expect(result.metadata.timestamp).toBeDefined();
            expect(Date.parse(result.metadata.timestamp)).not.toBeNaN();
        });

        test('maintains performance with complex input', (done) => {
            const startTime = Date.now();
            
            const result = sutra_1_4_91('अभि गच्छति नरः', {
                semantic: ['direction', 'pervasion', 'circumstance'],
                syntacticRole: ['adverbial', 'modifier'],
                hasVerb: true,
                verbalContext: true,
                expectAbhi: true
            });
            
            const endTime = Date.now();
            expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
            expect(result.applied).toBe(true);
            done();
        }, 1000);

        test('provides confidence rating', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['direction']
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.confidence).toBeGreaterThan(0);
            expect(result.classification.confidence).toBeLessThanOrEqual(1);
        });

        test('includes comprehensive metadata', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction']
            });
            
            expect(result.metadata).toHaveProperty('processingTime');
            expect(result.metadata).toHaveProperty('timestamp');
            expect(result.metadata).toHaveProperty('inputFormat');
            expect(result.metadata).toHaveProperty('confidence');
            expect(result.metadata).toHaveProperty('appliedRules');
        });
    });

    // Phase 7: Error Handling Tests
    describe('Phase 7: Error Handling Tests', () => {
        
        test('handles invalid Sanskrit text gracefully', () => {
            const result = sutra_1_4_91('xyz123');
            
            expect(result.applied).toBe(false);
            expect(result.reason).toBe('invalid_input');
            expect(result.analysis.issues).toContain('Invalid Sanskrit text structure');
        });

        test('handles malformed context object', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: null,
                meaning: undefined
            });
            
            expect(result.applied).toBe(false);
            expect(result.reason).toBe('No supporting semantic context found');
        });

        test('provides error details for exceptions', () => {
            // Simulate error by passing invalid data that causes exception
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction'],
                // Add circular reference to trigger JSON error
                get circularRef() { return this; }
            });
            
            // Should handle gracefully without throwing
            expect(result.sutra).toBe('1.4.91');
            expect(result.metadata.timestamp).toBeDefined();
        });

        test('validates input thoroughly', () => {
            const invalidInputs = [
                '',
                '   ',
                123,
                [],
                true,
                {}
            ];
            
            invalidInputs.forEach(input => {
                const result = sutra_1_4_91(input);
                expect(result.applied).toBe(false);
                expect(result.reason).toBe('invalid_input');
            });
        });
    });

    // Phase 8: Edge Cases and Complex Scenarios
    describe('Phase 8: Edge Cases and Complex Scenarios', () => {
        
        test('handles अभि in compound words', () => {
            const result = sutra_1_4_91('अभिमुख', {
                semantic: ['direction', 'facing'],
                meaning: 'facing towards'
            });
            
            expect(result.applied).toBe(true);
            expect(result.particleAnalysis.found).toBe(true);
        });

        test('differentiates from other अभि usages', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['general_prefix'],
                meaning: 'just a prefix'
            });
            
            expect(result.applied).toBe(false);
            expect(result.reason).toBe('No supporting semantic context found');
        });

        test('handles multiple अभि occurrences', () => {
            const result = sutra_1_4_91('अभि अभि', {
                semantic: ['direction', 'pervasion'],
                meaning: 'repeated usage'
            });
            
            expect(result.applied).toBe(true);
            expect(result.particleAnalysis.positions.length).toBeGreaterThan(1);
        });

        test('processes whitespace and formatting variations', () => {
            const inputs = [
                '  अभि  ',
                '\tअभि\n',
                ' abhi ',
                'अभि।'
            ];
            
            inputs.forEach(input => {
                const result = sutra_1_4_91(input, {
                    semantic: ['direction']
                });
                expect(result.applied).toBe(true);
            });
        });

        test('maintains script diversity analysis', () => {
            const result = sutra_1_4_91('अभि and abhi', {
                semantic: ['direction']
            });
            
            expect(result.applied).toBe(true);
            expect(result.scriptAnalysis.details).toBeDefined();
            expect(result.contextualFactors.scriptCompatibility).toBe('Mixed');
        });
    });

    // Phase 9: Integration with Panini Grammar Framework
    describe('Phase 9: Integration with Panini Grammar Framework', () => {
        
        test('correctly identifies karma-pravachaniya classification', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction']
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
            expect(result.contextualFactors.syntacticRole.classification).toBe('कर्म-प्रवचनीय');
        });

        test('provides grammatical function analysis', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['pervasion']
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.semanticFunction).toBe('वीप्सा (pervasion)');
            expect(result.contextualFactors.syntacticRole.function).toBe('वीप्सा (pervasion)');
        });

        test('integrates with broader grammatical context', () => {
            const result = sutra_1_4_91('अभि', {
                semantic: ['direction'],
                grammaticalContext: {
                    sutrasApplied: ['1.4.89', '1.4.90'],
                    precedingAnalysis: 'nipata_classification'
                }
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
        });

        test('supports sutra chaining and dependencies', () => {
            const result = sutra_1_4_91('abhi', {
                semantic: ['circumstance'],
                chainedSutras: true,
                dependencies: ['karma_pravachaniya_definition']
            });
            
            expect(result.applied).toBe(true);
            expect(result.contextualFactors.appliedRules).toContain('sutra_1_4_91_abhirabhage');
        });
    });

    // Phase 10: Comprehensive Integration Tests
    describe('Phase 10: Comprehensive Integration Tests', () => {
        
        test('handles complex multi-context scenario', () => {
            const result = sutra_1_4_91('अभि गजम्', {
                semantic: ['direction', 'aim', 'towards'],
                syntacticRole: ['adverbial', 'modifier'],
                hasVerb: true,
                verbalContext: true,
                expectAbhi: true,
                grammaticalContext: {
                    caseContext: 'accusative',
                    verbalRoot: 'gam',
                    tense: 'present'
                }
            });
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
            expect(result.classification.confidence).toBeGreaterThan(0.8);
            expect(result.semanticAnalysis.detectedContexts.length).toBeGreaterThan(0);
        });

        test('provides complete analysis with all features', () => {
            const result = sutra_1_4_91('abhiḥ', {
                semantic: ['pervasion', 'throughout'],
                syntacticRole: ['adverbial'],
                function: ['modifier'],
                hasVerb: true,
                verbalContext: true,
                strictMode: false
            });
            
            expect(result).toHaveProperty('sutra');
            expect(result).toHaveProperty('applied');
            expect(result).toHaveProperty('classification');
            expect(result).toHaveProperty('particleAnalysis');
            expect(result).toHaveProperty('semanticAnalysis');
            expect(result).toHaveProperty('scriptAnalysis');
            expect(result).toHaveProperty('contextualFactors');
            expect(result).toHaveProperty('metadata');
            
            expect(result.applied).toBe(true);
            expect(result.classification.isKarmaPravachaniya).toBe(true);
        });
    });
});
