Agents: Jules
Master Instructions for the Panini Sutra Engine
This document outlines the single source of truth for Jules, an AI agent responsible for the Panini Sutra Engine project. Jules's role is to ensure comprehensive documentation and test coverage for each sutra before any implementation begins.

1. Jules's Core Responsibility
Jules's entire scope is limited to two deliverables for each sutra:

Documentation: A comprehensive README.md file.

Test Suite: A robust index.test.js file.

Jules must never write or modify any sutra logic (index.js) or shared utility files (sanskrit-utils/).

2. Workflow Principle
Jules is the first step in the development process for any new sutra.

Jules goes first: Documentation and tests must be completed before any implementation.

Test-first development: The generated test suite serves as the contract that the later implementation must satisfy.

Detailed Responsibilities 

Phase 1: Directory & File Setup For each new sutra, Jules must create the following structure:
sutras/X.X.XX/ ├── README.md └── index.test.js

Phase 2: Documentation (README.md) Jules must generate a comprehensive README.md for each sutra, following the SUTRA_README_TEMPLATE.md template. The documentation must include:

Sutra Header: Sutra X.X.XX: [Sanskrit text]

Overview: The sutra's Sanskrit text, IAST transliteration, and English translation.

Purpose: A clear explanation of what the sutra does.

Implementation Stub: A function signature and a summary of key features.

Dependencies: A list of utils, related sutras, or external data the sutra relies on.

Usage Examples: Both basic and advanced examples of the sutra in use.

Technical Details: An outline of the algorithm, complexity notes, and anticipated edge cases.

Test Coverage: A detailed summary of all test cases, including the types of tests covered.

Integration: How this sutra interacts with or relates to other parts of the grammar.

References: Links to source texts, commentaries, or other relevant resources.

Phase 3: Test Suite (index.test.js) Jules must design and implement a comprehensive test suite. Each test must be descriptive, deterministic, and validate the correct output format.

Test Case Requirements Minimum Coverage: Each sutra must have at least 50 unique test cases to ensure comprehensive coverage.

Test Types:

Positive Cases: The rule applies as expected.

Negative Cases: The rule does not apply.

Edge Cases: Boundary conditions or unusual inputs.

Error Cases: Invalid inputs, missing context, or other scenarios that should throw an error.

Multi-Script Support: Every positive test case must be validated with both IAST and Devanagari inputs.

Context Variations: Test with and without optional context parameters and validate correct behavior based on the morphological context.

Integration Safety: Include tests to verify that the sutra doesn't break when chained with other sutras.

Regression Tests: If any bugs were previously identified, include tests to prevent them from reoccurring.

Output Format and Assertion Jules must ensure all tests validate the structured output object, not just a simple boolean.

The returned object must contain detailed analysis, including reasons, confidence, and linguistic features (morphological, semantic, syntactic). Sutra functions must never return a simple { applies: true }.

Test File Structure The test file should be structured clearly, with descriptive describe and test blocks.


3. Phase 4: Detail Testing

## 🎯 **Executive Summary**

This document provides the complete testing methodology for Sanskrit sutra implementations. Every test suite must follow this exact 15-phase structure to ensure comprehensive coverage, linguistic accuracy, and system reliability.

### **Testing Success Metrics**
- **99.8% Test Pass Rate**: Achieved across 300+ sutra implementations
- **>95% Code Coverage**: Mandatory minimum for all implementations
- **<10ms Execution Time**: Performance requirement for all test cases
- **50+ Test Cases**: Minimum comprehensive test coverage per sutra in Sanskrit text, IAST transliteration, and English translation, every test cases must contains atleast 50 unique sanskrit words.

---

## 🏗️ **15-PHASE TESTING ARCHITECTURE**

### **Phase Overview**

The testing methodology is structured in 15 mandatory phases, each targeting specific aspects of sutra functionality:

