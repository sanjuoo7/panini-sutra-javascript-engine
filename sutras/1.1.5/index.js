/**
 * Sutra 1.1.5: क्क्ङिति च (kakaṅiti ca)
 * 
 * And that, which otherwise would have caused guṇa or vṛddhi, does not do so, 
 * when it has an indicatory क्, ग्, ङ्.
 * 
 * This sutra establishes that affixes with indicatory letters (it-markers) 
 * क्, ग्, or ङ् do not cause guṇa or vṛddhi transformations.
 * 
 * IMPLEMENTATION NOTES:
 * 
 * Current Status: Enhanced with shared utilities
 * - Robust script detection using shared utilities
 * - Complete bilingual support (IAST/Devanagari) 
 * - Systematic it-marker detection
 * - Optimized performance with pre-computed sets
 * 
 * Architecture: Lookup-based classification with shared utilities
 * Enhanced with shared script detection for consistent handling across sutras.
 */

// Import shared utilities
import { detectScript, isDevanagari } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { ItMarkedAffixes } from '../sanskrit-utils/constants.js';
import { normalizeScript } from '../sanskrit-utils/transliteration.js';

// Use shared affix sets for optimal performance (convert arrays to Sets)
const KIT_MARKED_AFFIXES = new Set(ItMarkedAffixes.KIT_MARKED);
const GIT_MARKED_AFFIXES = new Set(ItMarkedAffixes.GIT_MARKED);
const NGIT_MARKED_AFFIXES = new Set(ItMarkedAffixes.NGIT_MARKED);

/**
 * Checks if an affix has indicatory letters क्, ग्, or ङ्
 * Optimized version using pre-computed sets for better performance
 * @param {string} affix - The affix to check (IAST or Devanagari)
 * @returns {boolean} - True if affix has k, g, or ṅ it-markers
 */
export function hasKitGitNgitMarkers(affix) {
    if (!affix || typeof affix !== 'string') {
        return false;
    }
    
    // Normalize the script for consistent lookup using shared utility
    const normalized = normalizeScript(affix);
    
    // Check against shared affix sets (O(1) lookup)
    return KIT_MARKED_AFFIXES.has(normalized) || 
           GIT_MARKED_AFFIXES.has(normalized) || 
           NGIT_MARKED_AFFIXES.has(normalized);
}

/**
 * Checks if an affix has क् (k) it-marker
 * Optimized version using shared affix sets
 * @param {string} affix - The affix to check (IAST or Devanagari)
 * @returns {boolean} - True if affix has k it-marker
 */
export function hasKitMarker(affix) {
    if (!affix || typeof affix !== 'string') {
        return false;
    }
    
    const normalized = normalizeScript(affix);
    return KIT_MARKED_AFFIXES.has(normalized);
}

/**
 * Checks if an affix has ग् (g) it-marker
 * Optimized version using shared affix sets
 * @param {string} affix - The affix to check (IAST or Devanagari)
 * @returns {boolean} - True if affix has g it-marker
 */
export function hasGitMarker(affix) {
    if (!affix || typeof affix !== 'string') {
        return false;
    }
    
    const normalized = normalizeScript(affix);
    return GIT_MARKED_AFFIXES.has(normalized);
}

/**
 * Checks if an affix has ङ् (ṅ) it-marker
 * Optimized version using shared affix sets
 * @param {string} affix - The affix to check (IAST or Devanagari)
 * @returns {boolean} - True if affix has ṅ it-marker
 */
export function hasNgitMarker(affix) {
    if (!affix || typeof affix !== 'string') {
        return false;
    }
    
    const normalized = normalizeScript(affix);
    return NGIT_MARKED_AFFIXES.has(normalized);
}

/**
 * Determines if guṇa/vṛddhi should be blocked due to k/g/ṅ it-markers
 * @param {string} dhatu - The verbal root
 * @param {string} affix - The affix being added
 * @param {string} operation - The transformation type ('guna' or 'vrddhi')
 * @returns {boolean} - True if transformation should be blocked
 */
export function shouldBlockDueToItMarkers(dhatu, affix, operation) {
    // Enhanced validation using shared utilities
    if (dhatu && typeof dhatu === 'string') {
        const validation = validateSanskritWord(dhatu);
        if (!validation.isValid) {
            return false; // Don't block if dhatu is invalid
        }
    }
    
    if (!dhatu || !affix || !operation) {
        return false;
    }
    
    if (operation !== 'guna' && operation !== 'vrddhi') {
        return false;
    }
    
    // Block if affix has k, g, or ṅ it-markers
    return hasKitGitNgitMarkers(affix);
}

