import React, { useState } from 'react';
import AuthUser from '../../Components/AuthUser';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '../../Css/TourStep2.css';
import TourCard from '../../Components/TourCard';
import DragList from '../../Components/TourComponents/DragList';
const TourStep2 = () => {
  
  
  return (
    <div className="tourStep2">
      <div className="descripcionTourStep2">
        <p className="descripcionTourStep2Text">
          Arrastre sus puntos de interes hacia la linea de tiempo para comenzar
          a armar su tour
        </p>
      </div>
      <DragList/>
    </div>
  );
};

export default TourStep2;
