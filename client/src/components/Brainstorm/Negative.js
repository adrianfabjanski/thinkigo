import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Brainstorm from "./Brainstorm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Negative({ todos, removeTodo, setNegative, phase }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const vote = (id) => {
    const updater = [...todos];
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.votes += 1;
      }
    });
    setNegative(updater);
  };

  const ListTodos = () => {
    if (todos) {
      return todos.map((todo, index) => {
        return (
          <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
          >
            <div key={todo.id}>{todo.text}</div>

            <div className="icons">
              {phase === "vote" || phase === "discuss" ? (
                <p>{todo.votes}</p>
              ) : null}
              {phase === "write" ? (
                <RiCloseCircleLine
                  onClick={() => removeTodo(todo.id)}
                  className="delete-icon"
                  id="delete-btn"
                />
              ) : null}
              {phase === "vote" ? (
                <button
                  onClick={() => {
                    vote(todo.id);
                  }}
                  id="vote-btn"
                >
                  +
                </button>
              ) : null}
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div>
      <ListTodos />
    </div>
  );
}

export default Negative;
