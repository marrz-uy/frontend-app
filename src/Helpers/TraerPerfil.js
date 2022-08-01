
export const traerPerfil = () => {
	const pefilSessionStorage = JSON.parse(
		sessionStorage.getItem('userProfile')
	);
	return pefilSessionStorage;
};
