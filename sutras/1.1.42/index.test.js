import { 
    applySutra1_1_42, 
    getSarvanāmasthānaAffixes, 
    getAffixType,
    triggersSarvanāmasthānaRules,
    validateSarvanāmasthāna,
    testSutra1_1_42 
} from './index.js';

describe('Sutra 1.1.42: शि सर्वनामस्थानम्', () => {
    
    describe('applySutra1_1_42', () => {
        test('should classify śi as sarvanāmasthāna', () => {
            const result = applySutra1_1_42('śi', {});
            expect(result.applies).toBe(true);
            expect(result.sarvanāmasthāna_status).toBe(true);
            expect(result.affix_type).toBe('śi');
        });

        test('should classify other sarvanāmasthāna affixes', () => {
            const affixes = ['su', 'am', 'auṭ', 'jas', 'śas'];
            
            affixes.forEach(affix => {
                const result = applySutra1_1_42(affix, {});
                expect(result.applies).toBe(true);
                expect(result.sarvanāmasthāna_status).toBe(true);
            });
        });

        test('should not classify non-sarvanāmasthāna affixes', () => {
            const result = applySutra1_1_42('ti', {});
            expect(result.applies).toBe(false);
            expect(result.sarvanāmasthāna_status).toBe(false);
        });
    });

    describe('getSarvanāmasthānaAffixes', () => {
        test('should return complete list of affixes', () => {
            const affixes = getSarvanāmasthānaAffixes();
            expect(affixes).toContain('śi');
            expect(affixes).toContain('su');
            expect(affixes).toContain('jas');
            expect(affixes.length).toBeGreaterThan(10);
        });
    });

    describe('getAffixType', () => {
        test('should return correct affix types', () => {
            expect(getAffixType('su')).toBe('nominative_singular');
            expect(getAffixType('jas')).toBe('nominative_plural');
            expect(getAffixType('am')).toBe('accusative_singular');
            expect(getAffixType('śi')).toBe('locative_singular_special');
        });

        test('should return unknown for unrecognized affixes', () => {
            expect(getAffixType('xyz')).toBe('unknown');
        });
    });

    describe('triggersSarvanāmasthānaRules', () => {
        test('should return true for sarvanāmasthāna affixes', () => {
            expect(triggersSarvanāmasthānaRules('śi', {})).toBe(true);
            expect(triggersSarvanāmasthānaRules('su', {})).toBe(true);
        });

        test('should return false for other affixes', () => {
            expect(triggersSarvanāmasthānaRules('ti', {})).toBe(false);
        });
    });

    describe('validateSarvanāmasthāna', () => {
        test('should validate sarvanāmasthāna affix usage', () => {
            const context = {
                base_word: 'rāma',
                case_info: { vibhakti: 'prathama', vacana: 'ekavacana' },
                affix: 'su'
            };
            
            const result = validateSarvanāmasthāna('rāmaḥ', context);
            expect(result.valid).toBe(true);
            expect(result.is_sarvanāmasthāna).toBe(true);
            expect(result.affix_type).toBe('nominative_singular');
        });

        test('should handle missing affix information', () => {
            const context = { base_word: 'rāma' };
            
            const result = validateSarvanāmasthāna('rāmaḥ', context);
            expect(result.valid).toBe(false);
            expect(result.reason).toContain('No affix information');
        });
    });

    describe('Integration tests', () => {
        test('should handle complete affix analysis', () => {
            const testAffix = 'śi';
            const context = { 
                usage: 'locative',
                word: 'agre'
            };

            const result = testSutra1_1_42(testAffix, context);
            
            expect(result.affix).toBe(testAffix);
            expect(result.sutra).toBe('1.1.42');
            expect(result.analysis.applies).toBe(true);
            expect(result.analysis.sarvanāmasthāna_status).toBe(true);
        });
    });
});
