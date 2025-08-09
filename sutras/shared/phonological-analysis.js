/**
 * Phonological analysis utilities for Sanskrit
 * 
 * This module provides advanced phonological analysis functions including
 * feature extraction, cluster analysis, and phonetic environment evaluation.
 */

import { isConsonant, isVowel } from './classification.js';

/**
 * Extracts the nucleus vowel from a dhātu
 * @param {string} dhatu - Sanskrit dhātu
 * @returns {string} The nucleus vowel or empty string
 */
export function extractNucleusVowel(dhatu) {
  if (typeof dhatu !== 'string') return '';
  const vowelMatch = dhatu.match(/ai|au|[aāiīuūṛṝḷḹeēoō]/);
  return vowelMatch ? vowelMatch[0] : '';
}

/**
 * Extracts consonant patterns from a dhātu
 * @param {string} dhatu - Sanskrit dhātu
 * @returns {string} Consonant pattern string
 */
export function extractConsonantPattern(dhatu) {
  if (typeof dhatu !== 'string' || !dhatu) return '';
  const vowelRegex = /(ai|au|[aāiīuūṛṝḷḹeēoō])/g;
  const aspirated = ['kh','gh','ch','jh','ṭh','ḍh','th','dh','ph','bh'];
  const tokens = [];
  for (let i=0;i<dhatu.length;i++) {
    const digraph = dhatu.slice(i,i+2);
    if (aspirated.includes(digraph)) { tokens.push(digraph); i++; continue; }
    tokens.push(dhatu[i]);
  }
  let groups = [];
  let current = '';
  tokens.forEach(tok => {
    if (vowelRegex.test(tok)) {
      if (current) { groups.push(current); current = ''; }
      vowelRegex.lastIndex = 0;
    } else {
      current += tok;
    }
  });
  if (current) groups.push(current);
  let pattern = groups.join('_');
  if (/ai|au|[aāiīuūṛṝḷḹeēoō]$/.test(dhatu)) pattern += '_';
  pattern = pattern.replace(/__+/g,'_');
  if (pattern === '_') return '';
  return pattern;
}

/**
 * Get comprehensive phonological features for a Sanskrit sound
 * @param {string} sound - Sanskrit phoneme
 * @returns {Object|null} Feature object or null if invalid
 */
