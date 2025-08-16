/**
 * Sutra 1.3.89: न पादम्याङ्यमाङ्यसपरिमुहरुचिनृतिवदवसः (na pādamyāṅyamāṅyasaparimuharucinṛtivadavasaḥ)
 * Exception: Parasmaipada is NOT used after causatives of the listed roots: पा, दम, आयम्, आयस्, परिमुह, रुच्, नृत्, वद्, वस्.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1389(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, blocksParasmaipada: false, reason: 'Invalid input', sutra: '1.3.89', confidence: 0 };
    }
    const script = detectScript(word);

    const ROOTS_DEV = ['पा', 'दम', 'आयम्', 'आयस', 'परिमुह', 'रुच', 'नृत', 'वद', 'वस्'];
    const ROOTS_IAST = ['pā', 'dam', 'āyam', 'āyas', 'parimuh', 'ruc', 'nṛt', 'vad', 'vas'];

    const root = (context.root || '').trim();
    const rootLower = root.toLowerCase();

    let listed = false;
    if (root) {
      listed = ROOTS_DEV.some(r => root.includes(r)) || ROOTS_IAST.some(r => rootLower.includes(r));
    } else {
      const w = word.toLowerCase();
      listed = script === 'Devanagari'
        ? ROOTS_DEV.some(r => word.includes(r))
        : ROOTS_IAST.some(r => w.includes(r));
    }

    if (!listed) return { applies: false, blocksParasmaipada: false, reason: 'Root not in exception list', sutra: '1.3.89', confidence: 0.8 };

    const causative = context.hasCausative === true || /यति|aya|ayati/i.test(word);
    if (!causative) return { applies: false, blocksParasmaipada: false, reason: 'Not causative', sutra: '1.3.89', confidence: 0.85 };

    return { applies: true, blocksParasmaipada: true, reason: 'Exception list root in causative → no Parasmaipada', sutra: '1.3.89', confidence: 0.88 };
  } catch (e) {
    return { applies: false, blocksParasmaipada: false, reason: `Error: ${e.message}`, sutra: '1.3.89', confidence: 0 };
  }
}

export default sutra1389;
