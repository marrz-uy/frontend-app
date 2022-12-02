import React, { useState, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../Components/TourComponents/Column';
import TourContext from '../../Context/TourContext';
import Swal from 'sweetalert2';
import '../../Css/TourStep2.css';

const initialData = [
  {
    id: '01',
    tipo: 'Restaurant',
    nombre: 'Garo Bar',
    ciudad: 'Montevideo',
    direccion: 'Eduardo Acevedo Diaz 1055',
    barrio: 'Cordon',
    caracteristicas: '',
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/e3/0f/2d/lindo-y-agradable-salon.jpg',
  },
  {
    id: '02',
    tipo: 'Restaurant',
    nombre: 'La Baguala',
    ciudad: 'Montevideo',
    direccion: 'Camino Sanguinetti 5552',
    barrio: 'Pajas Blancas',
    caracteristicas: '',
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/14/e9/94/ef/restaurante-de-la-baguala.jpg',
  },
  {
    id: '03',
    tipo: 'Paseo',
    nombre: 'Parque Rodo',
    ciudad: 'Montevideo',
    direccion: 'Rambla',
    barrio: 'Parque Rodo',
    caracteristicas: 'Juegos para niños',
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/19/69/c8/el-lago.jpg?w=1000&h=-1&s=1',
  },
  {
    id: '04',
    tipo: 'Paseo',
    nombre: 'Playa Ramirez',
    ciudad: 'Montevideo',
    direccion: 'Rambla',
    barrio: 'vacio',
    caracteristicas: 'Playa familiar',
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/88/15/d0/faixa-de-areia.jpg?w=1200&h=-1&s=1',
  },
  {
    id: '05',
    tipo: 'Paseo',
    nombre: 'Circo',
    ciudad: 'Montevideo',
    direccion: 'Av Italia',
    barrio: 'Malvin',
    caracteristicas: 'Muchos animalitos lindos',
    img: 'https://esquinas.montevideo.gub.uy/sites/esquinas.montevideo.gub.uy/files/styles/galeria_normal/public/eventos/imagenes/alebrije-72.jpg?itok=b9btsSxV',
  },
  {
    id: '06',
    tipo: 'Transporte',
    nombre: 'Terminal Tres Cruces',
    ciudad: 'Montevideo',
    direccion: 'Bulevar Gral. Artigas 1825',
    barrio: 'Tres Cruces',
    caracteristicas: 'Principal terminal de buses de Uruguay',
    img: 'https://photo620x400.mnstatic.com/ee98ce5a2449e170d24eeb73c145d713/terminal-tres-cruces.jpg',
  },
  {
    id: '07',
    tipo: 'Transporte',
    nombre: 'Estación Baltasar Brum',
    ciudad: 'Montevideo',
    direccion: 'Rio Branco 1685',
    barrio: 'Ciudad Vieja',
    caracteristicas: 'Terminal de ómnibus interdepartamentales',
    img: 'https://media.cdnp.elobservador.com.uy/062021/1624375048003/Terminal-R%C3%ADo-Branco---DB_03.JPG?cw=1500&ch=1000',
  },
  {
    id: '08',
    tipo: 'Transporte',
    nombre: 'Terminal del Cerro',
    ciudad: 'Montevideo',
    direccion: 'Av. Carlos María Ramírez y Dr. Pedro Castellino',
    barrio: 'Cerro',
    caracteristicas: 'Terminal de onmibus departamantales',
    img: 'https://fastly.4sqi.net/img/general/width960/38989709_axDkJ4K1EMTLejeQVZJFyIrK4Pp1fY7V-QTMf_tqK3w.jpg',
  },
];
const status = {
  '01': {
    name: 'TimeLine',
    color: '#FFFAE6',
    items: [],
  },
  '02': {
    name: 'Items',
    color: '#EAE6FF',
    items: initialData,
  },
};

const TourStep2 = () => {
  const { tourPreferences } = useContext(TourContext);

  console.log('TOUR PRFERENCES Step2: ', tourPreferences);

  const [columns, setColumns] = useState(status);
  console.log('COLUMNAS: ', columns);
  console.log('ITEMS: ');

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  let textoModal = `Los puntos que se ofrecen para armar su tour estan basados en las preferencias brindadas por ud en el paso 1.<br/> 

  <br/>Eligió comenzar el tour en el: ${tourPreferences.franjaHoraria},

  <br/>Hora de Comienzo: ${tourPreferences.horaInicio},

  <br/>Espacios: ${tourPreferences.lugar},

  <br/>Para edades: ${tourPreferences.edad.toLowerCase()},

  <br/>Para: ${tourPreferences.personas.toLowerCase()},

  <br/>Ubicados en: ${tourPreferences.ubicacion}`;

  const handleInfoTour = () => {
    Swal.fire({
      titleText: 'Informacion de su tour',
      html: textoModal,
      showConfirmButton: true,
      confirmButtonColor: '#015abb',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  };

  console.log(columns);
  return (
    <div className="tourStep2">
      <div className="descripcionTourStep2">
        <p className="descripcionTourStep2Text">
          Arrastre sus puntos de interes hacia la linea de tiempo para comenzar
          a armar su tour.
          <button className="btnInfoTour" onClick={handleInfoTour}>
            Info Tour
          </button>
        </p>
      </div>
      <div className="titulosColumnas">
        <div>Tour</div>
        <div>Puntos de Interes</div>
      </div>
      <div className="dragNDropContainer">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className="seccion" id={column.name} key={columnId}>
                <Column
                  className="columna"
                  droppableId={columnId}
                  key={columnId}
                  index={index}
                  column={column}
                />
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TourStep2;
