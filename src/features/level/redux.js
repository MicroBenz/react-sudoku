import axios from 'axios'
import set from 'lodash/set'
import validate from '../../utils/vallidate'

const initialState = {
  board: [],
  boardLoading: true,
  initial: [],
  isValid: false,
  isError: false,
  time: 0
}

const levelMap = {
  1: 'http://www.mocky.io/v2/5c1b2f393300005f007fd622',
  2: 'http://www.mocky.io/v2/5c1c4bb43100005500103ff9'
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_BOARD_PENDING':
      return {
        ...state,
        boardLoading: true
      }
    case 'LOAD_BOARD_FULFILLED': {
      const { data } = action.payload
      return {
        ...state,
        board: data.board,
        initial: data.initial,
        boardLoading: false
      }
    }
    case 'LOAD_BOARD_REJECTED':
      return {
        ...state,
        isError: true
      }
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

export const loadBoard = level => ({
  type: 'LOAD_BOARD',
  payload: axios.get(levelMap[level])
})

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
