import { useState } from 'react';
import '../Css/LikeButton.css';

const LikeQuantity = () => {
  const [cantLikes, setCantLikes] = useState('1000');
  return (
    <div className="divCantLike">
      <span className="cantidadlike">{cantLikes}</span>
    </div>
  );
};

export default LikeQuantity;
