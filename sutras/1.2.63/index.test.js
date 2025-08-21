import { sutra_1_2_63 } from './index.js';

describe('Sutra 1.2.63 (तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य) - Comprehensive Test Suite', () => {

    describe('Phase 1: Basic Application Tests', () => {
        test('applies dual enforcement for Tiṣya+Punarvasū dvandva', () => {
            const compound = { type: 'dvandva', members: [{ lemma: 'tiṣya', number: 'plural' }, { lemma: 'punarvasu', number: 'plural' }] };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.replaced).toBe(true);
            expect(res.originalNumber).toBe('plural');
            expect(res.finalNumber).toBe('dual');
        });

        test('enforces dual when already dual (no replacement)', () => {
            const compound = { type: 'dvandva', members: [{ lemma: 'punarvasu', number: 'dual' }, { lemma: 'tiṣya', number: 'dual' }] };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.replaced).toBe(false);
            expect(res.finalNumber).toBe('dual');
        });

        test('applies for string compound with plural context', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra', number: 'plural' });
            expect(res.applied).toBe(true);
            expect(res.replaced).toBe(true);
        });

        test('handles order-insensitive detection', () => {
            const res = sutra_1_2_63('punarvasu tiṣya', { domain: 'nakshatra', number: 'plural' });
            expect(res.applied).toBe(true);
        });

        test('fails outside nakshatra domain', () => {
            const compound = { type: 'dvandva', members: [{ lemma: 'tiṣya' }, { lemma: 'punarvasu' }] };
            const res = sutra_1_2_63(compound, {});
            expect(res.applied).toBe(false);
        });

        test('handles invalid compound input gracefully', () => {
            const res = sutra_1_2_63(null, { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
        });
    });

    describe('Phase 2: Dvandva Recognition Tests', () => {
        test('recognizes structured dvandva objects', () => {
            const compound = { type: 'dvandva', members: [{ lemma: 'tiṣya' }, { lemma: 'punarvasu' }] };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.dvandvaAnalysis.isDvandva).toBe(true);
        });

        test('recognizes string compounds with plus separator', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.dvandvaAnalysis.compoundType).toBe('string_plus');
        });

        test('recognizes space-separated compounds', () => {
            const res = sutra_1_2_63('punarvasu tiṣya', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.dvandvaAnalysis.compoundType).toBe('string_space');
        });

        test('recognizes ca/च conjunction patterns', () => {
            const res = sutra_1_2_63('tiṣya ca punarvasu ca', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.dvandvaAnalysis.hasConjunction).toBe(true);
        });

        test('handles mixed script compounds', () => {
            const res = sutra_1_2_63('tiṣya+पुनर्वसू', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.dvandvaAnalysis.mixedScript).toBe(true);
        });

        test('detects complex compound structures', () => {
            const compound = { 
                type: 'dvandva', 
                members: [
                    { lemma: 'tiṣya', inflection: 'nominative' }, 
                    { lemma: 'punarvasu', inflection: 'nominative' }
                ]
            };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
        });

        test('rejects non-dvandva compound types', () => {
            const compound = { type: 'tatpurusha', members: [{ lemma: 'tiṣya' }, { lemma: 'punarvasu' }] };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('not_dvandva_compound');
        });

        test('handles malformed compound structures', () => {
            const res = sutra_1_2_63({ type: 'dvandva' }, { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
        });
    });

    describe('Phase 3: Nakshatra Domain Validation', () => {
        test('accepts explicit domain nakshatra', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.domainAnalysis.validDomain).toBe(true);
        });

        test('accepts astronomical domain', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'astronomical' });
            expect(res.applied).toBe(true);
            expect(res.domainAnalysis.domainType).toBe('astronomical');
        });

        test('accepts astral context', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { context: 'astral' });
            expect(res.applied).toBe(true);
        });

        test('accepts semanticCategory nakshatra', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { semanticCategory: 'nakshatra' });
            expect(res.applied).toBe(true);
        });

        test('rejects invalid domains', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'grammar' });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('invalid_domain');
        });

        test('rejects missing domain entirely', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', {});
            expect(res.applied).toBe(false);
        });

        test('handles domain validation with context', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { 
                domain: 'nakshatra', 
                context: 'vedic_astronomy' 
            });
            expect(res.applied).toBe(true);
            expect(res.domainAnalysis.contextualSupport).toBe(true);
        });
    });

    describe('Phase 4: Tiṣya-Punarvasū Recognition', () => {
        test('recognizes standard IAST forms', () => {
            const forms = ['tiṣya+punarvasu', 'punarvasu+tiṣya'];
            forms.forEach(form => {
                const res = sutra_1_2_63(form, { domain: 'nakshatra' });
                expect(res.applied).toBe(true);
                expect(res.nakshatraAnalysis.recognitionType).toBe('exact_iast');
            });
        });

        test('recognizes Devanagari forms', () => {
            const res = sutra_1_2_63('तिष्य+पुनर्वसू', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.nakshatraAnalysis.scriptMatch).toBe('devanagari');
        });

        test('recognizes romanized variants', () => {
            const forms = ['pushya+punarvasu', 'tishya+punarvasuu'];
            forms.forEach(form => {
                const res = sutra_1_2_63(form, { domain: 'nakshatra' });
                expect(res.applied).toBe(true);
            });
        });

        test('recognizes alternative names', () => {
            const res = sutra_1_2_63('puṣya+पुनर्वसु', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.nakshatraAnalysis.hasAlternativeNames).toBe(true);
        });

        test('handles partial matches with lower confidence', () => {
            const forms = ['tiṣ+punar', 'tish+punarvs'];
            forms.forEach(form => {
                const res = sutra_1_2_63(form, { domain: 'nakshatra' });
                expect(res.applied).toBe(true);
                expect(res.confidence).toBeLessThan(0.8);
            });
        });

        test('maintains order independence', () => {
            const res1 = sutra_1_2_63('tiṣya punarvasu', { domain: 'nakshatra' });
            const res2 = sutra_1_2_63('punarvasu tiṣya', { domain: 'nakshatra' });
            expect(res1.applied).toBe(true);
            expect(res2.applied).toBe(true);
            expect(res1.confidence).toBeCloseTo(res2.confidence, 2);
        });

        test('handles mixed script recognition', () => {
            const res = sutra_1_2_63('tiṣya+पुनर्वसू', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.nakshatraAnalysis.mixedScript).toBe(true);
        });

        test('maintains case insensitive recognition', () => {
            const res = sutra_1_2_63('TISYA+PUNARVASU', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
        });

        test('rejects wrong nakshatras', () => {
            const wrongNakshatras = ['viśākhā+rohiṇī', 'aśvinī+bharaṇī'];
            wrongNakshatras.forEach(compound => {
                const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
                expect(res.applied).toBe(false);
            });
        });

        test('rejects single nakshatra (needs both)', () => {
            const res = sutra_1_2_63('tiṣya', { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('incomplete_nakshatra_pair');
        });
    });

    describe('Phase 5: Dual Enforcement Analysis', () => {
        test('correctly identifies plural replacement scenarios', () => {
            const compound = { type: 'dvandva', members: [{ lemma: 'tiṣya', number: 'plural' }] };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra', number: 'plural' });
            expect(res.applied).toBe(true);
            expect(res.replaced).toBe(true);
            expect(res.originalNumber).toBe('plural');
        });

        test('correctly identifies dual enforcement (no replacement)', () => {
            const compound = { type: 'dvandva', members: [{ lemma: 'tiṣya', number: 'dual' }] };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.replaced).toBe(false);
        });

        test('analyzes context number correctly', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra', number: 'plural' });
            expect(res.numberAnalysis.contextNumber).toBe('plural');
            expect(res.replaced).toBe(true);
        });

        test('analyzes member numbers correctly', () => {
            const compound = { 
                type: 'dvandva', 
                members: [
                    { lemma: 'tiṣya', number: 'plural' }, 
                    { lemma: 'punarvasu', number: 'singular' }
                ] 
            };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
            expect(res.numberAnalysis.memberNumbers).toContain('plural');
            expect(res.replaced).toBe(true);
        });

        test('provides confidence scoring', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res.confidence).toBeGreaterThan(0.9);
            expect(res.confidence).toBeLessThanOrEqual(1.0);
        });

        test('generates replacement metadata', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra', number: 'plural' });
            expect(res.replacementAnalysis).toBeDefined();
            expect(res.replacementAnalysis.replacementType).toBe('plural_to_dual');
        });

        test('assigns final number correctly', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra', number: 'plural' });
            expect(res.finalNumber).toBe('dual');
            expect(res.numberAnalysis.enforced).toBe(true);
        });

        test('handles no number context gracefully', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res.applied).toBe(true);
            expect(res.finalNumber).toBe('dual');
        });
    });

    describe('Phase 6: Prior Result Integration', () => {
        test('overrides prior 1.2.58 class plural', () => {
            const context = {
                domain: 'nakshatra',
                number: 'plural',
                priorResults: {
                    '1.2.58': { applied: true, number: 'plural' }
                }
            };
            const res = sutra_1_2_63('tiṣya+punarvasu', context);
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.overridesPrior).toContain('1.2.58');
        });

        test('overrides prior 1.2.60 nakshatra optionality', () => {
            const context = {
                domain: 'nakshatra',
                priorResults: {
                    '1.2.60': { applied: true, number: 'plural', confidence: 0.8 }
                }
            };
            const res = sutra_1_2_63('tiṣya+punarvasu', context);
            expect(res.integrationAnalysis.overridesPrior).toContain('1.2.60');
        });

        test('complements 1.2.61 Punarvasu rules when applicable', () => {
            const context = {
                domain: 'nakshatra',
                priorResults: {
                    '1.2.61': { applied: false, reason: 'not_chandas_context' }
                }
            };
            const res = sutra_1_2_63('tiṣya+punarvasu', context);
            expect(res.integrationAnalysis.complementsPrior).toContain('1.2.61');
        });

        test('handles conflicts with 1.2.62 appropriately', () => {
            const context = {
                domain: 'nakshatra',
                priorResults: {
                    '1.2.62': { applied: true, number: 'singular' }
                }
            };
            const res = sutra_1_2_63('tiṣya+punarvasu', context);
            expect(res.integrationAnalysis.conflictsPrior).toContain('1.2.62');
        });

        test('handles empty prior results gracefully', () => {
            const context = {
                domain: 'nakshatra',
                priorResults: {}
            };
            const res = sutra_1_2_63('tiṣya+punarvasu', context);
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.noPriorResults).toBe(true);
        });

        test('handles invalid prior results gracefully', () => {
            const context = {
                domain: 'nakshatra',
                priorResults: null
            };
            const res = sutra_1_2_63('tiṣya+punarvasu', context);
            expect(res.applied).toBe(true);
        });
    });

    describe('Phase 7: Alternative Forms and Output', () => {
        test('generates appropriate dual forms', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res.alternativeForms.dual).toBeDefined();
            expect(res.alternativeForms.dual.iast).toBe('tiṣyapunarvasū');
        });

        test('provides grammatical recommendations', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra', number: 'plural' });
            expect(res.recommendations).toBeDefined();
            expect(res.recommendations.primary).toBe('use_dual_form');
        });

        test('supports multi-script output generation', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra', outputScript: 'both' });
            expect(res.alternativeForms.dual.iast).toBeDefined();
            expect(res.alternativeForms.dual.devanagari).toBeDefined();
        });

        test('provides alternative representations', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res.alternativeForms.representations).toBeDefined();
            expect(res.alternativeForms.representations.length).toBeGreaterThan(0);
        });

        test('includes prosodic guidance when relevant', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { 
                domain: 'nakshatra', 
                context: 'metrical' 
            });
            expect(res.prosodicAnalysis).toBeDefined();
        });
    });

    describe('Phase 8: Edge Cases and Error Handling', () => {
        test('handles null input gracefully', () => {
            const res = sutra_1_2_63(null, { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('invalid_input');
        });

        test('handles undefined context gracefully', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', undefined);
            expect(res.applied).toBe(false);
        });

        test('handles empty compound gracefully', () => {
            const res = sutra_1_2_63('', { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
        });

        test('handles malformed member structures', () => {
            const compound = { type: 'dvandva', members: [null, { lemma: 'punarvasu' }] };
            const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
        });

        test('maintains performance with large context objects', () => {
            const largeContext = {
                domain: 'nakshatra',
                priorResults: {},
                // Add many properties to test performance
                ...Array.from({ length: 100 }, (_, i) => ({ [`prop${i}`]: `value${i}` })).reduce((a, b) => ({ ...a, ...b }))
            };
            const start = Date.now();
            const res = sutra_1_2_63('tiṣya+punarvasu', largeContext);
            const duration = Date.now() - start;
            expect(res.applied).toBe(true);
            expect(duration).toBeLessThan(100); // Should complete within 100ms
        });
    });

    describe('Phase 9: Debugging and Metadata', () => {
        test('provides comprehensive result metadata', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res.sutraType).toBe('dual_enforcement_niyama');
            expect(res.processingPhases).toBe(8);
            expect(res.timestamp).toBeDefined();
        });

        test('includes all analysis phases in result', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res.domainAnalysis).toBeDefined();
            expect(res.dvandvaAnalysis).toBeDefined();
            expect(res.nakshatraAnalysis).toBeDefined();
            expect(res.numberAnalysis).toBeDefined();
        });

        test('supports debug mode when requested', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { 
                domain: 'nakshatra', 
                debug: true 
            });
            expect(res.debugInfo).toBeDefined();
            expect(res.debugInfo.phases).toBeDefined();
        });

        test('maintains consistent result structure', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra' });
            expect(res).toHaveProperty('applied');
            expect(res).toHaveProperty('confidence');
            expect(res).toHaveProperty('sutraId');
            expect(res).toHaveProperty('sanskritText');
        });
    });

    describe('Phase 10: Comprehensive Integration', () => {
        test('handles complex nakshatra context with all features', () => {
            const res = sutra_1_2_63('tiṣya+punarvasu', {
                domain: 'nakshatra',
                number: 'plural',
                context: 'astronomical_calculation',
                priorResults: {
                    '1.2.60': { applied: true, number: 'plural' }
                },
                outputScript: 'both',
                debug: true
            });
            expect(res.applied).toBe(true);
            expect(res.replaced).toBe(true);
            expect(res.confidence).toBeGreaterThan(0.9);
        });

        test('processes all nakshatra variants in comprehensive context', () => {
            const variants = ['tiṣya+punarvasu', 'तिष्य+पुनर्वसू', 'pushya+punarvasuu', 'puṣya+पुनर्वसु'];
            variants.forEach(variant => {
                const res = sutra_1_2_63(variant, { 
                    domain: 'nakshatra',
                    number: 'plural',
                    comprehensive: true
                });
                expect(res.applied).toBe(true);
                expect(res.nakshatraAnalysis.isComplete).toBe(true);
            });
        });

        test('maintains performance with comprehensive analysis', () => {
            const start = Date.now();
            const res = sutra_1_2_63('tiṣya+punarvasu', {
                domain: 'nakshatra',
                number: 'plural',
                comprehensive: true,
                debug: true,
                outputScript: 'both',
                priorResults: {
                    '1.2.58': { applied: true },
                    '1.2.59': { applied: false },
                    '1.2.60': { applied: true },
                    '1.2.61': { applied: false },
                    '1.2.62': { applied: false }
                }
            });
            const duration = Date.now() - start;
            expect(res.applied).toBe(true);
            expect(duration).toBeLessThan(50); // Should be efficient even with full analysis
        });
    });
});
