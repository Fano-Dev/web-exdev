# 🚀 EXDEV Club — Web

Aplicación web de **EXDEV Club**, desarrollada con React y TypeScript para presentar información pública de la organización, sus miembros y sus proyectos.

La aplicación utiliza una **API independiente** para obtener los datos almacenados en Notion.

## 📌 Estado del proyecto

🚧 **Desarrollo local funcional**

La aplicación funciona actualmente en entorno local.

La web y la API están separadas en repositorios independientes.

### Repositorios

**Frontend**

```text
web_exdev_v1
```

**API**

```text
API-exdev-web
```

La API se encarga de comunicarse con Notion. La web consume los endpoints necesarios para mostrar la información.

---

# 🏗️ Arquitectura

La aplicación está organizada en dos proyectos independientes:

```text
                    ┌─────────────────┐
                    │     Notion      │
                    └────────┬────────┘
                             │
                             │ Notion API
                             ▼
                    ┌─────────────────┐
                    │    Hono API     │
                    │    Cloudflare   │
                    │     Workers     │
                    └────────┬────────┘
                             │
                             │ HTTP / JSON
                             ▼
                    ┌─────────────────┐
                    │    React Web    │
                    │   EXDEV Club    │
                    └─────────────────┘
```

El frontend **no se conecta directamente a Notion**.

El flujo de datos es:

```text
Notion
   ↓
API EXDEV
   ↓
Servicios del frontend
   ↓
Componentes React
   ↓
Interfaz
```

---

# 🛠️ Tecnologías

## Frontend

* React
* TypeScript
* CSS
* Fetch API

## Backend

El backend se encuentra en un repositorio independiente y utiliza:

* Hono
* TypeScript
* Cloudflare Workers
* Wrangler
* Notion API

---

# 📁 Estructura del proyecto

El repositorio contiene el proyecto frontend dentro de `frontend/`.

```text
web_exdev_v1/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── config/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── shared/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── .gitignore
```

---

# 🌐 Secciones de la web

Las páginas principales de la aplicación se encuentran dentro de:

```text
frontend/src/pages/
```

## 🏠 Home

Ubicación:

```text
pages/Home/
```

Archivos principales:

```text
Home.tsx
Home.css
```

Página principal y punto de entrada de la web.

---

## ℹ️ About

Ubicación:

```text
pages/about/
```

Archivos:

```text
AboutPage.tsx
AboutPage.css
```

Página informativa sobre EXDEV Club, su historia, propósito y contexto.

---

## 📝 Apply

Ubicación:

```text
pages/apply/
```

Archivos:

```text
apply.tsx
apply.css
```

Formulario destinado a las postulaciones al club.

Cuando la postulación se envía correctamente, se muestra un modal de confirmación.

---

## 👥 Members

Ubicación:

```text
pages/Members/
```

Listado de miembros obtenido mediante la API.

La sección permite:

* visualizar miembros;
* buscar información;
* aplicar filtros;
* visualizar roles;
* consultar información detallada;
* mostrar fotografías o elementos visuales alternativos.

### Componentes principales

```text
Members.tsx
MemberCard.tsx
MemberDrawer.tsx
```

**MemberCard**

Tarjeta utilizada para mostrar la información resumida de cada miembro.

**MemberDrawer**

Panel lateral que muestra información detallada del miembro seleccionado.

### Componentes auxiliares

```text
pages/Members/components/
├── Chip.tsx
├── ContactButton.tsx
├── CustomOption.tsx
└── MemberFilters.tsx
```

Estos componentes apoyan la visualización, filtrado y acciones relacionadas con los miembros.

### Hooks

```text
pages/Members/hooks/
├── useMemberFilters.ts
└── useMembers.ts
```

Se utilizan para gestionar la carga de miembros y la lógica de filtrado.

### Estilos

```text
pages/Members/css/
├── MemberCard.css
├── MemberDrawer.css
└── Members.css
```

---

## 📂 Projects

Ubicación:

```text
pages/Projects/
```

Listado de proyectos obtenido mediante la API.

Cada proyecto puede mostrar:

* nombre;
* imagen;
* descripción;
* estado;
* áreas;
* responsables.

### Componentes principales

```text
Projects.tsx
ProjectDrawer.tsx
```

**Projects**

Muestra el listado de proyectos.

**ProjectDrawer**

Panel lateral con información detallada del proyecto seleccionado.

### Estilos

```text
ProjectDrawer.css
Projects.css
```

---

# 🧩 Componentes destacados

Además de las páginas principales, existen componentes reutilizables o asociados a funcionalidades específicas.

## ✅ Modal de confirmación

Ubicación:

```text
pages/Modal/
```

Archivos:

```text
Modal.tsx
Modal.css
```

Modal utilizado por la sección **Apply** para confirmar visualmente que una postulación fue enviada correctamente.

Incluye:

* mensaje de confirmación;
* recurso multimedia animado;
* control para cerrar el modal.

No corresponde a una página independiente, sino a un componente utilizado durante el proceso de postulación.

---

# 🧩 Componentes compartidos

Los elementos reutilizables de la aplicación se encuentran en:

```text
src/shared/
```

## Iconos

```text
shared/icons/
├── GitHubIcon.tsx
├── InstagramIcon.tsx
└── LinkedIn.tsx
```

Contiene iconos reutilizables utilizados en diferentes partes de la interfaz.

## Layouts

```text
shared/layouts/
├── header/
└── footer/
```

### Header

Contiene la navegación principal de la aplicación.

### Footer

Contiene la información y enlaces mostrados en la parte inferior de las páginas.

---

# 🔌 Comunicación con la API

La comunicación con el backend está separada de los componentes visuales.

La estructura principal es:

