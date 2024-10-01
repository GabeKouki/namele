import React, { useState, useEffect, useRef } from 'react'
import './Gameboard.css'
import GameOver from './GameOver'
import { getRandomName } from './names'
import { namele } from './Functions'

export default function Gameboard({ theme }) {
  const rows = 6
  const cols = 5
  const initialBoard = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill({ letter: '', status: '' }))


    //! Game state logic
  const [board, setBoard] = useState(initialBoard)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const targetWord = useRef(getRandomName().toLowerCase())
  
  
  //! GameOver state logic
  const [gameOver, setGameOver] = useState(false)
  const [endState, setEndState] = useState("")
  const [showGameOver, setShowGameOver] = useState(false)

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setShowGameOver(true)
      }, 0)
    }
  }, [gameOver])

  useEffect(() => {
    //!Disables keyboard input when game is over
    if (gameOver) {
      return
    }
    const handleKeyDown = (event) => {
      //! check if the row they are guessing on is within the bounds of the board
      console.log(targetWord)
      if (currentRow < rows) {
        //! check the keyDown event to see check for enter key
        if (event.key === 'Enter') {
          //! Check if the guess is a valid length when user presses enter
          if (currentGuess.length === cols) {
            //! If the guess is a valid length, invoke checkGuess function
            //! will fetch Guess in checkGuess() - function is being invoked when the user guess is valid
            namele.checkGuess(board, currentGuess, targetWord, cols, currentRow, setGameOver, setBoard, setCurrentGuess, setCurrentRow, setEndState)          } else {
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


  return (
    <>
      {showGameOver && <GameOver endState={endState} />}
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
