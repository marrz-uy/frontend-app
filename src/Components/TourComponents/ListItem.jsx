import React from "react";
import { Draggable } from "react-beautiful-dnd";
import '../../Css/ListItem.css'

const ListItem = ({ item, index }) => {

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div className='DragItem'
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className= 'CardHeader'>Header</div>
            <span>Content</span>
            
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
