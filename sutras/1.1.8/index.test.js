
import { isAnunasika } from './index.js';

describe('Sutra 1.1.8: isAnunasika', () => {
  // Test cases from the TDD
  it('should correctly classify phonemes from the TDD table', () => {
    // Anunāsika (Nasal Consonants)
    expect(isAnunasika('ṅ')).toBe(true); // Velar Nasal
    expect(isAnunasika('ñ')).toBe(true); // Palatal Nasal
    expect(isAnunasika('ṇ')).toBe(true); // Retroflex Nasal
    expect(isAnunasika('n')).toBe(true); // Dental Nasal
    expect(isAnunasika('m')).toBe(true); // Labial Nasal

    // Not Anunāsika (Anusvāra)
    expect(isAnunasika('ṃ')).toBe(false); // Pure Nasal

    // Not Anunāsika (Non-Nasal Consonants)
    expect(isAnunasika('k')).toBe(false);
    expect(isAnunasika('p')).toBe(false);
    expect(isAnunasika('r')).toBe(false);

    // Not Anunāsika (Vowels)
    expect(isAnunasika('a')).toBe(false);
    expect(isAnunasika('i')).toBe(false);
    expect(isAnunasika('u')).toBe(false);
  });

  it('should handle Devanagari characters', () => {
    // Anunāsika (Nasal Consonants)
    expect(isAnunasika('ङ्')).toBe(true); // Velar Nasal
    expect(isAnunasika('ञ्')).toBe(true); // Palatal Nasal
    expect(isAnunasika('ण्')).toBe(true); // Retroflex Nasal
    expect(isAnunasika('न्')).toBe(true); // Dental Nasal
    expect(isAnunasika('म्')).toBe(true); // Labial Nasal

    // Not Anunāsika (Anusvāra)
    expect(isAnunasika('ं')).toBe(false); // Pure Nasal
  });

  it('should handle nasalized vowels (hypothetical)', () => {
    // This is a hypothetical case, as nasalized vowels are not in the matrix yet.
    // To make this test pass, we would need to add nasalized vowels to the matrix.
    // For example: PHONEME_FEATURE_MATRIX.set('āṃ', { ... isNasalized: true, isAnusvara: false });
    expect(isAnunasika('āṃ')).toBe(false); // Assuming it's not in the matrix yet
  });

  it('should return false for invalid input', () => {
    expect(isAnunasika('x')).toBe(false);
    expect(isAnunasika(null)).toBe(false);
    expect(isAnunasika(undefined)).toBe(false);
  });
});
