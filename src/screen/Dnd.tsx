import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "../components/Board";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;
const Form = styled.form`
  input {
    position: absolute;
    right: 3vw;
    top: 3vh;
  }
`;

const Dnd = () => {
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { draggableId, destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      setToDos((oldToDos) => {
        const sourceBoard = [...oldToDos[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        const desBoard = [...oldToDos[destination.droppableId]];
        desBoard.splice(destination?.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: desBoard,
        };
      });
    }
  };

  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IBoardInput>();
  interface IBoardInput {
    board: string;
  }
  const onValid = ({ board }: IBoardInput) => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [board]: [],
      };
    });
    setValue("board", "");
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("board", { required: true })}
              placeholder="Type new board name"
            />
          </Form>
          <Droppable droppableId="boards">
            {(magic, snapshot) => (
              <Boards ref={magic.innerRef} {...magic.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <Draggable index={index} key={boardId} draggableId={boardId}>
                    {(magic, snapshot) => (
                      <Board
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                        boardId={boardId}
                        key={boardId}
                        toDos={toDos[boardId]}
                      />
                    )}
                  </Draggable>
                ))}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
};
export default Dnd;
