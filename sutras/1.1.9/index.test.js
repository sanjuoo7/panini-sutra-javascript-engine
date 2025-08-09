
import { isSavarna } from './index.js';

describe('Sutra 1.1.9: isSavarna', () => {
  it('should return true for savarna vowels', () => {
    expect(isSavarna('a', 'ā')).toBe(true);
    expect(isSavarna('i', 'ī')).toBe(true);
    expect(isSavarna('u', 'ū')).toBe(true);
  });

  it('should return false for non-savarna vowels', () => {
    expect(isSavarna('a', 'i')).toBe(false);
    expect(isSavarna('i', 'u')).toBe(false);
    expect(isSavarna('u', 'a')).toBe(false);
  });

  it('should return true for savarna consonants', () => {
    expect(isSavarna('k', 'g')).toBe(true);
    expect(isSavarna('c', 'j')).toBe(true);
    expect(isSavarna('ṭ', 'ḍ')).toBe(true);
    expect(isSavarna('t', 'd')).toBe(true);
    expect(isSavarna('p', 'b')).toBe(true);
  });

  it('should return false for non-savarna consonants', () => {
    expect(isSavarna('k', 'c')).toBe(false);
    expect(isSavarna('c', 'ṭ')).toBe(false);
    expect(isSavarna('ṭ', 't')).toBe(false);
    expect(isSavarna('t', 'p')).toBe(false);
    expect(isSavarna('p', 'k')).toBe(false);
  });

  it('should return false for a vowel and a consonant', () => {
    expect(isSavarna('a', 'k')).toBe(false);
    expect(isSavarna('i', 'c')).toBe(false);
  });

  it('should handle Devanagari characters', () => {
    expect(isSavarna('अ', 'आ')).toBe(true);
    expect(isSavarna('इ', 'ई')).toBe(true);
    expect(isSavarna('क्', 'ग्')).toBe(true);
    expect(isSavarna('अ', 'क्')).toBe(false);
  });

  it('should return false for invalid input', () => {
    expect(isSavarna('x', 'a')).toBe(false);
    expect(isSavarna('a', 'x')).toBe(false);
    expect(isSavarna(null, 'a')).toBe(false);
    expect(isSavarna('a', undefined)).toBe(false);
  });
});
