export const traerPerfil = () => {
  try {
    const perfilSessionStorage = sessionStorage?.getItem('userProfile');
    if (!perfilSessionStorage) {
      throw new Error('El perfil no está disponible en sessionStorage');
    }
    return perfilSessionStorage;
  } catch (error) {
    console.error('Ha ocurrido un error al traer el perfil:', error);
    return '';
  }
};
