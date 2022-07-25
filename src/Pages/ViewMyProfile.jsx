import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import { Layout } from '../Layout';
import '../Css/ViewMyProfile.css';

const ViewMyProfile = ({ setPage }) => {
  useEffect(() => {
    setPage('viewmyprofile');
  }, [setPage]);

 
  return (
    <Layout>
      <div className="viewMyProfile">
        <h2>Mi perfil</h2>
      </div>
    </Layout>
  );
};

export default ViewMyProfile;
