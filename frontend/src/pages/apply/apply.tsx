import "./apply.css";
import { useState, useRef } from "react";
import Modal from "../Modal/Modal"; // sube un nivel y entra a la carpeta modal
import { useEffect } from "react";   // si no lo tienes ya
import { sanitizeText } from "../../utils/sanitizeText";
import gif1 from "../../assets/gif/gif1.mp4"
import gif2 from "../../assets/gif/gif2.mp4"
import gif3 from "../../assets/gif/gif3.mp4"
import gif4 from "../../assets/gif/gif4.mp4"
import gif5 from "../../assets/gif/gif5.mp4"




const preguntas = [
  {
    pregunta: "¿Solo pueden postular estudiantes de Ingeniería en Informática?",
    respuesta:
      "No, cualquier persona interesada en realizar proyectos de innovación puede unirse al club, independientemente de su carrera. Lo importante es tener ganas de aprender, colaborar y aportar con ideas creativas.",
  },
  {
    pregunta: "¿Necesito tener experiencia previa para ingresar al club?",
    respuesta:
      "No es necesario contar con experiencia previa. Nuestro objetivo es que los integrantes crezcan y se desarrollen dentro del club. Lo que más valoramos son las ganas de participar y comprometerse con las actividades.",
  },
];



function Apply() {


  // Estado de preguntas frecuentes
const [abiertas, setAbiertas] = useState<number[]>([]);

// Referencias para cada respuesta
const elRefs = useRef<(HTMLDivElement | null)[]>([]);
elRefs.current = preguntas.map((_, i) => elRefs.current[i] ?? null);

// Función para abrir/cerrar preguntas
const togglePregunta = (index: number) => {
  setAbiertas((prev) =>
    prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  );
};


  const refs = {
  nombre: useRef<HTMLInputElement>(null),
  rut: useRef<HTMLInputElement>(null),
  edad: useRef<HTMLInputElement>(null),
  correo: useRef<HTMLInputElement>(null),
  carrera: useRef<HTMLDivElement>(null),
  anioIngreso: useRef<HTMLDivElement>(null),
  anioMalla: useRef<HTMLDivElement>(null),
  disponibilidad: useRef<HTMLDivElement>(null),
  areas: useRef<HTMLDivElement>(null), // si es un bloque de checkboxes
  ayudantia: useRef<HTMLTextAreaElement>(null), // si es un bloque de checkboxes
  unirse: useRef<HTMLTextAreaElement>(null), // si es un bloque de checkboxes
  proyectos: useRef<HTMLTextAreaElement>(null), // si es un bloque de checkboxes
  redes: useRef<HTMLTextAreaElement>(null), // si es un bloque de checkboxes
  nombresMas: useRef<HTMLTextAreaElement>(null), // si es un bloque de checkboxes
  pitch: useRef<HTMLTextAreaElement>(null), // si es un bloque de checkboxes
  apodo: useRef<HTMLTextAreaElement>(null), // si es un bloque de checkboxes
  emojiAnimal: useRef<HTMLTextAreaElement>(null), // si es un bloque de checkboxes
};

 




// Selectores

const [carrera, setCarrera] = useState("");
const [anioIngreso, setAnioIngreso] = useState("");
const [anioMalla, setAnioMalla] = useState("");
const [disponibilidad, setDisponibilidad] = useState("");

 // CAMPOS DE TEXTO
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");

 // Otro campo
  const [otroChecked, setOtroChecked] = useState(false);
  const [otroTexto, setOtroTexto] = useState("");

 // Áreas seleccionadas
  const [areasSeleccionadas, setAreasSeleccionadas] = useState<string[]>([]);
  const areas = [
  "Frontend",
  "Backend",
  "Aplicaciones móviles",
  "Robótica",
  "Inteligencia Artificial",
  "Diseño",
  "Videojuegos",
  "UX/UI",
  "Fotografía",
  "Desarrollo web",
  "Machine Learning",
  "Base de datos",
  "Modelado 3D",
  "Ilustración",
  "Carpintería",
  "Community Manager",
  "Electrónica",
  "Edición de video",
  "Ciberseguridad",
  "Otro",
  ];

// 1️⃣ Definir estados al inicio del componente
const [ayudantia, setAyudantia] = useState("");
const [unirse, setUnirse] = useState("");
const [proyectos, setProyectos] = useState("");
const [redes, setRedes] = useState("");
const [nombresMas, setNombresMas] = useState("");
const [pitch, setPitch] = useState("");
const [apodo, setApodo] = useState("");
const [emojiAnimal, setEmojiAnimal] = useState("");

const selectCarrera = (valor: string) => setCarrera(valor);
const selectAnioIngreso = (valor: string) => setAnioIngreso(valor);
const selectAnioMalla = (valor: string) => setAnioMalla(valor);
const selectDisponibilidad = (valor: string) => setDisponibilidad(valor);

// Estado para abrir/cerrar cada selector
const [carreraOpen, setCarreraOpen] = useState(false);
const [anioIngresoOpen, setAnioIngresoOpen] = useState(false);
const [anioMallaOpen, setAnioMallaOpen] = useState(false);
const [disponibilidadOpen, setDisponibilidadOpen] = useState(false);

 // Handlers de inputs
    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let valor = e.target.value
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    .replace(/\s{2,}/g, ' ');

  if (valor.trim().split(/\s+/).length > 4) {
    valor = valor.trim().split(/\s+/).slice(0, 4).join(' ');
  }

  setNombre(valor);
};

