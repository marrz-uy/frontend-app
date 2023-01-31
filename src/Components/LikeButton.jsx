import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from './AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';

import '../Css/LikeButton.css';

const LikeButton = ({ user_Id, puntoInteres_Id, state }) => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const navigate = useNavigate();
  // console.log('PUNTO ID: ', puntoInteres_Id);
  const { http } = AuthUser();
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(state);
    console.log('ES FAVORITO: ', state);
  }, [state]);

  const toggleLIke = () => {
    setIsLike(!isLike);
  };
  // console.log('isLike: ', isLike);

  const Addlike = () => {
    http
      .post('/favoritos', {
        user_Id: user_Id,
        puntoInteres_Id: puntoInteres_Id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const Removelike = () => {
    http
      .delete('/favoritos', {
        data: {
          user_Id: user_Id,
          puntoInteres_Id: puntoInteres_Id,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handleLike = () => {
    if (!user_Id) {
      Swal.fire({
        title: filtrarTraduccion(traduccionesBD, 'weAreSorryModal', lenguage),
        text: filtrarTraduccion(
          traduccionesBD,
          'sorryExplanationModal',
          lenguage
        ),
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
      return;
    }
    toggleLIke();
    if (!isLike) {
      console.log('AGREGANDO FAVORITO: ');
      Addlike();
    }

    if (isLike) {
      console.log('ELIMINANDO FAVORITO: ');
      Removelike();
    }
  };

  return (
    <div className="divLikeButton">
      <button className="btnLike" onClick={handleLike}>
        {isLike === true ? '💙' : '🤍'}
      </button>
    </div>
  );
};

export default LikeButton;
