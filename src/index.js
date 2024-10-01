import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import GameOver from './components/GameOver'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<GameOver />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
