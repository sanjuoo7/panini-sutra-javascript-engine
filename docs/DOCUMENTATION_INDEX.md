# Documentation Index

**Last Updated**: December 2025  
**Project**: Panini Sutra JavaScript Engine  
**Status**: All major development phases completed ✅

---

## 📋 **Core Documentation**

### **Primary References**
- **[README.md](../README.md)** - Project overview, installation, and usage
- **[SANSKRIT_UTILS_DOCUMENTATION.md](../SANSKRIT_UTILS_DOCUMENTATION.md)** - API reference for shared utilities (expanded full module set)

### **Development Strategy & Implementation**
- **[COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md](COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md)** - 📚 **ESSENTIAL** Complete methodology for converting thousands of sutras to JavaScript

### **Historical Reference**
- **[historical/completed-phases/](historical/completed-phases/)** - Archive of completed development documentation including:
  - Utility extraction audit reports
  - Refactoring completion summaries  
  - Comprehensive redundancy analysis
  - Testing and documentation reports

---

## 🗂️ **Sutra Documentation**

### **Template**
- **[SUTRA_README_TEMPLATE.md](SUTRA_README_TEMPLATE.md)** - Standardized template for sutra documentation

### **Individual Sutras** (112 files)
Located in `sutras/[SUTRA_NUMBER]/README.md`:

#### **Volume 1.1: Fundamental Rules**
- **1.1.1** - वृद्धि (Vṛddhi vowels: ā, ai, au)
- **1.1.2** - अदेङ् गुणः (Guṇa vowels: a, e, o) 
- **1.1.3** - इको गुण वृद्धी (Ika vowels: i, u, ṛ, ḷ)
- **1.1.4** - न धातुलोप इदितः (Dhātu-lopa rule with enhanced scoring)
- **1.1.5** - क्ङिति च (Ki and Ṅi suffix rules)
- **1.1.6** - दीर्घात् (Rules for long vowels)
- **1.1.7** - हल् अन्त्यम् (Final consonant rules)
- **1.1.8** - मुखनासिकावचनोऽनुनासिकः (Oral and nasal articulation)
- **1.1.9** - तुल्यास्यप्रयत्नं सवर्णम् (Homorganic consonants)
- **1.1.10** - नाज्झलौ (Not applicable to jhāl consonants)

#### **Volume 1.1.11-1.1.19: Pragṛhya Rules**
- **1.1.11** - ईदूदेद् द्विवचनं प्रगृह्यम् (Dual forms are pragṛhya)
- **1.1.12** - आदैछ् (Ā and ai before ch)
- **1.1.13** - उत्वादेकैच् प्रगृह्यम् (Ut and eka-aic pragṛhya)
- **1.1.14** - अहन् अन्यतरस्याम् (Ahan optionally)
- **1.1.15** - ऋत् (Ṛt endings are pragṛhya)
- **1.1.16** - चन्दनादीनि (Candana and similar words)
- **1.1.17** - प्रगवाच्छत्र (Pragava and chatra)
- **1.1.18** - औत् (Aut endings)
- **1.1.19** - अच्युत (Acyuta is pragṛhya)

#### **Volume 1.1.20-1.1.50: Advanced Grammar Rules**
- **1.1.20-1.1.50** - Various specialized grammar rules

#### **Volume 1.1.61-1.1.65: Elision and Technical Terms**
- **1.1.61** - प्रत्ययस्य लुक्‌श्लुलुपः (Defines elision terms `luk`, `ślu`, `lup`)
- **1.1.62** - प्रत्ययलोपे प्रत्ययलक्षणम् (Affix effects remain after elision)
- **1.1.63** - न लुमताऽङ्गस्य (Exception to 1.1.62 for `luk`, `ślu`, `lup`)
- **1.1.64** - अचोऽन्त्यादि टि (Defines the technical term `ṭi`)
- **1.1.65** - अलोऽन्त्यात् पूर्व उपधा (Defines the technical term `upadhā`)

