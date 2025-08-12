import { resolveEkaShesha } from '../../sutras/sanskrit-utils/eka-shesha-determination.js';

describe('resolveEkaShesha orchestrator', () => {
  test('selects mandatory pronoun over gender rule', () => {
    const words = [
      { surface: 'tat', lemma: 'tat', gender: 'n' },
      { surface: 'bhrātā', lemma: 'bhrātṛ', gender: 'm' }
    ];
    const res = resolveEkaShesha(words, {});
    expect(res.applied).toBe(true);
    expect(res.sutra).toBe('1.2.72');
    expect(res.mandatory).toBe(true);
    expect(res.retainedIndices.length).toBeGreaterThan(0);
  });

  test('prefers kinship over base identical', () => {
    const words = [
      { surface: 'bhrātā', lemma: 'bhrātṛ', gender: 'm' },
      { surface: 'svasā', lemma: 'svasṛ', gender: 'f' }
    ];
    const res = resolveEkaShesha(words, {});
    expect(res.sutra).toBe('1.2.68');
    expect(res.retainedIndices.length).toBe(1);
  });

  test('falls back to base identical when no special rule', () => {
    const words = [
      { surface: 'go', lemma: 'go', gender: 'm' },
      { surface: 'go', lemma: 'go', gender: 'm' }
    ];
    const res = resolveEkaShesha(words, {});
    expect(res.sutra).toBe('1.2.64');
  });

  test('collection context triggers 1.2.73 precedence over neuter optional', () => {
    const words = [
      { surface: 'go', lemma: 'go', gender: 'm' },
      { surface: 'gouḥī', lemma: 'gouḥī', gender: 'f' }
    ];
    const res = resolveEkaShesha(words, { domain: 'domestic-animals', collection:true, young:false });
    expect(res.sutra).toBe('1.2.73');
  });
});
