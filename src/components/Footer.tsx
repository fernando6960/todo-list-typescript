import { useState } from "react";
import "./Footer.css";
import { type ListOfTodos, type Todo } from "../types";
import sweetAlert from 'sweetalert'
interface Props {
  check: (elm: string) => void;
  todos: ListOfTodos;
  setTodos: (elm: ListOfTodos) => void;
}

export const Footer: React.FC<Props> = ({ check, todos, setTodos }) => {
  const [radios, setRadios] = useState(new Map([["todos",true],["completados",false],["sin completar", false]]));
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const new_radios = new Map(radios)
    for(const [key,] of radios)
        new_radios.set(key, false)
     new_radios.set(e.target.value, true)
     setRadios(new_radios);
     check(e.target.value);
  }
  function handleClear() {
    
    if(todos.length === 0)
        sweetAlert("No hay elementos")
    sweetAlert({
        title: "Estas seguro?",
        text: "Una vez elminado, no se ra capaz de recuperar la informacion!",
        icon: "warning",
        buttons: [true,true],
        dangerMode: true
      })
      .then((willDelete) => {
        if(willDelete && radios.get('todos')){
            setTodos([])
            localStorage.setItem('tasks', JSON.stringify([]))        
            sweetAlert("Las tareas han sido eliminadas con exito", {
                icon: "success",
            });
        }
        else if (willDelete && radios.get('completados')) {
            const new_todos: ListOfTodos = todos.reduce(
                (acc: ListOfTodos, todo: Todo) => {
                  if(!todo.completed) 
                    acc.push(todo);
                  return acc;
                },[])
              setTodos(new_todos)
              console.log(new_todos)
              localStorage.setItem('tasks', JSON.stringify(new_todos))        
          sweetAlert("La tarea ha sido eliminada con exito", {
            icon: "success",
          });
        }
        else if (willDelete && radios.get('sin completar')) {
            const new_todos: ListOfTodos = todos.reduce(
                (acc: ListOfTodos, todo: Todo) => {
                  if(todo.completed) 
                    acc.push(todo);
                  return acc;
                },
                []
              )
              setTodos(new_todos)
              localStorage.setItem('tasks', JSON.stringify(new_todos))        
          sweetAlert("La tarea ha sido eliminada con exito", {
            icon: "success",
          });
        }
        else {
          sweetAlert("Tu informacion esta segura");
        }
      });
  }
  function handleClearCompleted() {

    sweetAlert({
        title: "Estas seguro?",
        text: "Una vez elminado, no se ra capaz de recuperar la informacion!",
        icon: "warning",
        buttons: [true,true],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            const new_todos: ListOfTodos = todos.reduce(
                (acc: ListOfTodos, todo: Todo) => {
                  if (!todo.completed) acc.push(todo);
                  return acc;
                },
                []
              )
              setTodos(new_todos)
              localStorage.setItem('tasks', JSON.stringify(new_todos))        
          sweetAlert("Las tareas han sido eliminadas con exito!", {
            icon: "success",
          });
        }
        else {
          sweetAlert("Tu informacion esta segura");
        }
      });
    radios.keys
  }
  return (
    <footer className="filtro">
      <div className="radio-buttons">
        {[...radios.keys()].map((elm, index) => (
          <div className="radio-button" key={index + "" + elm}>
            <input
              type="radio"
              id={elm}
              value={elm}
              onChange={handleOnChange}
              checked={radios.get(elm)}
            />
            <label htmlFor={elm}>{elm}</label>
          </div>
        ))}
      </div>
      <button onClick={handleClear}>Limpiar</button>
      <button onClick={handleClearCompleted}>Limpiar completados</button>
    </footer>
  );
};
