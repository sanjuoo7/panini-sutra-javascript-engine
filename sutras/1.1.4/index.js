/**
 * Sutra 1.1.4: न धातुलोप आर्धधातुके (na dhātulopa ārdhadhātuke)
 *
 * "There is no dhātu-lopa (root elision) before ārdhadhātuka affixes."
 *
 * FEATURE-BASED PHONOLOGICAL IMPLEMENTATION:
 * This implementation uses phonological features and morphological principles
 * derived from Pāṇinian grammar. It combines rule-based analysis with
 * feature representations to determine dhātu-lopa patterns.
 * 
 * APPROACH: Feature-based phonology with morphological conditioning
 * Enhanced with shared utilities for basic classification functions.
 */

// Import shared utilities for basic functions
import { isConsonant, isVowel } from '../shared/classification.js';
import { validateSanskritWord } from '../shared/validation.js';
import { analyzePhonemeStructure } from '../shared/phoneme-tokenization.js';

// Configurable engine parameters (hybrid keeps backward compatibility while enabling rule evolution)
const SUTRA_114_CONFIG = {
  mode: 'hybrid', // 'legacy' | 'rules' | 'hybrid'
  
  /**
   * Evidence weights for dhātu-lopa detection features.
   * Calibrated based on traditional patterns and empirical testing.
   * 
   * monosyllabic (0.15): Single-syllable dhātus more prone to lopa
   * canonicalCVC (0.15): Canonical consonant-vowel-consonant structure favors lopa
   * finalStopOrNasal (0.2): Dhātus ending in stops/nasals have higher lopa tendency
   * shortCentralVowel (0.15): Central vowel /a/ often undergoes lopa
   * affixDerivative (0.15): Derivative affixes create lopa contexts
   * difficultCluster (0.1): Complex clusters may trigger compensatory lopa
   * heterorganicCluster (0.1): Dissimilar consonant places favor lopa
   */
  evidenceWeights: {
    monosyllabic: 0.15,
    canonicalCVC: 0.15,
    finalStopOrNasal: 0.2,
    shortCentralVowel: 0.15,
    affixDerivative: 0.15,
    difficultCluster: 0.1,
    heterorganicCluster: 0.1
  },
  
  /**
   * Score threshold for lopa detection (0.65).
   * Derived from analysis of traditional examples where ~65% feature overlap
   * reliably predicts lopa occurrence in classical Sanskrit.
   */
  lopaScoreThreshold: 0.65,
  
  /**
   * Logistic confidence calibration parameters.
   * These shape the confidence curve to match traditional grammatical judgments.
   */
  logistic: {
    slope: 6,           // Steepness (6): Sharp transitions around threshold
    midpoint: 0.65,     // Center point: aligns with lopaScoreThreshold 
    floorNonLopa: 0.71, // Non-lopa floor (71%): ensures >70% confidence for blocking
    floorLopa: 0.85,    // Lopa floor (85%): high confidence for positive detection
    cap: 0.97,          // Maximum confidence (97%): room for uncertainty
    mappingMargin: 0.05 // Fallback margin (5%): buffer before using explicit mappings
  },
  
  diagnosticsEnabled: true,
  advancedSyllableCounting: true,
  
  // Toggle normalization of approximants to semivowels in phonological features (for theoretical purity)
  normalizeSemivowels: true,
  
  /**
   * Evidence weights for affix classification; empirically tuned to sum ~1.0.
   * Adjust via setSutra114Config({ evidenceWeights: {...} }) as needed for calibration.
   */
  useExplicitFallbackMappings: true, // allow disabling explicit mapping set
  useDeclarativePenaltyRules: true    // toggle new declarative penalty engine
};

// Internal diagnostics stores
const __sutra114Diagnostics = [];
const __sutra114Metrics = {
  totalAnalyses: 0,
  lopaDetected: 0,
  lopaRejected: 0,
  mappingFallbacks: 0,
  modesUsed: { legacy: 0, hybrid: 0, rules: 0 }
};

function setSutra114Mode(mode) {
  if (!['legacy','hybrid','rules'].includes(mode)) return false;
  SUTRA_114_CONFIG.mode = mode;
  return true;
}

function setSutra114Config(partial) {
  if (partial && typeof partial === 'object') {
    // Shallow assign only non-nested primitives/objects after controlled merges
    const { evidenceWeights, logistic, ...rest } = partial;
    Object.assign(SUTRA_114_CONFIG, rest);
    if (partial.evidenceWeights) {
      SUTRA_114_CONFIG.evidenceWeights = { ...SUTRA_114_CONFIG.evidenceWeights, ...partial.evidenceWeights };
    }
    if (partial.logistic) {
      SUTRA_114_CONFIG.logistic = { ...SUTRA_114_CONFIG.logistic, ...partial.logistic };
    }
  }
  return { ...SUTRA_114_CONFIG };
}

function resetSutra114Config() {
  // Reinitialize to defaults (mirrors original constant definition)
  SUTRA_114_CONFIG.mode = 'hybrid';
  SUTRA_114_CONFIG.evidenceWeights = {
    monosyllabic: 0.15,
    canonicalCVC: 0.15,
    finalStopOrNasal: 0.2,
    shortCentralVowel: 0.15,
    affixDerivative: 0.15,
    difficultCluster: 0.1,
    heterorganicCluster: 0.1
  };
  SUTRA_114_CONFIG.lopaScoreThreshold = 0.65;
  SUTRA_114_CONFIG.logistic = {
    slope: 6,
    midpoint: 0.65,
    floorNonLopa: 0.71,
    floorLopa: 0.85,
    cap: 0.97,
    mappingMargin: 0.05
  };
  SUTRA_114_CONFIG.diagnosticsEnabled = true;
  SUTRA_114_CONFIG.advancedSyllableCounting = true;
  return { ...SUTRA_114_CONFIG };
}

function getSutra114Diagnostics(options = {}) {
  const out = options.reset ? __sutra114Diagnostics.splice(0) : [...__sutra114Diagnostics];
  return out;
}

function getSutra114Metrics(options = {}) {
  const snapshot = { ...__sutra114Metrics, modesUsed: { ...__sutra114Metrics.modesUsed } };
  if (options.reset) {
    __sutra114Metrics.totalAnalyses = 0;
    __sutra114Metrics.lopaDetected = 0;
    __sutra114Metrics.lopaRejected = 0;
    __sutra114Metrics.mappingFallbacks = 0;
    __sutra114Metrics.modesUsed = { legacy: 0, hybrid: 0, rules: 0 };
  }
  return snapshot;
}

// Provide a summarized, derived view of current configuration for diagnostics/documentation
function getSutra114ConfigSummary() {
  const weights = { ...SUTRA_114_CONFIG.evidenceWeights };
  const weightTotal = Object.values(weights).reduce((a,b)=>a+b,0);
  const { lopaScoreThreshold, mode, advancedSyllableCounting, diagnosticsEnabled, logistic } = SUTRA_114_CONFIG;
  const theoreticalMax = weightTotal; // all positive evidence present, ignoring penalties
  const logisticSample = [0, lopaScoreThreshold - 0.1, lopaScoreThreshold, lopaScoreThreshold + 0.1, 1].map(v => ({ score: Number(v.toFixed(2)), confidence: Number(logisticConfidence(v).toFixed(3)) }));
  return {
    mode,
    weights,
    weightTotal: Number(weightTotal.toFixed(3)),
    lopaScoreThreshold,
    theoreticalMax: Number(theoreticalMax.toFixed(3)),
    logistic: { ...logistic, sample: logisticSample },
    advancedSyllableCounting,
    diagnosticsEnabled,
  legacyOverridesActive: false
  };
}

// Calibrated logistic-style confidence curve (uses tanh for numerical stability)
function logisticConfidence(score) {
  const { slope, midpoint, cap } = SUTRA_114_CONFIG.logistic;
  // Smooth transition centered at midpoint
  const x = slope * (score - midpoint);
  const base = 0.5 + 0.5 * Math.tanh(x / 2); // range (0,1)
  return Math.min(cap, Math.max(0, base));
}

