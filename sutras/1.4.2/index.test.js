import applySutra from './index';

describe('Sutra 1.4.2', () => {
  test('should be a meta-rule and not apply directly', () => {
    const result = applySutra();
    expect(result.applies).toBe(false);
  });

  test('should have a property indicating it is a meta-rule', () => {
    const result = applySutra();
    expect(result.meta).toBe(true);
    expect(result.type).toBe('paribhāṣā');
    expect(result.rule).toBe('vipratiṣedhe_param_kāryam');
  });
});