```text
Componente React
       ↓
Service
       ↓
apiClient
       ↓
API EXDEV
       ↓
Notion
```

Los servicios se encuentran en:

```text
src/services/
```

## apiClient

```text
services/apiClient.ts
```

Centraliza la comunicación HTTP con la API.

## memberService

```text
services/memberService.ts
```

Contiene las operaciones relacionadas con los miembros.

## projectService

```text
services/projectService.ts
```

Contiene las operaciones relacionadas con los proyectos.

Esta separación evita colocar llamadas HTTP directamente dentro de los componentes visuales.

---

# ⚙️ Configuración

La configuración relacionada con la API se encuentra en:

```text
src/config/api.ts
```

Este archivo centraliza la dirección utilizada por el frontend para comunicarse con la API.

De esta forma, la URL del backend no necesita estar repetida en múltiples componentes.

---

# 📦 Tipos TypeScript

Los tipos utilizados por la aplicación se encuentran en:

```text
src/types/
```

Actualmente existen:

```text
member.ts
memberOption.ts
project.ts
svg.d.ts
```

Estos tipos ayudan a mantener estructuras consistentes entre la API y los componentes React.

---

# 🖼️ Assets

Los recursos visuales se encuentran en:

```text
src/assets/
```

## Imágenes

```text
assets/img/
```

Contiene logotipos, imágenes utilizadas por la web y otros recursos visuales.

## SVG

```text
assets/svg/
```

Contiene iconos y otros recursos SVG.

## Multimedia

```text
assets/gif/
```

Contiene recursos multimedia utilizados por la aplicación.

---

# 🧰 Utilidades

Las funciones auxiliares se encuentran en:

```text
src/utils/
```

Actualmente existe:

```text
sanitizeText.js
```

Estas funciones se mantienen separadas de los componentes para facilitar su reutilización.

---

# 🎨 Diseño

La aplicación utiliza CSS para definir la apariencia de los componentes y páginas.

Entre los elementos visuales implementados se encuentran:

* tarjetas;
* drawers;
* filtros;
* etiquetas;
* botones;
* navegación;
* diseño responsive.

---

# 🌓 Tema visual

La interfaz contempla diferentes temas visuales:

* modo claro;
* modo oscuro.

Los recursos visuales relacionados se encuentran principalmente en:

```text
src/assets/img/
src/assets/svg/
```

---

# 📱 Diseño responsive

La aplicación está diseñada para funcionar en distintos tamaños de pantalla.

Los componentes de miembros y proyectos incluyen ajustes específicos para dispositivos móviles.

También se contemplan adaptaciones para:

* drawers;
* tarjetas;
* filtros;
* navegación;
* contenido de los miembros y proyectos.

---

# 🚀 Instalación

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entra en la carpeta del proyecto:

```bash
cd web_exdev_v1
```

Instala las dependencias:

```bash
npm install
```

> La aplicación está ubicada dentro de la carpeta `frontend/`. Utiliza el `package.json` correspondiente al proyecto para ejecutar los comandos definidos.

---

# ▶️ Desarrollo local

Ejecuta el proyecto utilizando el script definido en el `package.json` correspondiente.

Por ejemplo:

```bash
npm start
```

La dirección local dependerá de la configuración del proyecto.

Durante el desarrollo, la web debe poder comunicarse con la API de EXDEV.

---

# 🔗 Dependencia de la API

Para visualizar datos procedentes de Notion, la web necesita que la API esté disponible.

La API utiliza actualmente:

```text
GET /
GET /miembros
GET /proyectos
```

La API es responsable de comunicarse con Notion.

La web **no necesita conocer ni almacenar el token de Notion**.

---

# 🔐 Seguridad

El frontend no debe contener:

* tokens de Notion;
* credenciales privadas;
* claves secretas;
* contraseñas.

Las credenciales de Notion pertenecen exclusivamente al backend.

Los secretos utilizados por la API se almacenan en el entorno correspondiente y no forman parte de este repositorio.

---

# 🧪 Desarrollo en otro ordenador

Para ejecutar el proyecto en otro ordenador:

1. Clonar el repositorio.
2. Instalar las dependencias.
3. Ejecutar la aplicación.
4. Ejecutar también la API si se quieren visualizar datos reales provenientes de Notion.

Los dos proyectos pueden mantenerse en carpetas independientes:

```text
EXDEV-CLUB/
├── web_exdev_v1/
└── API-exdev-web/
```

La API necesita sus propias variables de entorno para poder acceder a Notion.

La web no necesita las credenciales de Notion.

---

# 📌 Estado actual

| Área                  | Estado      |
| --------------------- | ----------- |
| React                 | 🟢          |
| TypeScript            | 🟢          |
| Home                  | 🟢          |
| About                 | 🟢          |
| Apply                 | 🟢          |
| Members               | 🟢          |
| Projects              | 🟢          |
| Modal de confirmación | 🟢          |
| API client            | 🟢          |
| Integración con API   | 🟢          |
| Responsive            | 🟢          |
| Tema visual           | 🟢          |
| Producción            | ⚪ Pendiente |

---

# 🧭 Organización del proyecto

La separación de responsabilidades es:

```text
pages/
    → páginas y vistas

services/
    → comunicación con la API

types/
    → estructuras de datos

shared/
    → componentes reutilizables

config/
    → configuración

assets/
    → recursos visuales

utils/
    → funciones auxiliares
```

Esta organización permite mantener separadas la presentación, la comunicación con el backend, los tipos y los recursos compartidos.

---

# 🚧 Próximos pasos

El proyecto se encuentra actualmente en desarrollo.

Las siguientes etapas contemplan la preparación del entorno de producción y el despliegue de la API y la aplicación web.

---

# 👨‍💻 EXDEV Club

Proyecto desarrollado para EXDEV Club.
