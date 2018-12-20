import React, { Component } from 'react'
import { connect } from 'react-redux'
import pick from 'lodash/pick'

import './App.css'

import Cell from './components/Cell'
import {
  toggleCell,
  validateBoard,
  setTimer,
  loadBoard
} from './redux/reducers'

const enhance = connect(
  state =>
    pick(state, [
      'board',
      'initial',
      'isValid',
      'time',
      'boardLoading',
      'isError'
    ]),
  {
    handleClick: toggleCell,
    handleValidate: validateBoard,
    setTimer,
    loadBoard
  }
)

class App extends Component {
  componentDidMount() {
    this.props.loadBoard()
    this.timer = setInterval(() => {
      if (this.props.isValid) {
        clearInterval(this.timer)
      } else {
        this.props.setTimer()
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { board, initial, isValid, time, boardLoading, isError } = this.props
    return (
      <div className="App">
        <div className="board">
          {isError ? (
            <p>Error Load Board</p>
          ) : boardLoading ? (
            <p>Loading</p>
          ) : (
            board.map((row, rowIndex) =>
              row.map((cell, cellIndex) => (
                <Cell
                  number={cell}
                  key={`${rowIndex} - ${cellIndex}`}
                  isInitial={initial[rowIndex][cellIndex]}
                  handleClick={() =>
                    this.props.handleClick(rowIndex, cellIndex)
                  }
                />
              ))
            )
          )}
        </div>
        <p>Time: {time} seconds</p>
        <p>{isValid ? 'Board is valid!' : 'Board is invalid!'}</p>
        <button onClick={this.props.handleValidate}>Validate</button>
      </div>
    )
  }
}

export default enhance(App)
