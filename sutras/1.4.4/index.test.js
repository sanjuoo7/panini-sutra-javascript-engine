import applySutra from './index';

describe('Sutra 1.4.4', () => {
  test('should prohibit nadī for words with iyaṅ substitution', () => {
    const result = applySutra('śrī', { gender: 'feminine', isIyanUvanSthana: true });
    expect(result.applies).toBe(true);
    expect(result.sanjna_prohibition).toBe('nadī');
  });

  test('should prohibit nadī for words with uvaṅ substitution', () => {
    const result = applySutra('bhrū', { gender: 'feminine', isIyanUvanSthana: true });
    expect(result.applies).toBe(true);
    expect(result.sanjna_prohibition).toBe('nadī');
  });

  test('should not apply to the word "strī"', () => {
    const result = applySutra('strī', { gender: 'feminine', isIyanUvanSthana: true });
    expect(result.applies).toBe(false);
  });

  test('should not apply to words that are not iyaṅ/uvaṅ sthāna', () => {
    const result = applySutra('kumārī', { gender: 'feminine', isIyanUvanSthana: false });
    expect(result.applies).toBe(false);
  });
});
