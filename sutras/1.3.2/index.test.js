import { isNonNasalizedVowelItMarker } from './index.js';

const POSITIVE_IAST = ['a','i','u','ṛ','ḷ','e','o','ai','au','ā','ī','ū'];
const POSITIVE_DEV = ['अ','इ','उ','ऋ','ऌ','ए','ओ','ऐ','औ','आ','ई','ऊ'];
const NEGATIVE_IAST = ['aṃ','iṃ','uṃ','ã','aḥ','k','g','m','xyz','',null,'1'];
const NEGATIVE_DEV = ['अं','इं','उं','अः','क','ग','म','',null,'१'];
const EDGE_IAST = ['ā','ī','ū'];
const EDGE_DEV = ['आ','ई','ऊ'];

describe('Sutra 1.3.2: upadeśe \'janunāsika it', () => {
	test('positive cases (IAST)', () => {
		for(const v of POSITIVE_IAST){
			const res = isNonNasalizedVowelItMarker(v);
			expect(res.isIt).toBe(true);
			expect(res.reason).toBe('non-nasalized-vowel');
		}
	});
	test('positive cases (Devanagari)', () => {
		for(const v of POSITIVE_DEV){
			const res = isNonNasalizedVowelItMarker(v);
			expect(res.isIt).toBe(true);
		}
	});
	test('negative cases (IAST)', () => {
		for(const v of NEGATIVE_IAST){
			const res = isNonNasalizedVowelItMarker(v);
			expect(res.isIt).toBe(false);
		}
	});
	test('negative cases (Devanagari)', () => {
		for(const v of NEGATIVE_DEV){
			const res = isNonNasalizedVowelItMarker(v);
			expect(res.isIt).toBe(false);
		}
	});
	test('edge cases (long vowels)', () => {
		for(const v of EDGE_IAST.concat(EDGE_DEV)){
			const res = isNonNasalizedVowelItMarker(v);
			expect(res.isIt).toBe(true);
		}
	});
	test('structure of result', () => {
		const res = isNonNasalizedVowelItMarker('a');
		expect(res).toHaveProperty('isIt', true);
		expect(res).toHaveProperty('vowel', 'a');
		expect(res).toHaveProperty('script');
		expect(res).toHaveProperty('reason', 'non-nasalized-vowel');
	});
});
