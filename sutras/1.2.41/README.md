# Sutra 1.2.41 – अपृक्त एकाल् प्रत्ययः

IAST: apṛkta ekāl pratyayaḥ  
Type: Saṃjñā (term definition)

Definition: An affix consisting of exactly one letter (after optional IT-marker removal) is termed apṛkta.

Implementation: `classifyAffixShape` computes grapheme counts; `isAprktaAffix` boolean helper.

Edge Handling: Optional `stripItMarkers` (default true). Invalid inputs yield `applies=false`.
