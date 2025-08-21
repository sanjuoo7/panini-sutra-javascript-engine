# Sutra 1.2.62: विशाखयोश्च (viśākhayoś ca)

## Sanskrit Text
**विशाखयोश्च**

## Transliteration
**viśākhayoś ca**

## Translation
"And also of Viśākhā (in the dual)"

## Domain
Vedic prosody and astronomical terminology - nakshatra number optionality

## Purpose
This sutra extends the principle established in Sutra 1.2.61 specifically for the Viśākhā nakshatra. In chandas (Vedic metrical contexts), the dual form of Viśākhā may optionally be expressed in singular to accommodate metrical requirements while maintaining astronomical reference clarity.

## Technical Analysis

### Grammatical Scope
- **Target**: Viśākhā nakshatra (dual forms)
- **Operation**: Optional singular representation
- **Context**: Chandas (Vedic metrical poetry)
- **Constraint**: Astronomical nakshatra domain

### Semantic Framework
1. **Viśākhā Recognition**: Multi-script identification of Viśākhā star
2. **Chandas Context**: Vedic metrical environment validation  
3. **Domain Validation**: Astronomical/nakshatra context requirement
4. **Number Optionality**: Dual-to-singular transformation permission

### Implementation Requirements
- Comprehensive Viśākhā variant recognition (IAST, Devanagari, romanized)
- Chandas context detection and validation
- Metrical constraint analysis for prosodic optimization
- Multi-script support with script-specific handling
- Prior result integration for complex astronomical contexts

## Test Cases

### Positive Cases
- `viśākhā` in chandas nakshatra context → applied with dual-singular options
- `विशाखा` in Devanagari with astronomical domain → applied
- Various romanized forms (`vishakha`, `visaakha`) → recognized and applied
- Complex metrical contexts with specific Vedic meters → metrical analysis

### Negative Cases  
- Viśākhā without chandas flag → not applied
- Non-nakshatra domain → rejected
- Other nakshatras (`rohiṇī`, `phalgunī`) → not applicable
- Invalid input (null, empty) → handled gracefully

### Edge Cases
- Mixed script input → normalized and processed
- Partial matches → lower confidence scoring
- Prior result conflicts → integrated systematically
- Complex astronomical contexts → comprehensive analysis

## Metrical Integration
- **Gayatri Meter**: Supports singular compression for syllable economy
- **Trishtubh Meter**: Flexible dual-singular choice based on prosodic needs
- **Jagati Meter**: Enhanced dual forms with metrical guidance
- **Anushtubh Meter**: Constrained meter favoring singular forms
- **Brihati Meter**: Balanced approach with contextual optimization

## Prior Result Integration
- **Sutra 1.2.60**: Coordinates with Phalgunī-Proṣṭhapadā nakshatra rules
- **Sutra 1.2.61**: Harmonizes with Punarvasu chandas principles
- **Sutra 1.2.63**: Defers to any enforced dual requirements

## Output Structure
```javascript
{
  applied: boolean,
  numberOptions: ['dual', 'singular'] | ['singular', 'dual'],
  defaultForm: 'dual' | 'singular',
  confidence: number, // 0.0-1.0
  
  // Analysis phases
  chandasAnalysis: { contextType, validChandas, metricalFeatures },
  domainAnalysis: { validDomain, domainType, astronomicalContext },
  visakhayaAnalysis: { isVisakha, recognitionType, scriptMatch },
  metricalAnalysis: { constraints, flexibility, prosodyAnalysis },
  
  // Integration and guidance
  integrationAnalysis: { priorIntegration, conflicts, enhancements },
  alternatives: [{ form, number, usage, confidence }],
  prosodyGuidance: { recommendations, metricalSuggestions }
}
```

## Implementation Status
- **Phase**: Comprehensive Enhancement (Phase 3a)
- **Architecture**: 8-phase analysis pipeline
- **Test Coverage**: 55+ comprehensive test cases
- **Multi-script Support**: IAST, Devanagari, romanized variants
- **Performance**: Optimized for real-time astronomical text analysis
