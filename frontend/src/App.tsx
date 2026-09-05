import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Header from "./shared/layouts/header/header";
import Footer from "./shared/layouts/footer/footer";

import Home from "./pages/Home/Home";
import AboutPage from "./pages/about/AboutPage";
import Apply from "./pages/apply/apply";
import Members from "./pages/Members/Members";
import Projects from "./pages/Projects/Projects";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="router-container">

          <Routes>

            {/* ========================= */}
            {/* SITIO PÚBLICO             */}
            {/* ========================= */}

            <Route
              path="/"
              element={
                <div className="public-page">
                  <Header />
                  <Home />
                  <Footer />
                </div>
              }
            />

            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <AboutPage />
                  <Footer />
                </>
              }
            />

            <Route
              path="/apply"
              element={
                <>
                  <Header />
                  <Apply />
                  <Footer />
                </>
              }
            />

            <Route
              path="/members"
              element={
                <div className="public-page">
                  <Header />
                  <Members />
                  <Footer />
                </div>
              }
            />

            <Route
              path="/projects"
              element={
                <div className="public-page">
                  <Header />
                  <Projects />
                  <Footer />
                </div>
              }
            />

            {/* ========================= */}
            {/* FALLBACK                  */}
            {/* ========================= */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;