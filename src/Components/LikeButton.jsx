import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from './AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';

import '../Css/LikeButton.css';

const LikeButton = ({
  user_Id,
  puntoInteres_Id,
  initialState,
  setInitialState,
  cantLikes,
  setCantLikes,
}) => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const navigate = useNavigate();
  const { http } = AuthUser();

  useEffect(() => {
    setInitialState(initialState);
    console.log('ES FAVORITO: ', initialState);
  }, [initialState, setInitialState]);

  console.log('INITIAL STATE: ', initialState);
  const toggleLIke = () => {
    setInitialState(!initialState);
  };

  const Addlike = () => {
    const requests = [
      http.post('/favoritos', {
        user_Id: user_Id,
        puntoInteres_Id: puntoInteres_Id,
      }),
      http.patch(`/megusta/${puntoInteres_Id}`),
    ];
    Promise.all(requests)
      .then((responses) => {
        console.log(responses[0].data, responses[1].data);
        setCantLikes(cantLikes + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const Removelike = () => {
    const requests = [
      http.delete('/favoritos', {
        data: {
          user_Id: user_Id,
          puntoInteres_Id: puntoInteres_Id,
        },
      }),
      http.patch(`/nomegusta/${puntoInteres_Id}`),
    ];
    Promise.all(requests)
      .then((responses) => {
        console.log(responses[0].data, responses[1].data);
        setCantLikes(cantLikes - 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLike = () => {
    if (!user_Id) {
      Swal.fire({
        title: filtrarTraduccion(traduccionesBD, 'weAreSorryModal', lenguage),
        text: 'Para poder dar me gusta debe estar registrado',
        icon: 'info',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: filtrarTraduccion(
          traduccionesBD,
          'loginBtnModal',
          lenguage
        ),
        cancelButtonText: filtrarTraduccion(
          traduccionesBD,
          'closeBtnModal',
          lenguage
        ),
        confirmButtonColor: '#083d99',
        cancelButtonColor: 'gray',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    toggleLIke();
    if (!initialState) {
      console.log('AGREGANDO FAVORITO: ');
      Addlike();
    }

    if (initialState) {
      console.log('ELIMINANDO FAVORITO: ');
      Removelike();
    }
  };

  return (
    <div className="divLikeButton">
      <button className="btnLike" onClick={handleLike}>
        {initialState === true ? '💙' : '🤍'}
      </button>
    </div>
  );
};

export default LikeButton;