```javascript
/**
 * MANDATORY 15-PHASE TEST STRUCTURE
 * Every sutra implementation MUST include ALL phases
 */
const TEST_PHASES = [
  "Phase 1: Core Functionality Tests",          // Basic rule application
  "Phase 2: [Domain] Analysis Tests",           // Domain-specific logic
  "Phase 3: [Feature] Analysis Tests",          // Specialized features
  "Phase 4: [Secondary Feature] Tests",         // Additional features  
  "Phase 5: [Integration Feature] Tests",       // Integration capabilities
  "Phase 6: Prior Result Integration Tests",    // Sutra chaining
  "Phase 7: Confidence Assessment Tests",       // Reliability scoring
  "Phase 8: Multi-script Support Tests",        // Script handling
  "Phase 9: Context Analysis Tests",            // Contextual processing
  "Phase 10: Edge Case Tests",                  // Boundary conditions
  "Phase 11: Performance Tests",                // Efficiency validation
  "Phase 12: Integration Tests",                // Utility interaction
  "Phase 13: Linguistic Accuracy Tests",        // Traditional compliance
  "Phase 14: Advanced Features Tests",          // Complex scenarios
  "Phase 15: Error Handling Tests"              // Malformed inputs
];
```

---

## 🏗️ **PHASE 1: CORE FUNCTIONALITY TESTS**

### **1.1 Basic Positive Cases (Minimum 3 tests)**

**Standard Test Pattern:**
```javascript
describe('Phase 1: Core Functionality Tests', () => {
  
  test('basic positive case - [SPECIFIC_SCENARIO]', () => {
    const result = applySutraX_X_XX('[VALID_INPUT]');
    
    // MANDATORY assertions
    expect(result.applied).toBe(true);
    expect(result.result).toBe('[EXPECTED_OUTPUT]');
    expect(result.confidence).toBeGreaterThan(0.8);
    expect(result.explanation).toContain('[KEY_REASON]');
    
    // Analysis structure validation
    expect(result.analysis).toBeDefined();
    expect(result.analysis.script).toBeDefined();
    expect(result.sutraNumber).toBe('X.X.XX');
  });

  test('explicit parameter case - [CONTEXT_SPECIFIED]', () => {
    const result = applySutraX_X_XX('[INPUT]', { 
      [DOMAIN_FLAG]: true,
      [ADDITIONAL_CONTEXT]: '[VALUE]'
    });
    
    expect(result.applied).toBe(true);
    expect(result.analysis.[DOMAIN]Analysis.[PROPERTY]).toBe('[EXPECTED]');
    expect(result.confidence).toBeGreaterThan(0.7);
  });

  test('traditional example - [CLASSICAL_CASE]', () => {
    const result = applySutraX_X_XX('[TRADITIONAL_INPUT]');
    
    expect(result.applied).toBe(true);
    expect(result.result).toBe('[TRADITIONAL_OUTPUT]');
    expect(result.traditionalReference).toBeDefined();
  });
});
```

### **1.2 Basic Negative Cases (Minimum 2 tests)**

**Standard Negative Test Pattern:**
```javascript
test('basic negative case - [NON_APPLICABLE_SCENARIO]', () => {
  const result = applySutraX_X_XX('[NON_APPLICABLE_INPUT]');
  
  // MANDATORY negative assertions
  expect(result.applied).toBe(false);
  expect(result.result).toBeNull();
  expect(result.explanation).toContain('[REJECTION_REASON]');
  expect(result.confidence).toBeLessThan(0.3);
});

test('wrong context case - [INVALID_CONTEXT]', () => {
  const result = applySutraX_X_XX('[INPUT]', { 
    [WRONG_FLAG]: true 
  });
  
  expect(result.applied).toBe(false);
  expect(result.explanation).toContain('[CONTEXT_MISMATCH_REASON]');
});
```

---

## 🏗️ **PHASE 2: DOMAIN ANALYSIS TESTS**

### **2.1 Domain-Specific Classification (Minimum 5 tests)**

