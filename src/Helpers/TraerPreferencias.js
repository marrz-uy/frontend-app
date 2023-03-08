export const traerPreferencias = () => {
  const preferenciasSessionStorage = JSON.parse(
    sessionStorage.getItem('userProfile') ?? '{}'
  );
  return preferenciasSessionStorage;
};
