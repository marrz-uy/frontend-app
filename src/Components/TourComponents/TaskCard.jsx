// import React, { memo } from 'react';
// import { Draggable } from 'react-beautiful-dnd';
// import '../../Css/Taskcard.css';
// // import TourCard from '../../Components/TourCard';
// function TaskCard({ item, index }) {
//   return (
//     <Draggable key={item.id} draggableId={item.id} index={index}>
//       {(provided, snapshot) => {
//         return (
//           <div
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             style={{
//               userSelect: 'none',
//               backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
//               ...provided.draggableProps.style,
//             }}
//           >
          
//             {item.content}
//           </div>
//         );
//       }}
//     </Draggable>
//   );
// }

// export default memo(TaskCard);
