export const filtrarTraduccion = (array, etiqueta, lenguage) => {
  let filtrado = [];
  array.forEach(function (item) {
    if (item.tagName === etiqueta) {
      filtrado = item;
      if (lenguage === 'es') {
        filtrado = filtrado.es;
      } else {
        filtrado = filtrado.en;
      }
    }
  });
  return filtrado;
};
