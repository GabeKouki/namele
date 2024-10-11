import React, { useRef, useState } from 'react'
import { ReactComponent as LightBulbIcon } from '../assets/LightBulb.svg'
import { ReactComponent as LogoIcon } from '../assets/WhiteAlien.svg'
import { ReactComponent as CloseButtonIcon } from '../assets/closeButton.svg'
import './Navbar.css'

const Navbar = ({ updateTheme, theme }) => {
  const dialogRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = () => {
    dialogRef.current.showModal()
    setIsOpen(true)
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
          <CloseButtonIcon className="nav-icon pointer" onClick={closeDialog} />
          <h2 className="dialog-title">Select Theme</h2>
          <div className="mode-container">
            <div alt="Dark Mode" className="text-container" onClick={() => updateTheme('dark')}>
              <p>Dark</p>
            </div>
            <div alt="Light Mode" className="text-container" onClick={() => updateTheme('light')}>
              <p>Light</p>
            </div>
            <div alt="Jet Black Mode" className="text-container" onClick={() => updateTheme('jet-black')}>
              <p>Jet Black</p>
            </div>
            <div alt="Forest Mode" className="text-container" onClick={() => updateTheme('forest')}>
              <p>Forest</p>
            </div>
            <div alt="Ocean Mode" className="text-container" onClick={() => updateTheme('ocean')}>
              <p>Ocean</p>
            </div>
            <div alt="Sunset Mode" className="text-container" onClick={() => updateTheme('sunset')}>
              <p>Sunset</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Navbar
