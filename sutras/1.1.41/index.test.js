import { 
    applySutra1_1_41, 
    analyzeAvyayībhāva, 
    analyzeAvyayībhāvaPatterns,
    isAvyayaElement,
    extractFirstMember,
    validateAvyayībhāva1_1_41, 
    testSutra1_1_41 
} from './index.js';

describe('Sutra 1.1.41: अव्ययीभावश्च Tests', () => {
    
    describe('Core Functionality - applySutra1_1_41', () => {
        test('should classify avyayībhāva compounds as avyaya', () => {
            const result = applySutra1_1_41('adhigaṅgam', { 
                compound_type: 'avyayībhāva',
                members: ['adhi', 'gaṅgā']
            });
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
            expect(result.compound_type).toBe('avyayībhāva');
            expect(result.first_member).toBe('adhi');
        });

        test('should use context compound type', () => {
            const result = applySutra1_1_41('compound', { compound_type: 'अव्ययीभाव' });
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });

        test('should analyze compound members from context', () => {
            const result = applySutra1_1_41('pratidinam', { 
                members: ['prati', 'dina'],
                avyaya_elements: ['prati']
            });
            expect(result.applies).toBe(true);
            expect(result.first_member).toBe('prati');
        });

        test('should not apply to non-avyayībhāva compounds', () => {
            const result = applySutra1_1_41('rāma');
            expect(result.applies).toBe(false);
            expect(result.avyaya_status).toBe(false);
            expect(result.reason).toContain('not an avyayībhāva');
        });
    });

    describe('Compound Analysis - analyzeAvyayībhāva', () => {
        test('should detect from explicit context', () => {
            const result = analyzeAvyayībhāva('word', { compound_type: 'avyayībhāva' });
            expect(result.is_avyayībhāva).toBe(true);
            expect(result.source).toBe('context');
            expect(result.confidence).toBe('high');
        });

        test('should analyze compound members', () => {
            const result = analyzeAvyayībhāva('upanagaraṃ', { 
                members: ['upa', 'nagara'],
                avyaya_elements: ['upa']
            });
            expect(result.is_avyayībhāva).toBe(true);
            expect(result.first_member).toBe('upa');
            expect(result.source).toBe('context_analysis');
        });

        test('should fall back to pattern analysis', () => {
            const result = analyzeAvyayībhāva('pratidinam');
            expect(result.is_avyayībhāva).toBe(true);
            expect(result.first_member).toBe('prati');
            expect(result.source).toBe('pattern_matching');
        });

        test('should reject non-avyayībhāva words', () => {
            const result = analyzeAvyayībhāva('ordinary');
            expect(result.is_avyayībhāva).toBe(false);
        });
    });

    describe('Pattern Analysis - analyzeAvyayībhāvaPatterns', () => {
        test('should detect spatial prefixes', () => {
            const spatialTests = [
                'adhigaṅgam', 'upanagaraṃ', 'anugaṅgam', 'abhimukham', 
                'āsamudram', 'parigṛham', 'vigṛham'
            ];
            
            spatialTests.forEach(word => {
                const result = analyzeAvyayībhāvaPatterns(word);
                expect(result.is_likely_avyayībhāva).toBe(true);
                // Some are known compounds, others are prefix patterns
                expect(['avyaya_prefix', 'known_compound']).toContain(result.pattern_type);
            });
        });

        test('should detect temporal prefixes', () => {
            const result = analyzeAvyayībhāvaPatterns('pratidinam');
            expect(result.is_likely_avyayībhāva).toBe(true);
            expect(result.first_member).toBe('prati');
            // This is a known compound so won't have meaning field
            expect(result.pattern_type).toBe('known_compound');
        });

        test('should detect known compounds', () => {
            const knownCompounds = ['adhigaṅgam', 'pratidinam', 'anukūlam', 'pratikūlam'];
            
            knownCompounds.forEach(compound => {
                const result = analyzeAvyayībhāvaPatterns(compound);
                expect(result.is_likely_avyayībhāva).toBe(true);
                expect(result.confidence).toBe('high');
            });
        });

        test('should reject non-matching patterns', () => {
            const result = analyzeAvyayībhāvaPatterns('ordinaryword');
            expect(result.is_likely_avyayībhāva).toBe(false);
        });

        test('should handle case insensitivity', () => {
            const result = analyzeAvyayībhāvaPatterns('PRATIDINAM');
            expect(result.is_likely_avyayībhāva).toBe(true);
        });
    });

    describe('Avyaya Element Detection - isAvyayaElement', () => {
        test('should identify common avyaya prefixes', () => {
            const avyayaPrefixes = ['adhi', 'prati', 'anu', 'upa', 'ā', 'pari', 'vi', 'sam'];
            
            avyayaPrefixes.forEach(prefix => {
                expect(isAvyayaElement(prefix)).toBe(true);
            });
        });

        test('should use context avyaya elements', () => {
            const result = isAvyayaElement('custom', { avyaya_elements: ['custom'] });
            expect(result).toBe(true);
        });

        test('should detect short vowel-initial elements', () => {
            expect(isAvyayaElement('ā')).toBe(true);
            expect(isAvyayaElement('eva')).toBe(true);
        });

        test('should reject non-avyaya elements', () => {
            expect(isAvyayaElement('rāma')).toBe(false);
            expect(isAvyayaElement('gacchati')).toBe(false);
        });
    });

    describe('First Member Extraction - extractFirstMember', () => {
        test('should extract known prefixes correctly', () => {
            expect(extractFirstMember('adhigaṅgam')).toBe('adhi');
            expect(extractFirstMember('pratidinam')).toBe('prati');
            expect(extractFirstMember('upanagaraṃ')).toBe('upa');
            expect(extractFirstMember('anukūlam')).toBe('anu');
        });

        test('should handle words without known prefixes', () => {
            const result = extractFirstMember('unknownword');
            expect(result.length).toBeGreaterThan(0);
            expect(result.length).toBeLessThanOrEqual(4);
        });

        test('should handle short words', () => {
            const result = extractFirstMember('abc');
            expect(result).toBe('abc');
        });
    });

    describe('Validation - validateAvyayībhāva1_1_41', () => {
        test('should validate avyayībhāva compounds correctly', () => {
            const result = validateAvyayībhāva1_1_41('pratidinam', { 
                compound_type: 'avyayībhāva',
                members: ['prati', 'dina']
            });
            
            expect(result.is_avyaya).toBe(true);
            expect(result.should_be_invariant).toBe(true);
            expect(result.compound_type).toBe('avyayībhāva');
            expect(result.first_member).toBe('prati');
            expect(result.explanation).toContain('whole compound becomes indeclinable');
        });

        test('should provide appropriate usage notes', () => {
            const result = validateAvyayībhāva1_1_41('pratidinam', { 
                compound_type: 'avyayībhāva',
                first_member: 'prati'
            });
            
            expect(result.usage_note).toContain('repetition');
            expect(result.usage_note).toContain('each');
        });

        test('should handle non-qualifying compounds', () => {
            const result = validateAvyayībhāva1_1_41('ordinary');
            expect(result.is_avyaya).toBe(false);
            expect(result.explanation).toContain('does not qualify');
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classical spatial compounds', () => {
            const spatialExamples = [
                { word: 'adhigaṅgam', meaning: 'near the Ganges' },
                { word: 'upanagaraṃ', meaning: 'near the city' },
                { word: 'āsamudram', meaning: 'up to the ocean' },
                { word: 'parigṛham', meaning: 'around the house' }
            ];

            spatialExamples.forEach(example => {
                const result = applySutra1_1_41(example.word);
                expect(result.applies).toBe(true);
                expect(result.avyaya_status).toBe(true);
            });
        });

        test('should handle temporal compounds', () => {
            const temporalExamples = [
                { word: 'pratidinam', meaning: 'daily' },
                { word: 'prativarṣam', meaning: 'yearly' },
                { word: 'sadākālam', meaning: 'always' }
            ];

            temporalExamples.forEach(example => {
                const result = applySutra1_1_41(example.word);
                expect(result.applies).toBe(true);
                expect(result.avyaya_status).toBe(true);
            });
        });

        test('should handle manner compounds', () => {
            const mannerExamples = [
                { word: 'anukūlam', meaning: 'favorably' },
                { word: 'pratikūlam', meaning: 'unfavorably' },
                { word: 'abhimukham', meaning: 'facing towards' }
            ];

            mannerExamples.forEach(example => {
                const result = applySutra1_1_41(example.word);
                expect(result.applies).toBe(true);
                expect(result.avyaya_status).toBe(true);
            });
        });
    });

    describe('Context Integration', () => {
        test('should work with detailed compound context', () => {
            const context = {
                compound_type: 'avyayībhāva',
                members: ['prati', 'dina'],
                meaning: 'daily',
                structure: 'prefix + noun',
                avyaya_elements: ['prati']
            };
            
            const result = applySutra1_1_41('pratidinam', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });

        test('should prioritize explicit context over pattern matching', () => {
            const result = applySutra1_1_41('unusual', { 
                compound_type: 'avyayībhāva',
                first_member: 'special'
            });
            expect(result.applies).toBe(true);
            expect(result.first_member).toBe('special');
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_41('');
            expect(result.applies).toBe(false);
        });

        test('should handle undefined context', () => {
            const result = applySutra1_1_41('pratidinam');
            expect(result.applies).toBe(true); // Should still work with pattern matching
        });

        test('should handle null input', () => {
            const result = applySutra1_1_41(null);
            expect(result.applies).toBe(false);
        });

        test('should be case insensitive', () => {
            const result = applySutra1_1_41('PRATIDINAM');
            expect(result.applies).toBe(true);
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis', () => {
            const result = testSutra1_1_41('pratidinam', { 
                compound_type: 'avyayībhāva' 
            });
            
            expect(result.word).toBe('pratidinam');
            expect(result.sutra).toBe('1.1.41');
            expect(result.analysis.applies).toBe(true);
            expect(result.validation.is_avyaya).toBe(true);
            expect(result.examples).toBeDefined();
            expect(result.timestamp).toBeDefined();
        });
    });

    describe('Integration with Other Sutras', () => {
        test('should complement other avyaya classification sutras', () => {
            const context = {
                compound_type: 'avyayībhāva',
                first_member: 'prati',
                also_covered_by: ['1.1.37', '1.1.38', '1.1.39', '1.1.40']
            };
            
            const result = applySutra1_1_41('pratidinam', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });

        test('should not conflict with other compound types', () => {
            const context = {
                compound_type: 'tatpuruṣa',
                not_avyayībhāva: true
            };
            
            const result = applySutra1_1_41('word', context);
            expect(result.applies).toBe(false);
        });
    });
});
