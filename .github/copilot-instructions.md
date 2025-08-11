This comprehensive guide is designed for an AI agent working in Visual Studio Code to implement a new Sanskrit sutra. The workflow is systematic and aligns with the project's established standards for accuracy, code reuse, and maintainability.

Initial Setup: Read Project Documentation
Action: Before beginning any work, the AI agent must thoroughly read and understand all the project's foundational documents from the project directory. This includes:

README.md: For a project overview, installation, and usage.

SANSKRIT_UTILS_DOCUMENTATION.md: For a comprehensive API reference of shared utilities.

COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md: For the complete methodology for converting sutras to JavaScript.

SUTRA_README_TEMPLATE.md: For the standardized documentation template.

DOCUMENTATION_INDEX.md: For a full overview of all project documentation.

Phase 1: Analysis & Design
Sutra Interpretation: The AI agent must first analyze the sutra.

Action: Identify the sutra's type, its grammatical scope, the conditions under which it applies, and the transformations it performs.

Dependency Mapping & Utility Discovery: Check for existing project resources and identify potential new utilities.

Objective: Avoid creating redundant code and identify opportunities to create new, reusable utility functions.

Action:

Check sanskrit-utils: The agent must check the sanskrit-utils library's core modules (e.g., constants.js, classification.js, vowel-analysis.js) to see if any existing functions can be reused.

Identify New Utilities: Analyze the sutra's logic for any complex linguistic operations, performance-critical algorithms, or error-prone manual implementations that could be generalized and used by three or more sutras. If such logic is found, this should be planned as a new utility function.

Check Related Sutras: Identify any previous sutras on which the new one depends.

Expected Output: A list of reusable utility functions from sanskrit-utils and a plan for any new utilities that need to be created.

Function Design: Plan the new function's structure.

Action:

Design the function's signature, including parameters like word and an optional context object.

Determine the function's return type (e.g., a boolean for a classification function or an object for a transformation function).

Test Case Planning: Collect and design comprehensive tests.

Action:

Gather "positive" test cases (where the rule applies) from traditional Sanskrit grammar texts.

Create "negative" test cases where the rule should not apply.

Identify "edge cases" to test boundary conditions.

Expected Output: A detailed plan for test cases covering all identified scenarios.

Phase 2: Implementation
File Structure Setup: Create the new sutra's directory.

Action: Create a new directory under sutras/ named X.X.X/. Inside, create index.js for the main function and index.test.js for the tests.

Code Implementation: Write the JavaScript function.

Action:

Implement New Utilities (if any): If new reusable utilities were planned in Phase 1, create a new module for them in the sanskrit-utils/ directory. Follow the guidelines:

Create the module in the appropriate category.

Export the new functions from the sanskrit-utils/index.js file.

Add comprehensive tests for the new utility functions.

Use the Shared Utilities: Import and use the functions identified in the Analysis phase (e.g., detectScript, tokenizePhonemes, isVrddhi).

Multi-Script Support: Ensure the function can handle both IAST and Devanagari scripts.

Input Validation: Implement the proven input processing pipeline, including type checking, sanitization, and validation to handle invalid inputs gracefully.

Test Implementation: Write the test suite.

Action:

Write a comprehensive test suite in index.test.js using the planned test cases.

Include tests for positive, negative, and edge cases, as well as error handling.

Add integration tests to verify the new sutra's interaction with related rules.

Phase 3: Validation
Run All Tests: Confirm no regressions have been introduced.

Action: Run the full test suite using npm test. The agent must ensure all 2270+ tests pass successfully.

Check Test Coverage: Verify the new tests are sufficient.

Action: Run npm test:coverage and analyze the results for the newly implemented sutra. The goal is to achieve >95% code coverage for the new module.

Phase 4: Documentation
Update Sutra README: Document the new sutra.

Action: Fill out a new README.md file in the sutra's directory based on the SUTRA_README_TEMPLATE.md. This includes the Sanskrit text, transliteration, English translation, a brief description, dependencies, and usage examples.

Update Sanskrit Utilities Documentation (if new utilities were created):

Objective: Ensure the API reference for the shared library is always current and accurate.

Action: Update the SANSKRIT_UTILS_DOCUMENTATION.md file to include the new utility function(s). This involves adding a description of the function's purpose, parameters, returns, and usage examples.

Update Documentation Index: Add the new sutra and utility functions to the main documentation index.

Action: Update DOCUMENTATION_INDEX.md by adding the new sutra's number and a brief description under the appropriate volume. If new utilities were added, update the Shared Utilities Architecture section to reflect the changes.

Document New Conversion Strategies:

Objective: Capture and formalize any new implementation patterns or optimization techniques discovered during the process.

Action: If the AI agent identifies a novel or highly efficient way to interpret and convert a sutra that is not currently in the COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md, it must document this finding. The new strategy should be added to COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md, including a description of the problem, the solution, and its benefits for future implementations.

Final Review: Perform a final check of all deliverables.

Action: Verify that the function is linguistically accurate, the tests are comprehensive, and all documentation is complete and accurate.