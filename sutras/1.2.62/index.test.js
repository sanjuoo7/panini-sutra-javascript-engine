import { sutra_1_2_62 } from './index.js';

describe('Sutra 1.2.62 (विशाखयोश्च) - Comprehensive Test Suite', () => {
    
    describe('Phase 1: Basic Application Tests', () => {
        test('applies singular optional for Viśākhā (IAST) in chandas nakshatra', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.numberOptions).toEqual(expect.arrayContaining(['singular', 'dual']));
            expect(res.defaultForm).toBe('dual');
            expect(res.confidence).toBeGreaterThan(0.8);
        });

        test('applies for Devanagari विशाखा singular', () => {
            const res = sutra_1_2_62('विशाखा', { semanticCategory: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.numberOptions).toEqual(expect.arrayContaining(['singular', 'dual']));
        });

        test('fails without chandas flag', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra' });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('missing_chandas_flag');
        });

        test('fails outside nakshatra domain', () => {
            const res = sutra_1_2_62('viśākhā', { chandas: true });
            expect(res.applied).toBe(false);
        });

        test('non-star singular rejected', () => {
            const res = sutra_1_2_62('phalgunī', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
        });

        test('invalid input handled', () => {
            const res = sutra_1_2_62(null, { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('invalid_input');
        });
    });

    describe('Phase 2: Chandas Context Recognition', () => {
        test('recognizes explicit metrical context', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'trishtubh' }
            });
            expect(res.applied).toBe(true);
            expect(res.chandasAnalysis.contextType).toBe('explicit_metrical');
        });

        test('recognizes vedic context', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true,
                vedic: true 
            });
            expect(res.applied).toBe(true);
            expect(res.chandasAnalysis.contextType).toBe('vedic_context');
        });

        test('handles basic chandas flag', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.chandasAnalysis.contextType).toBe('basic_chandas');
        });

        test('rejects false chandas flag', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: false });
            expect(res.applied).toBe(false);
        });

        test('processes meter-specific constraints', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'trishtubh' }
            });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.constraints).toContain('Meter trishtubh suggests 44 syllables');
        });
    });

    describe('Phase 3: Nakshatra Domain Validation', () => {
        test('accepts explicit domain nakshatra', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.domainAnalysis.validDomain).toBe(true);
        });

        test('accepts semanticCategory nakshatra', () => {
            const res = sutra_1_2_62('viśākhā', { semanticCategory: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
        });

        test('accepts astronomical context', () => {
            const res = sutra_1_2_62('viśākhā', { astronomical: true, chandas: true });
            expect(res.applied).toBe(true);
        });

        test('rejects non-nakshatra domain', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'geography', chandas: true });
            expect(res.applied).toBe(false);
        });

        test('rejects missing domain entirely', () => {
            const res = sutra_1_2_62('viśākhā', { chandas: true });
            expect(res.applied).toBe(false);
        });
    });

    describe('Phase 4: Viśākhā Star Recognition', () => {
        test('recognizes standard IAST forms', () => {
            const forms = ['viśākhā', 'viśākha', 'viśākhāḥ'];
            forms.forEach(form => {
                const res = sutra_1_2_62(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.visakhayaAnalysis.isVisakha).toBe(true);
            });
        });

        test('recognizes Devanagari forms', () => {
            const forms = ['विशाखा', 'विशाखाः'];
            forms.forEach(form => {
                const res = sutra_1_2_62(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.visakhayaAnalysis.scriptMatch).toBe('devanagari');
            });
        });

        test('recognizes romanized variants', () => {
            const forms = ['vishakha', 'visaakha', 'vishakhaa'];
            forms.forEach(form => {
                const res = sutra_1_2_62(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.visakhayaAnalysis.recognitionType).toContain('romanized');
            });
        });

        test('recognizes traditional variants', () => {
            const forms = ['vishākha', 'viśākha', 'visākha'];
            forms.forEach(form => {
                const res = sutra_1_2_62(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
            });
        });

        test('handles partial matches with lower confidence', () => {
            const forms = ['viśākh', 'vishak', 'विशाख'];
            forms.forEach(form => {
                const res = sutra_1_2_62(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
                expect(res.confidence).toBeLessThan(0.8);
            });
        });

        test('rejects non-Viśākhā stars', () => {
            const nonVisakha = ['rohiṇī', 'aśvinī', 'bharaṇī', 'kṛttikā', 'punarvasu'];
            nonVisakha.forEach(star => {
                const res = sutra_1_2_62(star, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(false);
            });
        });

        test('case insensitive recognition', () => {
            const forms = ['VIŚĀKHĀ', 'Viśākhā', 'viśākhā', 'VISHAKHA', 'Vishakha'];
            forms.forEach(form => {
                const res = sutra_1_2_62(form, { domain: 'nakshatra', chandas: true });
                expect(res.applied).toBe(true);
            });
        });
    });

    describe('Phase 5: Metrical Constraint Analysis', () => {
        test('analyzes Gayatri meter constraints', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'gayatri' }
            });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.constraints).toContain('Meter gayatri suggests 24 syllables');
            expect(res.metricalAnalysis.flexibility).toBeGreaterThan(0.8);
        });

        test('analyzes Trishtubh meter constraints', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'trishtubh' }
            });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.constraints).toContain('Meter trishtubh suggests 44 syllables');
        });

        test('handles unknown meters gracefully', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'unknown_meter' }
            });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.flexibility).toBe(1.0);
        });

        test('analyzes syllable patterns correctly', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.prosodyAnalysis.syllables.count).toBeGreaterThan(2);
        });

        test('provides metrical recommendations', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.metricalAnalysis.recommendations).toContain('Longer forms favor dual interpretation in metrical contexts');
        });
    });

    describe('Phase 6: Optional Number Analysis', () => {
        test('provides both singular and dual options', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.numberOptions).toEqual(['dual', 'singular']);
            expect(res.optionalSingular).toBe(true);
            expect(res.optionalDual).toBe(true);
        });

        test('calculates precedence based on script', () => {
            const res1 = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true }); // IAST
            expect(res1.applied).toBe(true);
            expect(res1.defaultForm).toBe('dual');
        });

        test('adjusts for metrical constraints', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'anushtubh' } // constrained meter
            });
            expect(res.applied).toBe(true);
            expect(res.numberAnalysis.reasoning).toContain('constrained_meter: favors singular');
        });

        test('provides confidence scoring', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.confidence).toBeGreaterThan(0.5);
            expect(res.confidence).toBeLessThan(1.0);
        });

        test('generates reasoning for number choice', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.numberAnalysis.reasoning).toEqual(expect.arrayContaining([
                expect.stringContaining('favors')
            ]));
        });
    });

    describe('Phase 7: Prior Result Integration', () => {
        test('integrates with prior 1.2.60 nakshatra analysis', () => {
            const res = sutra_1_2_62('viśākhā', {
                domain: 'nakshatra',
                chandas: true,
                priorResults: [
                    { sutra: '1.2.60', applied: true, numberOptions: ['dual', 'plural'] }
                ]
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.enhancements).toContain('Prior 1.2.60 nakshatra analysis supports dual options');
        });

        test('handles conflicts with prior 1.2.58 class plural', () => {
            const res = sutra_1_2_62('viśākhā', {
                domain: 'nakshatra',
                chandas: true,
                priorResults: [
                    { sutra: '1.2.58', applied: true, numberOptions: ['plural'] }
                ]
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.conflicts).toContain('Prior 1.2.58 class plural may conflict with dual focus');
        });

        test('defers to prior 1.2.63 enforced dual', () => {
            const res = sutra_1_2_62('viśākhā', {
                domain: 'nakshatra',
                chandas: true,
                priorResults: [
                    { sutra: '1.2.63', applied: true, enforced: 'dual' }
                ]
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.finalOptions).toEqual(['dual']);
        });

        test('handles empty prior results gracefully', () => {
            const res = sutra_1_2_62('viśākhā', {
                domain: 'nakshatra',
                chandas: true,
                priorResults: []
            });
            expect(res.applied).toBe(true);
            expect(res.integrationAnalysis.priorIntegration).toBe(false);
        });

        test('handles invalid prior results gracefully', () => {
            const res = sutra_1_2_62('viśākhā', {
                domain: 'nakshatra',
                chandas: true,
                priorResults: null
            });
            expect(res.applied).toBe(true);
        });
    });

    describe('Phase 8: Alternative Forms and Prosody Guidance', () => {
        test('generates alternative singular and dual forms', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.alternatives).toEqual(expect.arrayContaining([
                expect.objectContaining({ number: 'singular' }),
                expect.objectContaining({ number: 'dual' })
            ]));
        });

        test('provides prosody guidance for metrical contexts', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true,
                metrical: { meter: 'gayatri' }
            });
            expect(res.applied).toBe(true);
            expect(res.prosodyGuidance.recommendations).toBeDefined();
        });

        test('converts to appropriate singular forms', () => {
            const res = sutra_1_2_62('viśākhāḥ', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            const singularAlt = res.alternatives.find(alt => alt.number === 'singular');
            expect(singularAlt.form).toBe('viśākhā');
        });

        test('converts to appropriate dual forms', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            const dualAlt = res.alternatives.find(alt => alt.number === 'dual');
            expect(dualAlt.form).toBe('viśākhe');
        });
    });

    describe('Phase 9: Edge Cases and Error Handling', () => {
        test('handles whitespace in input', () => {
            const res = sutra_1_2_62('  viśākhā  ', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
        });

        test('handles null input gracefully', () => {
            const res = sutra_1_2_62(null, { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('invalid_input');
        });

        test('handles undefined context gracefully', () => {
            const res = sutra_1_2_62('viśākhā', undefined);
            expect(res.applied).toBe(false);
            expect(res.reason).toBe('invalid_context');
        });

        test('handles very short input strings', () => {
            const res = sutra_1_2_62('vi', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
        });

        test('handles mixed script input', () => {
            const res = sutra_1_2_62('viśāखा', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
        });

        test('handles numeric input gracefully', () => {
            const res = sutra_1_2_62('123', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(false);
        });
    });

    describe('Phase 10: Debugging and Metadata', () => {
        test('provides comprehensive result metadata', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.sutraType).toBe('optional_number_chandas');
            expect(res.processingPhases).toBe(8);
            expect(res.timestamp).toBeDefined();
        });

        test('includes all analysis phases in result', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res.chandasAnalysis).toBeDefined();
            expect(res.domainAnalysis).toBeDefined();
            expect(res.visakhayaAnalysis).toBeDefined();
            expect(res.metricalAnalysis).toBeDefined();
        });

        test('supports debug mode when requested', () => {
            const res = sutra_1_2_62('viśākhā', { 
                domain: 'nakshatra', 
                chandas: true, 
                debug: true 
            });
            expect(res.applied).toBe(true);
        });

        test('maintains consistent result structure', () => {
            const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
            expect(res.applied).toBe(true);
            expect(res).toHaveProperty('sutra');
            expect(res).toHaveProperty('input');
            expect(res).toHaveProperty('sanskritText');
        });
    });

    describe('Phase 11: Comprehensive Integration', () => {
        test('handles complex chandas context with all features', () => {
            const res = sutra_1_2_62('viśākhā', {
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

        test('processes all Viśākhā variants in comprehensive context', () => {
            const variants = ['viśākhā', 'विशाखा', 'vishakha', 'viśākha', 'visaakha'];
            variants.forEach(variant => {
                const res = sutra_1_2_62(variant, {
                    domain: 'nakshatra',
                    chandas: true,
                    metrical: { meter: 'trishtubh' }
                });
                expect(res.applied).toBe(true);
            });
        });

        test('maintains performance with complex analysis', () => {
            const start = Date.now();
            const res = sutra_1_2_62('viśākhā', {
                domain: 'nakshatra',
                chandas: true,
                metrical: { meter: 'gayatri' },
                vedic: true,
                priorResults: [
                    { sutra: '1.2.60', applied: true },
                    { sutra: '1.2.61', applied: true }
                ]
            });
            const duration = Date.now() - start;
            expect(res.applied).toBe(true);
            expect(duration).toBeLessThan(100); // Should complete within 100ms
        });
    });
});
