import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Brainstorm from "./Brainstorm";
import { RiCloseCircleLine } from "react-icons/ri";

function Todo({ setTodos, todos, phase, removeTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  if (edit.id) {
    return <TodoForm edit={edit} />;
  }

  const vote = (id) => {
    const updater = [...todos];
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.votes += 1;
      }
    });
    setTodos(updater);
    let updaterString = JSON.stringify(updater);
    localStorage.setItem("todos", updaterString);
  };

  //   const renderVotes = () => {
  //       if(phase === 'vote' || phase ===)
  //   }

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

export default Todo;
