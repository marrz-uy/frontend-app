import React, { useEffect } from 'react';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';
import '../Css/userBarClick.css'
import ResultsCard from '../Components/ResultsCard';
import { filter } from '../Helpers/FilterByType';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';

const SearchResults = ({ items, setPage, userBar, setIsLoggedIn, isLoggedIn, setUserBar }) => {
  useEffect(() => {
    setPage('results');
  }, [setPage]);

  const data = filter(items);

  handleUserBar(userBar)

  return (
    <Layout>
      <div className='userbar-click' onClick={() => setUserBar(false)}></div>
      <div className="results ">
        <h6 className="resultsText">
          {data.length} Resultados para {items}
        </h6>
        <div className="infoResults">
          {data.map((item) => {
            return (
              <ResultsCard
                key={item.id}
                nombre={item.nombre}
                ciudad={item.ciudad}
                direccion={item.direccion}
                img={item.img}
                caracteristicas={item.caracteristicas}
              />
            );
          })}
        </div>
      </div>
      {userBar && <UserBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserBar={setUserBar}/>}
    </Layout>
  );
};

export default SearchResults;
