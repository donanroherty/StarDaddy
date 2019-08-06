import { sanitizeString, stringToArray, formatTime } from 'utils/string-helpers'

test('sanitizeString()', () => {
  expect(sanitizeString('A,b-C_d*e.f')).toBe('A b C d e f')
})

test('stringToArray()', () => {
  expect(stringToArray('A,b-C_d*e.f')).toEqual(['A', 'b', 'C', 'd', 'e', 'f'])
})

describe('formatTime() returns correct values', () => {
  const now = new Date('2019-05-19T21:46:04.897Z')
  let then = new Date(now)
  afterEach(() => {
    then = new Date(now)
  })

  test('months, previous year', () => {
    then.setMonth(now.getMonth() - 22)
    expect(formatTime(then.toISOString(), now)).toBe('Updated on Jul 19, 2017')
  })

  test('month, same year', () => {
    then.setMonth(now.getMonth() - 3)
    expect(formatTime(then.toISOString(), now)).toBe('Updated  Feb 19')
  })

  test('days', () => {
    then.setDate(now.getDate() - 20)
    expect(formatTime(then.toISOString(), now)).toBe('Updated 20 days ago')
  })

  test('hours', () => {
    then.setHours(now.getHours() - 5)
    expect(formatTime(then.toISOString(), now)).toBe('Updated 5 hours ago')
  })

  test('minutes', () => {
    then.setMinutes(now.getMinutes() - 13)
    expect(formatTime(then.toISOString(), now)).toBe('Updated 13 minutes ago')
  })

  test('seconds', () => {
    then.setSeconds(now.getSeconds() - 27)
    expect(formatTime(then.toISOString(), now)).toBe('Updated a moment ago')
  })
})
