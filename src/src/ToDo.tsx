import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Category,
  IToDo,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import { text } from "stream/consumers";
import React from "react";
import ToDoList from "./ToDoList";

interface IForm {
  toDo: string;
  category: Category;
}
const ToDo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const [todos, setToDos] = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const selectedTodo = useRecoilValue(toDoSelector);
  const onValid = (data: IForm) => {
    console.log(data);
    setToDos(
      (prev) =>
        [
          {
            id: Date.now(),
            category: category,
            text: data.toDo,
          },
          ...prev,
        ] as IToDo[]
    );
    setValue("toDo", "");
  };
  console.log(category);
  const onInput = (data: React.FormEvent<HTMLSelectElement>) => {
    setCategory(Number(data.currentTarget.value) as number);
  };

  return (
    <>
      <select value={category} onInput={onInput}>
        <option value={Category.TO_DO}>To Do</option>
        <option value={Category.DOING}>Doing</option>
        <option value={Category.DONE}>Done</option>
      </select>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("toDo", {
            required: { value: true, message: "Please Write a Todo" },
          })}
          placeholder="please write Todos"
        />
        <span>{errors.toDo?.message}</span>
        <button>Submit</button>
      </form>
      <ul>
        {selectedTodo.map((item) => (
          <ToDoList key={item.id} {...item} />
        ))}
      </ul>
    </>
  );
};
export default ToDo;
