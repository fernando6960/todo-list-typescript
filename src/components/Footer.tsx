import { useState } from "react";
import "./Footer.css";
import { type ListOfTodos, type Todo } from "../types";
import swal from 'sweetalert'
interface Props {
  check: (elm: string) => void;
  todos: ListOfTodos;
  setTodos: (elm: ListOfTodos) => void;
}

export const Footer: React.FC<Props> = ({ check, todos, setTodos }) => {
  const [radios, setRadios] = useState([true, false, false]);
  const states = ["todos", "completados", "sin completar"] as const;
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newRadios = states.map((state) => state === e.target.value);
    setRadios(newRadios);
    check(e.target.value);
  }
  function handleClear() {
    if(todos.length === 0)
        swal("No hay elementos")
    swal({
        title: "Estas seguro?",
        text: "Una vez elminado, no se ra capaz de recuperar la informacion!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then((willDelete) => {
        if(willDelete && radios[0]){
            setTodos([])
            localStorage.setItem('tasks', JSON.stringify([]))        
            swal("Las tareas han sido eliminadas con exito", {
                icon: "success",
            });
        }
        else if (willDelete) {
            const new_todos: ListOfTodos = todos.reduce(
                (acc: ListOfTodos, todo: Todo) => {
                  if() acc.push(todo);
                  return acc;
                },
                []
              )
              setTodos(new_todos)
              localStorage.setItem('tasks', JSON.stringify(new_todos))        
          swal("La tarea ha sido eliminada con exito", {
            icon: "success",
          });
        }
        else {
          swal("Tu informacion esta segura");
        }
      });
  }
  function handleClearCompleted() {

    swal({
        title: "Estas seguro?",
        text: "Una vez elminado, no se ra capaz de recuperar la informacion!",
        icon: "warning",
        buttons: true,
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
          swal("La tarea ha sido eliminada con exito", {
            icon: "success",
          });
        }
        else {
          swal("Tu informacion esta segura");
        }
      });
    
  }
  return (
    <footer className="filtro">
      <div className="radio-buttons">
        {states.map((elm, index) => (
          <div className="radio-button" key={index + "" + elm}>
            <input
              type="radio"
              id={elm}
              value={elm}
              onChange={handleOnChange}
              checked={radios[index]}
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
