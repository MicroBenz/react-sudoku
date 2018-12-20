import set from 'lodash/set'
import validate from '../utils/vallidate'

const initialState = {
  board: [[1, 2, 3, 4], [3, 4, 0, 0], [2, 0, 4, 0], [4, 0, 0, 2]],
  initial: [
    [true, true, true, true],
    [true, true, false, false],
    [true, false, true, false],
    [true, false, false, true]
  ],
  isValid: false,
  time: 0
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
    case 'VALIDATE_BOARD': {
      const isValid = validate(state.board)
      return {
        ...state,
        isValid
      }
    }
    case 'SET_TIMER': {
      return {
        ...state,
        time: state.time + 1
      }
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

export const validateBoard = () => ({
  type: 'VALIDATE_BOARD'
})

export const setTimer = () => ({
  type: 'SET_TIMER'
})
