import React, { useState, useEffect, useCallback } from 'react'
import './Gameboard.css'
import { useMount } from '../hooks/useMount'
import { namele } from './Functions'
import GameOver from './GameOver'
import Keyboard from './Keyboard'
import { getRandomName } from './names'

export default function Gameboard({ theme }) {
  const rows = 6
  const cols = 5
  const initialBoard = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill({ letter: '', status: '' }))
  const [board, setBoard] = useState(initialBoard)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [targetWord, setTargetWord] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [endState, setEndState] = useState('')
  const [showGameOver, setShowGameOver] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleKeyDown = useCallback(
    (event) => {
      if (currentRow < rows) {
        switch (event.key) {
          case 'Enter':
            if (currentGuess.length === cols) {
              namele.checkGuess(
                board,
                currentGuess,
                targetWord,
                cols,
                currentRow,
                setGameOver,
                setBoard,
                setCurrentGuess,
                setCurrentRow,
                setEndState
              )
            } else {
              setAlertMessage('Please enter a valid guess')
              setTimeout(() => setAlertMessage(''), 3000)
            }
            break
          case 'Backspace':
            setCurrentGuess((prev) => prev.slice(0, -1))
            break
          case '⌫':
            setCurrentGuess((prev) => prev.slice(0, -1))
            break
          default:
            if (/^[a-zA-Z]$/.test(event.key)) {
              if (currentGuess.length < cols) {
                setCurrentGuess((prev) => prev + event.key.toLowerCase())
              }
            }
        }
      }
    },
    [currentGuess, currentRow, board, targetWord]
  )

  useMount(() => {
    setTargetWord(getRandomName().toLowerCase())
  })

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setShowGameOver(true)
      }, 0)
    }
  }, [gameOver])

  useEffect(() => {
    if (gameOver) {
      return
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, gameOver])

  return (
    <>
      {showGameOver && (
        <GameOver
          endState={endState}
          setGameOver={setGameOver}
          setEndState={setEndState}
          setBoard={setBoard}
          setCurrentRow={setCurrentRow}
          setCurrentGuess={setCurrentGuess}
          rows={rows}
          cols={cols}
          setTargetWord={setTargetWord}
          setShowGameOver={setShowGameOver}
          targetWord={targetWord}
        />
      )}
      <div className="gameboard-container" data-theme={theme}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="gameboard-row">
            {row.map((cell, cellIndex) => {
              let displayLetter = cell.letter
              let cellStatus = cell.status

              if (rowIndex === currentRow) {
                displayLetter = currentGuess[cellIndex] || ''
                cellStatus = ''
              }
              return (
                <div key={cellIndex} className={`gameboard-cell ${cellStatus}`}>
                  <h1>{displayLetter}</h1>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <Keyboard keyClick={handleKeyDown} />
      {alertMessage && (
        <div className="custom-alert">
          <p>{alertMessage}</p>
        </div>
      )}
    </>
  )
}
