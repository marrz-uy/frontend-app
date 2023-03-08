import { Link } from 'react-router-dom';
import userLogo from '../Assets/user.svg';

const UserRoute = () => {
  return (
    <>
      <Link to="/user">
        <img id="userlogoImg" src={userLogo} alt="logo"></img>
      </Link>
    </>
  );
};

export default UserRoute;
