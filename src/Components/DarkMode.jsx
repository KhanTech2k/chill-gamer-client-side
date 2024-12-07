import React, { useState, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      setIsDarkMode(true);
      setDark();
    } else {
      setLight();
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

  const toggleTheme = () => {
    if (isDarkMode) {
      setLight();
      setIsDarkMode(false);
    } else {
      setDark();
      setIsDarkMode(true);
    }
  };

  return (
    <div className="dark_mode" onClick={toggleTheme}>
      <span className="icon text-2xl cursor-pointer">
        {isDarkMode ? <MdOutlineDarkMode /> : <CiLight />}
      </span>
    </div>
  );
};

export default DarkMode;
