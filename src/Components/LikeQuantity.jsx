import '../Css/LikeButton.css';

const LikeQuantity = ({ cantLikes }) => {
  return (
    <div className="divCantLike">
      <span className="cantidadlike">{cantLikes}</span>
    </div>
  );
};

export default LikeQuantity;
