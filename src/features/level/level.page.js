import React, { Component } from 'react'
import { connect } from 'react-redux'
import pick from 'lodash/pick'
import styled, { createGlobalStyle } from 'styled-components'

import Cell from './components/Cell'
import { toggleCell, validateBoard, setTimer, loadBoard } from './redux'

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
`

const Button = styled.button`
  padding: 15px;
  border: 0;
  background: #444;
  color: #fff;
  font-size: 25px;
  border-radius: 5px;
  margin-top: 10px;
`

const GlobalStyle = createGlobalStyle`
  p {
    text-align: center;
    font-size: 30px;
    margin-top: 20px;
    display: inline-block;
    width: 100%;
  }
`

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

class BoardPage extends Component {
  componentDidMount() {
    const level = parseInt(this.props.match.params.levelId)
    this.props.loadBoard(level)
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
      <Container>
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
        <Button onClick={this.props.handleValidate}>Validate</Button>
        <GlobalStyle />
      </Container>
    )
  }
}

export default enhance(BoardPage)
