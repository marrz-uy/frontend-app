import '../../Css/NoTourMsg.css';
import { useState, useEffect } from 'react';

const NoTourMsg = (props) => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => clearTimeout(timeout);
  });

  return (
    showComponent && (
      <div className="divNoTour">
        <div className="divNoTourMsg">
          <h2 className="messageNoTour">{props.message}</h2>
        </div>
        <div className="divImage">
          <img src={props.image} alt="img" />
        </div>
      </div>
    )
  );
};

export default NoTourMsg;
