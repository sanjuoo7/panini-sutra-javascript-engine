/** Sutra 1.2.41: अपृक्त एकाल् प्रत्ययः */
import { classifyAffixShape } from '../sanskrit-utils/affix-shape-analysis.js';

export function applySutra1_2_41(affix, options = {}) {
  const shape = classifyAffixShape(affix, options);
  return {
    sutra: '1.2.41',
    affix,
    applies: shape.isAprkta,
    isAprkta: shape.isAprkta,
    shape
  };
}
export default applySutra1_2_41;
