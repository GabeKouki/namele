import React, { useState, useEffect } from 'react'
import { namele } from './Functions'
import { ReactComponent as WhiteAlienIcon } from '../assets/WhiteAlien.svg'
import './GameOver.css'

export default function GameOver({ endState, setGameOver, setEndState, setBoard, setCurrentRow, setCurrentGuess, rows, cols, targetWord }) {
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
    namele.playAgain(setGameOver, setEndState, setVisible, setShowModal, setBoard, setCurrentRow, setCurrentGuess, rows, cols, targetWord);
  }


  return (
    <>
    <div className="game-over-container">
      <div className={`game-over ${visible ? 'visible' : ''}`} />
        {endState === 'win' ? (
          <div>
            <div className='win-dialog'>
              <WhiteAlienIcon className='win-dialog-icon' />
              <h1>Thank you for playing</h1>
              <h2>Want to play again</h2>
              <button>Play again</button>
              <button>View our other games</button>
              <button onClick={() => handlePlayAgain()}>Click Me</button>
            </div>
          </div>
        ) : (
          <>
          <div className="lose-dialog">
            <h1>Hello</h1>
            <button onClick={() => namele.exitGame() && console.log("Exited")}>Exit</button>
          </div>
          </>
        )}
        </div>
    </>
  )
}