# Sutra 1.3.88: अणावकर्मकाच्चित्तवत्कर्तृकात्

## Overview

**Sanskrit Text**: `अणावकर्मकाच्चित्तवत्कर्तृकात्`  
**Transliteration**: aṇāvakarmakāccittavatkartṛkāt  
**Translation**: The affixes of the Parasmaipada are used after the causative of a verb which, in its base form, was intransitive and had a sentient/rational agent, even if the result accrues to the agent.

## Purpose

Designates Parasmaipada for causatives built on akarmaka (intransitive) bases with sentient agents.

## Implementation

### Function Signature
```javascript
function sutra1388(word, context = {}) { /* ... */ }
```

### Key Features
- Requires causative (ṇic)
- Base verb must be intransitive
- Agent must be sentient/rational (cittavat)

### Dependencies
- **Sanskrit Utils**: detectScript, validateSanskritWord

## Usage Examples

### Basic Usage
```javascript
import sutra1388 from './index.js';

sutra1388('bodhayati', { hasCausative: true, baseTransitivity: 'intransitive', agentType: 'sentient' });
// → applies: true

// does not apply if baseTransitivity is 'transitive'
sutra1388('karayati', { hasCausative: true, baseTransitivity: 'transitive', agentType: 'sentient' });
```

## Test Coverage

**Test File**: `index.test.js`  
**Test Cases**: 4 tests covering positive and three rejections.

### Running Tests
```bash
npm test sutras/1.3.88
npm test sutras/1.3.88 --coverage
```

## Technical Details

- Input validation and script detection
- Causative detection
- Checks baseTransitivity and agentType fields

## Integration

- Related: 1.3.74 (causatives with agent-benefit → Ātmanepada), 1.3.86–1.3.87 (adjacent Parasmaipada rules).

---

*Generated from template: SUTRA_README_TEMPLATE.md*