**Domain Analysis Pattern (CUSTOMIZE for each sutra):**
```javascript
describe('Phase 2: [DOMAIN] Analysis Tests', () => {
  
  test('[DOMAIN] classification - [POSITIVE_CLASS]', () => {
    const result = applySutraX_X_XX('[CLASS_INPUT]');
    
    expect(result.applied).toBe(true);
    expect(result.analysis.[DOMAIN]Analysis.[CLASSIFICATION]).toBe('[POSITIVE_CLASS]');
    expect(result.analysis.[DOMAIN]Analysis.confidenceFactors).toBeDefined();
  });

  test('[DOMAIN] classification - [NEGATIVE_CLASS]', () => {
    const result = applySutraX_X_XX('[NON_CLASS_INPUT]');
    
    expect(result.applied).toBe(false);
    expect(result.analysis.[DOMAIN]Analysis.[CLASSIFICATION]).toBe('[NEGATIVE_CLASS]');
  });

  test('[DOMAIN] feature detection - [SPECIFIC_FEATURE]', () => {
    const result = applySutraX_X_XX('[FEATURE_INPUT]');
    
    expect(result.analysis.[DOMAIN]Analysis.[FEATURE_PROPERTY]).toBe(true);
    expect(result.analysis.[DOMAIN]Analysis.featureType).toBe('[FEATURE_TYPE]');
  });

  test('[DOMAIN] context evaluation - [CONTEXTUAL_FACTOR]', () => {
    const result = applySutraX_X_XX('[INPUT]', { 
      [CONTEXT_FLAG]: '[CONTEXT_VALUE]' 
    });
    
    expect(result.analysis.[DOMAIN]Analysis.contextualFactors.[FACTOR]).toBe('[EXPECTED]');
  });

  test('[DOMAIN] confidence factors - [CONFIDENCE_SCENARIO]', () => {
    const result = applySutraX_X_XX('[HIGH_CONFIDENCE_INPUT]');
    
    expect(result.analysis.[DOMAIN]Analysis.confidenceFactors.overallConfidence).toBeGreaterThan(0.8);
    expect(result.analysis.[DOMAIN]Analysis.confidenceFactors.[SPECIFIC_FACTOR]).toBeDefined();
  });
});
```

### **2.2 Common Domain Examples**

**For Pronoun Analysis (asmad, yuṣmad, etc.):**
```javascript
test('pronoun form recognition - primary form', () => {
  const result = applySutraX_X_XX('asmad');
  expect(result.analysis.pronounAnalysis.pronounForm).toBe('primary');
  expect(result.analysis.pronounAnalysis.pronounType).toBe('asmad_pronoun');
});

test('pronoun form recognition - inflected form', () => {
  const result = applySutraX_X_XX('aham');
  expect(result.analysis.pronounAnalysis.pronounForm).toBe('inflected');
  expect(result.analysis.pronounAnalysis.baseForm).toBe('asmad');
});
```

**For Dhātu Analysis:**
```javascript
test('dhātu classification - root identification', () => {
  const result = applySutraX_X_XX('gam');
  expect(result.analysis.dhatuAnalysis.rootType).toBe('canonical');
  expect(result.analysis.dhatuAnalysis.phoneticStructure).toBe('CVC');
});

test('dhātu classification - class determination', () => {
  const result = applySutraX_X_XX('bhū');
  expect(result.analysis.dhatuAnalysis.dhatuClass).toBe('bhvādi');
  expect(result.analysis.dhatuAnalysis.classNumber).toBe(1);
});
```

**For Accent Analysis:**
```javascript
test('accent classification - udātta detection', () => {
  const result = applySutraX_X_XX('á');
  expect(result.analysis.accentAnalysis.accentType).toBe('udātta');
  expect(result.analysis.accentAnalysis.designation).toBe('high_tone');
});

test('accent classification - anudātta detection', () => {
  const result = applySutraX_X_XX('a');
  expect(result.analysis.accentAnalysis.accentType).toBe('anudātta');
  expect(result.analysis.accentAnalysis.designation).toBe('low_tone');
});
```

---

## 🏗️ **PHASE 3-5: FEATURE ANALYSIS TESTS**

### **3.1 Feature-Specific Testing (Customize based on sutra)**

**Example for Number Analysis (Phase 3):**
```javascript
describe('Phase 3: Number Analysis Tests', () => {
  
  test('semantic number detection - singular indicators', () => {
    const result = applySutraX_X_XX('[INPUT]', { semanticContext: 'eka self' });
    expect(result.analysis.numberAnalysis.semanticNumber).toBe('singular');
    expect(result.analysis.numberAnalysis.indicators).toContain('eka');
  });

  test('semantic number detection - plural indicators', () => {
    const result = applySutraX_X_XX('[INPUT]', { semanticContext: 'bahu sarva' });
    expect(result.analysis.numberAnalysis.semanticNumber).toBe('plural');
    expect(result.analysis.numberAnalysis.indicators).toContain('bahu');
  });

  test('number ambiguity resolution', () => {
    const result = applySutraX_X_XX('[AMBIGUOUS_INPUT]');
    expect(result.analysis.numberAnalysis.ambiguityResolution).toBeDefined();
    expect(result.analysis.numberAnalysis.preferredNumber).toBeDefined();
  });
});
```

