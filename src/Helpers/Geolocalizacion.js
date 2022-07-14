
export const geo = () => {
  const info = navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
		return info
  });
};

