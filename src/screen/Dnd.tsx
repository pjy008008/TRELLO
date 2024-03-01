import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Dnd = () => {
  const onDragEnd = () => {};
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="one">
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    one
                    <span {...magic.dragHandleProps}>🎶</span>
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    two
                    <span {...magic.dragHandleProps}>🎶</span>
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default Dnd;
