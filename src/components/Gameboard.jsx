import React, { useState, useEffect, useRef } from 'react'
import './Gameboard.css'
import GameOver from './GameOver'
import GenerateName from './GenerateName'
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
  const [gameOver, setGameOver] = useState(false)
  const targetWord = useRef(getRandomName())

  useEffect(() => {
    //!Disables keyboard input when game is over
    if (gameOver) {
      return
    }
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
            setCurrentGuess((prev) => prev + event.key.toLowerCase())
          }
        }
      }
    }
    //! Listening for user keyboard presses
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentGuess, currentRow, gameOver])

  const checkGuess = () => {
    //! Creating new board state to avoid directly mutating board state
    const newBoard = [...board]
    //!Splitting the currentGuess and targetWord so I can loop through each letter and check for correctness.
    const guessLetters = currentGuess.split('')
    const targetLetters = targetWord.current.split('')

    //!Initializing statuses to reflect the absence of each letter, if present state will change to correct or present
    const statuses = Array(cols).fill('absent')
    //!New array to avoid mutating the targetLetters Array
    const tempTargetLetters = [...targetLetters]

    //! Loop through each letter in guess against target word and update correct status for each letter
    //! Eventually this will change the color behind the letter to green to indicate correctness
    for (let i = 0; i < cols; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        statuses[i] = 'correct'
        tempTargetLetters[i] = null
      }
    }

    //! Loop through each letter in guess against target word and update present status for each letter
    //! Eventually this will change the color behind the letter to yellow to indicate presence
    for (let i = 0; i < cols; i++) {
      if (statuses[i] !== 'correct' && targetWord.current.includes(guessLetters[i])) {
        statuses[i] = 'present'
        tempTargetLetters[i] = null
      }
    }

    //! Update the board to reflect the guessed Names in their respective rows
    for (let i = 0; i < cols; i++) {
      newBoard[currentRow][i] = {
        letter: guessLetters[i],
        status: statuses[i],
      }
    }

    if (guessLetters.join('') === targetWord.current) {
      //! If the guess is correct, set gameOver to true
      setGameOver(true)
    }
    //! Updating state logic for moving to the next row
    setBoard(newBoard)
    setCurrentGuess('')
    setCurrentRow((prevRow) => prevRow + 1)
  }

  return (
    <>
      {gameOver ? <GameOver /> : null}
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
      {/* <GenerateName /> */}
    </>
  )
}
