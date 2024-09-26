import React, { useState, useEffect } from 'react'
import './Gameboard.css'

export default function Gameboard({ theme }) {
  const rows = 6
  const cols = 5
  const word = 'react'
  const initialBoard = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill({ letter: '', status: '' }));

  const [board, setBoard] = useState(initialBoard)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')

  useEffect(() => {
    const handleKeyDown = (event) => {
      //! check if the row they are guessing on is within the bounds of the board
      if (currentRow < rows) {
        //! check the keyDown event to see check for enter key
        if (event.key === "Enter") {
          //! Check if the guess is a valid length when user presses enter
          if (currentGuess.length === cols) {
            //! If the guess is a valid length, invoke checkGuess function
            //! will fetch Guess in checkGuess() - function is being invoked when the user guess is valid  
            checkGuess()
          }
        }
        //!Check if the user wants to delete last typed letter from their guess
        else if (event.key === "Backspace") {
          //TODO add logic to delete last letter from currentGuess
        }
        //! check if the user is typing a valid letter, uppercase or lowercase incase of capslock
        else if (/^[a-zA-Z]$/.test(event.key)) {
          //! Logic to ensure user isnt guessing a word longer than 5 characters
          if (currentGuess.length < cols) {
            //TODO Add Logic to create a new array to the currentGuess array with the new letter.
            //! Disregard this logic below, just testing something.
            setCurrentGuess(event.key)
          }
        }
      }

    }

    //! Listening for user keyboard presses
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])

  const checkGuess = () => {
    console.log("hello")
  }
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
                  <h1>{currentGuess}</h1>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
