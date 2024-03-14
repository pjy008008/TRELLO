import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "../atoms";
import Board from "../components/Board";
import { useForm } from "react-hook-form";
import { ObjectFlags } from "typescript";
import React from "react";

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
    if (destination?.droppableId === "boards") {
      setToDos((oldToDos) => {
        const keys = Object.keys(oldToDos);
        const sourceKey = keys[source.index];

        // Remove the source key from the keys array
        keys.splice(source.index, 1);

        // Insert the source key at the destination index
        keys.splice(destination.index, 0, sourceKey);

        // Create the updated object with the new key order and updated values
        const updatedObj: { [key: string]: any } = {};
        keys.forEach((key) => {
          // Get the value associated with the key
          const value = oldToDos[key];

          // Assign the value to the updated object
          updatedObj[key] = value;
        });

        return updatedObj;
      });
    } else if (destination.droppableId === source.droppableId) {
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
          <Droppable direction="horizontal" droppableId="boards">
            {(magic, snapshot) => (
              <Boards ref={magic.innerRef} {...magic.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <Draggable index={index} key={boardId} draggableId={boardId}>
                    {(magic, snapshot) => (
                      <div
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                      >
                        <Board
                          boardId={boardId}
                          key={boardId}
                          toDos={toDos[boardId]}
                          parentProvided={magic}
                        />
                      </div>
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
