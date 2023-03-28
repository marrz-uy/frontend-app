import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../../Css/Column.css';
import drag from '../../Assets/drag.png';

const Column = ({ droppableId, column }) => {
  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <>
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
                  <Draggable
                    key={item.puntosinteres_id}
                    draggableId={item.puntosinteres_id.toString()}
                    index={index}
                  >
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
                              <span>
                                <img
                                  src={drag}
                                  style={{
                                    width: '15px',
                                    height: '40px',
                                    padding: '0 3px 0 0 ',
                                  }}
                                  alt="drag-Simbol"
                                ></img>
                              </span>
                              <img
                                className="imagenCardTour"
                                src={
                                  item?.puntos_interes
                                    ? item?.puntos_interes?.imagenes[0]?.url
                                    : item?.imagenes[0]?.url
                                }
                                alt=""
                              ></img>
                            </div>
                            <div className="dataTour">
                              {item.nombreEvento ? (
                                <h6>
                                  {item?.puntos_interes
                                    ? item?.puntos_interes?.nombreEvento
                                    : item.nombreEvento}{' '}
                                  en{' '}
                                  {item?.puntos_interes
                                    ? item?.puntos_interes?.lugarDeEvento
                                    : item.lugarDeEvento}
                                </h6>
                              ) : (
                                <h6>
                                  {item?.puntos_interes
                                    ? item?.puntos_interes?.Nombre
                                    : item.Nombre}
                                </h6>
                              )}
                              <p>
                                {item?.puntos_interes
                                  ? item?.puntos_interes?.Tipo
                                  : item.Tipo}{' '}
                              </p>
                              {/* <p>
                                - Abre {''}
                                {item.HoraDeApertura}
                              </p> */}
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              {/* no tocar esta linea es de la libreria dnd */}
            </div>
          </>
        );
      }}
    </Droppable>
  );
};

export default Column;
