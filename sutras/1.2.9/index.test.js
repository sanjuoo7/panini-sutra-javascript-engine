/**
 * Test Suite for Sutra 1.2.9: इको झल्
 * Tests कित् designation for affixes beginning with झल् after इक्-ending roots
 */

import { jest } from '@jest/globals';
import {
    analyzeKitDesignationSutra129,
    appliesSutra129,
    getSutra129Examples,
    getMorphologicalAnalysis129
} from './index.js';

describe('Sutra 1.2.9: इको झल्', () => {
    describe('Core Functionality', () => {
        test('should designate कित् for झल्-beginning affixes after इक्-ending roots', () => {
            const testCases = [
                {
                    word: 'चित',
                    context: { root: 'चि', affix: 'त' },
                    expected: true,
                    description: 'चि + त → चित (इ-ending root + त-affix)'
                },
                {
                    word: 'शुक्त',
                    context: { root: 'शु', affix: 'क्त' },
                    expected: true,
                    description: 'शु + क्त → शुक्त (उ-ending root + क्त-affix)'
                },
                {
                    word: 'कृत',
                    context: { root: 'कृ', affix: 'त' },
                    expected: true,
                    description: 'कृ + त → कृत (ऋ-ending root + त-affix)'
                }
            ];

            testCases.forEach(({ word, context, expected, description }) => {
                const result = analyzeKitDesignationSutra129(word, context);
                expect(result.applies).toBe(expected);
                expect(result.kitDesignated).toBe(expected);
                expect(result.analysis.rootEndsInIka).toBe(expected);
                expect(result.analysis.affixBeginsWithJhal).toBe(expected);
            });
        });

        test('should not apply when root does not end in इक्', () => {
            const testCases = [
                {
                    word: 'गत',
                    context: { root: 'गम्', affix: 'त' },
                    description: 'गम् + त → गत (म्-ending root, not इक्)'
                },
                {
                    word: 'नष्ट',
                    context: { root: 'नश्', affix: 'त' },
                    description: 'नश् + त → नष्ट (श्-ending root, not इक्)'
                },
                {
                    word: 'भक्त',
                    context: { root: 'भज्', affix: 'त' },
                    description: 'भज् + त → भक्त (ज्-ending root, not इक्)'
                }
            ];

            testCases.forEach(({ word, context, description }) => {
                const result = analyzeKitDesignationSutra129(word, context);
                expect(result.applies).toBe(false);
                expect(result.kitDesignated).toBe(false);
                expect(result.analysis.rootEndsInIka).toBe(false);
            });
        });

        test('should not apply when affix does not begin with झल्', () => {
            const testCases = [
                {
                    word: 'भवन',
                    context: { root: 'भू', affix: 'अन' },
                    description: 'भू + अन → भवन (vowel-initial affix)'
                },
                {
                    word: 'कर्तुम्',
                    context: { root: 'कृ', affix: 'उम्' },
                    description: 'कृ + उम् → कर्तुम् (vowel-initial affix)'
                }
            ];

            testCases.forEach(({ word, context, description }) => {
                const result = analyzeKitDesignationSutra129(word, context);
                expect(result.applies).toBe(false);
                expect(result.kitDesignated).toBe(false);
                expect(result.analysis.affixBeginsWithJhal).toBe(false);
            });
        });
    });

    describe('Multi-Script Support', () => {
        test('should handle Devanagari input correctly', () => {
            const testCases = [
                {
                    word: 'चित',
                    context: { root: 'चि', affix: 'त' },
                    expectedScript: 'Devanagari'
                },
                {
                    word: 'शुक्त',
                    context: { root: 'शु', affix: 'क्त' },
                    expectedScript: 'Devanagari'
                }
            ];

            testCases.forEach(({ word, context, expectedScript }) => {
                const result = analyzeKitDesignationSutra129(word, context);
                expect(result.analysis.script).toBe(expectedScript);
                expect(result.applies).toBe(true);
                expect(result.kitDesignated).toBe(true);
            });
        });

        test('should handle IAST input correctly', () => {
            const testCases = [
                {
                    word: 'cita',
                    context: { root: 'ci', affix: 'ta' },
                    expectedScript: 'IAST'
                },
                {
                    word: 'śukta',
                    context: { root: 'śu', affix: 'kta' },
                    expectedScript: 'IAST'
                }
            ];

            testCases.forEach(({ word, context, expectedScript }) => {
                const result = analyzeKitDesignationSutra129(word, context);
                expect(result.analysis.script).toBe(expectedScript);
                expect(result.applies).toBe(true);
                expect(result.kitDesignated).toBe(true);
            });
        });
    });

    describe('Multiple Affixes Analysis', () => {
        test('should analyze multiple affixes correctly', () => {
            const word = 'compound';
            const context = {
                affixes: [
                    { root: 'चि', affix: 'त' },    // Should apply
                    { root: 'गम्', affix: 'त' },   // Should not apply
                    { root: 'शु', affix: 'क्त' }   // Should apply
                ]
            };

            const result = analyzeKitDesignationSutra129(word, context);
            expect(result.applies).toBe(true);
            expect(result.kitDesignated).toBe(true);
            expect(result.analysis.root).toBe('चि');
            expect(result.analysis.affix).toBe('त');
        });

        test('should handle all non-applicable affixes', () => {
            const word = 'compound';
            const context = {
                affixes: [
                    { root: 'गम्', affix: 'त' },   // Root doesn't end in इक्
                    { root: 'चि', affix: 'अन' },   // Affix doesn't begin with झल्
                    { root: 'नश्', affix: 'क्त' }   // Root doesn't end in इक्
                ]
            };

            const result = analyzeKitDesignationSutra129(word, context);
            expect(result.applies).toBe(false);
            expect(result.kitDesignated).toBe(false);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle invalid input gracefully', () => {
            const invalidInputs = [null, undefined, '', '   ', 123, {}];

            invalidInputs.forEach(input => {
                const result = analyzeKitDesignationSutra129(input);
                expect(result.applies).toBe(false);
                expect(result.kitDesignated).toBe(false);
                expect(result.error).toBeDefined();
            });
        });

        test('should handle missing context gracefully', () => {
            const result = analyzeKitDesignationSutra129('test');
            expect(result.applies).toBe(false);
            expect(result.kitDesignated).toBe(false);
            expect(result.analysis.root).toBeNull();
            expect(result.analysis.affix).toBeNull();
        });

        test('should handle partial context', () => {
            const result1 = analyzeKitDesignationSutra129('test', { root: 'चि' });
            expect(result1.applies).toBe(false);

            const result2 = analyzeKitDesignationSutra129('test', { affix: 'त' });
            expect(result2.applies).toBe(false);
        });
    });

    describe('Debug Mode', () => {
        test('should provide debug information when enabled', () => {
            const result = analyzeKitDesignationSutra129('चित', {
                root: 'चि',
                affix: 'त',
                debug: true
            });

            expect(result.analysis.debug).toBeDefined();
            expect(Array.isArray(result.analysis.debug)).toBe(true);
            expect(result.analysis.debug.length).toBeGreaterThan(0);
            expect(result.analysis.debug[0]).toContain('Analyzing Sutra 1.2.9');
        });

        test('should not include debug information when disabled', () => {
            const result = analyzeKitDesignationSutra129('चित', {
                root: 'चि',
                affix: 'त',
                debug: false
            });

            expect(result.analysis.debug).toBeNull();
        });
    });

    describe('Utility Functions', () => {
        test('appliesSutra129 should return boolean correctly', () => {
            expect(appliesSutra129('चित', { root: 'चि', affix: 'त' })).toBe(true);
            expect(appliesSutra129('गत', { root: 'गम्', affix: 'त' })).toBe(false);
            expect(appliesSutra129('भवन', { root: 'भू', affix: 'अन' })).toBe(false);
        });

        test('getSutra129Examples should return valid examples', () => {
            const examples = getSutra129Examples();
            expect(Array.isArray(examples)).toBe(true);
            expect(examples.length).toBeGreaterThan(0);

            examples.forEach(example => {
                expect(example).toHaveProperty('root');
                expect(example).toHaveProperty('affix');
                expect(example).toHaveProperty('combination');
                expect(example).toHaveProperty('explanation');
                expect(example).toHaveProperty('kitDesignated');
                expect(typeof example.kitDesignated).toBe('boolean');
            });
        });

        test('getMorphologicalAnalysis129 should provide comprehensive analysis', () => {
            const analysis = getMorphologicalAnalysis129('चित', {
                root: 'चि',
                affix: 'त'
            });

            expect(analysis).toHaveProperty('sutra');
            expect(analysis).toHaveProperty('morphology');
            expect(analysis.morphology).toHaveProperty('sutraType');
            expect(analysis.morphology).toHaveProperty('grammaticalScope');
            expect(analysis.morphology).toHaveProperty('phoneticCondition');
            expect(analysis.morphology).toHaveProperty('semanticImpact');
            expect(analysis.morphology).toHaveProperty('examples');
            expect(analysis.morphology).toHaveProperty('relatedSutras');
            expect(Array.isArray(analysis.morphology.examples)).toBe(true);
            expect(Array.isArray(analysis.morphology.relatedSutras)).toBe(true);
        });
    });

    describe('Linguistic Accuracy', () => {
        test('should correctly identify इक् pratyahara vowels', () => {
            const ikaEndingRoots = [
                { root: 'चि', affix: 'त', shouldApply: true },
                { root: 'शु', affix: 'क्त', shouldApply: true },
                { root: 'कृ', affix: 'त', shouldApply: true },
                { root: 'कॢ', affix: 'त', shouldApply: true } // ऌ-ending (fixed)
            ];

            ikaEndingRoots.forEach(({ root, affix, shouldApply }) => {
                const result = analyzeKitDesignationSutra129('test', { root, affix });
                expect(result.applies).toBe(shouldApply);
                expect(result.analysis.rootEndsInIka).toBe(shouldApply);
            });
        });

        test('should correctly identify झल् pratyahara consonants', () => {
            const jhalBeginningAffixes = [
                { root: 'चि', affix: 'त', shouldApply: true },
                { root: 'चि', affix: 'क्त', shouldApply: true },
                { root: 'चि', affix: 'न', shouldApply: true },
                { root: 'चि', affix: 'स', shouldApply: true },
                { root: 'चि', affix: 'अन', shouldApply: false }, // Vowel-initial
                { root: 'चि', affix: 'इत', shouldApply: false }  // Vowel-initial
            ];

            jhalBeginningAffixes.forEach(({ root, affix, shouldApply }) => {
                const result = analyzeKitDesignationSutra129('test', { root, affix });
                expect(result.applies).toBe(shouldApply);
                expect(result.analysis.affixBeginsWithJhal).toBe(shouldApply);
            });
        });
    });

    describe('Performance Tests', () => {
        test('should process single analysis quickly', () => {
            const startTime = performance.now();
            const result = analyzeKitDesignationSutra129('चित', { root: 'चि', affix: 'त' });
            const endTime = performance.now();
            
            expect(endTime - startTime).toBeLessThan(10); // Should complete in under 10ms
            expect(result.applies).toBe(true);
        });

        test('should handle batch processing efficiently', () => {
            const testCases = [
                { word: 'चित', context: { root: 'चि', affix: 'त' } },
                { word: 'शुक्त', context: { root: 'शु', affix: 'क्त' } },
                { word: 'कृत', context: { root: 'कृ', affix: 'त' } },
                { word: 'गत', context: { root: 'गम्', affix: 'त' } },
                { word: 'भवन', context: { root: 'भू', affix: 'अन' } }
            ];

            const startTime = performance.now();
            const results = testCases.map(({ word, context }) => 
                analyzeKitDesignationSutra129(word, context)
            );
            const endTime = performance.now();

            expect(endTime - startTime).toBeLessThan(50); // Batch should complete in under 50ms
            expect(results).toHaveLength(testCases.length);
            expect(results.filter(r => r.applies)).toHaveLength(3); // First 3 should apply
        });
    });

    describe('Integration with Kit-Designation Utility', () => {
        test('should fall back to shared utility when direct context is unavailable', () => {
            // Test with minimal context to trigger utility fallback
            const result = analyzeKitDesignationSutra129('चित');
            
            // The result should have been processed, even if utility doesn't apply
            expect(result).toHaveProperty('sutra', '1.2.9');
            expect(result).toHaveProperty('applies');
            expect(result).toHaveProperty('kitDesignated');
        });
    });
});
