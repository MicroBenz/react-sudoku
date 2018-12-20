import set from 'lodash/set'

const initialState = {
  board: [[1, 2, 3, 4], [3, 4, 0, 0], [2, 0, 4, 0], [4, 0, 0, 2]],
  initial: [
    [true, true, true, true],
    [true, true, false, false],
    [true, false, true, false],
    [true, false, false, true]
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_CELL':
      return {
        ...state,
        board: [
          ...set(
            state.board,
            `${action.rowIndex}.${action.cellIndex}`,
            (state.board[action.rowIndex][action.cellIndex] + 1) % 5
          )
        ]
      }
    default:
      return state
  }
}

export const toggleCell = (rowIndex, cellIndex) => ({
  type: 'TOGGLE_CELL',
  rowIndex,
  cellIndex
})