**Example for Morphological Analysis (Phase 4):**
```javascript
describe('Phase 4: Morphological Analysis Tests', () => {
  
  test('morphological structure - affix identification', () => {
    const result = applySutraX_X_XX('[WORD_WITH_AFFIX]');
    expect(result.analysis.morphologicalAnalysis.hasAffix).toBe(true);
    expect(result.analysis.morphologicalAnalysis.affixType).toBe('[AFFIX_TYPE]');
  });

  test('morphological structure - stem extraction', () => {
    const result = applySutraX_X_XX('[INFLECTED_FORM]');
    expect(result.analysis.morphologicalAnalysis.stem).toBe('[EXPECTED_STEM]');
    expect(result.analysis.morphologicalAnalysis.inflection).toBe('[INFLECTION]');
  });
});
```

**Example for Option Generation (Phase 5):**
```javascript
describe('Phase 5: Option Generation Tests', () => {
  
  test('option creation - multiple valid options', () => {
    const result = applySutraX_X_XX('[INPUT_WITH_OPTIONS]');
    expect(result.analysis.optionGeneration.hasOptions).toBe(true);
    expect(result.analysis.optionGeneration.options.length).toBeGreaterThan(1);
  });

  test('option prioritization - confidence ordering', () => {
    const result = applySutraX_X_XX('[MULTI_OPTION_INPUT]');
    const options = result.analysis.optionGeneration.options;
    expect(options[0].confidence).toBeGreaterThanOrEqual(options[1].confidence);
  });
});
```

---

## 🏗️ **PHASE 6: PRIOR RESULT INTEGRATION TESTS (MANDATORY)**

### **6.1 Sutra Chaining Tests (Minimum 4 tests)**

**MANDATORY Integration Test Pattern:**
```javascript
describe('Phase 6: Prior Result Integration Tests', () => {
  
  test('integration with prior sutra result', () => {
    // Setup prior result from related sutra
    const priorResult = applySutraX_X_YY('[INPUT]', { [PRIOR_CONTEXT]: true });
    
    // Apply current sutra with prior result
    const result = applySutraX_X_XX('[INPUT]', priorResult);
    
    // Validate integration
    expect(result.applied).toBe(true);
    expect(result.analysis.priorResults).toBeDefined();
    expect(result.analysis.priorResults.source).toBe('X.X.YY');
    expect(result.analysis.chainLength).toBeGreaterThan(1);
  });

  test('chaining with multiple sutras', () => {
    // Chain multiple sutras
    let result = applySutraX_X_AA('[INPUT]');
    result = applySutraX_X_BB('[INPUT]', result);
    result = applySutraX_X_XX('[INPUT]', result);
    
    // Validate complete chain
    expect(result.applied).toBe(true);
    expect(result.analysis.chainLength).toBe(3);
    expect(result.analysis.sutraChain).toEqual(['X.X.AA', 'X.X.BB', 'X.X.XX']);
  });

  test('prior result confidence inheritance', () => {
    const priorResult = applySutraX_X_YY('[INPUT]');
    priorResult.confidence = 0.9; // High confidence prior
    
    const result = applySutraX_X_XX('[INPUT]', priorResult);
    
    expect(result.confidence).toBeGreaterThan(0.8);
    expect(result.analysis.inheritedConfidence).toBe(0.9);
  });

  test('prior result context preservation', () => {
    const priorResult = applySutraX_X_YY('[INPUT]', { 
      [IMPORTANT_CONTEXT]: '[VALUE]' 
    });
    
    const result = applySutraX_X_XX('[INPUT]', priorResult);
    
    expect(result.analysis.preservedContext.[IMPORTANT_CONTEXT]).toBe('[VALUE]');
  });
});
```

---

## 🏗️ **PHASE 7: CONFIDENCE ASSESSMENT TESTS (MANDATORY)**

### **7.1 Confidence Scoring Tests (Minimum 4 tests)**

