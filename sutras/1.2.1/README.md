# Sutra 1.2.1: गाङ्कुटादिभ्योऽञ्णिन्ङ् इत्

**Sanskrit Text**: गाङ्कुटादिभ्योऽञ्णिन्ङ् इत्  
**IAST Transliteration**: gāṅkuṭādibhyo'ñaṇinṅa ita  
**English Translation**: "All affixes after गाङ्, कुट्, etc. are ङित्, except ञित् and णित् affixes"

## Description

This sutra establishes a metarule (अतिदेश) that governs how certain affixes behave after specific verbal roots. When affixes follow roots from the गाङ्कुटादि class, they are treated as if they have an indicatory ङ् (ङित्), which affects their grammatical behavior in accent, sandhi, and other operations.

## Rule Details

### **Type**: अतिदेश (Extended Application/Metarule)
### **Category**: Affix Behavior Classification

### **Scope**
- **Applies to**: Affixes following verbal roots from the गाङ्कुटादि class
- **Primary roots**: गाङ् (to study), कुट् (to be crooked)
- **Extended class (आदि)**: Includes additional roots like पठ्, वच्, तप्, यज्, etc.

### **Conditions**
1. **Root must be from गाङ्कुटादि class**
2. **Affix must follow the root**
3. **Affix must NOT have indicatory ञ् (ञित्) or ण् (णित्)**

### **Result**
- Qualifying affixes are treated as ङित् (having indicatory ङ्)
- This affects accent placement, sandhi rules, and morphological operations

## Implementation

### Core Functions

#### `isNgitByGangkutadi(root, affix, context = {})`
**Purpose**: Determines if an affix should be treated as ङित् according to this sutra  
**Parameters**:
- `root` (string): The verbal root
- `affix` (string): The affix following the root
- `context` (Object): Optional additional context

**Returns**: `boolean` - True if affix should be treated as ङित्

#### `isGangkutadiRoot(root)`
**Purpose**: Checks if a root belongs to the गाङ्कुटादि class  
**Parameters**:
- `root` (string): The verbal root to check

**Returns**: `boolean` - True if root triggers ङित् behavior

#### `hasExcludedIndicatory(affix)`
**Purpose**: Checks if affix has indicatory ञ् or ण् (excluded from ङित् treatment)  
**Parameters**:
- `affix` (string): The affix to check

**Returns**: `boolean` - True if affix has excluded indicatory

### Supporting Functions

#### `analyzeNgitStatus(combinations)`
**Purpose**: Analyzes ङित् status for multiple root-affix combinations  
**Parameters**:
- `combinations` (Array): Array of {root, affix} objects

**Returns**: Object with analysis results

#### `getGangkutadiExamples()`
**Purpose**: Provides comprehensive examples and technical notes  
**Returns**: Object with examples, explanations, and traditional references

## Examples

### Positive Cases (ङित् Applied)
```javascript
isNgitByGangkutadi('गाङ्', 'ति') // → true
isNgitByGangkutadi('कुट्', 'त')   // → true  
isNgitByGangkutadi('पठ्', 'अ')   // → true (आदि root)
```

### Negative Cases (ङित् Not Applied)
```javascript
isNgitByGangkutadi('गाङ्', 'ञ्')  // → false (ञित् excluded)
isNgitByGangkutadi('गाङ्', 'ण्')  // → false (णित् excluded)
isNgitByGangkutadi('भू', 'ति')   // → false (not गाङ्कुटादि root)
```

### Multi-script Support
```javascript
isNgitByGangkutadi('gāṅ', 'ti')  // → true (IAST)
isNgitByGangkutadi('kuṭ', 't')   // → true (IAST)
```

## Traditional Context

### Grammatical Significance
- **ङित् designation** affects accent placement (अनुदात्त after ङित्)
- **Sandhi operations** may be modified for ङित् affixes  
- **Morphological analysis** uses ङित् classification for rule application

### Related Sutras
- **1.1.5**: क्ङिति च (Establishes general ङित् behavior)
- **3.4.113**: तिङ्शित्सार्वधातुकम् (सार्वधातुक classification)
- **1.2.4**: सार्वधातुकमपित् (सार्वधातुक vs अपित् distinction)

### गाङ्कुटादि Root List
The sutra uses **आदि** to indicate additional roots beyond गाङ् and कुट्:
- **गाङ्** (gāṅ): to study, to count
- **कुट्** (kuṭ): to be crooked, to bend
- **पठ्** (paṭh): to read, study
- **वच्** (vac): to speak
- **तप्** (tap): to heat, practice austerity
- **यज्** (yaj): to sacrifice
- **रक्ष्** (rakṣ): to protect
- And others following similar patterns

## Dependencies

### Sanskrit Utils
- `detectScript()`: Script detection for cross-script support
- `isValidSanskritWord()`: Input validation

### Constants
- `GANGKUTADI_ROOTS`: Devanagari root list
- `GANGKUTADI_ROOTS_IAST`: IAST root list  
- `EXCLUDED_AFFIX_PATTERNS`: ञित्/णित् patterns

## Testing

The implementation includes comprehensive tests covering:
- **Positive cases**: All गाङ्कुटादि roots with regular affixes
- **Negative cases**: Excluded ञित्/णित् affixes and non-गाङ्कुटादि roots
- **Cross-script scenarios**: Mixed Devanagari/IAST inputs
- **Error handling**: Invalid inputs and edge cases
- **Integration tests**: Consistency across all functions
- **Traditional examples**: Cases from classical grammar texts

## Usage in Rule Engine

This sutra is fundamental for:
1. **Affix classification** in morphological analysis
2. **Accent determination** for verbal forms
3. **Sandhi rule selection** based on ङित् status
4. **Grammatical parsing** of Sanskrit text

---

*This implementation follows the traditional understanding of Panini's grammar while providing modern computational accessibility.*
