import React, { useState, useEffect } from 'react'
import { namele } from './Functions'
import './GameOver.css'

export default function GameOver({
  endState,
  setGameOver,
  setEndState,
  setBoard,
  setCurrentRow,
  setCurrentGuess,
  rows,
  cols,
  setTargetWord,
  setShowGameOver,
  targetWord,
}) {
  const [visible, setVisible] = useState(false)

  //! this is the logic to display the modal when the game is over
  useEffect(() => {
    if (endState === 'win' || endState === 'lose') {
      namele.handleGameOver({ endState, setVisible })
    }
  }, [endState])

  //!Here for cleanliness, going to be attatched to a button.

  const handlePlayAgain = () => {
    setVisible(false)
    setTimeout(() => {
      namele.playAgain({
        setGameOver,
        setEndState,
        setVisible,
        setBoard,
        setCurrentRow,
        setCurrentGuess,
        rows,
        cols,
        setTargetWord,
        setShowGameOver,
      })
    }, 500)
  }

  return (
    <div className={`game-over-container ${visible ? 'visible' : ''}`}>
      <div className={`game-over-modal ${visible ? 'slide-up' : 'slide-down'}`}>
        <h1>{endState === 'win' ? 'Congratulations!' : 'Game Over'}</h1>
        <h2>
          {endState === 'win'
            ? 'You guessed the name correctly!'
            : `The name was ${targetWord.toUpperCase()}. Better luck next time!`}
        </h2>
        <button onClick={handlePlayAgain}>Play Again</button>
        <div className="social-media">
          <a href="https://www.linkedin.com/in/gabrielkouki/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/GabeKouki" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:gabekouki02@gmail.com">Email</a>
        </div>
      </div>
    </div>
  )
}
