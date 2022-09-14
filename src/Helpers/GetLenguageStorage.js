const getLang = () => {
  let lenguaje = localStorage.getItem('language');
  return lenguaje;
};

export const getLanguageStorage = () => {
  let lang = getLang();
  if (!lang) {
    lang = 'es';
  }
  return lang;
};
