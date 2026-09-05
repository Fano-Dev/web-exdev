# 🚀 ExDev Club

Plataforma web del **ExDev Club**, desarrollada para centralizar y visualizar información de sus miembros y proyectos mediante una arquitectura basada en **Notion + API + React**.

El proyecto utiliza Notion como fuente de datos, una API desarrollada con Hono como capa intermedia y un frontend en React para presentar la información de forma clara, responsive y adaptable a los distintos temas visuales.

> **Estado actual:** desarrollo local funcional.  
> **Producción:** todavía no desplegado.

---

## 📖 Descripción

**ExDev Club** es una plataforma web orientada a la organización y visualización de la información del club.

Actualmente la aplicación permite consultar:

- 👥 Miembros de ExDev.
- 📂 Proyectos del club.
- 🏷️ Roles y áreas.
- 👤 Responsables de proyectos.
- 📝 Descripciones.
- 🖼️ Imágenes.
- 🎨 Estados y colores configurados en Notion.

La información mostrada en la web se obtiene directamente desde Notion mediante una API propia.

Esto permite que los datos puedan mantenerse desde Notion sin necesidad de modificar manualmente el frontend cada vez que cambia la información.

---

# 🏗️ Arquitectura

La arquitectura actual está compuesta por tres partes principales:

```text
┌──────────────────────────────────────┐
│                NOTION                │
│                                      │
│  Data Source de Miembros             │
│  Data Source de Proyectos            │
│                                      │
│  Información gestionada por el club  │
└──────────────────┬───────────────────┘
                   │
                   │ Notion API
                   ▼
┌──────────────────────────────────────┐
│             Hono API                 │
│                                      │
│        Cloudflare Workers             │
│                                      │
│  GET /                               │
│  GET /miembros                       │
│  GET /proyectos                      │
└──────────────────┬───────────────────┘
                   │
                   │ HTTP / JSON
                   ▼
┌──────────────────────────────────────┐
│               React                  │
│                                      │
│  Miembros                            │
│  Proyectos                           │
│  Cards                               │
│  Drawers                             │
│  Filtros                             │
│  Responsive                          │
│  Tema claro / oscuro                │
└──────────────────────────────────────┘
```

### Flujo de información

```text
Notion
  ↓
Notion API
  ↓
Hono
  ↓
Endpoints REST
  ↓
React
  ↓
Interfaz web
```

El frontend **no consulta directamente Notion**.

La comunicación se realiza mediante la API del proyecto.

---

# 🛠️ Tecnologías utilizadas

## Frontend

- **React**
- **TypeScript**
- **CSS**
- Fetch API para comunicación con el backend

## Backend

- **Hono**
- **TypeScript**
- **Cloudflare Workers**
- **Wrangler**

## Fuente de datos

- **Notion API**
- Notion Data Sources
- Notion Users API
- Notion Blocks API

---

# 📁 Estructura del proyecto

El proyecto está separado actualmente en frontend y backend:

```text
EXDEV-CLUB/
│
├── Notion API/
│   │
│   ├── src/
│   │   ├── index.ts
│   │   └── notion.ts
│   │
│   ├── wrangler.jsonc
│   ├── package.json
│   └── ...
│
└── pagina_exdev/
    │
    └── frontend/
        │
        ├── src/
        │   ├── components/
        │   ├── services/
        │   ├── types/
        │   ├── config/
        │   └── ...
        │
        ├── package.json
        └── ...
```

---

# 🔌 Backend

El backend está desarrollado con **Hono** y está preparado para ejecutarse sobre Cloudflare Workers.

La configuración principal se encuentra en:

```text
Notion API/
├── src/
│   ├── index.ts
│   └── notion.ts
│
└── wrangler.jsonc
```

---

## `src/index.ts`

Este archivo define la aplicación Hono y sus endpoints.

Actualmente existen:

```text
GET /
GET /miembros
GET /proyectos
```

También se configura CORS para permitir la comunicación con el frontend durante el desarrollo local.

