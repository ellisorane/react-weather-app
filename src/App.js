import React, { useState, useEffect } from "react";

import CurrentCard from "./CurrentCard";
import SingleDay from "./SingleDay";
import './App.css';


const api_key = process.env.REACT_APP_WEATHER_API_KEY;
const gApiKey = process.env.REACT_APP_GLOCATION_API_KEY;


const App = () => {
  
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const [currentWeather, setCurrentWeather] = useState();
  const [weekWeather, setWeekWeather] = useState();
  const [location, setLocation] = useState('');
  const [latLonError, setlatLonError] = useState('');
  
  // Get current location on page render
  useEffect(() => {
    getLoc();
  }, [])
  
  // Get location - Latitude and Longitude
  const getLoc = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLon(position.coords.longitude);
      setLat(position.coords.latitude);
    });
  }
  
  // Api urls
  const location_api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${gApiKey}`
  const weather_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`;

  const getData = async() => {
    // Leave error message if there's no lat or lon
    if(!lat || !lon) {
      return setlatLonError('Sorry there was an error retreiving weather from your location. Try again.');
    } else {
      setlatLonError('');
    }

    // Get location name 
    const locationResponse = await fetch(location_api);
    const locationData = await locationResponse.json();
    setLocation(locationData);

    // Get weather api data 
    const weatherResponse = await fetch(weather_api);
    const weatherData = await weatherResponse.json();
    setCurrentWeather(weatherData.current)
    // Remove last day from the daily array to make it 7 days instead of 8 days
    weatherData.daily.pop();
    setWeekWeather(weatherData.daily)
  }
  
  return (
    <div className="App">

      <h1>Weather App</h1>
      {/* Click to fetch data from API  */}
      <button onClick={ () => getData() }>Get Weather</button>

      {latLonError && <h2>{latLonError}</h2>}

      <h4><u>Current Weather { location && `in ${location.results[5].formatted_address}` }</u></h4>
      { currentWeather && <CurrentCard currentWeather={ currentWeather } /> }
      

      <h4><u>7 Day Forecast</u></h4>
      <div className="sevenDay">
        { weekWeather && weekWeather.map((day, i) => <SingleDay key={ i } timestamp={ day.dt } max={ day.temp.max } min={ day.temp.min } icon={ day.weather[0].icon } />) }
      </div>



    </div>
  );
}

export default App;
