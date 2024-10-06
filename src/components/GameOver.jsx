import React, { useState, useEffect } from 'react'
import { namele } from './Functions'
import { ReactComponent as WhiteAlienIcon } from '../assets/WhiteAlien.svg'
import './GameOver.css'

export default function GameOver({ endState, setGameOver, setEndState, setBoard, setCurrentRow, setCurrentGuess, rows, cols, setTargetWord }) {
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)

 //! this is the logic to display the modal when the game is over
  useEffect(() => {
    if (endState === 'win' || endState === 'lose') {
      namele.handleGameOver(endState, setVisible, setShowModal);
    }
  }, [endState]);

  //!Here for cleanliness, going to be attatched to a button. 
  
  const handlePlayAgain = () => {
    namele.playAgain(setGameOver, setEndState, setVisible, setShowModal, setBoard, setCurrentRow, setCurrentGuess, rows, cols, setTargetWord);
  }


  return (
    <>
      <div className={`game-over-container ${visible ? 'visible' : ''}`}>
        <div className={`game-over-modal ${endState === 'win' ? 'win' : 'lose'}`}>
          {endState === 'win' ? (
            <div className='win-dialog'>
              <WhiteAlienIcon className='win-dialog-icon' />
              <h1>Congratulations!</h1>
              <h2>You guessed the name correctly!</h2>
              <button onClick={handlePlayAgain}>Play Again</button>
              <div className="social-media">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          ) : (
            <div className="lose-dialog">
              <h1>Game Over</h1>
              <h2>Better luck next time!</h2>
              <button onClick={handlePlayAgain}>Play Again</button>
              <div className="social-media">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}