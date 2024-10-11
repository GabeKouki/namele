import { getRandomName } from './names'

export const namele = {
  checkGuess: (
    board,
    currentGuess,
    targetWord,
    cols,
    currentRow,
    setGameOver,
    setBoard,
    setCurrentGuess,
    setCurrentRow,
    setEndState
  ) => {
    //! Creating new board state to avoid directly mutating board state
    const newBoard = [...board]
    const guessLetters = currentGuess.split('')
    const targetLetters = targetWord.split('')
    const statuses = Array(cols).fill('absent')
    const tempTargetLetters = [...targetLetters]

    //! Loop through each letter in guess against target word and update correct status for each letter
    //! Eventually this will change the color behind the letter to green to indicate correctness
    for (let i = 0; i < cols; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        statuses[i] = 'correct'
        tempTargetLetters[i] = null
      }
    }

    //! Loop through each letter in guess against target word and update present status for each letter
    //! Eventually this will change the color behind the letter to yellow to indicate presence
    for (let i = 0; i < cols; i++) {
      if (statuses[i] !== 'correct') {
        const foundIndex = tempTargetLetters.indexOf(guessLetters[i])
        if (foundIndex !== -1) {
          statuses[i] = 'present'
          tempTargetLetters[foundIndex] = null
        }
      }
    }

    //! Update the board to reflect the guessed Names in their respective rows
    for (let i = 0; i < cols; i++) {
      newBoard[currentRow][i] = {
        letter: guessLetters[i],
        status: statuses[i],
      }
    }

    //! Handling the game over logic
    if (guessLetters.join('') === targetWord.toLowerCase()) {
      setGameOver(true)
      setEndState('win')
    } else if (currentRow === 5) {
      setGameOver(true)
      setEndState('lose')
    }
    //! Updating state logic for moving to the next row
    setBoard(newBoard)
    setCurrentGuess('')
    setCurrentRow((prevRow) => prevRow + 1)

    if (currentRow >= 5 || targetWord.toLowerCase() === currentGuess.toLowerCase()) {
      return true
    }

    return statuses
  },

  handleGameOver: ({ endgame, setVisible }) => {
    setVisible(true)

    document.querySelector('.game-over-modal')?.classList.add('visible')
  },

  playAgain: ({
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
  }) => {
    setGameOver(false)
    setEndState('')
    setVisible(false)
    setShowGameOver(false)
    setBoard(
      Array(rows)
        .fill(null)
        .map(() => Array(cols).fill({ letter: '', status: '' }))
    )
    setCurrentRow(0)
    setCurrentGuess('')
    setTargetWord(getRandomName().toLowerCase())
    // const modal = document.querySelector('.game-over-modal')
    // modal.style.transform = 'translateY(200%)'
  },
}
