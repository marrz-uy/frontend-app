import '../Css/LikeButton.css';

const LikeQuantity = ({ cantLikes }) => {
  return (
    <div className="divCantLike">
      <span className="cantidadlike">
        {cantLikes === 0 || cantLikes === null ? 0 : cantLikes}
      </span>
    </div>
  );
};

export default LikeQuantity;
