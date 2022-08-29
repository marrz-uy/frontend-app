import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    try {
      const userString = sessionStorage.getItem('user');
      const user_detail = JSON.parse(userString);
      // const user_detail = userString;
      return user_detail;
    } catch (error) {
      console.log('USER SIN DATOS', error);
    }
  };

  const getUserProfile = () => {
    try {
      const userProfileString = sessionStorage.getItem('userProfile');
      // const userProfile_detail = JSON.parse(userProfileString);
      const userProfile_detail = userProfileString;
      return userProfile_detail;
    } catch (error) {
      console.log('USER PROFILE SIN DATOS', error);
    }
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [userProfile, setUserProfile] = useState(getUserProfile());

  const saveToken = (user, token, userProfile) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('isLoggedIn', 'true');
    if (userProfile === null || userProfile === 'undefined') {
      sessionStorage.setItem('userProfile', JSON.stringify({}));
    } else {
      sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
      sessionStorage.setItem('preferencias', userProfile.preferencias);
    }

    setToken(token);
    setUser(user);
    setUserProfile(userProfile);
    navigate('/principal');
  };

  const saveUserProfile = (userProfile) => {
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    sessionStorage.setItem('preferencias', userProfile.preferencias);
    setUserProfile(userProfile);
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('*');
  };

  const http = axios.create({
    baseURL: 'https://264c-2800-a4-160a-dd00-33db-a966-4b07-1f20.sa.ngrok.io/api',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE",
      'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, X-Token-Auth, Authorization"
    },
  });

  const getLoggedIn = () => {
    try {
      const user_detail = sessionStorage.getItem('isLoggedIn');
      return user_detail;
    } catch (error) {
      console.log('USER SIN DATOS', error);
    }
  };

  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    getUser,
    http,
    logout,
    userProfile,
    getUserProfile,
    saveUserProfile,
    getLoggedIn,
  };
}
