import boardValidate from '../utils/vallidate'

describe('Board Validation function', () => {
  const testCases = [
    {
      input: [],
      expect: false,
      description: '#1 Empty -> Fail'
    }
  ]
  testCases.map(testCase =>
    it(testCase.description, () => {
      const result = boardValidate(testCase.input)
      expect(result).toBe(false)
    })
  )
})
