import React, { Component } from 'react'
import { connect } from 'react-redux'
import pick from 'lodash/pick'

import './App.css'

import Cell from './components/Cell'
import { toggleCell, validateBoard, setTimer } from './redux/reducers'

const enhance = connect(
  state => pick(state, ['board', 'initial', 'isValid', 'time']),
  {
    handleClick: toggleCell,
    handleValidate: validateBoard,
    setTimer
  }
)

class App extends Component {
  componentDidMount() {
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
    const { board, initial, isValid, time } = this.props
    return (
      <div className="App">
        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <Cell
                number={cell}
                key={`${rowIndex} - ${cellIndex}`}
                isInitial={initial[rowIndex][cellIndex]}
                handleClick={() => this.props.handleClick(rowIndex, cellIndex)}
              />
            ))
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