// edad//
const handleEdadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const valor = e.target.value.replace(/\D/g, '').slice(0, 2);
  setEdad(valor);
};

//rut//
const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let raw = e.target.value.replace(/\D/g, '');
  if (raw.length > 9) raw = raw.slice(0, 9);
  let formatted = raw.length > 1
    ? raw.slice(0, raw.length - 1) + '-' + raw.slice(-1)
    : raw;
  formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  setRut(formatted);
};

// Manejo del input de correo
const handleCorreoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let valor = e.target.value.toLowerCase();

  // Si hay más de 2 partes por @, conservar solo la primera y la segunda
  const partes = valor.split("@");
  if (partes.length > 2) {
    valor = partes[0] + "@" + partes[1];
  }

  // Ahora separamos en antes y después del @ (si existe)
  const tieneArroba = valor.indexOf("@") !== -1;
  const [antesArroba, despuesArrobaRaw] = valor.split("@");

  // Permitir letras, números y puntos en la parte local
  let nuevaAntes = (antesArroba || "").replace(/[^a-z0-9.]/g, "");

  // Evitar múltiples puntos consecutivos
  nuevaAntes = nuevaAntes.replace(/\.{2,}/g, ".");

  // Evitar punto al inicio
  nuevaAntes = nuevaAntes.replace(/^\./, "");

  // Procesar la parte después de @ (mantenerla vacía si el usuario solo escribió '@')
  let nuevaDespues = "";
  if (tieneArroba) {
    // Si el usuario escribió '@' pero nada después, despuesArrobaRaw === "" (queremos conservar el @)
    // Permitimos solo letras en el dominio (utem.cl)
    nuevaDespues = (despuesArrobaRaw !== undefined) ? despuesArrobaRaw.replace(/[^a-z.]/g, "") : "";
    // También limitar a una sola ocurrencia de "utem.cl" parcial no es necesario aquí; la validación final lo hará
  }

  // Reconstruir: si había @, mantenerlo aunque nuevaDespues sea ""
  valor = nuevaAntes + (tieneArroba ? "@" + nuevaDespues : "");

  setCorreo(valor);
};




