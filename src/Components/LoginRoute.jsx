import React from 'react'
import { Link } from 'react-router-dom'
import userLogo from '../Assets/user.svg';

const LoginRoute = () => {
	return (
		<><Link to="/login">
		<img id="userlogoImg" src={userLogo} alt="logo"></img>
	</Link></>
	)
}

export default LoginRoute