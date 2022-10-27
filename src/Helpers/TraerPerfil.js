
export const traerPerfil = () => {
	const pefilSessionStorage = 
		sessionStorage?.getItem('userProfile')

	return pefilSessionStorage;
};
