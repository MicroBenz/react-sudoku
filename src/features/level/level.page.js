import React, { useState, useEffect } from 'react'
import pick from 'lodash/pick'
import set from 'lodash/set'
import styled, { createGlobalStyle } from 'styled-components'
import axios from 'axios'

import Cell from './components/Cell'
import { toggleCell, validateBoard, setTimer, loadBoard } from './redux'
import vallidate from '../../utils/vallidate'

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

const createUseTimer = () => {
  let interval
  let localTimer = 0
  return () => {
    const [timer, setTimer] = useState(0)
    // console.log('use', localTimer)]
    const stopTimer = () => (interval ? clearInterval(interval) : null)
    useEffect(() => {
      // let localTimer = 0
      interval = setInterval(() => {
        localTimer = localTimer + 1
        setTimer(localTimer)
      }, 1000)
      return () => {
        console.log('effect', interval)
        stopTimer()
      }
    }, [])
    return [timer, stopTimer]
  }
}

const useTimer = createUseTimer()

const levelMap = {
  1: 'http://www.mocky.io/v2/5c1b2f393300005f007fd622',
  2: 'http://www.mocky.io/v2/5c1c4bb43100005500103ff9'
}

const useBoard = (level, stopTimer) => {
  const [board, setBoard] = useState({
    board: [],
    initial: [],
    loading: true,
    error: false,
    isValid: false
  })
  useEffect(() => {
    axios
      .get(levelMap[level])
      .then(resp => {
        setBoard({
          ...board,
          board: resp.data.board,
          initial: resp.data.initial,
          loading: false
        })
      })
      .catch(() => {
        setBoard({
          ...board,
          error: true
        })
      })
  }, [])
  return [
    board,
    (rowIndex, cellIndex) => {
      console.log(rowIndex, cellIndex, board)
      setBoard({
        ...board,
        board: set(
          board.board,
          `${rowIndex}.${cellIndex}`,
          (board.board[rowIndex][cellIndex] + 1) % 5
        )
      })
    },
    () => {
      const isBoardValid = vallidate(board.board)
      if (isBoardValid) {
        stopTimer()
      }
      setBoard({
        ...board,
        isValid: isBoardValid
      })
    }
  ]
}

const BoardPage = props => {
  const [time, stopTimer] = useTimer()
  const [board, toggleCell, validateBoard] = useBoard(
    parseInt(props.match.params.levelId),
    stopTimer
  )
  // useInitialBoard(
  //   props.loadBoard,
  //   parseInt(props.match.params.levelId),
  //   data => {
  //     boardActions.setBoardFromAPI(data.board, data.initial)
  //   }
  // )
  console.log(board)
  return (
    <Container>
      <div className="board">
        {board.error ? (
          <p>Error Load Board</p>
        ) : board.loading ? (
          <p>Loading</p>
        ) : (
          board.board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <Cell
                number={cell}
                key={`${rowIndex} - ${cellIndex}`}
                isInitial={board.initial[rowIndex][cellIndex]}
                handleClick={() => toggleCell(rowIndex, cellIndex)}
              />
            ))
          )
        )}
      </div>
      <p>Time: {time} seconds</p>
      <p>{board.isValid ? 'Board is valid!' : 'Board is invalid!'}</p>
      <Button onClick={validateBoard}>Validate</Button>
      <GlobalStyle />
    </Container>
  )
}

export default BoardPage
