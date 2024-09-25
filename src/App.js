import './App.css'
import Navbar from './components/Navbar'
import useLocalStorage from 'use-local-storage'
import Gameboard from './components/Gameboard'
import Keyboard from './components/Keyboard'

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  const handleKeyboardClick = (key) => {
    console.log(key)
  }

  return (
    <>
      <Navbar updateTheme={setTheme} theme={theme} />
      <main className="app-container" data-theme={theme}>
        <Gameboard theme={theme} />
        <Keyboard keyClick={handleKeyboardClick} />
      </main>
    </>
  )
}

export default App
