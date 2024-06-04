import { useState } from 'react'
import './App.css'
import {Todos} from './components/Todos'
import { InputTodo } from './components/InputTodo'
import { ListOfTodos } from './types'
function App():JSX.Element {
  const data:ListOfTodos | null = JSON.parse(localStorage.getItem('tasks')!)
  const [todos, setTodos] = useState(data === null? []: data)
  return (
    <>
      <h1>TODO con Typescript</h1>
      <InputTodo todos={todos} setTodos={setTodos}/>
      <Todos todos={todos} setTodos={setTodos}></Todos>
    </>
  )
}

export default App
