# Sutra 1.3.36: सम्माननोत्सञ्जनाचार्यकरणज्ञानभृतिविगणनव्ययेषु नियः

## Overview

**Sanskrit Text**: `सम्माननोत्सञ्जनाचार्यकरणज्ञानभृतिविगणनव्ययेषु नियः`  
**Transliteration**: sammāna-notsañjana-ācārya-karaṇa-jñāna-bhṛti-vigaṇana-vyayeṣu niyaḥ  
**Translation**: After the verb नी 'to lead', when used in the sense of 'to guide so as to render the person guided worthy', 'to lift up', 'make one a spiritual guide', 'to determine the true sense', 'to employ on wages', 'to pay debt' and 'to give as in charity', even when the fruit of the action does not accrue to the agent, the आत्मनेपद is used.

## Purpose

This sutra specifies that the verbal root नी (nī) takes आत्मनेपद endings when used in specific semantic contexts enumerated in the sutra, even when the action's benefit doesn't directly accrue to the agent. This is a comprehensive classification rule covering eight distinct semantic fields where नी requires middle voice conjugation.

## Implementation

### Function Signature
```javascript
function sutra1336(word, context = {}) {
    // Returns analysis of whether आत्मनेपद should be used
}
```

### Key Features
- Multi-script support (IAST and Devanagari) for नी root recognition
- Eight semantic context classifications with keyword matching
- Priority-ordered semantic analysis (longest keywords first)
- Object-based context inference
- Explicit semantic field designation support
- Agent benefit tracking (optional)

### Dependencies
- **Sanskrit Utils**: `detectScript`, `validateSanskritWord`
- **Shared Functions**: Script detection and validation utilities

## Usage Examples

### Basic Usage
```javascript
import { sutra1336 } from './index.js';

// Example 1: Explicit semantic field
const result1 = sutra1336('nayate', { semanticField: 'sammāna' });
console.log(result1); 
// { applies: true, isAtmanepada: true, confidence: 0.95 }

// Example 2: Meaning-based analysis
const result2 = sutra1336('nīte', { meaning: 'to guide so as to render worthy' });
console.log(result2); 
// { applies: true, isAtmanepada: true, confidence: 0.95 }
```

### Advanced Usage
```javascript
// Devanagari with specific context
const result3 = sutra1336('नयति', { 
  meaning: 'employ on wages',
  object: 'worker'
});

// Complex semantic analysis
const result4 = sutra1336('sammānanayate', { 
  meaning: 'guides so as to render the person worthy of honor',
  benefitsAgent: false
});

// Object-based inference
const result5 = sutra1336('nayati', { 
  object: 'debt',
  meaning: 'settle financial obligation'
});
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 53 tests covering:
- Input validation (3 tests)
- IAST root recognition (5 tests)
- Devanagari root recognition (5 tests)
- Eight semantic context analyses (24 tests)
- Combined analysis cases (8 tests)
- Edge cases (5 tests)
- Agent benefit analysis (2 tests)
- Integration tests (2 tests)
- Performance and reliability (2 tests)

### Running Tests
```bash
# Run this sutra's tests
npm test sutras/1.3.36

# Run with coverage
npm test sutras/1.3.36 --coverage
```

## Technical Details

### Algorithm
1. **Input Validation**: Validates Sanskrit word format and script detection
2. **Root Recognition**: Identifies नी root using comprehensive pattern matching
3. **Semantic Analysis**: Evaluates eight specific contexts:
   - **sammāna**: guidance for worthiness/honor
   - **utsañjana**: lifting up/elevation
   - **ācārya**: making spiritual guides/teachers
   - **karaṇa**: determination/establishment
   - **jñāna**: knowledge/true sense
   - **bhṛti**: employment/wages
   - **vigaṇana**: debt payment/discharge
   - **vyaya**: charity/donation
4. **Priority Matching**: Longest keywords matched first for specificity
5. **Confidence Calculation**: Combines root and context confidence scores

### Performance
- **Time Complexity**: O(n) where n is keyword count (typically < 50)
- **Space Complexity**: O(1) - constant memory usage
- **Optimization Notes**: Sorted keyword matching, early termination patterns

### Edge Cases
- Mixed script handling with confidence reduction
- Compound word recognition for complex formations
- Multiple keyword detection with priority ordering
- Object-based context inference as fallback
- Agent benefit tracking (doesn't affect applicability)

## Integration

### Related Sutras
- **1.3.35**: अकर्मकाच्च - Related आत्मनेपद designation for वि + कृ
- **1.3.37**: कर्तृस्थे चाशरीरे कर्मणि - Following sutra for नी with incorporeal objects
- **1.3.38-39**: वृत्तिसर्गतायनेषु क्रमः, उपपराभ्याम् - Related आत्मनेपद series for क्रम्

### Used By
- Verbal conjugation systems requiring voice determination for नी
- Semantic analysis engines processing contextual verb meanings
- Grammar engines implementing comprehensive Paninian voice rules

## Semantic Contexts

### 1. sammāna (सम्मान) - Honor/Worthiness
- **Keywords**: guide, render worthy, make worthy, honor, respect, dignity
- **Context**: Guiding someone to become worthy of respect
- **Confidence**: 0.95

### 2. utsañjana (उत्सञ्जन) - Lifting Up
- **Keywords**: lift up, elevate, raise up, uplift, exalt
- **Context**: Physical or metaphorical elevation
- **Confidence**: 0.95

### 3. ācārya (आचार्य) - Spiritual Teaching
- **Keywords**: spiritual guide, teacher, make teacher, guru, instructor
- **Context**: Making someone into a spiritual guide or teacher
- **Confidence**: 0.95

### 4. karaṇa (करण) - Determination
- **Keywords**: determine, ascertain, establish, decide, resolve
- **Context**: Establishing or determining something definitively
- **Confidence**: 0.9

### 5. jñāna (ज्ञान) - Knowledge
- **Keywords**: true sense, knowledge, understanding, wisdom, realization
- **Context**: Leading to true knowledge or understanding
- **Confidence**: 0.9

### 6. bhṛti (भृति) - Employment
- **Keywords**: employ, wages, salary, hire, employment
- **Context**: Employment relationships and wage-based work
- **Confidence**: 0.95

### 7. vigaṇana (विगणन) - Debt Payment
- **Keywords**: pay debt, discharge debt, settle debt, repay, payment, discharge, obligation
- **Context**: Settling debts or discharging financial obligations
- **Confidence**: 0.95

### 8. vyaya (व्यय) - Expenditure/Charity
- **Keywords**: charity, give, donation, expenditure, spend
- **Context**: Charitable giving or expenditure for others
- **Confidence**: 0.9

## References

- **Panini's Ashtadhyayi**: 1.3.36 सम्माननोत्सञ्जनाचार्यकरणज्ञानभृतिविगणनव्ययेषु नियः
- **Implementation Notes**: Comprehensive semantic analysis following traditional enumeration with modern contextual flexibility
- **Test References**: Based on classical examples and semantic field analysis from Sanskrit grammar texts

---

*Generated from template: SUTRA_README_TEMPLATE.md*
