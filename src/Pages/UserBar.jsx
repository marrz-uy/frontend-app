import React, { useContext } from "react";
import LenguageContext from "../Context/LenguageContext";
import { Layout } from "../Layout";
import "../Css/UserBar.css";
import { Link } from "react-router-dom";
import AuthUser from "../Components/AuthUser";
import { useNavigate } from "react-router-dom";

const UserBar = ({ isLoggedIn, setIsLoggedIn, setUserSession }) => {
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
    <Layout>
      <nav className="userBar">
        <div className="animate__animated animate__slideInRight animate__faster">
          <ul className="userBar__link">
            {isLoggedIn === "false" || isLoggedIn === null ? (
              <>
                <li className="userBar__register">
                  <Link to="/register">{textos.registerLabel}</Link>
                </li>
                <li className="userBar__login">
                  <Link to="/login">{textos.loginLabel}</Link>
                </li>
              </>
            ) : (
              ""
            )}

            <li onClick={handleLenguage} className="userBar__lenguage">
              <p>{textos.changeLanguageLabel}</p>
              <img src={textos.flag} alt="img" />
            </li>
            {isLoggedIn === "true" ? (
              <>
                <li className="userBar__perfil">
                  <Link to="/user">Perfil de usuario</Link>
                </li>
                <li className="userBar__logout" onClick={logoutUser}>
                  Logout
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
    </Layout>
  );
};
export default UserBar;