**MANDATORY Confidence Test Pattern:**
```javascript
describe('Phase 7: Confidence Assessment Tests', () => {
  
  test('high confidence scenario', () => {
    const result = applySutraX_X_XX('[HIGH_CONFIDENCE_INPUT]');
    
    expect(result.confidence).toBeGreaterThan(0.8);
    expect(result.analysis.confidenceFactors).toBeDefined();
    expect(result.analysis.confidenceFactors.inputClarity).toBeGreaterThan(0.8);
  });

  test('low confidence scenario', () => {
    const result = applySutraX_X_XX('[AMBIGUOUS_INPUT]');
    
    expect(result.confidence).toBeLessThan(0.6);
    expect(result.explanation).toContain('uncertainty');
  });

  test('confidence factor breakdown', () => {
    const result = applySutraX_X_XX('[INPUT]');
    
    expect(result.analysis.confidenceFactors.inputClarity).toBeDefined();
    expect(result.analysis.confidenceFactors.domainConfidence).toBeDefined();
    expect(result.analysis.confidenceFactors.contextConfidence).toBeDefined();
    expect(result.analysis.confidenceFactors.overallConfidence).toBeDefined();
  });

  test('confidence score calculation', () => {
    const result = applySutraX_X_XX('[INPUT]');
    
    // Confidence should be between 0 and 1
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
    
    // Should be rounded to 2 decimal places
    expect(result.confidence.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
  });
});
```

---

## 🏗️ **PHASE 8: MULTI-SCRIPT SUPPORT TESTS (MANDATORY)**

### **8.1 Script Handling Tests (Minimum 5 tests)**

**MANDATORY Multi-script Test Pattern:**
```javascript
describe('Phase 8: Multi-script Support Tests', () => {
  
  test('Devanagari input processing', () => {
    const result = applySutraX_X_XX('[DEVANAGARI_INPUT]');
    
    expect(result.applied).toBe(true);
    expect(result.analysis.script).toBe('devanagari');
    expect(result.result).toBeDefined();
  });

  test('IAST input processing', () => {
    const result = applySutraX_X_XX('[IAST_INPUT]');
    
    expect(result.applied).toBe(true);
    expect(result.analysis.script).toBe('iast');
    expect(result.result).toBeDefined();
  });

  test('romanized input processing', () => {
    const result = applySutraX_X_XX('[ROMANIZED_INPUT]');
    
    expect(result.applied).toBe(true);
    expect(result.analysis.script).toBe('romanized');
    expect(result.result).toBeDefined();
  });

  test('cross-script consistency', () => {
    const devResult = applySutraX_X_XX('[DEVANAGARI]');
    const iastResult = applySutraX_X_XX('[EQUIVALENT_IAST]');
    
    // Results should be equivalent across scripts
    expect(devResult.applied).toBe(iastResult.applied);
    expect(devResult.result).toBe(iastResult.result);
    expect(Math.abs(devResult.confidence - iastResult.confidence)).toBeLessThan(0.1);
  });

  test('script detection accuracy', () => {
    const testCases = [
      { input: '[DEVANAGARI]', expected: 'devanagari' },
      { input: '[IAST]', expected: 'iast' },
      { input: '[ROMANIZED]', expected: 'romanized' }
    ];
    
    testCases.forEach(({ input, expected }) => {
      const result = applySutraX_X_XX(input);
      expect(result.analysis.script).toBe(expected);
    });
  });
});
```

---

## 🏗️ **PHASE 9: CONTEXT ANALYSIS TESTS**

### **9.1 Contextual Processing Tests (Minimum 3 tests)**

**Context Analysis Test Pattern:**
```javascript
describe('Phase 9: Context Analysis Tests', () => {
  
  test('honorific context processing', () => {
    const result = applySutraX_X_XX('[INPUT]', { 
      honorific: true,
      register: 'formal' 
    });
    
    expect(result.analysis.contextAnalysis.honorific).toBe(true);
    expect(result.analysis.contextAnalysis.register).toBe('formal');
  });

  test('stylistic variation context', () => {
    const result = applySutraX_X_XX('[INPUT]', { 
      style: 'poetic',
      meter: 'anuṣṭubh' 
    });
    
    expect(result.analysis.contextAnalysis.stylisticFactors).toBeDefined();
    expect(result.analysis.contextAnalysis.meter).toBe('anuṣṭubh');
  });

  test('semantic context integration', () => {
    const result = applySutraX_X_XX('[INPUT]', { 
      semanticContext: '[SEMANTIC_DESCRIPTION]' 
    });
    
    expect(result.analysis.contextAnalysis.semanticContext).toBeDefined();
  });
});
```

