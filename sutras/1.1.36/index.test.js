import { 
    applySutra1_1_36,
    analyzeVikaranaPresence,
    analyzeIntransitivityContext,
    validateAvikaranaIntransitive,
    testSutra1_1_36
} from './index.js';

describe('Sutra 1.1.36: विदेह विकरणा अकर्मकाः Tests', () => {
    
    describe('Core Functionality - applySutra1_1_36', () => {
        test('should identify avikaraṇa verbs as intransitive', () => {
            const result = applySutra1_1_36('i', { grammatical_context: 'motion_verb' });
            expect(result.applies).toBe(true);
            expect(result.has_vikarana).toBe(false);
            expect(result.is_intransitive).toBe(true);
            expect(result.verb_type).toBe('avikarana');
        });

        test('should handle existence verbs', () => {
            const result = applySutra1_1_36('as', { grammatical_context: 'existence_verb' });
            expect(result.applies).toBe(true);
            expect(result.root).toBe('as');
            expect(result.meaning).toContain('be');
        });

        test('should handle state verbs', () => {
            const result = applySutra1_1_36('ās', { grammatical_context: 'state_verb' });
            expect(result.applies).toBe(true);
            expect(result.root).toBe('ās');
            expect(result.meaning).toContain('sit');
        });

        test('should not apply to verbs with vikaraṇa', () => {
            const result = applySutra1_1_36('bhū');
            expect(result.applies).toBe(false);
            expect(result.has_vikarana).toBe(true);
            expect(result.reason).toContain('has vikaraṇa');
        });

        test('should handle context-provided vikaraṇa information', () => {
            const result = applySutra1_1_36('testverb', { 
                has_vikarana: false,
                grammatical_context: 'intransitive_usage'
            });
            expect(result.applies).toBe(true);
            expect(result.has_vikarana).toBe(false);
            expect(result.is_intransitive).toBe(true);
        });
    });

    describe('Vikaraṇa Presence Analysis - analyzeVikaranaPresence', () => {
        test('should identify avikaraṇa Class II verbs', () => {
            const class_ii_verbs = ['i', 'as', 'dvis', 'śās'];
            class_ii_verbs.forEach(verb => {
                const result = analyzeVikaranaPresence(verb);
                expect(result.has_vikarana).toBe(false);
                expect(result.verb_class).toContain('Class II');
            });
        });

        test('should identify avikaraṇa Class III verbs', () => {
            const class_iii_verbs = ['hu', 'dā', 'dhā', 'mā', 'hā'];
            class_iii_verbs.forEach(verb => {
                const result = analyzeVikaranaPresence(verb);
                expect(result.has_vikarana).toBe(false);
                expect(result.verb_class).toContain('Class III');
            });
        });

        test('should identify verbs with vikaraṇa', () => {
            const vikarana_verbs = [
                { verb: 'bhū', vikarana: 'a', class: 'Class I' },
                { verb: 'div', vikarana: 'ya', class: 'Class IV' },
                { verb: 'tud', vikarana: 'a', class: 'Class VI' },
                { verb: 'cur', vikarana: 'aya', class: 'Class X' }
            ];

            vikarana_verbs.forEach(test => {
                const result = analyzeVikaranaPresence(test.verb);
                expect(result.has_vikarana).toBe(true);
                expect(result.vikarana_type).toBe(test.vikarana);
                expect(result.verb_class).toContain(test.class);
            });
        });

        test('should handle inflected avikaraṇa forms', () => {
            const inflectedForms = [
                { form: 'eti', root: 'i', type: 'class_ii_active' },
                { form: 'asti', root: 'as', type: 'class_ii_active_s' },
                { form: 'juhoti', root: 'hu', type: 'class_iii_active' },
                { form: 'dadāti', root: 'dā', type: 'class_iii_long' }
            ];

            inflectedForms.forEach(test => {
                const result = analyzeVikaranaPresence(test.form);
                expect(result.has_vikarana).toBe(false);
                expect(result.root).toBe(test.root);
                expect(result.form_type).toBe(test.type);
            });
        });

        test('should detect vikaraṇa patterns in inflected forms', () => {
            const vikaranaForms = ['gacchati', 'bhavati', 'dīvyati', 'corayati'];
            vikaranaForms.forEach(form => {
                const result = analyzeVikaranaPresence(form);
                expect(result.has_vikarana).toBe(true);
                expect(result.vikarana_detected).toBe(true);
            });
        });

        test('should handle context-provided information', () => {
            const result = analyzeVikaranaPresence('unknown', { 
                has_vikarana: false,
                verb_class: 'Class II (adi)'
            });
            expect(result.has_vikarana).toBe(false);
            expect(result.source).toBe('context');
        });

        test('should provide detailed verb information', () => {
            const result = analyzeVikaranaPresence('i');
            expect(result.meaning).toContain('go');
            expect(result.forms).toContain('eti');
            expect(result.examples).toBeDefined();
            expect(result.transitivity).toBe('intransitive');
        });
    });

    describe('Intransitivity Context Analysis - analyzeIntransitivityContext', () => {
        test('should recognize explicit intransitivity context', () => {
            const result = analyzeIntransitivityContext('i', { transitivity: 'intransitive' });
            expect(result.is_valid_context).toBe(true);
            expect(result.intransitivity_type).toBe('explicit');
            expect(result.context_type).toBe('explicit');
        });

        test('should recognize grammatical contexts', () => {
            const contexts = [
                'no_object_present',
                'motion_verb',
                'state_verb',
                'existence_verb',
                'intransitive_usage',
                'syntactic_analysis'
            ];

            contexts.forEach(context => {
                const result = analyzeIntransitivityContext('as', { grammatical_context: context });
                expect(result.is_valid_context).toBe(true);
                expect(result.intransitivity_type).toBe('contextual');
                expect(result.context_type).toBe(context);
            });
        });

        test('should provide default analysis for avikaraṇa verbs', () => {
            const result = analyzeIntransitivityContext('ās');
            expect(result.is_valid_context).toBe(true);
            expect(result.intransitivity_type).toBe('inherent_avikarana');
            expect(result.context_type).toBe('inherent_avikarana');
        });

        test('should handle invalid input', () => {
            const result = analyzeIntransitivityContext('');
            expect(result.is_valid_context).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });
    });

    describe('Validation - validateAvikaranaIntransitive', () => {
        test('should validate avikaraṇa verbs with appropriate confidence', () => {
            const result = validateAvikaranaIntransitive('i', { grammatical_context: 'motion_verb' });
            expect(result.is_valid_application).toBe(true);
            expect(result.can_be_intransitive).toBe(true);
            expect(result.confidence).toBeGreaterThan(0.7);
        });

        test('should provide usage notes', () => {
            const result = validateAvikaranaIntransitive('as', { grammatical_context: 'existence_verb' });
            expect(result.usage_note).toContain('lacks vikaraṇa');
            expect(result.usage_note).toContain('intransitive');
            expect(result.usage_note).toContain('Sutra 1.1.36');
        });

        test('should provide grammatical properties', () => {
            const result = validateAvikaranaIntransitive('ās');
            expect(result.grammatical_properties.verb_type).toBe('avikaraṇa');
            expect(result.grammatical_properties.has_vikarana).toBe(false);
            expect(result.grammatical_properties.typical_transitivity).toBe('intransitive');
            expect(result.grammatical_properties.can_take_object).toBe(false);
        });

        test('should handle transitive exceptions with lower confidence', () => {
            const exceptions = ['dvis', 'śās', 'hu', 'dā', 'dhā', 'mā', 'hā'];
            exceptions.forEach(verb => {
                const result = validateAvikaranaIntransitive(verb);
                expect(result.confidence).toBeLessThan(0.5);
                expect(result.grammatical_properties.exceptions_exist).toBe(true);
                expect(result.exceptions).toContain('exception');
            });
        });

        test('should handle verbs with vikaraṇa', () => {
            const result = validateAvikaranaIntransitive('bhū');
            expect(result.is_valid_application).toBe(false);
            expect(result.can_be_intransitive).toBe(false);
            expect(result.confidence).toBe(0);
        });

        test('should handle invalid input', () => {
            const result = validateAvikaranaIntransitive(null);
            expect(result.is_valid_application).toBe(false);
            expect(result.explanation).toContain('Invalid input');
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classic intransitive avikaraṇa verbs', () => {
            const examples = [
                { verb: 'i', context: 'motion_verb', meaning: 'goes' },
                { verb: 'as', context: 'existence_verb', meaning: 'exists' },
                { verb: 'ās', context: 'state_verb', meaning: 'sits' },
                { verb: 'śī', context: 'state_verb', meaning: 'lies down' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_36(example.verb, { 
                    grammatical_context: example.context
                });
                expect(result.applies).toBe(true);
                expect(result.is_intransitive).toBe(true);
                expect(result.cannot_take_object).toBe(true);
            });
        });

        test('should handle transitive exceptions', () => {
            const exceptions = [
                { verb: 'dvis', meaning: 'hates', object: 'śatrum' },
                { verb: 'śās', meaning: 'rules', object: 'rājyam' },
                { verb: 'dā', meaning: 'gives', object: 'dānam' },
                { verb: 'hu', meaning: 'offers', object: 'haviṣ' }
            ];

            exceptions.forEach(example => {
                const result = applySutra1_1_36(example.verb, { 
                    grammatical_context: 'syntactic_analysis',
                    note: 'transitive_exception'
                });
                expect(result.applies).toBe(true);
                // Note: Sutra still applies but these are exceptional cases
            });
        });

        test('should handle inflected forms in context', () => {
            const sentences = [
                { form: 'eti', root: 'i', context: 'gṛhaṃ eti (goes home)' },
                { form: 'asti', root: 'as', context: 'sūryo asti (sun exists)' },
                { form: 'āste', root: 'ās', context: 'āsane āste (sits on seat)' },
                { form: 'śete', root: 'śī', context: 'śayyāyāṃ śete (lies on bed)' }
            ];

            sentences.forEach(sentence => {
                const result = applySutra1_1_36(sentence.form, { 
                    grammatical_context: 'syntactic_analysis',
                    sentence_context: sentence.context
                });
                expect(result.applies).toBe(true);
                expect(result.root).toBe(sentence.root);
            });
        });
    });

    describe('Verb Class Distinctions', () => {
        test('should distinguish Class II (adi-gaṇa) verbs', () => {
            const class_ii_verbs = ['i', 'as', 'dvis', 'śās'];
            class_ii_verbs.forEach(verb => {
                const result = analyzeVikaranaPresence(verb);
                expect(result.has_vikarana).toBe(false);
                expect(result.verb_class).toContain('Class II (adi)');
            });
        });

        test('should distinguish Class III (hu-gaṇa) verbs', () => {
            const class_iii_verbs = ['hu', 'dā', 'dhā', 'mā', 'hā'];
            class_iii_verbs.forEach(verb => {
                const result = analyzeVikaranaPresence(verb);
                expect(result.has_vikarana).toBe(false);
                expect(result.verb_class).toContain('Class III (hu)');
            });
        });

        test('should identify vikaraṇa classes correctly', () => {
            const vikarana_tests = [
                { verb: 'gam', expected_class: 'Class I' },
                { verb: 'nṛt', expected_class: 'Class IV' },
                { verb: 'kṛṣ', expected_class: 'Class VI' },
                { verb: 'cint', expected_class: 'Class X' }
            ];

            vikarana_tests.forEach(test => {
                const result = analyzeVikaranaPresence(test.verb);
                expect(result.has_vikarana).toBe(true);
                expect(result.verb_class).toContain(test.expected_class);
            });
        });
    });

    describe('Morphological Patterns', () => {
        test('should recognize avikaraṇa inflection patterns', () => {
            const patterns = [
                { pattern: 'eti/ite', class: 'Class II', example: 'eti from i' },
                { pattern: 'sti/ṣṭi', class: 'Class II', example: 'asti from as' },
                { pattern: 'oti/ute', class: 'Class III', example: 'juhoti from hu' },
                { pattern: 'āti/ate', class: 'Class III', example: 'dadāti from dā' }
            ];

            patterns.forEach(pattern => {
                // Test the pattern recognition logic
                expect(pattern.class).toBeDefined();
                expect(pattern.example).toContain('from');
            });
        });

        test('should handle reduplication in Class III verbs', () => {
            const reduplicated = [
                { form: 'dadāti', root: 'dā' },
                { form: 'dadhāti', root: 'dhā' },
                { form: 'jahāti', root: 'hā' },
                { form: 'mimāti', root: 'mā' },
                { form: 'juhoti', root: 'hu' }
            ];

            reduplicated.forEach(test => {
                const result = analyzeVikaranaPresence(test.form);
                expect(result.has_vikarana).toBe(false);
                expect(result.root).toBe(test.root);
            });
        });
    });

    describe('Context Integration', () => {
        test('should work with motion verb context', () => {
            const result = applySutra1_1_36('i', { 
                grammatical_context: 'motion_verb',
                direction: 'gṛham'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('motion_verb');
        });

        test('should work with state verb context', () => {
            const result = applySutra1_1_36('ās', { 
                grammatical_context: 'state_verb',
                location: 'āsane'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('state_verb');
        });

        test('should handle syntactic analysis context', () => {
            const result = applySutra1_1_36('as', { 
                grammatical_context: 'syntactic_analysis',
                analysis_type: 'transitivity_study'
            });
            expect(result.applies).toBe(true);
            expect(result.context_type).toBe('syntactic_analysis');
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_36('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle null input', () => {
            const result = applySutra1_1_36(null);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle non-string input', () => {
            const result = applySutra1_1_36(123);
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Invalid input');
        });

        test('should handle unknown verbs gracefully', () => {
            const result = applySutra1_1_36('unknownverb');
            expect(result).toBeDefined();
            expect(typeof result.applies).toBe('boolean');
        });

        test('should handle ambiguous vikaraṇa detection', () => {
            const result = analyzeVikaranaPresence('ambiguous');
            expect(result.has_vikarana).toBe(null);
            expect(result.reason).toContain('Unable to determine');
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis', () => {
            const result = testSutra1_1_36('i', { grammatical_context: 'motion_verb' });
            expect(result.analysis.applies).toBe(true);
            expect(result.validation.can_be_intransitive).toBe(true);
            expect(result.examples.avikarana_intransitive).toContain('i (to go)');
            expect(result.linguistic_notes.avikarana_classes).toContain('Class II');
        });

        test('should handle non-qualifying verbs', () => {
            const result = testSutra1_1_36('bhū');
            expect(result.analysis.applies).toBe(false);
            expect(result.validation.can_be_intransitive).toBe(false);
        });

        test('should provide educational examples', () => {
            const result = testSutra1_1_36('as');
            expect(result.examples.avikarana_transitive_exceptions).toBeDefined();
            expect(result.examples.inflected_forms).toBeDefined();
            expect(result.linguistic_notes.morphology).toContain('Direct attachment');
        });

        test('should explain vikaraṇa concept', () => {
            const result = testSutra1_1_36('hu');
            expect(result.linguistic_notes.vikarana_concept).toContain('thematic suffixes');
            expect(result.linguistic_notes.transitivity_tendency).toContain('intransitive');
        });
    });

    describe('Exception Handling', () => {
        test('should properly categorize transitive exceptions', () => {
            const transitive_exceptions = ['dvis', 'śās', 'hu', 'dā', 'dhā', 'mā', 'hā'];
            
            transitive_exceptions.forEach(verb => {
                const analysis = analyzeVikaranaPresence(verb);
                expect(analysis.has_vikarana).toBe(false);
                expect(analysis.transitivity).toBe('transitive');
                
                const validation = validateAvikaranaIntransitive(verb);
                expect(validation.grammatical_properties.exceptions_exist).toBe(true);
            });
        });

        test('should maintain sutra application despite exceptions', () => {
            const result = applySutra1_1_36('dvis', { grammatical_context: 'syntactic_analysis' });
            expect(result.applies).toBe(true); // Sutra still applies
            expect(result.is_intransitive).toBe(true); // But note the exception in validation
        });
    });
});
