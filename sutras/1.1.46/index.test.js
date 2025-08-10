import { 
    applySutra1_1_46,
    identifyTakitaElements,
    validateTakita,
    testSutra1_1_46,
    analyzeInitialSound,
    analyzeFinalSound,
    analyzePhoneticProperties,
    getRelevantProcesses
} from './index.js';

describe('Sutra 1.1.46: आद्यन्तौ टकितौ Tests', () => {
    
    describe('Core Functionality - applySutra1_1_46', () => {
        test('should identify ṭakita elements in simple words', () => {
            const result = applySutra1_1_46('gam');
            expect(result.applies).toBe(true);
            expect(result.takita_analysis.initial_sound.character).toBe('g');
            expect(result.takita_analysis.final_sound.character).toBe('m');
            expect(result.takita_analysis.initial_sound.takita_type).toBe('ādya');
            expect(result.takita_analysis.final_sound.takita_type).toBe('anta');
        });

        test('should handle single character words', () => {
            const result = applySutra1_1_46('a');
            expect(result.applies).toBe(true);
            expect(result.takita_analysis.initial_sound.character).toBe('a');
            expect(result.takita_analysis.final_sound.character).toBe('a');
            expect(result.takita_analysis.word_length).toBe(1);
        });

        test('should handle longer words', () => {
            const result = applySutra1_1_46('bhagavat');
            expect(result.applies).toBe(true);
            expect(result.takita_analysis.initial_sound.character).toBe('b');
            expect(result.takita_analysis.final_sound.character).toBe('t');
            expect(result.takita_analysis.word_length).toBe(8);
        });

        test('should handle words with diacritics', () => {
            const result = applySutra1_1_46('kṛṣṇa');
            expect(result.applies).toBe(true);
            expect(result.takita_analysis.initial_sound.character).toBe('k');
            expect(result.takita_analysis.final_sound.character).toBe('a');
        });

        test('should not apply to invalid input', () => {
            const result = applySutra1_1_46('');
            expect(result.applies).toBe(false);
            expect(result.reason).toContain('Empty word');
        });
    });

    describe('Initial Sound Analysis - analyzeInitialSound', () => {
        test('should analyze vowel-initial words', () => {
            const result = analyzeInitialSound('asta');
            expect(result.character).toBe('a');
            expect(result.position).toBe('initial');
            expect(result.takita_type).toBe('ādya');
            expect(result.phonetic_properties.type).toBe('vowel');
        });

        test('should analyze consonant-initial words', () => {
            const result = analyzeInitialSound('karma');
            expect(result.character).toBe('k');
            expect(result.position).toBe('initial');
            expect(result.phonetic_properties.type).toBe('consonant');
            expect(result.phonetic_properties.class).toBe('stop');
        });

        test('should identify phonetic properties correctly', () => {
            const result = analyzeInitialSound('nāma');
            expect(result.character).toBe('n');
            expect(result.phonetic_properties.class).toBe('nasal');
            expect(result.phonetic_properties.place).toBe('dental');
        });
    });

    describe('Final Sound Analysis - analyzeFinalSound', () => {
        test('should analyze vowel-final words', () => {
            const result = analyzeFinalSound('gaja');
            expect(result.character).toBe('a');
            expect(result.position).toBe('final');
            expect(result.takita_type).toBe('anta');
            expect(result.phonetic_properties.type).toBe('vowel');
        });

        test('should analyze consonant-final words', () => {
            const result = analyzeFinalSound('bharat');
            expect(result.character).toBe('t');
            expect(result.position).toBe('final');
            expect(result.phonetic_properties.type).toBe('consonant');
        });

        test('should handle complex final sounds', () => {
            const result = analyzeFinalSound('viṣṇu');
            expect(result.character).toBe('u');
            expect(result.phonetic_properties.grade).toBe('short');
            expect(result.phonetic_properties.quality).toBe('back');
        });
    });

    describe('Phonetic Properties Analysis - analyzePhoneticProperties', () => {
        test('should identify vowel properties', () => {
            const aResult = analyzePhoneticProperties('a');
            expect(aResult.type).toBe('vowel');
            expect(aResult.grade).toBe('short');
            expect(aResult.quality).toBe('central');

            const īResult = analyzePhoneticProperties('ī');
            expect(īResult.type).toBe('vowel');
            expect(īResult.grade).toBe('long');
            expect(īResult.quality).toBe('front');
        });

        test('should identify consonant properties', () => {
            const kResult = analyzePhoneticProperties('k');
            expect(kResult.type).toBe('consonant');
            expect(kResult.class).toBe('stop');
            expect(kResult.voice).toBe('voiceless');
            expect(kResult.place).toBe('velar');

            const mResult = analyzePhoneticProperties('m');
            expect(mResult.type).toBe('consonant');
            expect(mResult.class).toBe('nasal');
            expect(mResult.voice).toBe('voiced');
        });

        test('should identify liquid consonants', () => {
            const rResult = analyzePhoneticProperties('r');
            expect(rResult.type).toBe('consonant');
            expect(rResult.class).toBe('liquid');
            expect(rResult.subtype).toBe('trill');

            const lResult = analyzePhoneticProperties('l');
            expect(lResult.subtype).toBe('lateral');
        });

        test('should identify sibilants', () => {
            const sResult = analyzePhoneticProperties('s');
            expect(sResult.class).toBe('sibilant');
            expect(sResult.place).toBe('dental');

            const śResult = analyzePhoneticProperties('ś');
            expect(śResult.place).toBe('palatal');
        });

        test('should handle unknown characters', () => {
            const result = analyzePhoneticProperties('x');
            expect(result.type).toBe('unknown');
            expect(result.character).toBe('x');
        });
    });

    describe('ṭakita Element Identification - identifyTakitaElements', () => {
        test('should identify ṭakita elements for roots', () => {
            const result = identifyTakitaElements('gam', 'root');
            expect(result.applies).toBe(true);
            expect(result.takita_elements.initial_takita.sound.character).toBe('g');
            expect(result.takita_elements.final_takita.sound.character).toBe('m');
            expect(result.takita_elements.analysis_type).toBe('root');
        });

        test('should identify relevant processes for initial sounds', () => {
            const result = identifyTakitaElements('karma', 'general');
            const initialProcesses = result.takita_elements.initial_takita.relevant_processes;
            expect(initialProcesses).toContain('word-initial sandhi');
            expect(initialProcesses).toContain('prefix attachment');
            expect(initialProcesses).toContain('consonant cluster simplification');
        });

        test('should identify relevant processes for final sounds', () => {
            const result = identifyTakitaElements('gaja', 'general');
            const finalProcesses = result.takita_elements.final_takita.relevant_processes;
            expect(finalProcesses).toContain('word-final sandhi');
            expect(finalProcesses).toContain('case ending attachment');
            expect(finalProcesses).toContain('final vowel modifications');
        });

        test('should handle vowel-initial words', () => {
            const result = identifyTakitaElements('agni', 'general');
            const initialProcesses = result.takita_elements.initial_takita.relevant_processes;
            expect(initialProcesses).toContain('vowel-initial word processes');
            expect(initialProcesses).toContain('prothetic consonant rules');
        });

        test('should identify boundary analysis', () => {
            const result = identifyTakitaElements('dharma', 'general');
            expect(result.takita_elements.boundary_analysis.can_affect_initial).toBe(true);
            expect(result.takita_elements.boundary_analysis.can_affect_final).toBe(true);
        });
    });

    describe('Relevant Processes - getRelevantProcesses', () => {
        test('should get processes for initial vowel sounds', () => {
            const vowelSound = {
                character: 'a',
                phonetic_properties: { type: 'vowel' }
            };
            const processes = getRelevantProcesses(vowelSound, 'initial', 'general');
            expect(processes).toContain('vowel-initial word processes');
            expect(processes).toContain('prothetic consonant rules');
        });

        test('should get processes for initial consonant sounds', () => {
            const consonantSound = {
                character: 'k',
                phonetic_properties: { type: 'consonant' }
            };
            const processes = getRelevantProcesses(consonantSound, 'initial', 'general');
            expect(processes).toContain('consonant cluster simplification');
            expect(processes).toContain('aspiration changes');
        });

        test('should get processes for final vowel sounds', () => {
            const vowelSound = {
                character: 'a',
                phonetic_properties: { type: 'vowel' }
            };
            const processes = getRelevantProcesses(vowelSound, 'final', 'general');
            expect(processes).toContain('final vowel modifications');
        });

        test('should get processes for final consonant sounds', () => {
            const consonantSound = {
                character: 't',
                phonetic_properties: { type: 'consonant' }
            };
            const processes = getRelevantProcesses(consonantSound, 'final', 'general');
            expect(processes).toContain('final consonant rules');
            expect(processes).toContain('visarga formation');
        });
    });

    describe('Validation - validateTakita', () => {
        test('should validate words with ṭakita elements', () => {
            const result = validateTakita('śiva');
            expect(result.is_valid).toBe(true);
            expect(result.takita_identification.initial.character).toBe('ś');
            expect(result.takita_identification.final.character).toBe('a');
            expect(result.confidence).toBe(1.0);
        });

        test('should provide usage notes', () => {
            const result = validateTakita('rāma');
            expect(result.usage_note).toContain("initial sound 'r'");
            expect(result.usage_note).toContain("final sound 'a'");
            expect(result.usage_note).toContain('ṭakita elements');
        });

        test('should provide grammatical properties', () => {
            const result = validateTakita('bhū');
            expect(result.grammatical_properties.has_takita_elements).toBe(true);
            expect(result.grammatical_properties.boundary_positions.first).toBe(0);
            expect(result.grammatical_properties.boundary_positions.last).toBe(2);
            expect(result.grammatical_properties.phonetic_classes.initial).toBe('consonant');
            expect(result.grammatical_properties.phonetic_classes.final).toBe('vowel');
        });

        test('should handle invalid input', () => {
            const result = validateTakita('');
            expect(result.is_valid).toBe(false);
            expect(result.reason).toBeDefined();
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classic root examples', () => {
            const roots = ['kṛ', 'gam', 'as', 'bhū', 'dṛś'];
            roots.forEach(root => {
                const result = applySutra1_1_46(root);
                expect(result.applies).toBe(true);
                expect(result.takita_analysis.initial_sound.character).toBeDefined();
                expect(result.takita_analysis.final_sound.character).toBeDefined();
            });
        });

        test('should handle compound examples', () => {
            const result = applySutra1_1_46('rājapuruṣa');
            expect(result.applies).toBe(true);
            expect(result.takita_analysis.initial_sound.character).toBe('r');
            expect(result.takita_analysis.final_sound.character).toBe('a');
        });

        test('should handle inflected examples', () => {
            const result = applySutra1_1_46('gaṅgāyām');
            expect(result.applies).toBe(true);
            expect(result.takita_analysis.initial_sound.character).toBe('g');
            expect(result.takita_analysis.final_sound.character).toBe('m');
        });
    });

    describe('Complex Cases', () => {
        test('should handle words with conjunct consonants', () => {
            const result = applySutra1_1_46('kṣatra');
            expect(result.applies).toBe(true);
            expect(result.takita_analysis.initial_sound.character).toBe('k');
        });

        test('should handle words with long vowels', () => {
            const result = applySutra1_1_46('gītā');
            expect(result.applies).toBe(true);
            expect(result.takita_analysis.final_sound.character).toBe('ā');
            expect(result.takita_analysis.final_sound.phonetic_properties.grade).toBe('long');
        });

        test('should distinguish between similar words', () => {
            const result1 = applySutra1_1_46('kavi');
            const result2 = applySutra1_1_46('ravi');
            
            expect(result1.takita_analysis.initial_sound.character).toBe('k');
            expect(result2.takita_analysis.initial_sound.character).toBe('r');
            expect(result1.takita_analysis.final_sound.character).toBe('i');
            expect(result2.takita_analysis.final_sound.character).toBe('i');
        });
    });

    describe('Edge Cases', () => {
        test('should handle null input', () => {
            const result = applySutra1_1_46(null);
            expect(result.applies).toBe(false);
        });

        test('should handle non-string input', () => {
            const result = applySutra1_1_46(123);
            expect(result.applies).toBe(false);
        });

        test('should handle whitespace-only input', () => {
            const result = applySutra1_1_46('   ');
            expect(result.applies).toBe(false);
        });

        test('should normalize input properly', () => {
            const result = applySutra1_1_46('  RAMA  ');
            expect(result.applies).toBe(true);
            expect(result.normalized_word).toBe('rama');
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis for words', () => {
            const result = testSutra1_1_46('gaṅgā');
            expect(result.analysis.applies).toBe(true);
            expect(result.identification.applies).toBe(true);
            expect(result.validation.is_valid).toBe(true);
            expect(result.examples.takita_examples).toBeDefined();
        });

        test('should provide linguistic notes', () => {
            const result = testSutra1_1_46('śiva');
            expect(result.linguistic_notes.sutra_purpose).toContain('ṭakita');
            expect(result.linguistic_notes.takita_function).toContain('boundary positions');
            expect(result.linguistic_notes.initial_significance).toContain('word-initial');
            expect(result.linguistic_notes.final_significance).toContain('word-final');
        });

        test('should handle non-qualifying words gracefully', () => {
            const result = testSutra1_1_46('');
            expect(result.analysis.applies).toBe(false);
            expect(result.identification.applies).toBe(false);
            expect(result.validation.is_valid).toBe(false);
        });

        test('should provide process examples', () => {
            const result = testSutra1_1_46('karma');
            expect(result.examples.process_examples).toContain('Initial: k + vowel → sandhi changes');
            expect(result.examples.process_examples.length).toBeGreaterThan(0);
        });
    });

    describe('Morphological Integration', () => {
        test('should identify boundary positions correctly', () => {
            const result = applySutra1_1_46('dharmāt');
            expect(result.takita_analysis.boundary_positions.first).toBe(0);
            expect(result.takita_analysis.boundary_positions.last).toBe(6);
        });

        test('should support different analysis types', () => {
            const rootAnalysis = identifyTakitaElements('kṛ', 'root');
            const suffixAnalysis = identifyTakitaElements('tavya', 'suffix');
            
            expect(rootAnalysis.takita_elements.analysis_type).toBe('root');
            expect(suffixAnalysis.takita_elements.analysis_type).toBe('suffix');
        });

        test('should identify phonetic classes properly', () => {
            const result = validateTakita('nāma');
            expect(result.grammatical_properties.phonetic_classes.initial).toBe('consonant');
            expect(result.grammatical_properties.phonetic_classes.final).toBe('vowel');
        });
    });

    describe('Performance and Coverage', () => {
        test('should handle a variety of Sanskrit words', () => {
            const words = [
                'a', 'ka', 'kṛ', 'gam', 'chat', 'jana', 'tama', 'pūrṇa', 
                'bhagavat', 'dharma', 'artha', 'kāma', 'mokṣa', 'yoga'
            ];
            
            words.forEach(word => {
                const result = applySutra1_1_46(word);
                expect(result.applies).toBe(true);
                expect(result.takita_analysis).toBeDefined();
            });
        });

        test('should maintain consistency across similar patterns', () => {
            const similarWords = ['gaja', 'kāja', 'rāja'];
            const results = similarWords.map(word => applySutra1_1_46(word));
            
            results.forEach(result => {
                expect(result.applies).toBe(true);
                expect(result.takita_analysis.final_sound.character).toBe('a');
            });
        });
    });
});
