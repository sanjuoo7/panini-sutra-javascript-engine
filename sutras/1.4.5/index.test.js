import applySutra from './index';

describe('Sutra 1.4.5', () => {
  test('should optionally apply nadī for iyaṅ/uvaṅ sthāna before "ām"', () => {
    const result = applySutra('śrī', { isIyanUvanSthana: true, nextAffix: 'ām' });
    expect(result.applies).toBe(true);
    expect(result.optional_sanjna).toBe('nadī');
  });

  test('should not apply if next affix is not "ām"', () => {
    const result = applySutra('śrī', { isIyanUvanSthana: true, nextAffix: 'bhyām' });
    expect(result.applies).toBe(false);
  });

  test('should not apply to the word "strī"', () => {
    const result = applySutra('strī', { isIyanUvanSthana: true, nextAffix: 'ām' });
    expect(result.applies).toBe(false);
  });

  test('should not apply to words that are not iyaṅ/uvaṅ sthāna', () => {
    const result = applySutra('kumārī', { isIyanUvanSthana: false, nextAffix: 'ām' });
    expect(result.applies).toBe(false);
  });
});
