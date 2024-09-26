import React from 'react'
import './Keyboard.css'
import { useEffect } from 'react'

export default function Keyboard({ keyClick }) {
  const keysTopRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const keysMiddleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
  const keysBottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase()
      if ([...keysTopRow, ...keysMiddleRow, ...keysBottomRow].includes(key)) {
        // console.log(key)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <>
      <div className="keyboardContainer">
        <div className="keyboardTopRow keyboardRow">
          {keysTopRow.map((key) => (
            <h1 onKeyDown={() => keyClick(key)} alt={key} key={key} onClick={() => keyClick(key)}>
              {key}
            </h1>
          ))}
        </div>
        <div className="keyboardMiddleRow keyboardRow">
          {keysMiddleRow.map((key) => (
            <h1 onKeyDown={() => keyClick(key)} alt={key} key={key} onClick={() => keyClick(key)}>
              {key}
            </h1>
          ))}
        </div>
        <div className="keyboardBottomRow keyboardRow">
          {keysBottomRow.map((key) => (
            <h1 onKeyDown={() => keyClick(key)} alt={key} key={key} onClick={() => keyClick(key)}>
              {key}
            </h1>
          ))}
        </div>
      </div>
    </>
  )
}
