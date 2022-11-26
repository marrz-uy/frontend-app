import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "../../Components/TourComponents/ListItem";

/* const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`; */

const DraggableElement = ({ prefix, elements }) => (
  <div className='DroppableStyles'>
    <div className='ColumnHeader'>{prefix}</div>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default DraggableElement;
