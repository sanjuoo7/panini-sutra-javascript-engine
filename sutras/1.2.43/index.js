/**
 * Sutra 1.2.43: प्रथमानिर्दिष्टं समासे उपसर्जनम्
 * "What is specified through nominative case in compounds becomes upasarjana (subordinate member)"
 */
import { identifyUpasarjana } from '../sanskrit-utils/compound-analysis.js';
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function applySutra1_2_43(compound, context = {}) {
  // Input validation
  if (!compound) {
    return {
      sutra: '1.2.43',
      applied: false,
      error: 'Invalid input - compound is null or undefined',
      upasarjanaIndices: [],
      confidence: 0
    };
  }

  if (!compound.members) {
    return {
      sutra: '1.2.43',
      applied: false,
      error: 'Missing members in compound',
      upasarjanaIndices: [],
      confidence: 0
    };
  }

  if (!Array.isArray(compound.members) || compound.members.length === 0) {
    return {
      sutra: '1.2.43',
      applied: false,
      error: 'Empty members array',
      upasarjanaIndices: [],
      confidence: 0
    };
  }

  // Check for malformed members
  for (let i = 0; i < compound.members.length; i++) {
    if (!compound.members[i]) {
      return {
        sutra: '1.2.43',
        applied: false,
        error: 'Malformed member data at index ' + i,
        upasarjanaIndices: [],
        confidence: 0
      };
    }
  }

  // Extract options from context
  const opts = {
    nominativeIndices: context.nominativeIndices || [],
    evaluateEkavibhakti: false
  };

  // Get basic upasarjana analysis
  const res = identifyUpasarjana(compound, opts);

  // Enhanced analysis object
  const analysis = {
    sutra: '1.2.43',
    applied: false,
    upasarjanaIndices: res.upasarjanaIndices,
    reasons: res.reasons,
    members: res.members,
    confidence: 0.8,
    analysis: {
      compoundType: compound.type || 'unspecified',
      memberCount: compound.members.length,
      nominativeCount: 0,
      nonNominativeCount: 0
    }
  };

  // Count nominative vs non-nominative cases
  compound.members.forEach(member => {
    if (member.case === 'nom-rule' || context.nominativeIndices?.includes(compound.members.indexOf(member))) {
      analysis.analysis.nominativeCount++;
    } else if (member.case) {
      analysis.analysis.nonNominativeCount++;
    }
  });

  // Check if case information is available
  const hasCaseInfo = compound.members.some(member => member.case);
  if (!hasCaseInfo) {
    analysis.applied = false;
    analysis.reason = 'No case information available for compound members';
    analysis.confidence = 0.1;
    return analysis;
  }

  // Check compound type restrictions
  if (compound.type === 'dvandva') {
    analysis.applied = false;
    analysis.reason = 'Dvandva compounds do not follow nominative upasarjana rule';
    analysis.confidence = 0.1;
    return analysis;
  }

  // Don't apply if all members are nominative (no contrast)
  if (analysis.analysis.nominativeCount > 0 && analysis.analysis.nonNominativeCount === 0) {
    analysis.applied = false;
    analysis.reason = 'All members are nominative - no contrast for upasarjana identification';
    analysis.confidence = 0.2;
    return analysis;
  }

  // Don't apply to bahuvrihi with all equal members
  if (compound.type === 'bahuvrihi' && analysis.analysis.nominativeCount === compound.members.length) {
    analysis.applied = false;
    analysis.reason = 'Bahuvrihi compound with equal nominative members';
    analysis.confidence = 0.2;
    return analysis;
  }

  // Apply the rule if we have nominative members with contrast
  if (analysis.upasarjanaIndices.length > 0) {
    analysis.applied = true;
    analysis.confidence = Math.min(0.95, 0.8 + (analysis.upasarjanaIndices.length * 0.1));

    // Add compound type information
    if (compound.type) {
      analysis.compoundType = compound.type;
      analysis.compoundAnalysis = {
        type: compound.type,
        structure: getCompoundStructure(compound.type)
      };
    }

    // Script detection
    const scripts = compound.members.map(member => detectScript(member.form));
    analysis.script = determineOverallScript(scripts);

    // Case validation
    analysis.caseValidation = performCaseValidation(compound.members);

    // Semantic analysis
    if (compound.members.some(member => member.semanticRole || member.meaning)) {
      analysis.semanticAnalysis = performSemanticAnalysis(compound.members, analysis.upasarjanaIndices);
    }

    // Contextual analysis
    if (context.syntacticRole || context.semanticField) {
      analysis.contextualAnalysis = {
        syntacticRole: context.syntacticRole,
        position: context.sentencePosition,
        semanticField: context.semanticField,
        domain: context.domain
      };
    }

    // Nested compound analysis
    if (compound.members.some(member => member.isCompound)) {
      analysis.nestedAnalysis = {
        hasNestedCompounds: true,
        nestedCount: compound.members.filter(member => member.isCompound).length
      };
    }

    // Alternative analyses
    if (compound.alternativeAnalyses) {
      analysis.alternativeAnalyses = compound.alternativeAnalyses;
    }

  } else {
    analysis.applied = false;
    analysis.reason = 'No nominative indication found in compound members';
    analysis.confidence = 0.1;
  }

  return analysis;
}

