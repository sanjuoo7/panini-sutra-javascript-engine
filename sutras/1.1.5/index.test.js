/**
 * Test suite for Sutra 1.1.5: क्क्ङिति च (kakaṅiti ca)
 * 
 * Tests the blocking of guṇa/vṛddhi transformations when affixes have
 * indicatory letters क्, ग्, or ङ्.
 * 
 * Focus: Comprehensive testing with real Sanskrit words in Devanagari
 */

import {
    hasKitGitNgitMarkers,
    hasKitMarker,
    hasGitMarker,
    hasNgitMarker,
    shouldBlockDueToItMarkers,
    analyzeItMarkers,
    applySutra115
} from './index.js';
import { testCases } from './test-cases.js';

describe('Sutra 1.1.5: क्क्ङिति च (kakaṅiti ca)', () => {
    
    describe('क् (k) it-marker identification with real Sanskrit affixes', () => {
        testCases.kitMarkerAffixes.forEach(({ affix, hasKit, description }) => {
            test(`${affix} should ${hasKit ? 'have' : 'not have'} क् it-marker: "${description}"`, () => {
                expect(hasKitMarker(affix)).toBe(hasKit);
            });
        });

        test('should return false for invalid inputs', () => {
            expect(hasKitMarker('')).toBe(false);
            expect(hasKitMarker(null)).toBe(false);
            expect(hasKitMarker(undefined)).toBe(false);
            expect(hasKitMarker(123)).toBe(false);
        });
    });

    describe('ग् (g) it-marker identification with real Sanskrit affixes', () => {
        testCases.gitMarkerAffixes.forEach(({ affix, hasGit, description }) => {
            test(`${affix} should ${hasGit ? 'have' : 'not have'} ग् it-marker: "${description}"`, () => {
                expect(hasGitMarker(affix)).toBe(hasGit);
            });
        });

        test('should return false for invalid inputs', () => {
            expect(hasGitMarker('')).toBe(false);
            expect(hasGitMarker(null)).toBe(false);
            expect(hasGitMarker(undefined)).toBe(false);
            expect(hasGitMarker([])).toBe(false);
        });
    });

    describe('ङ् (ṅ) it-marker identification with real Sanskrit affixes', () => {
        testCases.ngitMarkerAffixes.forEach(({ affix, hasNgit, description }) => {
            test(`${affix} should ${hasNgit ? 'have' : 'not have'} ङ् it-marker: "${description}"`, () => {
                expect(hasNgitMarker(affix)).toBe(hasNgit);
            });
        });

        test('should return false for invalid inputs', () => {
            expect(hasNgitMarker('')).toBe(false);
            expect(hasNgitMarker(null)).toBe(false);
            expect(hasNgitMarker(undefined)).toBe(false);
            expect(hasNgitMarker({})).toBe(false);
        });
    });

    describe('Combined it-marker detection with Sanskrit affixes', () => {
        testCases.kitMarkerAffixes.forEach(({ affix, description }) => {
            test(`${affix} should be detected as having it-markers: "${description}"`, () => {
                expect(hasKitGitNgitMarkers(affix)).toBe(true);
            });
        });

        testCases.gitMarkerAffixes.forEach(({ affix, description }) => {
            test(`${affix} should be detected as having it-markers: "${description}"`, () => {
                expect(hasKitGitNgitMarkers(affix)).toBe(true);
            });
        });

        testCases.ngitMarkerAffixes.forEach(({ affix, description }) => {
            test(`${affix} should be detected as having it-markers: "${description}"`, () => {
                expect(hasKitGitNgitMarkers(affix)).toBe(true);
            });
        });

        testCases.nonItMarkerAffixes.forEach(({ affix, hasItMarkers, description }) => {
            test(`${affix} should ${hasItMarkers ? 'have' : 'not have'} it-markers: "${description}"`, () => {
                expect(hasKitGitNgitMarkers(affix)).toBe(hasItMarkers);
            });
        });
    });

    describe('Complete Sanskrit word formations - BLOCKING cases (Kit/Git/Ṅit affixes)', () => {
        testCases.completesanskritBlockingWords.forEach(({ 
            dhatu, dhatuMeaning, affix, affixType, operation, shouldBlock, 
            result, resultMeaning, blocked, description, analysis 
        }) => {
            test(`${description} - Analysis: ${analysis}`, () => {
                expect(shouldBlockDueToItMarkers(dhatu, affix, operation)).toBe(shouldBlock);
                
                // Test that the result would be different without blocking
                const sutraResult = applySutra115(dhatu, affix, operation);
                expect(sutraResult.blocks).toBe(true);
                expect(sutraResult.reason).toContain('blocks');
                expect(sutraResult.analysis.itMarkerAnalysis.hasItMarkers).toBe(true);
            });
        });
    });

    describe('Complete Sanskrit word formations - ALLOWING cases (Regular affixes)', () => {
        testCases.completeSanskritAllowingWords.forEach(({ 
            dhatu, dhatuMeaning, affix, affixType, operation, shouldBlock, 
            result, resultMeaning, withGuna, description, analysis 
        }) => {
            test(`${description} - Analysis: ${analysis}`, () => {
                expect(shouldBlockDueToItMarkers(dhatu, affix, operation)).toBe(shouldBlock);
                
                // Test that no blocking occurs
                const sutraResult = applySutra115(dhatu, affix, operation);
                expect(sutraResult.blocks).toBe(false);
                expect(sutraResult.reason).toContain('does not block');
                expect(sutraResult.analysis.itMarkerAnalysis.hasItMarkers).toBe(false);
            });
        });
    });

    describe('Agent noun formations - Kit vs Regular comparison', () => {
        testCases.agentNounComparisons.forEach(({ dhatu, meaning, kitForm, regularForm, analysis }) => {
            test(`${dhatu} (${meaning}): Kit form ${kitForm.result} vs Regular form ${regularForm.result} - ${analysis}`, () => {
                // Kit form should block
                expect(shouldBlockDueToItMarkers(dhatu, kitForm.affix, 'guna')).toBe(true);
                
                // Regular form should not block  
                expect(shouldBlockDueToItMarkers(dhatu, regularForm.affix, 'guna')).toBe(false);
            });
        });
    });

    describe('Feminine formations with Ṅit affixes', () => {
        testCases.feminineFormations.forEach(({ base, baseMeaning, affix, affixType, result, resultMeaning, analysis }) => {
            test(`${base} (${baseMeaning}) + ${affix} → ${result} (${resultMeaning}) - ${analysis}`, () => {
                expect(hasNgitMarker(affix)).toBe(true);
                expect(shouldBlockDueToItMarkers(base, affix, 'guna')).toBe(true);
                
                const sutraResult = applySutra115(base, affix, 'guna');
                expect(sutraResult.blocks).toBe(true);
                expect(sutraResult.analysis.itMarkerAnalysis.ngitMarker).toBe(true);
            });
        });
    });

    describe('It-marker analysis with real Sanskrit examples', () => {
        test('should analyze कत् (past participle) correctly', () => {
            const analysis = analyzeItMarkers('कत्');
            expect(analysis.hasItMarkers).toBe(true);
            expect(analysis.kitMarker).toBe(true);
            expect(analysis.blocksGunaVrddhi).toBe(true);
            expect(analysis.markerTypes).toContain('क् (k)');
        });

        test('should analyze घञ् (action noun) correctly', () => {
            const analysis = analyzeItMarkers('घञ्');
            expect(analysis.hasItMarkers).toBe(true);
            expect(analysis.gitMarker).toBe(true);
            expect(analysis.blocksGunaVrddhi).toBe(true);
            expect(analysis.markerTypes).toContain('ग् (g)');
        });

        test('should analyze ङीप् (feminine) correctly', () => {
            const analysis = analyzeItMarkers('ङीप्');
            expect(analysis.hasItMarkers).toBe(true);
            expect(analysis.ngitMarker).toBe(true);
            expect(analysis.blocksGunaVrddhi).toBe(true);
            expect(analysis.markerTypes).toContain('ङ् (ṅ)');
        });

        test('should analyze ति (present tense) correctly - no it-markers', () => {
            const analysis = analyzeItMarkers('ति');
            expect(analysis.hasItMarkers).toBe(false);
            expect(analysis.kitMarker).toBe(false);
            expect(analysis.gitMarker).toBe(false);
            expect(analysis.ngitMarker).toBe(false);
            expect(analysis.blocksGunaVrddhi).toBe(false);
        });
    });

    describe('Comprehensive Sutra 1.1.5 application with Sanskrit examples', () => {
        test('should block guṇa: कृ + कत् → कृत (not केृत)', () => {
            const result = applySutra115('कृ', 'कत्', 'guna');
            expect(result.blocks).toBe(true);
            expect(result.reason).toContain('Sutra 1.1.5 blocks guna transformation');
            expect(result.analysis.dhatu).toBe('कृ');
            expect(result.analysis.affix).toBe('कत्');
            expect(result.analysis.itMarkerAnalysis.kitMarker).toBe(true);
        });

        test('should block guṇa: यज् + घञ् → यागः (action noun)', () => {
            const result = applySutra115('यज्', 'घञ्', 'guna');
            expect(result.blocks).toBe(true);
            expect(result.reason).toContain('Sutra 1.1.5 blocks guna transformation');
            expect(result.analysis.itMarkerAnalysis.gitMarker).toBe(true);
        });

        test('should allow guṇa: कृ + ति → करोति (present tense)', () => {
            const result = applySutra115('कृ', 'ति', 'guna');
            expect(result.blocks).toBe(false);
            expect(result.reason).toContain('does not block guna transformation');
            expect(result.analysis.itMarkerAnalysis.hasItMarkers).toBe(false);
        });

        test('should allow guṇa: नी + ति → नयति (present tense)', () => {
            const result = applySutra115('नी', 'ति', 'guna');
            expect(result.blocks).toBe(false);
            expect(result.reason).toContain('does not block guna transformation');
        });
    });

    describe('Script support - IAST and Devanagari compatibility', () => {
        test('should work with both IAST and Devanagari for same affix', () => {
            // Test कत् in both scripts
            expect(hasKitMarker('kta')).toBe(true);
            expect(hasKitMarker('कत्')).toBe(true);
            
            // Test ति in both scripts
            expect(hasKitGitNgitMarkers('ti')).toBe(false);
            expect(hasKitGitNgitMarkers('ति')).toBe(false);
        });

        test('should handle complete Sanskrit words in Devanagari', () => {
            // Test complete dhātu + प्रत्यय combinations
            expect(shouldBlockDueToItMarkers('कृ', 'कत्', 'guna')).toBe(true);
            expect(shouldBlockDueToItMarkers('भू', 'कत्', 'guna')).toBe(true);
            expect(shouldBlockDueToItMarkers('गम्', 'कत्', 'guna')).toBe(true);
            
            // Test regular formations
            expect(shouldBlockDueToItMarkers('कृ', 'ति', 'guna')).toBe(false);
            expect(shouldBlockDueToItMarkers('नी', 'ति', 'guna')).toBe(false);
        });
    });

    describe('Integration with morphological analysis', () => {
        test('should provide detailed morphological breakdown for Sanskrit words', () => {
            const complexResult = applySutra115('स्था', 'कत्', 'guna');
            
            expect(complexResult.blocks).toBe(true);
            expect(complexResult.analysis.dhatu).toBe('स्था');
            expect(complexResult.analysis.affix).toBe('कत्');
            expect(complexResult.analysis.operation).toBe('guna');
            expect(complexResult.analysis.itMarkerAnalysis.kitMarker).toBe(true);
            expect(complexResult.analysis.itMarkerAnalysis.markerTypes).toContain('क् (k)');
        });

        test('should handle vṛddhi operations with Sanskrit examples', () => {
            const vrddhiResult = applySutra115('कृ', 'कत्', 'vrddhi');
            expect(vrddhiResult.blocks).toBe(true);
            expect(vrddhiResult.reason).toContain('blocks vrddhi transformation');
        });
    });

    describe('Error handling and edge cases', () => {
        test('should handle empty strings gracefully', () => {
            expect(hasKitGitNgitMarkers('')).toBe(false);
            expect(shouldBlockDueToItMarkers('', '', 'guna')).toBe(false);
        });

        test('should handle null inputs gracefully', () => {
            expect(hasKitGitNgitMarkers(null)).toBe(false);
            expect(shouldBlockDueToItMarkers(null, null, null)).toBe(false);
        });

        test('should handle invalid operation types', () => {
            expect(shouldBlockDueToItMarkers('कृ', 'कत्', 'invalid')).toBe(false);
            
            const result = applySutra115('कृ', 'कत्', 'invalid');
            expect(result.blocks).toBe(false);
        });

        test('should handle mixed script inputs', () => {
            // IAST dhātu with Devanagari affix
            expect(shouldBlockDueToItMarkers('kṛ', 'कत्', 'guna')).toBe(true);
            
            // Devanagari dhātu with IAST affix  
            expect(shouldBlockDueToItMarkers('कृ', 'kta', 'guna')).toBe(true);
        });
    });

    describe('Advanced Sanskrit morphology integration', () => {
        test('should work with complex dhātu types', () => {
            // Consonant-ending dhātus
            expect(shouldBlockDueToItMarkers('गम्', 'कत्', 'guna')).toBe(true);
            expect(shouldBlockDueToItMarkers('हन्', 'कत्', 'guna')).toBe(true);
            
            // Vowel-ending dhātus
            expect(shouldBlockDueToItMarkers('नी', 'कत्', 'guna')).toBe(true);
            expect(shouldBlockDueToItMarkers('भू', 'कत्', 'guna')).toBe(true);
            
            // Root vowel dhātus
            expect(shouldBlockDueToItMarkers('कृ', 'कत्', 'guna')).toBe(true);
            expect(shouldBlockDueToItMarkers('दृश्', 'कत्', 'guna')).toBe(true);
        });

        test('should distinguish between different affix classes accurately', () => {
            const dhatu = 'कृ';
            
            // Kit affixes should block
            expect(shouldBlockDueToItMarkers(dhatu, 'कत्', 'guna')).toBe(true);
            expect(shouldBlockDueToItMarkers(dhatu, 'कत्वा', 'guna')).toBe(true);
            
            // Git affixes should block
            expect(shouldBlockDueToItMarkers(dhatu, 'घ', 'guna')).toBe(true);
            expect(shouldBlockDueToItMarkers(dhatu, 'घञ्', 'guna')).toBe(true);
            
            // Regular affixes should not block
            expect(shouldBlockDueToItMarkers(dhatu, 'ति', 'guna')).toBe(false);
            expect(shouldBlockDueToItMarkers(dhatu, 'य', 'guna')).toBe(false);
            expect(shouldBlockDueToItMarkers(dhatu, 'अन', 'guna')).toBe(false);
        });
    });

    describe('Sanskrit corpus validation', () => {
        test('should validate against authentic Sanskrit word formations', () => {
            // Test authentic past participles
            const authentics = [
                { dhatu: 'कृ', result: 'कृत' },
                { dhatu: 'गम्', result: 'गत' }, 
                { dhatu: 'भू', result: 'भूत' },
                { dhatu: 'स्था', result: 'स्थित' },
                { dhatu: 'दा', result: 'दत्त' },
                { dhatu: 'हन्', result: 'हत' }
            ];
            
            authentics.forEach(({ dhatu, result }) => {
                expect(shouldBlockDueToItMarkers(dhatu, 'कत्', 'guna')).toBe(true);
            });
        });

        test('should validate against authentic present tense formations', () => {
            const presentForms = [
                { dhatu: 'कृ', result: 'करोति' },
                { dhatu: 'नी', result: 'नयति' },
                { dhatu: 'भू', result: 'भवति' },
                { dhatu: 'गम्', result: 'गच्छति' }
            ];
            
            presentForms.forEach(({ dhatu, result }) => {
                expect(shouldBlockDueToItMarkers(dhatu, 'ति', 'guna')).toBe(false);
            });
        });
    });
});
