import React from 'react'
import './Keyboard.css'

export default function Keyboard({ keyClick }) {
  const keysTopRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const keysMiddleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
  const keysBottomRow = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']

  return (
    <>
      <div className="keyboardContainer">
        <div className="keyboardTopRow keyboardRow">
          {keysTopRow.map((key) => (
            <h1 onKeyDown={() => keyClick({ key })} alt={key} key={key} onClick={() => keyClick({ key })}>
              {key}
            </h1>
          ))}
        </div>
        <div className="keyboardMiddleRow keyboardRow">
          {keysMiddleRow.map((key) => (
            <h1 onKeyDown={() => keyClick({ key })} alt={key} key={key} onClick={() => keyClick({ key })}>
              {key}
            </h1>
          ))}
        </div>
        <div className="keyboardBottomRow keyboardRow">
          {keysBottomRow.map((key) => (
            <h1 onKeyDown={() => keyClick({ key })} alt={key} key={key} onClick={() => keyClick({ key })}>
              {key}
            </h1>
          ))}
        </div>
      </div>
    </>
  )
}
