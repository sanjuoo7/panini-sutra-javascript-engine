import { 
    applySutra1_1_35,
    analyzeKrinvadiVerb,
    analyzeTransitivityContext,
    validateKrinvadiTransitive,
    testSutra1_1_35
} from './index.js';

describe('Sutra 1.1.35: कृण्वादयः कर्मकाः Tests', () => {
    
    describe('Core Functionality - applySutra1_1_35', () => {
        test('should identify kṛṇvādi verbs as transitive', () => {
            const result = applySutra1_1_35('kṛ', { grammatical_context: 'object_present' });
            expect(result.applies).toBe(true);
            expect(result.is_krinvadi).toBe(true);
            expect(result.is_transitive).toBe(true);
            expect(result.verb_class).toBe('Class V (kṛṇvādi)');
        });

        test('should handle śru root', () => {
            const result = applySutra1_1_35('śru', { grammatical_context: 'syntactic_analysis' });
            expect(result.applies).toBe(true);
            expect(result.root).toBe('śru');
            expect(result.meaning).toContain('hear');
        });

        test('should handle brū root', () => {
            const result = applySutra1_1_35('brū', { grammatical_context: 'passive_construction' });
            expect(result.applies).toBe(true);
            expect(result.root).toBe('brū');
            expect(result.meaning).toContain('speak');
        });

        test('should not apply to non-kṛṇvādi verbs', () => {
            const result = applySutra1_1_35('gam');
            expect(result.applies).toBe(false);
            expect(result.is_krinvadi).toBe(false);
            expect(result.reason).toContain('not from kṛṇvādi gaṇa');
        });

        test('should handle context-provided class information', () => {
            const result = applySutra1_1_35('testverb', { 
                verb_class: 'Class V',
                grammatical_context: 'object_present'
            });
            expect(result.applies).toBe(true);
            expect(result.is_krinvadi).toBe(true);
            expect(result.is_transitive).toBe(true);
        });
    });

    describe('Kṛṇvādi Verb Analysis - analyzeKrinvadiVerb', () => {
        test('should identify core kṛṇvādi roots', () => {
            const roots = ['kṛ', 'śru', 'brū', 'sṛj', 'gṛh', 'bandh', 'chid', 'bhid', 'yuj', 'rudh'];
            roots.forEach(root => {
                const result = analyzeKrinvadiVerb(root);
                expect(result.is_krinvadi).toBe(true);
                expect(result.verb_class).toBe('Class V (kṛṇvādi)');
                expect(result.meaning).toBeDefined();
                expect(result.forms).toBeDefined();
            });
        });

        test('should provide detailed information for kṛ root', () => {
            const result = analyzeKrinvadiVerb('kṛ');
            expect(result.is_krinvadi).toBe(true);
            expect(result.meaning).toContain('do');
            expect(result.forms).toContain('karoti');
            expect(result.examples).toBeDefined();
        });

        test('should handle inflected forms', () => {
            const inflectedForms = [
                { form: 'karoti', root: 'kṛ' },
                { form: 'śṛṇoti', root: 'śru' },
                { form: 'bravīti', root: 'brū' },
                { form: 'yunakti', root: 'yuj' }
            ];

            inflectedForms.forEach(test => {
                const result = analyzeKrinvadiVerb(test.form);
                expect(result.is_krinvadi).toBe(true);
                expect(result.root).toBe(test.root);
            });
        });

        test('should not identify non-kṛṇvādi verbs', () => {
            const nonKrinvadi = ['gam', 'sthā', 'pat', 'has'];
            nonKrinvadi.forEach(verb => {
                const result = analyzeKrinvadiVerb(verb);
                expect(result.is_krinvadi).toBe(false);
            });
        });

        test('should handle context-provided class information', () => {
            const result = analyzeKrinvadiVerb('unknown', { verb_class: 'krinvadi' });
            expect(result.is_krinvadi).toBe(true);
            expect(result.source).toBe('context');
        });

        test('should handle middle voice forms', () => {
            const middleForms = ['kurute', 'śṛṇute', 'brūte'];
            middleForms.forEach(form => {
                const result = analyzeKrinvadiVerb(form);
                expect(result.is_krinvadi).toBe(true);
            });
        });
    });

    describe('Transitivity Context Analysis - analyzeTransitivityContext', () => {
        test('should recognize explicit transitivity context', () => {
            const result = analyzeTransitivityContext('kṛ', { transitivity: 'transitive' });
            expect(result.is_valid_context).toBe(true);
            expect(result.transitivity_type).toBe('transitive');
            expect(result.context_type).toBe('explicit');
        });

        test('should recognize grammatical contexts', () => {
            const contexts = [
                'object_present',
                'causative_construction',
                'passive_construction',
                'compound_formation',
                'derivational_process',
                'syntactic_analysis'
            ];

            contexts.forEach(context => {
                const result = analyzeTransitivityContext('kṛ', { grammatical_context: context });
                expect(result.is_valid_context).toBe(true);
                expect(result.transitivity_type).toBe('transitive');
                expect(result.context_type).toBe(context);
            });
        });

        test('should provide default analysis for kṛṇvādi verbs', () => {
            const result = analyzeTransitivityContext('śru');
            expect(result.is_valid_context).toBe(true);
            expect(result.transitivity_type).toBe('transitive');
            expect(result.context_type).toBe('inherent_krinvadi');
        });

        test('should handle invalid input', () => {
            const result = analyzeTransitivityContext('');
            expect(result.is_valid_context).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });
    });

    describe('Validation - validateKrinvadiTransitive', () => {
        test('should validate known kṛṇvādi verbs with high confidence', () => {
            const result = validateKrinvadiTransitive('kṛ', { grammatical_context: 'object_present' });
            expect(result.is_valid_application).toBe(true);
            expect(result.can_be_transitive).toBe(true);
            expect(result.confidence).toBeGreaterThan(0.8);
        });

        test('should provide usage notes', () => {
            const result = validateKrinvadiTransitive('śru', { grammatical_context: 'syntactic_analysis' });
            expect(result.usage_note).toContain('kṛṇvādi gaṇa');
            expect(result.usage_note).toContain('inherently transitive');
            expect(result.usage_note).toContain('Sutra 1.1.35');
        });

        test('should provide grammatical properties', () => {
            const result = validateKrinvadiTransitive('brū');
            expect(result.grammatical_properties.verb_class).toBe('Class V (kṛṇvādi)');
            expect(result.grammatical_properties.transitivity).toBe('transitive');
            expect(result.grammatical_properties.can_take_object).toBe(true);
            expect(result.grammatical_properties.voice_options).toContain('active');
        });

        test('should handle non-kṛṇvādi verbs', () => {
            const result = validateKrinvadiTransitive('gam');
            expect(result.is_valid_application).toBe(false);
            expect(result.can_be_transitive).toBe(false);
            expect(result.confidence).toBe(0);
        });

        test('should handle invalid input', () => {
            const result = validateKrinvadiTransitive(null);
            expect(result.is_valid_application).toBe(false);
            expect(result.explanation).toContain('Invalid input');
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classic kṛṇvādi verbs with objects', () => {
            const examples = [
                { verb: 'kṛ', object: 'karma', meaning: 'does action' },
                { verb: 'śru', object: 'śabda', meaning: 'hears sound' },
                { verb: 'brū', object: 'vākya', meaning: 'speaks words' },
                { verb: 'sṛj', object: 'jagat', meaning: 'creates world' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_35(example.verb, { 
                    grammatical_context: 'object_present',
                    direct_object: example.object
                });
                expect(result.applies).toBe(true);
                expect(result.is_transitive).toBe(true);
            });
        });

        test('should handle inflected forms in sentences', () => {
            const sentences = [
                { form: 'karoti', root: 'kṛ', context: 'active_voice' },
                { form: 'śṛṇoti', root: 'śru', context: 'active_voice' },
                { form: 'kurute', root: 'kṛ', context: 'middle_voice' },
                { form: 'śṛṇute', root: 'śru', context: 'middle_voice' }
            ];

            sentences.forEach(sentence => {
                const result = applySutra1_1_35(sentence.form, { 
                    grammatical_context: 'syntactic_analysis',
                    voice: sentence.context
                });
                expect(result.applies).toBe(true);
                expect(result.root).toBe(sentence.root);
            });
        });

        test('should handle causative constructions', () => {
            const causatives = ['kṛ', 'śru', 'brū'];
            causatives.forEach(verb => {
                const result = applySutra1_1_35(verb, { 
                    grammatical_context: 'causative_construction',
                    construction_type: 'causative'
                });
                expect(result.applies).toBe(true);
                expect(result.context_type).toBe('causative_construction');
            });
        });
    });

    describe('Verb Classes and Morphology', () => {
        test('should identify nasal infix patterns', () => {
            const nasalForms = [
                { form: 'gṛhṇāti', root: 'gṛh' },
                { form: 'badhnāti', root: 'bandh' },
                { form: 'chinatti', root: 'chid' },
                { form: 'bhinatti', root: 'bhid' }
            ];

            nasalForms.forEach(test => {
                const result = analyzeKrinvadiVerb(test.form);
                expect(result.is_krinvadi).toBe(true);
                expect(result.root).toBe(test.root);
            });
        });

        test('should handle strengthened forms', () => {
            const strengthenedForms = [
                { form: 'gṛhṇāti', type: 'strengthened' },
                { form: 'badhnāti', type: 'strengthened' },
                { form: 'yunakti', type: 'yuj_type' }
            ];

            strengthenedForms.forEach(test => {
                const result = analyzeKrinvadiVerb(test.form);
                expect(result.is_krinvadi).toBe(true);
            });
        });

        test('should provide comprehensive morphological information', () => {
            const result = analyzeKrinvadiVerb('yuj');
            expect(result.forms).toContain('yunakti');
            expect(result.examples).toBeDefined();
            expect(result.meaning).toContain('join');
        });
    });

    describe('Context Integration', () => {
        test('should work with passive voice context', () => {
            const result = applySutra1_1_35('kṛ', { 
                grammatical_context: 'passive_construction',
                voice: 'passive'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('passive_construction');
        });

        test('should work with compound formation', () => {
            const result = applySutra1_1_35('śru', { 
                grammatical_context: 'compound_formation',
                compound_type: 'tatpuruṣa'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('compound_formation');
        });

        test('should handle derivational processes', () => {
            const result = applySutra1_1_35('brū', { 
                grammatical_context: 'derivational_process',
                derivation_type: 'secondary'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('derivational_process');
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_35('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle null input', () => {
            const result = applySutra1_1_35(null);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle non-string input', () => {
            const result = applySutra1_1_35(123);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle unknown verbs gracefully', () => {
            const result = applySutra1_1_35('unknownverb');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('not from kṛṇvādi gaṇa');
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis', () => {
            const result = testSutra1_1_35('kṛ', { grammatical_context: 'object_present' });
            expect(result.analysis.applies).toBe(true);
            expect(result.validation.can_be_transitive).toBe(true);
            expect(result.examples.krinvadi_roots).toContain('kṛ');
            expect(result.linguistic_notes.verb_class).toContain('Class V');
        });

        test('should handle non-qualifying verbs', () => {
            const result = testSutra1_1_35('gam');
            expect(result.analysis.applies).toBe(false);
            expect(result.validation.can_be_transitive).toBe(false);
        });

        test('should provide educational examples', () => {
            const result = testSutra1_1_35('śru');
            expect(result.examples.transitive_usage).toBeDefined();
            expect(result.examples.inflected_forms).toBeDefined();
            expect(result.linguistic_notes.morphology).toContain('nasal');
        });
    });

    describe('Advanced Morphological Analysis', () => {
        test('should handle all major kṛṇvādi patterns', () => {
            const patterns = [
                { verbs: ['kṛ', 'śru', 'brū'], pattern: 'basic_root' },
                { verbs: ['gṛh', 'bandh'], pattern: 'nasal_strengthening' },
                { verbs: ['chid', 'bhid'], pattern: 'nasal_insertion' },
                { verbs: ['yuj', 'rudh'], pattern: 'consonant_cluster' }
            ];

            patterns.forEach(pattern => {
                pattern.verbs.forEach(verb => {
                    const result = analyzeKrinvadiVerb(verb);
                    expect(result.is_krinvadi).toBe(true);
                    expect(result.verb_class).toBe('Class V (kṛṇvādi)');
                });
            });
        });

        test('should provide accurate form analysis', () => {
            const forms = [
                { form: 'karoti', analysis: 'third_person_singular_active' },
                { form: 'kurute', analysis: 'third_person_singular_middle' },
                { form: 'gṛhṇāti', analysis: 'strengthened_active' },
                { form: 'yunakti', analysis: 'cluster_active' }
            ];

            forms.forEach(test => {
                const result = analyzeKrinvadiVerb(test.form);
                expect(result.is_krinvadi).toBe(true);
                expect(result.inflected_form).toBe(test.form);
            });
        });
    });

    describe('Transitivity Validation', () => {
        test('should confirm transitive properties for all kṛṇvādi verbs', () => {
            const krinvadiVerbs = ['kṛ', 'śru', 'brū', 'sṛj', 'gṛh', 'bandh', 'chid', 'bhid', 'yuj', 'rudh'];
            
            krinvadiVerbs.forEach(verb => {
                const result = applySutra1_1_35(verb, { grammatical_context: 'syntactic_analysis' });
                expect(result.applies).toBe(true);
                expect(result.is_transitive).toBe(true);
                expect(result.can_take_object).toBe(true);
            });
        });

        test('should provide confidence scoring', () => {
            const result = validateKrinvadiTransitive('kṛ', { 
                grammatical_context: 'object_present',
                direct_object: 'karma'
            });
            expect(result.confidence).toBeGreaterThanOrEqual(0.8);
            expect(result.is_valid_application).toBe(true);
        });
    });
});
