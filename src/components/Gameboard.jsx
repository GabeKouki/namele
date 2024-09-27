import React, { useState, useEffect } from 'react'
import './Gameboard.css'

export default function Gameboard({ theme }) {
  const rows = 6
  const cols = 5
  const initialBoard = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill({ letter: '', status: '' }))

  const [board, setBoard] = useState(initialBoard)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const targetWord = 'react'

  useEffect(() => {
    const handleKeyDown = (event) => {
      //! check if the row they are guessing on is within the bounds of the board
      if (currentRow < rows) {
        //! check the keyDown event to see check for enter key
        if (event.key === 'Enter') {
          //! Check if the guess is a valid length when user presses enter
          if (currentGuess.length === cols) {
            //! If the guess is a valid length, invoke checkGuess function
            //! will fetch Guess in checkGuess() - function is being invoked when the user guess is valid
            checkGuess()
          } else {
            //!Change this to be an actual formatted timed alert
            alert('Please enter a valid guess')
          }
        }
        //!Check if the user wants to delete last typed letter from their guess
        else if (event.key === 'Backspace') {
          //! Deleting the last letter from the currentGuess array
          setCurrentGuess((prev) => prev.slice(0, -1))
        }
        //! check if the user is typing a valid letter, uppercase or lowercase incase of capslock
        else if (/^[a-zA-Z]$/.test(event.key)) {
          //! Logic to ensure user isn't guessing a word longer than 5 characters
          if (currentGuess.length < cols) {
            //! Adding the letter to the currentGuess array
            setCurrentGuess((prev) => prev + event.key.toUpperCase())
          }
        }
      }
    }
    //! Listening for user keyboard presses
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentGuess, currentRow])

  const checkGuess = () => {
    const newBoard = [...board]
    const guessLetters = currentGuess.split('')
    const targetLetters = targetWord.split('')

    let statuses = Array(cols).fill('absent')
    let tempTargetLetters = [...targetLetters]

    for (let i = 0; i < cols; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        statuses[i] = 'correct'
        tempTargetLetters[i] = null
      }
    }

    for (let i = 0; i < cols; i++) {
      if (statuses[i] !== 'correct' && tempTargetLetters.includes(guessLetters[i])) {
        statuses[i] = 'present'
        tempTargetLetters[tempTargetLetters.indexOf(guessLetters[i])] = null
      }
    }

    for (let i = 0; i < cols; i++) {
      newBoard[currentRow][i] = {
        letter: guessLetters[i],
        status: statuses[i],
      }
    }


    setBoard(newBoard)
    setCurrentGuess('')
    setCurrentRow((prevRow) => prevRow + 1)

    
  }
  return (
    <>
      <div className="gameboard-container" data-theme={theme}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="gameboard-row">
            {row.map((cell, cellIndex) => {
              let displayLetter = cell.letter

              if (rowIndex === currentRow) {
                displayLetter = currentGuess[cellIndex] || ''
              }
              return (
                <div key={cellIndex} className="gameboard-cell">
                  <h1>{displayLetter}</h1>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
