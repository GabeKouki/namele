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
    //!Splitting the currentGuess and targetWord so I can loop through each letter and check for correctness.
    const guessLetters = currentGuess.split('')
    const targetLetters = targetWord.current.split('')

    //!Initializing statuses to reflect the absence of each letter, if present state will change to correct or present
    const statuses = Array(cols).fill('absent')
    //!New array to avoid mutating the targetLetters Array
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
      if (statuses[i] !== 'correct' && targetWord.current.includes(guessLetters[i])) {
        statuses[i] = 'present'
        tempTargetLetters[i] = null
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
    if (guessLetters.join('') === targetWord.current.toLowerCase()) {
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

    if (currentRow >= 5 || targetWord.current.toLowerCase() === currentGuess.toLowerCase()) {
      return true
    }

    return false && console.log('false')
  },










  handleGameOver: (endState, setVisible, setShowModal) => {
    setVisible(true)
    setShowModal(true)
    setTimeout(() => {
      const modal = document.querySelector('.game-over-modal')
      if (modal) {
        modal.style.transform = 'translateY(0)'
      }
    }, 5000)
  },
  playAgain: (
    setGameOver,
    setEndState,
    setVisible,
    setShowModal,
    setBoard,
    setCurrentRow,
    setCurrentGuess,
    rows,
    cols,
    setTargetWord
  ) => {
    setGameOver(false)
    setEndState('')
    setVisible(false)
    setShowModal(false)
    setBoard(
      Array(rows)
        .fill(null)
        .map(() => Array(cols).fill({ letter: '', status: '' }))
    )
    setCurrentRow(0)
    setCurrentGuess('')
    setTargetWord(getRandomName().toLowerCase())
  },
  exitGame: () => {
    window.close()
  },
}
