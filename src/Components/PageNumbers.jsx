import '../Css/PageNumbers.css';

const PageNumbers = ({ cant }) => {
  const pages = [];
  for (let p = 0; p < cant; p++) {
    pages.push(p + 1);
  }

  const RenderPageNumber = pages.map((number) => {
    return (
      <div key={number}>
        <button id={number}>{number}</button>
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
