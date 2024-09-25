import React, { useRef } from "react";
import logo from "../assets/WhiteAlien.svg";
import lightbulb from "../assets/LightBulb.svg";
import closeButton from "../assets/closeButton.svg";
import "./Navbar.css";
import { useState } from "react";

const Navbar = ({ updateTheme, theme }) => {
	const dialogRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleThemeChange = () => {
		dialogRef.current.showModal();
		setIsOpen(true);
    console.log(theme)
	};

	const closeDialog = () => {
		dialogRef.current.close();
		setIsOpen(false);
	};

	return (
		<>
			<div className={`dialog-blur ${isOpen ? "Active" : ""}`} />
			<nav data-theme={theme}>
				<img className="nav-logo" src={logo} alt="logo" data-theme={theme} />
				<h1 className="nav-heading" data-theme={theme}>Namele</h1>
				<img
					onKeyDown={handleThemeChange}
					onClick={handleThemeChange}
					className="theme-button"
					src={lightbulb}
					alt="change theme"
				/>
			</nav>

			{/* Dialog Element */}
			<dialog ref={dialogRef}>
				<div className="dialog-container">
					<img
						src={closeButton}
						alt="close"
						className="close-button"
						onClick={closeDialog}
						onKeyDown={closeDialog}
					/>
          <div className="mode-container">
            <div onKeyDown={() => updateTheme('dark')} alt="Dark Mode" className="text-container" onClick={() => updateTheme('dark')}>
            <p>Dark </p>
            </div>
            <div onKeyDown={() => updateTheme('dark')} alt="Light Mode" className="text-container" onClick={() => updateTheme('light')}>
            <p>Light </p>
            </div>
						<div onKeyDown={() => updateTheme('jet-black')} alt="Jet Black Mode" className="text-container" onClick={() => updateTheme('jet-black')}>
            <p>Jet Black</p>
            </div>
						<div onKeyDown={() => updateTheme('cream')} alt="Cream Mode" className="text-container" onClick={() => updateTheme('cream')}>
            <p>Cream</p>
            </div>
						<div onKeyDown={() => updateTheme('ocean')} alt="Ocean Mode" className="text-container" onClick={() => updateTheme('ocean')}>
            <p>Ocean</p>
            </div>
						<div onKeyDown={() => updateTheme('sunset')} alt="Jet Black Mode" className="text-container" onClick={() => updateTheme('sunset')}>
            <p>Sunset</p>
            </div>
          </div>
					{/* <button onClick={() => { updateTheme('dark'); closeDialog(); }}>Yes</button>
  <button onClick={closeDialog}>Cancel</button> */}
				</div>
			</dialog>
		</>
	);
};

export default Navbar;
