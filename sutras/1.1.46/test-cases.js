/**
 * Test cases for Sutra 1.1.46: आद्यन्तौ टकितौ
 * ādyantau ṭakitau - "The initial and final (sounds) are called ṭakita"
 */

export const testCases1_1_46 = {
    // Basic ṭakita identification
    basic_takita: [
        {
            word: 'gam',
            expected: {
                initial: 'g',
                final: 'm',
                initial_type: 'consonant',
                final_type: 'consonant'
            },
            description: 'Simple root with consonant boundaries'
        },
        {
            word: 'a',
            expected: {
                initial: 'a',
                final: 'a',
                initial_type: 'vowel',
                final_type: 'vowel'
            },
            description: 'Single vowel word'
        },
        {
            word: 'kṛ',
            expected: {
                initial: 'k',
                final: 'ṛ',
                initial_type: 'consonant',
                final_type: 'vowel'
            },
            description: 'Root with consonant-vowel boundaries'
        }
    ],

    // Vowel-initial words
    vowel_initial: [
        {
            word: 'asta',
            expected: {
                initial: 'a',
                final: 'a',
                processes: ['vowel-initial word processes', 'prothetic consonant rules']
            },
            description: 'Vowel-initial word with ṭakita implications'
        },
        {
            word: 'indra',
            expected: {
                initial: 'i',
                final: 'a',
                processes: ['vowel-initial word processes']
            },
            description: 'Name with vowel-initial ṭakita'
        },
        {
            word: 'uṣas',
            expected: {
                initial: 'u',
                final: 's',
                processes: ['vowel-initial word processes', 'final consonant rules']
            },
            description: 'Dawn goddess name with mixed boundary types'
        }
    ],

    // Consonant patterns
    consonant_patterns: [
        {
            word: 'karma',
            expected: {
                initial: 'k',
                final: 'a',
                initial_properties: {
                    class: 'stop',
                    voice: 'voiceless',
                    place: 'velar'
                }
            },
            description: 'Action word with stop consonant initial'
        },
        {
            word: 'dharma',
            expected: {
                initial: 'd',
                final: 'a',
                initial_properties: {
                    class: 'stop',
                    voice: 'voiced',
                    place: 'dental'
                }
            },
            description: 'Duty/law with dental stop initial'
        },
        {
            word: 'nāma',
            expected: {
                initial: 'n',
                final: 'a',
                initial_properties: {
                    class: 'nasal',
                    place: 'dental'
                }
            },
            description: 'Name with nasal initial'
        }
    ],

    // Complex phonetic structures
    complex_phonetics: [
        {
            word: 'kṣatra',
            expected: {
                initial: 'k',
                final: 'a',
                note: 'Conjunct consonant cluster at start'
            },
            description: 'Warrior class with conjunct initial'
        },
        {
            word: 'śrī',
            expected: {
                initial: 'ś',
                final: 'ī',
                initial_properties: {
                    class: 'sibilant',
                    place: 'palatal'
                }
            },
            description: 'Prosperity with sibilant and long vowel'
        },
        {
            word: 'jñāna',
            expected: {
                initial: 'j',
                final: 'a',
                note: 'Complex nasal cluster'
            },
            description: 'Knowledge with palatal-nasal cluster'
        }
    ],

    // Morphological contexts
    morphological_contexts: [
        {
            word: 'gacchati',
            context: 'verb_form',
            expected: {
                initial: 'g',
                final: 'i',
                processes: ['verb inflection', 'word-final processes']
            },
            description: 'Inflected verb form'
        },
        {
            word: 'rāmasya',
            context: 'inflected_noun',
            expected: {
                initial: 'r',
                final: 'a',
                processes: ['case ending attachment', 'genitive formation']
            },
            description: 'Genitive case form'
        },
        {
            word: 'sukhena',
            context: 'instrumental',
            expected: {
                initial: 's',
                final: 'a',
                processes: ['instrumental case', 'case ending processes']
            },
            description: 'Instrumental case with happiness'
        }
    ],

    // Compound formations
    compound_formations: [
        {
            word: 'rājapuruṣa',
            context: 'compound',
            expected: {
                initial: 'r',
                final: 'a',
                compound_analysis: {
                    first_element_final: 'a',
                    second_element_initial: 'p'
                }
            },
            description: 'King-man compound'
        },
        {
            word: 'devadatta',
            context: 'compound',
            expected: {
                initial: 'd',
                final: 'a',
                compound_analysis: {
                    first_element_final: 'a',
                    second_element_initial: 'd'
                }
            },
            description: 'God-given compound name'
        }
    ],

    // Sandhi contexts
    sandhi_contexts: [
        {
            word: 'rāmo',
            context: 'pre_sandhi',
            expected: {
                initial: 'r',
                final: 'o',
                sandhi_potential: 'final vowel subject to sandhi'
            },
            description: 'Nominative form ready for sandhi'
        },
        {
            word: 'gaṅgā',
            context: 'pre_sandhi',
            expected: {
                initial: 'g',
                final: 'ā',
                sandhi_potential: 'long vowel sandhi rules apply'
            },
            description: 'River name with long vowel final'
        }
    ],

    // Edge cases
    edge_cases: [
        {
            word: 'ṛ',
            expected: {
                initial: 'ṛ',
                final: 'ṛ',
                note: 'Single liquid vowel'
            },
            description: 'Single character liquid vowel'
        },
        {
            word: 'oṃ',
            expected: {
                initial: 'o',
                final: 'ṃ',
                note: 'Sacred syllable with anusvāra'
            },
            description: 'Sacred pranava with nasal final'
        },
        {
            word: 'aḥ',
            expected: {
                initial: 'a',
                final: 'ḥ',
                note: 'Visarga final sound'
            },
            description: 'Word with visarga final'
        }
    ],

    // Real text examples
    real_text_examples: [
        {
            text: 'dharme cārthe ca kāme ca mokṣe ca bharatarṣabha',
            words: ['dharme', 'cārthe', 'ca', 'kāme', 'ca', 'mokṣe', 'ca', 'bharatarṣabha'],
            focus_word: 'dharme',
            expected: {
                initial: 'd',
                final: 'e',
                context: 'epic_verse'
            },
            description: 'From Mahābhārata verse on life goals'
        },
        {
            text: 'satyaṃ śivaṃ sundaram',
            words: ['satyaṃ', 'śivaṃ', 'sundaram'],
            focus_word: 'śivaṃ',
            expected: {
                initial: 'ś',
                final: 'ṃ',
                context: 'philosophical_maxim'
            },
            description: 'Truth-Auspiciousness-Beauty maxim'
        }
    ],

    // Grammatical processes affected by ṭakita
    grammatical_processes: [
        {
            process: 'word_initial_sandhi',
            examples: [
                {
                    word: 'agni',
                    rule: 'Vowel-initial words in sandhi contexts',
                    takita_relevance: 'Initial vowel determines sandhi rules'
                },
                {
                    word: 'karma',
                    rule: 'Consonant-initial words after vowels',
                    takita_relevance: 'Initial consonant affects preceding vowel'
                }
            ]
        },
        {
            process: 'word_final_modifications',
            examples: [
                {
                    word: 'rāmat',
                    rule: 'Final consonant before case endings',
                    takita_relevance: 'Final sound affects case attachment'
                },
                {
                    word: 'gajāt',
                    rule: 'Ablative case formation',
                    takita_relevance: 'Final vowel changes to accommodate case'
                }
            ]
        }
    ],

    // Test validation cases
    validation_cases: [
        {
            word: 'gam',
            should_pass: true,
            confidence: 1.0,
            reason: 'Clear initial and final identification'
        },
        {
            word: '',
            should_pass: false,
            reason: 'Empty string has no ṭakita elements'
        },
        {
            word: null,
            should_pass: false,
            reason: 'Null input invalid'
        },
        {
            word: 'a',
            should_pass: true,
            confidence: 1.0,
            reason: 'Single character has both initial and final properties'
        }
    ],

    // Integration with other sutras
    sutra_integration: [
        {
            related_sutra: '1.1.70',
            connection: 'taparas taparas takita elements in final position',
            example: 'Final consonant clusters'
        },
        {
            related_sutra: '6.1.1',
            connection: 'Sandhi rules apply to ṭakita boundaries',
            example: 'Initial and final sound modifications'
        },
        {
            related_sutra: '8.4.68',
            connection: 'Final consonant modifications',
            example: 'Pada-final changes affect ṭakita elements'
        }
    ]
};

