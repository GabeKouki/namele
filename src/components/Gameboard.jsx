import React, { useState } from "react";
import "./Gameboard.css";

export default function Gameboard({ theme }) {
  const rows = 6; // Number of guesses
  const cols = 5; // Number of letters per word

  // Initialize empty gameboard
  const [board, setBoard] = useState(
    Array(rows).fill(Array(cols).fill(""))
  );

  return (
    <div className="gameboard-container" data-theme={theme}>
      <h1>Hello World</h1>
      <div className="gameboard">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="gameboard-row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="gameboard-cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

  );
}
