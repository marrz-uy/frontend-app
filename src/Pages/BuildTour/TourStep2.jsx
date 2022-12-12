import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../Components/TourComponents/Column';
import TourContext from '../../Context/TourContext';
import AuthUser from '../../Components/AuthUser';
import Swal from 'sweetalert2';
import '../../Css/TourStep2.css';

const initialData = [
  {
    id: '01',
    Ciudad: 'Montevideo',
    Departamento: 'Indiana',
    HoraDeApertura: '08:00:00',
    HoraDeCierre: '22:00:00',
    Imagen: 'https://via.placeholder.com/640x480.png/00bb88?text=ratione',
    Nombre: 'Casino West Lulu',
  },
  {
    id: '02',
    Ciudad: 'Montevideo',
    Departamento: 'Indiana',
    HoraDeApertura: '08:00:00',
    HoraDeCierre: '22:00:00',
    Imagen: 'https://via.placeholder.com/640x480.png/00bb88?text=ratione',
    Nombre: 'Casino West Lulu',
  },
  {
    id: '03',
    Ciudad: 'Montevideo',
    Departamento: 'Indiana',
    HoraDeApertura: '08:00:00',
    HoraDeCierre: '22:00:00',
    Imagen: 'https://via.placeholder.com/640x480.png/00bb88?text=ratione',
    Nombre: 'Casino West Lulu',
  },
  {
    id: '04',
    Ciudad: 'Montevideo',
    Departamento: 'Indiana',
    HoraDeApertura: '08:00:00',
    HoraDeCierre: '22:00:00',
    Imagen: 'https://via.placeholder.com/640x480.png/00bb88?text=ratione',
    Nombre: 'Casino West Lulu',
  },
  {
    id: '05',
    Ciudad: 'Montevideo',
    Departamento: 'Indiana',
    HoraDeApertura: '08:00:00',
    HoraDeCierre: '22:00:00',
    Imagen: 'https://via.placeholder.com/640x480.png/00bb88?text=ratione',
    Nombre: 'Casino West Lulu',
  },
  {
    id: '06',
    Ciudad: 'Montevideo',
    Departamento: 'Indiana',
    HoraDeApertura: '08:00:00',
    HoraDeCierre: '22:00:00',
    Imagen: 'https://via.placeholder.com/640x480.png/00bb88?text=ratione',
    Nombre: 'Casino West Lulu',
  },
  {
    id: '07',
    Ciudad: 'Montevideo',
    Departamento: 'Indiana',
    HoraDeApertura: '08:00:00',
    HoraDeCierre: '22:00:00',
    Imagen: 'https://via.placeholder.com/640x480.png/00bb88?text=ratione',
    Nombre: 'Casino West Lulu',
  },
  {
    id: '08',
    Ciudad: 'Montevideo',
    Departamento: 'Indiana',
    HoraDeApertura: '08:00:00',
    HoraDeCierre: '22:00:00',
    Imagen: 'https://via.placeholder.com/640x480.png/00bb88?text=ratione',
    Nombre: 'Casino West Lulu',
  },
];

const data = JSON.parse(sessionStorage.getItem('tourPreferences'))
console.log('tourPreferences:', data);

const TourStep2 = () => {
  const { http } = AuthUser();
  const {
    tourPreferences,
    // getTourPreferences,
    itemsParaTourDB,
    setItemsParaTourDB,
  } = useContext(TourContext);

/*   useEffect(() => {
    http
      .post('/PuntosInteresParaTour', {
        horaInicio: tourPreferences?.horaInicio,
        tipoDeLugar: tourPreferences?.tipoDeLugar,
        restriccionDeEdad: tourPreferences?.restriccionDeEdad,
        enfoqueDePersonas: tourPreferences?.enfoqueDePersonas,
        ubicacion: tourPreferences?.ubicacion,
      })
      .then((response) => {
        const allDdata = response?.data;
        setItemsParaTourDB(allDdata);
        console.log('%callDdata -1- tourStep:2 ', 'color: violet;', allDdata);
        console.log(
          '%cITEMS-PARA-TOUR -1- tourStep2: ',
          'color: yellow;',
          itemsParaTourDB
        );
        console.log('RESPONSE HTTP: ', response?.data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  }, []);
 */
  const status = {
    '01': {
      name: 'TimeLine',
      color: '#FFFAE6',
      items: [],
    },
    '02': {
      name: 'Items',
      color: '#EAE6FF',
      items: itemsParaTourDB,
    },
  };

  const [columns, setColumns] = useState(status);
  console.log('%cCOLUMNA ITEMS - tourStep2: ', 'color:blue;', columns['02'].items);
  
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



 

  let textoModal = `Los puntos que se ofrecen para armar su tour 
  estan basados en las preferencias brindadas por ud en el paso 1.<br/>
  <br/>Hora de Comienzo: ${tourPreferences?.horaInicio},
  <br/>Espacios: ${tourPreferences.tipoDeLugar},
  <br/>Para edades: ${tourPreferences.restriccionDeEdad.toLowerCase()},
  <br/>Para: ${tourPreferences.enfoqueDePersonas.toLowerCase()},
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

  console.log('COLUMNS:', columns)
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
                  droppableId={columnId}
                  column={column}
                  key={columnId}
                  index={index}
                  className="columna"
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
