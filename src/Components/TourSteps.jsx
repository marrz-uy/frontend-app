import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import { Button, message, Steps } from 'antd';
import TourStep1 from '../Pages/BuildTour/TourStep1';
import TourStep2 from '../Pages/BuildTour/TourStep2';
import TourStep3 from '../Pages/BuildTour/TourStep3';
import TourStep4 from '../Pages/BuildTour/TourStep4';
import TourFinalStep from '../Pages/BuildTour/TourFinalStep';
import TourContext from '../Context/TourContext';
import Swal from 'sweetalert2';
import '../Css/TourSteps.css';

const steps = [
  {
    title: 'Preferencias',
    content: 'First-content',
  },
  {
    title: 'Ver Preferencias',
    content: 'Second-content',
  },
  {
    title: 'Elegir',
    content: 'Third-content',
  },
  {
    title: 'Ver',
    content: 'Fourth-content',
  },
  {
    title: 'Fin',
    content: 'Last-content',
  },
];

const TourSteps = () => {
  const {
    SaveTourPreferences,
    tourPreferences,
    setTourPreferences,
    itemsParaTourDB,
    setItemsParaTourDB,
    savedTourItems,
    setSavedTourItems,
    SaveTourItems,
    dataTourForSave,
    setDataTourForSave,
  } = useContext(TourContext);

  const { http } = AuthUser();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  function GetItemsPraTour() {
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
        setItemsParaTourDB(allDdata);
        console.log('%callDdata - tourSteps:', 'color: violet;', allDdata);
        console.log(
          '%cITEMS-PARA-TOUR - tourSteps: ',
          'color: yellow;',
          itemsParaTourDB
        );
        console.log('RESPONSE HTTP: ', response?.data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  }

  const next = () => {
    if (current === 2 && savedTourItems.length === 0) {
      Swal.fire({
        title: 'Atencion!',
        text: 'Elija algun punto de interes para continuar',
        icon: 'info',
        showConfirmButton: true,
        confirmButtonColor: '#015abb',
      });
      return;
    }
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
      SaveTourPreferences(tourPreferences);
      GetItemsPraTour();
      if (savedTourItems) {
        SaveTourItems(savedTourItems);
      }
      if (current < 4) {
        setCurrent(current + 1);
      }
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  // console.log('DATATOURFORSAVE en TOURSTEPS:', dataTourForSave);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [statusResponse, setStatusResponse] = useState('');

  const savedTour = () => {
    if (dataTourForSave.nombreTour === '') {
      console.log('El tour debe llevar un nombre');
      Swal.fire({
        title: 'Atencion!',
        text: 'El tour debe llevar un nombre para poder guardarlo',
        icon: 'info',
        showConfirmButton: true,
        confirmButtonColor: '#015abb',
      });
      return;
    }

    if (dataTourForSave.puntosdeInteresTour === '') {
      console.log('Debe elejir algunos puntos de interes para guardar el tour');
      return;
    }

    http
      .post('/tourArmado', {
        usuarioId: +dataTourForSave.usuarioId,
        nombreTour: dataTourForSave.nombreTour,
        horaInicioTour: dataTourForSave.horaInicioTour,
        puntosdeInteresTour: dataTourForSave.puntosdeInteresTour,
      })
      .then((res) => {
        console.log('RESPUESTA:', res.data);
        // setRegisterErrorMessage('El Tour se registro correctamente');
        // message.success('Su tour se ha guardado correctamente!');
        setRegisterErrorMessage('El Tour se registro correctamente');
        setStatusResponse(res.status);
        if (res.status === 200) {
          Swal.fire({
            title: 'Exelente!',
            text: 'Su tour se creo correctamente',
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ver sus tours',
            cancelButtonText: 'Cerrar',
            confirmButtonColor: '#083d99',
            cancelButtonColor: 'gray',
          }).then((result) => {
            if (result.isConfirmed) {
              setTourPreferences({});
              SaveTourPreferences({});
              setItemsParaTourDB({});
              setSavedTourItems({});
              setDataTourForSave({});
              SaveTourItems({});
              navigate('/tour');
            }
          });
          navigate('/');
        }
      })
      .catch(function (error) {
        setRegisterErrorMessage('No se pudo registrar el tour');
        message.error('NO se pudo guardar su tour');
      });
    console.log('registerErrorMessage ', registerErrorMessage, statusResponse);
    return { registerErrorMessage, statusResponse };
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  // console.log('CURRENT PAGE: ', current + 1);

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
        ) : current === 3 ? (
          <TourStep4 />
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
            onClick={() => savedTour()}
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
