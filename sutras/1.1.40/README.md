# Sutra 1.1.40: क्त्वातोसुन्कसुनः (ktvātosuṅkasunḥ)

## Text
**Sanskrit**: क्त्वातोसुन्कसुनः  
**IAST**: ktvātosuṅkasunḥ  
**Translation**: The words ending in क्त्व (ktvā), तोसुन् (tosun), and कसुन् (kasun) are अव्यय (avyaya/indeclinables).

## Purpose
This sutra specifically classifies words ending in three particular affixes as अव्यय (indeclinable words), building upon the general avyaya classification system established in previous sutras.

## Technical Analysis

### Qualifying Affixes
1. **क्त्व (ktvā)**: Absolutive/gerund affix
   - Most common form: words ending in -tvā
   - Alternative form: words ending in -ya
   - Examples: gatvā (having gone), kṛtvā (having done), bhuktvā (having eaten)

2. **तोसुन् (tosun)**: Specialized verbal derivative affix
   - Less common in classical Sanskrit
   - Specific grammatical formation

3. **कसुन् (kasun)**: Specialized verbal derivative affix  
   - Rare in classical usage
   - Specialized formations

### Function Implementation

#### Core Function: `applySutra1_1_40(word, context)`
```javascript
// Analyzes if a word qualifies as avyaya under this sutra
const result = applySutra1_1_40('gatvā', { affixes: ['ktvā'] });
// Returns: { applies: true, avyaya_status: true, affix_type: 'ktvā', ... }
```

#### Affix Analysis: `analyzeQualifyingAffixes(word, context)`
- Detects qualifying affixes from context or pattern matching
- Supports both romanized and Devanagari affix notation
- Returns detailed affix information

#### Ktvā Detection: `isKtvaForm(word, context)`
- Specialized detection for ktvā (absolutive) forms
- Handles common patterns: -tvā, -ya, -itvā, -etvā
- Uses context clues for identification

## Examples

### Common Ktvā Forms (Absolutives)
```javascript
applySutra1_1_40('gatvā');    // having gone - avyaya
applySutra1_1_40('kṛtvā');    // having done - avyaya  
applySutra1_1_40('bhuktvā');  // having eaten - avyaya
applySutra1_1_40('dṛṣṭvā');   // having seen - avyaya
applySutra1_1_40('śrutvā');   // having heard - avyaya
```

### Alternative Ya Forms
```javascript
applySutra1_1_40('gaccya');   // having gone (ya variant) - avyaya
applySutra1_1_40('kurya');    // having done (ya variant) - avyaya
```

### Context-Based Detection
```javascript
const context = {
    affixes: ['ktvā'],
    word_type: 'absolutive',
    root: 'gam',
    meaning: 'having gone'
};

applySutra1_1_40('gatvā', context);
// Enhanced analysis with contextual information
```

## Linguistic Significance

### Absolutive Function
- Ktvā forms express completed action before main verb
- "Having done X, then Y" construction
- Essential for sequential action description in Sanskrit

### Invariant Nature
- All forms classified by this sutra remain unchanged
- No case, number, or gender variation
- Function as connective elements in sentences

### Integration with Grammar
- Complements other avyaya classification sutras (1.1.37-1.1.41)
- Part of comprehensive indeclinable word system
- Essential for understanding Sanskrit sentence structure

## Usage Patterns

### Sequential Actions
```sanskrit
गत्वा गृहं भोजनं कृत्वा शयनं गच्छति
gatvā gṛhaṃ bhojanaṃ kṛtvā śayanaṃ gacchati
"Having gone home, having eaten food, (he) goes to sleep"
```

### Connecting Clauses
- Ktvā forms connect related actions
- Express temporal or logical sequence
- Essential for complex sentence construction

## Implementation Features

### Pattern Recognition
- Multiple pattern matching for affix detection
- Case-insensitive analysis
- Support for variant forms

### Context Integration
- Uses provided affix information when available
- Falls back to pattern matching
- Validates against known forms

### Error Handling
- Graceful handling of invalid input
- Clear reasoning for non-qualifying words
- Comprehensive validation system

## Testing Coverage

### Test Categories
1. **Core Functionality**: Basic affix detection and classification
2. **Pattern Recognition**: Various affix pattern matching
3. **Context Integration**: Using provided grammatical context
4. **Real Examples**: Classical Sanskrit word analysis
5. **Edge Cases**: Error handling and boundary conditions
6. **Integration**: Compatibility with other sutra implementations

### Test Statistics
- **Total Tests**: 47 comprehensive test cases
- **Coverage**: Core functions, edge cases, real examples
- **Validation**: Pattern matching, context usage, error handling

This implementation provides a robust foundation for identifying and classifying words with ktvā, tosun, and kasun affixes as indeclinable elements in Sanskrit grammatical analysis.
