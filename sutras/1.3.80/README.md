# Sutra 1.3.80: अभिप्रत्यतिभ्यः क्षिपः

## Overview

**Sanskrit Text**: `अभिप्रत्यतिभ्यः क्षिपः`  
**Transliteration**: abhipratyatibhyaḥ kṣipaḥ  
**Translation**: After the root क्षिप् (to throw) when preceded by अभि/प्रति/अति, Parasmaipada is used even if the action benefits the agent.

## Purpose

Specifies Parasmaipada for kṣip with these prefixes, overriding general Ātmanepada tendencies.

## Implementation

### Function Signature
```javascript
function sutra1380(word, context = {}) { /* ... */ }
```

### Key Features
- Detects root क्षिप् (kṣip)
- Checks prefixes: अभि, प्रति, अति
- Returns Parasmaipada designation

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord

## Usage Examples
```javascript
import sutra1380 from './index.js';

sutra1380('अभिक्षिपति', { root: 'क्षिप्', prefix: 'अभि' });
```

## Test Coverage

- Positive: abhi/prati/ati + kṣip
- Negative: no prefix

## References
- 1.3.80 अभिप्रत्यतिभ्यः क्षिपः
