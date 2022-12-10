import React, { useState, useContext } from 'react';
import '../Css/TourSteps.css';
import { Button, message, Steps } from 'antd';
import TourStep1 from '../Pages/BuildTour/TourStep1';
import TourStep2 from '../Pages/BuildTour/TourStep2';
import TourStep3 from '../Pages/BuildTour/TourStep3';
import TourFinalStep from '../Pages/BuildTour/TourFinalStep';
import TourContext from '../Context/TourContext';
import Swal from 'sweetalert2';
import AuthUser from './AuthUser';


const steps = [
  {
    title: 'Preferencias',
    content: 'First-content',
  },
  {
    title: 'Elegir',
    content: 'Second-content',
  },
  {
    title: 'Ver',
    content: 'Second-content',
  },
  {
    title: 'Fin',
    content: 'Last-content',
  },
];

const TourSteps = () => {

  const { http } = AuthUser();
  const {
    saveTourPreferences,
    tourPreferences,
    datosParaTourDB,
    setDatosParaTourDB,
  } = useContext(TourContext);

  const [data, setData] = useState()

  const getDataTour = () => {
    http
      .post('/PuntosInteresParaTour', {
        horaInicio: tourPreferences?.horaInicio,
        tipoDeLugar: tourPreferences?.tipoDeLugar,
        restriccionDeEdad: tourPreferences?.restriccionDeEdad,
        enfoqueDePersonas: tourPreferences?.enfoqueDePersonas,
        ubicacion: tourPreferences?.ubicacion,
      })
      .then((response) => {
        const allDdata = response?.data;
        setDatosParaTourDB(allDdata);
        setData(response?.data)
        console.log('%callDdata -1- tourStep: ', 'color: violet;', allDdata);
        console.log('%cDATOSPARATOUR -1- tourStep: ', 'color: yellow;', datosParaTourDB);
        console.log('RESPONSE HTTP: ', response?.data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };
  
  const [current, setCurrent] = useState(0);
  
  const next = () => {
    if (
      tourPreferences.franjaHoraria === '' ||
      tourPreferences.horaInicio === '' ||
      tourPreferences.lugar === '' ||
      tourPreferences.edad === '' ||
      tourPreferences.personas === '' ||
      tourPreferences.ubicacion === ''
      ) {
        console.log('Complete todos los campos');
        Swal.fire({
          title: 'Atencion!',
          text: 'Complete todos los campos para continuar',
          icon: 'info',
          showConfirmButton: true,
          confirmButtonColor: '#015abb',
        });
      } else {
        getDataTour()
        console.log('%cDATOSPARATOUR -2- tourStep: ', 'color: yellow;', datosParaTourDB);
      saveTourPreferences(tourPreferences);
      if (current < 3) {
        setCurrent(current + 1);
      }
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  // console.log(current);
  return (
    <>
      <Steps current={current} items={items} />
      <div className="steps-content">
        {current < 1 ? (
          <TourStep1 />
        ) : current === 1 ? (
          <TourStep2 />
        ) : current === 2 ? (
          <TourStep3 />
        ) : (
          <TourFinalStep />
        )}
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Siguiente
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            className="btnSiguienteGuardar"
            type="primary"
            onClick={() =>
              message.success('Su tour se ha guardado correctamente!')
            }
          >
            Guardar
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 3rem' }} onClick={() => prev()}>
            Previo
          </Button>
        )}
      </div>
    </>
  );
};

export default TourSteps;