export function getPhonologicalFeatures(sound) {
  if (!sound || typeof sound !== 'string') return null;
  
  const featureMap = {
    // Vowels
    'a': { type: 'vowel', length: 'short', place: 'central', height: 'low' },
    'ā': { type: 'vowel', length: 'long', place: 'central', height: 'low' },
    'i': { type: 'vowel', length: 'short', place: 'front', height: 'high' },
    'ī': { type: 'vowel', length: 'long', place: 'front', height: 'high' },
    'u': { type: 'vowel', length: 'short', place: 'back', height: 'high' },
    'ū': { type: 'vowel', length: 'long', place: 'back', height: 'high' },
    'ṛ': { type: 'vowel', length: 'short', place: 'central', height: 'mid', rhotacized: true },
    'ṝ': { type: 'vowel', length: 'long', place: 'central', height: 'mid', rhotacized: true },
    'ḷ': { type: 'vowel', length: 'short', place: 'central', height: 'mid', lateral: true },
    'ḹ': { type: 'vowel', length: 'long', place: 'central', height: 'mid', lateral: true },
    'e': { type: 'vowel', length: 'long', place: 'front', height: 'mid' },
    'o': { type: 'vowel', length: 'long', place: 'back', height: 'mid' },
    
    // Consonants - Stops
    'k': { type: 'consonant', manner: 'stop', place: 'velar', voice: '-', aspiration: '-' },
    'kh': { type: 'consonant', manner: 'stop', place: 'velar', voice: '-', aspiration: '+' },
    'g': { type: 'consonant', manner: 'stop', place: 'velar', voice: '+', aspiration: '-' },
    'gh': { type: 'consonant', manner: 'stop', place: 'velar', voice: '+', aspiration: '+' },
    'ṅ': { type: 'consonant', manner: 'nasal', place: 'velar', voice: '+' },
    
    'c': { type: 'consonant', manner: 'stop', place: 'palatal', voice: '-', aspiration: '-' },
    'ch': { type: 'consonant', manner: 'stop', place: 'palatal', voice: '-', aspiration: '+' },
    'j': { type: 'consonant', manner: 'stop', place: 'palatal', voice: '+', aspiration: '-' },
    'jh': { type: 'consonant', manner: 'stop', place: 'palatal', voice: '+', aspiration: '+' },
    'ñ': { type: 'consonant', manner: 'nasal', place: 'palatal', voice: '+' },
    
    'ṭ': { type: 'consonant', manner: 'stop', place: 'retroflex', voice: '-', aspiration: '-' },
    'ṭh': { type: 'consonant', manner: 'stop', place: 'retroflex', voice: '-', aspiration: '+' },
    'ḍ': { type: 'consonant', manner: 'stop', place: 'retroflex', voice: '+', aspiration: '-' },
    'ḍh': { type: 'consonant', manner: 'stop', place: 'retroflex', voice: '+', aspiration: '+' },
    'ṇ': { type: 'consonant', manner: 'nasal', place: 'retroflex', voice: '+' },
    
    't': { type: 'consonant', manner: 'stop', place: 'dental', voice: '-', aspiration: '-' },
    'th': { type: 'consonant', manner: 'stop', place: 'dental', voice: '-', aspiration: '+' },
    'd': { type: 'consonant', manner: 'stop', place: 'dental', voice: '+', aspiration: '-' },
    'dh': { type: 'consonant', manner: 'stop', place: 'dental', voice: '+', aspiration: '+' },
    'n': { type: 'consonant', manner: 'nasal', place: 'dental', voice: '+' },
    
    'p': { type: 'consonant', manner: 'stop', place: 'labial', voice: '-', aspiration: '-' },
    'ph': { type: 'consonant', manner: 'stop', place: 'labial', voice: '-', aspiration: '+' },
    'b': { type: 'consonant', manner: 'stop', place: 'labial', voice: '+', aspiration: '-' },
    'bh': { type: 'consonant', manner: 'stop', place: 'labial', voice: '+', aspiration: '+' },
    'm': { type: 'consonant', manner: 'nasal', place: 'labial', voice: '+' },
    
    // Semivowels and Liquids
    'y': { type: 'consonant', manner: 'semivowel', place: 'palatal', voice: '+' },
    'r': { type: 'consonant', manner: 'liquid', place: 'dental', voice: '+', trill: true },
    'l': { type: 'consonant', manner: 'liquid', place: 'dental', voice: '+', lateral: true },
    'v': { type: 'consonant', manner: 'semivowel', place: 'labial', voice: '+' },
    
    // Fricatives
    'ś': { type: 'consonant', manner: 'fricative', place: 'palatal', voice: '-' },
    'ṣ': { type: 'consonant', manner: 'fricative', place: 'retroflex', voice: '-' },
    's': { type: 'consonant', manner: 'fricative', place: 'dental', voice: '-' },
    'h': { type: 'consonant', manner: 'fricative', place: 'glottal', voice: '+' }
  };
  
  return featureMap[sound] || null;
}

/**
 * Check if a sound has a specific feature value
 * @param {string} sound - Sound to check
 * @param {string} feature - Feature name
 * @param {*} value - Expected feature value
 * @returns {boolean} True if sound has the feature value
 */
export function hasFeature(sound, feature, value) {
  const features = getPhonologicalFeatures(sound);
  return features && features[feature] === value;
}

/**
 * Check if two sounds share a specific feature
 * @param {string} sound1 - First sound
 * @param {string} sound2 - Second sound  
 * @param {string} feature - Feature to compare
 * @returns {boolean} True if sounds share the feature
 */
export function shareFeature(sound1, sound2, feature) {
  const features1 = getPhonologicalFeatures(sound1);
  const features2 = getPhonologicalFeatures(sound2);
  
  return features1 && features2 && 
         features1[feature] && features2[feature] &&
         features1[feature] === features2[feature];
}

/**
 * Calculate consonant cluster difficulty based on phonological features
 * @param {string} consonant1 - First consonant
 * @param {string} consonant2 - Second consonant
 * @returns {number} Difficulty score (0-1)
 */
