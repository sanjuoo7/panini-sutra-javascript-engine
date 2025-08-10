# Shared Utilities Architecture

## Overview

The sanskrit-utils utilities have been organized into focused modules to improve maintainability and reduce code duplication across all Panini sutras. This modular approach replaces the monolithic 533-line `sanskrit-utils-utils.js` file.

## Module Structure

```
sutras/sanskrit-utils/
├── index.js              # Main export file with all utilities
├── constants.js          # Sanskrit language constants and data
├── script-detection.js   # Script detection and analysis utilities  
├── phoneme-tokenization.js # Robust phoneme tokenization functions
├── classification.js     # Vowel/consonant classification functions
├── vowel-analysis.js     # Advanced vowel analysis and transformations
└── validation.js         # Input validation and error handling
```

## Module Details

### constants.js (98 lines)
- **SanskritVowels**: IAST and Devanagari vowel definitions
- **SanskritConsonants**: Complete consonant mappings
- **VowelGradations**: guṇa/vṛddhi transformation rules

### script-detection.js (87 lines)  
- **detectScript()**: Identifies IAST vs Devanagari
- **isDevanagari()**: Boolean script check
- **analyzeScript()**: Detailed script analysis

### phoneme-tokenization.js (143 lines)
- **tokenizePhonemes()**: Auto-detecting tokenizer
- **tokenizeIastPhonemes()**: IAST-specific tokenization 
- **tokenizeDevanagariPhonemes()**: Devanagari tokenization
- **analyzePhonemeStructure()**: Structural analysis

### classification.js (118 lines)
- **isVowel()**, **isConsonant()**: Basic classification
- **isVrddhi()**, **isGuna()**, **isIkVowel()**: Sutra-specific checks
- **getVowelClassifications()**: Comprehensive classification

### vowel-analysis.js (221 lines)
- **analyzeVowel()**: Detailed vowel analysis
- **getFirstVowel()**, **getAllVowels()**: Extraction functions
- **applyGunaTransformation()**, **applyVrddhiTransformation()**: Gradation
- **getGunaVrddhiScope()**: Cross-sutra scope analysis

### validation.js (198 lines)
- **validateSanskritWord()**: Input validation
- **validatePhonemeSequence()**: Sequence validation
- **sanitizeInput()**: Input cleaning and normalization
- **withErrorHandling()**: Error handling wrapper

## Import Patterns

### Option 1: Direct Module Imports (Recommended)
```javascript
import { detectScript } from './sanskrit-utils/script-detection.js';
import { tokenizePhonemes } from './sanskrit-utils/phoneme-tokenization.js';
import { isVrddhi, isGuna } from './sanskrit-utils/classification.js';
```

### Option 2: Index File Imports
```javascript
import { 
  detectScript, 
  tokenizePhonemes, 
  isVrddhi, 
  isGuna 
} from './sanskrit-utils/index.js';
```

### Option 3: Core Utils Bundle
```javascript
import { CoreUtils } from './sanskrit-utils/index.js';
// Access as CoreUtils.detectScript(), CoreUtils.tokenizePhonemes(), etc.
```

## Migration Benefits

### Code Reduction
- **1.1.1**: 113 → 89 lines (21% reduction) 
- **Expected total**: 126+ lines saved across all sutras
- **Maintainability**: Single source of truth for sanskrit-utils logic

### Enhanced Functionality
- Robust phoneme tokenization fixes multi-character IAST handling
- Comprehensive validation prevents runtime errors
- Advanced vowel analysis supports complex operations

### Better Organization
- Focused modules are easier to test and maintain
- Clear separation of concerns
- Consistent API across all sutras

## Refactoring Priority

1. **Sutra 1.1.2**: Replace guṇa vowel constants and `analyzeVowel()` 
2. **Sutra 1.1.3**: Integrate tokenization and ik vowel classification
3. **Sutra 1.1.4**: Apply sanskrit-utils validation and analysis utilities
4. **Sutra 1.1.5**: Leverage enhanced phoneme handling

## Testing Strategy

All sanskrit-utils utilities maintain backward compatibility with existing tests while providing enhanced functionality for new implementations.

---

*Created: August 8, 2025*  
*Total lines organized: 865 → 6 focused modules*  
*Code duplication eliminated: 145+ lines across sutras*
