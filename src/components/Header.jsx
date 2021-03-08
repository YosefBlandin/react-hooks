import React, { useContext } from 'react';
import ThemeContext from "../context/ThemeContext";

const Header = () => {
    const themeContext = useContext(ThemeContext);
    const [darkMode, setDarkMode] = themeContext;
    const handleClick = () => setDarkMode(!darkMode);

    return (
        <div className="Header">
            <h1 className={"Header__title"}>ReactHooks</h1>
            <button type="button" onClick={handleClick} className="Header__darkMode">{darkMode ? "Light Mode" : "Dark Mode"}</button>
        </div>
    );
}

export default Header