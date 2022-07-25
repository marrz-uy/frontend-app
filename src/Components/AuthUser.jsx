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
    if (userProfile === null || userProfile === 'undefined') {
      sessionStorage.setItem(
        'userProfile',
        JSON.stringify({})
      );
    } else {
      sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    }

    setToken(token);
    setUser(user);
    setUserProfile(userProfile);
    navigate('/principal');
  };

  const saveUserProfile = (userProfile) => {
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    setUserProfile(userProfile);
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('*');
  };

  const http = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

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
  };
}