---

# 🌐 Endpoints

## `GET /`

Endpoint básico utilizado para comprobar que la API está funcionando.

Respuesta:

```json
{
  "message": "API ExDev funcionando"
}
```

---

## `GET /miembros`

Obtiene los miembros correspondientes al club desde Notion.

La respuesta contiene información preparada específicamente para ser consumida por el frontend.

Ejemplo de estructura:

```json
{
  "id": "id-del-miembro",
  "name": "Nombre",
  "roles": [
    "Rol 1",
    "Rol 2"
  ],
  "email": "correo@example.com",
  "career": "Carrera",
  "photoUrl": "https://...",
  "icon": "👤",
  "projects": [],
  "skills": [],
  "interests": []
}
```

---

## `GET /proyectos`

Obtiene los proyectos desde el Data Source de proyectos de Notion.

Ejemplo de estructura:

```json
{
  "id": "id-del-proyecto",
  "name": "Nombre del proyecto",
  "state": {
    "name": "Estado",
    "color": "green"
  },
  "responsible": [
    "Nombre del responsable"
  ],
  "areas": [
    {
      "name": "Área",
      "color": "blue"
    }
  ],
  "description": "Descripción del proyecto",
  "imageUrl": "https://..."
}
```

---

# 🔐 Integración con Notion

La aplicación utiliza una integración de Notion denominada:

```text
API Tomás
```

La integración permite acceder a los Data Sources utilizados por la aplicación y consultar información de usuarios y bloques de Notion.

El backend utiliza la API de Notion para:

- consultar miembros;
- consultar proyectos;
- consultar usuarios responsables;
- obtener imágenes almacenadas dentro de páginas;
- obtener la configuración de colores de estados y áreas.

---

# 👥 Módulo de Miembros

El módulo de miembros está conectado directamente con el Data Source correspondiente de Notion.

La información se transforma en un formato simplificado antes de enviarse al frontend.

---

## 🗃️ Datos utilizados

Actualmente se utilizan los siguientes campos:

| Campo | Uso |
|---|---|
| `Nombre` | Nombre del miembro |
| `Puesto de trabajo` | Roles del miembro |
| `Email` | Correo |
| `Carrera` | Carrera |
| `Organización` | Identificación de miembros de ExDev |
| Icono de página | Emoji |
| Bloques de página | Imagen |

---

# 🔎 Filtros de miembros

Actualmente la API aplica dos condiciones.

### Organización

Solo se consideran miembros que tengan:

```text
✨ ExDev ✨
```

en el campo:

```text
Organización
```

### Miembros inactivos

Se excluyen aquellos que tengan:

```text
Inactivo
```

dentro de:

```text
Puesto de trabajo
```

Por lo tanto, los miembros marcados como inactivos no aparecen en la web.

---

# 🏷️ Roles

`Puesto de trabajo` es un campo `multi_select` de Notion.

Por esta razón, un miembro puede tener varios roles.

Ejemplo:

```text
Desarrollador
Diseñador
Líder de proyecto
```

La API conserva todos los roles y el frontend los presenta como etiquetas independientes.

Los colores de los roles se gestionan visualmente en el frontend.

---

# 🖼️ Imágenes de miembros

Las imágenes de los miembros pueden estar almacenadas dentro del contenido de sus páginas de Notion.

La API utiliza la Blocks API de Notion para buscar imágenes.

Además, la búsqueda puede recorrer bloques anidados.

Por ejemplo:

```text
Página del miembro
│
└── column_list
    │
    └── column
        │
        └── image
```

Esto permite recuperar imágenes aunque estén dentro de estructuras anidadas.

---

# 👤 Fallback visual

La interfaz contempla diferentes situaciones:

```text
Imagen disponible
      ↓
    Imagen

Sin imagen
      ↓
Emoji de Notion

Sin imagen + sin emoji
      ↓
Fallback visual
```

