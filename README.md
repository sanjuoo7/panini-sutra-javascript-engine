# Panini Sutra JavaScript Engine

A JavaScript implementation of Panini's Ashtadhyayi (Sanskrit grammar rules) for computational linguistics and natural language processing.

## Project Overview

This project aims to convert the ancient grammatical rules of Sanskrit, as laid out in Panini's Ashtadhyayi (the Sutras), into a functional and testable JavaScript library. The ultimate goal is to create a robust "Panini Rule Engine" that can be used for computational linguistics and natural language processing tasks related to Sanskrit.

## Project Structure

```
├── .github/
│   └── instructions/
│       └── paniniruleengine.instructions.md
├── sutras/
│   ├── enhanced-panini-sutras.json
│   ├── sanskrit-utils/                    # Shared utilities library
│   │   ├── constants.js                   # Sanskrit linguistic constants
│   │   ├── script-detection.js            # IAST/Devanagari detection
│   │   ├── phoneme-tokenization.js        # Sanskrit text parsing
│   │   ├── classification.js              # Vowel/consonant classification
│   │   ├── vowel-analysis.js              # Guna/vrddhi operations
│   │   ├── pragrhya-analysis.js           # Comprehensive pragrhya rules
│   │   ├── transliteration.js             # Script conversion
│   │   ├── validation.js                  # Input validation
│   │   └── index.js                       # Unified exports
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
│   └── ... (50+ additional sutras)
└── README.md
```

## Features

- **Individual Sutra Implementation**: Each Panini Sutra is implemented as a standalone, well-tested JavaScript function
- **Comprehensive Testing**: Each function includes extensive unit tests covering positive cases, negative cases, edge cases, and corner cases
- **Modular Design**: Each sutra is contained in its own module for easy maintenance and testing
- **Sanskrit Utilities Library**: Centralized linguistic utilities for script detection, phoneme analysis, and grammatical operations
- **Rule Engine Foundation**: Building blocks for a complete Panini Rule Engine
- **Multi-script Support**: Full support for both IAST and Devanagari scripts

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sanjuoo7/panini-sutra-javascript-engine.git
cd panini-sutra-javascript-engine
```

2. Install dependencies:
```bash
npm install
```

### Running Tests

To run tests for all sutras:
```bash
npm test
```

To run tests for a specific sutra:
```bash
npm test sutras/1.1.11
```

To run tests with coverage:
```bash
npm test:coverage
```

## Usage

```javascript
// Example usage of a Panini Sutra function
import { isPragrhya, preventsSandhi } from './sutras/1.1.11/index.js';
import { detectScript, isVrddhi } from './sutras/sanskrit-utils/index.js';

// Apply sutra-specific rules
const isWordPragrhya = isPragrhya('devau', { number: 'dual' });
const shouldPreventSandhi = preventsSandhi('devau', 'āgatau');

// Use shared utilities
const script = detectScript('देवौ');
const isVrddhiVowel = isVrddhi('ai');

console.log({ isWordPragrhya, shouldPreventSandhi, script, isVrddhiVowel });
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-sutra`)
3. Implement the sutra function and comprehensive tests
4. Commit your changes (`git commit -am 'Add sutra X.X.X implementation'`)
5. Push to the branch (`git push origin feature/new-sutra`)
6. Create a Pull Request

## Development Workflow

For each Sutra implementation:

1. **Sutra Interpretation**: Analyze the grammatical rule from the original Sanskrit text
2. **JavaScript Function Creation**: Translate the logic into a well-structured JavaScript function
3. **Comprehensive Testing**: Create extensive test cases covering all scenarios
4. **Documentation**: Document the implementation and test cases

## Project Goals

- Create a complete computational model of Panini's grammar
- Ensure accuracy through rigorous testing of each individual Sutra function
- Build a foundation for advanced Sanskrit NLP applications
- Provide a reliable JavaScript library for Sanskrit computational linguistics
- Maintain high code quality through comprehensive refactoring and shared utilities

## Current Status

✅ **Active Development** - This project has achieved significant milestones:

- **50+ Sutras Implemented** with comprehensive test coverage
- **2270+ Tests Passing** across all implemented sutras
- **Sanskrit Utilities Library** providing shared linguistic functions
- **Multi-script Support** for both IAST and Devanagari
- **Zero Code Duplication** through systematic refactoring
- **Comprehensive Documentation** with API references and usage guides

### Recent Achievements (Phase 1 Complete)
- ✅ Directory restructuring (`shared/` → `sanskrit-utils/`)
- ✅ Constants consolidation (SARVA_WORDS, special endings, interrogatives) 
- ✅ Function-level deduplication (isPragrhya chain across sutras 1.1.11-1.1.19)
- ✅ Comprehensive documentation and API references
- ✅ All 2270 tests passing with zero regressions

## Architecture

The project uses a modular architecture with:

- **Individual Sutra Modules**: Each sutra in its own directory with complete test coverage
- **Sanskrit Utils Library**: Centralized linguistic utilities and constants
- **Comprehensive Testing**: Unit tests, integration tests, and edge case coverage
- **Multi-script Support**: Seamless handling of IAST and Devanagari scripts
- **Function Consolidation**: Shared complex logic (e.g., pragrhya analysis) with backward compatibility

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on Panini's Ashtadhyayi, the foundational text of Sanskrit grammar
- Inspired by the need for computational linguistics tools for Sanskrit

## Documentation

- **[Sanskrit Utils API Documentation](SANSKRIT_UTILS_DOCUMENTATION.md)** - Comprehensive API reference
- **[Refactoring Summary](FINAL_REFACTORING_SUMMARY.md)** - Complete refactoring history and achievements
- **[Documentation Analysis](DOCUMENTATION_ANALYSIS_REPORT.md)** - Analysis of all project documentation
