// import axios from 'axios';

// export const getData = async (valor) => {
//   try {
//     let headersList = {
//       Accept: '*/*',
//       'Content-Type': 'application/json',
//     };

//     let reqOptions = {
//       url: `http://localhost:8001/api/PuntosInteres/${valor}`,
//       method: 'GET',
//       headers: headersList,
//     };

//     let response = await axios.request(reqOptions);
//     console.log('CONSOLE LOG EN FUNCION', response.data);
//     let datos = response.data
//     console.log('CONSOLE LOG DATOS', datos);
//     return await datos
//    } catch (error) {
//     console.log('FUNCTION ERRRORRRRR:', error);
//   }
// };
