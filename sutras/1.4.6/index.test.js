import applySutra from './index';

describe('Sutra 1.4.6', () => {
  test('should optionally apply nadī to short-vowel feminines before ṅit affixes', () => {
    const result = applySutra('mati', { gender: 'feminine', endsIn: 'i', nextAffixIsNit: true });
    expect(result.applies).toBe(true);
    expect(result.optional_sanjna).toBe('nadī');
  });

  test('should optionally apply nadī to iyaṅ/uvaṅ sthāna before ṅit affixes', () => {
    const result = applySutra('śrī', { gender: 'feminine', isIyanUvanSthana: true, nextAffixIsNit: true });
    expect(result.applies).toBe(true);
    expect(result.optional_sanjna).toBe('nadī');
  });

  test('should not apply if affix is not ṅit', () => {
    const result = applySutra('mati', { gender: 'feminine', endsIn: 'i', nextAffixIsNit: false });
    expect(result.applies).toBe(false);
  });

  test('should not apply to "strī"', () => {
    const result = applySutra('strī', { gender: 'feminine', isIyanUvanSthana: true, nextAffixIsNit: true });
    expect(result.applies).toBe(false);
  });

  test('should not apply to already mandatory nadī words', () => {
    const result = applySutra('kumārī', { gender: 'feminine', endsIn: 'ī', isIyanUvanSthana: false, nextAffixIsNit: true });
    expect(result.applies).toBe(false);
  });
});
