const getLang = () => {
  let lenguaje = localStorage.getItem('language');
  // console.log('getLang() =>', lenguaje);
  return lenguaje;
};

export const getLanguageStorage = () => {
  let lang = getLang();
  if(!lang){
    lang = 'es'
  }
  // console.log('getLang() =>', lang);

  return lang;
};
