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
```

## Features

- **Individual Sutra Implementation**: Each Panini Sutra is implemented as a standalone, well-tested JavaScript function
- **Comprehensive Testing**: Each function includes extensive unit tests covering positive cases, negative cases, edge cases, and corner cases
- **Modular Design**: Each sutra is contained in its own module for easy maintenance and testing
- **Rule Engine Foundation**: Building blocks for a complete Panini Rule Engine

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/panini-sutra-javascript-engine.git
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
npm test sutras/1.1.1
```

## Usage

```javascript
// Example usage of a Panini Sutra function
const { sutra1_1_1 } = require('./sutras/1.1.1');

// Apply the rule
const result = sutra1_1_1(inputWord, context);
console.log(result);
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on Panini's Ashtadhyayi, the foundational text of Sanskrit grammar
- Inspired by the need for computational linguistics tools for Sanskrit

## Status

🚧 **Work in Progress** - This project is actively being developed. Currently implementing individual Sutras with comprehensive test coverage.
