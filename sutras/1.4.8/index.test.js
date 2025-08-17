import applySutra from './index';

describe('Sutra 1.4.8', () => {
  test('should prohibit ghi for standalone "pati"', () => {
    const result = applySutra('pati', { inCompound: false });
    expect(result.applies).toBe(true);
    expect(result.sanjna_prohibition).toBe('ghi');
  });

  test('should not apply when "pati" is in a compound', () => {
    // In this case, the sutra does nothing, and 'pati' remains 'ghi' by 1.4.7
    const result = applySutra('bhūpati', { base: 'pati', inCompound: true });
    expect(result.applies).toBe(false);
  });

  test('should not apply to other words', () => {
    const result = applySutra('hari', { inCompound: false });
    expect(result.applies).toBe(false);
  });
});
