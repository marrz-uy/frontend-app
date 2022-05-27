import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import '../css/Principal.css'

export const Principal = () => {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState('');

  useEffect(() => {
    fetchUserDetail();
    // eslint-disable-next-line
  }, []);

  const fetchUserDetail = () => {
    http.post('/me').then((res) => {
      setUserdetail(res.data);
      console.log(res.data)
    });
  };

  function renderElement() {
    if (userdetail) {
      return (
        <div>
          <h3>Name</h3>
          <p>{userdetail.name}</p>
          <h3>Email</h3>
          <p>{userdetail.email}</p>
        </div>
      );
    } else {
      return <p>Loading.....</p>;
    }
  }

  const { token, logout } = AuthUser();

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  return (
    <div className='container'>
      <nav>
        <ul>
          <li>
            <span role="button" onClick={logoutUser}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
      <div className='main'>
      <h1>Principal Page</h1>
      {renderElement()}
      </div>
    </div>
  );
};
