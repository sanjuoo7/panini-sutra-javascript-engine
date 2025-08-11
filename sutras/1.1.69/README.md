# Sutra 1.1.69: अणुदित् सवर्णस्य चाप्रत्ययः

## Sanskrit Text
```
अणुदित् सवर्णस्य चाप्रत्ययः
```

## Transliteration (IAST)
```
aṇudit savarṇasya cāpratyayaḥ
```

## English Translation
"When अण् and उदित् [letters] have the same place of articulation [with other letters], they are also [considered] non-suffixes."

## Detailed Explanation

This sutra extends the अप्रत्यय (non-suffix) designation to letters that are **सवर्ण** (homorganic - same place of articulation) with:
- **अण्** letters (vowels)
- **उदित्** letters (consonants marked with उकार)

### Core Principle
Letters sharing the same place of articulation (स्थान) with अण् and उदित् letters are also considered अप्रत्यय, extending the scope of the previous sutras through phonetic relationships.

### सवर्ण Classifications

#### 1. Guttural (कण्ठ्य)
- **Consonants**: क, ख, ग, घ, ङ
- **Vowels**: अ, आ
- **सवर्ण Relationship**: All share the throat (कण्ठ) as place of articulation

#### 2. Palatal (तालव्य)
- **Consonants**: च, छ, ज, झ, ञ
- **Vowels**: इ, ई, ए, ऐ
- **सवर्ण Relationship**: All share the hard palate (तालु) as place of articulation

#### 3. Retroflex (मूर्धन्य)
- **Consonants**: ट, ठ, ड, ढ, ण
- **Vowels**: ऋ, ॠ
- **सवर्ण Relationship**: All share the retroflex area (मूर्धा) as place of articulation

#### 4. Dental (दन्त्य)
- **Consonants**: त, थ, द, ध, न, ल, स
- **सवर्ण Relationship**: All share the teeth (दन्त) as place of articulation

#### 5. Labial (ओष्ठ्य)
- **Consonants**: प, फ, ब, भ, म
- **Vowels**: उ, ऊ, ओ, औ
- **सवर्ण Relationship**: All share the lips (ओष्ठ) as place of articulation

### Examples

#### अण् सवर्ण Examples
1. **क with अ**: क is सवर्ण with अ (both guttural) → क is अप्रत्यय
2. **च with इ**: च is सवर्ण with इ (both palatal) → च is अप्रत्यय
3. **प with उ**: प is सवर्ण with उ (both labial) → प is अप्रत्यय

#### उदित् सवर्ण Examples
1. **ख with कु**: ख is सवर्ण with क (from कु) → ख is अप्रत्यय
2. **ज with चु**: ज is सवर्ण with च (from चु) → ज is अप्रत्यय
3. **भ with पु**: भ is सवर्ण with प (from पु) → भ is अप्रत्यय

## Dependencies

This sutra builds upon:
- **1.1.68**: स्वं रूपं शब्दस्याशब्दसंज्ञा (metalinguistic principle)
- Traditional phonetic classifications from Śivasūtras
- Established अण् and उदित् letter designations

## Usage

```javascript
import { 
  areSavarna,
  isApratyayaBySavarna,
  analyzeSavarnaRelationship 
} from './index.js';

// Check if two letters are सवर्ण
const homorganic = areSavarna('क', 'अ');

// Check if letter is अप्रत्यय by सवर्ण relationship
const isApratyaya = isApratyayaBySavarna('क');

// Get comprehensive सवर्ण analysis
const analysis = analyzeSavarnaRelationship('च');
```

## Functions

### `areSavarna(phoneme1, phoneme2)`
Determines if two phonemes share the same place of articulation.

**Parameters:**
- `phoneme1` (string): First phoneme
- `phoneme2` (string): Second phoneme

**Returns:** `boolean` - true if phonemes are सवर्ण

### `isAnLetter(letter)`
Checks if a letter belongs to the अण् class (vowels).

**Returns:** `boolean` - true if letter is अण्

### `isUditLetter(letter)`
Checks if a letter is उदित् (marked with उकार).

**Returns:** `boolean` - true if letter is उदित्

### `isApratyayaBySavarna(phoneme, context)`
Determines if a phoneme is अप्रत्यय based on सवर्ण relationship with अण् or उदित् letters.

**Returns:** `boolean` - true if phoneme is अप्रत्यय according to this sutra

### `analyzeSavarnaRelationship(phoneme, context)`
Provides comprehensive analysis of सवर्ण relationships.

**Returns:** Object with:
- `phoneme` (string): The analyzed phoneme
- `script` (string): Detected script
- `isApratyaya` (boolean): Whether it's अप्रत्यय
- `savarnaWithAn` (string[]): सवर्ण अण् letters
- `savarnaWithUdit` (string[]): सवर्ण उदित् letters
- `articulationPlace` (string): Place of articulation
- `reasoning` (string[]): Analysis explanation
- `sutraReference` (string): Reference to this sutra

### `getSavarnaGroup(phoneme)`
Returns the complete सवर्ण group for a phoneme.

**Returns:** `string[]` - Array of सवर्ण phonemes

### `getSavarnaApratyayaExamples()`
Provides traditional examples demonstrating the sutra.

## Technical Implementation

The implementation provides:
- **Comprehensive सवर्ण Groups**: Complete phonetic classifications for both Devanagari and IAST
- **Traditional Accuracy**: Based on classical phonetic analysis
- **Script Support**: Full support for both scripts
- **Performance**: Efficient lookup mechanisms
- **Error Handling**: Graceful handling of invalid inputs

## Test Coverage

- ✅ सवर्ण relationship detection across all articulation places
- ✅ अण् and उदित् letter identification
- ✅ अप्रत्यय determination by सवर्ण relationship
- ✅ Comprehensive analysis functionality
- ✅ Script compatibility (Devanagari/IAST)
- ✅ Error handling for edge cases
- ✅ Integration tests across all functions
- ✅ Traditional examples validation

## Linguistic Notes

This sutra demonstrates the sophisticated phonetic understanding in Pāṇinian grammar, where articulatory relationships determine grammatical classifications. The सवर्ण principle ensures that phonetically related sounds are treated consistently in grammatical analysis.

The extension to सवर्ण letters prevents gaps in coverage and maintains phonetic coherence in the अप्रत्यय system. This reflects the deep integration of phonetics and grammar in Sanskrit linguistic theory.

## Historical Context

The सवर्ण classification represents one of the earliest systematic approaches to phonetic analysis, predating modern articulatory phonetics by over two millennia. This sutra showcases the precision with which ancient grammarians understood sound production and its relevance to grammatical structure.

## Related Sutras

- **1.1.9**: तुल्यास्य प्रयत्नं सवर्णम् (traditional सवर्ण definition)
- **1.1.50**: स्थानेऽन्तरतमः (proximity in substitution)
- Various sandhi rules based on सवर्ण relationships