export function calculateClusterDifficulty(consonant1, consonant2) {
  if (!consonant1 || !consonant2) return 0;
  
  const f1 = getPhonologicalFeatures(consonant1);
  const f2 = getPhonologicalFeatures(consonant2);
  
  if (!f1 || !f2 || f1.type !== 'consonant' || f2.type !== 'consonant') return 0;
  
  let difficulty = 0;
  
  // Place of articulation mismatch increases difficulty
  if (f1.place !== f2.place) difficulty += 0.3;
  
  // Manner mismatch (especially stop + fricative)
  if (f1.manner !== f2.manner) {
    if ((f1.manner === 'stop' && f2.manner === 'fricative') ||
        (f1.manner === 'fricative' && f2.manner === 'stop')) {
      difficulty += 0.4;
    } else {
      difficulty += 0.2;
    }
  }
  
  // Voice mismatch
  if (f1.voice !== f2.voice) difficulty += 0.2;
  
  // Aspiration mismatch in stops
  if (f1.manner === 'stop' && f2.manner === 'stop' && f1.aspiration !== f2.aspiration) {
    difficulty += 0.1;
  }
  
  return Math.min(difficulty, 1.0);
}

/**
 * Calculate probability of nasal elision before stops
 * @param {string} nasal - Nasal consonant
 * @param {string} stop - Following stop consonant
 * @returns {number} Elision probability (0-1)
 */
export function calculateNasalElisionProbability(nasal, stop) {
  const nasalFeatures = getPhonologicalFeatures(nasal);
  const stopFeatures = getPhonologicalFeatures(stop);
  
  if (!nasalFeatures || !stopFeatures || 
      nasalFeatures.manner !== 'nasal' || stopFeatures.manner !== 'stop') {
    return 0;
  }
  
  // Higher probability for homorganic combinations
  if (nasalFeatures.place === stopFeatures.place) {
    return 0.8;
  }
  
  // Lower probability for heterorganic
  return 0.3;
}

/**
 * Calculate probability of liquid modification
 * @param {string} liquid - Liquid consonant (r, l)
 * @param {string} affix - Following affix
 * @returns {number} Modification probability (0-1)
 */
export function calculateLiquidModificationProbability(liquid, affix) {
  const liquidFeatures = getPhonologicalFeatures(liquid);
  
  if (!liquidFeatures || liquidFeatures.manner !== 'liquid') return 0;
  
  // Specific patterns for different affixes
  if (affix.startsWith('t')) return 0.6; // Dental stops often trigger changes
  if (affix.startsWith('k')) return 0.4; // Some velar interactions
  
  return 0.2; // Default low probability
}

/**
 * Get place of articulation for a consonant
 * @param {string} consonant - Consonant to analyze
 * @returns {string|null} Place of articulation or null
 */
export function getPlaceOfArticulation(consonant) {
  const features = getPhonologicalFeatures(consonant);
  return features && features.type === 'consonant' ? features.place : null;
}

/**
 * Check if a sound is a stop consonant
 * @param {string} sound - Sound to check
 * @returns {boolean} True if stop consonant
 */
export function isStop(sound) {
  return hasFeature(sound, 'manner', 'stop');
}

/**
 * Analyze phonetic environment between dhātu and affix
 * @param {string} dhatu - Root
 * @param {string} affix - Affix
 * @returns {Object} Phonetic environment analysis
 */
export function analyzePhoneticEnvironment(dhatu, affix) {
  if (!dhatu || !affix) return null;
  
  const finalC = dhatu.slice(-1);
  const initialC = affix[0];
  
  const finalFeatures = getPhonologicalFeatures(finalC);
  const initialFeatures = getPhonologicalFeatures(initialC);
  
  return {
    boundary: `${dhatu}+${affix}`,
    finalSound: finalC,
    initialSound: initialC,
    finalFeatures,
    initialFeatures,
    hasConsonantCluster: isConsonant(finalC) && isConsonant(initialC),
    clusterType: isConsonant(finalC) && isConsonant(initialC) ? `${finalC}+${initialC}` : null,
    clusterDifficulty: calculateClusterDifficulty(finalC, initialC),
    allowsLopa: true, // Default - can be overridden by specific rules
    nasalStopInteraction: {
      isPresent: finalFeatures?.manner === 'nasal' && initialFeatures?.manner === 'stop',
      causesElision: calculateNasalElisionProbability(finalC, initialC) > 0.5
    },
    liquidInteraction: {
      isPresent: finalFeatures?.manner === 'liquid',
      causesChange: calculateLiquidModificationProbability(finalC, affix) > 0.5
    }
  };
}