De esta manera, un miembro no queda sin representación visual aunque no tenga fotografía o emoji.

---

# 🖥️ Interfaz de miembros

El frontend cuenta actualmente con:

- tarjetas de miembros;
- buscador;
- filtros existentes;
- drawer de información;
- múltiples roles;
- imágenes;
- emojis;
- fallback visual;
- diseño responsive.

La sección funciona como una interfaz de **consulta**, sin funcionalidades de edición de miembros desde la web.

Los datos se mantienen desde Notion.

---

# 📂 Módulo de Proyectos

El módulo de proyectos utiliza un Data Source independiente en Notion.

La aplicación consulta dicho Data Source mediante:

```text
GET /proyectos
```

Los proyectos son mostrados mediante tarjetas y un drawer de detalle.

---

# 🗃️ Datos utilizados en Proyectos

Actualmente el Data Source de proyectos contiene y utiliza:

| Campo | Tipo en Notion | Uso |
|---|---|---|
| `Nombre Proyecto` | Title | Nombre |
| `Estado` | Status | Estado actual |
| `Responsable` | People | Responsables |
| `Áreas` | Multi-select | Áreas relacionadas |
| `Descripción` | Rich text | Descripción |
| `Imagen` | Files & media | Imagen del proyecto |

Existen otros campos en Notion que actualmente no forman parte de la información utilizada por la aplicación.

---

# 🎨 Estados de proyectos

El estado se obtiene directamente desde el campo:

```text
Estado
```

de Notion.

La API obtiene también el color configurado para cada opción del estado.

La respuesta mantiene ambos valores:

```json
{
  "name": "Sin Iniciar",
  "color": "gray"
}
```

El frontend utiliza esta información para generar visualmente la etiqueta correspondiente.

Los colores **no se asignan manualmente según el nombre del estado**.

Se utiliza el color definido en Notion.

---

# 🏷️ Áreas de proyectos

Las áreas se obtienen desde:

```text
Áreas
```

Este campo es un `multi_select`.

Cada área mantiene:

- nombre;
- color configurado en Notion.

Ejemplo:

```json
{
  "name": "🖥️ Programación/IT",
  "color": "blue"
}
```

Esto permite mostrar múltiples áreas como etiquetas.

---

# 👤 Responsables

El campo:

```text
Responsable
```

utiliza el tipo `People` de Notion.

La API recibe los identificadores de los usuarios y consulta la información correspondiente mediante la API de usuarios de Notion.

Finalmente, el frontend recibe los nombres de los responsables.

---

# 📝 Descripción

Los proyectos utilizan el campo:

```text
Descripción
```

de tipo `Rich text`.

La descripción aparece:

- en la tarjeta, cuando existe;
- en el drawer de detalle, cuando existe.

Si el campo está vacío, no se muestra contenido adicional.

---

# 🖼️ Imagen de proyectos

Los proyectos utilizan el campo:

```text
Imagen
```

de tipo `Files & media`.

Cuando existe una imagen, se muestra en:

- tarjeta del proyecto;
- drawer del proyecto.

Cuando no existe, la interfaz no genera una imagen artificial ni utiliza un placeholder.

---

# 🃏 Tarjetas de proyectos

Cada tarjeta muestra actualmente:

```text
┌─────────────────────────┐
│                         │
│        Imagen           │
│                         │
├─────────────────────────┤
│ Nombre del proyecto     │
│                         │
│ Descripción             │
│                         │
└─────────────────────────┘
```

La descripción solo aparece cuando el proyecto dispone de ella.

Las tarjetas son clicables y permiten abrir el detalle.

---

# 📋 Drawer de proyectos

Al seleccionar una tarjeta se abre un drawer con información ampliada.

Actualmente contiene:

```text
Imagen

Nombre del proyecto

Descripción

Estado

Áreas

Responsable
```

El drawer cuenta con:

- botón para cerrar;
- cierre al seleccionar el overlay;
- scroll interno;
- diseño responsive;
- adaptación para pantallas pequeñas.

