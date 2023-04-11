import { Layout } from '../Layout';
import UserBar from '../Pages/UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick.js';
import qr from '../Assets/qr-code.png';
import '../Css/QrCodePage.css';
import '../Css/userBarClick.css';

export const QrCodePage = ({
  setIsLoggedIn,
  isLoggedIn,
  userBar,
  setUserBar,
}) => {
  handleUserBar(userBar);
  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="qrCodePage">
        <h1>Escaneame!</h1>
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
