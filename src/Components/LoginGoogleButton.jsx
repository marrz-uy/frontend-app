import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import '../Css/LoginGoogleButton.css';

function LoginGoogleButton(setIsLoggedIn) {
  const navigate = useNavigate();
  const handleFailure = (result) => {
    alert(result);
  };

  const handleOAuth = (googleUser) => {
    console.log(googleUser);
    setIsLoggedIn('true');
    navigate('/');
  };

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="714352746420-h2p28su155a6u5vmgide4nhe8728kvvo.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="handleOAuth"
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        class="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
}

export default LoginGoogleButton;
