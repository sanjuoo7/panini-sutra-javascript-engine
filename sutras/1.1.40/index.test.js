import { 
    applySutra1_1_40, 
    analyzeQualifyingAffixes, 
    isKtvaForm,
    validateSpecificAffix1_1_40, 
    testSutra1_1_40 
} from './index.js';

describe('Sutra 1.1.40: क्त्वातोसुन्कसुनः Tests', () => {
    
    describe('Core Functionality - applySutra1_1_40', () => {
        test('should classify ktvā forms as avyaya', () => {
            const result = applySutra1_1_40('gatvā', { affixes: ['ktvā'] });
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
            expect(result.affix_type).toBe('ktvā');
        });

        test('should classify tosun forms as avyaya', () => {
            const result = applySutra1_1_40('sometosun', { affixes: ['tosun'] });
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
            expect(result.affix_type).toBe('tosun');
        });

        test('should classify kasun forms as avyaya', () => {
            const result = applySutra1_1_40('somekasun', { affixes: ['kasun'] });
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
            expect(result.affix_type).toBe('kasun');
        });

        test('should not apply to words without qualifying affixes', () => {
            const result = applySutra1_1_40('rāma');
            expect(result.applies).toBe(false);
            expect(result.avyaya_status).toBe(false);
            expect(result.reason).toContain('does not end in');
        });
    });

    describe('Affix Analysis - analyzeQualifyingAffixes', () => {
        test('should detect ktvā from context', () => {
            const result = analyzeQualifyingAffixes('gatvā', { affixes: ['ktvā'] });
            expect(result.has_qualifying_affix).toBe(true);
            expect(result.affix_type).toBe('ktvā');
            expect(result.source).toBe('context');
        });

        test('should detect ktvā from pattern matching', () => {
            const result = analyzeQualifyingAffixes('kṛtvā');
            expect(result.has_qualifying_affix).toBe(true);
            expect(result.affix_type).toBe('ktvā');
            expect(result.source).toBe('pattern_matching');
        });

        test('should detect Devanagari affixes from context', () => {
            const result = analyzeQualifyingAffixes('word', { affixes: ['क्त्व'] });
            expect(result.has_qualifying_affix).toBe(true);
            expect(result.affix_type).toBe('क्त्व');
        });

        test('should detect tosun patterns', () => {
            const result = analyzeQualifyingAffixes('wordtos');
            expect(result.has_qualifying_affix).toBe(true);
            expect(result.affix_type).toBe('tosun');
        });

        test('should detect kasun patterns', () => {
            const result = analyzeQualifyingAffixes('wordkas');
            expect(result.has_qualifying_affix).toBe(true);
            expect(result.affix_type).toBe('kasun');
        });

        test('should not detect non-qualifying patterns', () => {
            const result = analyzeQualifyingAffixes('ordinary');
            expect(result.has_qualifying_affix).toBe(false);
            expect(result.affix_type).toBe(null);
        });
    });

    describe('Ktvā Form Detection - isKtvaForm', () => {
        test('should identify common ktvā patterns', () => {
            expect(isKtvaForm('gatvā')).toBe(true);
            expect(isKtvaForm('kṛtvā')).toBe(true);
            expect(isKtvaForm('bhuktvā')).toBe(true);
            expect(isKtvaForm('dṛṣṭvā')).toBe(true);
        });

        test('should identify ya variant of ktvā', () => {
            expect(isKtvaForm('gaccya')).toBe(true);
            expect(isKtvaForm('kurya')).toBe(true);
        });

        test('should identify with connecting vowels', () => {
            expect(isKtvaForm('gamitvā')).toBe(true);
            expect(isKtvaForm('krametvā')).toBe(true);
        });

        test('should use context information', () => {
            expect(isKtvaForm('word', { word_type: 'absolutive' })).toBe(true);
            expect(isKtvaForm('word', { word_type: 'gerund' })).toBe(true);
        });

        test('should reject non-ktvā forms', () => {
            expect(isKtvaForm('rāma')).toBe(false);
            expect(isKtvaForm('gacchati')).toBe(false);
        });
    });

    describe('Validation - validateSpecificAffix1_1_40', () => {
        test('should validate avyaya words correctly', () => {
            const result = validateSpecificAffix1_1_40('gatvā', { affixes: ['ktvā'] });
            expect(result.is_avyaya).toBe(true);
            expect(result.should_be_invariant).toBe(true);
            expect(result.affix_type).toBe('ktvā');
            expect(result.explanation).toContain('should remain unchanged');
        });

        test('should provide usage notes', () => {
            const result = validateSpecificAffix1_1_40('gatvā', { affixes: ['ktvā'] });
            expect(result.usage_note).toContain('absolutive');
            expect(result.usage_note).toContain('having done');
        });

        test('should handle non-qualifying words', () => {
            const result = validateSpecificAffix1_1_40('rāma');
            expect(result.is_avyaya).toBe(false);
            expect(result.explanation).toContain('does not have qualifying');
        });
    });

    describe('Real Sanskrit Examples', () => {
        test('should handle classical ktvā forms', () => {
            const examples = [
                { word: 'gatvā', meaning: 'having gone' },
                { word: 'kṛtvā', meaning: 'having done' },
                { word: 'bhuktvā', meaning: 'having eaten' },
                { word: 'dṛṣṭvā', meaning: 'having seen' },
                { word: 'śrutvā', meaning: 'having heard' }
            ];

            examples.forEach(example => {
                const result = applySutra1_1_40(example.word);
                expect(result.applies).toBe(true);
                expect(result.avyaya_status).toBe(true);
            });
        });

        test('should handle ya variants', () => {
            const yaForms = ['gacchya', 'kurya', 'bhujya'];
            
            yaForms.forEach(form => {
                const result = applySutra1_1_40(form);
                expect(result.applies).toBe(true);
                expect(result.avyaya_status).toBe(true);
            });
        });
    });

    describe('Context Integration', () => {
        test('should work with detailed context', () => {
            const context = {
                affixes: ['ktvā'],
                word_type: 'absolutive',
                root: 'gam',
                meaning: 'having gone'
            };
            
            const result = applySutra1_1_40('gatvā', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });

        test('should prioritize context over pattern matching', () => {
            // Word doesn't look like ktvā but context says it has ktvā affix
            const result = applySutra1_1_40('irregular', { affixes: ['ktvā'] });
            expect(result.applies).toBe(true);
            expect(result.affix_type).toBe('ktvā');
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle empty input', () => {
            const result = applySutra1_1_40('');
            expect(result.applies).toBe(false);
        });

        test('should handle undefined context', () => {
            const result = applySutra1_1_40('gatvā');
            expect(result.applies).toBe(true); // Should still work with pattern matching
        });

        test('should handle null input', () => {
            const result = applySutra1_1_40(null);
            expect(result.applies).toBe(false);
        });

        test('should be case insensitive', () => {
            const result = applySutra1_1_40('GATVĀ');
            expect(result.applies).toBe(true);
        });
    });

    describe('Comprehensive Test Function', () => {
        test('should provide complete analysis', () => {
            const result = testSutra1_1_40('gatvā', { affixes: ['ktvā'] });
            
            expect(result.word).toBe('gatvā');
            expect(result.sutra).toBe('1.1.40');
            expect(result.analysis.applies).toBe(true);
            expect(result.validation.is_avyaya).toBe(true);
            expect(result.examples).toBeDefined();
            expect(result.timestamp).toBeDefined();
        });
    });

    describe('Integration with Other Sutras', () => {
        test('should work alongside other avyaya classifications', () => {
            // Test that this doesn't conflict with other avyaya rules
            const context = {
                affixes: ['ktvā'],
                also_nipata: false,
                also_svaradi: false
            };
            
            const result = applySutra1_1_40('gatvā', context);
            expect(result.applies).toBe(true);
            expect(result.avyaya_status).toBe(true);
        });
    });
});