/**
 * Get compound structure description
 */
function getCompoundStructure(type) {
  const structures = {
    'tatpurusha': 'determinant_determined',
    'karmadharaya': 'qualifier_qualified',
    'dvigu': 'numeral_qualified',
    'dvandva': 'coordinate_coordinate',
    'bahuvrihi': 'possessive_attributive'
  };
  return structures[type] || 'unspecified_structure';
}

/**
 * Determine overall script from multiple scripts
 */
function determineOverallScript(scripts) {
  const uniqueScripts = [...new Set(scripts)];
  if (uniqueScripts.length === 1) {
    return uniqueScripts[0];
  } else if (uniqueScripts.length > 1) {
    return 'Mixed';
  }
  return 'Unknown';
}

/**
 * Perform case validation on compound members
 */
function performCaseValidation(members) {
  const validation = {
    validNominative: false,
    inconsistentCasing: false,
    caseMarkers: []
  };

  let hasNominativeMarkers = false;
  let hasInconsistencies = false;

  members.forEach(member => {
    if (member.caseMarker) {
      validation.caseMarkers.push(member.caseMarker);
      
      // Check for nominative markers
      if ((member.case === 'nom-rule' && ['ḥ', 'स्', 'अ'].includes(member.caseMarker)) ||
          (member.case === 'acc' && ['am', 'अम्', 'म्'].includes(member.caseMarker))) {
        hasNominativeMarkers = true;
      }
      
      // Check for inconsistencies (accusative marker with nominative case)
      if (member.case === 'nom-rule' && ['am', 'अम्', 'म्'].includes(member.caseMarker)) {
        hasInconsistencies = true;
      }
    }
  });

  validation.validNominative = hasNominativeMarkers;
  validation.inconsistentCasing = hasInconsistencies;

  return validation;
}

/**
 * Perform semantic analysis of compound members
 */
function performSemanticAnalysis(members, upasarjanaIndices) {
  const analysis = {
    relationship: 'hierarchical',
    dependency: 'modifier_modified'
  };

  // Identify semantic roles
  const upasarjanaRoles = [];
  const pradhanaRoles = [];

  members.forEach((member, index) => {
    if (upasarjanaIndices.includes(index)) {
      upasarjanaRoles.push(member.semanticRole || 'modifier');
    } else {
      pradhanaRoles.push(member.semanticRole || 'primary');
    }
  });

  if (upasarjanaRoles.length > 0) {
    analysis.upasarjanaRole = upasarjanaRoles[0];
  }
  if (pradhanaRoles.length > 0) {
    analysis.pradhanaRole = pradhanaRoles[0];
  }

  return analysis;
}

export default applySutra1_2_43;
