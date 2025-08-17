import applySutra from './index';

describe('Sutra 1.4.1', () => {
  test('should be a meta-rule and not apply directly', () => {
    // This sutra is an 'adhikāra' (governing rule) and does not apply directly to words.
    // Its effect is tested in the overall sutra processing engine.
    const result = applySutra('anyWord', {});
    expect(result.applies).toBe(false);
  });

  test('should have a property indicating it is a meta-rule', () => {
    const result = applySutra();
    expect(result.meta).toBe(true);
    expect(result.type).toBe('adhikāra');
    expect(result.scopeEnd).toBe('2.2.38');
  });
});
