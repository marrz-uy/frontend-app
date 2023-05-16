import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, message, Steps } from 'antd';
import LenguageContext from '../Context/LenguageContext';
import TourContext from '../Context/TourContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import AuthUser from './AuthUser';
import TourStep1 from '../Pages/BuildTour/TourStep1';
import TourStep2 from '../Pages/BuildTour/TourStep2';
import TourStep3 from '../Pages/BuildTour/TourStep3';
import TourStep4 from '../Pages/BuildTour/TourStep4';
import TourFinalStep from '../Pages/BuildTour/TourFinalStep';
import '../Css/TourSteps.css';

const TourSteps = () => {
  const {
    SaveTourPreferences,
    tourPreferences,
    setTourPreferences,
    setItemsParaTourDB,
    savedTourItems,
    setSavedTourItems,
    SaveTourItems,
    dataTourForSave,
    setDataTourForSave,
  } = useContext(TourContext);
  const { itemsHeredados } = useContext(TourContext);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const accionTour = sessionStorage.getItem('accionTour');
  const tourId = sessionStorage.getItem('tourActualizar');

  const steps = [
    {
      title: filtrarTraduccion(traduccionesBD, 'stepPreferences', lenguage),
      content: 'First-content',
    },
    {
      title: filtrarTraduccion(traduccionesBD, 'stepSeePreferences', lenguage),
      content: 'Second-content',
    },
    {
      title: filtrarTraduccion(traduccionesBD, 'stepChoose', lenguage),
      content: 'Third-content',
    },
    {
      title: filtrarTraduccion(traduccionesBD, 'stepSeeTour', lenguage),
      content: 'Fourth-content',
    },
    {
      title: filtrarTraduccion(traduccionesBD, 'stepEnd', lenguage),
      content: 'Last-content',
    },
  ];

  const { http } = AuthUser();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  function getIdString(objects) {
    let idString = '';
    for (let i = 0; i < objects.length; i++) {
      idString += objects[i].id + ',';
    }
    return idString;
  }

  const [puntosAExcluir, setPuntosAExcluir] = useState('');

  useEffect(() => {
    if (itemsHeredados) {
      let string = getIdString(itemsHeredados);
      const newStr = string.substring(0, string.length - 1);
      setPuntosAExcluir(newStr);
    }
  }, [puntosAExcluir]);

  //! Items para tour
  function GetItemsPraTour() {
    http
      .post('/PuntosInteresParaTour', {
        horaInicio: tourPreferences?.horaInicio,
        tipoDeLugar: tourPreferences?.tipoDeLugar,
        restriccionDeEdad: tourPreferences?.restriccionDeEdad,
        enfoqueDePersonas: tourPreferences?.enfoqueDePersonas,
        ubicacion: tourPreferences?.ubicacion,
        puntosAExcluir: puntosAExcluir,
      })
      .then((response) => {
        const allDdata = response?.data;
        setItemsParaTourDB(allDdata);
        console.log('allData:', allDdata);
        console.log('allData length:', allDdata.length);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  }

  const next = () => {
    if (current === 2 && savedTourItems.length === 0) {
      Swal.fire({
        title: filtrarTraduccion(traduccionesBD, 'atentionModal', lenguage),
        text: filtrarTraduccion(
          traduccionesBD,
          'atentionChooseExplanationModal',
          lenguage
        ),
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
      Swal.fire({
        title: filtrarTraduccion(traduccionesBD, 'atentionModal', lenguage),
        text: filtrarTraduccion(
          traduccionesBD,
          'atentionExplanationModal',
          lenguage
        ),
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

  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [statusResponse, setStatusResponse] = useState('');

  //! save
  const savedTour = () => {
    if (dataTourForSave.nombreTour === '') {
      Swal.fire({
        title: filtrarTraduccion(traduccionesBD, 'atentionModal', lenguage),
        text: filtrarTraduccion(
          traduccionesBD,
          'atentionSaveTourExplanationModal',
          lenguage
        ),
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
        setRegisterErrorMessage('El Tour se registro correctamente');
        setStatusResponse(res.status);
        if (res.status === 201) {
          Swal.fire({
            title: filtrarTraduccion(traduccionesBD, 'succesModal', lenguage),
            text: filtrarTraduccion(
              traduccionesBD,
              'succesExplanationModal',
              lenguage
            ),
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: filtrarTraduccion(
              traduccionesBD,
              'seeToursBtnModal',
              lenguage
            ),
            cancelButtonText: filtrarTraduccion(
              traduccionesBD,
              'closeBtnSuccesModal',
              lenguage
            ),
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
    return { registerErrorMessage, statusResponse };
  };

  //! update
  const UpdateTour = () => {
    if (dataTourForSave.puntosdeInteresTour === '') {
      console.log('Debe elejir algunos puntos de interes para guardar el tour');
      return;
    }

    http
      .post('/tourArmadoActualizar', {
        id: tourId,
        puntosdeInteresTourUpdate: dataTourForSave.puntosdeInteresTour,
      })
      .then((res) => {
        setRegisterErrorMessage('El Tour se actualizo correctamente');
        setStatusResponse(res.status);
        if (res.status === 200) {
          Swal.fire({
            title: filtrarTraduccion(traduccionesBD, 'succesModal', lenguage),
            text: filtrarTraduccion(
              traduccionesBD,
              'succesUpdateExplanationModal',
              lenguage
            ),
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: filtrarTraduccion(
              traduccionesBD,
              'seeToursBtnModal',
              lenguage
            ),
            cancelButtonText: filtrarTraduccion(
              traduccionesBD,
              'closeBtnSuccesModal',
              lenguage
            ),
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
    return { registerErrorMessage, statusResponse };
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const backTours = () => {
    navigate('/tour');
  };

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

        <div className="steps-action">
          {current < 4 && (
            <Button type="primary" onClick={() => next()}>
              {filtrarTraduccion(traduccionesBD, 'stepBtnNext', lenguage)}
            </Button>
          )}
          {current === 4 && accionTour !== 'actualizar' ? (
            <Button
              className="btnSiguienteGuardar"
              type="primary"
              onClick={() => savedTour()}
            >
              {filtrarTraduccion(traduccionesBD, 'saveTourBtn', lenguage)}
            </Button>
          ) : current === 4 && accionTour === 'actualizar' ? (
            <Button
              className="btnSiguienteGuardar"
              type="primary"
              onClick={() => UpdateTour()}
            >
              {filtrarTraduccion(traduccionesBD, 'updateTourBtn', lenguage)}
            </Button>
          ) : null}
          {current > 0 && (
            <Button style={{ margin: '0 3rem' }} onClick={() => prev()}>
              {filtrarTraduccion(traduccionesBD, 'stepBtnPrev', lenguage)}
            </Button>
          )}
          {current === 0 && (
            <Button
              style={{ margin: '0 3rem' }}
              onClick={() => backTours()}
              className="btnBacktours"
            >
              Volver a tours
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default TourSteps;
