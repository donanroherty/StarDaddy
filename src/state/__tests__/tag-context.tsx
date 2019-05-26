import { mergeTagArrays, Tag } from '../tag-context'

test('mergeTagArrays()', () => {
  const arrA: Tag[] = [{ name: 'abc' }, { name: 'def' }, { name: 'ghi' }]
  const arrB: Tag[] = [{ name: 'ghi' }, { name: 'jkl' }, { name: 'nmo' }]
  expect(mergeTagArrays(arrA, arrB)).toEqual([
    { name: 'abc' },
    { name: 'def' },
    { name: 'ghi' },
    { name: 'jkl' },
    { name: 'nmo' }
  ])
})
