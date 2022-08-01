import { traerPreferencias } from '../Helpers/TraerPreferencias';


 export const filterData = (categoria) => {
	const data = traerPreferencias()?.filter(
		(item) => item.categoria === categoria
	);
	return data;
};