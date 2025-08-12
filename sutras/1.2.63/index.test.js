import { sutra_1_2_63 } from './index.js';

describe('Sutra 1.2.63 (तिष्यपुनर्वस्वोर्नक्षत्रद्वंद्वे बहुवचनस्य)', () => {
	test('replaces plural with dual in dvandva object', () => {
		const compound = { type:'dvandva', members:[{ lemma:'tiṣya', number:'plural' }, { lemma:'punarvasu', number:'plural' }] };
		const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
		expect(res.applied).toBe(true);
		expect(res.replaced).toBe(true);
		expect(res.originalNumber).toBe('plural');
	});

	test('applies (no replace) when already dual', () => {
		const compound = { type:'dvandva', members:[{ lemma:'punarvasu', number:'dual' }, { lemma:'tiṣya', number:'dual' }] };
		const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
		expect(res.applied).toBe(true);
		expect(res.replaced).toBe(false);
	});

	test('string input tiṣya+punarvasu with plural context replaced', () => {
		const res = sutra_1_2_63('tiṣya+punarvasu', { domain: 'nakshatra', number: 'plural' });
		expect(res.applied).toBe(true);
		expect(res.replaced).toBe(true);
	});

	test('order-insensitive detection', () => {
		const res = sutra_1_2_63('punarvasu tiṣya', { domain: 'nakshatra', number: 'plural' });
		expect(res.applied).toBe(true);
	});

	test('fails outside nakshatra domain', () => {
		const compound = { type:'dvandva', members:[{ lemma:'tiṣya' }, { lemma:'punarvasu' }] };
		const res = sutra_1_2_63(compound, {});
		expect(res.applied).toBe(false);
	});

	test('fails when one star missing', () => {
		const compound = { type:'dvandva', members:[{ lemma:'tiṣya', number:'plural' }, { lemma:'viśākhā', number:'plural' }] };
		const res = sutra_1_2_63(compound, { domain: 'nakshatra' });
		expect(res.applied).toBe(false);
	});

	test('invalid compound input handled', () => {
		const res = sutra_1_2_63(null, { domain: 'nakshatra' });
		expect(res.applied).toBe(false);
	});
});
