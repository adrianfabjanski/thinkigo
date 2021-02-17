import React, {useState, useEffect} from 'react'
import { render } from 'react-dom';
import Brainstorm from "../Brainstorm/Brainstorm";
import './Voting.css';
import ReactCountdownClock from 'react-countdown-clock';




function Voting() {
    


    const [todos, setTodos] = useState([]);
    const [savedTodos, setSavedTodos] = useState()
    const [voteCount, setVoteCount] = useState()
    //var QtyPicker = require('react-quantity-picker')

   
    const loadTodos = () => {
        let temp2 = JSON.parse(localStorage.getItem('todos'))
        setSavedTodos(temp2)     
    }

    useEffect(() => {
        loadTodos()
    }, [])

    const vote = (text) => {
        const updater = [...savedTodos]
        savedTodos.forEach((todo) => {
            if(todo.text === text) {
                todo.id += 1
            }
        })
        setSavedTodos(updater)
        let updaterString = JSON.stringify(updater)
        localStorage.setItem('todos', updaterString)
    }

    const voteSubtract = (text) => {
        const updater = [...savedTodos]
        savedTodos.forEach((todo) => {
            if(todo.text === text) {
                if (todo.id == 0) {
                    return
                }
                else
                {
                   todo.id -= 1 
                }
                
            }
        })
        setSavedTodos(updater)
        let updaterString = JSON.stringify(updater)
        localStorage.setItem('todos', updaterString)
    }

    const ListTodos = () => {
        if(savedTodos){
           return savedTodos.map(item => {
                return (
                    <div className='todo-row'>
                    {item.text}
                        <div id='votes-counter'>
                        

                        <button onClick= {() => {
                            voteSubtract(item.text);

                        }}>
                            -
                        </button>

                        <span>{item.id}</span>

                        <button onClick= {() => {
                            vote(item.text);
                        }}>
                            +
                        </button>
                        
                        </div>
                    
                    </div>
                )
            })
          } else {
              return null
          }
    }


/* 
    const addVote = () => {
        
        const 

    }

    const ShowVote = () => {
        return (
            <div>

            </div>
        )
    } */













    return (
        <div>
            <div className='clock'>

<ReactCountdownClock seconds={60}
        color="#000"
        alpha={0.9}
        size={100}
        />
        <h2 id='time-left'>Times left for voting</h2>
</div>
            <div className='todo-app'>

                <div>
                    <ListTodos />
                </div>
            </div>
        </div>
    )
}

export default Voting
