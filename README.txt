# Corcho de Notas (Post-it)

## Antes de seguir leyendo. ¿Cómo descargar y compilar este proyecto? 

Si quieres usar este proyecto desde GitHub, sigue estos pasos para tenerlo funcionando en tu computadora:

### 1. Descarga el proyecto

- Ve a la página del repositorio en GitHub.
- Haz clic en el botón **Code** y luego en **Download ZIP** para descargarlo como archivo comprimido.
- O, si tienes Git instalado, puedes clonarlo con:
  ```bash
  git clone https://github.com/IPS-Web/Sticky-Board.git
  ```
- Descomprime el archivo ZIP (si lo descargaste así) y abre la carpeta del proyecto en tu editor de código.

### 2. Instala las dependencias

Abre la terminal en la carpeta raíz del proyecto y ejecuta:

```bash
npm install
```

Esto descargará todas las librerías necesarias (la carpeta `node_modules`).

### 3. Ejecuta el proyecto en modo desarrollo

Para ver la aplicación en tu navegador mientras desarrollas:

```bash
npm run dev
```

### 4. Compila el proyecto para producción

Si quieres generar la versión lista para distribución (por ejemplo, para empaquetar con Electron o crear el instalador):

```bash
npm run build
```

Esto creará la carpeta `dist/` con los archivos finales.

> **Nota:** Las carpetas `node_modules` y `dist` no se incluyen en el repositorio. Se generan automáticamente con los comandos anteriores.

--- 

## 1. Introducción

Bienvenido/a al proyecto **Corcho de Notas (Post-it)**.

¿Alguna vez has querido tener un corcho digital donde puedas pegar notas de colores, moverlas, personalizarlas y no perderlas aunque cierres la aplicación? Este proyecto te guiará paso a paso para crear tu propio corcho de notas interactivo, usando tecnologías modernas como **React** y **Electron**.

No necesitas ser un experto en programación. Cada paso está explicado de forma sencilla, con ejemplos y consejos para que puedas avanzar aunque sea tu primer proyecto.
Al finalizar, tendrás una aplicación de escritorio donde podrás:

- Crear, mover y borrar notas tipo post-it.
- Personalizar colores y estilos.
- Guardar tus notas para que no se pierdan al cerrar la app.
- Disfrutar de una experiencia visual atractiva y personalizable.

¡Vamos a construirlo juntos!

---

## 2. Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente instalado en tu computadora:

