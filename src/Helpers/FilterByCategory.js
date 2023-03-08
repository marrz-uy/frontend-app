import { traerPreferencias } from '../Helpers/TraerPreferencias';

export const filterData = (categoria) => {
  try {
    const data = traerPreferencias()?.filter(
      ({ categoria: itemCategoria }) => itemCategoria === categoria
    );
    return data || [];
  } catch (error) {
    console.error('Ha ocurrido un error al filtrar las preferencias:', error);
    return [];
  }
};
