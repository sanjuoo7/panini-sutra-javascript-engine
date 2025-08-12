import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { ACCENT_TYPES } from '../sanskrit-utils/accent-analysis.js';

/**
 * Integration test to ensure sannatara metadata is included in aggregateProsodyOptions output
 * without altering original text content.
 */

describe('Integration: aggregateProsodyOptions sannatara metadata (1.2.40)', () => {
  it('includes sannatara metadata when pattern present', () => {
    const text = 'àá'; // anudātta (a + grave) followed by udātta (a + acute) contiguous
    const result = aggregateProsodyOptions(text, {} , {});
  expect(result.sannatara).toBeDefined();
  expect(result.sannatara.applies).toBe(true);
  expect(result.sannatara.indices.length).toBeGreaterThan(0);
  });

  it('gracefully reports no sannatara when absent', () => {
    const text = 'a a';
    const result = aggregateProsodyOptions(text, {}, {});
  expect(result.sannatara).toBeDefined();
  expect(result.sannatara.applies).toBe(false);
  expect(result.sannatara.indices.length).toBe(0);
  });

  it('does not mutate original text', () => {
    const text = 'àá';
    const result = aggregateProsodyOptions(text, {}, {});
    expect(result.sannatara.indices.length).toBeGreaterThan(0);
    // aggregator returns options including original accented form; ensure text still contains accents
    expect(text.includes('̀') && text.includes('́')).toBe(true);
  });
});
