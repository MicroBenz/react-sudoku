import reducer, { toggleCell } from './redux'

describe('reducer', () => {
  it('Initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      board: [],
      boardLoading: true,
      initial: [],
      isValid: false,
      isError: false,
      time: 0
    })
  })
  it('TOGGLE_CELL', () => {
    const result = reducer(
      {
        board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        initial: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true]
        ]
      },
      toggleCell(0, 0)
    )
    expect(result).toEqual({
      board: [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      initial: [
        [true, true, true, true],
        [true, true, true, true],
        [true, true, true, true],
        [true, true, true, true]
      ]
    })
  })
})
