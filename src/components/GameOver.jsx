import React, { useState, useEffect } from 'react'
import { namele } from './Functions'
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
      <div className={`game-over ${visible ? 'visible' : ''}`}>
        {endState === 'win' ? (
          <div>
            <dialog open className='win-dialog'>
              <h1>Hello</h1>
              <h1 className="pointer">World</h1>
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