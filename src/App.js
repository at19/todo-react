import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './components/Input/Input';
import TodoItem from './components/TodoItem/TodoItem';

const ALL_TODOS = 0;
const ACTIVE_TODOS = 1;
const COMPLETED_TODOS = 2;

function App() {
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showingTodos, setShowingTodos] = useState([]);
  const [currentTab, setCurrentTab] = useState(ALL_TODOS);
  const [currentTodo, setCurrentTodo] = useState("");

  useEffect(() => {
  const allTodos = () => [...activeTodos, ...completedTodos];

    switch (currentTab) {
      case ALL_TODOS:
        setShowingTodos(allTodos());
        break;
      case ACTIVE_TODOS:
        setShowingTodos(activeTodos);
        break;
      case COMPLETED_TODOS:
        setShowingTodos(completedTodos);
        break;
      default:
        break;
    }
  }, [activeTodos, completedTodos, currentTab])

  const addTodo = todo => {
    const todos = [...activeTodos];
    if (!activeTodos.includes(todo)) {
      todos.unshift(todo);
    }
    setActiveTodos(todos);
  }

  const completeTodo = todoToComplete => {
    // setCompletedTodos([...completedTodos, todoToComplete]);

    setActiveTodos(activeTodos.filter(todo => todo !== todoToComplete));
    const completedSet = new Set(completedTodos);
    completedSet.add(todoToComplete);
    setCompletedTodos([...completedSet]);
  }

  const uncheckTodo = todoToUncheck => {
    setCompletedTodos(completedTodos.filter(todo => todo !== todoToUncheck));
    addTodo(todoToUncheck);
  }

  const clearCompletedTodos = () => {
    // setTodos()
    setCompletedTodos([])
  };

  const numberOfTodosLeft = () => activeTodos.length;

  const onTodoUpdate = event => {
    setCurrentTodo(event.target.value);
  }

  const onTodoAdd = () => {
    addTodo(currentTodo);
  }

  const showAllTodos = () => {
    setCurrentTab(ALL_TODOS);
  }

  const showActiveTodos = () => {
    setCurrentTab(ACTIVE_TODOS);
  }

  const showCompletedTodos = () => {
    setCurrentTab(COMPLETED_TODOS);
  }

  return (
    <div className="App">
      <Input onTodoUpdate={onTodoUpdate} onTodoAdd={onTodoAdd} />
      {showingTodos.map((todo, index) => (
        <TodoItem key={index} todo={todo} onCompleteTodo={() => completeTodo(todo)} onUncheckTodo={() => uncheckTodo(todo)} isCompleted={completedTodos.includes(todo)} />
      ))}
      <button className="tab-control" onClick={showAllTodos}>ALL</button>
      <button className="tab-control" onClick={showActiveTodos}>ACTIVE</button>
      <button className="tab-control" onClick={showCompletedTodos}>COMPLETED</button>
      <button className="tab-control" onClick={clearCompletedTodos}>CLEAR COMPLETED</button>
      <p>Todos left: {numberOfTodosLeft()}</p>
    </div>
  );
}

export default App;
