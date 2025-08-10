/**
 * Test cases for Sutra 1.1.32: विभाषा जसि (vibhāṣā jasi)
 * 
 * This file contains comprehensive test cases demonstrating the application
 * of the rule for optional sarvanama status in dvandva compounds before jas.
 */

const testCases = [
    // Positive test cases - where sutra applies
    {
        id: "1.1.32_001",
        description: "Dvandva compound with sarva and viśva in nominative plural",
        word: "sarvaviśvāḥ",
        context: {
            compound: {
                type: "dvandva",
                parts: ["sarva", "viśva"],
                meaning: "all and universal ones"
            },
            case: {
                vibhakti: "prathama",
                vacana: "bahuvacana",
                linga: "masculine"
            }
        },
        expected: {
            applies: true,
            sarvanama_status: "optional",
            reason: "Dvandva compound with sarvaadi words before jas - optional sarvanama status"
        }
    },

    {
        id: "1.1.32_002", 
        description: "Dvandva compound with pūrva and para in nominative plural",
        word: "pūrvāparāḥ",
        context: {
            compound: {
                type: "dvandva",
                parts: ["pūrva", "para"],
                meaning: "prior and posterior ones"
            },
            case: {
                vibhakti: "prathama", 
                vacana: "bahuvacana",
                linga: "masculine"
            }
        },
        expected: {
            applies: true,
            sarvanama_status: "optional"
        }
    },

    {
        id: "1.1.32_003",
        description: "Dvandva compound with anya and anyatara in nominative plural", 
        word: "anyānyatarāḥ",
        context: {
            compound: {
                type: "dvandva",
                parts: ["anya", "anyatara"],
                meaning: "other and another ones"
            },
            case: {
                vibhakti: "prathama",
                vacana: "bahuvacana", 
                linga: "masculine"
            }
        },
        expected: {
            applies: true,
            sarvanama_status: "optional"
        }
    },

    {
        id: "1.1.32_004",
        description: "Dvandva compound with ubha and ubhaya in nominative plural",
        word: "ubhobhayāḥ", 
        context: {
            compound: {
                type: "dvandva",
                parts: ["ubha", "ubhaya"],
                meaning: "both types"
            },
            case: {
                vibhakti: "prathama",
                vacana: "bahuvacana",
                linga: "masculine"
            }
        },
        expected: {
            applies: true,
            sarvanama_status: "optional"
        }
    },

    // Negative test cases - where sutra does not apply
    {
        id: "1.1.32_005",
        description: "Tatpurusha compound with sarvaadi word - should not apply",
        word: "sarvajanaḥ",
        context: {
            compound: {
                type: "tatpurusha",
                parts: ["sarva", "jana"],
                meaning: "all people"
            },
            case: {
                vibhakti: "prathama",
                vacana: "bahuvacana",
                linga: "masculine"
            }
        },
        expected: {
            applies: false,
            reason: "Not a dvandva compound"
        }
    },

    {
        id: "1.1.32_006", 
        description: "Dvandva compound with sarvaadi in accusative plural",
        word: "sarvaviśvān",
        context: {
            compound: {
                type: "dvandva", 
                parts: ["sarva", "viśva"]
            },
            case: {
                vibhakti: "dvitiya", // accusative
                vacana: "bahuvacana",
                linga: "masculine"
            }
        },
        expected: {
            applies: false,
            reason: "Not followed by nominative plural (jas)"
        }
    },

    {
        id: "1.1.32_007",
        description: "Dvandva compound with sarvaadi in singular",
        word: "sarvaviśvaḥ", 
        context: {
            compound: {
                type: "dvandva",
                parts: ["sarva", "viśva"]
            },
            case: {
                vibhakti: "prathama",
                vacana: "ekavacana", // singular
                linga: "masculine"
            }
        },
        expected: {
            applies: false,
            reason: "Not followed by nominative plural (jas)"
        }
    },

    {
        id: "1.1.32_008",
        description: "Dvandva compound without sarvaadi words",
        word: "rāmakṛṣṇāḥ",
        context: {
            compound: {
                type: "dvandva",
                parts: ["rāma", "kṛṣṇa"], 
                meaning: "Rama and Krishna"
            },
            case: {
                vibhakti: "prathama",
                vacana: "bahuvacana",
                linga: "masculine"
            }
        },
        expected: {
            applies: false,
            reason: "Compound does not contain sarvaadi words"
        }
    },

    // Edge cases
    {
        id: "1.1.32_009",
        description: "Complex dvandva with multiple sarvaadi words",
        word: "sarvānyavara-uttarāḥ",
        context: {
            compound: {
                type: "dvandva",
                parts: ["sarva", "anya", "avara", "uttara"],
                meaning: "all, other, posterior and northern ones"
            },
            case: {
                vibhakti: "prathama",
                vacana: "bahuvacana",
                linga: "masculine"
            }
        },
        expected: {
            applies: true,
            sarvanama_status: "optional"
        }
    },

    {
        id: "1.1.32_010",
        description: "Dvandva with mixed sarvaadi and non-sarvaadi",
        word: "sarvarāmāḥ",
        context: {
            compound: {
                type: "dvandva", 
                parts: ["sarva", "rāma"],
                meaning: "all and Rama"
            },
            case: {
                vibhakti: "prathama",
                vacana: "bahuvacana",
                linga: "masculine"
            }
        },
        expected: {
            applies: true, // Contains at least one sarvaadi word
            sarvanama_status: "optional"
        }
    }
];

// Educational examples showing contrast with related sutras
const contrastiveExamples = [
    {
        sutra: "1.1.31",
        description: "Same compound in dvandva context without jas",
        word: "sarvaviśvam",
        context: {
            compound: { type: "dvandva", parts: ["sarva", "viśva"] },
            case: { vibhakti: "dvitiya", vacana: "ekavacana" }
        },
        result: "Not sarvanama (per 1.1.31)"
    },
    {
        sutra: "1.1.32", 
        description: "Same compound with jas ending",
        word: "sarvaviśvāḥ",
        context: {
            compound: { type: "dvandva", parts: ["sarva", "viśva"] },
            case: { vibhakti: "prathama", vacana: "bahuvacana" }
        },
        result: "Optionally sarvanama (per 1.1.32)"
    }
];

module.exports = {
    testCases,
    contrastiveExamples
};
