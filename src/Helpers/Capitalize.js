const capitalize = (string) => {
  let stringLower = string.toLowerCase();
  return stringLower && stringLower[0].toUpperCase() + stringLower.slice(1);
};
