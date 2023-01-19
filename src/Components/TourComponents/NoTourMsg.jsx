import '../../Css/NoTourMsg.css';

const NoTourMsg = (props) => {
  return (
    <div className="divNoTour">
      <div className="divNoTourMsg">
        <h4 className="messageNoTour">{props.message}</h4>
      </div>
      <div className="divImage">
        <img src={props.image} alt="img"></img>
      </div>
    </div>
  );
};

export default NoTourMsg;