---

# 🔎 Filtrado de proyectos

Actualmente existen estados que no se muestran públicamente en la interfaz.

Se excluyen:

```text
Inconcluso
Sin terminar
```

La comparación no depende de diferencias entre mayúsculas y minúsculas.

---

# 👥 Proyectos y responsables inactivos

La aplicación también contempla el estado de los responsables de los proyectos.

La comprobación utiliza la información existente en el Data Source de miembros.

No se añadió una segunda columna `People` en los miembros.

La relación se realiza utilizando la información del usuario de Notion y su nombre correspondiente en el Data Source de miembros.

### Comportamiento actual

| Situación | Resultado |
|---|---|
| Responsable activo | 🟢 Proyecto visible |
| Al menos un responsable activo | 🟢 Proyecto visible |
| Todos los responsables conocidos están inactivos | 🔴 Proyecto oculto |
| Responsable desconocido | 🟢 Proyecto visible |
| Proyecto sin responsable | 🟢 Proyecto visible |

Esto evita ocultar proyectos cuando no existe información suficiente para determinar que todos sus responsables están inactivos.

---

# 🎨 Sistema de colores

Los estados y áreas utilizan los colores que proporciona Notion.

Actualmente se contemplan:

```text
default
gray
brown
orange
yellow
green
blue
purple
pink
red
```

El frontend convierte estos valores en clases CSS:

```text
notion-default
notion-gray
notion-brown
notion-orange
notion-yellow
notion-green
notion-blue
notion-purple
notion-pink
notion-red
```

Esto permite mantener una separación clara entre:

```text
Notion
  ↓
color configurado
  ↓
API
  ↓
frontend
  ↓
CSS
```

---

# 🌓 Tema claro y oscuro

La interfaz cuenta actualmente con soporte para:

- 🌙 modo oscuro
- ☀️ modo claro

Los estilos de las tarjetas y drawers se adaptan al tema seleccionado.

También se han realizado ajustes específicos para mantener una correcta lectura de:

- títulos;
- descripciones;
- etiquetas;
- estados;
- áreas;
- botones;
- fondos.

---

# 📱 Diseño responsive

La aplicación está preparada para diferentes tamaños de pantalla.

Se han realizado ajustes específicos para dispositivos móviles en:

### Miembros

- tarjetas;
- drawer;
- roles;
- contenido.

### Proyectos

- grid;
- tarjetas;
- imágenes;
- drawer;
- etiquetas;
- responsables;
- áreas.

En el drawer de proyectos, por ejemplo, el contenido pasa de una distribución horizontal a una distribución vertical en pantallas pequeñas.

---

# 🔗 Comunicación Frontend → API

El frontend utiliza un cliente HTTP centralizado.

La comunicación sigue el siguiente patrón:

```text
React Component
      ↓
Service
      ↓
apiClient
      ↓
Hono API
      ↓
Notion
```

Por ejemplo:

```text
Projects.tsx
      ↓
projectService.ts
      ↓
GET /proyectos
      ↓
API
```

Esto mantiene separada la lógica de comunicación de la lógica visual de los componentes.

---

# 📦 Tipos TypeScript

Los datos de proyectos se representan mediante tipos TypeScript.

Actualmente un proyecto contiene:

```ts
type Project = {
  id: string;
  name: string;
  state: {
    name: string;
    color: NotionColor;
  };
  responsible: string[];
  areas: {
    name: string;
    color: NotionColor;
  }[];
  description: string;
  imageUrl: string;
};
```

Esto permite mantener una estructura consistente entre API y frontend.

---

# 🔐 Variables de entorno

El backend utiliza variables de entorno para las credenciales y los identificadores de Notion.

Actualmente se utilizan:

```text
NOTION_TOKEN
NOTION_DATA_SOURCE_ID
NOTION_PROJECTS_DATA_SOURCE_ID
```

Los valores reales **no deben incluirse en el repositorio**.

