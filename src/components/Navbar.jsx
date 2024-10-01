import React, { useRef, useState } from 'react'
import { ReactComponent as LightBulbIcon } from '../assets/LightBulb.svg'
import { ReactComponent as LogoIcon } from '../assets/WhiteAlien.svg'
import closeButton from '../assets/closeButton.svg'
import './Navbar.css'

const Navbar = ({ updateTheme, theme }) => {
  const dialogRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = () => {
    dialogRef.current.showModal()
    setIsOpen(true)
    console.log(theme)
  }

  const closeDialog = () => {
    dialogRef.current.close()
    setIsOpen(false)
  }

  document.addEventListener('keydown', (event) => {
    // Check if the Escape key was pressed
    if (event.key === 'Escape' || event.code === 'Escape') {
      if (isOpen) {
        setIsOpen(false)
      }
    }
  })

  return (
    <>
      <div className={`dialog-blur ${isOpen ? 'Active' : ''}`} />
      <nav data-theme={theme}>
        <LogoIcon className="nav-icon" />
        <h1 className="nav-heading">Namele</h1>
        <LightBulbIcon className="nav-icon pointer" onClick={handleThemeChange} />
      </nav>

      <dialog className="nav-dialog" ref={dialogRef} data-theme={theme}>
        <div className="dialog-container">
          <img
            src={closeButton}
            alt="close"
            className="nav-icon pointer"
            onClick={closeDialog}
            onKeyDown={closeDialog}
          />
          <div className="mode-container">
            <div
              onKeyDown={() => updateTheme('dark')}
              alt="Dark Mode"
              className="text-container pointer"
              onClick={() => updateTheme('dark')}
            >
              <p>Dark </p>
            </div>
            <div
              onKeyDown={() => updateTheme('light')}
              alt="Light Mode"
              className="text-container pointer"
              onClick={() => updateTheme('light')}
            >
              <p>Light </p>
            </div>
            <div
              onKeyDown={() => updateTheme('jet-black')}
              alt="Jet Black Mode"
              className="text-container pointer"
              onClick={() => updateTheme('jet-black')}
            >
              <p>Jet Black</p>
            </div>
            <div
              onKeyDown={() => updateTheme('forest')}
              alt="Forest Mode"
              className="text-container pointer"
              onClick={() => updateTheme('forest')}
            >
              <p>Forest</p>
            </div>
            <div
              onKeyDown={() => updateTheme('ocean')}
              alt="Ocean Mode"
              className="text-container pointer"
              onClick={() => updateTheme('ocean')}
            >
              <p>Ocean</p>
            </div>
            <div
              onKeyDown={() => updateTheme('sunset')}
              alt="Jet Black Mode"
              className="text-container pointer"
              onClick={() => updateTheme('sunset')}
            >
              <p>Sunset</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Navbar
