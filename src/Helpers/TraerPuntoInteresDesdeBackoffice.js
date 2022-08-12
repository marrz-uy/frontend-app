import AuthUser from '../Components/AuthUser';
const { http } = AuthUser();

/* export const traerPuntoInteresDesdeBackoffice = () => {
  const datosBackoffice = http
    .get('http://localhost:8001/api/PuntosInteres')
    .then((res) => {
      console.log('%cPUNTOS DE INTERESES RESPONSE:', 'color: green;', res.data);
    });

  return datosBackoffice;
};
 */