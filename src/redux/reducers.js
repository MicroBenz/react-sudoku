import axios from 'axios'
import set from 'lodash/set'
import validate from '../utils/vallidate'

const initialState = {
  board: [],
  boardLoading: true,
  initial: [],
  isValid: false,
  isError: false,
  time: 0
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

export const loadBoard = levelId => ({
  type: 'LOAD_BOARD',
  payload: axios.get(`http://www.mocky.io/v2/${levelId}`)
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
