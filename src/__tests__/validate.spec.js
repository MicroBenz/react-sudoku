import boardValidate from '../utils/vallidate'

describe('Board Validation function', () => {
  const testCases = [
    {
      input: [[1, 2, 3, 4], [3, 4, 0, 0], [2, 0, 4, 0], [4, 0, 0, 2]],
      expect: false,
      description: '#1 Failed board'
    },
    {
      input: [[1, 2, 3, 4], [3, 4, 2, 1], [2, 1, 4, 3], [4, 3, 1, 2]],
      expect: true,
      description: '#2 Passed board'
    }
  ]
  testCases.map(testCase =>
    it(testCase.description, () => {
      const result = boardValidate(testCase.input)
      expect(result).toBe(testCase.expect)
    })
  )
})
