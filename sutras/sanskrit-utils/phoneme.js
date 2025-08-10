
import { PHONEME_FEATURE_MATRIX } from './phoneme-data.js';

/**
 * Represents a Sanskrit phoneme with its phonetic and grammatical properties.
 */
export class Phoneme {
  /**
   * @param {string} char - The phoneme character (IAST or Devanagari).
   */
  constructor(char) {
    const features = PHONEME_FEATURE_MATRIX.get(char) || PHONEME_FEATURE_MATRIX.get(this.getIAST(char));
    if (!features) {
      throw new Error(`Invalid phoneme: ${char}`);
    }

    this.char = char;
    Object.assign(this, features);
  }

  /**
   * Checks if the phoneme is an anunasika (nasal) according to Sutra 1.1.8.
   * @returns {boolean}
   */
  isAnunasika() {
    return this.isNasalized && !this.isAnusvara;
  }

  /**
   * A helper function to get the IAST character for a Devanagari character.
   * This is a simplified implementation and might need to be improved.
   * @param {string} char The Devanagari character.
   * @returns {string | null} The IAST character or null if not found.
   */
  getIAST(char) {
    for (const [iast, features] of PHONEME_FEATURE_MATRIX.entries()) {
      if (features.charDevanagari === char) {
        return iast;
      }
    }
    return null;
  }
}
