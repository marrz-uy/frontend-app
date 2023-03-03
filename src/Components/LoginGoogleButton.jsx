// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleLogin } from '@react-oauth/google';
// // import '../Css/LoginGoogleButton.css';

// function LoginGoogleButton(setIsLoggedIn) {
//   const navigate = useNavigate();
//   const handleFailure = (result) => {
//     alert(result);
//   };

//   const handleOAuth = useGoogleLogin({
//     onSuccess: (tokenResponse) => console.log(tokenResponse),
//   });

//   return (
//     <div className="loginGoogle">
//       <GoogleLogin
//         onSuccess={handleOAuth}
//         onError={() => {
//           console.log('Login Failed');
//         }}
//         // useOneTap
//       />

//       {/*                BOTON ANTIGUO
//        <GoogleLogin
//         clientId="714352746420-h2p28su155a6u5vmgide4nhe8728kvvo.apps.googleusercontent.com"
//         className="google-btn"
//         buttonText="Log in with Google"
//         onSuccess={handleOAuth}
//         onFailure={handleFailure}
//         cookiePolicy={'single_host_origin'}
//         isSignedIn={true}
//       ></GoogleLogin> */}
//     </div>
//   );
// }

// export default LoginGoogleButton;

// return (
//   <GoogleLogin
//     onSuccess={(credentialResponse) => {
//       console.log('GOOGLE CREDENCIALES: ', credentialResponse);
//     }}
//     onError={() => {
//       console.log('Login Failed');
//     }}
//     useOneTap
// />
// <>
//   <div
//     id="g_id_onload"
//     data-client_id="714352746420-h2p28su155a6u5vmgide4nhe8728kvvo.apps.googleusercontent.com"
//     data-context="signin"
//     data-ux_mode="popup"
//     data-login_uri="handleOAuth"
//     data-auto_select="true"
//     data-itp_support="true"
//   ></div>

//   <div
//     class="g_id_signin"
//     data-type="standard"
//     data-shape="pill"
//     data-theme="outline"
//     data-text="signin_with"
//     data-size="large"
//     data-logo_alignment="left"
//   ></div>
// </>
//   );
// }

// export default LoginGoogleButton;
