import React from 'react';
import '../Css/PageNumbers.css';

const PageNumbers = ({cant}) => {
  const pages = [];
  for (let p = 0; p < cant; p++) {
    pages.push(p + 1);
  }

  console.log('PAGES: ', pages);

  const RenderPageNumber = pages.map((number)  => {
		
		console.log('NUMBER',number)
    return (
      <div>
        <button key={number} id={number}>{number}</button>
      </div>
    );
  });


  return (
    <div className="pageNumbersDiv">
      <div className="pageNumbers">{RenderPageNumber}</div>
    </div>
  );
};

export default PageNumbers;
