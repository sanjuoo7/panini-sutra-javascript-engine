/** Sutra 1.2.51: लुपि युक्तवद्व्यक्तिवचने */
import { analyzeLupRetention } from '../sanskrit-utils/elision-retention.js';

export function applySutra1_2_51(baseForm, originalFeatures = {}, context = {}) {
  return analyzeLupRetention(baseForm, originalFeatures, { elisionType: context.taddhitaElisionType, script: context.script });
}
export default applySutra1_2_51;