/**
 * Analyzes an affix for it-markers and their blocking effects
 * @param {string} affix - The affix to analyze
 * @returns {Object} - Analysis object with marker information
 */
export function analyzeItMarkers(affix) {
    if (!affix) {
        return {
            hasItMarkers: false,
            kitMarker: false,
            gitMarker: false,
            ngitMarker: false,
            blocksGunaVrddhi: false,
            markerTypes: [],
            reason: 'Invalid affix'
        };
    }
    
    const kitMarker = hasKitMarker(affix);
    const gitMarker = hasGitMarker(affix);
    const ngitMarker = hasNgitMarker(affix);
    const hasItMarkers = kitMarker || gitMarker || ngitMarker;
    
    const markerTypes = [];
    if (kitMarker) markerTypes.push('क् (k)');
    if (gitMarker) markerTypes.push('ग् (g)');
    if (ngitMarker) markerTypes.push('ङ् (ṅ)');
    
    return {
        hasItMarkers,
        kitMarker,
        gitMarker,
        ngitMarker,
        blocksGunaVrddhi: hasItMarkers,
        markerTypes,
        reason: hasItMarkers 
            ? `Blocks guṇa/vṛddhi due to ${markerTypes.join(', ')} it-marker(s)`
            : 'No blocking it-markers found'
    };
}

/**
 * Applies sutra 1.1.5 to determine if transformation should be blocked
 * @param {string} dhatu - The verbal root
 * @param {string} affix - The affix being added
 * @param {string} operation - The transformation type
 * @returns {Object} - Application result with blocking decision
 */
export function applySutra115(dhatu, affix, operation) {
    if (!dhatu || !affix || !operation) {
        return {
            blocks: false,
            reason: 'Invalid input parameters',
            analysis: {
                dhatu: dhatu || 'undefined',
                affix: affix || 'undefined',
                operation: operation || 'undefined',
                itMarkerAnalysis: null
            }
        };
    }
    
    const itAnalysis = analyzeItMarkers(affix);
    const blocks = shouldBlockDueToItMarkers(dhatu, affix, operation);
    
    return {
        blocks,
        reason: blocks 
            ? `Sutra 1.1.5 blocks ${operation} transformation due to ${itAnalysis.markerTypes.join(', ')} it-marker(s) in affix '${affix}'`
            : `Sutra 1.1.5 does not block ${operation} transformation - no relevant it-markers in affix '${affix}'`,
        analysis: {
            dhatu,
            affix,
            operation,
            itMarkerAnalysis: itAnalysis
        }
    };
}

/**
 * Gets examples of affixes with different it-markers
 * @returns {Object} - Examples categorized by marker type
 */
export function getItMarkerExamples() {
    return {
        kitMarkers: {
            description: 'Affixes with क् (k) it-marker',
            examples: [
                { affix: 'kta', meaning: 'past participle', example: 'कृत -> कृत' },
                { affix: 'ktva', meaning: 'absolutive', example: 'कृत्वा -> कृत्वा' },
                { affix: 'kvip', meaning: 'agent noun', example: 'कृत्' },
                { affix: 'kvan', meaning: 'possessive', example: 'कृतवान्' }
            ]
        },
        gitMarkers: {
            description: 'Affixes with ग् (g) it-marker',
            examples: [
                { affix: 'gha', meaning: 'abstract noun', example: 'वधः' },
                { affix: 'ghañ', meaning: 'action noun', example: 'यागः' },
                { affix: 'ga', meaning: 'movement', example: 'गमन' },
                { affix: 'gama', meaning: 'going', example: 'प्रगम' }
            ]
        },
        ngitMarkers: {
            description: 'Affixes with ङ् (ṅ) it-marker',
            examples: [
                { affix: 'ṅa', meaning: 'quality noun', example: 'शुक्ल' },
                { affix: 'ṅīp', meaning: 'feminine', example: 'गौरी' },
                { affix: 'aṅ', meaning: 'limb', example: 'अङ्ग' },
                { affix: 'iṅ', meaning: 'diminutive', example: 'इङ्ग' }
            ]
        }
    };
}

const sutra115 = {
    hasKitGitNgitMarkers,
    hasKitMarker,
    hasGitMarker,
    hasNgitMarker,
    shouldBlockDueToItMarkers,
    analyzeItMarkers,
    applySutra115,
    getItMarkerExamples
};

export default sutra115;