1. **Node.js y npm**  
   - Node.js es el entorno que nos permite ejecutar JavaScript fuera del navegador.
   - npm es el gestor de paquetes que viene junto con Node.js y nos permite instalar herramientas y librerías fácilmente.
   - Puedes descargar ambos desde la página oficial:  
     [https://nodejs.org/es/](https://nodejs.org/es/)

2. **Un editor de código**  
   - Recomendado: [Visual Studio Code](https://code.visualstudio.com/)  
   - También puedes usar cualquier otro editor de texto que prefieras.

3. **Acceso a la terminal o línea de comandos**  
   - En Windows: puedes usar "Símbolo del sistema" (cmd), "PowerShell" o la terminal integrada de Visual Studio Code.
   - En Mac: usa la aplicación "Terminal".
   - En Linux: cualquier terminal.

> **¿No sabes si tienes Node.js instalado?**  
> Abre la terminal y escribe:
> ```
> node -v
> ```
> Si ves un número de versión (por ejemplo, `v18.16.0`), ya lo tienes. Si ves un error, instálalo desde el enlace de arriba.

---

## 3. ¿Qué vamos a construir?

En este proyecto crearás una aplicación de escritorio llamada **Corcho de Notas**, que funciona como un tablero digital donde puedes pegar, mover y personalizar notas tipo post-it.

### Características principales que tendrás al finalizar:

- **Añadir notas:** Crea tantas notas como quieras, cada una con su propio color y texto.
- **Mover notas:** Arrastra y coloca las notas donde prefieras dentro del corcho.
- **Personalizar colores y estilos:** Cambia el color de cada nota y elige el estilo visual del corcho.
- **Guardar tus notas:** Las notas y tus preferencias se guardan automáticamente, así que no se pierden aunque cierres la aplicación.
- **Eliminar notas:** Arrastra una nota a la papelera para borrarla fácilmente.
- **Modo noche/día:** Cambia el aspecto de la aplicación para que sea más cómoda a cualquier hora.

### ¿Para quién es este proyecto?

- Para personas que quieren aprender a crear aplicaciones modernas con React y Electron.
- Para quienes buscan una herramienta práctica y personalizable para organizar ideas, tareas o recordatorios.
- Para quienes disfrutan de aprender paso a paso, con explicaciones claras y ejemplos.

---

## 4. Paso 1: Crear el proyecto

En este paso vas a crear la base de tu aplicación usando **Vite** (una herramienta moderna para iniciar proyectos de React de forma rápida).

### 4.1. Abre la terminal

- Si usas Windows, puedes buscar "cmd", "PowerShell" o abrir la terminal integrada de Visual Studio Code.
- Si usas Mac o Linux, abre la aplicación "Terminal".

### 4.2. Ve a la carpeta donde quieres guardar tu proyecto

Por ejemplo, si quieres guardarlo en el Escritorio:

```bash
cd C:\Users\TU_USUARIO\Desktop
```
> Cambia `TU_USUARIO` por tu nombre de usuario real en Windows.

### 4.3. Crea el proyecto con Vite

Escribe el siguiente comando y pulsa Enter:

```bash
npm create vite@latest NotasCorcho -- --template react
```

- Cuando te pregunte el nombre del proyecto, puedes dejar el que aparece por defecto (`NotasCorcho`) o escribir otro.
- Elige `react` como framework.
- Elige `javascript` como variante.

### 4.4. Entra en la carpeta del proyecto

```bash
cd NotasCorcho
```

### 4.5. Instala las dependencias

Esto descargará todo lo necesario para que el proyecto funcione:

```bash
npm install
```

### 4.6. Inicia el servidor de desarrollo

Con este comando podrás ver tu aplicación en el navegador mientras la desarrollas:

```bash
npm run dev
```

- La terminal te mostrará una dirección web, normalmente `http://localhost:5173`.
- Abre esa dirección en tu navegador para ver la aplicación funcionando.

---

**¿Qué hemos hecho hasta aquí?**  
- Has creado la base de tu proyecto usando Vite y React.
- Ya puedes ver una página de inicio de React en tu navegador.

---

## 5. Paso 2: Estructura de carpetas y archivos

Para que tu proyecto esté bien organizado y sea fácil de entender, vamos a crear una estructura de carpetas clara dentro de la carpeta `src`.

### 5.1. ¿Por qué organizar así el proyecto?

- **components/**: Aquí irán los componentes visuales reutilizables, como el tablero (corcho) y las notas.
- **hooks/**: Aquí pondremos funciones especiales para manejar la lógica de las notas (más adelante).
- **styles/**: Aquí guardaremos los archivos de estilos CSS personalizados.
- **assets/**: Aquí puedes guardar imágenes o iconos si los necesitas.

### 5.2. Estructura recomendada

Dentro de la carpeta `src`, tu estructura debería verse así:

```
src/
│
├── components/
│   ├── Board.jsx      // El corcho/tablero principal
│   └── Note.jsx       // El post-it/nota individual
│
├── hooks/
│   └── useNotes.js    // Lógica para gestionar las notas (más adelante)
│
├── styles/
│   └── boardStyles.css // Estilos personalizados del corcho y las notas
│
├── assets/
│   └── (imágenes, iconos, etc.)
│
├── App.jsx
└── main.jsx
```

### 5.3. ¿Cómo crear carpetas y archivos?

Puedes hacerlo desde tu editor de código (por ejemplo, Visual Studio Code) o desde la terminal:

- Para crear una carpeta:
  ```bash
  mkdir src/components
  mkdir src/hooks
  mkdir src/styles
  mkdir src/assets
  ```
- Para crear un archivo vacío:
  ```bash
  type nul > src/components/Board.jsx
  type nul > src/components/Note.jsx
  type nul > src/hooks/useNotes.js
  type nul > src/styles/boardStyles.css
  ```

> Si usas Mac o Linux, cambia `type nul >` por `touch`, por ejemplo:  
> `touch src/components/Board.jsx`

---

**¿Qué hemos hecho hasta aquí?**  
- Has creado una estructura de carpetas clara y lista para empezar a programar los componentes de tu corcho de notas.

---

## 6. Paso 3: Crear los primeros componentes

Ahora vamos a crear los componentes principales de la aplicación: la **Nota** y el **Corcho**.

---

### 6.1. Componente Note.jsx (Nota)

Este componente representa una nota tipo post-it.  
Vamos a crear el archivo `src/components/Note.jsx` con el siguiente contenido:

```jsx
import React from "react";

function Note({ color, text, onChange, maxChars }) {
  return (
    <div
      style={{
        background: color,
        width: "180px",
        minHeight: "120px",
        borderRadius: "10px",
        padding: "12px",
        margin: "10px",
        boxShadow: "2px 2px 8px #aaa",
        wordBreak: "break-word",
        resize: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <textarea
        value={text}
        onChange={onChange}
        maxLength={maxChars}
        style={{
          background: "transparent",
          border: "none",
          width: "100%",
          height: "100%",
          resize: "none",
          fontSize: "1rem",
          outline: "none",
          color: "#222",
        }}
        placeholder="Escribe tu nota..."
      />
      <div style={{ textAlign: "right", fontSize: "0.8em", color: "#555" }}>
        {text.length}/{maxChars}
      </div>
    </div>
  );
}

export default Note;
```

**¿Qué hace este componente?**
- Muestra una nota con un color de fondo.
- Permite escribir texto y limita la cantidad de caracteres.
- Muestra un contador de caracteres usados.

---

### 6.2. Componente Board.jsx (Corcho)

Este componente es el tablero donde se colocan las notas.

Crea el archivo `src/components/Board.jsx` con este contenido:

```jsx
import React, { useState } from "react";
import Note from "./Note";
import "../styles/boardStyles.css";

const COLORES = ["#FFEB3B", "#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFF9C4", "#D1C4E9", "#FFE0B2"];

function Board() {
  const [notes, setNotes] = useState([]);

  const maxNotes = 7;
  const maxChars = 150;

  const addNote = () => {
    if (notes.length < maxNotes) {
      setNotes([...notes, { color: COLORES[notes.length % COLORES.length], text: "" }]);
    }
  };

  const updateNote = (index, newText) => {
    const updated = notes.map((note, i) =>
      i === index ? { ...note, text: newText } : note
    );
    setNotes(updated);
  };

  const changeColor = (index, newColor) => {
    const updated = notes.map((note, i) =>
      i === index ? { ...note, color: newColor } : note
    );
    setNotes(updated);
  };

  return (
    <div>
      <h2>Corcho de Notas</h2>
      <button onClick={addNote} disabled={notes.length >= maxNotes}>
        Añadir Nota
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {notes.map((note, idx) => (
          <div key={idx}>
            <Note
              color={note.color}
              text={note.text}
              maxChars={maxChars}
              onChange={e => updateNote(idx, e.target.value)}
            />
            <div style={{ marginTop: "5px", textAlign: "center" }}>
              {COLORES.map((c, i) => (
                <button
                  key={i}
                  onClick={() => changeColor(idx, c)}
                  style={{
                    background: c,
                    border: note.color === c ? "2px solid #333" : "1px solid #ccc",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    margin: "0 2px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
```

**¿Qué hace este componente?**
- Muestra el título y un botón para añadir nuevas notas.
- Permite tener hasta 7 notas a la vez.
- Cada nota puede cambiar de color y editar su texto.
- Las notas se muestran en filas y columnas, adaptándose al espacio.

---

### 6.3. Usar el Board en App.jsx

Edita el archivo `src/App.jsx` para que muestre el componente Board:

```jsx
import Board from "./components/Board";

function App() {
  return (
    <div style={{ padding: "30px" }}>
      <Board />
    </div>
  );
}

export default App;
```

---

**¿Qué hemos hecho hasta aquí?**  
- Has creado los componentes principales: la nota y el corcho.
- Ya puedes añadir, editar y cambiar el color de las notas.

---

## 7. Paso 4: Añadir funcionalidades básicas

Ahora vamos a mejorar la aplicación para que las notas se guarden automáticamente y puedas personalizar el aspecto visual del corcho y las notas.

---

### 7.1. Guardar y cargar notas automáticamente (localStorage)

Queremos que tus notas no se pierdan aunque cierres o recargues la aplicación.  
Para eso, usaremos el almacenamiento local del navegador (**localStorage**).

#### ¿Cómo hacerlo?

1. Abre `src/components/Board.jsx`.
2. Modifica el componente para que use los hooks de React `useEffect` y `useState` para guardar y cargar las notas.

**Ejemplo de código:**

```jsx
import React, { useState, useEffect } from "react";
// ... (resto de imports)

function Board() {
  const [notes, setNotes] = useState([]);

  // Cargar notas guardadas al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("notas-corcho");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  // Guardar notas cada vez que cambian
  useEffect(() => {
    localStorage.setItem("notas-corcho", JSON.stringify(notes));
  }, [notes]);

  // ... (resto del código igual)
}
```

**¿Qué hace esto?**
- Cuando abres la app, busca si hay notas guardadas y las carga.
- Cada vez que cambias una nota, se guarda automáticamente.

---

### 7.2. Selección de estilos visuales

Vamos a permitir que el usuario elija el estilo visual del corcho y las notas (cozy, informal, formal, minimalista).

#### ¿Cómo hacerlo?

1. Añade un estado para el estilo en `Board.jsx`:
   ```jsx
   const [estilo, setEstilo] = useState("cozy");
   ```
2. Crea un menú desplegable para elegir el estilo:
   ```jsx
   <select value={estilo} onChange={e => setEstilo(e.target.value)}>
     <option value="cozy">Acogedor</option>
     <option value="informal">Informal</option>
     <option value="formal">Formal</option>
     <option value="minimalista">Minimalista</option>
   </select>
   ```
3. Aplica clases CSS dinámicamente según el estilo seleccionado:
   ```jsx
   <div className={`board board-${estilo}`}>
     {/* ... */}
   </div>
   ```
   Y en `Note.jsx`:
   ```jsx
   <div className={`note note-${estilo}`}>...</div>
   ```
4. Crea los estilos en `src/styles/boardStyles.css` para cada modo.

5. (Opcional) Guarda el estilo seleccionado en localStorage igual que las notas, para que se recuerde al recargar.

---

**¿Qué hemos hecho hasta aquí?**  
- Ahora tus notas se guardan automáticamente y no se pierden.
- Puedes personalizar el aspecto visual del corcho y las notas.

---

## 8. Paso 5: Mejorar la experiencia visual e interacción

Ahora vamos a hacer que tu corcho de notas sea mucho más atractivo y fácil de usar, añadiendo nuevas funcionalidades visuales y de interacción.

---

### 8.1. Corcho centrado y visualmente atractivo

- El corcho debe estar centrado en la pantalla y tener un color marrón agradable.
- Usa CSS para darle un aspecto de tablero real.
- Ejemplo de clase en `boardStyles.css`:
  ```css
  .board {
    background: #a67c52;
    margin: 40px auto;
    border-radius: 20px;
    box-shadow: 0 4px 32px #7a5c36;
    width: 900px;
    min-height: 600px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ```

---

### 8.2. Notas arrastrables y movibles

- Permite que el usuario mueva las notas libremente dentro del corcho arrastrándolas con el ratón.
- Usa los eventos de React: `onMouseDown`, `onMouseMove`, `onMouseUp`.
- Asegúrate de que las notas no puedan salir del corcho.
- Cuando una nota se arrastra, debe estar por encima de las demás (`z-index` dinámico).

**Consejo:**  
Puedes guardar la posición de cada nota en el estado, por ejemplo:
```js
{ color: "#FFEB3B", text: "", x: 100, y: 200 }
```
Y actualizar `x` e `y` al mover la nota.

---

### 8.3. Papelera para eliminar notas

- Añade una papelera visual en la esquina inferior derecha del corcho.
- Permite arrastrar una nota hasta la papelera para eliminarla.
- Cambia el aspecto de la papelera cuando una nota está encima para dar feedback visual.

---

### 8.4. Notas autoajustables

- El tamaño de la nota debe ajustarse automáticamente al texto, sin necesidad de scroll.
- Usa CSS y ajusta el tamaño del textarea dinámicamente según el contenido.

---

### 8.5. Selector de color mejorado

- El selector de color solo aparece al pasar el ratón por encima de la nota.
- Los botones de color son pequeños, circulares y están debajo de la nota.

---

### 8.6. Límite de movimiento

- Las notas no pueden salir del corcho ni ocultar su parte superior.
- Calcula los límites usando el tamaño del corcho y el tamaño de la nota.

---

### 8.7. Orden de apilado dinámico

- Al arrastrar una nota, esta debe estar por encima de todas las demás.
- Usa un valor de `z-index` que aumente dinámicamente.

---

**¿Qué hemos conseguido hasta aquí?**  
- El corcho es visualmente atractivo y está centrado.
- Las notas se pueden mover libremente y eliminar fácilmente.
- La experiencia de usuario es mucho más profesional y divertida.

---

## 9. Paso 6: Funcionalidades avanzadas

En este paso, vamos a añadir opciones de personalización y detalles que harán tu aplicación mucho más completa y agradable de usar.

---

### 9.1. Título personalizado para el corcho

- Permite que el usuario escriba un título para su corcho.
- Guarda el título en localStorage para que se recuerde al volver a abrir la app.
- Ejemplo:  
  Añade un input en la parte superior del corcho:
  ```jsx
  <input
    type="text"
    value={titulo}
    onChange={e => setTitulo(e.target.value)}
    placeholder="Ponle un título a tu corcho..."
    className="titulo-corcho"
  />
  ```
- Recuerda guardar y cargar el título igual que las notas.

---

### 9.2. Selector de estilos visuales avanzado

- Coloca el selector de estilos arriba a la izquierda, bien visible.
- El selector debe adaptarse al modo noche/día para ser siempre legible.
- Puedes usar un `<select>` o botones con iconos.

---

### 9.3. Modo noche/día

- Añade un botón (toggle) arriba a la derecha para cambiar entre modo claro y modo noche.
- En modo noche, el fondo es un cielo estrellado hecho con CSS puro.
- Todos los estilos del corcho y las notas deben tener su versión para modo noche.
- Guarda la preferencia en localStorage.

**Ejemplo de toggle:**
```jsx
<button onClick={toggleModoNoche}>
  {modoNoche ? "☀️ Modo Día" : "🌙 Modo Noche"}
</button>
```

---

### 9.4. Fondo exterior 100% pantalla

- El fondo (marrón claro o cielo estrellado) debe ocupar toda la pantalla, sin barras de scroll.
- El corcho sigue centrado y con tamaño definido.

---

### 9.5. Papelera mejorada

- La papelera debe estar separada del corcho, abajo a la derecha.
- Cambia de aspecto cuando una nota está encima para indicar que se puede eliminar.

---

### 9.6. Detalles visuales pulidos

- El selector de estilos y el toggle de modo noche/día deben ser perfectamente visibles en ambos modos.
- El fondo siempre ocupa el 100% de la pantalla, aunque haya muchas notas.

---

**¿Qué hemos conseguido hasta aquí?**  
- Tu corcho es totalmente personalizable: título, estilos, modo noche/día.
- La experiencia visual es moderna y cómoda para cualquier usuario.

---

## 10. Sugerencias y mejoras futuras

Una vez que tengas tu corcho de notas funcionando, puedes seguir mejorándolo y aprendiendo nuevas tecnologías. Aquí tienes algunas ideas para llevar tu proyecto al siguiente nivel:

---

### 10.1. Crear un instalador para Windows, Mac y Linux

- Usa herramientas como [electron-builder](https://www.electron.build/) o [electron-forge](https://www.electronforge.io/) para convertir tu app en un programa instalable.
- Así podrás compartir tu aplicación fácilmente con otras personas.

(Actualmente lo que he realizado es un .exe para ejecutar el programa como un ejecutable portable.)

---

### 10.2. Personalizar iconos

- Cambia el icono de la ventana y del instalador para que tu app tenga su propia identidad visual.
- Puedes usar imágenes propias o buscar iconos libres en sitios como [icons8.com](https://icons8.com/).

---

### 10.3. Menús y notificaciones

- Añade menús personalizados, atajos de teclado o notificaciones del sistema para mejorar la experiencia de usuario.
- Por ejemplo, puedes mostrar un aviso cuando se borra una nota.

---

### 10.4. Sincronización en la nube

- Permite guardar y recuperar notas desde servicios en la nube (Google Drive, Dropbox, Firebase, etc.).
- Así podrás tener tus notas en varios dispositivos.

---

### 10.5. Soporte multiplataforma

- Empaqueta tu app para Windows, Mac y Linux fácilmente con Electron.
- Prueba tu aplicación en diferentes sistemas operativos para asegurarte de que funciona bien en todos.

---

### 10.6. Actualizaciones automáticas

- Implementa actualizaciones automáticas para que los usuarios siempre tengan la última versión de la app.

---

### 10.7. Modo multiusuario o multi-tablero

- Permite crear varios tableros/corchos y cambiar entre ellos.
- Así podrás organizar tus notas por temas o proyectos.

---

### 10.8. Exportar e importar notas

- Permite exportar tus notas a un archivo (por ejemplo, JSON o CSV) o importarlas desde otro dispositivo.

---

**¡Estas ideas pueden ayudarte a seguir aprendiendo y mejorando tu aplicación!**

---

## 11. Preguntas frecuentes (FAQ)

**¿Necesito saber programar para seguir este tutorial?**  
No es necesario tener experiencia previa. Cada paso está explicado de forma sencilla. Si tienes dudas, busca el término o pregunta a la comunidad.

**¿Puedo usar otro editor de código que no sea Visual Studio Code?**  
Sí, puedes usar cualquier editor de texto, aunque Visual Studio Code es muy recomendable por sus herramientas y facilidad de uso.

**¿Qué hago si la terminal me da un error desconocido?**  
Lee el mensaje con atención. Muchas veces indica exactamente qué falta (por ejemplo, un archivo no encontrado o un comando mal escrito). Si no lo entiendes, copia el error y búscalo en Google o pregunta en foros como Stack Overflow.

**¿Puedo cambiar los colores o estilos de las notas?**  
¡Por supuesto! Solo tienes que modificar los valores en el archivo de estilos CSS o en el array de colores del componente.

**¿Puedo tener más de un corcho/tablero?**  
En la versión básica, solo hay uno, pero puedes implementar la función multi-tablero siguiendo las sugerencias de mejoras.

---

## 12. Solución de problemas

**El comando `npm run dev` no funciona o da error**  
- Asegúrate de haber ejecutado `npm install` antes.
- Verifica que estés en la carpeta correcta del proyecto.
- Si el error persiste, cierra la terminal y vuelve a abrirla, o reinicia tu computadora.

**No veo los cambios en el navegador**  
- Guarda los archivos después de editarlos.
- Refresca la página del navegador.
- Si sigue igual, detén el servidor (`Ctrl + C` en la terminal) y vuelve a ejecutar `npm run dev`.

**No se guardan las notas o el título**  
- Asegúrate de que tu navegador permite el uso de localStorage.
- Prueba en otro navegador o borra la caché.

**Las notas se salen del corcho o se superponen**  
- Revisa la lógica de movimiento y los límites en el código.
- Ajusta los valores de posición y tamaño en el estado de cada nota.

**¿Tienes otro problema?**  
- Busca el error en Google, probablemente alguien ya tuvo el mismo problema.
- Consulta la documentación oficial de React, Electron o Vite.
- Pide ayuda en foros o comunidades de programación.

---

## 13. Créditos y agradecimientos

- Proyecto inspirado en la idea de los corchos de notas físicos y en aplicaciones como Trello o Google Keep.
- Tutorial y guía elaborados por [https://www.linkedin.com/in/ismael-pérez-soler/].
- Gracias a la comunidad de desarrolladores de React, Electron y Vite por sus recursos y documentación.

---

**¡Gracias por usar y mejorar este proyecto! Si tienes sugerencias, dudas o quieres compartir tu versión, no dudes en hacerlo. ¡Feliz programación!** 

