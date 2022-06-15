import React from 'react';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';




const SearchResults = ({text}) => {

  return (
    <Layout>
      <div className="container">
        <h2>Resultados de busqueda</h2>
        <p>{text}</p>
      </div>
    </Layout>
  );
};

export default SearchResults;
