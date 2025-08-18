# Sutra 1.2.39: स्वरितात् संहितायामनुदात्तानाम्

## Summary
**From svarita: in saṃhitā, of anudātta vowels (monotone assimilation)**

This sutra governs the assimilation of anudātta (low-tone) vowels that immediately follow a svarita (circumflex accent) vowel in continuous sandhi recitation (saṃhitā). The rule creates a monotone extension from the svarita through consecutive anudātta vowels, facilitating smooth prosodic flow in connected speech.

## Technical Implementation

### Core Function
```javascript
import sutra1239 from './index.js';

const result = sutra1239('vā̂ìti', { sandhi: true });
// Returns comprehensive analysis with assimilation decisions
```

### Key Features

#### 1. Sandhi Context Detection
- **Explicit Context**: Recognizes `sandhi`, `saṃhitā`, or `continuous_recitation` flags
- **Implicit Markers**: Detects consonant clusters and vowel sequences indicating sandhi
- **Phonetic Continuity**: Analyzes vowel density and continuity patterns

#### 2. Accent Sequencing Analysis
- **Unicode Normalization**: Handles both NFD and NFC character compositions
- **Combining Character Support**: Properly processes decomposed accent marks
- **Svarita-Anudātta Detection**: Identifies qualifying accent sequences

#### 3. Assimilation Pattern Recognition
- **Single Spans**: Basic svarita→anudātta sequences
- **Multiple Spans**: Complex texts with multiple assimilation sites
- **Position Tracking**: Maintains character position information

#### 4. Domain Restrictions
- **Subrahmaṇyā Contexts**: Blocks assimilation in deity-specific domains
- **Vedic Hymn Contexts**: Respects traditional recitation restrictions
- **Ritual Contexts**: Honors ceremonial accent preservation rules

### Implementation Architecture

#### Phase 1: Sandhi Detection
```javascript
const analysis = {
  sandhiDetection: {
    hasSandhiContext: true,
    contextType: 'explicit',
    sandhiMarkers: ['consonant-clusters'],
    applicabilityReason: 'Explicit sandhi context provided'
  }
}
```

#### Phase 2: Accent Sequencing
```javascript
const analysis = {
  accentSequencing: {
    hasSvaritaAnudattaPattern: true,
    accentSequence: [
      { position: 1, vowel: 'ā̂', accentType: 'svarita' },
      { position: 4, vowel: 'ì', accentType: 'anudātta' }
    ],
    svaritaAnudattaSpans: [...],
    spanCount: 1,
    totalAnudattaVowels: 1
  }
}
```

#### Phase 3: Assimilation Analysis
```javascript
const analysis = {
  assimilationAnalysis: {
    assimilationRequired: true,
    assimilationCount: 1,
    assimilationSpans: [{
      startPosition: 1,
      endPosition: 4,
      assimilationType: 'monotone-extension',
      targetTone: 'low-monotone'
    }],
    patternType: 'single-span'
  }
}
```

#### Phase 4: Domain Restriction Check
```javascript
const analysis = {
  domainRestriction: {
    isBlocked: false,
    blockingFactors: [],
    blockingReason: 'No domain restrictions detected'
  }
}
```

### Usage Examples

#### Basic Assimilation
```javascript
const result = sutra1239('vā̂ìti', { sandhi: true });
expect(result.hasAssimilation).toBe(true);
expect(result.primaryDecision).toBe('monotone-assimilation');
```

#### Domain Blocking
```javascript
const result = sutra1239('vā̂ìti', { 
  sandhi: true, 
  subrahmanya: true 
});
expect(result.hasAssimilation).toBe(false);
expect(result.analysis.phases.domainRestriction.isBlocked).toBe(true);
```

#### Multiple Spans
```javascript
const result = sutra1239('sā̂dàkùm rā̂jàkùm', { sandhi: true });
expect(result.analysis.phases.accentSequencing.spanCount).toBe(2);
expect(result.analysis.phases.assimilationAnalysis.patternType).toBe('multiple-spans');
```

### Script Support

#### IAST (International Alphabet of Sanskrit Transliteration)
- **Svarita**: `ā̂` (circumflex accent)
- **Anudātta**: `ì` (grave accent)
- **Combining Characters**: Proper handling of NFD decomposed forms

#### Devanagari
- **Accent Marks**: Support for Devanagari accent notation
- **Multi-script Input**: Graceful handling of mixed script texts

### Advanced Features

#### Unicode Character Handling
- **NFC/NFD Normalization**: Consistent processing of composed and decomposed characters
- **Combining Mark Detection**: Proper grouping of base vowels with accent marks
- **Position Tracking**: Accurate character position maintenance

#### Prosodic Analysis
- **Monotone Rules**: Generation of appropriate prosodic instructions
- **Sandhi-aware Recitation**: Contextual accent application
- **Traditional Commentary**: Scholarly interpretation and application notes

### Testing Coverage
- **46 comprehensive test cases** covering all functionality
- **Accent Pattern Recognition**: Thorough testing of svarita-anudātta sequences
- **Domain Restriction Logic**: Complete validation of blocking conditions
- **Edge Case Handling**: Robust processing of unusual inputs
- **Multi-script Compatibility**: Cross-script validation

### Performance Characteristics
- **Character-by-character Analysis**: Efficient Unicode processing
- **Lazy Evaluation**: Only necessary analysis phases executed
- **Memory Efficient**: Minimal object allocation for large texts
- **Confidence Scoring**: Probabilistic assessment of rule applicability

## Linguistic Background

### Traditional Context
In traditional Sanskrit recitation, this sutra ensures smooth prosodic flow by eliminating abrupt accent changes within close phonetic juncture. The monotone assimilation creates natural phonetic bridges that facilitate continuous recitation without losing the essential accent distinctions.

### Scholastic Commentary
The Mahābhāṣya commentary explains that this assimilation applies specifically in saṃhitā (continuous recitation) contexts where the natural accent flow would otherwise create jarring transitions. The rule preserves the essential accent information while allowing for phonetic smoothness.

### Modern Application
This implementation provides both traditional accent preservation and modern computational analysis, supporting both scholarly research and practical recitation guidance.

## Related Sutras
- **1.2.37**: न सुब्रह्मण्यायां स्वरितस्य तूदात्तः (Subrahmaṇyā domain rules)
- **1.2.38**: देवब्रह्मणोरनुदात्तः (Lexical anudātta overrides)
- **1.2.40**: Additional sandhi assimilation rules

## References
- Ashtadhyayi 1.2.39: स्वरितात् संहितायामनुदात्तानाम्
- Mahābhāṣya commentary on sandhi assimilation
- Traditional Sanskrit prosody manuals for saṃhitā contexts
- Whitney's Sanskrit Grammar, Chapter on Accent
- Macdonell's Vedic Grammar on prosodic rules