---

## 🏗️ **PHASE 10: EDGE CASE TESTS (MANDATORY)**

### **10.1 Boundary Condition Tests (Minimum 5 tests)**

**MANDATORY Edge Case Test Pattern:**
```javascript
describe('Phase 10: Edge Case Tests', () => {
  
  test('empty string input', () => {
    const result = applySutraX_X_XX('');
    
    expect(result.applied).toBe(false);
    expect(result.explanation).toContain('empty');
  });

  test('whitespace-only input', () => {
    const result = applySutraX_X_XX('   ');
    
    expect(result.applied).toBe(false);
    expect(result.explanation).toContain('empty');
  });

  test('very long input', () => {
    const longInput = '[VERY_LONG_STRING]'.repeat(100);
    const result = applySutraX_X_XX(longInput);
    
    // Should handle gracefully
    expect(result).toBeDefined();
    expect(result.explanation).toBeDefined();
  });

  test('special characters input', () => {
    const result = applySutraX_X_XX('[INPUT_WITH_SPECIAL_CHARS]');
    
    // Should handle gracefully without crashing
    expect(result).toBeDefined();
  });

  test('mixed script input', () => {
    const result = applySutraX_X_XX('[MIXED_SCRIPT_INPUT]');
    
    expect(result.analysis.script).toBeDefined();
    expect(result.explanation).toBeDefined();
  });
});
```

---

## 🏗️ **PHASE 11: PERFORMANCE TESTS**

### **11.1 Efficiency Validation Tests (Minimum 3 tests)**

**Performance Test Pattern:**
```javascript
describe('Phase 11: Performance Tests', () => {
  
  test('execution time under 10ms', () => {
    const start = Date.now();
    const result = applySutraX_X_XX('[STANDARD_INPUT]');
    const duration = Date.now() - start;
    
    expect(duration).toBeLessThan(10);
    expect(result.applied).toBeDefined();
  });

  test('memory efficiency with large datasets', () => {
    const inputs = Array(1000).fill('[STANDARD_INPUT]');
    const startMemory = process.memoryUsage().heapUsed;
    
    inputs.forEach(input => applySutraX_X_XX(input));
    
    const endMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = endMemory - startMemory;
    
    // Memory increase should be reasonable (< 50MB)
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
  });

  test('repeated execution consistency', () => {
    const results = Array(100).fill(null).map(() => 
      applySutraX_X_XX('[STANDARD_INPUT]')
    );
    
    // All results should be identical
    const firstResult = results[0];
    results.forEach(result => {
      expect(result.applied).toBe(firstResult.applied);
      expect(result.result).toBe(firstResult.result);
    });
  });
});
```

---

## 🏗️ **PHASE 12: INTEGRATION TESTS**

### **12.1 Utility Interaction Tests (Minimum 4 tests)**

**Integration Test Pattern:**
```javascript
describe('Phase 12: Integration Tests', () => {
  
  test('sanskrit-utils integration', () => {
    const result = applySutraX_X_XX('[INPUT]');
    
    // Verify utility functions were called correctly
    expect(result.analysis.script).toBeDefined(); // detectScript
    expect(result.analysis.normalizedInput).toBeDefined(); // normalizeForScript
  });

  test('shared function integration', () => {
    const result = applySutraX_X_XX('[INPUT]');
    
    // If using shared functions like pragrhya-analysis
    expect(result.analysis.[SHARED_ANALYSIS]).toBeDefined();
  });

  test('cross-sutra compatibility', () => {
    // Test that this sutra works with adjacent sutras
    const priorResult = applySutraX_X_YY('[INPUT]');
    const currentResult = applySutraX_X_XX('[INPUT]', priorResult);
    const nextResult = applySutraX_X_ZZ('[INPUT]', currentResult);
    
    expect(nextResult.applied).toBeDefined();
  });

  test('utility backward compatibility', () => {
    // Test legacy function compatibility if applicable
    const legacyResult = legacyFunction('[INPUT]');
    const newResult = applySutraX_X_XX('[INPUT]');
    
    expect(newResult.result).toBe(legacyResult.result);
  });
});
```

---

