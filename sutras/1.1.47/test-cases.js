/**
 * Test cases for Sutra 1.1.47: मिदचो ऽन्त्यात् परः
 * midaco 'ntyāt paraḥ - "Mid (substitute) comes after the final sound"
 */

export const testCases1_1_47 = {
    // Basic mid substitution cases
    basic_substitutions: [
        {
            original: 'gam',
            substitute: 'a',
            expected: 'gama',
            description: 'Basic vowel substitution after consonant final'
        },
        {
            original: 'kṛ',
            substitute: 'ta',
            expected: 'kṛta',
            description: 'Suffix substitution after vowel final'
        },
        {
            original: 'bhū',
            substitute: 'ta',
            expected: 'bhūta',
            description: 'Past participle formation'
        },
        {
            original: 'dā',
            substitute: 'na',
            expected: 'dana',
            description: 'Noun derivation from root'
        }
    ],

    // Declension examples
    declension_examples: [
        {
            stem: 'rāma',
            case: 'nominative_plural',
            substitute: 'as',
            expected: 'rāmas',
            description: 'Masculine a-stem nominative plural'
        },
        {
            stem: 'gaja',
            case: 'ablative_singular',
            substitute: 'āt',
            expected: 'gajāt',
            description: 'Masculine a-stem ablative singular'
        },
        {
            stem: 'sītā',
            case: 'accusative_singular',
            substitute: 'ām',
            expected: 'sītām',
            description: 'Feminine ā-stem accusative singular'
        },
        {
            stem: 'kavi',
            case: 'nominative_plural',
            substitute: 'ayas',
            expected: 'kavayas',
            description: 'Masculine i-stem nominative plural'
        }
    ],

    // Conjugation examples
    conjugation_examples: [
        {
            root: 'gam',
            tense: 'present',
            person: '3rd_singular',
            substitute: 'ati',
            expected: 'gacchati',
            description: 'Present tense 3rd person singular',
            note: 'Root transformation gam → gacch- occurs'
        },
        {
            root: 'bhū',
            tense: 'present',
            person: '3rd_singular',
            substitute: 'ati',
            expected: 'bhavati',
            description: 'Present tense with root modification'
        },
        {
            root: 'kṛ',
            tense: 'present',
            person: '1st_singular',
            substitute: 'omi',
            expected: 'karomi',
            description: 'Present tense 1st person singular'
        }
    ],

    // Derivational morphology
    derivational_examples: [
        {
            root: 'kṛ',
            derivation: 'agent_noun',
            substitute: 'aka',
            expected: 'kāraka',
            description: 'Agent noun formation with guṇa'
        },
        {
            root: 'pac',
            derivation: 'gerundive',
            substitute: 'ya',
            expected: 'pacya',
            description: 'Gerundive formation'
        },
        {
            root: 'gam',
            derivation: 'action_noun',
            substitute: 'ana',
            expected: 'gamana',
            description: 'Action noun formation'
        },
        {
            root: 'dṛś',
            derivation: 'past_participle',
            substitute: 'ta',
            expected: 'dṛṣṭa',
            description: 'Past participle with retroflex transformation'
        }
    ],

    // Sandhi applications
    sandhi_examples: [
        {
            first_word: 'rāma',
            second_word: 'iti',
            sandhi_type: 'final_vowel',
            substitute: 'o',
            expected: 'rāmo',
            description: 'Final vowel before i-initial word'
        },
        {
            first_word: 'tat',
            second_word: 'eva',
            sandhi_type: 'consonant_cluster',
            substitute: 'd',
            expected: 'tad',
            description: 'Final consonant before vowel-initial word'
        },
        {
            first_word: 'bhagavat',
            second_word: 'gītā',
            sandhi_type: 'compound',
            substitute: '',
            expected: 'bhagavad',
            description: 'Compound formation with consonant change'
        }
    ],

    // Complex substitution patterns
    complex_patterns: [
        {
            original: 'kṛṣṇa',
            context: 'compound_formation',
            substitute: 'pāda',
            expected: 'kṛṣṇapāda',
            description: 'Compound with deity name'
        },
        {
            original: 'dharma',
            context: 'adjective_formation',
            substitute: 'ika',
            expected: 'dharmika',
            description: 'Adjective formation with -ika suffix'
        },
        {
            original: 'vidyā',
            context: 'possessive_formation',
            substitute: 'vat',
            expected: 'vidyāvat',
            description: 'Possessive adjective formation'
        }
    ],

    // Phonetic transformation contexts
    phonetic_contexts: [
        {
            pattern: 'vowel_to_vowel',
            examples: [
                { original: 'gaja', substitute: 'ā', result: 'gajā' },
                { original: 'kavi', substitute: 'e', result: 'kavie' },
                { original: 'sādhu', substitute: 'o', result: 'sādhuo' }
            ]
        },
        {
            pattern: 'consonant_to_vowel',
            examples: [
                { original: 'gam', substitute: 'a', result: 'gama' },
                { original: 'vac', substitute: 'i', result: 'vaci' },
                { original: 'pat', substitute: 'u', result: 'patu' }
            ]
        },
        {
            pattern: 'vowel_to_consonant',
            examples: [
                { original: 'gaja', substitute: 'n', result: 'gajan' },
                { original: 'kavi', substitute: 't', result: 'kavit' },
                { original: 'bhānu', substitute: 's', result: 'bhānus' }
            ]
        },
        {
            pattern: 'consonant_to_consonant',
            examples: [
                { original: 'gam', substitute: 't', result: 'gat' },
                { original: 'pac', substitute: 'n', result: 'pacn' },
                { original: 'bhaj', substitute: 's', result: 'bhajs' }
            ]
        }
    ],

    // Morphological process contexts
    morphological_processes: [
        {
            process: 'primary_derivation',
            examples: [
                { root: 'kṛ', suffix: 'ta', result: 'kṛta', meaning: 'done' },
                { root: 'gam', suffix: 'ana', result: 'gamana', meaning: 'going' },
                { root: 'bhū', suffix: 'ti', result: 'bhūti', meaning: 'existence' }
            ]
        },
        {
            process: 'secondary_derivation',
            examples: [
                { base: 'dharma', suffix: 'ika', result: 'dharmika', meaning: 'righteous' },
                { base: 'vidyā', suffix: 'vat', result: 'vidyāvat', meaning: 'learned' },
                { base: 'phala', suffix: 'in', result: 'phalin', meaning: 'fruitful' }
            ]
        },
        {
            process: 'compound_formation',
            examples: [
                { first: 'rāja', second: 'putra', result: 'rājaputra', meaning: 'prince' },
                { first: 'guru', second: 'dakṣiṇā', result: 'gurudakṣiṇā', meaning: 'teacher fee' },
                { first: 'deva', second: 'tā', result: 'devatā', meaning: 'deity' }
            ]
        }
    ],

    // Special cases and exceptions
    special_cases: [
        {
            type: 'zero_substitution',
            examples: [
                { original: 'bhagavat', substitute: '', result: 'bhagava', context: 'pada_final' }
            ]
        },
        {
            type: 'multiple_substitution',
            examples: [
                { original: 'gam', substitutes: ['i', 'ṣya', 'ti'], result: 'gamiṣyati', context: 'future_tense' }
            ]
        },
        {
            type: 'conditional_substitution',
            examples: [
                { original: 'kṛ', substitute: 'ta', condition: 'past_participle', result: 'kṛta' },
                { original: 'kṛ', substitute: 'ya', condition: 'gerundive', result: 'kārya' }
            ]
        }
    ],

    // Validation test cases
    validation_cases: [
        {
            test_type: 'valid_substitution',
            original: 'gam',
            substitute: 'ati',
            expected_validity: true,
            reason: 'Standard verb conjugation pattern'
        },
        {
            test_type: 'invalid_substitution',
            original: '',
            substitute: 'a',
            expected_validity: false,
            reason: 'Empty original word'
        },
        {
            test_type: 'context_dependent',
            original: 'kṛ',
            substitute: 'ḷ',
            context: 'vedic',
            expected_validity: true,
            reason: 'Vedic Sanskrit allows ḷ'
        },
        {
            test_type: 'context_dependent',
            original: 'kṛ',
            substitute: 'ḷ',
            context: 'classical',
            expected_validity: false,
            reason: 'Classical Sanskrit rarely uses ḷ'
        }
    ],

    // Real text examples
    textual_examples: [
        {
            source: 'Bhagavad Gītā',
            verse: 'karmaṇy evādhikāras te',
            analysis: [
                { word: 'karmaṇi', base: 'karman', substitute: 'i', case: 'locative' },
                { word: 'adhikāras', base: 'adhikāra', substitute: 's', case: 'nominative' }
            ]
        },
        {
            source: 'Vedic mantra',
            text: 'oṃ gam gaṇapataye namaḥ',
            analysis: [
                { word: 'gaṇapataye', base: 'gaṇapati', substitute: 'e', case: 'dative' },
                { word: 'namaḥ', base: 'namas', substitute: 'ḥ', context: 'pada_final' }
            ]
        }
    ],

    // Error cases for testing
    error_cases: [
        {
            description: 'Null original word',
            original: null,
            substitute: 'a',
            expected_error: 'Invalid input'
        },
        {
            description: 'Non-string substitute',
            original: 'gam',
            substitute: 123,
            expected_error: 'Invalid input'
        },
        {
            description: 'Empty substitute',
            original: 'gam',
            substitute: '',
            expected_error: 'Empty word'
        }
    ],

    // Integration with other sutras
    sutra_integration: [
        {
            related_sutra: '1.1.46',
            connection: 'ṭakita elements define boundaries for mid substitution',
            example: 'Final sound identified by ṭakita rule is replaced by mid'
        },
        {
            related_sutra: '6.1.77',
            connection: 'iko yaṇ aci - semivowel substitution',
            example: 'Mid substitution triggers yaṇ rules'
        },
        {
            related_sutra: '7.2.115',
            connection: 'aco ñṇiti - vowel substitution before ñ/ṇ endings',
            example: 'Mid ending conditions affect vowel changes'
        }
    ]
};