// Helper functions for test case validation
export function validateTakitaTestCase(testCase, result) {
    const validation = {
        passed: true,
        errors: []
    };

    if (testCase.expected.initial && result.takita_analysis.initial_sound.character !== testCase.expected.initial) {
        validation.passed = false;
        validation.errors.push(`Expected initial '${testCase.expected.initial}', got '${result.takita_analysis.initial_sound.character}'`);
    }

    if (testCase.expected.final && result.takita_analysis.final_sound.character !== testCase.expected.final) {
        validation.passed = false;
        validation.errors.push(`Expected final '${testCase.expected.final}', got '${result.takita_analysis.final_sound.character}'`);
    }

    return validation;
}

export function getTakitaExamples(category = 'all') {
    switch (category) {
        case 'basic':
            return testCases1_1_46.basic_takita;
        case 'vowel_initial':
            return testCases1_1_46.vowel_initial;
        case 'consonant':
            return testCases1_1_46.consonant_patterns;
        case 'complex':
            return testCases1_1_46.complex_phonetics;
        case 'morphological':
            return testCases1_1_46.morphological_contexts;
        case 'compound':
            return testCases1_1_46.compound_formations;
        case 'sandhi':
            return testCases1_1_46.sandhi_contexts;
        case 'edge':
            return testCases1_1_46.edge_cases;
        default:
            return testCases1_1_46;
    }
}
