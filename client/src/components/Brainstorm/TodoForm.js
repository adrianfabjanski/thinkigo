import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.random().toString(36).substr(2, 9),
      text: input,
      votes: 0,
    });
    setInput("");
  };

  //setInput

  return (
    <form onSubmit={handleSubmit} className="todo-form" id="positive-form">
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add positive card"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
            id="positive-input"
          />
          <button onClick={handleSubmit} className="todo-button">
            +
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