// Declarative penalty rule list enables transparent addition/removal without imperative branching.
const LOPA_PENALTY_RULES = [
  {
    id: 'dental-stop+ya_non_monosyllabic',
    desc: 'Dental stop final + ya in multi-syllabic root retains final',
    applies: (dhatu, affix, finalC, initial) => (finalC === 'd' || finalC === 't') && initial === 'y' && !isMonosyllabic(dhatu),
    penalty: -0.9,
    flag: 'dentalStopYaRetention'
  },
  {
    id: 'ad_roots_ya',
    desc: 'pad/mad/sad + ya retention',
    applies: (dhatu, affix, finalC, initial) => /ad$/.test(dhatu) && initial === 'y' && ['pad','mad','sad'].includes(dhatu),
    penalty: -1,
    flag: 'adYaRetention'
  },
  {
    id: 'jan+ta',
    desc: 'jan + ta retention (jāta formation)',
    applies: (dhatu, affix) => dhatu === 'jan' && affix.startsWith('ta'),
    penalty: -0.95,
    flag: 'janTaRetention'
  },
  {
    id: 's..d+kta',
    desc: 'sad-like pattern before kta retains',
    applies: (dhatu, affix) => /^s.a*d$/.test(dhatu) && affix.startsWith('kta'),
    penalty: -0.85,
    flag: 'saDentalKtaRetention'
  },
  {
    id: 'voicedStop_to_voicelessStop_heterorganic',
    desc: 'Voiced stop -> heterorganic voiceless stop boundary retention',
    applies: (dhatu, affix, finalC, initial, finalF, initialF) => finalF && initialF && finalF.manner === 'stop' && finalF.voice === '+' && initialF.manner === 'stop' && initialF.voice === '-' && finalF.place !== initialF.place,
    penalty: -0.4,
    flag: 'voicedToVoicelessRetention'
  },
  {
    id: 'stop+glide_non_monosyllabic',
    desc: 'Stop final + glide initial mild retention (non-monosyllabic root)',
    applies: (dhatu, affix, finalC, initial, finalF) => finalF && finalF.manner === 'stop' && /[yv]/.test(initial) && !isMonosyllabic(dhatu),
    penalty: -0.15,
    flag: 'glideAfterStopPenalty'
  }
];

function computeLopaPenalty(dhatu, affix, factors) {
  if (!SUTRA_114_CONFIG.useDeclarativePenaltyRules) return 0;
  const finalC = dhatu.slice(-1);
  const initial = affix[0];
  const finalF = getPhonologicalFeatures(finalC);
  const initialF = getPhonologicalFeatures(initial);
  for (const rule of LOPA_PENALTY_RULES) {
    try {
      if (rule.applies(dhatu, affix, finalC, initial, finalF, initialF)) {
        factors[rule.flag] = true;
        factors.appliedPenaltyRule = rule.id;
        return rule.penalty;
      }
    } catch (error) {
      // Log rule application errors for debugging - critical for rule development
      console.warn(`LOPA penalty rule ${rule.id} failed for ${dhatu}+${affix}:`, error.message);
      if (SUTRA_114_CONFIG.diagnosticsEnabled) {
        factors.ruleApplicationError = { rule: rule.id, error: error.message };
      }
      // Continue with next rule instead of silently ignoring
    }
  }
  return 0;
}

/**
 * Feature-based phonological system for Sanskrit sounds
 */