#### **Volume 1.1.66-1.1.75: Meta-Rules and Interpretation**
- **1.1.66** - तस्मिन्निति निर्दिष्टे पूर्वस्य (Locative case defines preceding context)
- **1.1.67** - तस्मादित्युत्तरस्य (Ablative case defines following context)
- **1.1.68** - स्वं रूपं शब्दस्याशब्दसंज्ञा (A term denotes its own form)
- **1.1.69** - अणुदित् सवर्णस्य चाप्रत्ययः (A phoneme can denote its homogeneous variations)
- **1.1.70** - तपरस्तत्कालस्य (Length restriction for `tapara` vowels)
- **1.1.71** - आदिरन्त्येन सहेता (First sound with final sound forms a unit)
- **1.1.72** - येन विधिस्तदन्तस्य (Rule scope determined by specified ending)
- **1.1.73** - आदिर्वा (Optionally the first sound)
- **1.1.74** - त्यदादीनामः (Visarga for ty-class initial words)
- **1.1.75** - एकाच उपदेशेऽनुदात्तत् (Single vowel in instruction is anudātta)

#### **Volume 1.2: Special Affix Designations**
- **1.2.1** - गाङ्कुटादिभ्यो धातुभ्यो गोत्रादिषु (Gaṅ-kuṭ-class roots for gotra-words)
- **1.2.2** - विधिषु च (Special ṅit designation in injunctions)
- **1.2.3** - वह्निदरादिषु च (Special iṭ augment for vahni-dar class)
- **1.2.4** - सार्वधातुकमपित् (Sārvādhātuka is non-pit)
- **1.2.5** - असंयोगल्लिट् कित् (Liṭ becomes kit after non-conjunct)
- **1.2.6** - व्यत्ययो बहुलम् (Mutual exchange is common)
- **1.2.7** - मृडमृदगुधकुषक्लिशवदवसः क्त्वा (Ktvā becomes kit after specific roots)
- **1.2.8** - रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च (Kit designation for specific roots with ktvā/san)
- **1.2.9** - इको झल् (Kit designation for san affixes after ik-ending roots)
- **1.2.10** - हलन्ताच्च (Kit designation for san affixes after consonant-ending roots)
- **1.2.11** - लिङ्सिचावात्मनेपदेषु (Kit designation for लिङ्/सिच् affixes in Ātmanepada contexts)
- **1.2.12** - उश्च (Extends kit designation to ऋ-ending roots with लिङ्/सिच् + आत्मनेपद)
- **1.2.13** - वा गमः (Optional kit designation for गम् root with लिङ्/सिच् + आत्मनेपद)
- **1.2.14** - हनः सिच् (Kit designation for सिच् affix after हन् root in आत्मनेपद)
- **1.2.15** - यमो गन्धने (Kit designation for सिच् after यम् root with गन्धने meaning in आत्मनेपद)
- **1.2.16** - विभाषोपयमने (Optional kit designation for यम् in upayamane sense)
- **1.2.17** - स्था घ्वोरिच्च (Kit designation for स्था and घु class roots with सिच्)
- **1.2.18** - न क्त्वा सेट् (Exception: क्त्वा with सेट् augment does not get kit designation)
- **1.2.19** - सितवानधिकरणयोः (अतिदेश: Exception for सित्, वान् affixes - prevents कित् for सेट् निष्ठा)
- **1.2.20** - सुप्यजातौ (अतिदेश: Exception for ऋ-ending words in non-caste formations - prevents कित् for सेट् निष्ठा)  
- **1.2.21** - वा पदान्तस्य (अतिदेश: Optional exception at word boundaries - prevents कित् for सेट् निष्ठा)
- **1.2.22** - पूङः क्त्वा च (अतिदेश: Exception for पुङ् root with सेट् निष्ठा/क्त्वा - prevents कित्)
- **1.2.23** - नोपधात्थफान्ताद्वा (अतिदेश: Optional exception for न्-उपधा + थ्/फ्-अन्त roots with सेट् क्त्वा)

