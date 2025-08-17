This comprehensive guide is designed for an AI agent working in Visual Studio Code to implement a new Sanskrit sutra. The workflow is systematic and aligns with the project's established standards for accuracy, code reuse, and maintainability by adopting a modern, test-first approach.

Initial Setup: Read Project Documentation
Before beginning any work, the AI agent must thoroughly read and understand all the project's foundational documents from the project directory. This includes:

README.md: For a project overview, installation, and usage.

SANSKRIT_UTILS_DOCUMENTATION.md: For a comprehensive API reference of shared utilities.

COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md: For the complete methodology for converting sutras to JavaScript.

SUTRA_README_TEMPLATE.md: For the standardized documentation template.

DOCUMENTATION_INDEX.md: For a full overview of all project documentation.

Phase 1: Documentation & Tests (Claude)
Description: The agent generates the "blueprint" for the new sutra. This phase leverages Claude's strength in precision and documentation to define the problem and its expected behavior before any code is written.

Sutra Interpretation

Action: Summarize the sutra's type, grammatical scope, meaning, and transformations from linguistic sources.

Expected Output: A structured interpretation, including all conditions for the sutra's application.

Write Sutra README

Action: Create a detailed README.md file in the new sutra directory based on the SUTRA_README_TEMPLATE.md. This file serves as the primary documentation for the new module.

Expected Output: The rendered content of the README.md, ensuring all fields are filled.

Plan Test Cases

Action: Analyze the sutra's logic to create a comprehensive list of positive, negative, and edge test cases.

Expected Output: A structured list of test cases, each with an input, expected output, and a brief description of the scenario.

Write Test Suite

Action: Generate the index.test.js file with all the planned test cases. The tests should be written to fail initially since the function has not been implemented yet.

Expected Output: The content of the test file, confirming all test cases have been translated into executable test definitions.

Phase 2: Analysis & Design (GPT-5)
Description: The agent analyzes the tests and documentation to plan the implementation. GPT-5's large context window allows it to efficiently reason about the entire project's codebase and identify dependencies.

Analyze Sutra Logic

Action: Read the generated tests and README.md to define the precise logic for the sutra function's implementation.

Expected Output: A summary of the implementation strategy.

Check Existing Utilities

Action: Search the sanskrit-utils directory for reusable helper functions that can be used in the new sutra's implementation.

Expected Output: A list of all found utilities, including the file and function names.

Plan New Utilities

Action: Identify if any new, reusable utility functions are needed to support the sutra, especially for complex or repeated logic.

Expected Output: Planned function names and a brief description of their purpose.

Design Function Signature

Action: Plan the new function's signature, including parameters (e.g., word, context) and the expected return type.

Expected Output: The final proposed JavaScript function signature.

Phase 3: Implementation (GPT-5)
Description: The agent writes the code to make the tests pass. GPT-5 excels in this iterative, code-generation task, guided by the test cases.

Create Sutra Directory

Action: Create the new sutra directory sutras/X.X.X/ and an empty index.js file.

Expected Output: Confirmation of the directory and file path and their creation.

Implement Sutra Function

Action: Write the core logic of the sutra function in index.js, using shared utilities to make the test suite pass.

Expected Output: The complete, commented final function code.

Implement New Utilities

Action: Write any planned new reusable utility functions in the sanskrit-utils/ directory to support the main sutra function.

Expected Output: Code snippets and their corresponding tests.

Ensure Multi-Script Support

Action: Add script conversion logic (IAST to Devanagari and vice versa) to ensure multiscript support, then re-run tests.

Expected Output: A demonstration of successful input and output in both scripts.

Add Input Validation

Action: Implement a robust input validation pipeline to handle invalid inputs, as specified in the tests.

Expected Output: A list of the validation checks implemented.

Phase 4: Validation (CI/CD)
Description: This phase is typically handled by a CI/CD system, but the agent monitors its output to ensure everything is working correctly.

Run All Tests

Action: Execute npm test to run the entire project's test suite.

Expected Output: A summary report of the test results, confirming all tests pass.

Check Coverage

Action: Execute npm test:coverage for the new module.

Expected Output: The code coverage percentage, ensuring it is >95%.

Phase 5: Documentation Finalization (Claude)
Description: The agent uses Claude's precision to update the project's foundational documents and ensure consistency.

Update Utilities Documentation

Action: Add new utility functions to SANSKRIT_UTILS_DOCUMENTATION.md.

Expected Output: The updated documentation entry.

Update Documentation Index

Action: Add the new sutra and any new utilities to DOCUMENTATION_INDEX.md.

Expected Output: The updated index entries.

Document New Strategies

Action: Update COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md with any new implementation patterns or optimizations discovered.

Expected Output: The new section added to the strategy document.

Phase 6: Final Review (Human/AI Agent)
Description: A final check for linguistic accuracy and completeness before merging.

Review Accuracy

Action: Linguistically verify the function's output against the original sutra.

Expected Output: A final verification statement.

Review Tests

Action: Check the test suite for any logical gaps or unhandled edge cases.

Expected Output: A list of any discovered coverage gaps (if any).

Review Docs

Action: Perform a final review of all documentation for accuracy and consistency.

Expected Output: A list of any missing or inconsistent documentation sections.