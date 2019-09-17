import React from "react";
import "./TodoItem.css";

const TodoItem = ({ todo, onCompleteTodo, onUncheckTodo, isCompleted }) => {
  return (<div className="TodoItem">
    <button onClick={!isCompleted ? onCompleteTodo : onUncheckTodo}>&#10004;</button>
    <label className={isCompleted ? "completed" : null}>{todo}</label>
  </div>);
};

export default TodoItem;
