import React, { useState } from 'react';
import AuthUser from '../../Components/AuthUser';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '../../Css/TourStep2.css';
import TourCard from '../../Components/TourCard';

const TourStep2 = () => {
  const [datos, setDatos] = useState([
    {
      id: '05',
      tipo: 'restaurantes',
      nombre: 'Garo Bar',
      ciudad: 'Montevideo',
      direccion: 'Eduardo Acevedo Diaz 1055',
      barrio: 'Cordon',
      caracteristicas: '',
      img: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/e3/0f/2d/lindo-y-agradable-salon.jpg',
    },
    {
      id: '06',
      tipo: 'restaurantes',
      nombre: 'La Baguala',
      ciudad: 'Montevideo',
      direccion: 'Camino Sanguinetti 5552',
      barrio: 'Pajas Blancas',
      caracteristicas: '',
      img: 'https://media-cdn.tripadvisor.com/media/photo-s/14/e9/94/ef/restaurante-de-la-baguala.jpg',
    },
    {
      id: '07',
      tipo: 'paseos',
      nombre: 'Parque Rodo',
      ciudad: 'Montevideo',
      direccion: 'Rambla',
      barrio: 'Parque Rodo',
      caracteristicas: 'Juegos para niños',
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/19/69/c8/el-lago.jpg?w=1000&h=-1&s=1',
    },
    {
      id: '08',
      tipo: 'paseos',
      nombre: 'Playa Ramirez',
      ciudad: 'Montevideo',
      direccion: 'Rambla',
      barrio: 'vacio',
      caracteristicas: 'Playa familiar',
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/88/15/d0/faixa-de-areia.jpg?w=1200&h=-1&s=1',
    },
    {
      id: '09',
      tipo: 'paseos',
      nombre: 'Circo',
      ciudad: 'Montevideo',
      direccion: 'Av Italia',
      barrio: 'Malvin',
      caracteristicas: 'Muchos animalitos lindos',
      img: 'https://esquinas.montevideo.gub.uy/sites/esquinas.montevideo.gub.uy/files/styles/galeria_normal/public/eventos/imagenes/alebrije-72.jpg?itok=b9btsSxV',
    },
    {
      id: '10',
      tipo: 'transportes',
      nombre: 'Terminal Tres Cruces',
      ciudad: 'Montevideo',
      direccion: 'Bulevar Gral. Artigas 1825',
      barrio: 'Tres Cruces',
      caracteristicas: 'Principal terminal de buses de Uruguay',
      img: 'https://photo620x400.mnstatic.com/ee98ce5a2449e170d24eeb73c145d713/terminal-tres-cruces.jpg',
    },
    {
      id: '11',
      tipo: 'transportes',
      nombre: 'Estación Baltasar Brum',
      ciudad: 'Montevideo',
      direccion: 'Rio Branco 1685',
      barrio: 'Ciudad Vieja',
      caracteristicas: 'Terminal de ómnibus interdepartamentales',
      img: 'https://media.cdnp.elobservador.com.uy/062021/1624375048003/Terminal-R%C3%ADo-Branco---DB_03.JPG?cw=1500&ch=1000',
    },
    {
      id: '12',
      tipo: 'transportes',
      nombre: 'Terminal del Cerro',
      ciudad: 'Montevideo',
      direccion: 'Av. Carlos María Ramírez y Dr. Pedro Castellino',
      barrio: 'Cerro',
      caracteristicas: 'Terminal de onmibus departamantales',
      img: 'https://fastly.4sqi.net/img/general/width960/38989709_axDkJ4K1EMTLejeQVZJFyIrK4Pp1fY7V-QTMf_tqK3w.jpg',
    },
  ]);

  const hanleDragEnd = (results) => {
    if (!results.destination) return;

    const items = Array.from(datos);

    const [reorderDatos] = items.splice(results.source.index, 1);

    items.splice(results.destination.index, 0, reorderDatos);

    setDatos(items);
  };
  

  return (
    <div className="tourStep2">
      <div className="descripcionTourStep2">
        <p className="descripcionTourStep2Text">
          Arrastre sus puntos de interes hacia la linea de tiempo para comenzar
          a armar su tour
        </p>
      </div>
      <DragDropContext onDragEnd={hanleDragEnd}>
        <div className="dragNDropContainer">
          <Droppable droppableId="bucket">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="timelineContainer"
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? '#2986f0'
                    : 'transparent',
                }}
              >
                {/* <div className="verticalLine"></div> */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="list">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="resultsContainer"
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? '#2986f0'
                    : 'transparent',
                }}
              >
                {datos &&
                  datos.map((dato, index) => {
                    return (
                      <Draggable
                        key={dato.id}
                        draggableId={dato.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="cardContainer"
                          >
                            <TourCard
                              key={dato.id}
                              nombre={dato.nombre}
                              direccion={dato.direccion}
                              caracteristicas={dato.Contacto}
                              imagen={dato.img}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TourStep2;
