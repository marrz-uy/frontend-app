import React, { memo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../../Css/Column.css';

const Column = ({ droppableId, column }) => {
  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <>
            <div className="timeLineVertical"></div>
            <div
              className="droppable"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? '#026ce4' : 'transparent',
              }}
            >
              {column?.items?.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className="draggable"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            backgroundColor: snapshot.isDragging
                              ? '#026ce4'
                              : 'transparent',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className="tourCard">
                            <div className="divImgTour">
                              <img
                                className="imagenCardTour"
                                src={item.img}
                                alt=""
                              ></img>
                            </div>
                            <div className="dataTour">
                              {item.nombreEvento ? (
                                <h6>
                                  {item.nombreEvento} en {item.lugarDeEvento}
                                </h6>
                              ) : (
                                <h6>{item.nombre}</h6>
                              )}
                              <p>{item.tipo}</p>
                            </div>
                          </div>

                          {item.content}
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          </>
        );
      }}
    </Droppable>
  );
};

export default memo(Column);
