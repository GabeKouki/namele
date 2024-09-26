import React, { useState, useEffect } from 'react'
import './Gameboard.css'

export default function Gameboard({ theme }) {
  const rows = 6
  const cols = 5
  const word = 'react'
  const initialBoard = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill({ letter: '', status: '' }));

  const [currentGuess, setCurrentGuess] = useState('')
  const [board, setBoard] = useState(initialBoard)

  return (
    <>
      <div className="gameboard-container" data-theme={theme}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="gameboard-row">
            {row.map((cell, cellIndex) => {
              let displayLetter = cell.letter

               displayLetter = currentGuess[cellIndex] || ''
              return (
                <div key={cellIndex} className="gameboard-cell">
                  {displayLetter}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