// Validar FUNCION//
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const nuevosErrores: {[key: string]: string} = {};

  // Nombre
  if (!nombre.trim()) nuevosErrores["nombre"] = "Debes ingresar tu nombre";

  // RUT
  const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
  if (!rut.trim()) {
    nuevosErrores["rut"] = "Debes ingresar tu RUT";
  } else if (!rutRegex.test(rut)) {
    nuevosErrores["rut"] = "Formato inválido. Ejemplo: 20.123.456-7";
  }

  // Edad
const edadTrim = edad.trim();
if (!edadTrim) {
  nuevosErrores["edad"] = "Debes ingresar tu edad";
} else {
  const edadNum = parseInt(edadTrim, 10);

  // Si quieres QUE SEA estrictamente mayor a 18 (es decir: 19,20,...)
  if (isNaN(edadNum) || edadNum < 18) {
    nuevosErrores["edad"] = "Debes ser mayor de 18 años";
  }}

// Correo UTEM válido: permite "nombre@utem.cl" o "nombre.apellido@utem.cl"
const correoRegex = /^[a-z0-9]+(\.[a-z0-9]+)*@utem\.cl$/i;

// Uso en handleSubmit
if (!correo.trim()) {
  nuevosErrores["correo"] = "Debes ingresar tu correo";
} else if (!correoRegex.test(correo)) {
  nuevosErrores["correo"] =
    "Correo inválido. Ejemplo: juan.perez@utem.cl o jcortesa@utem.cl";
}

  // Selectores
  if (!carrera) nuevosErrores["carrera"] = "Debes seleccionar tu carrera";
  if (!anioIngreso) nuevosErrores["anioIngreso"] = "Debes seleccionar tu año de ingreso";
  if (!anioMalla) nuevosErrores["anioMalla"] = "Debes seleccionar tu año que cursas";
  if (!disponibilidad) nuevosErrores["disponibilidad"] = "Debes seleccionar tu disponibilidad";

  // Áreas: exactamente 3
  if (areasSeleccionadas.length !== 3 && !otroChecked) 
    nuevosErrores["areas"] = "Debes seleccionar exactamente 3 áreas";
  // Si "Otro" está seleccionado, también validar que haya texto
if (areasSeleccionadas.includes("Otro") && !otroTexto.trim()) {
  nuevosErrores["areas"] = "Debes especificar la opción 'Otro'";
}

  // Textareas
  const textareas = ["ayudantia", "unirse", "proyectos", "redes", "nombresMas", "pitch", "emojiAnimal",];
  textareas.forEach(id => {
    const valor = (document.getElementById(id) as HTMLTextAreaElement | null)?.value;
    if (!valor || !valor.trim()) nuevosErrores[id] = "Este campo es obligatorio";
  });

  setErrores(nuevosErrores);
  if (Object.keys(nuevosErrores).length > 0) {
  const firstErrorKey = Object.keys(nuevosErrores)[0];
  refs[firstErrorKey as keyof typeof refs]?.current?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  return false;
}

  // Si no hay errores → abrir modal
  const randomMedia = mediaFiles[Math.floor(Math.random() * mediaFiles.length)];
  setSelectedMedia(randomMedia);
  setIsModalOpen(true);
};



/////////////////////////////////////////////////////////////////////////////////////////////////////


const handleAreaChange = (area: string) => {
  let nuevas = [...areasSeleccionadas];

   if (nuevas.includes(area)) {
    // Si ya estaba seleccionada, quitarla
    nuevas = nuevas.filter(a => a !== area);
  } else {
    // Agregar la nueva selección
    nuevas.push(area);

    // Si hay más de 3 (o quieres mantener límite tipo “cola”), quitar la primera
    if (nuevas.length > 3) {
      nuevas.shift(); // quita la primera seleccionada
    }
  }

    // Activar o desactivar el campo "Otro"
  setOtroChecked(nuevas.includes("Otro"));

  setAreasSeleccionadas(nuevas);
};


