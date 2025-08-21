import { sutra_1_2_64 } from './index.js';

describe('Sutra 1.2.64 (सरूपाणामेकशेष एकविभक्तौ) - Comprehensive Test Suite', () => {

    describe('Phase 1: Basic Application Tests', () => {
        test('applies eka-śeṣa for identical forms', () => {
            const res = sutra_1_2_64("गजः गजः");
            expect(res.applied).toBe(true);
            expect(res.retainedIndex).toBe(1);
            expect(res.eliminatedIndices).toEqual([0]);
            expect(res.finalNumber).toBe('singular');
        });

        test('retains last occurrence by default', () => {
            const res = sutra_1_2_64(["gajaḥ", "gajaḥ", "gajaḥ"]);
            expect(res.applied).toBe(true);
            expect(res.retainedIndex).toBe(2);
            expect(res.eliminatedIndices).toEqual([0, 1]);
            expect(res.retainedForm).toBe("gajaḥ");
        });

        test('processes mixed positions correctly', () => {
            const res = sutra_1_2_64(["vṛkṣaḥ", "gajaḥ", "gajaḥ", "aśvaḥ"]);
            expect(res.applied).toBe(true);
            expect(res.retainedIndex).toBe(2);
            expect(res.eliminatedIndices).toEqual([1]);
            expect(res.preservedForms).toContain("vṛkṣaḥ");
        });

        test('fails for different forms', () => {
            const res = sutra_1_2_64(["gajaḥ", "gajau", "gajān"]);
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('no_identical_forms');
            expect(res.analysis.formGroups).toHaveProperty('gajaḥ');
        });

        test('requires minimum two forms', () => {
            const res = sutra_1_2_64(["gajaḥ"]);
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('insufficient_forms');
            expect(res.explanation).toContain('minimum two forms');
        });

        test('handles empty input gracefully', () => {
            const res = sutra_1_2_64([]);
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('empty_input');
            expect(res.error).toBe(false);
        });

        test('processes complex coordination', () => {
            const res = sutra_1_2_64("रामः रामः लक्ष्मणः सीता रामः");
            expect(res.applied).toBe(true);
            expect(res.eliminatedIndices).toEqual([0, 1]);
            expect(res.retainedIndex).toBe(4);
        });

        test('handles null/undefined input gracefully', () => {
            const res = sutra_1_2_64(null);
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('null_input');
            expect(res.error).toBe(false);
        });
    });

    describe('Phase 2: Format Processing Tests', () => {
        test('processes string input with spaces', () => {
            const res = sutra_1_2_64("गजः   गजः   गजः");
            expect(res.applied).toBe(true);
            expect(res.inputFormat).toBe('string_space');
            expect(res.parsedForms).toEqual(["गजः", "गजः", "गजः"]);
        });

        test('processes string input with plus separators', () => {
            const res = sutra_1_2_64("gajaḥ+gajaḥ+vṛkṣaḥ+gajaḥ");
            expect(res.applied).toBe(true);
            expect(res.inputFormat).toBe('string_plus');
            expect(res.separatorType).toBe('plus');
        });

        test('processes array of strings', () => {
            const res = sutra_1_2_64(["गजः", "गजः", "अश्वः"]);
            expect(res.applied).toBe(true);
            expect(res.inputFormat).toBe('array_strings');
            expect(res.retainedIndex).toBe(1);
        });

        test('processes array of objects', () => {
            const words = [
                { surface: "गजः", case: "nom" },
                { surface: "गजः", case: "nom" },
                { surface: "वृक्षः", case: "nom" }
            ];
            const res = sutra_1_2_64(words);
            expect(res.applied).toBe(true);
            expect(res.inputFormat).toBe('array_objects');
            expect(res.objectAnalysis).toBeDefined();
        });

        test('extracts surface forms from objects correctly', () => {
            const words = [
                { lemma: "gaja", surface: "gajaḥ", case: "nom" },
                { lemma: "gaja", form: "gajaḥ", case: "nom" },
                { lemma: "gaja", lemma: "gajaḥ" }
            ];
            const res = sutra_1_2_64(words);
            expect(res.applied).toBe(true);
            expect(res.extractedForms).toEqual(["gajaḥ", "gajaḥ", "gajaḥ"]);
        });

        test('handles mixed format gracefully', () => {
            const res = sutra_1_2_64("गजः गजः", { allowMixedFormat: true });
            expect(res.applied).toBe(true);
            expect(res.formatWarnings).toEqual([]);
        });

        test('processes compound objects', () => {
            const compound = {
                type: "coordination",
                members: [
                    { surface: "गजः", case: "nom" },
                    { surface: "गजः", case: "nom" }
                ]
            };
            const res = sutra_1_2_64(compound, { compoundContext: true });
            expect(res.applied).toBe(true);
            expect(res.compoundAnalysis).toBeDefined();
        });

        test('validates input format consistency', () => {
            const res = sutra_1_2_64("गजः गजः", { strictFormat: true });
            expect(res.applied).toBe(true);
            expect(res.formatValidation.consistent).toBe(true);
        });

        test('handles malformed string input', () => {
            const res = sutra_1_2_64("   +  + गजः  + + गजः +  ");
            expect(res.applied).toBe(true);
            expect(res.cleanedInput).toBe("गजः गजः");
        });

        test('processes nested array structures', () => {
            const res = sutra_1_2_64([["गजः"], ["गजः"], ["वृक्षः"]], { flattenNested: true });
            expect(res.applied).toBe(true);
            expect(res.structureFlattened).toBe(true);
        });
    });

    describe('Phase 3: Case Validation Tests', () => {
        test('validates case identity in strict mode', () => {
            const words = [
                { surface: "गजः", case: "nom" },
                { surface: "गजः", case: "nom" }
            ];
            const res = sutra_1_2_64(words, { validateCase: true });
            expect(res.applied).toBe(true);
            expect(res.caseValidation.uniform).toBe(true);
        });

        test('rejects mixed cases in strict mode', () => {
            const words = [
                { surface: "गजम्", case: "acc" },
                { surface: "गजम्", case: "nom" }
            ];
            const res = sutra_1_2_64(words, { validateCase: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('case_mismatch');
            expect(res.caseValidation.uniform).toBe(false);
        });

        test('groups by case when mixed cases present', () => {
            const words = [
                { surface: "गजः", case: "nom" },
                { surface: "गजः", case: "nom" },
                { surface: "गजम्", case: "acc" },
                { surface: "गजम्", case: "acc" }
            ];
            const res = sutra_1_2_64(words, { groupByCase: true });
            expect(res.applied).toBe(true);
            expect(res.caseGroups).toHaveProperty('nom');
            expect(res.caseGroups).toHaveProperty('acc');
        });

        test('handles missing case information gracefully', () => {
            const words = [
                { surface: "गजः" },
                { surface: "गजः", case: "nom" }
            ];
            const res = sutra_1_2_64(words, { validateCase: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('missing_case_info');
        });

        test('applies eka-śeṣa per case group', () => {
            const words = [
                { surface: "राम", case: "nom" },
                { surface: "राम", case: "nom" },
                { surface: "राम", case: "acc" },
                { surface: "राम", case: "acc" }
            ];
            const res = sutra_1_2_64(words, { groupByCase: true });
            expect(res.applied).toBe(true);
            expect(res.caseGroups.nom.retainedIndex).toBe(1);
            expect(res.caseGroups.acc.retainedIndex).toBe(3);
        });

        test('validates vibhakti consistency', () => {
            const words = [
                { surface: "गजः", vibhakti: "प्रथमा" },
                { surface: "गजः", vibhakti: "प्रथमा" }
            ];
            const res = sutra_1_2_64(words, { validateVibhakti: true });
            expect(res.applied).toBe(true);
            expect(res.vibhaktiValidation.consistent).toBe(true);
        });

        test('handles case inference from surface forms', () => {
            const res = sutra_1_2_64(["गजः", "गजः", "गजम्"], { inferCase: true });
            expect(res.applied).toBe(true);
            expect(res.inferredCases).toHaveProperty('गजः');
            expect(res.inferredCases['गजः']).toBe('nominative');
        });

        test('processes case-less coordination', () => {
            const res = sutra_1_2_64(["गज", "गज", "वृक्ष"], { ignoreCaseValidation: true });
            expect(res.applied).toBe(true);
            expect(res.caseHandling).toBe('ignored');
        });

        test('applies default case when unspecified', () => {
            const words = [
                { surface: "गजः" },
                { surface: "गजः" }
            ];
            const res = sutra_1_2_64(words, { defaultCase: "nom" });
            expect(res.applied).toBe(true);
            expect(res.caseApplication.defaultUsed).toBe(true);
        });

        test('validates complex case combinations', () => {
            const words = [
                { surface: "गजाभ्याम्", case: "ins", number: "dual" },
                { surface: "गजाभ्याम्", case: "ins", number: "dual" }
            ];
            const res = sutra_1_2_64(words, { validateCase: true, validateNumber: true });
            expect(res.applied).toBe(true);
            expect(res.caseValidation.uniform).toBe(true);
            expect(res.numberValidation.uniform).toBe(true);
        });

        test('handles partial case information', () => {
            const words = [
                { surface: "गजः", case: "nom" },
                { surface: "गजः" },
                { surface: "गजः", case: "nom" }
            ];
            const res = sutra_1_2_64(words, { partialCaseHandling: "infer" });
            expect(res.applied).toBe(true);
            expect(res.caseInference.appliedTo).toContain(1);
        });

        test('rejects inconsistent case patterns', () => {
            const words = [
                { surface: "गज", case: "nom" },
                { surface: "गज", case: "acc" },
                { surface: "गज", case: "gen" }
            ];
            const res = sutra_1_2_64(words, { validateCase: true, allowMixedCases: false });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('multiple_case_mismatch');
        });
    });

    describe('Phase 4: Script Support Tests', () => {
        test('processes IAST coordination', () => {
            const res = sutra_1_2_64("gajaḥ gajaḥ vṛkṣaḥ");
            expect(res.applied).toBe(true);
            expect(res.scriptAnalysis.detected).toBe('iast');
            expect(res.retainedForm).toBe("gajaḥ");
        });

        test('processes Devanagari coordination', () => {
            const res = sutra_1_2_64("गजः गजः वृक्षः");
            expect(res.applied).toBe(true);
            expect(res.scriptAnalysis.detected).toBe('devanagari');
            expect(res.scriptAnalysis.uniform).toBe(true);
        });

        test('handles mixed script coordination', () => {
            const res = sutra_1_2_64("गजः gajaḥ गजः", { normalizeScript: true });
            expect(res.applied).toBe(true);
            expect(res.scriptAnalysis.mixed).toBe(true);
            expect(res.scriptAnalysis.normalized).toBe(true);
        });

        test('normalizes script variations', () => {
            const res = sutra_1_2_64(["gajaḥ", "गजः", "gajaḥ"], { scriptNormalization: "iast" });
            expect(res.applied).toBe(true);
            expect(res.normalizedForms).toEqual(["gajaḥ", "gajaḥ", "gajaḥ"]);
        });

        test('maintains script diversity metadata', () => {
            const res = sutra_1_2_64("गजः gajaḥ vṛkṣaḥ वृक्षः");
            expect(res.scriptAnalysis.diversity.iast).toBeGreaterThan(0);
            expect(res.scriptAnalysis.diversity.devanagari).toBeGreaterThan(0);
        });

        test('processes romanized variants', () => {
            const res = sutra_1_2_64("gajah gajah vrukshah", { acceptRomanized: true });
            expect(res.applied).toBe(true);
            expect(res.scriptAnalysis.romanizedCount).toBe(3);
        });

        test('converts script for comparison', () => {
            const res = sutra_1_2_64(["गजः", "gajaḥ"], { compareAcrossScripts: true });
            expect(res.applied).toBe(true);
            expect(res.crossScriptComparison.matched).toBe(true);
        });

        test('preserves original script in output', () => {
            const res = sutra_1_2_64("गजः gajaḥ गजः", { preserveOriginalScript: true });
            expect(res.applied).toBe(true);
            expect(res.retainedForm).toBe("गजः");  // Last occurrence
            expect(res.originalScripts).toEqual(['devanagari', 'iast', 'devanagari']);
        });
    });

    describe('Phase 5: Coordination Analysis Tests', () => {
        test('analyzes dvandva compound integration', () => {
            const compound = {
                type: "dvandva",
                members: [
                    { lemma: "gaja", surface: "गजः" },
                    { lemma: "gaja", surface: "गजः" }
                ]
            };
            const res = sutra_1_2_64(compound, { compoundContext: true });
            expect(res.applied).toBe(true);
            expect(res.compoundAnalysis.type).toBe('dvandva');
            expect(res.compoundAnalysis.coordinationPattern).toBe('identical_member_elimination');
        });

        test('detects coordination boundaries', () => {
            const res = sutra_1_2_64("गजः च गजः च वृक्षः", { detectConjunctions: true });
            expect(res.applied).toBe(true);
            expect(res.coordinationBoundaries).toBeDefined();
            expect(res.conjunctionPattern).toBe('explicit_च');
        });

        test('processes nested coordination', () => {
            const nested = {
                type: "complex_coordination",
                groups: [
                    { members: ["गजः", "गजः"] },
                    { members: ["अश्वः", "वृक्षः"] }
                ]
            };
            const res = sutra_1_2_64(nested, { processNested: true });
            expect(res.applied).toBe(true);
            expect(res.nestedAnalysis.groupsProcessed).toBe(2);
        });

        test('handles complex coordination structures', () => {
            const complex = [
                { surface: "गजः", group: "A" },
                { surface: "गजः", group: "A" },
                { surface: "अश्वः", group: "B" },
                { surface: "अश्वः", group: "B" }
            ];
            const res = sutra_1_2_64(complex, { groupAware: true });
            expect(res.applied).toBe(true);
            expect(res.groupAnalysis.A.eliminated).toEqual([0]);
            expect(res.groupAnalysis.B.eliminated).toEqual([2]);
        });

        test('identifies coordination patterns', () => {
            const res = sutra_1_2_64("गजः गजः गजः वृक्षः वृक्षः");
            expect(res.coordinationAnalysis.patterns).toContain('triple_repetition');
            expect(res.coordinationAnalysis.patterns).toContain('double_repetition');
        });

        test('analyzes semantic coordination', () => {
            const words = [
                { surface: "राम", semantic: "person" },
                { surface: "राम", semantic: "person" },
                { surface: "वृक्ष", semantic: "plant" }
            ];
            const res = sutra_1_2_64(words, { semanticGrouping: true });
            expect(res.applied).toBe(true);
            expect(res.semanticAnalysis.groups.person.count).toBe(2);
        });

        test('processes coordination with modifiers', () => {
            const words = [
                { surface: "महान् गजः", type: "modified" },
                { surface: "महान् गजः", type: "modified" }
            ];
            const res = sutra_1_2_64(words, { handleModifiers: true });
            expect(res.applied).toBe(true);
            expect(res.modifierAnalysis.consistent).toBe(true);
        });

        test('handles coordination scope ambiguity', () => {
            const res = sutra_1_2_64("गजः अश्वः गजः वृक्षः गजः", { scopeAnalysis: true });
            expect(res.applied).toBe(true);
            expect(res.scopeAnalysis.ambiguityResolved).toBe(true);
            expect(res.eliminatedIndices).toEqual([0, 2]); // First two गजः instances
        });

        test('integrates with sandhi context', () => {
            const res = sutra_1_2_64("गजो गजो वृक्षः", { sandhiContext: true });
            expect(res.applied).toBe(true);
            expect(res.sandhiAnalysis.preProcessed).toBe(true);
        });

        test('analyzes coordination semantics', () => {
            const res = sutra_1_2_64(["गजः", "गजः", "वृक्षः"], { analyzeSemantics: true });
            expect(res.applied).toBe(true);
            expect(res.semanticAnalysis.identicalMeanings.count).toBe(2);
            expect(res.semanticAnalysis.distinctMeanings.count).toBe(1);
        });
    });

    describe('Phase 6: Index Management Tests', () => {
        test('tracks retention index accurately', () => {
            const res = sutra_1_2_64(["a", "b", "a", "c", "a"]);
            expect(res.retainedIndex).toBe(4);
            expect(res.retainedPosition).toBe('last');
            expect(res.eliminatedIndices).toEqual([0, 2]);
        });

        test('tracks elimination indices precisely', () => {
            const res = sutra_1_2_64("गजः वृक्षः गजः अश्वः गजः");
            expect(res.eliminatedIndices).toEqual([0, 2]);
            expect(res.eliminationPattern).toBe('first_to_penultimate');
        });

        test('maintains position-aware processing', () => {
            const res = sutra_1_2_64(["x", "y", "x", "z", "x", "w"]);
            expect(res.positionAnalysis.identicalPositions).toEqual([0, 2, 4]);
            expect(res.positionAnalysis.retainedPosition).toBe(4);
        });

        test('preserves order in complex scenarios', () => {
            const input = ["a", "b", "a", "c", "b", "a"];
            const res = sutra_1_2_64(input);
            expect(res.orderPreservation.maintained).toBe(true);
            expect(res.finalOrder).toEqual(["c", "b", "a"]);
        });

        test('handles multiple elimination groups', () => {
            const res = sutra_1_2_64(["x", "y", "x", "y", "z"]);
            expect(res.eliminationGroups).toHaveProperty('x');
            expect(res.eliminationGroups).toHaveProperty('y');
            expect(res.eliminationGroups.x.retained).toBe(2);
            expect(res.eliminationGroups.y.retained).toBe(3);
        });

        test('validates index consistency', () => {
            const res = sutra_1_2_64(["a", "a", "b", "a"]);
            expect(res.indexValidation.consistent).toBe(true);
            expect(res.indexValidation.totalEliminated).toBe(2);
            expect(res.indexValidation.totalRetained).toBe(2);
        });

        test('processes sparse identical patterns', () => {
            const res = sutra_1_2_64(["a", "b", "c", "d", "a", "e", "f", "a"]);
            expect(res.retainedIndex).toBe(7);
            expect(res.eliminatedIndices).toEqual([0, 4]);
            expect(res.sparsityAnalysis.distance.max).toBeGreaterThan(1);
        });

        test('handles edge position eliminations', () => {
            const res = sutra_1_2_64(["a", "b", "c", "a"]);
            expect(res.edgePositions.firstEliminated).toBe(true);
            expect(res.edgePositions.lastRetained).toBe(true);
        });
    });

    describe('Phase 7: Integration Features Tests', () => {
        test('integrates with context-aware processing', () => {
            const res = sutra_1_2_64(
                ["देवः", "देवः", "मनुष्यः"], 
                { 
                    domain: "beings",
                    context: "vedic_literature",
                    semanticGrouping: true
                }
            );
            expect(res.applied).toBe(true);
            expect(res.contextualAnalysis.domain).toBe("beings");
            expect(res.contextualAnalysis.appropriateForContext).toBe(true);
        });

        test('provides semantic grouping analysis', () => {
            const words = [
                { surface: "गजः", meaning: "elephant" },
                { surface: "गजः", meaning: "elephant" },
                { surface: "सिंहः", meaning: "lion" }
            ];
            const res = sutra_1_2_64(words, { semanticAnalysis: true });
            expect(res.applied).toBe(true);
            expect(res.semanticGroups.elephant.count).toBe(2);
            expect(res.semanticGroups.elephant.retained).toBe(1);
        });

        test('integrates with compound analysis framework', () => {
            const compound = {
                type: "coordination",
                subtype: "dvandva",
                members: [
                    { surface: "राम", role: "agent" },
                    { surface: "राम", role: "agent" }
                ]
            };
            const res = sutra_1_2_64(compound, { 
                compoundFramework: true,
                roleAnalysis: true 
            });
            expect(res.applied).toBe(true);
            expect(res.roleConsistency.maintained).toBe(true);
        });

        test('supports multi-sutra coordination', () => {
            const res = sutra_1_2_64(
                ["गजः", "गजः", "वृक्षः"], 
                { 
                    priorSutras: ["1.2.63", "1.2.62"],
                    sutraChaining: true
                }
            );
            expect(res.applied).toBe(true);
            expect(res.sutraIntegration.chainPosition).toBe("1.2.64");
            expect(res.sutraIntegration.compatibleWithPrior).toBe(true);
        });

        test('handles performance optimization context', () => {
            const largeInput = new Array(1000).fill("गजः");
            const res = sutra_1_2_64(largeInput, { optimizeForLarge: true });
            expect(res.applied).toBe(true);
            expect(res.performance.optimized).toBe(true);
            expect(res.eliminatedIndices.length).toBe(999);
        });

        test('provides comprehensive metadata', () => {
            const res = sutra_1_2_64("गजः गजः वृक्षः", { comprehensiveMetadata: true });
            expect(res.metadata).toBeDefined();
            expect(res.metadata.sutraId).toBe("1.2.64");
            expect(res.metadata.ruleType).toBe("eka_shesha");
            expect(res.metadata.timestamp).toBeDefined();
        });
    });

    describe('Phase 8: Edge Cases and Error Handling', () => {
        test('handles null input gracefully', () => {
            const res = sutra_1_2_64(null);
            expect(res.applied).toBe(false);
            expect(res.error).toBe(false);
            expect(res.reason).toBe('null_input');
        });

        test('handles undefined input gracefully', () => {
            const res = sutra_1_2_64(undefined);
            expect(res.applied).toBe(false);
            expect(res.error).toBe(false);
            expect(res.reason).toBe('undefined_input');
        });

        test('handles empty string input', () => {
            const res = sutra_1_2_64("");
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('empty_string');
            expect(res.processedInput).toBe("");
        });

        test('handles malformed object structures', () => {
            const malformed = [
                { surface: "गजः" },
                { notSurface: "गजः" },
                null,
                { surface: "वृक्षः" }
            ];
            const res = sutra_1_2_64(malformed, { handleMalformed: true });
            expect(res.applied).toBe(false);
            expect(res.malformedHandling.detected).toBe(true);
            expect(res.malformedHandling.recovered.length).toBeGreaterThan(0);
        });

        test('maintains performance with large inputs', () => {
            const largeInput = [];
            for (let i = 0; i < 5000; i++) {
                largeInput.push(i % 2 === 0 ? "गजः" : "वृक्षः");
            }
            
            const startTime = Date.now();
            const res = sutra_1_2_64(largeInput);
            const endTime = Date.now();
            
            expect(res.applied).toBe(true);
            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
            expect(res.performance.efficient).toBe(true);
        });
    });

    describe('Phase 9: Debugging and Metadata', () => {
        test('provides comprehensive result metadata', () => {
            const res = sutra_1_2_64("गजः गजः वृक्षः", { includeMetadata: true });
            expect(res.metadata.sutra).toBe("1.2.64");
            expect(res.metadata.ruleType).toBe("eka_shesha");
            expect(res.metadata.inputFormat).toBeDefined();
            expect(res.metadata.processingTime).toBeDefined();
        });

        test('includes all analysis phases in result', () => {
            const res = sutra_1_2_64("गजः गजः", { detailedAnalysis: true });
            expect(res.analysisPhases).toContain('input_processing');
            expect(res.analysisPhases).toContain('form_grouping');
            expect(res.analysisPhases).toContain('elimination_analysis');
            expect(res.analysisPhases).toContain('result_construction');
        });

        test('supports debug mode when requested', () => {
            const res = sutra_1_2_64("गजः गजः वृक्षः", { debug: true });
            expect(res.debug).toBeDefined();
            expect(res.debug.steps).toBeDefined();
            expect(res.debug.intermediateResults).toBeDefined();
            expect(res.debug.decisionPoints).toBeDefined();
        });

        test('maintains consistent result structure', () => {
            const res1 = sutra_1_2_64("गजः गजः");
            const res2 = sutra_1_2_64(["gajaḥ", "gajaḥ"]);
            
            // Both should have same result structure
            expect(Object.keys(res1).sort()).toEqual(Object.keys(res2).sort());
            expect(typeof res1.applied).toBe(typeof res2.applied);
            expect(typeof res1.retainedIndex).toBe(typeof res2.retainedIndex);
        });
    });

    describe('Phase 10: Comprehensive Integration', () => {
        test('handles complex eka-śeṣa context with all features', () => {
            const complex = {
                type: "dvandva",
                members: [
                    { 
                        surface: "गजः", 
                        case: "nom", 
                        number: "sing",
                        script: "devanagari",
                        semantic: "animal"
                    },
                    { 
                        surface: "gajaḥ", 
                        case: "nom", 
                        number: "sing",
                        script: "iast",
                        semantic: "animal"
                    },
                    { 
                        surface: "वृक्षः", 
                        case: "nom", 
                        number: "sing",
                        script: "devanagari",
                        semantic: "plant"
                    }
                ]
            };
            
            const res = sutra_1_2_64(complex, {
                compoundContext: true,
                validateCase: true,
                normalizeScript: true,
                semanticGrouping: true,
                debug: true
            });
            
            expect(res.applied).toBe(true);
            expect(res.scriptNormalization.applied).toBe(true);
            expect(res.semanticGrouping.animal.eliminated).toBe(1);
        });

        test('processes all coordination variants in comprehensive context', () => {
            const variants = [
                "गजः गजः",
                ["gajaḥ", "gajaḥ"],
                [{ surface: "गजः", case: "nom" }, { surface: "गजः", case: "nom" }],
                { type: "coordination", members: ["गजः", "गजः"] }
            ];
            
            variants.forEach((variant, index) => {
                const res = sutra_1_2_64(variant, { 
                    comprehensiveProcessing: true,
                    variantIndex: index
                });
                expect(res.applied).toBe(true);
                expect(res.processingMetadata.variantHandled).toBe(true);
            });
        });

        test('maintains performance with comprehensive analysis', () => {
            const input = [];
            for (let i = 0; i < 100; i++) {
                input.push({
                    surface: i % 3 === 0 ? "गजः" : (i % 3 === 1 ? "अश्वः" : "वृक्षः"),
                    case: "nom",
                    number: "sing",
                    index: i
                });
            }
            
            const startTime = Date.now();
            const res = sutra_1_2_64(input, {
                comprehensiveAnalysis: true,
                validateCase: true,
                semanticGrouping: true,
                performanceTracking: true
            });
            const endTime = Date.now();
            
            expect(res.applied).toBe(true);
            expect(res.performance.processingTime).toBeLessThan(500);
            expect(res.comprehensiveAnalysis.completed).toBe(true);
        });
    });
});
