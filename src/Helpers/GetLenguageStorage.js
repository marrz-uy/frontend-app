const getLang = () => {
  let lenguaje = localStorage.getItem('language');
  console.log('eeeeeeeee', lenguaje);
  return lenguaje;
};

export const getLanguageStorage = () => {
  let lang = getLang();
  console.log('get lang ', lang);

  return lang;
};
