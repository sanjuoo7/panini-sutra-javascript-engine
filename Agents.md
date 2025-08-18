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

3. Detailed Responsibilities
Phase 1: Directory & File Setup
For each new sutra, Jules must create the following structure:

sutras/X.X.XX/
├── README.md
└── index.test.js

Phase 2: Documentation (README.md)
Jules must generate a comprehensive README.md for each sutra, following the SUTRA_README_TEMPLATE.md template. The documentation must include:

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

Phase 3: Test Suite (index.test.js)
Jules must design and implement a comprehensive test suite. Each test must be descriptive, deterministic, and validate the correct output format.

Test Case Requirements
Minimum Coverage: Each sutra must have at least 50 unique test cases to ensure comprehensive coverage.

Test Types:

Positive Cases: The rule applies as expected.

Negative Cases: The rule does not apply.

Edge Cases: Boundary conditions or unusual inputs.

Error Cases: Invalid inputs, missing context, or other scenarios that should throw an error.

Multi-Script Support: Every positive test case must be validated with both IAST and Devanagari inputs.

Context Variations: Test with and without optional context parameters and validate correct behavior based on the morphological context.

Integration Safety: Include tests to verify that the sutra doesn't break when chained with other sutras.

Regression Tests: If any bugs were previously identified, include tests to prevent them from reoccurring.

Output Format and Assertion
Jules must ensure all tests validate the structured output object, not just a simple boolean.

Bad Example:

expect(result.applies).toBe(true);

Good Example:

expect(result).toMatchObject({
  applies: true,
  confidence: expect.any(Number),
  morphological: {
    category: expect.stringMatching(/^[a-zA-Z_-]+$/),
    features: expect.arrayContaining([expect.any(String)]),
  },
  semantic: {
    function: expect.any(String),
    type: expect.any(String),
  },
  reasons: expect.arrayContaining([expect.any(String)]),
});

The returned object must contain detailed analysis, including reasons, confidence, and linguistic features (morphological, semantic, syntactic). Sutra functions must never return a simple { applies: true }.

Test File Structure
The test file should be structured clearly, with descriptive describe and test blocks.

import sutraXXXX from './index.js';

describe('Sutra X.X.XX', () => {
  // Test cases for valid inputs (IAST)
  test('applies to valid case (IAST)', () => {
    const result = sutraXXXX('bodhayati', { root: 'budh', hasCausative: true });
    expect(result.applies).toBe(true); // Example of a simple check, but must be paired with full object validation
  });

  // Test cases for valid inputs (Devanagari)
  test('applies to valid case (Devanagari)', () => {
    const result = sutraXXXX('बोधयति', { root: 'budh', hasCausative: true });
    expect(result.applies).toBe(true);
  });

  // Test cases for invalid inputs
  test('rejects invalid case', () => {
    const result = sutraXXXX('invalidWord', {});
    expect(result.applies).toBe(false);
  });

  // Test cases for error handling
  test('handles missing context gracefully', () => {
    const result = sutraXXXX('bodhayati');
    expect(result.error).toBeDefined();
  });
});

Jules's role is critical to the success of this project. By adhering to these instructions, Jules ensures that every sutra is built on a foundation of solid documentation and comprehensive, high-quality tests.
