// import React, { memo } from 'react';
// import { Draggable } from 'react-beautiful-dnd';
// import '../../Css/TourCard.css';

// const TourCard = ({ item, index }) => {
//   <Draggable key={item.id} draggableId={item.id} index={index}>
//     {(provided, snapshot) => {
//       return (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           style={{
//             userSelect: 'none',
//             backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
//             ...provided.draggableProps.style,
//           }}
//         >
//           <div className="tourCard">
//             <div className="divImgTour">
//               <img className="imagen" src={item.img} alt=""></img>
//             </div>
//             <div className="dataTour">
//               {item.nombreEvento ? (
//                 <h5>
//                   {item.nombreEvento} en {item.lugarDeEvento}
//                 </h5>
//               ) : (
//                 <h5>{item.nombre}</h5>
//               )}
//               <h6>{item.direccion}</h6>
//             </div>
//           </div>
//           {item.content}
//         </div>
//       );
//     }}
//   </Draggable>;
// };

// export default memo(TourCard);
