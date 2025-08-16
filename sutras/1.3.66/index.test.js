import { sutra1366 } from './index.js';

describe('Sutra 1.3.66 (bhuj Ātmanepada, except protection)', () => {
  test('applies for bhuj in enjoyment sense', () => {
    const res = sutra1366('भुङ्क्ते', { root: 'भुज्', meaning: 'to enjoy' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
    expect(res.confidence).toBeGreaterThanOrEqual(0.7);
  });

  test('applies for bhuj in consumption context', () => {
    const res = sutra1366('भुजते', { root: 'bhuj', semanticDomain: 'consumption' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('excluded in protection sense', () => {
    const res = sutra1366('भुजति', { root: 'भुज्', meaning: 'to protect', isProtectiveContext: true });
    expect(res.applies).toBe(false);
    expect(res.reason).toContain('protect');
  });

  test('excluded in defense context', () => {
    const res = sutra1366('भुजति', { root: 'bhuj', meaning: 'defense, guarding' });
    expect(res.applies).toBe(false);
    expect(res.reason).toContain('protect');
  });

  test('does not apply for other roots', () => {
    const res = sutra1366('गच्छति', { root: 'गम्' });
    expect(res.applies).toBe(false);
    expect(res.reason).toContain('भुज्');
  });

  test('defaults to enjoyment sense when ambiguous', () => {
    const res = sutra1366('भुङ्क्ते', { root: 'भुज्' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
    expect(res.reason).toContain('भुज्');
    expect(res.confidence).toBeLessThan(0.8); // Lower confidence due to ambiguity
  });

  test('handles IAST input with semantic context', () => {
    const res = sutra1366('bhuṅkte', { root: 'bhuj', meaning: 'experiencing pleasure' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('validates input and provides error handling', () => {
    const res = sutra1366(null, { root: 'bhuj' });
    expect(res.applies).toBe(false);
    expect(res.reason).toContain('Invalid input');
  });
});
