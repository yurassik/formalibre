import { fromFlat } from '../utils';

test('fromFlat works correctly', () => {
  expect(fromFlat({ 'contact.city': 'Lviv' })).toEqual({ contact: { city: 'Lviv' } });
  expect(fromFlat({ phone: '123' })).toEqual({ phone: '123' });
  expect(fromFlat({ 'phones[0]': '123', 'phones[1]': '321' })).toEqual({ phones: ['123', '321'] });
});