const toggleCarrera = () => setCarreraOpen(!carreraOpen);
const toggleAnioIngreso = () => setAnioIngresoOpen(!anioIngresoOpen);
const toggleAnioMalla = () => setAnioMallaOpen(!anioMallaOpen);
const toggleDisponibilidad = () => setDisponibilidadOpen(!disponibilidadOpen);

    //DATOS
  const carreras = {
 "Campus Central": [
        { id: 21047, nombre: "21047 Arquitectura"},
        { id: 21012, nombre: "21012 Contador Público y Auditor"},
        { id: 21033, nombre: "21033 Derecho"},
        { id: 21024, nombre: "21024 Diseño en Comunicación Visual"},
        { id: 21023, nombre: "21023 Diseño Industrial"},
        { id: 21074, nombre: "21074 Ingeniería Civil en Obras Civiles"},
        { id: 21087, nombre: "21087 Ingeniería Civil en Prevención de Riesgos y Medio Ambiente"},
        { id: 21032, nombre: "21032 Ingeniería en Construcción"},
        { id: 21053, nombre: "21053 Psicología"},
        { id: 21056, nombre: "21056 Química y Farmacia"},
        { id: 21034, nombre: "21034 Trabajo Social"}
    ],
    "Campus Ñuñoa": [
        { id: 21046, nombre: "21046 Bachillerato en Ciencias de la Ingeniería"},
        { id: 21071, nombre: "21071 Dibujante Proyectista"},
        { id: 21057, nombre: "21057 Ingeniería Civil Biomédica"},
        { id: 21075, nombre: "21075 Ingeniería Civil Electrónica"},
        { id: 21049, nombre: "21049 Ingeniería Civil en Ciencia de Datos"},
        { id: 21041, nombre: "21041 Ingeniería Civil en Computación Mención Informática"},
        { id: 21096, nombre: "21096 Ingeniería Civil en Mecánica"},
        { id: 21076, nombre: "21076 Ingeniería Civil Industrial"},
        { id: 21055, nombre: "21055 Ingeniería Civil Matemática"},
        { id: 21069, nombre: "21069 Ingeniería Civil Química"},
        { id: 21031, nombre: "21031 Ingeniería en Geomensura"},
        { id: 21030, nombre: "21030 Ingeniería en Informática"},
        { id: 21045, nombre: "21045 Ingeniería Industrial"},
        { id: 21073, nombre: "21073 Ingeniería en Biotecnología"},
        { id: 21054, nombre: "21054 Ingeniería en Alimentos"},
        { id: 21083, nombre: "21083 Química Industrial"}

    
    ],
    "Campus Providencia": [
        { id: 21089, nombre: "21089 Administración Pública"},
        { id: 21002, nombre: "21002 Bibliotecología y Documentación"},
        { id: 21048, nombre: "21048 Ingeniería Comercial"},
        { id: 21081, nombre: "21081 Ingeniería en Comercio Internacional"},
        { id: 21082, nombre: "21082 Ingeniería en Gestión Turística"}
    ]};

    const añosMalla = [
        { id: 1, nombre: "1° Año" }, { id: 2, nombre: "2° Año" },
        { id: 3, nombre: "3° Año" }, { id: 4, nombre: "4° Año" },
        { id: 5, nombre: "5° Año" }, { id: 6, nombre: "6° Año" }
    ];

        const horasDisponibles = [
        { id: 1, nombre: "1 hora" }, { id: 2, nombre: "2 horas" },
        { id: 3, nombre: "3 horas" }, { id: 4, nombre: "4 horas" },
        { id: 5, nombre: "5 horas" }, { id: 6, nombre: "6 horas" }
    ];

    const añosIngreso = ["2015","2016","2017","2018","2019","2020","2021", "2022", "2023", "2024","2025",];



  //MODAL//
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedMedia, setSelectedMedia] = useState<string>("");

//ERRORES//
const [errores, setErrores] = useState<{[key: string]: string}>({});


