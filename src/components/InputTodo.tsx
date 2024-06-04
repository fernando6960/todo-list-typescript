import { ListOfTodos } from "../types";

interface Props {
  todos: ListOfTodos;
  setTodos: (elm: ListOfTodos) => void;
}

export const InputTodo: React.FC<Props> = ({ todos, setTodos }) => {
  function handleButton(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.code === "Enter") {
      const input = evt.target as HTMLInputElement;
      const id = todos.length + 1;
      const new_todo = { id: id, title: input.value, completed: false };
      setTodos([...todos, new_todo]);
      input.value = "";
      localStorage.setItem("tasks", JSON.stringify([...todos, new_todo]));
    }
  }
  return (
    <input
      type="text"
      placeholder="Introduzca una tarea."
      onKeyUp={handleButton}
      autoFocus
      style={{
        padding: "10px 5px",
        fontSize: "24px",
        width: "80%",
        margin: "25px auto",
        display: "block",
      }}
    />
  );
};