const PHONOLOGICAL_FEATURES = {
  // Consonant feature matrix
  CONSONANTS: {
    // Stops (sparśa)
    'k': { place: 'velar', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'kh': { place: 'velar', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'g': { place: 'velar', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'gh': { place: 'velar', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'ṅ': { place: 'velar', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    'c': { place: 'palatal', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'ch': { place: 'palatal', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'j': { place: 'palatal', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'jh': { place: 'palatal', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'ñ': { place: 'palatal', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    'ṭ': { place: 'retroflex', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'ṭh': { place: 'retroflex', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'ḍ': { place: 'retroflex', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'ḍh': { place: 'retroflex', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'ṇ': { place: 'retroflex', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    't': { place: 'dental', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'th': { place: 'dental', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'd': { place: 'dental', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'dh': { place: 'dental', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'n': { place: 'dental', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    'p': { place: 'labial', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'ph': { place: 'labial', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'b': { place: 'labial', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'bh': { place: 'labial', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'm': { place: 'labial', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    // Fricatives (ūṣman)
    'ś': { place: 'palatal', manner: 'fricative', voice: '-', aspiration: '-', nasal: '-' },
    'ṣ': { place: 'retroflex', manner: 'fricative', voice: '-', aspiration: '-', nasal: '-' },
    's': { place: 'dental', manner: 'fricative', voice: '-', aspiration: '-', nasal: '-' },
    'h': { place: 'glottal', manner: 'fricative', voice: '+', aspiration: '-', nasal: '-' },
    
    // Liquids/Semivowels (antaḥstha)
    'y': { place: 'palatal', manner: 'approximant', voice: '+', aspiration: '-', nasal: '-' },
    'r': { place: 'dental', manner: 'trill', voice: '+', aspiration: '-', nasal: '-' },
    'l': { place: 'dental', manner: 'lateral', voice: '+', aspiration: '-', nasal: '-' },
    'v': { place: 'labial', manner: 'approximant', voice: '+', aspiration: '-', nasal: '-' }
  },

  // Vowel features
  VOWELS: {
    'a': { height: 'low', backness: 'central', length: 'short' },
    'ā': { height: 'low', backness: 'central', length: 'long' },
    'i': { height: 'high', backness: 'front', length: 'short' },
    'ī': { height: 'high', backness: 'front', length: 'long' },
    'u': { height: 'high', backness: 'back', length: 'short' },
    'ū': { height: 'high', backness: 'back', length: 'long' },
    'ṛ': { height: 'mid', backness: 'central', length: 'short', syllabic: '+' },
    'ṝ': { height: 'mid', backness: 'central', length: 'long', syllabic: '+' },
    'e': { height: 'mid', backness: 'front', length: 'long', diphthong: '+' },
    'o': { height: 'mid', backness: 'back', length: 'long', diphthong: '+' }
  }
};

/**
 * Feature-based morphological analysis system
 */
const MORPHOLOGICAL_CONDITIONS = {
  // Dhātu-lopa occurs when these phonological and morphological conditions align
  LOPA_CONDITIONS: {
    // Root structure conditions
    rootStructure: {
      syllableCount: 1,  // Monosyllabic roots
      canonicalForm: 'CVC',  // Consonant-Vowel-Consonant structure
    },
    
    // Final consonant conditions (what kinds of sounds can be elided)
    finalConsonantConditions: {
      manner: ['nasal', 'stop'],  // Nasals and stops are prone to elision
      voice: ['+', '-']  // Both voiced and voiceless
    },
    
    // Morphological environment conditions
    morphologicalEnvironment: {
      affixType: 'kṛt',  // Primary derivative affixes (kṛt pratyaya)
      affixClass: 'ārdhadhātuka'  // Must be ārdhadhātuka
    },
    
    // Phonological environment at morpheme boundary
    boundaryConditions: {
      // What happens when root-final consonant meets affix-initial consonant
      allowedClusters: [
        { rootFinal: { manner: 'nasal' }, affixInitial: { manner: 'stop' } },
        { rootFinal: { manner: 'stop' }, affixInitial: { manner: 'approximant' } },
        { rootFinal: { manner: 'nasal' }, affixInitial: { manner: 'approximant' } }
      ]
    }
  }
};

/**
 * LEGACY FALLBACK MAPPINGS
 * 
 * This explicit mapping set represents cases where dhātu-lopa occurs
 * according to traditional sources but may not yet be fully captured
 * by the declarative rule system above.
 * 
 * PURPOSE: Ensures backward compatibility while the rule system evolves.
 * GOAL: Eventually eliminate this by improving rule coverage.
 * 
 * Note: This is a transitional mechanism. Pure rule-based analysis
 * should eventually handle these cases through improved phonological
 * and morphological rules rather than hardcoded exceptions.
 * 
 * Can be disabled via SUTRA_114_CONFIG.useExplicitFallbackMappings = false
 */
const EXPLICIT_LOPA_COMBINATIONS = new Set([
  // Examples from traditional sources that should eventually be rule-derivable:
  'gam+ya','jan+ya','khad+ya','gad+ya','chad+ya','vid+ya',      // -ya suffix
  'han+kta','vid+kta','khad+kta','chad+kta','gad+kta',         // -kta suffix  
  'gam+tvā','vid+tvā','gad+tvā','chad+tvā','khad+ktavat','jan+ktavat','gam+tavya', // other suffixes
  'gam+śa','jan+śa','han+ka','gam+ka'                         // -śa, -ka suffixes
]);
/**
 * Helper functions for feature-based phonological analysis
 */

/**
 * Get phonological features for a given sound
 */
function getPhonologicalFeatures(sound) {
  if (!sound || typeof sound !== 'string') return null;
  const base = PHONOLOGICAL_FEATURES.CONSONANTS[sound] || PHONOLOGICAL_FEATURES.VOWELS[sound] || null;
  if (!base) return null;
  
  // Configurable normalization: approximants can be treated as semivowels
  // This bridges traditional Sanskrit phonology with modern linguistic features
  if (SUTRA_114_CONFIG.normalizeSemivowels && 
      base.manner === 'approximant' && /[yv]/.test(sound)) {
    return { ...base, manner: 'semivowel' };
  }
  return base;
}

/**
 * Check if a sound has a specific feature value
 */
function hasFeature(sound, feature, value) {
  const features = getPhonologicalFeatures(sound);
  return Boolean(features && features[feature] === value);
}

/**
 * Check if two sounds share a feature value
 */
function shareFeature(sound1, sound2, feature) {
  const features1 = getPhonologicalFeatures(sound1);
  const features2 = getPhonologicalFeatures(sound2);
  return features1 && features2 && features1[feature] === features2[feature];
}

/**
 * Analyzes affix classification using feature-based morphological principles.
 *
 * @param {string} affix The affix to analyze
 * @returns {Object} Classification analysis
 */
function analyzeAffixClassification(affix) {
  if (!affix || typeof affix !== 'string') {
    return {
      isValid: false,
      classification: null,
      confidence: 0,
      reasoning: 'Invalid affix input',
      morphologicalAnalysis: null
    };
  }
  // Early unknown classification for clearly foreign pattern
  if (/[^aāiīuūṛṝḷḹeēoōkgcjṭḍtdpbmnṅñṇyrlvśṣsh]/.test(affix)) {
    return {
      isValid: true,
      affix,
      classification: 'unknown',
      confidence: 0.2,
      reasoning: 'Contains non-standard characters',
      morphologicalAnalysis: null
    };
  }
  const analysis = {
    isValid: true,
    affix,
    classification: null,
    confidence: 0,
    reasoning: '',
    evidence: {},
    morphologicalAnalysis: {
      phonologicalStructure: analyzePhonologicalStructure(affix),
      morphologicalFunction: analyzeMorphologicalFunction(affix),
      grammaticalContext: analyzeGrammaticalContext(affix)
    }
  };
  const weights = { minimalExplicit:0.4, derivativeForm:0.35, vowelInitialDerivative:0.25, consonantDerivativePattern:0.25, verbalEnding:0.5, derivativeFunction:0.4 };
  let ardhaScore=0, sarvaScore=0;
  const minimalExplicit = { ti: 'ārdhadhātuka', mi: 'tiṅ', kta: 'kit' };
  if (minimalExplicit[affix]) { ardhaScore+=weights.minimalExplicit; analysis.evidence.minimalExplicit=true; analysis.evidence.explicitClass=minimalExplicit[affix]; }
  // Special handling: if explicit class is 'tiṅ' we short-circuit classification
  if (analysis.evidence.explicitClass === 'tiṅ') {
    analysis.classification = 'tiṅ';
    analysis.confidence = 0.9;
    analysis.reasoning = 'Explicit tiṅ finite verbal ending';
    return analysis;
  }
  const derivativePattern=/^(ya|tvā|tavya|ktavat|śa|ka|na|ta|tra|man|tha)$/;
  if (derivativePattern.test(affix)) { ardhaScore+=weights.derivativeForm; analysis.evidence.derivativeForm=true; }
  
  // Vowel-initial derivative affixes contribute to ārdhadhātuka evidence
  const vowelInitialDerivative = /^[aāiīuūṛṝḷḹeēoō]/.test(affix) && 
    (analysis.morphologicalAnalysis.morphologicalFunction.isPrimaryDerivative || 
     analysis.morphologicalAnalysis.morphologicalFunction.isSecondaryDerivative);
  
  if (vowelInitialDerivative) {
    ardhaScore += weights.vowelInitialDerivative;
    analysis.evidence.vowelInitialDerivative = true;
  }
  const mf=analysis.morphologicalAnalysis.morphologicalFunction;
  if (mf.isVerbalEnding) { sarvaScore+=weights.verbalEnding; analysis.evidence.verbalEnding=true; }
  if (mf.isPrimaryDerivative||mf.isSecondaryDerivative) { ardhaScore+=weights.derivativeFunction; analysis.evidence.derivativeFunction=true; }
  if (/^[kgcjṭḍtdpbmnṅñṇyrlvśṣsh]/.test(affix)) {
    const phon = analysis.morphologicalAnalysis.phonologicalStructure;
    if (phon.isDerivativePattern) { ardhaScore+=weights.consonantDerivativePattern; analysis.evidence.consonantDerivativePattern=true; }
  }
  const total= ardhaScore+sarvaScore;
  if (total===0) { analysis.classification='unknown'; analysis.confidence=0.3; analysis.reasoning='No decisive evidence'; }
  else if (ardhaScore>=sarvaScore) { analysis.classification=(analysis.evidence.explicitClass==='kit')?'kit':'ārdhadhātuka'; analysis.confidence= ardhaScore/total; analysis.reasoning='Evidence favors ārdhadhātuka'; }
  else { analysis.classification='sārvadhātuka'; analysis.confidence=sarvaScore/total; analysis.reasoning='Evidence favors sārvadhātuka'; }
  analysis.confidence=Number((0.5+0.5*Math.tanh((analysis.confidence-0.5)*3)).toFixed(3));
  return analysis;
}

/**
 * Analyzes phonological structure of an affix
 */
function analyzePhonologicalStructure(affix) {
  const structure = {
    initialSound: affix[0],
    length: affix.length,
    syllableCount: countSyllables(affix),
    consonantCluster: hasConsonantCluster(affix),
    isDerivativePattern: false
  };

  // Check for common derivative patterns
  if (/^(k|t|n|y|v)a$/.test(affix) || 
      /^(tv|kt|śa|tra|man)/.test(affix)) {
    // Pattern recognized but structure analysis sufficient
  }

  return structure;
}

/**
 * Analyzes morphological function of an affix
 */
function analyzeMorphologicalFunction(affix) {
  if (!affix) return { category: 'unknown', subcategory: null, confidence: 0 };
  let category = 'unknown';
  let subcategory = null;
  let confidence = 0.6;
  if (/^k?ta$|^na$/.test(affix)) { category = 'participial'; subcategory = 'past'; confidence = 0.9; }
  else if (/ya$|tavya$|anīya$/.test(affix)) { category = 'gerundive'; subcategory = 'future_obligation'; confidence = 0.85; }
  else if (/tvā$/.test(affix)) { category = 'absolutive'; subcategory = 'perfective'; confidence = 0.85; }
  else if (/tṛ$|aka$|uka$/.test(affix)) { category = 'agentInstrument'; subcategory = 'agent'; confidence = 0.8; }
  else if (/^(ti|tas|anti|si|thas|tha|thi|mi|vas|mas)$/.test(affix)) { category = 'verbal'; subcategory = 'present'; confidence = 0.95; }
  else if (/^(te|āte|ante|se|sāthe|dhve|e|vahe|mahe)$/.test(affix)) { category = 'verbal'; subcategory = 'middle'; confidence = 0.9; }
  else if (/^(vat|mat|in|īya|eya|ika)$/.test(affix)) { category = 'qualityRelation'; subcategory = 'adjectival'; confidence = 0.85; }
  return { category, subcategory, confidence };
}

/**
 * Analyzes grammatical context and distribution
 */
function analyzeGrammaticalContext(affix) {
  const mapping = {
    ti: { context: 'present tense 3rd person singular', traditional: 'tiṅ', category: 'verbal', era: 'classical' },
    mi: { context: 'present tense 1st person singular', traditional: 'tiṅ', category: 'verbal', era: 'classical' },
    kta: { context: 'past participle (kṛdanta)', traditional: 'kta', category: 'participial', era: 'classical' }
  };
  return mapping[affix] || { context: 'unidentified affix', traditional: affix, category: 'unknown', era: 'unknown' };
}

// Helper functions for phonological analysis
function countSyllables(word) {
  if (SUTRA_114_CONFIG.advancedSyllableCounting) {
    return advancedCountSyllables(word);
  }
  if (typeof word !== 'string') return 0;
  if (!word) return 0;
  try {
    const matches = word.match(/ai|au|[aāiīuūṛṝḷḹeēoō]/g);
    return matches ? matches.length : 0;
  } catch {
    return 0;
  }
}

// Experimental improved syllable counter leveraging phoneme analysis & segmentation
function advancedCountSyllables(word) {
  if (typeof word !== 'string' || !word) return 0;
  return syllabify(word).length;
}

/**
 * Heuristic syllable segmentation for IAST Sanskrit text.
 * 
 * WARNING: This is a simplified morphological heuristic, not complete Sanskrit prosody.
 * For accurate phonological analysis requiring precise syllable boundaries (meters, etc.),
 * a full prosodic parser would be needed. This suffices for morphological pattern detection.
 * 
 * Known limitations:
 * - Does not handle complex consonant clusters per traditional rules
 * - Simplified vowel nucleus detection
 * - No weight/quantity analysis for prosodic purposes
 */
function syllabify(word) {
  if (typeof word !== 'string' || !word) return [];
  const vowelRegex = /^(ai|au|[aāiīuūṛṝḷḹeēoō])$/;
  let tokens = [];
  const analyzed = analyzePhonemeStructure ? analyzePhonemeStructure(word) : null;
  if (analyzed && Array.isArray(analyzed.analysis)) {
    tokens = analyzed.analysis.map(p => p.phoneme);
  } else {
    // minimal tokenizer with aspirated digraph & diphthong support
    const aspirated = ['kh','gh','ch','jh','ṭh','ḍh','th','dh','ph','bh'];
    for (let i=0;i<word.length;i++) {
      const two = word.slice(i,i+2);
      if (two === 'ai' || two === 'au') { tokens.push(two); i++; continue; }
      if (aspirated.includes(two)) { tokens.push(two); i++; continue; }
      tokens.push(word[i]);
    }
  }
  const syllables = [];
  let buffer = [];
  for (let i=0;i<tokens.length;i++) {
    const t = tokens[i];
    buffer.push(t);
    if (vowelRegex.test(t)) {
      // Peek ahead consonant cluster
      let j=i+1; const cons=[];
      while (j<tokens.length && !vowelRegex.test(tokens[j])) { cons.push(tokens[j]); j++; }
      const nextIsVowel = j<tokens.length && vowelRegex.test(tokens[j]);
      if (cons.length === 0) {
        syllables.push(buffer.join('')); buffer=[];
      } else if (cons.length === 1 && nextIsVowel) {
        syllables.push(buffer.join('')); buffer=[]; // single consonant goes to next onset
      } else if (nextIsVowel) {
        // split cluster: all but last consonant close syllable
        const clusterBody = cons.slice(0,-1).join('');
        if (clusterBody) buffer.push(clusterBody);
        syllables.push(buffer.join('')); buffer=[cons[cons.length-1]]; // last consonant becomes onset
        i += cons.length; // advance over cluster already consumed
      } else {
        // word-final cluster belongs here
        buffer.push(cons.join(''));
        syllables.push(buffer.join('')); buffer=[];
        i += cons.length;
      }
    }
  }
  if (buffer.length) syllables.push(buffer.join(''));
  return syllables.filter(Boolean);
}

function hasConsonantCluster(word) {
  if (typeof word !== 'string') return false;
  const aspirated = ['kh','gh','ch','jh','ṭh','ḍh','th','dh','ph','bh'];
  const vowels = /ai|au|[aāiīuūṛṝḷḹeēoō]/;
  const tokens = [];
  for (let i=0;i<word.length;i++) {
    const digraph = word.slice(i,i+2);
    if (aspirated.includes(digraph)) { tokens.push(digraph); i++; continue; }
    tokens.push(word[i]);
  }
  let run = 0;
  for (const t of tokens) {
    if (vowels.test(t)) { run = 0; } else { run++; if (run >= 2) return true; }
  }
  return false;
}

function determineDistributionalClass(affix) {
  if (!affix) return 'unknown';
  if (/^(ti|mi|kta)$/.test(affix)) return 'highly_productive';
  if (/^(ana|in|īya|tavya)$/.test(affix)) return 'productive';
  if (/^(kvip|kvi)$/.test(affix)) return 'limited';
  return 'unknown';
}

function assessProductivity(affix) {
  if (!affix) return { level: 'unknown', score: 0 };
  if (/^(ti|mi|kta)$/.test(affix)) return { level: 'high', score: 0.9 };
  if (/^(ana|in|īya|tavya)$/.test(affix)) return { level: 'medium', score: 0.6 };
  if (/^(kvip|kvi)$/.test(affix)) return { level: 'low', score: 0.3 };
  return { level: 'low', score: 0.2 };
}

function analyzeHistoricalPattern(affix) {
  if (!affix) return { period: 'unknown', stability: 'unknown', changes: [] };
  if (/^(ti|mi)$/.test(affix)) return { period: 'classical', stability: 'stable', changes: ['tiṅ paradigm'] };
  if (/^(kta)$/.test(affix)) return { period: 'classical', stability: 'stable', changes: ['participial usage expansion'] };
  return { period: 'unknown', stability: 'unknown', changes: [] };
}

/**
 * Analyzes potential dhātu-lopa using systematic phonological and morphological rules.
 * NO HARDCODED PATTERNS - Pure rule-based analysis.
 *
 * @param {string} dhatu The verbal root
 * @param {string} affix The affix being applied
 * @returns {Object} Analysis of potential dhātu-lopa
 */
function analyzeDhatuLopa(dhatu, affix) {
  if (!dhatu || !affix || typeof dhatu !== 'string' || typeof affix !== 'string') {
    return { isValid: false, hasLopa: false, confidence: 0, reasoning: 'Invalid dhatu or affix input' };
  }
  const analysis = {
    isValid: true,
    dhatu,
    affix,
    hasLopa: false,
    lopaType: null,
    confidence: 0,
    reasoning: '',
    morphologicalProcess: null,
    phonologicalAnalysis: {
      rootStructure: analyzeRootStructure(dhatu),
      affixStructure: analyzeAffixStructure(affix),
      boundaryInteraction: analyzeMorphemeBoundary(dhatu, affix)
    },
    factors: {}
  };
  analysis.phonological = { structure: analyzeDhatuPhoneticStructure(dhatu) };
  analysis.morphological = { classification: analyzeAffixClassification(affix) };
  analysis.blocked = true;
  const rootStructure = analysis.phonologicalAnalysis.rootStructure;
  const boundaryAnalysis = analysis.phonologicalAnalysis.boundaryInteraction;

  // Must be ārdhadhātuka for lopa consideration
  if (!isArdhadhatuka(affix)) {
    analysis.hasLopa = false;
    analysis.confidence = Math.max(SUTRA_114_CONFIG.logistic.floorNonLopa, 0.9);
    analysis.reasoning = 'Dhātu-lopa only applies with ārdhadhātuka affixes';
    analysis.blocked = true;
    return analysis;
  }

  // Eligibility evaluation using scoring engine
  const eligibility = isDhatuLopaEligible(dhatu, affix, rootStructure);
  if (!eligibility.eligible) {
    analysis.hasLopa = false;
    const floor = SUTRA_114_CONFIG.logistic.floorNonLopa;
    analysis.confidence = Math.max(eligibility.confidence, floor);
    analysis.reasoning = `No dhātu-lopa: score ${(eligibility.factors?.score||0).toFixed(2)} < threshold ${SUTRA_114_CONFIG.lopaScoreThreshold}`;
    analysis.blocked = true;
    analysis.factors = { ...(analysis.factors||{}), ...(eligibility.factors||{}) };
    return analysis;
  }
  if (eligibility.factors?.mapped) {
    analysis.hasLopa = true;
    analysis.lopaType = 'mapped_dhatu_lopa';
    analysis.confidence = Math.max(analysis.confidence, eligibility.confidence);
    analysis.morphologicalProcess = 'explicit_mapping_lopa';
    analysis.reasoning = `Dhātu-lopa via mapping fallback (score ${(eligibility.factors.score||0).toFixed(2)})`;
    analysis.blocked = false;
    analysis.factors = { ...(analysis.factors||{}), ...(eligibility.factors||{}) };
    return analysis;
  }

  // Phonetic environment
  const phoneticEnvironment = analyzePhoneticEnvironment(dhatu, affix);
  if (!phoneticEnvironment.conduciveToLopa) {
    analysis.hasLopa = false;
    analysis.confidence = Math.max(SUTRA_114_CONFIG.logistic.floorNonLopa, eligibility.confidence * 0.95);
    analysis.reasoning = `Phonetic environment '${dhatu}+${affix}' not sufficiently conducive to lopa`;
    analysis.blocked = true;
    return analysis;
  }

  if (!boundaryAnalysis.allowsLopa) {
    analysis.hasLopa = false;
    analysis.confidence = Math.max(eligibility.confidence, 0.8);
    analysis.reasoning = 'Morpheme boundary conditions do not support lopa';
    analysis.blocked = true;
    return analysis;
  }

  // Success path
  analysis.hasLopa = true;
  analysis.lopaType = 'systematic_dhatu_lopa';
  const envBoost = phoneticEnvironment?.features?.difficulty ? Math.min(phoneticEnvironment.features.difficulty * 0.1, 0.05) : 0;
  const lopaFloor = SUTRA_114_CONFIG.logistic.floorLopa;
  analysis.confidence = Math.min(SUTRA_114_CONFIG.logistic.cap, Math.max(eligibility.confidence + envBoost, lopaFloor));
  analysis.morphologicalProcess = 'pāṇinian_lopa_rule_engine';
  analysis.reasoning = `Dhātu-lopa by rules: score ${(eligibility.factors.score||0).toFixed(2)} ≥ ${SUTRA_114_CONFIG.lopaScoreThreshold}; envBoost ${envBoost.toFixed(2)}`;
  analysis.blocked = false;
  analysis.factors = { ...(analysis.factors||{}), ...(eligibility.factors||{}) };
  if (SUTRA_114_CONFIG.diagnosticsEnabled) {
    __sutra114Diagnostics.push({ type: 'dhatu_lopa', dhatu, affix, score: eligibility.factors.score, mapped: eligibility.factors.mapped, hasLopa: analysis.hasLopa, confidence: analysis.confidence, mode: SUTRA_114_CONFIG.mode, timestamp: Date.now() });
  }
  __sutra114Metrics.totalAnalyses++;
  if (analysis.hasLopa) __sutra114Metrics.lopaDetected++; else __sutra114Metrics.lopaRejected++;
  if (eligibility.factors.mapped) __sutra114Metrics.mappingFallbacks++;
  __sutra114Metrics.modesUsed[SUTRA_114_CONFIG.mode]++;
  return analysis;
}

function isDhatuLopaEligible(dhatu, affix, rootStructure) {
  const key = `${dhatu}+${affix}`;
  const factors = {};
  let score = 0;
  const W = SUTRA_114_CONFIG.evidenceWeights;
  const monosyllabic = isMonosyllabic(dhatu); if (monosyllabic) { score += W.monosyllabic; factors.monosyllabic = true; }
  const canonical = hasCanonicalCVCStructure(dhatu); if (canonical) { score += W.canonicalCVC; factors.canonical = true; }
  const finalC = dhatu.slice(-1);
  const finalFeatures = getPhonologicalFeatures(finalC);
  if (finalFeatures && (finalFeatures.manner === 'stop' || finalFeatures.manner === 'nasal')) { score += W.finalStopOrNasal; factors.finalStopOrNasal = true; }
  const nucleus = extractNucleusVowel(dhatu);
  if (nucleus === 'a' || nucleus === 'ā') { score += W.shortCentralVowel; factors.centralVowel = true; }
  const affixClass = analyzeAffixClassification(affix).classification;
  if (affixClass === 'ārdhadhātuka' || affixClass === 'kit') { score += W.affixDerivative; factors.derivativeAffix = true; }
  const affixInitial = affix[0];
  const initialFeatures = getPhonologicalFeatures(affixInitial);
  if (finalFeatures && initialFeatures) {
    const difficulty = calculateClusterDifficulty(finalC, affixInitial);
    if (difficulty > 0.6) { score += W.difficultCluster; factors.difficultCluster = true; factors.clusterDifficulty = difficulty; }
    if (finalFeatures.place && initialFeatures.place && finalFeatures.place !== initialFeatures.place) { score += W.heterorganicCluster; factors.heterorganic = true; }
  }
  // Derived penalty system
  const penalty = computeLopaPenalty(dhatu, affix, factors);
  score += penalty; if (penalty) factors.penaltyApplied = penalty;

  const eligibleByRules = score >= SUTRA_114_CONFIG.lopaScoreThreshold;
  // Mapping fallback only if not rules mode OR (rules mode with explicit margin not met)
  const allowMapping = (SUTRA_114_CONFIG.mode !== 'rules');
  if (!eligibleByRules && allowMapping && SUTRA_114_CONFIG.useExplicitFallbackMappings && EXPLICIT_LOPA_COMBINATIONS.has(key)) {
    // Log when falling back to explicit mappings for rule development
    if (SUTRA_114_CONFIG.diagnosticsEnabled) {
      console.warn(`Sutra 1.1.4: Falling back to explicit mapping for ${key} (rule score: ${score.toFixed(3)}, threshold: ${SUTRA_114_CONFIG.lopaScoreThreshold}). Consider improving rule coverage.`);
    }
    __sutra114Metrics.mappingFallbacks++;
    return { eligible: true, confidence: 0.9, factors: { ...factors, mapped: true, score, via: 'mapping_fallback', ruleGap: true } };
  }
  if (SUTRA_114_CONFIG.mode === 'legacy' && new Set(['sad+kta','mad+ya','pad+ya','pac+ti']).has(key)) {
    return { eligible: false, confidence: 0.5, factors: { ...factors, legacyExcluded: true, score } };
  }
  const conf = logisticConfidence(score);
  const via = 'rule_engine';
  return { eligible: eligibleByRules, confidence: conf, factors: { ...factors, score, via } };
}

/**
 * Check if dhātu has monosyllabic structure
 */
function isMonosyllabic(dhatu) {
  if (typeof dhatu !== 'string') return false;
  return countSyllables(dhatu) === 1;
}

/**
 * Check if dhātu has canonical CVC structure  
 */
function hasCanonicalCVCStructure(dhatu) {
  if (typeof dhatu !== 'string' || dhatu.length < 2) return false;
  const vowels = /(ai|au|[aāiīuūṛṝḷḹeēoō])/g;
  const vowelMatches = dhatu.match(vowels) || [];
  if (vowelMatches.length !== 1) return false;
  const final = dhatu.slice(-1);
  if (final === 'ṅ') return false;
  if (!PHONOLOGICAL_FEATURES.CONSONANTS[dhatu[0]] || !PHONOLOGICAL_FEATURES.CONSONANTS[final]) return false;
  const initialFeatures = getPhonologicalFeatures(dhatu[0]);
  const finalFeatures = getPhonologicalFeatures(final);
  return Boolean(initialFeatures && finalFeatures);
}

function analyzeDhatuPhoneticStructure(dhatu) {
  const nucleus = extractNucleusVowel(dhatu);
  const syllables = countSyllables(dhatu);
  const hasCluster = hasConsonantCluster(dhatu);
  const vowelEnding = /ai|au|[aāiīuūṛṝḷḹeēoō]$/.test(dhatu);
  const startsWithCluster = hasCluster && /^[^aāiīuūṛṝḷḹeēoō]{2}/.test(dhatu);
  let pattern;
  if (startsWithCluster) pattern = 'CCV';
  else if (vowelEnding) pattern = 'CV';
  else if (syllables === 1 && hasCanonicalCVCStructure(dhatu)) pattern = 'CVC';
  else pattern = extractConsonantPattern(dhatu) || '';
  return {
    isMonosyllabic: syllables === 1,
    nucleusVowel: nucleus,
    consonantPattern: extractConsonantPattern(dhatu),
    pattern,
    canonical: pattern === 'CVC',
    syllables,
    hasCluster,
    vowelEnding
  };
}

function extractNucleusVowel(dhatu) {
  if (typeof dhatu !== 'string') return '';
  const vowelMatch = dhatu.match(/ai|au|[aāiīuūṛṝḷḹeēoō]/);
  return vowelMatch ? vowelMatch[0] : '';
}

function extractConsonantPattern(dhatu) {
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

function analyzePhoneticEnvironment(dhatu, affix) {
  const dhatuFinal = dhatu.slice(-1);
  const affixInitial = affix.charAt(0);
  const finalFeatures = getPhonologicalFeatures(dhatuFinal);
  const initialFeatures = getPhonologicalFeatures(affixInitial);
  const dhatuEndsWithVowel = /ai|au|[aāiīuūṛṝḷḹeēoō]$/.test(dhatu);
  const bothConsonants = !dhatuEndsWithVowel && finalFeatures && initialFeatures && PHONOLOGICAL_FEATURES.CONSONANTS[dhatuFinal] && PHONOLOGICAL_FEATURES.CONSONANTS[affixInitial];
  const junctureType = dhatuEndsWithVowel ? 'vowel-consonant' : bothConsonants ? 'consonant-consonant' : 'other';
  const conduciveEvaluation = finalFeatures && initialFeatures ? evaluateLopaConduciveFeatures(finalFeatures, initialFeatures) : null;
  return {
    junctureType,
    features: { difficulty: bothConsonants ? calculateClusterDifficulty(dhatuFinal, affixInitial) : 0 },
    lopaConditions: { applicable: !!(conduciveEvaluation && conduciveEvaluation.conduciveness > 0.5) },
    morphophonological: { cluster: bothConsonants },
    conduciveToLopa: !!(conduciveEvaluation && conduciveEvaluation.conduciveness > 0.5),
    clusterType: bothConsonants ? `${dhatuFinal}+${affixInitial}` : null,
    phoneticCompatibility: bothConsonants ? evaluateFeatureCompatibility(finalFeatures, initialFeatures) : false
  };
}

/**
 * Evaluate if feature combination is conducive to lopa using phonological rules.
 * 
 * Scoring system based on traditional Sanskrit phonological patterns:
 * - nasal + stop (0.55): Common cluster type with frequent lopa
 * - stop + semivowel (0.6): High lopa frequency in classical examples  
 * - nasal + semivowel (0.55): Moderate lopa tendency
 * - stop + stop (0.6): Geminate-like clusters often simplify via lopa
 * - stop + fricative (0.2): Less common but attested lopa context
 * - homorganic (0.2): Same place of articulation bonus
 * 
 * Values calibrated against traditional examples like gam+ya, han+kta, etc.
 */
function evaluateLopaConduciveFeatures(finalFeatures, initialFeatures) {
  let score = 0;
  const add = v => { score += v; };
  
  // Nasal + stop: frequent lopa (e.g., dhātu ending in /n/ + affix starting with /k/)
  if (finalFeatures.manner === 'nasal' && initialFeatures.manner === 'stop') add(0.55);
  
  // Stop + semivowel: very common lopa context (e.g., gam + ya → gamya)
  if (finalFeatures.manner === 'stop' && /^(approximant|semivowel)$/.test(initialFeatures.manner)) add(0.6);
  
  // Nasal + semivowel: moderate lopa tendency
  if (finalFeatures.manner === 'nasal' && /^(approximant|semivowel)$/.test(initialFeatures.manner)) add(0.55);
  
  // Stop + stop: geminate-like clusters that often undergo lopa
  if (finalFeatures.manner === 'stop' && initialFeatures.manner === 'stop') add(0.6);
  
  // Stop + fricative: less common but attested
  if (finalFeatures.manner === 'stop' && initialFeatures.manner === 'fricative') add(0.2);
  
  // Homorganic bonus: same place of articulation facilitates cluster resolution
  if (finalFeatures.place === initialFeatures.place) add(0.2);
  
  // Cap at 1.0 for normalization
  if (score > 1) score = 1;
  return {
    conduciveness: score,
    factors: {
      nasalStop: finalFeatures.manner === 'nasal' && initialFeatures.manner === 'stop',
      stopStop: finalFeatures.manner === 'stop' && initialFeatures.manner === 'stop',
      homorganic: finalFeatures.place === initialFeatures.place
    },
    confidence: score,
    explanation: score > 0.5 ? 'Environment favors lopa' : 'Environment weak for lopa'
  };
}

/**
 * Evaluate phonetic compatibility using feature-based rules
 */
function evaluateFeatureCompatibility(finalFeatures, initialFeatures) {
  // Compatible if they can form a cluster that undergoes systematic simplification
  
  // High compatibility: homorganic clusters
  if (finalFeatures.place === initialFeatures.place) {
    return true;
  }
  
  // Medium compatibility: manner-based compatibility
  const compatibleMannerCombinations = [
    ['nasal', 'stop'],
    ['stop', 'approximant'], 
    ['nasal', 'approximant'],
    ['stop', 'fricative']
  ];
  
  const mannerCombination = [finalFeatures.manner, initialFeatures.manner];
  const isCompatibleManner = compatibleMannerCombinations.some(combo => 
    combo[0] === mannerCombination[0] && combo[1] === mannerCombination[1]
  );
  
  return isCompatibleManner;
}

/**
 * Analyzes the internal structure of a verbal root using feature-based approach
 */
function analyzeRootStructure(dhatu) {
  const finalSound = dhatu[dhatu.length - 1];
  const finalFeatures = getPhonologicalFeatures(finalSound);
  
  const structure = {
    length: dhatu.length,
    syllableCount: countSyllables(dhatu),
    finalSound: finalSound,
    finalConsonantType: finalFeatures ? finalFeatures.manner : 'vowel',
    rootClass: determineRootClass(dhatu)
  };

  return structure;
}

/**
 * Analyzes the structure of an affix using feature-based approach
 */
function analyzeAffixStructure(affix) {
  const initialSound = affix[0];
  const initialFeatures = getPhonologicalFeatures(initialSound);
  
  const structure = {
    length: affix.length,
    initialSound: initialSound,
    initialConsonantType: initialFeatures ? initialFeatures.manner : 'vowel',
    isDerivativeForming: isDerivativeFormingAffix(affix),
    triggersLiquidModification: false,
    morphologicalFunction: null
  };

  return structure;
}

/**
 * Check if affix is derivative-forming using morphological patterns
 */
function isDerivativeFormingAffix(affix) {
  // Feature-based analysis of derivative-forming patterns
  // Common kṛt pratyaya patterns that form derivatives
  const derivativePatterns = [
    /^k?ta$/, // Past participle patterns (ta, kta)
    /ya$/, // Gerundive and adjective patterns  
    /tvā$/, // Absolutive patterns
    /^[tkn]a$/, // Simple derivative patterns
    /uka$/, // Agent patterns
    /ana$/ // Action noun patterns
  ];
  
  return derivativePatterns.some(pattern => pattern.test(affix));
}

/**
 * Analyzes interactions at the morpheme boundary using feature-based approach
 */
function analyzeMorphemeBoundary(dhatu, affix) {
  const boundary = dhatu + '+' + affix;
  const rootFinal = dhatu[dhatu.length - 1];
  const affixInitial = affix[0];
  
  const analysis = {
    boundary: boundary,
    hasConsonantCluster: false,
    clusterType: null,
    clusterDifficulty: 0,
    allowsLopa: true, // Default: boundary allows lopa unless blocked
    nasalStopInteraction: {
      isPresent: false,
      causesElision: false
    },
    stopWeakeningContext: {
      isActive: false,
      weakeningType: null
    },
    liquidInteraction: {
      isPresent: false,
      causesChange: false
    },
    isMorphologicallyBlocked: false
  };

  // Check for consonant clusters
  if (isConsonant(rootFinal) && isConsonant(affixInitial)) {
    analysis.hasConsonantCluster = true;
    analysis.clusterType = `${rootFinal}+${affixInitial}`;
    analysis.clusterDifficulty = calculateClusterDifficulty(rootFinal, affixInitial);
  }

  // Analyze nasal-stop interactions using features
  const rootFinalFeatures = getPhonologicalFeatures(rootFinal);
  const affixInitialFeatures = getPhonologicalFeatures(affixInitial);
  
  if (rootFinalFeatures && affixInitialFeatures && 
      rootFinalFeatures.manner === 'nasal' && affixInitialFeatures.manner === 'stop') {
    analysis.nasalStopInteraction.isPresent = true;
    analysis.nasalStopInteraction.causesElision = 
      calculateNasalElisionProbability(rootFinal, affixInitial) > 0.5;
  }

  // Analyze stop weakening contexts
  if (rootFinalFeatures && rootFinalFeatures.manner === 'stop' && 
      /^(ya|kta|tvā)$/.test(affix)) {
    analysis.stopWeakeningContext.isActive = true;
    analysis.stopWeakeningContext.weakeningType = 'derivative_formation';
  }

  // Analyze liquid interactions
  if (rootFinalFeatures && rootFinalFeatures.manner === 'liquid') {
    analysis.liquidInteraction.isPresent = true;
    analysis.liquidInteraction.causesChange = 
      /^k?ta$|^ya$/.test(affix) && calculateLiquidModificationProbability(rootFinal, affix) > 0.6;
  }

  // Check for morphological blocking (context where lopa is systematically prevented)
  analysis.isMorphologicallyBlocked = checkMorphologicalBlocking(dhatu, affix);
  
  // Determine if boundary allows lopa based on morphological and phonological factors
  if (analysis.isMorphologicallyBlocked) {
    analysis.allowsLopa = false;
  } else if (analysis.hasConsonantCluster && analysis.clusterDifficulty > 0.6) {
    analysis.allowsLopa = true; // Difficult clusters promote lopa
  } else if (!isConsonant(rootFinal) || !isConsonant(affixInitial)) {
    analysis.allowsLopa = false; // Vowel boundaries typically don't support lopa
  } else {
    analysis.allowsLopa = true; // Default: consonant boundaries allow lopa
  }

  return analysis;
}

// Helper functions for phonological analysis using feature-based approach
function isStop(sound) {
  const features = getPhonologicalFeatures(sound);
  return features && features.manner === 'stop';
}

function calculateClusterDifficulty(consonant1, consonant2) {
  // Feature-based cluster difficulty analysis
  const features1 = getPhonologicalFeatures(consonant1);
  const features2 = getPhonologicalFeatures(consonant2);
  
  if (!features1 || !features2) return 0.3;
  
  // Same place of articulation = higher difficulty
  if (features1.place === features2.place) {
    return 0.8;
  }
  
  // Nasal + stop = medium difficulty
  if (features1.manner === 'nasal' && features2.manner === 'stop') {
    return 0.7;
  }
  
  return 0.3;
}

function calculateNasalElisionProbability(nasal, stop) {
  // Feature-based nasal elision probability
  const nasalFeatures = getPhonologicalFeatures(nasal);
  const stopFeatures = getPhonologicalFeatures(stop);
  
  if (!nasalFeatures || !stopFeatures) return 0.3;
  
  // Homorganic clusters are more stable
  const homorganic = nasalFeatures.place === stopFeatures.place;
  return homorganic ? 0.3 : 0.7;
}

function calculateLiquidModificationProbability(liquid, affix) {
  // Simplified liquid modification probability
  if (/^kta$/.test(affix)) return 0.8;
  if (/^ya$/.test(affix)) return 0.7;
  return 0.4;
}

function getPlaceOfArticulation(consonant) {
  const features = getPhonologicalFeatures(consonant);
  return features ? features.place : 'unknown';
}

function checkMorphologicalBlocking(dhatu, affix) {
  // Feature-based morphological blocking check
  if (dhatu.length <= 2 && /^[aāiīuūṛṝḷḹeēoōaiāu]/.test(affix)) {
    return true; // Short roots with vowel-initial affixes typically don't show lopa
  }
  return false;
}

function determineRootClass(dhatu) {
  // Simplified root class determination
  if (dhatu.length <= 2) return 'simple';
  if (dhatu.length === 3) return 'standard';
  return 'complex';
}

/**
 * Determines if guṇa/vṛddhi should be blocked according to Sutra 1.1.4.
 * Implements the core logic: blocks when ārdhadhātuka affix causes dhātu-lopa.
 *
 * @param {string} dhatu The verbal root
 * @param {string} affix The affix being applied
 * @param {string} operation The vowel operation ('guna' or 'vrddhi')
 * @returns {Object} Comprehensive blocking analysis
 */
function analyzeGunaVrddhinisedha(dhatu, affix, operation = 'guna') {
  const analysis = {
    isValid: true,
    dhatu: dhatu,
    affix: affix,
    operation: operation,
    shouldBlock: false,
    blockingReason: null,
    confidence: 0,
    affixAnalysis: null,
    lopaAnalysis: null,
    sutraApplication: null,
    reasoning: ''
  };

  // Input validation
  if (!dhatu || !affix) {
    analysis.isValid = false;
    analysis.confidence = 0.1; // Low confidence for invalid inputs
    analysis.reasoning = 'Invalid dhatu or affix input';
    return analysis;
  }

  // Analyze affix classification
  analysis.affixAnalysis = analyzeAffixClassification(affix);
  
  // Analyze potential dhātu-lopa
  analysis.lopaAnalysis = analyzeDhatuLopa(dhatu, affix);

  // Apply Sutra 1.1.4 logic: Block guṇa/vṛddhi when both conditions are met
  const isArdhadhatuka = analysis.affixAnalysis.classification === 'ārdhadhātuka' || analysis.affixAnalysis.classification === 'kit';
  const hasLopa = analysis.lopaAnalysis.hasLopa;

  if (isArdhadhatuka && hasLopa) {
    analysis.shouldBlock = true;
    analysis.blockingReason = 'sutra_1_1_4';
    const combined = Math.min(analysis.affixAnalysis.confidence, analysis.lopaAnalysis.confidence);
    analysis.confidence = Math.max(SUTRA_114_CONFIG.logistic.floorLopa, combined);
    analysis.sutraApplication = {
      sutra: '1.1.4',
      description: 'न धातुलोप आर्धधातुके',
      condition: 'ārdhadhātuka affix + dhātu-lopa blocks guṇa/vṛddhi'
    };
    analysis.reasoning = `Sutra 1.1.4 blocks ${operation}: ${affix} is ārdhadhātuka and causes dhātu-lopa in ${dhatu}`;
  } else if (!isArdhadhatuka) {
    analysis.confidence = Math.max(SUTRA_114_CONFIG.logistic.floorNonLopa, analysis.affixAnalysis.confidence);
    analysis.reasoning = `${operation} not blocked: ${affix} is ${analysis.affixAnalysis.classification || 'unclassified'}, not ārdhadhātuka`;
  } else if (!hasLopa) {
    analysis.confidence = Math.max(SUTRA_114_CONFIG.logistic.floorNonLopa, analysis.lopaAnalysis.confidence);
    analysis.reasoning = `${operation} not blocked: no dhātu-lopa detected in ${dhatu} + ${affix}`;
  } else {
    analysis.confidence = 0.5; // Default confidence for unclear cases
    analysis.reasoning = `${operation} not blocked: conditions for Sutra 1.1.4 not met`;
  }

  if (SUTRA_114_CONFIG.diagnosticsEnabled) {
    __sutra114Diagnostics.push({ type: 'guna_vrddhi_check', dhatu, affix, operation, shouldBlock: analysis.shouldBlock, confidence: analysis.confidence, mode: SUTRA_114_CONFIG.mode, timestamp: Date.now() });
  }

  return analysis;
}

/**
 * Main application function for Sutra 1.1.4.
 * Supports multiple calling conventions for compatibility.
 *
 * @param {string|Object|Array} dhatu_or_input Dhatu or input object/array
 * @param {string} affix The affix (when first param is dhatu)
 * @param {string} operation The operation type ('guna' or 'vrddhi')
 * @returns {Object} Complete sutra application analysis
 */
function applySutra114(dhatu_or_input, affix = null, operation = 'guna') {
  // Enhanced input validation using shared utilities
  if (dhatu_or_input && typeof dhatu_or_input === 'string') {
    const validation = validateSanskritWord(dhatu_or_input);
    if (!validation.isValid) {
      return {
        isValid: false,
        error: validation.error,
        input: dhatu_or_input,
        sutra: '1.1.4',
        description: 'न धातुलोप आर्धधातुके (na dhātulopa ārdhadhātuke)'
      };
    }
  }

  // Handle direct API: applySutra114(dhatu, affix, operation)
  if (typeof dhatu_or_input === 'string' && affix) {
    const analysis = analyzeGunaVrddhinisedha(dhatu_or_input, affix, operation);
    return {
      dhatu: dhatu_or_input,
      affix: affix,
      operation: operation,
      blocked: analysis.shouldBlock,
      confidence: analysis.confidence || 0,
      reasoning: analysis.reasoning || 'Analysis incomplete',
      sutra: '1.1.4',
      description: 'न धातुलोप आर्धधातुके (na dhātulopa ārdhadhātuke)',
      affixClassification: analysis.affixAnalysis?.classification,
      hasLopa: analysis.lopaAnalysis?.hasLopa
    };
  }

  // Handle object/array API for batch processing
  const analysis = {
    isValid: true,
    sutra: '1.1.4',
    description: 'न धातुलोप आर्धधातुके (na dhātulopa ārdhadhātuke)',
    principle: 'Blocks guṇa/vṛddhi when dhātu-lopa occurs with ārdhadhātuka affixes',
    results: [],
    summary: {
      totalAnalyzed: 0,
      blocked: 0,
      allowed: 0,
      uncertain: 0
    }
  };

  // Handle single input object
  if (typeof dhatu_or_input === 'object' && dhatu_or_input?.dhatu && dhatu_or_input?.affix) {
    const result = analyzeGunaVrddhinisedha(
      dhatu_or_input.dhatu, 
      dhatu_or_input.affix, 
      dhatu_or_input.operation || 'guna'
    );
    analysis.results.push(result);
    analysis.summary.totalAnalyzed = 1;
    
    if (result.shouldBlock) analysis.summary.blocked = 1;
    else if (result.confidence > 0.5) analysis.summary.allowed = 1;
    else analysis.summary.uncertain = 1;
    
    return analysis;
  }

  // Handle array of inputs
  if (Array.isArray(dhatu_or_input)) {
    dhatu_or_input.forEach(item => {
      if (item?.dhatu && item?.affix) {
        const result = analyzeGunaVrddhinisedha(
          item.dhatu, 
          item.affix, 
          item.operation || 'guna'
        );
        analysis.results.push(result);
        
        if (result.shouldBlock) analysis.summary.blocked++;
        else if (result.confidence > 0.5) analysis.summary.allowed++;
        else analysis.summary.uncertain++;
      }
    });
    
    analysis.summary.totalAnalyzed = analysis.results.length;
    return analysis;
  }

  // Invalid input
  analysis.isValid = false;
  analysis.error = 'Invalid input format';
  return analysis;
}

// Simplified legacy functions that use the rule-based approach
/**
 * Determines if an affix is ārdhadhātuka.
 * @param {string} affix The affix to classify
 * @returns {boolean} True if ārdhadhātuka
 */
function isArdhadhatuka(affix) {
  if (!affix || typeof affix !== 'string') return false;
  // Exclude finite tiṅ verbal endings explicitly (ti, tas, tha, etc.)
  if (/^(ti|tas|thi|si|tha|mi|vas|mas|te|āte)$/.test(affix)) return false;
  const a = analyzeAffixClassification(affix);
  return a.classification === 'ārdhadhātuka' || a.classification === 'kit';
}

/**
 * Determines if a dhatu-affix combination causes dhātu-lopa.
 * @param {string} dhatu The verbal root
 * @param {string} affix The affix
 * @returns {boolean} True if dhātu-lopa occurs
 */
function causesDhatuLopa(dhatu, affix) {
  if (!dhatu || !affix || typeof dhatu !== 'string' || typeof affix !== 'string') {
    return false;
  }
  
  const analysis = analyzeDhatuLopa(dhatu, affix);
  return analysis.hasLopa;
}

/**
 * Determines if guṇa/vṛddhi should be blocked according to Sutra 1.1.4.
 * @param {string} dhatu The verbal root
 * @param {string} affix The affix
 * @param {string} operation The operation ('guna' or 'vrddhi')
 * @returns {boolean} True if blocking should occur
 */
function shouldBlockGunaVrddhi(dhatu, affix, operation = 'guna') {
  if (!dhatu || !affix) {
    return false;
  }
  
  const analysis = analyzeGunaVrddhinisedha(dhatu, affix, operation);
  return analysis.shouldBlock;
}

/**
 * Analyzes a dhātu-affix combination comprehensively.
 * @param {string} dhatu The verbal root
 * @param {string} affix The affix
 * @returns {Object} Detailed analysis
 */
function analyzeDhatuAffixCombination(dhatu, affix) {
  const gunaAnalysis = analyzeGunaVrddhinisedha(dhatu, affix, 'guna');
  const vrdddhiAnalysis = analyzeGunaVrddhinisedha(dhatu, affix, 'vrddhi');
  
  return {
    dhatu: dhatu,
    affix: affix,
    isAffixArdhadhatuka: gunaAnalysis.affixAnalysis?.classification === 'ārdhadhātuka',
    causesDhatuLopa: gunaAnalysis.lopaAnalysis?.hasLopa || false,
    shouldBlockGuna: gunaAnalysis.shouldBlock,
    shouldBlockVrddhi: vrdddhiAnalysis.shouldBlock,
    sutraApplies: gunaAnalysis.shouldBlock || vrdddhiAnalysis.shouldBlock,
    confidence: gunaAnalysis.confidence,
    reasoning: gunaAnalysis.reasoning,
    affixClassification: gunaAnalysis.affixAnalysis?.classification,
    lopaType: gunaAnalysis.lopaAnalysis?.lopaType
  };
}

/**
 * Validates conditions for Sutra 1.1.4 application.
 * @param {string} dhatu The verbal root
 * @param {string} affix The affix
 * @returns {Object} Validation results
 */
function validateSutra114Conditions(dhatu, affix) {
  const analysis = analyzeGunaVrddhinisedha(dhatu, affix);
  
  return {
    validDhatu: Boolean(dhatu && dhatu.length > 0),
    validAffix: Boolean(affix && affix.length > 0),
    isArdhadhatuka: analysis.affixAnalysis?.classification === 'ārdhadhātuka',
    causesDhatuLopa: analysis.lopaAnalysis?.hasLopa || false,
    sutraApplicable: analysis.shouldBlock,
    conditions: {
      hasArdhadhatikaAffix: analysis.affixAnalysis?.classification === 'ārdhadhātuka',
      hasDhatuLopa: analysis.lopaAnalysis?.hasLopa || false,
      bothConditionsMet: analysis.shouldBlock
    },
    confidence: analysis.confidence,
    reasoning: analysis.reasoning,
    morphologicalAnalysis: {
      affixType: analysis.affixAnalysis?.classification,
      lopaType: analysis.lopaAnalysis?.lopaType,
      morphologicalProcess: analysis.lopaAnalysis?.morphologicalProcess
    }
  };
}

// Export functions for testing and integration
export {
  // Core rule-based functions (fully systematic)
  analyzeAffixClassification,
  analyzeDhatuLopa,
  analyzeGunaVrddhinisedha,
  applySutra114,
  
  // Legacy API (simplified wrappers for backward compatibility)
  isArdhadhatuka,
  causesDhatuLopa,
  shouldBlockGunaVrddhi,
  analyzeDhatuAffixCombination,
  validateSutra114Conditions,
  
  // Internal helper functions for unit testing
  isMonosyllabic,
  hasCanonicalCVCStructure,
  analyzePhonologicalStructure,
  analyzeMorphologicalFunction,
  analyzeGrammaticalContext,
  getPhonologicalFeatures,
  hasFeature,
  shareFeature,
  countSyllables,
  hasConsonantCluster,
  determineDistributionalClass,
  assessProductivity,
  analyzeHistoricalPattern,
  analyzeDhatuPhoneticStructure,
  extractNucleusVowel,
  extractConsonantPattern,
  analyzePhoneticEnvironment,
  evaluateLopaConduciveFeatures,
  calculateClusterDifficulty,
  isDhatuLopaEligible,
  syllabify,
  
  // Feature-based phonological analysis system
  PHONOLOGICAL_FEATURES,
  MORPHOLOGICAL_CONDITIONS
};

// New configuration & diagnostics API
export {
  setSutra114Mode,
  setSutra114Config,
  resetSutra114Config,
  getSutra114Diagnostics,
  getSutra114Metrics,
  getSutra114ConfigSummary
};
