import React, { useRef, useEffect, useState } from "react";

function Note({ color, text, onChange, maxChars, showColorSelector, onColorChange, selectedColor }) {
  const textareaRef = useRef(null);
  const [hover, setHover] = useState(false);
  const COLORES = [
    "#ffe066", // Amarillo pastel intenso
    "#ffb3b3", // Rosa pastel intenso
    "#b2f2bb", // Verde pastel intenso
    "#a5d8ff", // Azul pastel intenso
    "#fff3bf", // Crema pastel
    "#d0bfff", // Lila pastel intenso
    "#ffd6a5"  // Naranja pastel intenso
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  return (
    <div
      className={"note"}
      style={{
        background: color, // Sin transparencia
        width: "180px",
        minHeight: "40px",
        borderRadius: "10px",
        padding: "12px",
        margin: "10px",
        boxShadow: "1px 1px 6px #8883",
        wordBreak: "break-word",
        resize: "none",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        filter: "brightness(0.98) saturate(1.05)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={onChange}
        maxLength={maxChars}
        style={{
          background: "transparent",
          border: "none",
          width: "100%",
          minHeight: "40px",
          resize: "none",
          fontSize: "1rem",
          outline: "none",
          color: "#3a2c23",
          overflow: "hidden",
        }}
        placeholder="Escribe tu nota..."
      />
      <div style={{ textAlign: "right", fontSize: "0.8em", color: "#7b5a36" }}>
        {text.length}/{maxChars}
      </div>
      {showColorSelector && hover && (
        <div className="color-selector">
          {COLORES.map((c, i) => (
            <button
              key={i}
              className={"color-circle" + (selectedColor === c ? " selected" : "")}
              style={{ background: c, border: selectedColor === c ? "2.5px solid #333" : "1.5px solid #fff", boxShadow: "0 1px 3px #0002" }}
              onClick={e => { e.stopPropagation(); onColorChange && onColorChange(c); }}
              tabIndex={-1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Note; 