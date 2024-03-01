import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}
const DragabbleCard = ({ toDo, index }:IDragabbleCardProps) => {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};
export default React.memo(DragabbleCard)
//prop이 바뀌지 않았다면 re-rendering하지 않음
