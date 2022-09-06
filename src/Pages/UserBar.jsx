import React, { useContext } from "react";
import LenguageContext from "../Context/LenguageContext";
import "../Css/UserBar.css";
import { Link } from "react-router-dom";
import AuthUser from "../Components/AuthUser";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UserBar = ({ isLoggedIn, setIsLoggedIn, setUserSession, setUserBar }) => {
  const { textos, handleLenguage } = useContext(LenguageContext);
  const { logout, token } = AuthUser();
  const navigate = useNavigate();

  const logoutUser = () => {
    if (token) {
      logout();
      sessionStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn("false");
      setUserSession("Invitado");
      console.log("Cerrando sesion...");
      navigate("/");
    }
  };

  
  return (
      <nav className="userBar">
        <div className="animate__animated animate__slideInRight animate__faster">
          <FontAwesomeIcon icon={faXmark} className="userBar__cancel" onClick={() => setUserBar(false)} />
          <ul className="userBar__link">
             {isLoggedIn === "false" || isLoggedIn === null ? (
              
              <>
                <li className="userBar__register" onClick={() => setUserBar(false)}>
                  <Link to="/register">{textos.registerLabel}</Link>
                </li>
                <li className="userBar__login" onClick={() => setUserBar(false)}>
                  <Link to="/login">{textos.loginLabel}</Link>
                </li>
              </>
            ) : (
              ""
            )} 

            <li onClick={handleLenguage} className="userBar__lenguage" id="id__lenguage">
              <p>{textos.changeLanguageLabel}</p>
              <img src={textos.flag} alt="img" />
            </li>
            {isLoggedIn === 'true' ? (
              <>
                <li className="userBar__perfil" onClick={() => setUserBar(false)}>
                  <Link to="/user">Perfil de usuario</Link>
                </li>
                <li className="userBar__lenguage" onClick={logoutUser}>
                  <p>Logout</p>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
  );
};
export default UserBar;
