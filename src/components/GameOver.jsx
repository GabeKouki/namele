import React, { useState, useEffect } from 'react'
import './GameOver.css'

export default function GameOver({ endState }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div className={`game-over ${visible ? 'visible' : ''}`}>
      {endState === 'win' ? (
        <div className="win-dialog">
          <h2>Congratulations!</h2>
          <p>You've guessed the word correctly!</p>
        </div>
      ) : (
        <div className="lose-dialog">
          <h2>Game Over</h2>
          <p>Better luck next time!</p>
        </div>
      )}
    </div>
  )
}