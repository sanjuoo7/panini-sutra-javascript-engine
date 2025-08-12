import { sutra_1_2_60 } from './index.js';

describe('Sutra 1.2.60 (फल्गुनीप्रोष्ठपदानां च नक्षत्रे)', () => {
	test('applies to Phalgunī dual (IAST) in nakshatra domain', () => {
		const res = sutra_1_2_60('phalgunī', { domain: 'nakshatra' });
		expect(res.applied).toBe(true);
		expect(res.semanticPlural).toBe(true);
		expect(res.numberOptions).toContain('dual');
	});

	test('applies to Proṣṭhapadā dual (Devanagari) in nakshatra domain', () => {
		const res = sutra_1_2_60('प्रोष्ठपदा', { semanticCategory: 'nakshatra' });
		expect(res.applied).toBe(true);
		expect(res.semanticPlural).toBe(true);
	});

	test('does not apply outside nakshatra domain', () => {
		const res = sutra_1_2_60('phalgunī', {});
		expect(res.applied).toBe(false);
	});

	test('does not apply to non-star term', () => {
		const res = sutra_1_2_60('devau', { domain: 'nakshatra' });
		expect(res.applied).toBe(false);
	});

	test('whitespace trimmed input still applies', () => {
		const res = sutra_1_2_60('  phalgunī  ', { domain: 'nakshatra' });
		expect(res.applied).toBe(true);
	});

	test('invalid term handled gracefully', () => {
		const res = sutra_1_2_60(null, { domain: 'nakshatra' });
		expect(res.applied).toBe(false);
		expect(res.explanation).toMatch(/Invalid/);
	});
});
