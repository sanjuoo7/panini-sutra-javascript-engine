/**
 * Sutra 1.2.44: एकविभक्ति चापूर्वनिपाते
 * "A member with fixed case (ekavibhakti) also becomes upasarjana when not occurring in the first position"
 */
import { identifyUpasarjana } from '../sanskrit-utils/compound-analysis.js';
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function applySutra1_2_44(compound, context = {}) {
  // Input validation
  if (!compound) {
    return {
      sutra: '1.2.44',
      applied: false,
      error: 'Invalid input - compound is null or undefined',
      upasarjanaIndices: [],
      confidence: 0
    };
  }

  if (!compound.members) {
    return {
      sutra: '1.2.44',
      applied: false,
      error: 'Missing members in compound',
      upasarjanaIndices: [],
      confidence: 0
    };
  }

  if (!Array.isArray(compound.members) || compound.members.length === 0) {
    return {
      sutra: '1.2.44',
      applied: false,
      error: 'Empty members array',
      upasarjanaIndices: [],
      confidence: 0
    };
  }

  if (compound.members.length < 2) {
    return {
      sutra: '1.2.44',
      applied: false,
      error: 'Insufficient members for compound analysis',
      reason: 'Insufficient members for compound analysis',
      upasarjanaIndices: [],
      confidence: 0
    };
  }

  // Check for malformed members
  for (let i = 0; i < compound.members.length; i++) {
    if (!compound.members[i]) {
      return {
        sutra: '1.2.44',
        applied: false,
        error: 'Malformed member data at index ' + i,
        upasarjanaIndices: [],
        confidence: 0
      };
    }
  }

  // Get basic upasarjana analysis (enables ekavibhakti evaluation)
  const res = identifyUpasarjana(compound, { evaluateEkavibhakti: true });

  // Enhanced analysis object
  const analysis = {
    sutra: '1.2.44',
    applied: false,
    upasarjanaIndices: res.upasarjanaIndices,
    reasons: res.reasons,
    members: res.members,
    confidence: 0.8,
    analysis: {
      compoundType: compound.type || 'unspecified',
      memberCount: compound.members.length,
      fixedCaseCount: 0,
      variableCaseCount: 0
    }
  };

  // Count fixed vs variable case members
  compound.members.forEach(member => {
    if (member.fixedCase === true) {
      analysis.analysis.fixedCaseCount++;
    } else if (member.case || member.fixedCase === false) {
      analysis.analysis.variableCaseCount++;
    }
  });

  // Member type analysis
  analysis.memberTypes = {
    fixedCase: analysis.analysis.fixedCaseCount,
    variableCase: analysis.analysis.variableCaseCount,
    total: compound.members.length
  };

  // Check if case information is available
  const hasCaseInfo = compound.members.some(member => member.case || member.fixedCase !== undefined);
  if (!hasCaseInfo) {
    analysis.applied = false;
    analysis.reason = 'No case information available for compound members';
    analysis.confidence = 0.1;
    return analysis;
  }

  // Check compound type restrictions
  if (compound.type === 'dvandva') {
    analysis.applied = false;
    analysis.reason = 'Dvandva compounds typically do not have fixed case members';
    analysis.confidence = 0.1;
    return analysis;
  }

  // Position analysis
  analysis.positionAnalysis = analyzePositions(compound.members);

  // Don't apply if no fixed case members
  if (analysis.analysis.fixedCaseCount === 0) {
    analysis.applied = false;
    analysis.reason = 'No fixed case (ekavibhakti) members found in compound';
    analysis.confidence = 0.1;
    return analysis;
  }

  // Apply the rule if we have fixed case members
  if (analysis.upasarjanaIndices.length > 0 && 
      analysis.upasarjanaIndices.some(i => compound.members[i].fixedCase === true)) {
    
    analysis.applied = true;
    analysis.confidence = Math.min(0.95, 0.8 + (analysis.analysis.fixedCaseCount * 0.1));

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

    // Word type analysis
    analysis.wordTypeAnalysis = analyzeWordTypes(compound.members);

    // Semantic analysis
    if (compound.members.some(member => member.semanticRole || member.meaning)) {
      analysis.semanticAnalysis = performSemanticAnalysis(compound.members, analysis.upasarjanaIndices);
    }

    // Contextual analysis
    if (context.morphologicalRule || context.syntacticFunction) {
      analysis.contextualAnalysis = {
        morphologicalRule: context.morphologicalRule,
        processType: context.processType,
        syntacticFunction: context.syntacticFunction,
        scope: context.scope
      };
    }

    // Nested compound analysis
    if (compound.members.some(member => member.isCompound)) {
      analysis.nestedAnalysis = {
        hasNestedCompounds: true,
        nestedCount: compound.members.filter(member => member.isCompound).length
      };
    }

    // Rule precedence analysis
    const hasNominativeRule = compound.members.some(member => member.case === 'nom-rule');
    if (hasNominativeRule) {
      analysis.rulePrecedence = {
        applicableRules: ['1.2.43', '1.2.44'],
        primaryRule: '1.2.44',
        note: 'Both nominative and fixed case rules apply'
      };
    }

    // Morphological process analysis
    const processes = compound.members
      .map(member => member.morphProcess)
      .filter(process => process);
    if (processes.length > 0) {
      analysis.morphologicalAnalysis = {
        processes: processes,
        count: processes.length
      };
    }

  } else {
    analysis.applied = false;
    analysis.reason = 'No fixed case upasarjana members identified';
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
    'bahuvrihi': 'possessive_attributive',
    'avyayibhava': 'invariant_adverbial'
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
 * Analyze position patterns in compound
 */
function analyzePositions(members) {
  const analysis = {
    firstPositionFixed: false,
    nonFirstPositionFixed: false,
    multipleFixedPositions: false,
    fixedPositions: []
  };

  members.forEach((member, index) => {
    if (member.fixedCase === true) {
      analysis.fixedPositions.push(index);
      if (index === 0) {
        analysis.firstPositionFixed = true;
      } else {
        analysis.nonFirstPositionFixed = true;
      }
    }
  });

  analysis.multipleFixedPositions = analysis.fixedPositions.length > 1;

  return analysis;
}

/**
 * Perform case validation on compound members
 */
function performCaseValidation(members) {
  const validation = {
    validFixed: false,
    inconsistentMarking: false,
    fixedCaseTypes: []
  };

  let hasValidFixed = false;
  let hasInconsistencies = false;

  members.forEach(member => {
    if (member.fixedCase === true) {
      hasValidFixed = true;
      if (member.caseType) {
        validation.fixedCaseTypes.push(member.caseType);
      }
    }
    
    // Check for inconsistencies (marked as both fixed and variable)
    if (member.fixedCase === false && !member.case) {
      hasInconsistencies = true;
    }
    
    // Check for inconsistent case marking patterns
    if (member.fixedCase === false && member.case === 'nom') {
      // This pattern suggests inconsistent marking
      hasInconsistencies = true;
    }
  });

  validation.validFixed = hasValidFixed;
  validation.inconsistentMarking = hasInconsistencies;

  return validation;
}

/**
 * Analyze word types in compound
 */
function analyzeWordTypes(members) {
  const analysis = {
    avyayaCount: 0,
    upasargaCount: 0,
    particleCount: 0,
    hasAvyaya: false,
    hasUpasarga: false,
    hasParticle: false
  };

  members.forEach(member => {
    if (member.type === 'avyaya') {
      analysis.avyayaCount++;
      analysis.hasAvyaya = true;
    } else if (member.type === 'upasarga') {
      analysis.upasargaCount++;
      analysis.hasUpasarga = true;
    } else if (member.type === 'particle') {
      analysis.particleCount++;
      analysis.hasParticle = true;
    }
  });

  return analysis;
}

/**
 * Perform semantic analysis of compound members
 */
function performSemanticAnalysis(members, upasarjanaIndices) {
  const analysis = {
    relationship: 'modification',
    dependency: 'fixed_modifier'
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

export default applySutra1_2_44;
