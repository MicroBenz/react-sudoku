import React, { Component } from 'react'
import set from 'lodash/set'
import './App.css'

import Cell from './components/Cell'

class App extends Component {
  state = {
    board: [[1, 2, 3, 4], [3, 4, 0, 0], [2, 0, 4, 0], [4, 0, 0, 2]],
    initial: [
      [true, true, true, true],
      [true, true, false, false],
      [true, false, true, false],
      [true, false, false, true]
    ]
  }

  handleClick = (rowIndex, cellIndex) => {
    this.setState(state => ({
      board: set(
        state.board,
        `${rowIndex}.${cellIndex}`,
        (state.board[rowIndex][cellIndex] + 1) % 5
      )
    }))
  }

  render() {
    const { board, initial } = this.state
    return (
      <div className="App">
        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <Cell
                number={cell}
                key={`${rowIndex} - ${cellIndex}`}
                isInitial={initial[rowIndex][cellIndex]}
                handleClick={() => this.handleClick(rowIndex, cellIndex)}
              />
            ))
          )}
        </div>
      </div>
    )
  }
}

export default App
