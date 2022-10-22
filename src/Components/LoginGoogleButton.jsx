import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

function LoginGoogleButton( setIsLoggedIn) {
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
    <div className="App">
      <GoogleLogin
        clientId="714352746420-h2p28su155a6u5vmgide4nhe8728kvvo.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={handleOAuth}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
}

export default LoginGoogleButton;
