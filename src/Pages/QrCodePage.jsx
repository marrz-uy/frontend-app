import { useEffect, useContext } from 'react';
import { Layout } from '../Layout';
import UserBar from '../Pages/UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick.js';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import qr from '../Assets/qr-code.png';
import '../Css/QrCodePage.css';
import '../Css/userBarClick.css';

export const QrCodePage = ({
  setIsLoggedIn,
  isLoggedIn,
  userBar,
  setUserBar,
  setPage,
}) => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  useEffect(() => {
    setPage('qrcode');
  }, [setPage]);

  handleUserBar(userBar);
  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="qrCodePage">
        <h4>{filtrarTraduccion(traduccionesBD, 'qrShare', lenguage)}</h4>
        <h1>{filtrarTraduccion(traduccionesBD, 'scan', lenguage)}</h1>
        <img src={qr}></img>
      </div>

      {userBar && (
        <UserBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserBar={setUserBar}
        />
      )}
    </Layout>
  );
};
