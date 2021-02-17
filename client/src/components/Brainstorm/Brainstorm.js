import React, { useState, useEffect, useRef } from "react";
import Navigation from "../Navigation/Navigation";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import "./Brainstorm.css";
import NegativeForm from "./NegativeForm";
import Negative from "./Negative";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ReactCountdownClock from "react-countdown-clock";

function Brainstorm() {
  const [todos, setTodos] = useState([]);
  const [negative, setNegative] = useState([]);
  const [phase, setPhase] = useState("write");
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (phase === "write") {
      document.getElementById("arrow2").onclick = () => {
        setPhase("vote");
      };
    } else if (phase === "vote") {
      document.getElementById("positive-form").style.display = "none";
      document.getElementById("negative-form").style.display = "none";
      document.getElementById("arrow2").onclick = () => {
        setPhase("discuss");
        sort();
      };
    }
  }, [phase]);

  useEffect(() => {
    if (paused) {
      document.getElementById("positive-input").disabled = true;
      document.getElementById("negative-input").disabled = true;
    } else {
      document.getElementById("positive-input").disabled = false;
      document.getElementById("negative-input").disabled = false;
    }
  }, [paused]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };
  const addNegative = (card) => {
    if (!card.text || /^\s*$/.test(card.text)) {
      return;
    }
    const newNegative = [card, ...negative];
    setNegative(newNegative);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };
  const removeNegative = (id) => {
    const removedArr = [...negative].filter((negative) => negative.id !== id);

    setNegative(removedArr);
  };

  const Heading = () => {
    if (phase === "write") {
      return (
        <div>
          <h2>PHASE 1: WRITE</h2>
        </div>
      );
    } else if (phase === "vote") {
      return (
        <div>
          <h2>PHASE 2: VOTE</h2>
        </div>
      );
    } else if (phase === "discuss") {
      return (
        <div>
          <h2>PHASE 3: DISCUSS</h2>
        </div>
      );
    }
  };

  const sort = () => {
    let newArr = [...todos];
    let sorted = newArr.sort((a, b) => b.votes > a.votes);
    setTodos(sorted);
  };

  return (
    <div>
      <Navigation />
      <div className="heading">
        <Heading />
        <div>
          {phase !== "discuss" ? (
            <div className="arrows-cnt">
              <span>NEXT PHASE</span>
              <FaAngleRight className="arrow" id="arrow2" />
            </div>
          ) : (
            <div className="arrows-cnt">
              <span>DISCUSS!</span>
            </div>
          )}
        </div>
        <div className="clock">
          {phase === "write" ? (
            <div>
              <h3 id="clock-hint">
                {paused ? "Press on the clock to start!" : null}
              </h3>
              <ReactCountdownClock
                seconds={20}
                color="rgba(31, 75, 80, 1)"
                alpha={0.6}
                size={100}
                id="clock"
                paused={paused}
                onClick={() => setPaused(false)}
                onComplete={() => setPhase("vote")}
              />
            </div>
          ) : null}
          {phase === "vote" ? (
            <ReactCountdownClock
              seconds={10}
              color="rgba(31, 75, 80, 1)"
              alpha={0.6}
              size={100}
              id="clock"
              onComplete={() => setPhase("discuss")}
            />
          ) : null}
        </div>
      </div>
      <div className="todo-app-grid">
        <div className="todo-app-left">
          <h3>POSITIVE</h3>
          <TodoForm onSubmit={addTodo} />
          <Todo
            todos={todos}
            setTodos={setTodos}
            removeTodo={removeTodo}
            phase={phase}
          />
        </div>
        <div className="todo-app-right">
          <h3>NEGATIVE</h3>
          <NegativeForm onSubmit={addNegative} />
          <Negative
            todos={negative}
            setNegative={setNegative}
            removeTodo={removeNegative}
            phase={phase}
          />
        </div>
      </div>
    </div>
  );
}

export default Brainstorm;
