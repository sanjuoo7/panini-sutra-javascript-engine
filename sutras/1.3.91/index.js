/**
 * Sutra 1.3.91: द्युद्भ्यो लुङि (dayudabhyo luṅi)
 * After verbs like द्युत् (to shine) etc., Parasmaipada optionally used when Aorist (लुङ्) affixes follow.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1391(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.91', confidence: 0 };
    }
    detectScript(word);

    const rootListIAST = ['dyut'];
    const rootListDEV = ['द्युत'];
    const root = (context.root || '').toLowerCase();
    const rootDev = (context.root || '');
    const inList = rootListIAST.some(r => root.includes(r)) || rootListDEV.some(r => rootDev.includes(r));
    if (!inList) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Root not in dyut-class', sutra: '1.3.91', confidence: 0.8 };

    const lakara = (context.lakara || '').toLowerCase();
    const isAorist = lakara === 'luṅ' || lakara === 'aorist' || lakara === 'लुङ्';
    if (!isAorist) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Not Aorist (लुङ्)', sutra: '1.3.91', confidence: 0.8 };

    return { applies: true, isParasmaipada: true, isOptional: true, reason: 'dyut-class with लुङ् → optional Parasmaipada', sutra: '1.3.91', confidence: 0.82 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, isOptional: false, reason: `Error: ${e.message}`, sutra: '1.3.91', confidence: 0 };
  }
}

export default sutra1391;
