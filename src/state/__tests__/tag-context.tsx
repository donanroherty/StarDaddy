import { mergeTagArrays } from '../tag-context'

test('mergeTagArrays()', () => {
  const arrA: string[] = ['abc', 'def', 'ghi']
  const arrB: string[] = ['ghi', 'jkl', 'nmo']
  expect(mergeTagArrays(arrA, arrB)).toEqual([
    'abc',
    'def',
    'ghi',
    'jkl',
    'nmo'
  ])
})
