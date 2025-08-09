import { isAnunasika } from './index.js';

describe('Sutra 1.1.8: isAnunasika', () => {
  it('should return true for nasal consonants in IAST', () => {
    expect(isAnunasika('ṅ')).toBe(true);
    expect(isAnunasika('ñ')).toBe(true);
    expect(isAnunasika('ṇ')).toBe(true);
    expect(isAnunasika('n')).toBe(true);
    expect(isAnunasika('m')).toBe(true);
    expect(isAnunasika('ṃ')).toBe(true);
  });

  it('should return true for nasal consonants in Devanagari', () => {
    expect(isAnunasika('ङ')).toBe(true);
    expect(isAnunasika('ञ')).toBe(true);
    expect(isAnunasika('ण')).toBe(true);
    expect(isAnunasika('न')).toBe(true);
    expect(isAnunasika('म')).toBe(true);
    expect(isAnunasika('ं')).toBe(true);
  });

  it('should return false for non-nasal consonants', () => {
    expect(isAnunasika('k')).toBe(false);
    expect(isAnunasika('p')).toBe(false);
    expect(isAnunasika('r')).toBe(false);
  });

  it('should return false for vowels', () => {
    expect(isAnunasika('a')).toBe(false);
    expect(isAnunasika('i')).toBe(false);
    expect(isAnunasika('u')).toBe(false);
  });

  it('should return false for null or undefined input', () => {
    expect(isAnunasika(null)).toBe(false);
    expect(isAnunasika(undefined)).toBe(false);
  });
});