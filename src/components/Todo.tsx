import { ChangeEvent, useRef, useState } from "react";
import { type ListOfTodos, type Todo as TodoType } from "../types";

interface Props {
    todo: TodoType;
    todos: ListOfTodos;
    setTodos: (elm: TodoType[]) => void;
}
export const Todo: React.FC<Props> = ({ todos, todo, setTodos }) => {
    
    const inputRef = useRef<HTMLInputElement>(null)
    const [input, setInput] = useState(todo.title)
    function handleChangeState() {
        const new_todos = todos.map((elm) => {
            if (elm.id === todo.id) {
                return { ...elm, completed: elm.completed ? false : true };
            }
            return elm;
        });
        setTodos(new_todos);
        localStorage.setItem("tasks", JSON.stringify(new_todos));
    }
    function handleRemove() {
        const new_todos = todos.reduce((acc: ListOfTodos, elm) => {
            if (elm.id != todo.id) acc.push(elm);
            return acc;
        }, []);
        setTodos(new_todos);
        localStorage.setItem("tasks", JSON.stringify(new_todos));
    }
    function handleButton(evt:  React.KeyboardEvent<HTMLInputElement>) {
        if(evt.code === 'Enter'){
            const title = inputRef.current?.value
            if(title === null)
                return
            const new_todos:ListOfTodos = todos.map(elm => elm.id === todo.id? {...elm,title: title === undefined? '':title}:elm)
            setTodos(new_todos)
            localStorage.setItem('tasks', JSON.stringify(new_todos))
        }
    }
    function handleChange(evt:ChangeEvent<HTMLInputElement>){
        evt.preventDefault()
        const value = evt.target.value
        setInput(value === undefined?input:value)
    }
    return (
        <div className="view">
            <div className="content">
                <input
                    type="checkbox"
                    className="toggle"
                    checked={todo.completed}
                    onChange={handleChangeState}
                />
                <input value={input} onKeyUp={handleButton} ref={inputRef} onChange={handleChange}/>
            </div>
            <button onClick={handleRemove}>✖</button>
        </div>
    );
};
