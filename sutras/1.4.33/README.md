# Sutra 1.4.33: रुच्यर्थानां प्रीयमाणः

## Overview
**Sanskrit Text**: `रुच्यर्थानां प्रीयमाणः`  
**Transliteration**: rucyarthānāṃ prīyamāṇaḥ  
**Translation**: In case of verbs having the signification of रुच् 'to like', the person who is pleased is called सम्प्रदान

## Purpose
Establishes सम्प्रदान कारक for the experiencer in pleasure/liking contexts. When verbs express pleasure, liking, or satisfaction (रुच् semantic field), the person who experiences the pleasure takes dative case.

## Implementation
```javascript
function identifyPleasureSampradana(word, context = {}) {
    // Identifies dative relationships for pleasure experiencers
}
```

## Usage Examples
```javascript
// Example: Pleasing to child
const result = identifyPleasureSampradana('बालक', { 
  verb: 'रोचते', 
  context: 'बालकाय रोचते'
});
// Expected: { applies: true, karaka: 'सम्प्रदान', case_required: 'dative' }
```

---

# Sutra 1.4.34: श्लाघह्नुङ्स्थाशपां ज्ञीप्स्यमानः

## Overview
**Sanskrit Text**: `श्लाघह्नुङ्स्थाशपां ज्ञीप्स्यमानः`  
**Transliteration**: ślāghahanuṅsthāśapāṃ jñīpsyamāṇaḥ  
**Translation**: In case of verbs श्लाघ् 'to praise', ह्नु 'to take away', स्था 'to stand', शप् 'to curse', the person who is known/recognized is called सम्प्रदान

## Purpose
Establishes सम्प्रदान कारक for the target/recipient in contexts of praise, taking away, standing, and cursing. The person affected by these actions takes dative case.

## Implementation
```javascript
function identifyActionTargetSampradana(word, context = {}) {
    // Identifies dative relationships for action targets
}
```

---

# Sutra 1.4.35: धारेरुत्तमर्णः

## Overview
**Sanskrit Text**: `धारेरुत्तमर्णः`  
**Transliteration**: dhāreruttamarṇaḥ  
**Translation**: In the case of the verb धारि 'to owe', the creditor is called सम्प्रदान

## Purpose
Establishes सम्प्रदान कारक for the creditor in debt contexts. When someone owes something, the creditor to whom the debt is owed takes dative case.

## Implementation
```javascript
function identifyCreditorSampradana(word, context = {}) {
    // Identifies dative relationships for creditors in debt contexts
}
```

---

# Sutra 1.4.36: स्पृहेरीप्सितः

## Overview
**Sanskrit Text**: `स्पृहेरीप्सितः`  
**Transliteration**: spṛherīpsitaḥ  
**Translation**: In the case of the verb स्पृह् 'to desire', the thing desired is called सम्प्रदान

## Purpose
Establishes सम्प्रदान कारक for the object of desire. When someone desires something, the desired object takes dative case.

## Implementation
```javascript
function identifyDesiredObjectSampradana(word, context = {}) {
    // Identifies dative relationships for objects of desire
}
```
