import React from 'react'
import '../Css/SearchResults.css';

const FilterDistance = ({ latitud, longitud, distanciaAEnviar, getBackgroundSize, setDistanciaAEnviar, handleDistance, loaded }) => {
    return (
        <>
            {latitud && longitud ? (
                <div className="filtrarDistancia">
                    <div className="etiquetasDistancia">
                        <label htmlFor="inputRange">Distancia</label>
                        <br />
                    </div>
                    <div className="box">
                        <input
                            className="inputRange"
                            id="inputRange"
                            name="inputRange"
                            type="range"
                            min="1000"
                            max="50000"
                            step="1000"
                            value={distanciaAEnviar}
                            style={getBackgroundSize()}
                            onChange={(e) => setDistanciaAEnviar(Number(e.target.value))}
                        ></input>
                        <div className='divKilometros'>
                            <span className="kilometros"> {distanciaAEnviar / 1000} </span>
                        </div>
                    </div>
                    {/*  <button
                        onClick={handleDistance}
                        className={loaded === true ? 'btnSearch' : 'btnSearchInactivo'}
                    >
                        Filtrar
                    </button> */}
                </div>
            ) : (
                <div className="sinGeolocalizacion">
                    <h5>Localizacion no admitida por el usuario</h5>
                    <h6>Recargue la aplicacion para volver a activarla</h6>
                </div>
            )}
        </>
    )
}

export default FilterDistance