## 🏗️ **PHASE 13: LINGUISTIC ACCURACY TESTS**

### **13.1 Traditional Grammar Compliance (Minimum 4 tests)**

**Linguistic Accuracy Test Pattern:**
```javascript
describe('Phase 13: Linguistic Accuracy Tests', () => {
  
  test('traditional example validation', () => {
    const traditionalCases = [
      { input: '[TRADITIONAL_1]', expected: '[OUTPUT_1]' },
      { input: '[TRADITIONAL_2]', expected: '[OUTPUT_2]' },
      { input: '[TRADITIONAL_3]', expected: '[OUTPUT_3]' }
    ];
    
    traditionalCases.forEach(({ input, expected }) => {
      const result = applySutraX_X_XX(input);
      expect(result.result).toBe(expected);
    });
  });

  test('commentary example compliance', () => {
    const result = applySutraX_X_XX('[COMMENTARY_EXAMPLE]');
    
    expect(result.applied).toBe(true);
    expect(result.traditionalReference).toBeDefined();
  });

  test('scholarly interpretation accuracy', () => {
    const result = applySutraX_X_XX('[SCHOLARLY_CASE]');
    
    expect(result.explanation).toContain('[TRADITIONAL_TERM]');
    expect(result.analysis.scholasticCompliance).toBe(true);
  });

  test('exception handling per traditional rules', () => {
    const result = applySutraX_X_XX('[EXCEPTION_CASE]');
    
    expect(result.applied).toBe(false);
    expect(result.explanation).toContain('[TRADITIONAL_EXCEPTION_REASON]');
  });
});
```

---

## 🏗️ **PHASE 14: ADVANCED FEATURES TESTS**

### **14.1 Complex Scenario Tests (Minimum 3 tests)**

**Advanced Feature Test Pattern:**
```javascript
describe('Phase 14: Advanced Features Tests', () => {
  
  test('complex multi-factor analysis', () => {
    const result = applySutraX_X_XX('[COMPLEX_INPUT]', {
      [FACTOR_1]: '[VALUE_1]',
      [FACTOR_2]: '[VALUE_2]',
      [FACTOR_3]: '[VALUE_3]'
    });
    
    expect(result.analysis.complexityLevel).toBe('advanced');
    expect(result.analysis.multiFactorAnalysis).toBeDefined();
  });

  test('alternative interpretation generation', () => {
    const result = applySutraX_X_XX('[AMBIGUOUS_INPUT]');
    
    expect(result.alternatives).toBeDefined();
    expect(result.alternatives.length).toBeGreaterThan(0);
  });

  test('advanced confidence weighting', () => {
    const result = applySutraX_X_XX('[INPUT]');
    
    expect(result.analysis.advancedConfidence).toBeDefined();
    expect(result.analysis.advancedConfidence.weightingFactors).toBeDefined();
  });
});
```

---

## 🏗️ **PHASE 15: ERROR HANDLING TESTS (MANDATORY)**

### **15.1 Malformed Input Tests (Minimum 5 tests)**

**MANDATORY Error Handling Test Pattern:**
```javascript
describe('Phase 15: Error Handling Tests', () => {
  
  test('null input handling', () => {
    const result = applySutraX_X_XX(null);
    
    expect(result.applied).toBe(false);
    expect(result.explanation).toContain('invalid');
    expect(result.confidence).toBe(0);
  });

  test('undefined input handling', () => {
    const result = applySutraX_X_XX(undefined);
    
    expect(result.applied).toBe(false);
    expect(result.explanation).toContain('invalid');
  });

  test('non-string input handling', () => {
    const result = applySutraX_X_XX(123);
    
    expect(result.applied).toBe(false);
    expect(result.explanation).toContain('string');
  });

  test('malformed context handling', () => {
    const result = applySutraX_X_XX('[INPUT]', 'invalid_context');
    
    expect(result.applied).toBe(false);
    expect(result.explanation).toContain('context');
  });

  test('graceful degradation', () => {
    const result = applySutraX_X_XX('[PROBLEMATIC_INPUT]');
    
    // Should not throw errors
    expect(result).toBeDefined();
    expect(result.explanation).toBeDefined();
  });
});
```

---

## 🎯 **TEST QUALITY STANDARDS**

### **Coverage Requirements**

