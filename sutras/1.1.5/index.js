/**
 * Sutra 1.1.5: क्क्ङिति च (kakaṅiti ca)
 * 
 * And that, which otherwise would have caused guṇa or vṛddhi, does not do so, 
 * when it has an indicatory क्, ग्, ङ्.
 * 
 * This sutra establishes that affixes with indicatory letters (it-markers) 
 * क्, ग्, or ङ् do not cause guṇa or vṛddhi transformations.
 */

/**
 * Enhanced function to handle both IAST and Devanagari scripts
 * @param {string} text - Text in IAST or Devanagari
 * @returns {string} - Text processed for comparison
 */
function normalizeScript(text) {
    if (!text) return '';
    
    // If already in IAST (contains only ASCII), return as is
    if (!/[\u0900-\u097F]/.test(text)) {
        return text.toLowerCase();
    }
    
    // Simple Devanagari to IAST mapping for key affixes
    const mappings = {
        // Kit affixes
        'कत्': 'kta',
        'कत्वा': 'ktvā', 
        'कुप्': 'kvip',
        'कुअन्': 'kvan',
        'कतवत्': 'ktavat',
        'कतिन्': 'ktin',
        
        // Git affixes  
        'घञ्': 'ghañ',
        'घन्': 'ghan',
        'घ': 'gha',
        'ग': 'ga',
        
        // Ngit affixes
        'ङीप्': 'ṅīp',
        'ङीन्': 'ṅīn', 
        'अङ्': 'aṅ',
        'ङ': 'ṅa',
        
        // Regular affixes (no it-markers)
        'ति': 'ti',
        'अन': 'ana',
        'य': 'ya',
        'तृच्': 'tṛc',
        'अच्': 'ac'
    };
    
    // Check for direct mapping first
    if (mappings[text]) {
        return mappings[text];
    }
    
    // For complex cases, return original for now
    return text;
}

/**
 * Checks if an affix has indicatory letters क्, ग्, or ङ्
 * @param {string} affix - The affix to check (IAST or Devanagari)
 * @returns {boolean} - True if affix has k, g, or ṅ it-markers
 */
export function hasKitGitNgitMarkers(affix) {
    if (!affix || typeof affix !== 'string') {
        return false;
    }
    
    // Normalize the script
    const normalized = normalizeScript(affix);
    
    // Common affixes with k, g, ṅ it-markers
    const kitMarkedAffixes = new Set([
        'kta', 'ktvā', 'ktva', 'kvip', 'kvan', 'ktavat', 'ktin', 'ktu',
        'kmat', 'kvi', 'kvarap', 'kvasuc', 'kt'
    ]);
    
    const gitMarkedAffixes = new Set([
        'gha', 'ghañ', 'ghan', 'ghaṇ', 'ghasi', 'ghāsi', 'ga'
    ]);
    
    const ngitMarkedAffixes = new Set([
        'ṅa', 'ṅīp', 'ṅīn', 'ṅīṣ', 'ṅau', 'aṅ', 'iṅ', 'uṅ'
    ]);
    
    // Check if the affix matches any known marked affixes
    return kitMarkedAffixes.has(normalized) || 
           gitMarkedAffixes.has(normalized) || 
           ngitMarkedAffixes.has(normalized);
}

/**
 * Checks if an affix has क् (k) it-marker
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if affix has k it-marker
 */
export function hasKitMarker(affix) {
    if (!affix || typeof affix !== 'string') {
        return false;
    }
    
    const normalized = normalizeScript(affix);
    
    // Affixes with क् it-marker
    const kitAffixes = new Set([
        'kta', 'ktvā', 'ktva', 'kvip', 'kvan', 'ktavat', 'ktin', 'ktu',
        'kmat', 'kvi', 'kvarap', 'kvasuc', 'kt'
    ]);
    
    return kitAffixes.has(normalized);
}

/**
 * Checks if an affix has ग् (g) it-marker
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if affix has g it-marker
 */
export function hasGitMarker(affix) {
    if (!affix || typeof affix !== 'string') {
        return false;
    }
    
    const normalized = normalizeScript(affix);
    
    // Affixes with ग् it-marker
    const gitAffixes = new Set([
        'gha', 'ghañ', 'ghan', 'ghaṇ', 'ghasi', 'ghāsi', 'ga'
    ]);
    
    return gitAffixes.has(normalized);
}

/**
 * Checks if an affix has ङ् (ṅ) it-marker
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if affix has ṅ it-marker
 */
export function hasNgitMarker(affix) {
    if (!affix || typeof affix !== 'string') {
        return false;
    }
    
    const normalized = normalizeScript(affix);
    
    // Affixes with ङ् it-marker
    const ngitAffixes = new Set([
        'ṅa', 'ṅīp', 'ṅīn', 'ṅīṣ', 'ṅau', 'aṅ', 'iṅ', 'uṅ'
    ]);
    
    return ngitAffixes.has(normalized);
}

/**
 * Determines if guṇa/vṛddhi should be blocked due to k/g/ṅ it-markers
 * @param {string} dhatu - The verbal root
 * @param {string} affix - The affix being added
 * @param {string} operation - The transformation type ('guna' or 'vrddhi')
 * @returns {boolean} - True if transformation should be blocked
 */
export function shouldBlockDueToItMarkers(dhatu, affix, operation) {
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
