import sutra1381 from './index.js';

describe('Sutra 1.3.81 प्राद्वहः (pra + vah → Parasmaipada)', () => {
  it('applies for pra + vah (Devanagari)', () => {
    const res = sutra1381('प्रवहति', { root: 'वह्' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
    expect(res.sutra).toBe('1.3.81');
  });

  it('applies for pra + vah (IAST via prefix context)', () => {
    const res = sutra1381('pravahati', { root: 'vah', prefix: 'pra' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });

  it('still applies when benefitsAgent is true (override)', () => {
    const res = sutra1381('प्रवहति', { root: 'वह्', benefitsAgent: true });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });

  it('does not apply without pra', () => {
    const res = sutra1381('वहति', { root: 'vah' });
    expect(res.applies).toBe(false);
  });

  it('guards invalid input', () => {
    const res = sutra1381(null, {});
    expect(res.applies).toBe(false);
  });
});
