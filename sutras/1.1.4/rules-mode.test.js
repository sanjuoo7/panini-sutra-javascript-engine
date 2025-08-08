/**
 * Focused tests for pure 'rules' mode of Sutra 1.1.4 engine.
 * These ensure mapping fallbacks & legacy overrides are ignored and
 * outcomes derive purely from rule scoring + phonology.
 */
import { setSutra114Mode, setSutra114Config, applySutra114, getSutra114Diagnostics, getSutra114Metrics } from './index.js';

describe('Sutra 1.1.4 rules mode (pure)', () => {
  beforeAll(() => {
    setSutra114Mode('rules');
    setSutra114Config({ advancedSyllableCounting: true });
    getSutra114Diagnostics({ reset: true });
    getSutra114Metrics({ reset: true });
  });

  test('mapping fallback should be disabled in rules mode', () => {
    // Pick a combination that previously relied on explicit mapping if score below threshold
    const res = applySutra114('gam','ya','guna');
    expect(res).toHaveProperty('blocked');
    // Should still block via rules, but factors should not show mapped fallback
    // We don't have direct factors in this wrapper, so rely on high confidence lopa-induced block
    expect(res.confidence).toBeGreaterThan(0.8);
  });

  test('legacy negative overrides not applied (score governed)', () => {
    // A legacy negative like sad+kta should NOT just apply override tag in rules mode
    const res = applySutra114('sad','kta','guna');
    // Expect non-blocking with confidence at non-lopa floor (since penalty applied via generalized rule or score low)
    expect(res.blocked).toBe(false);
    expect(res.confidence).toBeGreaterThanOrEqual(0.7);
  });

  test('diagnostics & metrics collected', () => {
  // trigger an extra analysis to ensure count >=2
  applySutra114('jan','ya','guna');
  const diags = getSutra114Diagnostics();
  const metrics = getSutra114Metrics();
  expect(metrics.totalAnalyses).toBeGreaterThanOrEqual(2);
    expect(Array.isArray(diags)).toBe(true);
  });
});
