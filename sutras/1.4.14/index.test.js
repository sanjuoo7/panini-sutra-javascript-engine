import applySutra from './index';

describe('Sutra 1.4.14', () => {
  test('should be a definitional rule and not apply directly', () => {
    const result = applySutra();
    expect(result.applies).toBe(false);
  });

  test('should have a property indicating it is a definitional rule for "pada"', () => {
    const result = applySutra();
    expect(result.meta).toBe(true);
    expect(result.defines).toBe('pada');
  });

  test('should specify the conditions for being a pada', () => {
    const result = applySutra();
    expect(result.conditions).toEqual(expect.arrayContaining(['ends_in_sup', 'ends_in_tin']));
  });
});
