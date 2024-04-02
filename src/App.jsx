import  { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2096e57ef372de2a2a9d66ab6ab2dad`);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('City not found. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <div className="App">
      <h1 className="app-name">Weather App</h1>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          className="city-search"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
    
      <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <div className="city-name">
						<h2>
							{weatherData.name}, <span>{weatherData.sys.country}</span>
						</h2>
					</div>
          {/* <p>Temperature: {weatherData.main.temp} K</p>
          <p>Weather: {weatherData.weather[0].main}</p> */}
          <div className="icon-temp">
						<img
							className=""
							src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
							alt={weatherData.weather[0].description}
						/>
						{Math.round(weatherData.main.temp)}
						<sup className="deg">°C</sup>
					</div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
