import React from 'react'

const Cell = props => {
  const { number, isInitial, handleClick } = props
  return (
    <div
      onClick={isInitial ? null : handleClick}
      className={`cell ${isInitial ? 'initial' : ''}`}
    >
      {number !== 0 && number}
    </div>
  )
}

export default Cell
