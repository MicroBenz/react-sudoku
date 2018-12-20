import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'

import Cell from './components/Cell'
import validate from './utils/vallidate'
import { toggleCell } from './redux/reducers'

const enhance = connect(
  state => ({
    board: state.board,
    initial: state.initial
  }),
  dispatch => ({
    handleClick: (rowIndex, cellIndex) =>
      dispatch(toggleCell(rowIndex, cellIndex))
  })
)

class App extends Component {
  state = {
    time: 0
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(state => ({
        time: state.time + 1
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleValidate = () => {
    const isValid = validate(this.props.board)
    if (isValid) {
      clearInterval(this.timer)
    }
    this.setState({
      text: isValid ? 'Board is valid!' : 'Board is invalid!'
    })
  }

  render() {
    const { board, initial } = this.props
    const { text, time } = this.state
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
        {text && <p>{text}</p>}
        <button onClick={this.handleValidate}>Validate</button>
      </div>
    )
  }
}

export default enhance(App)