#### **Volume 1.3: Voice Designation (Parasmaipada/Ātmanepada)**
- **1.3.86** - बुधयुधनशजनेङ्प्रुद्रुस्रुभ्यो णेः — Parasmaipada for specified roots in causative, overriding agent-benefit
- **1.2.24** - वञ्चिलुञ्च्यृतश्च (अतिदेश: Optional exception for वञ्च्/लुञ्च्/यृत् roots with सेट् क्त्वा)
- **1.2.25** - तृषिमृषिकृशेः काश्यपस्य (अतिदेश: Exception for तृष्/मृष्/कृश् roots with सेट् क्त्वा according to Kashyapa's opinion)
- **1.2.26** - रलो व्युपधाद्धलादेः संश्च (Complex morphophonological rule for रल्-ending roots with व्युपधा and हल्-initial elements)
- **1.2.27** - ऊकालोऽज्झ्रस्वदीर्घप्लुतः (संज्ञा: Fundamental vowel duration classification - ह्रस्व/दीर्घ/प्लुत based on ऊकाल measurement)
- **1.2.28** - अचश्च (Extension of duration properties: confirms that vowels can have the properties defined in 1.2.27)
- **1.2.29** - उच्चैरुदात्तः (संज्ञा: High tone vowels are designated as उदात्त - Vedic accent classification)
- **1.2.30** - नीचैरनुदात्तः (संज्ञा: Low tone vowels are designated as अनुदात्त - Vedic accent classification)
- **1.2.31** - समाहारः स्वरितः (संज्ञा: Combined tone vowels are designated as स्वरित - Vedic accent classification)
- **1.2.32** - तस्यादित उदात्तमर्धह्रस्वम् (Prosodic decomposition: first half-unit of svarita is udātta)
- **1.2.33** - एकश्रुति दूरात् सम्बुद्धौ (Contextual monotone accent for distant vocative address)
- **1.2.34** - (Ritual monotone default with exceptions: japa, Oṃ, sāma)
- **1.2.35** - (Vaṣaṭ optional raised udātta)
- **1.2.36** - छन्दसि वा एकश्रुतिः (Optional monotone in chandas)
- **1.2.37** - न सुब्रह्मण्यायां स्वरितस्य तूदात्तः (Subrahmaṇyā: block monotone, svarita→udātta)
- **1.2.38** - देवब्रह्मणोरनुदात्तः (Lexical anudātta: deva, brāhmaṇa)
- **1.2.39** - स्वरितात् संहितायामनुदात्तानाम् (Local assimilation: svarita + anudātta run → local monotone)
 - **1.2.40** - उदात्तस्वरितपरस्य सन्नतरः (Sannatara accent substitution metadata)
 - **1.2.41** - अपृक्त एकाच् प्रत्ययः (Single-letter affix apṛkta classification)
 - **1.2.42** - तत्पुरुषस्य (Karmadhāraya subtype within tatpuruṣa)
 - **1.2.43** - उपसर्जनं पूर्वम् (Nominative precedence for upasarjana)
 - **1.2.44** - एकविभक्तौ समास उपसर्जनम् (Single-case agreement establishing upasarjana)
 - **1.2.45** - कृत्तद्धितसमासाश्च (Base prātipadika sources)
 - **1.2.46** - प्रातिपदिकं च (Extended prātipadika including kṛt, taddhita, compound)
 - **1.2.47** - नपुंसकस्य दीर्घस्यान्त्यस्य ह्रस्वः (Neuter final long vowel shortening)
 - **1.2.48** - उपसर्जनगोस्त्रियां ह्रस्वः (Final long→short in upasarjana compounds when member is go- or feminine)
 - **1.2.49** - स्त्रीलिङि लुकि समानाधिकरणस्य (Feminine affix LUK elision propagation in co-referential members)
 - **1.2.50** - इद्गोण्याः (Shortening of final long ī in गोणी under तद्धित लुक्)
 - **1.2.51** - लुपि युक्तवद्व्यक्तिवचने (Retention of gender/number after तद्धित लुप्)
 - **1.2.52** - विशेषणानां चाजातेः (Propagation of retained features to qualifying adjectives)
 - **1.2.53** - तदशिष्यं संज्ञाप्रमाणत्वात् (Concord conventional—अशिष्य classification reason: संज्ञा authority)
 - **1.2.54** - लुब्योगाप्रख्यानात् (अशिष्य reason: योग अप्रख्यान)
 - **1.2.55** - योगप्रमाणे च तदभावेऽदर्शनं स्यात् (अशिष्य reason: disappearance when meaning absent)
 - **1.2.56** - प्रधानप्रत्ययार्थवचनमर्थस्यान्यप्रमाणत्वात् (अशिष्य reason: meaning authority external)
 - **1.2.57** - कालोपसर्जने च तुल्यम् (अशिष्य reason: tense/sequence conventional)
 - **1.2.58** - जात्याख्यायामेकस्मिन् बहुवचनमन्यतरस्याम् (Optional plural for singular class-denoting nouns)
 - **1.2.59** - अस्मदो द्वायोश्च (Extends optional plural to pronoun अस्मद् in singular/dual sense)
 - **1.2.60** - फल्गुनीप्रोष्ठपदानां च नक्षत्रे (Dual Phalgunī/Proṣṭhapadā optionally conveys plural sense)
 - **1.2.61** - छन्दसि पुनर्वस्वोरेकवचनम् (In Vedic usage singular optionally for dual Punarvasū)
 - **1.2.62** - विशाखयोश्च (In Vedic usage singular optionally for dual Viśākhā)
 - **1.2.63** - तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य (Plural in Tiṣya+Punarvasū dvandva mandatorily replaced by dual)
 - **1.2.64** - सरूपाणामेकशेष एकविभक्तौ (Identical forms in one case: last retained - base ekaśeṣa)
 - **1.2.65** - वृद्धो यूना तल्लक्षणश्चेदेव विशेषः (Vṛddha/gotra retained over Yuvan counterpart)
 - **1.2.66** - स्त्री पुंवच्च (Feminine vṛddha retained; treated like masculine)
 - **1.2.67** - पुमान् स्त्रिया (Masculine retained over feminine counterpart)
 - **1.2.68** - भ्रातृपुत्रौ स्वसृदुहितृभ्याम् (Bhrātṛ/Putra retained over Svasṛ/Duhitṛ)
 - **1.2.69** - नपुंसकमनपुंसकेनैकवच्चास्यान्यतरस्याम् (Optional neuter retention; singular sense)
 - **1.2.70** - पिता मात्रा (Pitṛ optionally retained over Mātṛ)
 - **1.2.71** - श्वशुरः श्वश्र्वा (Śvaśura optionally retained over Śvaśrū)
 - **1.2.72** - त्यदादीनि सर्वैर्नित्यम् (Tyad-series pronoun(s) mandatorily retained)
 - **1.2.73** - ग्राम्यपशुसंघेषु अतरुणेषु स्त्री (Feminine retained in non-young domestic animal collection)
  
*For complete list and details, see individual sutra README files*

#### **Volume 1.3: Dhātu Definitions (Initiated)**
- **1.3.1** - भूवादयो धातवः (Defines dhātu class: roots beginning with bhū)
- **1.3.2** - उपदेशेऽजनुनासिक इत् (Non-nasalized vowels as it-markers in grammatical instruction)
- **1.3.3** - हलन्त्यम् (Final consonants as it-markers in grammatical instruction)
- **1.3.4** - न विभक्तौ तुस्माः (TUSMĀḤ consonants are not it-markers in vibhakti affixes)
- **1.3.5** - आदिर्ञिटुडवः (Initial ञि, टु, डु sequences are it-markers)
- **1.3.6** - षः प्रत्ययस्य (Initial ष् of affixes is an it-marker)
- **1.3.7** - चुटू (Initial palatal and lingual consonants as it-markers)
- **1.3.8** - लशक्वतद्धिते (Initial la, śa, and gutturals as it-markers except in taddhita)
- **1.3.14** - कर्त्तरि कर्म्मव्यतिहारे (Reciprocal action ātmanepada determination)
- **1.3.15** - न गतिहिंसार्थेभ्यः (Motion and injury verb exception to reciprocal rule)
- **1.3.16** - इतरेतरान्योन्योपपदाच्च (Itaretara/anyonya compound exception)
- **1.3.17** - नेर्विशः (Ni+viś specific ātmanepada rule)
- **1.3.18** - परिव्यवेभ्यः क्रियः (क्री root with परि/वि/अव prefix ātmanepada rule)
- **1.3.24** - उदोऽनूर्द्ध्वकर्मणि (उद् + स्था ātmanepada excluding upward motion)
- **1.3.25** - उपान्मन्त्रकरणे (उप + स्था ātmanepada in worship contexts)
- **1.3.26** - अकर्मकाच्च (Extension to intransitive constructions)
- **1.3.27** - उद्विभ्यां तपः (उद्/वि + तप् ātmanepada in intransitive usage)
- **1.3.28** - आङो यमहनः (आ + यम्/हन् ātmanepada in intransitive usage)
- **1.3.29** - समो गम्यृच्छिप्रच्छिस्वरत्यर्तिश्रुविदिभ्यः (सम् + specified roots ātmanepada)
- **1.3.30** - निसमुपविभ्यो ह्वः (ह्वे root with नि/सम्/उप/वि prefixes ātmanepada)
- **1.3.31** - स्पर्द्धायामाङः (ह्वे root with आङ् prefix in challenging context ātmanepada)
- **1.3.32** - गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः (कृ root in seven semantic contexts ātmanepada)
- **1.3.33** - अधेः प्रसहने (अधि + कृ in overpowering context ātmanepada)
- **1.3.34** - वेः शब्दकर्म्मणः (वि + कृ in sound-making context ātmanepada)
- **1.3.35** - अकर्मकाच्च (वि + कृ ātmanepada in intransitive usage)
- **1.3.36** - सम्माननोत्सञ्जनाचार्यकरणज्ञानभृतिविगणनव्ययेषु नियः (नी in specific semantic contexts ātmanepada)
 - **1.3.37** - कर्तृस्थे चाशरीरे कर्मणि (नी with incorporeal object located in agent ātmanepada)
 - **1.3.38** - वृत्तिसर्गतायनेषु क्रमः (क्रम् in continuity/creation/development senses ātmanepada)
 - **1.3.39** - उपपराभ्याम् (उप/पर + क्रम् in 1.3.38 senses ātmanepada)
 - **1.3.40** - आङ उद्गमने (आङ् + क्रम् in rising-of-luminary sense ātmanepada)
 - **1.3.41** - वेः पादविहरणे (वि + क्रम् in footstep/walking sense ātmanepada)
 - **1.3.42** - प्रोपाभ्यां समर्थाभ्याम् (वि + क्रम् with pra/upa in beginning sense → Ātmanepada)
 - **1.3.43** - अनुपसर्गाद्वा (क्रम् without prefix → optional Ātmanepada)
 - **1.3.44** - अपह्नवे ज्ञः (ज्ञ in denial sense → Ātmanepada)
 - **1.3.45** - अकर्मकाच्च (ज्ञ intransitive with non-agent fruit → Ātmanepada)
 - **1.3.46** - सम्प्रतिभ्यामनाध्याने (सम्+प्रति + ज्ञ, not in regret sense → Ātmanepada)
 - **1.3.47** - भासनोपसम्भाषाज्ञानयत्नविमत्युपमन्त्रणेषु वदः (वद् in six specified senses → Ātmanepada)
 - **1.3.48** - व्यक्तवाचां समुच्चारणे (वद् in articulate/unison utterance → Ātmanepada)
 - **1.3.49** - अनोरकर्मकात् (अनु + वद्, intransitive, samuccāraṇa sense → Ātmanepada)
 - **1.3.50** - विभाषा विप्रलापे (वद् in mutual contradiction → optional Ātmanepada)
 - **1.3.51** - अवाद्ग्रः (अव + गॄ “to swallow” → Ātmanepada)
 - **1.3.52** - समः प्रतिज्ञाने (सम् + गॄ in promising sense → Ātmanepada)
 - **1.3.53** - उदश्चरः सकर्मकात् (उद् + चर् intransitive → Ātmanepada)
 - **1.3.54** - समस्तृतीयायुक्तात् (सम् + चर् with instrumental linkage → Ātmanepada)
 - **1.3.55** - दाणश्च सा चेच्चतुर्थ्यर्थे (सम् + दा with instrumental having dative sense → Ātmanepada)
 - **1.3.56** - उपाद्यमः स्वकरणे (उप + यम् in espousing sense → Ātmanepada)
 - **1.3.57** - (Implemented) — see sutra README
 - **1.3.58** - (Implemented) — see sutra README
 - **1.3.59** - प्रत्याङ्भ्यां श्रुवः (Desiderative of śru with prati/āṅ → prohibits Ātmanepada)
 - **1.3.60** - शदेः शितः (śad with śit affix → Ātmanepada)
 - **1.3.61** - म्रियतेर् लुङ्लिङोश्च (mṛ with śit, or luṅ/liṅ → Ātmanepada)
 - **1.3.62** - पूर्ववत् सन् (Desiderative inherits base Ātmanepada)
 - **1.3.63** - आम्प्रत्ययवत् कृञोऽनुप्रयोगस्य (Auxiliary kṛ with ām‑class main verb → Ātmanepada)
 - **1.3.64** - प्रोपाभ्यां युजेरयज्ञपात्रेषु (pra/upa + yuj; exclude sacrificial vessels → Ātmanepada)
 - **1.3.65** - समः क्ष्णुवः (sam + kṣṇu/kṣaṇu ‘to sharpen’ → Ātmanepada)
 - **1.3.66** - भुजोऽनवने (bhuj except in protection sense → Ātmanepada)
 - **1.3.67** - णेरणौ यत् कर्म णौ चेत् स कर्ताऽनाध्याने (causative with object→agent; not regret-remembering → Ātmanepada)
 - **1.3.68** - भीस्म्योर्हेतुभये (causatives of bhī/smi with directly caused fear → Ātmanepada)
 - **1.3.69** - गृधिवञ्च्योः प्रलम्भने (causatives of गृध्/वञ्च् in deception sense → Ātmanepada)
 - **1.3.70** - लियः सम्माननशालिनीकरणयोश्च (causative of लि in respect/subduing/deception senses → Ātmanepada)
 - **1.3.71** - मिथ्योपपदात् कृञोऽभ्यासे (कृ with मिथ्या उपपद in repetition/falsehood → Ātmanepada)
 - **1.3.72** - स्वरितञितः कर्त्रभिप्राये क्रियाफले (स्वरित/ञित् verbs with agent benefit → Ātmanepada)
 - **1.3.73** - अपाद्वदः (अप + वद् with agent benefit → Ātmanepada)

---

## 🏛️ **Historical Documentation**

### **Archive Location**: `docs/historical/`
- **[REFACTORING_ARCHIVE.md](historical/REFACTORING_ARCHIVE.md)** - Consolidated historical refactoring documentation
- **REFACTORING_COMPLETION_SUMMARY.md** - Original completion summary (archived)
- **SHARED_UTILITIES_REFACTORING.md** - Shared utilities implementation details (archived)
- **SHARED_UTILITIES_IMPLEMENTATION_COMPLETE.md** - Implementation completion (archived)
- **REFACTORING_SUMMARY.md** - Early refactoring summary (archived)
- **ADVANCED_IMPLEMENTATION_SUMMARY.md** - Advanced implementation notes (archived)
- **SYSTEMATIC_REFACTORING_PROGRESS.md** - Progress tracking (archived)
- **IMPLEMENTATION_SUMMARY_1.1.31-60.md** - Sutra range implementation (archived)

---

## 🧪 **Testing Documentation**

### **Test Organization**
- **Test Files**: Located in each sutra directory as `index.test.js`
- **Comprehensive Tests**: Some sutras have additional `comprehensive.test.js`
- **Specialized Tests**: Various sutras have specific test files (e.g., `fuzz-stability.test.js`)

### **Test Validation**
```bash
# Run all tests (3947 total)
npm test

# Run specific sutra tests
npm test sutras/1.1.11

# Run with coverage
npm test:coverage
```

### **Test Status**
- **Total Tests**: 4393 tests
- **Status**: ✅ All passing
- **Coverage**: Comprehensive coverage across all sutras
- **Regression Testing**: Validated through all refactoring phases

---

## 🔧 **Development Documentation**

### **Project Structure**
```
panini-sutra-javascript-engine/
├── README.md                          # Main project documentation
├── package.json                       # Dependencies and scripts
├── sutras/                            # Sanskrit grammar sutras
│   ├── sanskrit-utils/                # Shared utility modules
│   ├── 1.1.1/ through 1.1.50/       # Individual sutra implementations
│   └── state/                         # State management utilities
└── docs/                             # Documentation
    ├── SUTRA_README_TEMPLATE.md      # Template for sutra docs
    └── historical/                    # Archived documentation
```

### **Shared Utilities Architecture**
- **constants.js** - Sanskrit language constants
- **script-detection.js** - Script detection utilities
- **phoneme-tokenization.js** - Robust phoneme handling
- **classification.js** - Vowel/consonant classification
- **vowel-analysis.js** - Advanced vowel transformations
- **validation.js** - Input validation & error handling
- **kit-designation.js** - कित् (kit) designation analysis for sutras 1.2.8-1.2.15 with phonological rules
- **kit-analysis.js** - Advanced कित् analysis and अतिदेश exception handling for sutras 1.2.19-1.2.21
- **pratyahara-construction.js** - Pāṇinian pratyāhāra construction utilities
- **verb-analysis.js** - Comprehensive verb form analysis
- **root-analysis.js** - Sanskrit root identification and classification
- **conjunct-analysis.js** - Consonant cluster analysis
- **transliteration.js** - IAST ⟷ Devanagari conversion
- **morphology.js** - Morphological operations and stem analysis
 - **accent-analysis.js** - Vedic accent classification (udātta/anudātta/svarita)
 - **accent-prosody-analysis.js** - Prosodic layering (svarita decomposition, ekashruti, ritual/chandas contexts, vaṣaṭ)
 - **accent-sannatara-rules.js** - Sannatara accent target detection (1.2.40)
 - **affix-shape-analysis.js** - Affix grapheme shape + apṛkta detection (1.2.41)
 - **compound-analysis.js** - Tatpuruṣa subtype + upasarjana detection (1.2.42–1.2.44)
 - **pratipadika-classification.js** - Prātipadika base & extended classification (1.2.45–1.2.46)

---

## 📊 **Project Metrics**

### **Codebase Statistics**
 - **Total Sutras Implemented**: 104 sutras (1.1.1–1.1.75 subset, 1.2.1–1.2.59)
- **Code Reduction Achieved**: 270+ lines of duplicate code eliminated
- **Test Coverage**: 3678+ comprehensive tests
- **Module Organization**: 30+ shared utility modules (core + extended)
 - **Recent Additions**: 1.2.60–1.2.63 (nakshatra number semantics: optional plural sense, optional singular for dual stars, enforced dual in dvandva) plus earlier 1.2.50–1.2.59 extensions

### **Refactoring Achievements**
- **Phase 1**: ✅ Complete - isPragṛhya function chain consolidation
- **Documentation**: ✅ Complete - Comprehensive cleanup and standardization
- **Quality Assurance**: ✅ Complete - Zero regressions, all tests passing

---


---

## Data Normalization & Quality Assurance

### Transliteration Normalization Workflow (2025-08-15)

**Purpose:**
Automate the correction of corrupted IAST transliterations in the sutra datasets (e.g., Latin base letters with Devanagari matras) to ensure clean, canonical text for all downstream processing and rule logic.

**Workflow Steps:**
1. **Script Location:** `scripts/normalize-transliteration.cjs`
2. **How it Works:**
  - Scans all `sutra_text_iast` fields in `sutras/enhanced-panini-sutras.json`.
  - Applies regex-based mapping to convert Devanagari matras and signs to proper IAST vowels and diacritics.
  - Applies a manual corrections map for known edge cases (e.g., `laśakavatadadhite` → `laśakvataddhite`).
  - Removes all residual Devanagari combining marks and normalizes whitespace.
3. **Usage:**
  - To generate a new normalized file (non-destructive):
    ```bash
    node scripts/normalize-transliteration.cjs
    # Output: sutras/enhanced-panini-sutras.normalized.json
    ```
  - To overwrite the main dataset in-place (with automatic backup):
    ```bash
    node scripts/normalize-transliteration.cjs --in-place
    # Backup created in sutras/enhanced-panini-sutras.backup-<timestamp>.json
    ```
4. **Validation:**
  - Test: `test/sutras/transliteration-validation.test.js` ensures no Devanagari matras remain and key corrections are present.
5. **Integration:**
  - All downstream code and tests should use the normalized dataset to avoid regression.

**Last Run:** 2025-08-15 (all 3982 entries scanned, 3852 changed, all tests passing)

**See also:**
- [scripts/normalize-transliteration.cjs](../scripts/normalize-transliteration.cjs)
- [test/sutras/transliteration-validation.test.js](../test/sutras/transliteration-validation.test.js)

## 🔍 **Quick Reference**

### **For Contributors**
1. **Getting Started**: See [README.md](../README.md)
2. **Sutra Implementation Strategy**: 📚 **READ FIRST** [COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md](COMPREHENSIVE_SUTRA_CONVERSION_STRATEGY.md)
3. **Adding New Sutras**: Use [SUTRA_README_TEMPLATE.md](SUTRA_README_TEMPLATE.md)
4. **Testing Changes**: Run `npm test` before committing
5. **Architecture**: Review [SANSKRIT_UTILS_DOCUMENTATION.md](../SANSKRIT_UTILS_DOCUMENTATION.md)

### **For Researchers**
1. **Implementation Details**: [FINAL_REFACTORING_SUMMARY.md](../FINAL_REFACTORING_SUMMARY.md)
2. **Historical Context**: [Historical Archive](historical/REFACTORING_ARCHIVE.md)
3. **Test Cases**: Individual sutra test files for validation

### **For Users**
1. **Installation & Usage**: [README.md](../README.md)
2. **API Reference**: [SANSKRIT_UTILS_DOCUMENTATION.md](../SANSKRIT_UTILS_DOCUMENTATION.md)
3. **Examples**: Individual sutra README files

---

*This index provides a comprehensive overview of all project documentation. For the most current information, always refer to the main README.md and individual file timestamps.*
