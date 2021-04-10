const { palindrome } = require('../utils/for_testing')

test('palindrome from Josemon', () => {
  const result = palindrome('josemon')

  expect(result).toBe('nomesoj')
})

test('palindrome of empty string', () => {
  const result = palindrome('')
  expect(result).toBe('')
})

test('palindrome ofundefined', () => {
  const result = palindrome(undefined)
  expect(result).toBeUndefined()
})
