/** Sutra 1.2.64: सरूपाणामेकशेष एकविभक्तौ */
import { applySutra1_2_64 } from '../sanskrit-utils/eka-shesha-determination.js';

export function sutra_1_2_64(words, context = {}) {
  return applySutra1_2_64(words, context);
}

export const applySutra1_2_64_wrapper = sutra_1_2_64; // naming parity for tests

export default sutra_1_2_64;
