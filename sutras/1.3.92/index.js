/**
 * Sutra 1.3.92: वृद्भ्यः स्यसनोः (vṛdabhyaḥ syasanoh)
 * After vṛt-class verbs, Parasmaipada optionally used when affixes स्य (future/conditional) or सन् (desiderative) follow.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1392(word, context = {}) {
  try {
    if (!word || typeof word !== 'string' || !validateSanskritWord(word)) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.92', confidence: 0 };
    }
    detectScript(word);

    const rootListIAST = ['vṛt'];
    const rootListDEV = ['वृत'];
    const root = (context.root || '').toLowerCase();
    const rootDev = (context.root || '');
    const inList = rootListIAST.some(r => root.includes(r)) || rootListDEV.some(r => rootDev.includes(r));
    if (!inList) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Root not vṛt-class', sutra: '1.3.92', confidence: 0.8 };

    const affix = (context.affix || '').toLowerCase();
    const hasFutureOrDesid = ['sy', 'स्य', 'san', 'सन्', 'lfut', 'lṛṭ', 'future', 'conditional', 'desiderative']
      .some(key => (context.affix || '').includes(key) || affix.includes(key));
    if (!hasFutureOrDesid) return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Neither स्य nor सन्', sutra: '1.3.92', confidence: 0.8 };

    return { applies: true, isParasmaipada: true, isOptional: true, reason: 'vṛt-class + स्य/सन् → optional Parasmaipada', sutra: '1.3.92', confidence: 0.82 };
  } catch (e) {
    return { applies: false, isParasmaipada: false, isOptional: false, reason: `Error: ${e.message}`, sutra: '1.3.92', confidence: 0 };
  }
}

export default sutra1392;
