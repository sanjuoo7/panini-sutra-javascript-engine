import applySutra from './index';

describe('Sutra 1.4.13', () => {
  test('should be a definitional rule and not apply directly', () => {
    const result = applySutra();
    expect(result.applies).toBe(false);
  });

  test('should have a property indicating it is a definitional rule for "aṅga"', () => {
    const result = applySutra();
    expect(result.meta).toBe(true);
    expect(result.defines).toBe('aṅga');
  });
});
