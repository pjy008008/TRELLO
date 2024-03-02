import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  transition: background-color 0.3 ease-in-out;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : ""};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
const DragabbleCard = ({ toDoId, toDoText, index }: IDragabbleCardProps) => {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};
export default React.memo(DragabbleCard);
//prop이 바뀌지 않았다면 re-rendering하지 않음
