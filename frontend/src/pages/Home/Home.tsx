import React from "react";
import "./Home.css";
import ContacButton from "../Members/components/ContacButton"
import { Link } from "react-router-dom";

import team1 from "../../assets/img/feria-exdev-img1.webp";
import team2 from "../../assets/img/feria-exdev-img2.webp";
import team3 from "../../assets/img/feria-exdev-img3.webp";
import team4 from "../../assets/img/feria-exdev-img4.webp";


const teamImages = [ team1, team2, team3, team4];



export default function Pagina() {
  return (

<>   
      {/* SECCIÓN EQUIPO */}
      <section className="team-section">

        {/* IZQUIERDA → SOLO IMÁGENES */}
        <div className="team-left">

            {/* LINKS SUPERIORES */}
  <div className="team-links1">
      <Link to="/" className="nav-btn7">Inicio</Link>
     <Link to="/about" className="nav-btn7">Nosotros</Link>
     <Link to="/Members" className="nav-btn7">Miembros</Link>
     <Link to="/Projects" className="nav-btn7">Proyectos</Link>
  </div>
          <div className="team-carousel">
            <div className="team-track">
              {teamImages.map((src, i) => (
                <img key={i} src={src} alt={`team-${i}`} />
              ))}
              {teamImages.map((src, i) => (
                <img key={`repeat-${i}`} src={src} alt={`team-repeat-${i}`} />
              ))}
            </div>
          </div>
        </div>

        {/* DERECHA → TODO LO DEMÁS, SIN CONTENEDOR */}
        <div className="team-right">
          <h1 className="title">Club de Desarrollo Experimental ExDev</h1>
          <p className="subtitle">
            Somos un club que une los conceptos <strong>experimentar</strong> y <strong>desarrollar</strong>.
          </p>

          <div className="benefits">
            {/* items */}
          </div>

                <section className="cta">
        <div className="cta-card">
          <h3>¡Forma parte de nuestro equipo!</h3>
          <p>Estamos buscando personas motivadas. Completa el formulario y cuéntanos cómo puedes contribuir.</p>
          <div className="cta-actions">
            <ContacButton />
            
          </div>
        </div>
      </section>

        </div>


      </section>

</>
  );
}
