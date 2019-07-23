import { sanitizeString, stringToArray } from 'utils/string-helpers'

test('sanitizeString()', () => {
  expect(sanitizeString('A,b-C_d*e.f')).toBe('A b C d e f')
})

test('stringToArray()', () => {
  expect(stringToArray('A,b-C_d*e.f')).toEqual(['A', 'b', 'C', 'd', 'e', 'f'])
})
