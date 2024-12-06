import React, { useState, useEffect } from "react";
// import "./DarkMode.css";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set the initial theme based on localStorage
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      setIsDarkMode(true);
      setDark();
    }
  }, []);

  const setDark = () => {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLight = () => {
    document.body.setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDark();
      setIsDarkMode(true);
    } else {
      setLight();
      setIsDarkMode(false);
    }
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={isDarkMode}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <span className="icon text-2xl">{isDarkMode ? <MdOutlineDarkMode /> : <CiLight />}</span>
      </label>
    </div>
  );
};

export default DarkMode;