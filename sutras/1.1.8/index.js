
import { SanskritConsonants } from '../shared/constants.js';

const nasalConsonantsIAST = [
  ...SanskritConsonants.stops.velars.iast.slice(4),
  ...SanskritConsonants.stops.palatals.iast.slice(4),
  ...SanskritConsonants.stops.retroflexes.iast.slice(4),
  ...SanskritConsonants.stops.dentals.iast.slice(4),
  ...SanskritConsonants.stops.labials.iast.slice(4),
  ...SanskritConsonants.special.iast.filter(c => c === 'ṃ')
];

const nasalConsonantsDevanagari = [
  ...SanskritConsonants.stops.velars.devanagari.slice(4),
  ...SanskritConsonants.stops.palatals.devanagari.slice(4),
  ...SanskritConsonants.stops.retroflexes.devanagari.slice(4),
  ...SanskritConsonants.stops.dentals.devanagari.slice(4),
  ...SanskritConsonants.stops.labials.devanagari.slice(4),
  ...SanskritConsonants.special.devanagari.filter(c => c === 'ं')
];

/**
 * Checks if a phoneme is an anunasika (nasal).
 * @param {string} phoneme The phoneme to check.
 * @returns {boolean} True if the phoneme is nasal, false otherwise.
 */
export function isAnunasika(phoneme) {
  if (!phoneme) {
    return false;
  }
  return nasalConsonantsIAST.includes(phoneme) || nasalConsonantsDevanagari.includes(phoneme);
}
