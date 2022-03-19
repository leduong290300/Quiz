import React, { useRef } from "react";

export default function Start({ setUsername }) {
  const inputRef = useRef();
  const handleStartGame = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };
  return (
    <div className="start">
      <input
        type="text"
        placeholder="Tên người chơi"
        className="input_username"
        ref={inputRef}
      />
      <button className="start_button" onClick={handleStartGame}>
        Bắt đầu chơi
      </button>
    </div>
  );
}
