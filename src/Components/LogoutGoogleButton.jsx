import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login'

const clientId = "714352746420-h2p28su155a6u5vmgide4nhe8728kvvo.apps.googleusercontent.com"

export const LogoutGoogleButton = () => {
  const navigate = useNavigate();

	const onSuccess = () => {
		sessionStorage.clear();
		navigate('/');
		console.log('Log out Successfully')
	}
	return (
		<div>
			<GoogleLogout
			clientId={clientId}
			buttonText={'Logout Google'}
			onLogoutSuccess={onSuccess}
			/>
		</div>
	)
}

export default LogoutGoogleButton;