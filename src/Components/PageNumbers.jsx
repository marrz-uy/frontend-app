import React from 'react';
import '../Css/PageNumbers.css';

const PageNumbers = ({cant}) => {

  const pages = [];
  for (let p = 0; p < cant; p++) {
    pages.push(p);
  }

  const prevNextBtn = (direction) => {
    return (
      <div>
        <button>{direction}</button>
      </div>
    );
  };
	console.log('PAGES: ', pages)

  const renderPageNumber = pages.map((item) => {
    return (
      <div>
        <button>{item+1}</button>
      </div>
    );
  });
  return (
    <div className="pageNumbersDiv">
      <div className="pageNumbers">
        {prevNextBtn}
        {renderPageNumber}
      </div>
    </div>
  );
};

export default PageNumbers;
