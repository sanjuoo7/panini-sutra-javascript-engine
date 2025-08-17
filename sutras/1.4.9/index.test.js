import applySutra from './index';

describe('Sutra 1.4.9', () => {
  test('should optionally apply ghi to standalone "pati" in chandas with genitive', () => {
    const context = {
      inCompound: false,
      domain: 'chandasi',
      relatedToGenitive: true
    };
    const result = applySutra('pati', context);
    expect(result.applies).toBe(true);
    expect(result.optional_sanjna).toBe('ghi');
  });

  test('should not apply in classical sanskrit', () => {
    const context = {
      inCompound: false,
      domain: 'classical',
      relatedToGenitive: true
    };
    const result = applySutra('pati', context);
    expect(result.applies).toBe(false);
  });

  test('should not apply in chandas without genitive', () => {
    const context = {
      inCompound: false,
      domain: 'chandasi',
      relatedToGenitive: false
    };
    const result = applySutra('pati', context);
    expect(result.applies).toBe(false);
  });

  test('should not apply if "pati" is in a compound', () => {
    const context = {
      inCompound: true,
      domain: 'chandasi',
      relatedToGenitive: true
    };
    const result = applySutra('bhūpati', context);
    expect(result.applies).toBe(false);
  });

  test('should not apply to other words', () => {
    const context = {
      inCompound: false,
      domain: 'chandasi',
      relatedToGenitive: true
    };
    const result = applySutra('hari', context);
    expect(result.applies).toBe(false);
  });
});
