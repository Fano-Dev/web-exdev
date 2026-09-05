import "./header.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// assets
import ExdevLogo from "../../../assets/img/exdevlogo.png";
import ExdevSoloLogo from "../../../assets/img/exdev-solologo.png";

function Header() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="header">

      {/* Logo */}
      <div className="logo-container">
        <Link to="/">
          <picture>
            <source
              srcSet={ExdevSoloLogo}
              media="(max-width: 400px)"
            />

            <img
              src={ExdevLogo}
              alt="Logo Exdev"
              className="exdev-logo"
            />
          </picture>
        </Link>
      </div>


      {/* Navegación */}
      <nav className="nav desktop-nav">

      


        {/* Selector de tema */}
        <button
          onClick={toggleTheme}
          className="theme-switch"
          aria-label="Cambiar tema"
        >
          <span className="moon-icon"></span>

          <span
            className={`switch-thumb ${
              theme === "light" ? "active" : ""
            }`}
          ></span>

          <span className="sun-icon"></span>
        </button>

      </nav>

    </header>
  );
}

export default Header;