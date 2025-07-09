import React, { useState, useEffect, useRef } from "react";
import Note from "./Note";
import "../styles/boardStyles.css";

const COLORES = ["#FFEB3B", "#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFF9C4", "#D1C4E9", "#FFE0B2"];
const ESTILOS = [
  { value: "original", label: "Original" },
  { value: "suave", label: "Suavizado" },
  { value: "cozy", label: "Cozy" },
  { value: "formal", label: "Formal" },
  { value: "informal", label: "Informal" },
];

function Board() {
  const [notes, setNotes] = useState([]);
  const [dragNoteIdx, setDragNoteIdx] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);
  const [baseNoteOffset, setBaseNoteOffset] = useState({ x: 0, y: 0 });
  const [title, setTitle] = useState("Mi corcho");
  const [estilo, setEstilo] = useState("original");
  const [modoNoche, setModoNoche] = useState(false);
  const corchoRef = useRef(null);
  const noteRefs = useRef([]);
  const trashRef = useRef(null);
  const baseNoteRef = useRef(null);
  const maxChars = 150;

  // Cargar notas, título, estilo y modo noche de localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notas-corcho");
    if (saved) setNotes(JSON.parse(saved));
    const savedTitle = localStorage.getItem("titulo-corcho");
    if (savedTitle) setTitle(savedTitle);
    const savedEstilo = localStorage.getItem("estilo-corcho");
    if (savedEstilo) setEstilo(savedEstilo);
    const savedModoNoche = localStorage.getItem("modo-noche-corcho");
    if (savedModoNoche) setModoNoche(savedModoNoche === "true");
  }, []);

  // Guardar notas, título, estilo y modo noche en localStorage
  useEffect(() => {
    localStorage.setItem("notas-corcho", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem("titulo-corcho", title);
  }, [title]);
  useEffect(() => {
    localStorage.setItem("estilo-corcho", estilo);
  }, [estilo]);
  useEffect(() => {
    localStorage.setItem("modo-noche-corcho", modoNoche);
  }, [modoNoche]);

  // Añadir nota en la posición soltada (drag & drop base)
  const handleDrop = (e) => {
    if (!corchoRef.current) return;
    const rect = corchoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - baseNoteOffset.x;
    const y = e.clientY - rect.top - baseNoteOffset.y;
    setNotes([
      ...notes,
      {
        color: COLORES[notes.length % COLORES.length],
        text: "",
        x: x,
        y: y,
      },
    ]);
  };

  // Mouse-based drag & drop para notas existentes
  const handleNoteMouseDown = (idx, e) => {
    if (e.button !== 0) return; // solo botón izquierdo
    const noteRect = noteRefs.current[idx].getBoundingClientRect();
    setNotes(notes => {
      const note = notes[idx];
      const newNotes = notes.filter((_, i) => i !== idx);
      return [...newNotes, note];
    });
    setTimeout(() => {
      setDragNoteIdx(notes.length - 1);
      setDragOffset({
        x: e.clientX - noteRect.left,
        y: e.clientY - noteRect.top,
      });
      setIsDragging(true);
      document.body.style.userSelect = "none";
    }, 0);
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e) => {
      if (dragNoteIdx === null) return;
      const corchoRect = corchoRef.current.getBoundingClientRect();
      const noteRect = noteRefs.current[dragNoteIdx].getBoundingClientRect();
      const noteWidth = noteRect.width;
      const noteHeight = noteRect.height;
      let x = e.clientX - corchoRect.left - dragOffset.x;
      let y = e.clientY - corchoRect.top - dragOffset.y;
      // Limitar dentro del corcho
      x = Math.max(0, Math.min(x, corchoRect.width - noteWidth));
      y = Math.max(0, Math.min(y, corchoRect.height - noteHeight));
      setNotes(notes => notes.map((note, i) =>
        i === dragNoteIdx ? { ...note, x, y } : note
      ));
      // Detectar si está sobre la papelera
      if (trashRef.current) {
        const trashRect = trashRef.current.getBoundingClientRect();
        if (
          e.clientX >= trashRect.left &&
          e.clientX <= trashRect.right &&
          e.clientY >= trashRect.top &&
          e.clientY <= trashRect.bottom
        ) {
          setIsOverTrash(true);
        } else {
          setIsOverTrash(false);
        }
      }
    };
    const handleMouseUp = (e) => {
      if (isOverTrash && dragNoteIdx !== null) {
        setNotes(notes => notes.filter((_, i) => i !== dragNoteIdx));
      }
      setIsDragging(false);
      setDragNoteIdx(null);
      setIsOverTrash(false);
      document.body.style.userSelect = "auto";
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragNoteIdx, dragOffset, isOverTrash]);

  // Actualizar texto de la nota
  const updateNote = (index, newText) => {
    setNotes(notes => notes.map((note, i) =>
      i === index ? { ...note, text: newText } : note
    ));
  };

  // Cambiar color de la nota
  const changeColor = (index, newColor) => {
    setNotes(notes => notes.map((note, i) =>
      i === index ? { ...note, color: newColor } : note
    ));
  };

  // Drag & drop handlers para la nota base
  const handleBaseDragStart = (e) => {
    if (baseNoteRef.current) {
      const rect = baseNoteRef.current.getBoundingClientRect();
      setBaseNoteOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Clases dinámicas para el fondo
  const fondoClass = modoNoche ? "fondo-noche-estrellado" : "fondo-dia-marron";
  const corchoClass = `board-marron board-estilo-${estilo}` + (modoNoche ? " board-noche" : "");

  return (
    <div className={fondoClass} style={{ width: "100vw", height: "100vh", minHeight: "100vh", minWidth: "100vw", overflow: "hidden", position: "fixed", top: 0, left: 0, zIndex: 0 }}>
      {/* Selector de estilos arriba a la izquierda */}
      <div style={{ position: "fixed", left: 24, top: 24, zIndex: 3000, background: modoNoche ? "#2d2320" : "#fffbe7", borderRadius: "10px", padding: "8px 12px", boxShadow: modoNoche ? "0 2px 8px #0008" : "2px 2px 8px #0001", border: modoNoche ? "1.5px solid #795548" : "1.5px solid #ffe082", color: modoNoche ? "#ffe0b2" : "#795548", fontWeight: 600 }}>
        <label style={{ marginRight: 8 }}>Estilo:</label>
        <select
          value={estilo}
          onChange={e => setEstilo(e.target.value)}
          className={"select-estilo " + (modoNoche ? "noche" : "dia")}
        >
          {ESTILOS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {/* Toggle modo noche/día arriba a la derecha */}
      <div style={{ position: "fixed", right: 24, top: 24, zIndex: 3000, background: modoNoche ? "#2d2320" : "#fffbe7", borderRadius: "10px", padding: "8px 16px", boxShadow: modoNoche ? "0 2px 8px #0008" : "-2px 2px 8px #0001", border: modoNoche ? "1.5px solid #795548" : "1.5px solid #ffe082", color: modoNoche ? "#ffe0b2" : "#795548", display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
        <span style={{ fontSize: "1.2em" }}>{modoNoche ? "🌙" : "☀️"}</span>
        <label className="switch">
          <input type="checkbox" checked={modoNoche} onChange={() => setModoNoche(m => !m)} />
          <span className="slider"></span>
        </label>
      </div>
      {/* Título editable */}
      <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            fontSize: "2.2em",
            fontWeight: 700,
            textAlign: "center",
            margin: "32px 0 8px 0",
            border: "none",
            background: "transparent",
            outline: "none",
            color: modoNoche ? "#ffe0b2" : "#795548",
            textShadow: modoNoche ? "0 2px 8px #0008" : "0 2px 8px #fff8",
            width: "min(90vw, 600px)",
          }}
          maxLength={40}
          placeholder="Ponle un nombre a tu corcho..."
        />
        <div
          ref={corchoRef}
          className={corchoClass}
          onDragOver={e => { e.preventDefault(); }}
          onDrop={handleDrop}
          style={{ position: "relative", margin: "0 auto" }}
        >
          {notes.map((note, idx) => (
            <div
              key={idx}
              ref={el => noteRefs.current[idx] = el}
              style={{
                position: "absolute",
                left: note.x,
                top: note.y,
                zIndex: 2 + idx,
                cursor: isDragging && dragNoteIdx === idx ? "grabbing" : "grab",
                userSelect: "none",
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                width: "fit-content",
                height: "fit-content",
                boxShadow: "none",
                transition: "none"
              }}
              onMouseDown={e => handleNoteMouseDown(idx, e)}
            >
              <Note
                color={note.color}
                text={note.text}
                maxChars={maxChars}
                onChange={e => updateNote(idx, e.target.value)}
                showColorSelector={true}
                onColorChange={c => changeColor(idx, c)}
                selectedColor={note.color}
              />
            </div>
          ))}
          {/* Nota arrastrable base */}
          <div
            className="base-note"
            draggable
            ref={baseNoteRef}
            onDragStart={handleBaseDragStart}
            style={{
              position: "absolute",
              left: "50%",
              bottom: "-140px",
              transform: "translateX(-50%)",
              zIndex: 100,
            }}
          >
            Arrastra para crear una nota
          </div>
        </div>
      </div>
      {/* Papelera visual, más separada del corcho */}
      <div
        ref={trashRef}
        className={"trash-bin" + (isOverTrash ? " over" : "")}
        style={{
          position: "fixed",
          right: "60px",
          bottom: "40px",
          width: "60px",
          height: "60px",
          background: isOverTrash ? "#d32f2f" : "#795548",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px #0003",
          color: "#fff",
          fontSize: "2.2em",
          transition: "background 0.2s, box-shadow 0.2s",
          zIndex: 2000,
          cursor: "pointer"
        }}
        title="Arrastra aquí para borrar la nota"
      >
        🗑️
      </div>
    </div>
  );
}

export default Board; 