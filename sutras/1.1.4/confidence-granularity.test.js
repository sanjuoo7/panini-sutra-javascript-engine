/** Confidence granularity & monotonicity tests for Sutra 1.1.4 engine */
import { analyzeDhatuLopa, setSutra114Config, setSutra114Mode, getSutra114ConfigSummary, resetSutra114Config } from './index.js';

// Helper to deep clone config summary weights
function cloneWeights() {
  return { ...getSutra114ConfigSummary().weights };
}

describe('Sutra 1.1.4 confidence granularity & monotonicity', () => {
  beforeAll(() => {
    setSutra114Mode('rules'); // ensure pure scoring (no mapping fallbacks)
  });

  test('increasing evidence weight for an active factor should not decrease confidence (lopa case)', () => {
    // Baseline: reduce weights to create sub-saturation environment
    const originalWeights = cloneWeights();
    setSutra114Config({
      evidenceWeights: {
        monosyllabic: 0.05,
        canonicalCVC: 0.05,
        finalStopOrNasal: 0.05,
        shortCentralVowel: 0.05,
        affixDerivative: 0.05,
        difficultCluster: 0.02,
        heterorganicCluster: 0.02
      },
      lopaScoreThreshold: 0.2,
      logistic: { slope: 4, midpoint: 0.2 }
    });
  const a1 = analyzeDhatuLopa('gam','ya'); // monosyllabic CVC with derivative affix
  expect(a1.confidence).not.toBeNaN();
    // Increase monosyllabic weight massively
    setSutra114Config({ evidenceWeights: { monosyllabic: 0.25 } });
  const a2 = analyzeDhatuLopa('gam','ya');
  expect(a2.confidence).not.toBeNaN();
  expect(a2.confidence + 1e-6).toBeGreaterThanOrEqual(a1.confidence - 1e-6); // allow floating rounding
  // restore
  setSutra114Config({ evidenceWeights: originalWeights });
  });

  test('raising threshold above attainable score flips lopa to non-lopa', () => {
    // Ensure baseline lopa
    setSutra114Config({ lopaScoreThreshold: 0.65 });
    const baseline = analyzeDhatuLopa('gam','ya');
    expect(baseline.hasLopa).toBe(true);
    // Raise threshold beyond sum of weights (~1.0) to force failure
    setSutra114Config({ lopaScoreThreshold: 2.0 });
    const elevated = analyzeDhatuLopa('gam','ya');
    expect(elevated.hasLopa).toBe(false);
    // restore
    setSutra114Config({ lopaScoreThreshold: 0.65 });
  });

  test('confidence capped by logistic cap when weights sum very high', () => {
    setSutra114Config({ evidenceWeights: { monosyllabic: 0.5, canonicalCVC: 0.5, finalStopOrNasal: 0.5, shortCentralVowel: 0.5, affixDerivative: 0.5 }, logistic: { cap: 0.95 } });
  const res = analyzeDhatuLopa('gam','ya');
  expect(res.confidence).not.toBeNaN();
  expect(res.confidence).toBeLessThanOrEqual(0.9500001);
    // restore small cap adjustment
    setSutra114Config({ logistic: { cap: 0.97 } });
  });

  test('non-lopa case confidence respects non-lopa floor and does not drop when increasing unrelated weight', () => {
    // Use a combination that should not trigger lopa easily: sad + kta (rules mode, penalty or low score)
    setSutra114Config({ lopaScoreThreshold: 0.7 });
  const r1 = analyzeDhatuLopa('sad','kta');
  expect(r1.confidence).not.toBeNaN();
    // Increase a weight that is inactive (difficultCluster) to see no degradation
    setSutra114Config({ evidenceWeights: { difficultCluster: 0.5 } });
  const r2 = analyzeDhatuLopa('sad','kta');
  expect(r2.confidence).not.toBeNaN();
    // Confidence should stay >= floor non-lopa and not decrease
    const floor = getSutra114ConfigSummary().logistic.floorNonLopa;
    expect(r2.confidence).toBeGreaterThanOrEqual(floor - 1e-6);
    expect(r2.confidence + 1e-6).toBeGreaterThanOrEqual(r1.confidence - 1e-6);
  });
});
