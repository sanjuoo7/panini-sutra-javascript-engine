import { sutra_1_2_61 } from './index.js';

describe('Sutra 1.2.61 (छन्दसि पुनर्वस्वोरेकवचनम्) - Comprehensive Test Suite', () => {
    
    // ==================== PHASE 1: BASIC FUNCTIONALITY TESTS ====================
    
    describe('Phase 1: Basic Application Tests', () => {
        test('applies singular optional for Punarvasu (IAST) in chandas nakshatra', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.numberOptions).toEqual(expect.arrayContaining(['singular','dual']));
            expect(res.optionalSingular).toBe(true);
            expect(res.sutra).toBe('1.2.61');
        });

        test('applies for Devanagari पुनर्वसू singular', () => {
            const res = sutra_1_2_61('पुनर्वसू', { semanticCategory: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.numberOptions).toEqual(expect.arrayContaining(['singular','dual']));
            expect(res.punarvasuAnalysis.scriptForm).toBe('devanagari');
        });

        test('fails without chandas flag', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('missing_chandas_flag');
            expect(res.chandasAnalysis.validChandas).toBe(false);
        });

        test('fails outside nakshatra domain', () => {
            const res = sutra_1_2_61('punarvasu', { chandas: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('missing_nakshatra_domain');
            expect(res.domainAnalysis.validDomain).toBe(false);
        });

        test('non-star singular rejected', () => {
            const res = sutra_1_2_61('rama', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('not_punarvasu_star');
            expect(res.punarvasuAnalysis.isPunarvasu).toBe(false);
        });

        test('invalid input handled', () => {
            const res = sutra_1_2_61('', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('invalid_input');
        });
    });

    // ==================== PHASE 2: CHANDAS CONTEXT ANALYSIS ====================
    
    describe('Phase 2: Chandas Context Recognition', () => {
        test('recognizes explicit metrical context', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'gayatri', syllables: 24 }
            });
            expect(res.applied).toBe(true);
            expect(res.chandasAnalysis.contextType).toBe('explicit_metrical');
            expect(res.chandasAnalysis.metricalFeatures.meter).toBe('gayatri');
        });

        test('recognizes vedic context', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                vedic: true
            });
            expect(res.applied).toBe(true);
            expect(res.chandasAnalysis.contextType).toBe('vedic_context');
        });

        test('handles basic chandas flag', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true
            });
            expect(res.applied).toBe(true);
            expect(res.chandasAnalysis.contextType).toBe('basic_chandas');
        });

        test('rejects false chandas flag', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: false
            });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('missing_chandas_flag');
        });

        test('processes meter-specific constraints', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                meter: 'trishtubh'
            });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.prosodyAnalysis.meter).toBe('trishtubh');
            expect(res.metricalAnalysis.constraints).toContain('Meter trishtubh suggests 44 syllables');
        });
    });

    // ==================== PHASE 3: DOMAIN VALIDATION TESTS ====================
    
    describe('Phase 3: Nakshatra Domain Validation', () => {
        test('accepts explicit domain nakshatra', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.domainAnalysis.domainType).toBe('explicit_domain');
        });

        test('accepts semanticCategory nakshatra', () => {
            const res = sutra_1_2_61('punarvasu', { semanticCategory: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.domainAnalysis.domainType).toBe('semantic_category');
        });

        test('accepts astronomical context', () => {
            const res = sutra_1_2_61('punarvasu', { astronomical: true, chandas: true });
            expect(res.applied).toBe(true);
            expect(res.domainAnalysis.domainType).toBe('astronomical_context');
        });

        test('rejects non-nakshatra domain', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'general', chandas: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('missing_nakshatra_domain');
        });

        test('rejects missing domain entirely', () => {
            const res = sutra_1_2_61('punarvasu', { chandas: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('missing_nakshatra_domain');
        });
    });

    // ==================== PHASE 4: PUNARVASU RECOGNITION TESTS ====================
    
    describe('Phase 4: Punarvasu Star Recognition', () => {
        test('recognizes standard IAST forms', () => {
            const forms = ['punarvasu', 'punarvasū', 'punar-vasu', 'punar-vasū'];
            forms.forEach(form => {
                const res = sutra_1_2_61(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.punarvasuAnalysis.isPunarvasu).toBe(true);
                expect(res.punarvasuAnalysis.recognitionType).toBe('iast_standard');
                expect(res.punarvasuAnalysis.confidence).toBeGreaterThan(0.9);
            });
        });

        test('recognizes Devanagari forms', () => {
            const forms = ['पुनर्वसु', 'पुनर्वसू', 'पुनर्-वसु', 'पुनर्-वसू'];
            forms.forEach(form => {
                const res = sutra_1_2_61(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.punarvasuAnalysis.isPunarvasu).toBe(true);
                expect(res.punarvasuAnalysis.recognitionType).toBe('devanagari_standard');
                expect(res.punarvasuAnalysis.scriptForm).toBe('devanagari');
            });
        });

        test('recognizes romanized variants', () => {
            const forms = ['punarwasu', 'punar-wasu', 'punur-vasu', 'punar wasu'];
            forms.forEach(form => {
                const res = sutra_1_2_61(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.punarvasuAnalysis.isPunarvasu).toBe(true);
                expect(res.punarvasuAnalysis.recognitionType).toBe('romanized_variant');
                expect(res.punarvasuAnalysis.confidence).toBeGreaterThan(0.8);
            });
        });

        test('recognizes traditional variants', () => {
            const forms = ['puṇarvasū', 'punarwasū', 'puṇarwasū'];
            forms.forEach(form => {
                const res = sutra_1_2_61(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.punarvasuAnalysis.isPunarvasu).toBe(true);
                expect(res.punarvasuAnalysis.recognitionType).toBe('traditional_variant');
                expect(res.punarvasuAnalysis.confidence).toBeGreaterThan(0.75);
            });
        });

        test('handles partial matches with lower confidence', () => {
            const forms = ['punarvasu-star', 'punar-vasu-nakshatra'];
            forms.forEach(form => {
                const res = sutra_1_2_61(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.punarvasuAnalysis.isPunarvasu).toBe(true);
                expect(res.punarvasuAnalysis.recognitionType).toBe('partial_match');
                expect(res.punarvasuAnalysis.confidence).toBeGreaterThan(0.5);
            });
        });

        test('rejects non-Punarvasu stars', () => {
            const nonPunarvasuStars = ['ashwini', 'bharani', 'rohini', 'mrigashira', 'ardra'];
            nonPunarvasuStars.forEach(star => {
                const res = sutra_1_2_61(star, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(false);
                expect(res.punarvasuAnalysis.isPunarvasu).toBe(false);
                expect(res.reason).toBe('not_punarvasu_star');
            });
        });

        test('case insensitive recognition', () => {
            const forms = ['PUNARVASU', 'PunarVasu', 'punarVASU'];
            forms.forEach(form => {
                const res = sutra_1_2_61(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.punarvasuAnalysis.isPunarvasu).toBe(true);
            });
        });
    });

    // ==================== PHASE 5: METRICAL ANALYSIS TESTS ====================
    
    describe('Phase 5: Metrical Constraint Analysis', () => {
        test('analyzes Gayatri meter constraints', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'gayatri' }
            });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.constraints).toContain('Meter gayatri suggests 24 syllables');
            expect(res.metricalAnalysis.flexibility).toBe(0.9);
        });

        test('analyzes Trishtubh meter constraints', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'trishtubh' }
            });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.constraints).toContain('Meter trishtubh suggests 44 syllables');
            expect(res.metricalAnalysis.flexibility).toBe(0.8);
        });

        test('handles unknown meters gracefully', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'custom-meter' }
            });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.metricalCompatibility).toBe(true);
        });

        test('analyzes syllable patterns correctly', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.prosodyAnalysis.syllables.count).toBe(4);
            expect(res.metricalAnalysis.prosodyAnalysis.syllables.pattern).toBe('pu-nar-va-su');
        });

        test('provides metrical recommendations', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.recommendations).toContain('Longer forms favor dual interpretation in metrical contexts');
        });
    });

    // ==================== PHASE 6: NUMBER DETERMINATION TESTS ====================
    
    describe('Phase 6: Optional Number Analysis', () => {
        test('provides both singular and dual options', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.numberOptions).toEqual(['dual', 'singular']);
            expect(res.optionalSingular).toBe(true);
            expect(res.optionalDual).toBe(true);
        });

        test('calculates precedence based on script', () => {
            const res1 = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res1.precedence).toEqual(['dual', 'singular']);
            expect(res1.defaultForm).toBe('dual');
        });

        test('adjusts for metrical constraints', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'anushtubh' } // constrained meter
            });
            expect(res.applied).toBe(true);
            expect(res.numberAnalysis.reasoning).toContain('constrained_meter: favors singular');
        });

        test('provides confidence scoring', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.confidence).toBeGreaterThan(0.7);
            expect(res.confidence).toBeLessThanOrEqual(1.0);
        });

        test('generates reasoning for number choice', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.numberAnalysis.reasoning).toBeInstanceOf(Array);
            expect(res.numberAnalysis.reasoning.length).toBeGreaterThan(0);
        });
    });

    // ==================== PHASE 7: PRIOR RESULT INTEGRATION TESTS ====================
    
    describe('Phase 7: Prior Result Integration', () => {
        test('integrates with prior 1.2.60 nakshatra analysis', () => {
            const priorResults = [
                { sutra: '1.2.60', applied: true, numberOptions: ['dual', 'plural'] }
            ];
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                priorResults 
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.priorIntegration).toBe(true);
            expect(res.integrationAnalysis.enhancements).toContain('Prior 1.2.60 nakshatra analysis supports dual options');
        });

        test('handles conflicts with prior 1.2.58 class plural', () => {
            const priorResults = [
                { sutra: '1.2.58', applied: true, numberOptions: ['singular', 'plural'] }
            ];
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                priorResults 
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.conflicts).toContain('Prior 1.2.58 class plural may conflict with dual focus');
        });

        test('defers to prior 1.2.63 enforced dual', () => {
            const priorResults = [
                { sutra: '1.2.63', applied: true, numberOptions: ['dual'] }
            ];
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                priorResults 
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.finalOptions).toEqual(['dual']);
            expect(res.numberOptions).toEqual(['dual']);
        });

        test('handles empty prior results gracefully', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                priorResults: [] 
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.priorIntegration).toBe(false);
        });

        test('handles invalid prior results gracefully', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                priorResults: null 
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.priorIntegration).toBe(false);
        });
    });

    // ==================== PHASE 8: ALTERNATIVE FORMS AND GUIDANCE ====================
    
    describe('Phase 8: Alternative Forms and Prosody Guidance', () => {
        test('generates alternative singular and dual forms', () => {
            const res = sutra_1_2_61('punarvasū', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.alternatives).toBeInstanceOf(Array);
            expect(res.alternatives.length).toBeGreaterThan(0);
            
            const singularAlt = res.alternatives.find(alt => alt.number === 'singular');
            const dualAlt = res.alternatives.find(alt => alt.number === 'dual');
            expect(singularAlt).toBeDefined();
            expect(dualAlt).toBeDefined();
        });

        test('provides prosody guidance for metrical contexts', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'gayatri' }
            });
            expect(res.applied).toBe(true);
            expect(res.prosodyGuidance).toBeDefined();
            expect(res.prosodyGuidance.recommendations).toBeInstanceOf(Array);
            expect(res.prosodyGuidance.metricalFit).toBeDefined();
            expect(res.prosodyGuidance.preferredForm).toBeDefined();
        });

        test('converts to appropriate singular forms', () => {
            const res = sutra_1_2_61('punarvasū', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            const singularAlt = res.alternatives.find(alt => alt.number === 'singular');
            expect(singularAlt.form).toBe('punarvasu');
        });

        test('converts to appropriate dual forms', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            const dualAlt = res.alternatives.find(alt => alt.number === 'dual');
            expect(dualAlt.form).toBe('punarvasū');
        });
    });

    // ==================== PHASE 9: EDGE CASES AND ERROR HANDLING ====================
    
    describe('Phase 9: Edge Cases and Error Handling', () => {
        test('handles whitespace in input', () => {
            const res = sutra_1_2_61('  punarvasu  ', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.punarvasuAnalysis.isPunarvasu).toBe(true);
        });

        test('handles null input gracefully', () => {
            const res = sutra_1_2_61(null, { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('invalid_input');
        });

        test('handles undefined context gracefully', () => {
            const res = sutra_1_2_61('punarvasu', undefined);
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('invalid_context');
        });

        test('handles very short input strings', () => {
            const res = sutra_1_2_61('pu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
            expect(res.punarvasuAnalysis.isPunarvasu).toBe(false);
        });

        test('handles mixed script input', () => {
            const res = sutra_1_2_61('pुnarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false); // Mixed script should not match exactly
        });

        test('handles numeric input gracefully', () => {
            const res = sutra_1_2_61('123', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
            expect(res.punarvasuAnalysis.isPunarvasu).toBe(false);
        });
    });

    // ==================== PHASE 10: DEBUGGING AND METADATA TESTS ====================
    
    describe('Phase 10: Debugging and Metadata', () => {
        test('provides comprehensive result metadata', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.sutraType).toBe('optional_number_chandas');
            expect(res.processingPhases).toBe(8);
            expect(res.timestamp).toBeDefined();
        });

        test('includes all analysis phases in result', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.chandasAnalysis).toBeDefined();
            expect(res.domainAnalysis).toBeDefined();
            expect(res.punarvasuAnalysis).toBeDefined();
            expect(res.metricalAnalysis).toBeDefined();
            expect(res.numberAnalysis).toBeDefined();
            expect(res.integrationAnalysis).toBeDefined();
        });

        test('supports debug mode when requested', () => {
            const res = sutra_1_2_61('punarvasu', { 
                domain: 'nakshatra', 
                chandas: true,
                debug: true 
            });
            expect(res.applied).toBe(true);
            // Debug mode should not change core functionality
            expect(res.numberOptions).toEqual(['dual', 'singular']);
        });

        test('maintains consistent result structure', () => {
            const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
            expect(res).toHaveProperty('sutra');
            expect(res).toHaveProperty('applied');
            expect(res).toHaveProperty('input');
            expect(res).toHaveProperty('explanation');
            expect(res).toHaveProperty('confidence');
        });
    });

    // ==================== PHASE 11: COMPREHENSIVE INTEGRATION TESTS ====================
    
    describe('Phase 11: Comprehensive Integration', () => {
        test('handles complex chandas context with all features', () => {
            const res = sutra_1_2_61('punarvasu', {
                domain: 'nakshatra',
                chandas: true,
                metrical: { meter: 'gayatri', syllables: 24 },
                vedic: true,
                astronomical: true,
                priorResults: [
                    { sutra: '1.2.60', applied: true, numberOptions: ['dual', 'plural'] }
                ]
            });
            expect(res.applied).toBe(true);
            expect(res.confidence).toBeGreaterThan(0.8);
            expect(res.chandasAnalysis.contextType).toBe('explicit_metrical');
            expect(res.integrationAnalysis.priorIntegration).toBe(true);
        });

        test('processes all Punarvasu variants in comprehensive context', () => {
            const variants = ['punarvasu', 'punarvasū', 'पुनर्वसु', 'पुनर्वसू', 'punarwasu'];
            variants.forEach(variant => {
                const res = sutra_1_2_61(variant, {
                    domain: 'nakshatra',
                    chandas: true,
                    metrical: { meter: 'trishtubh' }
                });
                expect(res.applied).toBe(true);
                expect(res.punarvasuAnalysis.isPunarvasu).toBe(true);
                expect(res.numberOptions).toEqual(['dual', 'singular']);
            });
        });

        test('maintains performance with complex analysis', () => {
            const startTime = Date.now();
            const res = sutra_1_2_61('punarvasu', {
                domain: 'nakshatra',
                chandas: true,
                metrical: { meter: 'gayatri' },
                priorResults: [
                    { sutra: '1.2.58', applied: true },
                    { sutra: '1.2.59', applied: true },
                    { sutra: '1.2.60', applied: true }
                ]
            });
            const endTime = Date.now();
            
            expect(res.applied).toBe(true);
            expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
        });
    });
});