// Helper functions for test case validation
export function validateMidTestCase(testCase, result) {
    const validation = {
        passed: true,
        errors: []
    };

    if (testCase.expected && result.mid_analysis.result_after_mid !== testCase.expected) {
        validation.passed = false;
        validation.errors.push(`Expected result '${testCase.expected}', got '${result.mid_analysis.result_after_mid}'`);
    }

    if (testCase.substitute && result.mid_analysis.substitute_element !== testCase.substitute) {
        validation.passed = false;
        validation.errors.push(`Expected substitute '${testCase.substitute}', got '${result.mid_analysis.substitute_element}'`);
    }

    return validation;
}

export function getMidExamples(category = 'all') {
    switch (category) {
        case 'basic':
            return testCases1_1_47.basic_substitutions;
        case 'declension':
            return testCases1_1_47.declension_examples;
        case 'conjugation':
            return testCases1_1_47.conjugation_examples;
        case 'derivation':
            return testCases1_1_47.derivational_examples;
        case 'sandhi':
            return testCases1_1_47.sandhi_examples;
        case 'complex':
            return testCases1_1_47.complex_patterns;
        case 'phonetic':
            return testCases1_1_47.phonetic_contexts;
        case 'morphological':
            return testCases1_1_47.morphological_processes;
        case 'special':
            return testCases1_1_47.special_cases;
        case 'validation':
            return testCases1_1_47.validation_cases;
        case 'textual':
            return testCases1_1_47.textual_examples;
        case 'error':
            return testCases1_1_47.error_cases;
        default:
            return testCases1_1_47;
    }
}

export function generateMidSubstitutionTests(rootList, suffixList) {
    const tests = [];
    
    rootList.forEach(root => {
        suffixList.forEach(suffix => {
            tests.push({
                original: root,
                substitute: suffix,
                expected: root.slice(0, -1) + suffix,
                description: `${root} + ${suffix} substitution`
            });
        });
    });
    
    return tests;
}
