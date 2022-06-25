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
    const userString = sessionStorage.getItem('user');
    const user_detail = JSON.parse(userString);
    return user_detail;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);
    navigate('/principal');
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('*');
  };

  const http = axios.create({
    baseURL: 'https://c1e0-2800-a4-1740-2a00-1c89-165d-fe7d-7baf.sa.ngrok.io/api',
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
  };
}
