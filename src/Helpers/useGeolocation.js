import { useState, useEffect } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    latitud: '',
    longitud: '',
    accuracy: '',
    altitude: '',
    speed: '',
  });
  // console.log('GEOLOCATION: ', location);
  const onSuccess = (location) => {
    let latitud = location.coords.latitude
      .toString()
      .replace(/[-,.]/gi, '')
      .slice(0, 7);
    let longitud = location.coords.longitude
      .toString()
      .replace(/[-,.]/gi, '')
      .slice(0, 7);
    if (latitud.length === 6 || longitud.length === 6) {
      latitud = latitud + 0;
      longitud = longitud + 0;
    }
    setLocation({
      loaded: true,
      latitud: latitud,
      longitud: longitud,
      accuracy: location.coords.accuracy,
      altitude: location.coords.altitude,
      speed: location.coords.speed,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocalizacion no soportada',
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
  // return {
  //   loaded: location.loaded,
  //   latitud: location.coords.latitude,
  //   longitud: location.coords.longitude,
  // };
};

export default useGeoLocation;
