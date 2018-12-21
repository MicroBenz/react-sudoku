import boardValidate from './vallidate'

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
    },
    {
      input: [[3, 4, 1, 0], [0, 2, 0, 0], [0, 0, 2, 0], [0, 1, 4, 3]],
      expect: false,
      description: '#3 Failed board'
    },
    {
      input: [[3, 4, 1, 2], [1, 2, 3, 4], [4, 3, 2, 1], [2, 1, 4, 3]],
      expect: true,
      description: '#4 Passed board'
    }
  ]
  testCases.map(testCase =>
    it(testCase.description, () => {
      const result = boardValidate(testCase.input)
      expect(result).toBe(testCase.expect)
    })
  )
})
