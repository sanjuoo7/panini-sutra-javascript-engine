import sutra1386 from './index.js';

// Basic happy-path tests for each listed root in both scripts, causative present

describe('Sutra 1.3.86 – Parasmaipada for specified roots in causative (ṇe/ṇic)', () => {
  const cases = [
    { word: 'बोधयति', ctx: { root: 'बुध', hasCausative: true } },
    { word: 'yodhayati', ctx: { root: 'yudh', hasCausative: true } },
    { word: 'नाशयति', ctx: { root: 'नश', hasCausative: true } },
    { word: 'janayati', ctx: { root: 'jan', hasCausative: true } },
    { word: 'नयति', ctx: { root: 'इ', hasCausative: true } },
    { word: 'प्रावयति', ctx: { root: 'प्रु', hasCausative: true } },
    { word: 'द्रावयति', ctx: { root: 'द्रु', hasCausative: true } },
    { word: 'स्रावयति', ctx: { root: 'स्रु', hasCausative: true } },
  ];

  test.each(cases)('applies to $word with root $ctx.root (causative)', ({ word, ctx }) => {
    const res = sutra1386(word, ctx);
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
    expect(res.isOptional).toBe(false);
    expect(res.sutra).toBe('1.3.86');
  });

  it('does not apply if not causative', () => {
    const res = sutra1386('बुधति', { root: 'बुध', hasCausative: false });
    expect(res.applies).toBe(false);
  });

  it('overrides agent-benefit (still Parasmaipada)', () => {
    const res = sutra1386('bodhayati', { root: 'budh', hasCausative: true, benefitsAgent: true });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });

  it('rejects unrelated roots', () => {
    const res = sutra1386('karayati', { root: 'kṛ', hasCausative: true });
    expect(res.applies).toBe(false);
  });

  it('guards invalid input', () => {
    const res = sutra1386(null, {});
    expect(res.applies).toBe(false);
  });
});
