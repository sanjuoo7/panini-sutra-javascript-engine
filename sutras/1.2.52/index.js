/** Sutra 1.2.52: विशेषणानां चाजातेः */
import { propagateRetentionToQualifier } from '../sanskrit-utils/elision-retention.js';

export function applySutra1_2_52(qualifier, retentionResult, context = {}) {
  return propagateRetentionToQualifier(qualifier, retentionResult, { pos: context.pos, isAdjective: context.isAdjective, features: context.features });
}
export default applySutra1_2_52;
