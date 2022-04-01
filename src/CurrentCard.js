import React from 'react';


const CurrentCard = ({ currentWeather }) => {
  const icon = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

    return(
        <div className="currentWeather">
            {/* Weather Icon  */}
            <img src={icon} alt='img' />
            {/* Temperature  */}
            <h2>{currentWeather.temp}°F</h2>
            
            <div className="additionalInfo">
            {/* Wind  */}
            <h5>Wind: {currentWeather.wind_speed} mph</h5>
            {/* Weather Description  */}
            <h4>{currentWeather.weather[0].main}</h4>
            {/* Humidity  */}
            <h5>Humidity: {currentWeather.humidity}%</h5>
            </div>
        </div>
    );
}

export default CurrentCard;