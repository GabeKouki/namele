import './App.css'
import Navbar from './components/Navbar'
import useLocalStorage from 'use-local-storage'
import Gameboard from './components/Gameboard'

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <>
      <div className="game-container">
        <Navbar updateTheme={setTheme} theme={theme} />
        <main className="app-container" data-theme={theme}>
          <Gameboard theme={theme} />
        </main>
      </div>
    </>
  )
}

export default App
