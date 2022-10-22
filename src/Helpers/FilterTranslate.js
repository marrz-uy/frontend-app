export const filtrarTraduccion = (array, etiqueta, lenguage) => {
  let filtrado = [];
  array.forEach(function (item) {
    if (item.tagName === etiqueta) {
      filtrado = item;
      if (lenguage === 'es') {
        filtrado = filtrado.es;
        localStorage.setItem('language', 'es')
      } else {
        filtrado = filtrado.en;
        localStorage.setItem('language', 'en')
      }
    }
  });
  return filtrado;
};