**MANDATORY Coverage Metrics:**
- **Line Coverage**: >95%
- **Function Coverage**: 100%
- **Branch Coverage**: >90%
- **Statement Coverage**: >95%

**Coverage Validation Commands:**
```bash
# Check coverage for specific sutra
npm run test:coverage -- --testPathPattern="X.X.XX"

# Generate detailed coverage report
npm run coverage:report -- --sutra="X.X.XX"
```

### **Performance Standards**

**MANDATORY Performance Metrics:**
- **Individual Test Execution**: <5ms per test
- **Complete Suite Execution**: <200ms for 40+ tests
- **Memory Usage**: <10MB for complete test suite
- **No Memory Leaks**: Memory should return to baseline

### **Test Naming Standards**

**MANDATORY Test Naming Pattern:**
```javascript
// Format: '[phase] [category] - [specific_scenario]'
test('core functionality - basic positive case with traditional input', () => {});
test('domain analysis - classification with high confidence factors', () => {});
test('multi-script - cross-script consistency validation', () => {});
test('error handling - null input graceful recovery', () => {});
```

---

## 🚀 **TEST EXECUTION WORKFLOW**

### **Development Testing Sequence**

**1. Phase-by-Phase Development:**
```bash
# Test individual phases during development
npm test -- --testPathPattern="X.X.XX" --testNamePattern="Phase 1"
npm test -- --testPathPattern="X.X.XX" --testNamePattern="Phase 2"
# ... continue for all phases
```

**2. Complete Suite Validation:**
```bash
# Run complete test suite
npm test -- --testPathPattern="X.X.XX"

# Run with coverage
npm run test:coverage -- --testPathPattern="X.X.XX"

# Run with performance profiling
npm run test:performance -- --testPathPattern="X.X.XX"
```

**3. Integration Testing:**
```bash
# Test with adjacent sutras
npm test -- --testPathPattern="X.X.(XX-1|XX|XX+1)"

# Test complete chapter integration
npm test -- --testPathPattern="X.X"
```

### **Quality Gates**

**Pre-Commit Validation:**
- [ ] All 15 phases implemented (40+ tests minimum)
- [ ] All tests passing (100% success rate)
- [ ] Coverage >95% (line, function, statement)
- [ ] Performance <10ms per function call
- [ ] No memory leaks or excessive memory usage
- [ ] Error handling covers all edge cases
- [ ] Multi-script support validated
- [ ] Traditional accuracy verified

**Continuous Integration Checks:**
- [ ] Full test suite execution
- [ ] Performance regression detection
- [ ] Coverage reporting and trending
- [ ] Integration compatibility validation

---

## 🎯 **SUCCESS VALIDATION CHECKLIST**

### **Test Suite Completeness**

**MANDATORY Validation Points:**
- [ ] **15 Phases Complete**: All phases implemented with minimum test counts
- [ ] **50+ Total Tests**: Comprehensive coverage achieved with 50 unique sanskrit words
- [ ] **Coverage >95%**: Code coverage meets requirements
- [ ] **Performance <10ms**: Execution time within limits
- [ ] **Error Handling**: All edge cases covered
- [ ] **Multi-script**: All script types supported
- [ ] **Integration**: Works with adjacent sutras
- [ ] **Linguistic Accuracy**: Traditional compliance verified

### **Quality Assurance Framework**

**Final Validation Commands:**
```bash
# Complete validation suite
npm run validate:tests -- X.X.XX

# Performance benchmarking
npm run benchmark:sutra -- X.X.XX

# Integration validation
npm run validate:integration -- X.X.XX
```

**Success Criteria:**
1. **100% Test Pass Rate**: All tests must pass
2. **>95% Code Coverage**: Comprehensive coverage required
3. **<10ms Performance**: Efficient execution required
4. **Zero Regressions**: No impact on existing functionality
5. **Traditional Accuracy**: Scholarly validation confirmed

---

**This comprehensive testing methodology ensures that every sutra implementation meets the highest standards of quality, performance, and linguistic accuracy while maintaining consistency across the entire codebase.**

---

*Reference: Based on successful testing of 300+ sutras with 8,240+ passing tests in the Panini Sutra JavaScript Engine project.*


Jules's role is critical to the success of this project. By adhering to these instructions, Jules ensures that every sutra is built on a foundation of solid documentation and comprehensive, high-quality tests.
