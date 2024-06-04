import { useState } from 'react'
import {type ListOfTodos, type Todo as TodoType} from '../types'
import { Footer } from './Footer'
import { Todo } from './Todo'
import './Todos.css'
interface Props{
    todos:ListOfTodos,
    setTodos: (elm:TodoType[])=>void
}
export const Todos: React.FC<Props> = ({todos, setTodos})=>{
    const [check, setCheck] = useState('todos')
    if(todos.length <= 0 )
        return (
            <ul className='todos'>
                <h1 style={{textAlign:'center' , fontStyle:'italic'}}>Lista vacia....</h1>
                
                <Footer check={setCheck} todos={todos} setTodos={setTodos}/>
            </ul>
    )
    else if(!todos.some(elm => elm.completed) && check === 'completados')
        return (
            <ul className='todos'>
                <h1 style={{textAlign:'center' , fontStyle:'italic'}}>No hay elementos completados....</h1>
                <Footer check={setCheck} todos={todos} setTodos={setTodos}/> 
            </ul>   
        )
    else if(!todos.some(check => !check.completed) && check === 'sin completar')
        return (
            <ul className='todos'>
                <h1 style={{textAlign:'center' , fontStyle:'italic'}}>No hay elementos sin completar....</h1>
                <Footer check={setCheck} todos={todos} setTodos={setTodos}/> 
            </ul>   
        )
    return (
        <ul className='todos'>
            {
                todos.map(todo =>{
                    if(check === 'completados' && todo.completed)
                    {
                        return (
                            <li key={todo.title+'-'+todo.id}  className='completed'>
                                <Todo todos={todos} todo={todo} setTodos={setTodos} />
                            </li>
                        )
                    }
                    else if(check === 'sin completar' && !todo.completed){
                        return (
                            <li key={todo.title+'-'+todo.id}>
                                <Todo todos={todos} todo={todo} setTodos={setTodos} />
                            </li>
                        )
                    }
                    else if( check === 'todos'){
                        
                        return (
                            <li key={todo.title+'-'+todo.id}  className={todo.completed?'completed':''}>
                                <Todo todos={todos} todo={todo} setTodos={setTodos} />
                            </li>
                        )
                    }
                    else
                        return null
                }
                )
                
            }
            <Footer check={setCheck} todos={todos} setTodos={setTodos}/>
        </ul>
    )
}