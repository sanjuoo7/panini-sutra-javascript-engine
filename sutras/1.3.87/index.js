/**
 * Sutra 1.3.87: निगरणचलनार्थेभ्यः (nigaraṇacalanārthebhyaḥ)
 * And after causatives of verbs in the senses of swallowing/ingesting (निगरण) and moving/shaking (चलन),
 * Parasmaipada is used even when the fruit accrues to the agent (extends 1.3.86 class-like behavior to semantic classes).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1387(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.87', confidence: 0 };
    }
    detectScript(word); // script inferred if needed later

    const causative = context.hasCausative === true || /यति|aya|ayati/i.test(word);
    if (!causative) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Not causative', sutra: '1.3.87', confidence: 0.85 };

    // Semantic gate: senses of swallowing/ingesting or moving/shaking
    const meaning = (context.meaning || context.sense || '').toLowerCase();
    const sema = [
      // English
      'swallow', 'ingest', 'eat', 'devour', 'gulp', 'move', 'shake', 'agitate', 'stir', 'shift', 'swing', 'vibrate',
      // IAST
      'nigaraṇa', 'nigaraṇaḥ', 'calana', 'calanaḥ',
      // Devanagari
      'निगरण', 'चलन'
    ];
    const matchesSense = sema.some(k => meaning.includes(k));
    if (!matchesSense) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Sense not निगरण/चलन', sutra: '1.3.87', confidence: 0.7 };

    return { applies: true, isParasmaipada: true, isOptional: false, reason: 'Causative + निगरण/चलन sense → Parasmaipada', sutra: '1.3.87', confidence: 0.85 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, isOptional: false, reason: `Error: ${e.message}`, sutra: '1.3.87', confidence: 0 };
  }
}

export default sutra1387;
