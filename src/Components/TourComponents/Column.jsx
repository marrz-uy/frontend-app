import { useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import '../../Css/Column.css';
import drag from '../../Assets/drag.png';

const Column = ({ droppableId, column }) => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
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
                    draggableId={item.id.toString()}
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
                            <span>
                              <img src={drag} alt="drag-Simbol"></img>
                            </span>
                            <div className="divImgTour">
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
                                -{' '}
                                {filtrarTraduccion(
                                  traduccionesBD,
                                  'openToursHours',
                                  lenguage
                                )}
                                {item.HoraDeApertura}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {/* no tocar esta linea es de la libreria dnd */}

              {provided.placeholder}
            </div>
          </>
        );
      }}
    </Droppable>
  );
};

export default Column;