// Medios (GIFs/WebM) ubicados en public/assets
const mediaFiles = [gif1, gif2, gif3, gif4, gif5];



useEffect(() => {
  if (isModalOpen) {
    const timer = setTimeout(() => {
      setIsModalOpen(false);
      
      // Reiniciar campos
      setNombre("");
      setRut("");
      setEdad("");
      setCorreo("");
      setCarrera("");
      setAnioIngreso("");
      setAnioMalla("");
      setDisponibilidad("");
      setAreasSeleccionadas([]);
      setOtroChecked(false);
      setOtroTexto("");
      setAyudantia("");
      setUnirse("");
      setProyectos("");
      setRedes("");
      setNombresMas("");
      setPitch("");
      setApodo("");
      setEmojiAnimal("");
      setErrores({});


      // Reiniciar errores
      setErrores({});
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }
}, [isModalOpen]);




  return (
    <>

          {/* Main */}
      <main className="contenido">
        <section className="formulario-card">
  <div className="form-card">
    <div className="form-header">
      <h2>Formulario ExDev</h2>
      <p>¡Bienvenido/a al formulario de postulación ExDev! Queremos conocerte mejor para saber cómo puedes crecer con nosotros y cómo podemos trabajar juntos en proyectos increíbles. Este formulario no toma más de 5-7 minutos.</p>
    </div>

          <form id="miFormulario" onSubmit={handleSubmit}>
            {/* Campo 1 */}
            <label htmlFor="nombre">1. Nombre completo</label>
            <input ref={refs.nombre} type="text" value={nombre} onChange={handleNombreChange} required/>
            {errores["nombre"] && <p className="error">{errores["nombre"]}</p>}

            {/* Campo 2 */}
            <label htmlFor="rut">2. Rut</label>
            <input ref={refs.rut} type="text" value={rut} onChange={handleRutChange} required />
            {errores["rut"] && <p className="error">{errores["rut"]}</p>}

            {/* Campo 3 */}
            <label htmlFor="edad">3. Edad</label>
            <input ref={refs.edad} type="text"   min={0} max={99}  placeholder="20" value={edad} onChange={handleEdadChange} required />
            {errores["edad"] && <p className="error">{errores["edad"]}</p>}

            {/* Campo 4 */}
            <label htmlFor="correo">4. Correo institucional</label>
            <input ref={refs.correo} type="text" placeholder="usuario@utem.cl" value={correo} onChange={handleCorreoChange}/>
            {errores["correo"] && <p className="error">{errores["correo"]}</p>}

            {/* Campo 5 */}
            <label>5. Carrera / especialidad</label>
            <div ref={refs.carrera} className="form-field selector-mobile">
            <button type="button" className="selector-btn" onClick={toggleCarrera}>
                {carrera || "Seleccionar carrera"}
            </button>
            {carreraOpen && (
                <ul className="custom-list">
                {Object.entries(carreras).map(([campus, lista]) => (
                    <li key={campus}>
                    <strong>{campus}</strong>
                    <ul>
                        {lista.map(c => (
                        <li
                            key={c.id}
                            onClick={() => {
                            selectCarrera(c.nombre);
                            setCarreraOpen(false);
                            }}
                        >
                            {c.nombre}
                        </li>
                        ))}
                    </ul>
                    </li>
                ))}
                </ul>
            )}
            </div>
            <input type="hidden" name="carrera" value={carrera} required />
            {errores["carrera"] && <p className="error">{errores["carrera"]}</p>}

            {/* Campo 6 */}
            <label>6. Año ingreso</label>
            <div ref={refs.anioIngreso} className="form-field selector-mobile">
            <button type="button" className="selector-btn" onClick={toggleAnioIngreso}>
                {anioIngreso || "Seleccionar año de ingreso"}
            </button>
            {anioIngresoOpen && (
                <ul className="custom-list">
                {añosIngreso.map(año => (
                    <li
                    key={año}
                    onClick={() => {
                        selectAnioIngreso(año);
                        setAnioIngresoOpen(false);
                    }}
                    >
                    {año}
                    </li>
                ))}
                </ul>
            )}
            </div>
            <input type="hidden" name="anioIngreso" value={anioIngreso} required />
            {errores["anioIngreso"] && <p className="error">{errores["anioIngreso"]}</p>}

            {/* Campo 7 */}
            <label>7. Año que cursa actualmente</label>
            <div ref={refs.anioMalla} className="form-field selector-mobile">
            <button type="button" className="selector-btn" onClick={toggleAnioMalla}>
                {anioMalla || "Seleccionar año que cursa"}
            </button>
            {anioMallaOpen && (
                <ul className="custom-list">
                {añosMalla.map(año => (
                    <li
                    key={año.id}
                    onClick={() => {
                        selectAnioMalla(año.nombre);
                        setAnioMallaOpen(false);
                    }}
                    >
                    {año.nombre}
                    </li>
                ))}
                </ul>
            )}
            </div>
            <input type="hidden" name="anioMalla" value={anioMalla} required />
            {errores["anioMalla"] && <p className="error">{errores["anioMalla"]}</p>}

            {/* Campo 8 */}
            <label>8. ¿En qué áreas te interesa participar o aprender?</label>
                <div ref={refs.areas} className="areas-container">
                {areas.map((area, i) => {
                    const selected = areasSeleccionadas.includes(area);
                    return (
                    <label key={i} className={`area-chip ${selected ? "selected" : ""}`}>
                        <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleAreaChange(area)}
                        />
                        <span className="chip-text">{area}</span>
                    </label>
                    );
                })}
                </div>

            {otroChecked && ( <input type="text" placeholder="Especifica otro" value={otroTexto} onChange={(e) => setOtroTexto(e.target.value)} />)}
            {errores["areas"] && <p className="error">{errores["areas"]}</p>}
  

            {/* Campos 9 a 18 */}
            <div>
              <label htmlFor="ayudantia">
                9. ¿Fuiste o eres ayudante en algún ramo?
              </label>
              <p className="campo-ayuda">
                En caso de que no, ¿te gustaría serlo? Cuéntanos brevemente.
              </p>
              <textarea
                id="ayudantia"
                value={ayudantia}
                onChange={(e) => setAyudantia(sanitizeText(e.target.value))}
                required
              />
              {errores["ayudantia"] && <p className="error">{errores["ayudantia"]}</p>}
            </div>

            <label>10. Horas semanales para el club</label>
            <div ref={refs.disponibilidad} className="form-field selector-mobile">
              <button type="button" className="selector-btn" onClick={toggleDisponibilidad}>
                {disponibilidad || "Seleccionar cantidad de horas"}
              </button>
              {disponibilidadOpen && (
                <ul className="custom-list">
                  {horasDisponibles.map(h => (
                    <li key={h.id} onClick={() => { selectDisponibilidad(h.nombre); setDisponibilidadOpen(false); }}>
                      {h.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input type="hidden" name="disponibilidad" value={disponibilidad} required />
            {errores["disponibilidad"] && <p className="error">{errores["disponibilidad"]}</p>}

            <div>
              <label htmlFor="unirse">
                11. ¿Por qué quieres unirte?
              </label>
              <p className="campo-ayuda">
                motivaciones, expectativas y lo que más te gustaría lograr con nosotros.
              </p>
              <textarea
                id="unirse"
                value={unirse}
                onChange={(e) => setUnirse(sanitizeText(e.target.value))}
                required
              />
              {errores["unirse"] && <p className="error">{errores["unirse"]}</p>}
            </div>

            <div>
              <label htmlFor="proyectos">
                12. ¿Tienes algún proyecto en mente, que te gustaría desarrollar en Exdev?
              </label>
              <p className="campo-ayuda">
                Queremos conocer tus ideas, no importa si están en borrador.
              </p>
              <textarea
                id="proyectos"
                value={proyectos}
                onChange={(e) => setProyectos(sanitizeText(e.target.value))}
                required
              />
              {errores["proyectos"] && <p className="error">{errores["proyectos"]}</p>}
            </div>

            <div>
              <label htmlFor="redes">
                13. ¿Tienes algún portafolio que quieras compartir?
              </label>
              <p className="campo-ayuda">
                Github, instagram, behance, etc.
              </p>
              <textarea
                id="redes"
                value={redes}
                onChange={(e) => setRedes(sanitizeText(e.target.value, ":/@"))}
                required
              />
              {errores["redes"] && <p className="error">{errores["redes"]}</p>}
            </div>

            <div>
              <label htmlFor="nombresMas">
                14. ¿Te estás postulando con alguien más? Déjanos sus nombres.
              </label>
              <textarea
                id="nombresMas"
                value={nombresMas}
                onChange={(e) => setNombresMas(sanitizeText(e.target.value))}
                required
              />
              {errores["nombresMas"] && <p className="error">{errores["nombresMas"]}</p>}
            </div>

            <div>
              <label htmlFor="pitch">
                15. Describe un mini pitch sobre ti.
              </label>
              <p className="campo-ayuda">
                Cuéntanos en menos de 5 líneas quién eres, que te motiva y que te gusta hacer en tu tiempo libre.
              </p>
              <textarea
                id="pitch"
                value={pitch}
                onChange={(e) => setPitch(sanitizeText(e.target.value))}
                required
              />
              {errores["pitch"] && <p className="error">{errores["pitch"]}</p>}
            </div>

            <div>
              <label htmlFor="apodo">
                16. Apodo o nombre por el que prefieras ser llamado.
              </label>
              <textarea
                id="apodo"
                value={apodo}
                onChange={(e) => setApodo(sanitizeText(e.target.value))}
                required
              />
              {errores["apodo"] && <p className="error">{errores["apodo"]}</p>}
            </div>

            <div>
              <label htmlFor="emojiAnimal">
                17. Emoji de tu animal favorito (o uno que te represente)
                {/* ⚠️ Este campo SÍ debe aceptar emojis → NO sanitizar */}
              </label>
              <textarea
                id="emojiAnimal"
                value={emojiAnimal}
                onChange={(e) => setEmojiAnimal(e.target.value)}
                placeholder="🦊"
                required
              />
              {errores["emojiAnimal"] && <p className="error">{errores["emojiAnimal"]}</p>}
            </div>



            <button type="submit" className="btn-enviar">Enviar</button>
          </form>

          {/* Preguntas frecuentes */}
            <section className="questions">
              <h2 className="subtitle3">Preguntas frecuentes</h2>
              <p className="questions__paragraph">Resuelve tus dudas antes de unirte.</p>
              <div className="questions__container">
                {preguntas.map((item, i) => (
                  <div key={i} className={`question ${abiertas.includes(i) ? "open" : ""}`}>
                    <div className="question__header" onClick={() => togglePregunta(i)}>
                      <span>{item.pregunta}</span>
                      <div className="arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className={`arrow-icon ${abiertas.includes(i) ? "open" : ""}`}
                        >
                          <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z" />
                        </svg>
                      </div>
                    </div>
                    <div
                         className="question__content"
                            ref={(el) => {
                              elRefs.current[i] = el;
                            }}
                            style={{
                              maxHeight: abiertas.includes(i)
                                ? `${elRefs.current[i]?.scrollHeight}px`
                                : "0px",
                              overflow: "hidden",
                              transition: "max-height 0.3s ease",
                            }}
                    >
                      <p>{item.respuesta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
             </div>
        </section>
      </main>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedMedia={selectedMedia} // GIF o video
          />



    </>
      );
}

export default Apply;
