import {datos} from '../Data/Datos'

export const filter = (items) => {
	const info = datos.filter((dato) => dato.tipo === items);
	return info;
};