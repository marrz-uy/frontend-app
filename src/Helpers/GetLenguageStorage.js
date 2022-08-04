const getLang = () => {
  let lenguaje = localStorage.getItem('language');
  console.log('eeeeeeeee', lenguaje);
  return lenguaje;
};

export const getLanguageStorage = () => {
  let lang = getLang();
  if(!lang){
    lang = 'es'
  }
  console.log('get lang ', lang);

  return lang;
};
