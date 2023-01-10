import React, { useState, useContext, useEffect } from 'react';
import TourContext from '../../Context/TourContext';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../Components/TourComponents/Column';
import Swal from 'sweetalert2';
import '../../Css/TourStep3.css';

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

const TourStep3 = () => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const {
    tourPreferences,
    itemsParaTourDB,
    setSavedTourItems,
    savedTourItems,
  } = useContext(TourContext);

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
      html: textoModal /* var afuera */,
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

  console.log('COLUMNS:', columns);
  let chosenItems = '';
  console.log('CHOSEN ITEMS FUERA: ', chosenItems);
  console.log('savedTourItems- final', savedTourItems);
  useEffect(() => {
    //eslint-disable-next-line
    chosenItems = columns['01'].items;
    setSavedTourItems(chosenItems);
    console.log('CHOSEN ITEMS DENTRO: ', chosenItems);
  }, [columns, setSavedTourItems]);

  return (
    <div className="tourStep3">
      <div className="descripcionTourStep3">
        <p className="descripcionTourStep3Text">
          {filtrarTraduccion(traduccionesBD, 'dragPointsInterest', lenguage)}
          <button className="btnInfoTour" onClick={handleInfoTour}>
            {filtrarTraduccion(traduccionesBD, 'tourInfo', lenguage)}
          </button>
        </p>
      </div>
      <div className="titulosColumnas">
        <div>Tour</div>
        <div>
          {filtrarTraduccion(traduccionesBD, 'pointsInterest', lenguage)}
        </div>
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

export default TourStep3;
