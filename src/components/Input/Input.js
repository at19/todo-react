import React from 'react'
import './Input.css';

const ENTER_KEY_CODE = 13;

const Input = ({onTodoUpdate, onTodoAdd}) => {

  const handleKeyDown = ({keyCode}) => {
    if (keyCode === ENTER_KEY_CODE) {
      onTodoAdd();
    }
  }

  return (
    <input type="text" placeholder="What needs to be done?" onChange={onTodoUpdate} onKeyDown={handleKeyDown}/>
  )
}

export default Input;