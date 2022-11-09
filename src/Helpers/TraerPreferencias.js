

export const traerPreferencias = () => {
	const preferenciasSessionStorage = JSON.parse(
		sessionStorage.getItem('preferencias')
	);
	return preferenciasSessionStorage;
};
