import React, { useState } from "react";
import Header from "./components/Header";
import Characters from "./components/Characters";
import ThemeContext from "./context/ThemeContext"

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ThemeContext.Provider value={[darkMode, setDarkMode]}>
      <div className={darkMode ? "Dark" : "Light"}>
        <Header />
        <Characters />
        <h1>Hello</h1>
      </div>
    </ThemeContext.Provider>
  )
}

export default App;
