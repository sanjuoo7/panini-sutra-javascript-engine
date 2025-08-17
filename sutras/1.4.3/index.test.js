import applySutra from './index';

describe('Sutra 1.4.3', () => {
  test('should apply to feminine words ending in long ī', () => {
    const result = applySutra('kumārī', { gender: 'feminine' });
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('nadī');
  });

  test('should apply to feminine words ending in long ū', () => {
    const result = applySutra('vadhū', { gender: 'feminine' });
    expect(result.applies).toBe(true);
    expect(result.sanjna).toBe('nadī');
  });

  test('should not apply to masculine words', () => {
    const result = applySutra('agni', { gender: 'masculine' });
    expect(result.applies).toBe(false);
  });

  test('should not apply to words ending in short vowels', () => {
    const result = applySutra('dhenu', { gender: 'feminine' });
    expect(result.applies).toBe(false);
  });

  test('should not apply to words not ending in ī or ū', () => {
    const result = applySutra('mātṛ', { gender: 'feminine' });
    expect(result.applies).toBe(false);
  });
});
