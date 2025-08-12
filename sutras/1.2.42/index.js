/** Sutra 1.2.42: तत्पुरुषः समानाधिकरणः कर्मधारयः */
import { classifyTatpurushaSubtype } from '../sanskrit-utils/compound-analysis.js';

export function applySutra1_2_42(compound){
  const classification = classifyTatpurushaSubtype(compound);
  return { sutra: '1.2.42', ...classification };
}
export default applySutra1_2_42;
