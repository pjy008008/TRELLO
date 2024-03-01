import { atom, selector } from "recoil";
import { StringLiteral } from "typescript";
import ToDo from "./src/ToDo";

export enum Category {
  "TO_DO",
  "DOING",
  "DONE",
}

export interface IToDo {
  id: string;
  text: string;
  category: Category;
}

export const categoryState = atom<Category>({
  key: "category",
  default: Category.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "todo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
