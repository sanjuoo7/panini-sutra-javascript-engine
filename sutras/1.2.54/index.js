/** Sutra 1.2.54: लुब्योगाप्रख्यानात् */
import { classifyAshishya } from '../sanskrit-utils/non-elision-classification.js';
export function applySutra1_2_54(item, context={}) { return { sutra:'1.2.54', ...classifyAshishya(item, { ...context, ashishyaFlags:{ s1_2_54:true } }) }; }
export default applySutra1_2_54;
