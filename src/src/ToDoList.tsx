import { useRecoilState } from "recoil";
import { Category, IToDo, toDoState } from "../atoms";

const ToDoList = ({ id, text, category }: IToDo) => {
  const [todos, setTodos] = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    setTodos((prev) => {
      const tartgetIndex = prev.findIndex((toDo) => toDo.id === id);
      const newTodo = { text, id, category: Number(name) };
      return [
        ...prev.slice(0, tartgetIndex),
        newTodo,
        ...prev.slice(tartgetIndex + 1),
      ];
    });
  };
  return (
    <>
      <li key={id}>
        <span>{text}</span>
        {category !== 0 && (
          <button onClick={onClick} name={Category.TO_DO + ""}>
            To Do
          </button>
        )}
        {category !== 2 && (
          <button onClick={onClick} name={Category.DONE + ""}>
            Done
          </button>
        )}
        {category !== 1 && (
          <button onClick={onClick} name={Category.DOING + ""}>
            Doing
          </button>
        )}
      </li>
    </>
  );
};
export default ToDoList;
