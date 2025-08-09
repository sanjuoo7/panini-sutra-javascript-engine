Panini Sutra to JavaScript Engine
This project is a collaborative effort to computationally model Panini's ancient Sanskrit grammar. Our goal is to convert each of the thousands of "Sutras" (aphoristic rules) from Panini's Aṣṭādhyāyī into a functional and rigorously tested JavaScript function. These functions will eventually be consolidated to form a powerful "Panini Engine" for advanced natural language processing tasks in Sanskrit.

Your role in this project is crucial. You will be acting as a core developer, responsible for the accurate and verifiable conversion of each Sutra.

Project Structure
The project directory is organized to manage the Sutras and their associated code:

enhanced-panini-sutras.json: A structured data file containing the Sutras and additional metadata to aid in the conversion process.

├── .github/
│   └── instructions/
│       └── paniniruleengine.instructions.md
├── sutras/
│   ├── enhanced-panini-sutras.json
│   ├── utils.js
│   ├── 1.1.1/
│   │   ├── index.js
│   │   ├── index.test.js
│   │   ├── test-cases.js
│   │   └── comprehensive.test.js
│   ├── 1.1.2/
│   │   ├── index.js
│   │   ├── index.test.js
│   │   ├── test-cases.js
│   │   ├── comprehensive-test-cases.js
│   │   ├── README.md
│   │   └── IMPLEMENTATION_SUMMARY.md
│   └── ... (additional sutras)
└── README.md

Your Primary Task: Conversion and Testing
Your core responsibility is a two-step process for each Sutra:

1. Sutra to Function Conversion
For each Sutra, you must:

Interpret the Rule: Carefully analyze the Sutra's grammatical rule. Understand its conditions, inputs, and the specific transformation it performs on a word or grammatical state.

Write the JavaScript Function: Create a dedicated JavaScript function that accurately implements this rule. The function should be named logically (e.g., sutra_1_1_1) and should be a pure function—meaning it always returns the same output for the same input and has no side effects.

2. Comprehensive Unit Testing
This is the most critical part of the process. The reliability of the final engine depends entirely on the accuracy of these individual functions. For each Sutra function you create, you must also generate a corresponding test file with a robust test suite.

The test suite must include a wide range of test cases to ensure the function works as expected under all circumstances:

Positive Tests: Test cases where the Sutra's rule should apply successfully.

Negative Tests: Test cases where the Sutra's conditions are not met, and the rule should not apply.

Edge Cases: Boundary conditions where the rule might be ambiguous or requires careful handling.

Dependencies: If a Sutra's rule depends on the outcome of a previous Sutra, include tests that simulate this dependency.

Best Practices for Conversion and Testing
To maintain consistency and accuracy, please adhere to the following guidelines:

What to Do:
Use Proper Transliteration: All test cases and examples must use standard Sanskrit characters and their corresponding IAST (International Alphabet of Sanskrit Transliteration) representation. This is essential for correctly handling diacritics and phonetic nuances.

Parameterize Functions: Your JavaScript functions should accept data as parameters (e.g., a word, a list of phonemes, or a state object). This ensures they are reusable and not tied to specific hardcoded words.

Leverage Structured Data: Where applicable, use the data from enhanced-panini-sutras.json to generate your test cases. This avoids manual transcription errors and ensures consistency with the project's canonical Sutra data.

What Not to Do:
Do Not Hardcode Words: Avoid writing functions with hardcoded strings like "rāmaḥ" or "hariḥ". The logic should be general and operate on the input provided.

Do Not Use Non-Standard Transliteration: Avoid using informal or non-standard Romanization. Consistency in IAST is non-negotiable for accurate phonetic representation.

Avoid Side Effects: Functions should not modify global variables, write to external files, or perform any other action that would make them impure.

The Consolidation Phase
Once all Sutras have been converted and thoroughly tested, the next phase of the project will begin: building the "Panini Engine."

The individual, tested Sutra functions will be imported into a central library. This library will then be used as the foundation for the "Panini Engine," a master program that can apply these rules in the correct order to derive the forms of Sanskrit words.

The Engine's Logic
The engine's logic is a complex but crucial part of this project. It will be responsible for:

Sutra Application Order: Applying the Sutras in the correct sequence as defined by Panini. The order of operations is critical, as the output of one Sutra often serves as the input for the next.

State Management: The engine will need to maintain and update a grammatical "state" object as it processes a word. This state will include information about the word's current form, its grammatical properties, and any pending rules.

Rule Conflict Resolution: When multiple Sutras are potentially applicable, the engine must correctly identify and apply the highest-priority rule as dictated by Panini's meta-rules.

Documentation and Collaboration
To ensure the long-term success of this collaborative project, please also keep the following in mind:

Documentation:
Code Comments: Every JavaScript function, especially those for the Sutras, must be extensively commented. Use JSDoc format to describe the function's purpose, its parameters, and what it returns.

README Updates: As you work on specific sections or make significant changes, update this README.md file to reflect your progress.

Version Control:
Git Workflow: Follow a standard Git workflow. Create a new branch for each Sutra you are working on, make your changes, and submit a pull request for review.

Clear Commit Messages: Write clear, concise, and descriptive commit messages. A good commit message should explain what was changed and why.

Final Goal
The final goal of this project is to create an open-source, verifiable, and highly accurate computational model of Panini's Aṣṭādhyāyī in JavaScript. Your attention to detail in the conversion and testing of each Sutra is fundamental to achieving this vision.

Note: please before writing a new functionality check if it generic and available in utility or not, if not then create one in utility and leverage it in every other sutra.