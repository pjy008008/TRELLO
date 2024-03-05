import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { set, useForm } from "react-hook-form";
import { IToDo, IToDoState, toDoState } from "../atoms";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#d2dae2"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    background-color: #808e9b;
    height: 30px;
    border: none;
    text-align: center;
    &::placeholder {
      color: ${(props) => props.theme.textColor};
      text-align: center;
    }
  }
`;
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}
const Board = ({ toDos, boardId }: IBoardProps) => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [, setToDos] = useRecoilState<IToDoState>(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards: IToDoState) => {
      return {
        ...allBoards,
        [boardId]: [newTodo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  const onDelete = (boardName: string) => {
    setToDos((allBoards: IToDoState) => {
      if (allBoards.hasOwnProperty(boardName)) {
        const updatedBoards = { ...allBoards };
        delete updatedBoards[boardName];
        return updatedBoards;
      }
      return {
        ...allBoards,
      };
    });
  };
  return (
    <Wrapper>
      <Title>
        <span style={{ display: "inline-block", paddingLeft: "40px" }}>
          {boardId}
        </span>
        <span
          style={{ float: "right", paddingRight: "20px" }}
          className="material-symbols-outlined"
          onClick={() => onDelete(boardId)}
        >
          delete
        </span>
      </Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add Task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