Los archivos locales de variables de entorno deben permanecer fuera del control de versiones.

> ⚠️ Nunca subir tokens, claves privadas ni credenciales de Notion a GitHub.

---

# 🧪 Ejecución local

El proyecto se puede ejecutar localmente para comprobar la comunicación entre frontend, API y Notion.

## Backend

Entrar en:

```bash
cd "Notion API"
```

Instalar dependencias:

```bash
npm install
```

Iniciar el entorno local:

```bash
npx wrangler dev
```

La API queda disponible en la dirección local indicada por Wrangler.

---

## Frontend

Entrar en:

```bash
cd pagina_exdev/frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar React:

```bash
npm start
```

El frontend se ejecuta en:

```text
http://localhost:3000
```

---

# 🧪 Comprobación del backend

La API puede comprobarse mediante sus endpoints.

### API

```text
GET /
```

### Miembros

```text
GET /miembros
```

### Proyectos

```text
GET /proyectos
```

Los endpoints devuelven JSON para ser consumido por el frontend.

---

# ☁️ Cloudflare Workers

El backend está preparado para ejecutarse en Cloudflare Workers.

La configuración se encuentra en:

```text
wrangler.jsonc
```

Configuración actual:

```json
{
  "name": "exdev-api",
  "main": "src/index.ts",
  "compatibility_date": "2026-08-28"
}
```

Actualmente el nombre configurado para el Worker es:

```text
exdev-api
```

---

# 🧪 Validación de build

Antes del despliegue se realizó una comprobación mediante:

```bash
npx wrangler deploy --dry-run
```

El `dry-run` se completó correctamente.

Esto permite comprobar la preparación del Worker sin realizar un despliegue real.

---

# 🚫 Producción

Actualmente **NO se ha realizado el despliegue a producción**.

El proyecto se encuentra en una etapa de desarrollo y validación local.

Por el momento:

```text
🟢 Desarrollo local
🟢 API funcionando
🟢 Frontend conectado
🟢 Miembros funcionando
🟢 Proyectos funcionando
🟢 Dry-run de Cloudflare correcto
⚪ Producción todavía no desplegada
```

---

# 📊 Estado actual

| Área | Estado |
|---|---|
| Integración con Notion | 🟢 Funcionando |
| Data Source de miembros | 🟢 Funcionando |
| Data Source de proyectos | 🟢 Funcionando |
| API Hono | 🟢 Funcionando |
| Endpoint `/miembros` | 🟢 Funcionando |
| Endpoint `/proyectos` | 🟢 Funcionando |
| Frontend React | 🟢 Funcionando |
| Miembros | 🟢 Implementado |
| Proyectos | 🟢 Implementado |
| Imágenes de miembros | 🟢 Implementado |
| Imágenes de proyectos | 🟢 Implementado |
| Descripciones de proyectos | 🟢 Implementado |
| Responsables | 🟢 Implementado |
| Estados y colores | 🟢 Implementado |
| Áreas y colores | 🟢 Implementado |
| Filtros de proyectos | 🟢 Implementado |
| Filtrado de responsables inactivos | 🟢 Implementado |
| Responsive | 🟢 Implementado |
| Tema claro/oscuro | 🟢 Implementado |
| Cloudflare dry-run | 🟢 Correcto |
| Despliegue producción | ⚪ No realizado |

---

# 🧭 Alcance documentado

Este README refleja **exclusivamente el estado actual del proyecto**.

No se incluyen en este documento funcionalidades futuras, cambios de arquitectura, mejoras, integraciones adicionales ni tareas pendientes que todavía no hayan sido definidas.

Las decisiones sobre la evolución del proyecto serán determinadas por el equipo en la reunión correspondiente.

---

# 👨‍💻 Proyecto

**ExDev Club**

Arquitectura actual:

```text
Notion
   ↓
Hono API
   ↓
Cloudflare Workers
   ↓
React
```

El proyecto se encuentra actualmente en desarrollo y validación local.