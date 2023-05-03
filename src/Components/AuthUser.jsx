import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
  const navigate = useNavigate();

  const getToken = () => {
    try {
      const tokenString = sessionStorage.getItem('access_token');
      const userToken = tokenString;
      return userToken;
    } catch (error) {
      console.log('TOKEN SIN DATOS', error);
    }
  };

  const getUser = () => {
    try {
      const userString = sessionStorage?.getItem('user');
      if (userString !== null) {
        const user_detail = userString;
        let userDetail = user_detail.toString().replace(/[",']/gi, '');
        return userDetail;
      }
    } catch (error) {
      console.log('USER SIN DATOS', error);
    }
  };

  const getEmail = () => {
    try {
      const emailString = sessionStorage.getItem('email');
      if (!emailString) {
        return '';
      }
      let userEmail = emailString.toString().replace(/[",']/gi, '');
      return userEmail;
    } catch (error) {
      console.log('EMAIL SIN DATOS', error);
    }
  };

  const getUserProfile = () => {
    try {
      const userProfileString = sessionStorage?.getItem('userProfile');
      const userProfile_detail = JSON.parse(userProfileString);
      return userProfile_detail;
    } catch (error) {
      console.log('USER PROFILE SIN DATOS', error);
    }
  };

  const getUserfavourites = () => {
    try {
      const userFavouritesString = sessionStorage?.getItem('favourites');
      const userFavourites_detail = JSON.parse(userFavouritesString);
      return userFavourites_detail;
    } catch (error) {
      console.log('USER FAVOURITES SIN DATOS', error);
    }
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [email, setEmail] = useState(getEmail());
  const [userProfile, setUserProfile] = useState(getUserProfile());
  const [userfavourites, setUserfavourites] = useState(getUserfavourites());

  const saveToken = (user, token, email, userProfile) => {
    sessionStorage.setItem('access_token', token);
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('email', email);
    if (userProfile === null || userProfile === 'undefined') {
      sessionStorage.setItem('userProfile', JSON.stringify({}));
    } else {
      sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
    if (userfavourites === null || userfavourites === 'undefined') {
      sessionStorage.setItem('favourites', JSON.stringify({}));
    } else {
      sessionStorage.setItem('favourites', JSON.stringify(userfavourites));
    }

    setToken(token);
    setUser(user);
    setUserProfile(userProfile);
    setEmail(email);
    setUserfavourites(userfavourites);
    navigate('/principal');
  };

  const saveUserProfile = (userProfile) => {
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    setUserProfile(userProfile);
  };

  const saveUserFavourites = (userfavourites) => {
    sessionStorage.setItem('favourites', JSON.stringify(userfavourites));
    setUserfavourites(userfavourites);
  };
  const http = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const logout = () => {
    const id = sessionStorage?.getItem('id');
    http
      .post('/logout', {
        id: id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error en catch lOGOUT: ${error}`);
      });
    sessionStorage.clear();
  };

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
    email,
    userProfile,
    http,
    getToken,
    getUser,
    getEmail,
    getUserProfile,
    getLoggedIn,
    logout,
    saveUserProfile,
    getUserfavourites,
    saveUserFavourites,
  };
}
