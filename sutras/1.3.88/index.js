/**
 * Sutra 1.3.88: अणावकर्मकाच्चित्तवत्कर्तृकात् (aṇāvakarmakāccittavatkartṛkāt)
 * Parasmaipada after causatives of verbs which (in their base form) were intransitive and had a sentient agent,
 * even if the fruit accrues to the agent.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1388(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.88', confidence: 0 };
    }
    detectScript(word);

    const causative = context.hasCausative === true || /यति|aya|ayati/i.test(word);
    if (!causative) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Not causative', sutra: '1.3.88', confidence: 0.85 };

    const baseTransitivity = context.baseTransitivity || context.baseVoice;
    const wasIntransitive = baseTransitivity === 'intransitive' || baseTransitivity === 'akarmaka';
    if (!wasIntransitive) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Base verb not intransitive', sutra: '1.3.88', confidence: 0.8 };

    const agentType = (context.agentType || '').toLowerCase();
    const sentient = ['sentient', 'conscious', 'rational', 'cetanā', 'cetana', 'चित्तवत्'].some(k => agentType.includes(k));
    if (!sentient) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Agent not sentient/rational', sutra: '1.3.88', confidence: 0.7 };

    return { applies: true, isParasmaipada: true, isOptional: false, reason: 'Causative of base intransitive with sentient agent → Parasmaipada', sutra: '1.3.88', confidence: 0.86 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, isOptional: false, reason: `Error: ${e.message}`, sutra: '1.3.88', confidence: 0 };
  }
}

export default sutra1388;
