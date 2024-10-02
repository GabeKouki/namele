import React, { useState, useEffect } from 'react'
import { namele } from './Functions'
import { ReactComponent as WhiteAlienIcon } from '../assets/WhiteAlien.svg'
import './GameOver.css'

export default function GameOver({ endState }) {
  const [visible, setVisible] = useState(false)
  const dialog = document.querySelector("dialog");

  // let endState = 'win'
  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <>
    <div className="game-over-container">
      {/* <div className={`game-over ${visible ? 'visible' : ''}`} /> */}
        {endState === 'win' ? (
          <div>
            <dialog open className='win-dialog'>
              <WhiteAlienIcon className='win-dialog-icon' />
              <h1>Thank you for playing</h1>
              <h2>Want to play again</h2>
              <button>Play again</button>
              <button>View our other games</button>
              <button onClick={() => namele.testMe("helo")}>Click Me</button>
            </dialog>
          </div>
        ) : (
          <div className="lose-dialog">
            <h2>Game Over</h2>
            <p>Better luck next time!</p>
          </div>
        )}
        </div>
    </>
  )
}