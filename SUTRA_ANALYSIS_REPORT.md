# Sutra Analysis Report (1.1.1 - 1.4.62)

This report analyzes the existing sutras from 1.1.1 to 1.4.62 to determine which ones would benefit from detailed analysis objects.

## Summary of Findings

A detailed analysis object is a structured JSON object returned by a sutra's function that provides more than just a boolean result. It includes contextual information, classifications, and explanations.

The analysis shows that many sutras, especially the foundational `saṃjñā` (definitional) sutras, would benefit from having a detailed analysis object. This would greatly improve the engine's transparency, debuggability, and potential for cross-sutra communication and hierarchical rule application.

The following sutras have been identified as lacking a detailed analysis object and are recommended for enhancement.

## Sutra by Sutra Analysis

| Sutra | Type | Has Detailed Analysis Object | Recommendation |
|---|---|---|---|
| **1.1.1 vṛddhirādaic** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.2 adeṅ guṇaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.3 iko guṇavṛddhī** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.4 na dhātulopa ārdhadhātuke** | `niyama` | Yes | None. Already has a very sophisticated analysis object. |
| **1.1.5 kakaṅiti ca** | `niyama` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.6 dīdhīvevīṭām** | `niyama` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.7 halo'nantarāḥ saṃyogaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.8 mukhanāsikāvacano'nunāsikaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeAnunasika` function that returns details about the phoneme's nasality. |
| **1.1.9 tulyāsyaprayatnaṃ savarṇam** | `saṃjñā` | No | **Yes.** Should have an `analyzeSavarna` function that explains why two phonemes are or are not `savarṇa` by showing their articulation places and manners. |
| **1.1.10 nājjhalau** | `niṣedha` | No | **Yes.** As a prohibition rule, it should return an analysis object explaining what is being prohibited and why. |
| **1.1.11 īdūdeddvivacanaṃ pragṛhyam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.12 adaso māT** | `saṃjñā` | No | **Yes.** All `pragṛhya` sutras should have a detailed analysis object. |
| **1.1.13 śe** | `saṃjñā` | No | **Yes.** All `pragṛhya` sutras should have a detailed analysis object. |
| **1.1.14 nipāta ekājanāṅ** | `saṃjñā` | No | **Yes.** All `pragṛhya` sutras should have a detailed analysis object. |
| **1.1.15 ot** | `saṃjñā` | No | **Yes.** All `pragṛhya` sutras should have a detailed analysis object. |
| **1.1.16 sambuddhau śākalyasyetāvanārṣe** | `saṃjñā` | No | **Yes.** All `pragṛhya` sutras should have a detailed analysis object. |
| **1.1.17 uñaḥ** | `saṃjñā` | No | **Yes.** All `pragṛhya` sutras should have a detailed analysis object. |
| **1.1.18 ūṃ** | `saṃjñā` | No | **Yes.** All `pragṛhya` sutras should have a detailed analysis object. |
| **1.1.19 īdūtau ca saptamyarthe** | `saṃjñā` | No | **Yes.** All `pragṛhya` sutras should have a detailed analysis object. |
| **1.1.20 dādhā ghvadāp** | `saṃjñā` | No | **Yes.** Should have an `analyzeGhu` function that returns details about the root. |
| **1.1.21 ādyantavadekasmin** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.22 taraptamapau ghaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeGha` function that returns details about the affixes. |
| **1.1.23 bahugaṇavatuḍati saṃkhyā** | `saṃjñā` | No | **Yes.** Should have an `analyzeSankhya` function that returns details about the number-related word. |
| **1.1.24 ṣṇāntā ṣaṭ** | `saṃjñā` | No | **Yes.** Should have an `analyzeSat` function that returns details about the word. |
| **1.1.25 ḍati ca** | `vidhi` | No | **Yes.** As a rule that extends a `saṃjñā`, it should return an analysis object. |
| **1.1.26 ktaktavatū niṣṭhā** | `saṃjñā` | No | **Yes.** Should have an `analyzeNishtha` function that returns details about the participle. |
| **1.1.27 sarvādīni sarvanāmāni** | `saṃjñā` | No | **Yes.** Should have an `analyzeSarvanama` function that returns the base form and properties of the pronoun. |
| **1.1.28 vibhāṣā diksamāse bahuvrīhau** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.29 na bahuvrīhau** | `niṣedha` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.30 tṛtīyāsamāse** | `niṣedha` | No | **Yes.** As a prohibition rule, it should return an analysis object explaining what is being prohibited and why. |
| **1.1.31 dvandve ca** | `vidhi` | No | **Yes.** As a rule that provides an option, it should return an analysis object explaining the options. |
| **1.1.32 vibhāṣāparasyāḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.33 pūrva...**| `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.34 sva...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.35 antara...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.36 saṃjñāyām** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.37 svam ajñātidhanākhyāyām** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.38 antaraṃ bahiryogopasaṃvyānayoḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.39 svarādi nipātam avyayam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.40 taddhitaś cāsarvavibhaktiḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.41 kṛnmejantaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.42 śi sarvanāmasthānam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.43 suḍ anapuṃsakasya** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.44 na ve'ti vibhāṣā** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.45 ig yaṇaḥ samprasāraṇam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.46 ādyaṃtavat...** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.47 sthāne'ntaratamaḥ** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.48 ecaḥ...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.49 ṣaṣṭhī sthāneyogā** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.50 sthāne'ntaratamaḥ** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.51 uraṇ raparaḥ** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.52 alo'ntyasya** | `paribhāṣā` | No | **Yes.** As a rule that specifies the scope of a substitution, it should return an analysis object. |
| **1.1.53 ṅid eva** | `niyama` | No | **Yes.** As a restrictive rule, it should return an analysis object explaining what is being restricted. |
| **1.1.54 ādeḥ parasya** | `paribhāṣā` | No | **Yes.** As a rule that specifies the scope of a substitution, it should return an analysis object. |
| **1.1.55 anekālśitsarvasya** | `paribhāṣā` | No | **Yes.** As a rule that specifies the scope of a substitution, it should return an analysis object. |
| **1.1.56 sthānivadādeśo'nalvidhau** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.57 acaḥ parasmin pūrvavidhau** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.58 na padānta...** | `niṣedha` | No | **Yes.** As a prohibition rule, it should return an analysis object explaining what is being prohibited and why. |
| **1.1.59 dvirvacane'ci** | `paribhāṣā` | No | **Yes.** As a rule that specifies an exception to a prohibition, it should return an analysis object. |
| **1.1.60 adarśanaṃ lopaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeLopa` function that returns details about the elision. |
| **1.1.61 pratyayasya lukślulupaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeLukSluLup` function that returns details about the type of elision. |
| **1.1.62 pratyayalope pratyayalakṣaṇam** | `paribhāṣā` | No | **Yes.** As a rule that specifies a general principle, it should return an analysis object. |
| **1.1.63 na lumatā'ṅgasya** | `niṣedha` | No | **Yes.** As a prohibition rule, it should return an analysis object explaining what is being prohibited and why. |
| **1.1.64 aco'ntyādi ṭi** | `saṃjñā` | No | **Yes.** Should have an `analyzeTi` function that returns details about the `ṭi` part of a word. |
| **1.1.65 alo'ntyāt pūrva upadhā** | `saṃjñā` | No | **Yes.** Should have an `analyzeUpadha` function that returns details about the `upadhā` of a word. |
| **1.1.66 tasminniti nirdiṣṭe pūrvasya** | `paribhāṣā` | No | **Yes.** As a rule that specifies the scope of an operation, it should return an analysis object. |
| **1.1.67 tasmādityuttarasya** | `paribhāṣā` | No | **Yes.** As a rule that specifies the scope of an operation, it should return an analysis object. |
| **1.1.68 svaṃ rūpaṃ śabdasyāśabdasaṃjñā** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.69 aṇudit savarṇasya cāpratyayaḥ** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.70 taparas tatkālasya** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.71 ādir antyena sahetā** | `saṃjñā` | No | **Yes.** Should have an `analyzePratyahara` function that returns details about the `pratyāhāra`. |
| **1.1.72 yena vidhis tadantasya** | `paribhāṣā` | No | **Yes.** As a rule that specifies the scope of an operation, it should return an analysis object. |
| **1.1.73 vṛddhir yasyācām ādis tad vṛddham** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.74 tyadādīni ca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.1.75 eṅ prācāṃ deśe** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.1 gāṅkuṭādibhyo'ñṇinṅit** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.2 vija iṭ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.3 vibhāṣorṇoḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.4 sṛjidṛśor jhal amakiti** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.5 iṅaśca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.6 na śasadada...** | `niṣedha` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.7 mṛḍamṛda...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.8 rudivida...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.9 iko jhal** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.10 halaḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.11 liṅsicāvātmanepadeṣu** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.12 uśca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.13 vā gamaḥ** | `vidhi` | No | **Yes.** As a rule that provides an option, it should return an analysis object explaining the options. |
| **1.2.14 hanaḥ sic** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.15 yamo gandhane** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.16 vibhāṣopa...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.17 sthāghvoḥ...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.18 jṛstambhu...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.19 lṛditaḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.20 śaligupadha...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.21 ṇer aniṭi** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.22 puṅaḥ ktvā ca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.23 niṣṭhā śīṅ...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.24 mṛṣas tito...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.25 uditaḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.26 apṛkta ekāl pratyayaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.27 ū...kālo'j jhrasvadīrghaplutaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.28 acaśca** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.29 uccairudāttaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.30 nīcairanudāttaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.31 samāhāraḥ svaritaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.32 tasya...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.33 ekśruti dūrāt...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.34 yajñakarma...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.35 uccais tarāṃ...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.36 vibhāṣā chandasi** | `vidhi` | No | **Yes.** As a rule that provides an option, it should return an analysis object explaining the options. |
| **1.2.37 nica...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.38 mantre vṛṣa...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.39 anyeṣāmapi...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.40 suptiṅantaṃ padam** | `saṃjñā` | No | **Yes.** Should have an `analyzePada` function that returns details about the word's status as a `pada`. |
| **1.2.41 naḥ kye** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.42 siti ca** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.43 svādiṣv...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.44 ya...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.45 kṛttaddhita...** | `saṃjñā` | No | **Yes.** Should have an `analyzePratipadika` function that returns details about the word's status as a `prātipadika`. |
| **1.2.46 arthavad...** | `saṃjñā` | No | **Yes.** Should have an `analyzePratipadika` function that returns details about the word's status as a `prātipadika`. |
| **1.2.47 hrasvo napuṃsake...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.48 go...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.49 luki taddhita...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.50 viśeṣaṇānāṃ...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.2.51 gotra...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.52 striyāḥ puṃvad...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.53 bhastrā...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.54 taddhiteṣv...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.55 vṛddho yūnā...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.56 strī pum...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.57 gotra...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.58 ekaḥ pūrva...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.59 vṛddhino...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.60 dvandva...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.61 vibhāṣā...** | `vidhi` | No | **Yes.** As a rule that provides an option, it should return an analysis object explaining the options. |
| **1.2.62 sarūpāṇām...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.63 vṛddho yūnā...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.64 strī pum...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.65 puṃ...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.66 indra...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.67 na...** | `niṣedha` | No | **Yes.** As a prohibition rule, it should return an analysis object explaining what is being prohibited and why. |
| **1.2.68 pitarau...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.69 svayam...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.70 dvandva...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.71 tyadādīni...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.72 eka...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.2.73 dvandva...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.3.1 bhūvādayo dhātavaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.2 upadeśe'janunāsika it** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.3 halantyam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.4 na vibhaktau tusmāḥ** | `niṣedha` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.5 ādir ñiṭuḍavaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.6 ṣaḥ pratyayasya** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.7 cuṭū** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.8 laśakvataddhite** | `niṣedha` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.9 tasya lopaḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.10 yathāsaṃkhyam anudeśaḥ samānām** | `paribhāṣā` | No | **Yes.** As a rule that specifies a general principle, it should return an analysis object. |
| **1.3.11 svaritenādhikāraḥ** | `paribhāṣā` | No | **Yes.** As a rule that specifies a general principle, it should return an analysis object. |
| **1.3.12 anudāttaṅita ātmanepadam** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.3.13 bhāvakarmanor** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.14 kartari karmavyatihāre** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.15 na gatihiṃsārthebhyaḥ** | `niṣedha` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.16 itaretarānyonyopapadācca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.17 neviśaḥ** | `niṣedha` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.18 parivyavebhyaḥ kriyaḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.19 viparābhyāṃ jeḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.20 āṅo do'nāsyaviharaṇe** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.21 krīḍo'nusaṃparibhyaśca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.22 sama...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.23 prakāśana...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.24 udo'nūrdhva...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.25 upasthānāt** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.26 akarmakācca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.27 samāna...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.28 veḥ śabda...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.29 vibhāṣā...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.30 ner...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.31 āṅa...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.32 anupara...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.33 vibhāṣā...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.34 apād...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.35 sam...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.36 ud...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.37 kartṛsthe...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.38 vṛtti...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.39 upa...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.40 āṅa...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.41 veḥ pāda...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.42 pro...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.43 anupa...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.44 apahnav...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.45 akarmakā...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.46 saṃprati...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.47 an...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.48 vibhāṣā...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.49 avād...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.50 sama...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.51 ava...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.52 sama...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.53 uda...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.54 sama...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.55 upād...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.56 ghrā...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.57 jñā...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.58 bhī...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.59 li...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.60 mṛ...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.61 pratyāṅ...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.3.62 śadeḥ śitaḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.1 ā kaḍārād ekā saṃjñā** | `adhikāra` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.2 vipratiṣedhe paraṃ kāryam** | `paribhāṣā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.3 yūstryākhyau nadī** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.4 neyaṅuvaṅsthānāvastrī** | `niṣedha` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.5 vāmi** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.6 ṅiti hrasvaśca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.7 śeṣo ghyasakhi** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.8 patiḥ samāsa eva** | `niyama` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.9 ṣaṣṭhī yukte chandasi** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.10 hrasvaṃ laghu** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.11 saṃyoge guru** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.12 dīrghaṃ ca** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.13 yasmāt pratyayavidhis tadādi pratyaye 'ṅgam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.14 suptiṅantaṃ padam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.15 naḥ kye** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.16 siti ca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.17 svādiṣvasarvanāmasthāne** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.18 yaci bham** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.19 tasau matvarthe** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.20 ayasmayādīni chandasi** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.21 bahuṣu bahuvacanam** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.22 dvyekayor dvivacanaikavacane** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.23 kārake** | `adhikāra` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.24 dhruvamapāye'pādānam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.25 bhītrārthānāṃ bhayahetuḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.26 parājer asoḍhaḥ** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.27 vāraṇārthānām īpsitaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeApadana` function that returns details about the `apādāna` relation. |
| **1.4.28 antardhau yenādarśanam icchati** | `saṃjñā` | No | **Yes.** Should have an `analyzeApadana` function that returns details about the `apādāna` relation. |
| **1.4.29 ākhyātopayoge** | `saṃjñā` | No | **Yes.** Should have an `analyzeApadana` function that returns details about the `apādāna` relation. |
| **1.4.30 janikartuḥ prakṛtiḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeApadana` function that returns details about the `apādāna` relation. |
| **1.4.31 bhuvaḥ prabhavaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeApadana` function that returns details about the `apādāna` relation. |
| **1.4.32 karmaṇā yam abhipraiti sa sampradānam** | `saṃjñā` | No | **Yes.** Should have an `analyzeSampradana` function that returns details about the `sampradāna` relation. |
| **1.4.33 rucyarthānāṃ prīyamāṇaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeSampradana` function that returns details about the `sampradāna` relation. |
| **1.4.34 ślāghahnuṅsthāśapāṃ jñīpsyamānaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeSampradana` function that returns details about the `sampradāna` relation. |
| **1.4.35 dhārer uttamaṛṇaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeSampradana` function that returns details about the `sampradāna` relation. |
| **1.4.36 spṛher īpsitaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeSampradana` function that returns details about the `sampradāna` relation. |
| **1.4.37 krudhadruherṣyāsūyārthānāṃ yaṃ prati kopaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeSampradana` function that returns details about the `sampradāna` relation. |
| **1.4.38 krudhadruhor upasṛṣṭayoḥ karma** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.4.39 rādhīkṣyor yasya vipraśnaḥ** | `saṃjñā` | No | **Yes.** Should have an `analyzeSampradana` function that returns details about the `sampradāna` relation. |
| **1.4.40 pratyāṅbhyāṃ śruvaḥ pūrvasya kartā** | `saṃjñā` | No | **Yes.** Should have an `analyzeSampradana` function that returns details about the `sampradāna` relation. |
| **1.4.41 anuparati...** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.42 sādhakatamaṃ karaṇam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.43 divaḥ karma ca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.44 parikrayane sampradānam anyatarasyām** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.45 ādhāro 'dhikaraṇam** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.46 adhiśīṅsthāsāṃ karma** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.47 abhiniviśaśca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.48 upānvadhyāṅvasaḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.49 kartur īpsitatamaṃ karma** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.50 tathā yuktaṃ cānīpsitam** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.51 akathitaṃ ca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.52 gati...** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.53 hṛkror anyatarasyām** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.54 svatantraḥ kartā** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.55 tatprayojako hetuśca** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.56 prāgrīśvarān nipātāḥ** | `adhikāra` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.57 cādayo 'sattve** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.58 prādayaḥ** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.59 upasargāḥ kriyāyoge** | `saṃjñā` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.60 gatiśca** | `vidhi` | Yes | None. Already has a comprehensive analysis object. |
| **1.4.61 ūryādi...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
| **1.4.62 anukaraṇaṃ...** | `vidhi` | No | **Yes.** As a rule that specifies a condition for an operation, it should return an analysis object. |
