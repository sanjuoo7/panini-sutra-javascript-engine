agents_plan:
  agent: Jules
  scope: "Modifying Existing README.md and index.test.js files for 68 sutras identified in the Sutra Analysis Report."

  responsibilities:
    - id: file_verification
      description: "Verify directories and files exist for each sutra."
      steps:
        - "Confirm sutras/X.X.XX/ directory exists."
        - "Confirm README.md exists."
        - "Confirm index.test.js exists."
    
    - id: modify_readme
      description: "Update README.md to reflect detailed analysis object."
      steps:
        - "Update Purpose section: explicitly state sutra now returns a detailed analysis object, citing the Sutra Analysis Report."
        - "Update Technical Details: describe the specific properties of the analysis object per report recommendations."
        - "For saṃjñā sutras, explicitly list the fields/properties that will be included in the analysis object."
    
    - id: modify_tests
      description: "Update index.test.js to validate detailed analysis object."
      steps:
        - "Rewrite test cases to assert existence and correctness of analysis object fields."
        - "Add new tests until at least 50 unique test cases exist per sutra."
        - "Ensure all properties of the analysis object are validated."
        - "Tests serve as a contract for future refactoring of index.js."
    
  boundaries:
    - "Do not modify index.js (sutra logic untouched)."
    - "Do not modify shared utility files."
    - "Focus strictly on README.md and index.test.js modifications."

  workflow_principles:
    - id: preparation_only
      description: "This phase prepares the project for refactoring by updating documentation and tests. Implementation happens later."
    - id: documentation_first
      description: "README.md modifications guide index.test.js updates, ensuring consistency."
    - id: test_first_refactoring
      description: "Updated tests act as blueprint and safety net for future logic changes."