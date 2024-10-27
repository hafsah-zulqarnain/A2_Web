import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = '9667ea9a2e4be7084defb8b70d70e99d';

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecastData(forecastResponse.data.list);
    } catch (err) {
      setError('City not found or API key is invalid');
    }
  };

  const getDailyForecast = () => {
    const dailyForecast = {};
    forecastData.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = [];
      }
      dailyForecast[date].push(item);
    });
    return dailyForecast;
  };

  const getWeatherIconClass = (iconCode) => {
    if (iconCode.startsWith('01')) {
      return 'animate-glowing'; // Clear sky
    } else if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) {
      return 'animate-moveClouds'; // Clouds
    } else if (iconCode.startsWith('09') || iconCode.startsWith('10')) {
      return 'animate-fallingRain'; // Rain
    }
    return '';
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-2 md:px-6"
      style={{
        backgroundImage: `url('/image2.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-black-400 font-extrabold mb-4 text-center">
        Weather Forecast
      </h1>
      <form onSubmit={fetchWeather} className="flex flex-col items-center w-full max-w-xs md:max-w-sm mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-1 sm:p-2 w-full border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          required
        />
        <button
          type="submit"
          className="w-full mt-3 p-1 sm:p-2 bg-blue-700 hover:bg-blue-800 rounded-lg shadow-lg text-white font-semibold text-xs sm:text-sm"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
      {weatherData && (
        <div className="bg-white bg-opacity-40 text-black-900 shadow-lg rounded-lg p-4 sm:p-4 mb-4 w-full max-w-xs sm:max-w-sm md:max-w-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">{weatherData.name}</h2>
          <div className="flex items-center justify-between">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className={`w-10 h-10 sm:w-16 sm:h-16 ${getWeatherIconClass(weatherData.weather[0].icon)}`}
            />
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{Math.round(weatherData.main.temp)}°C</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-center">{weatherData.weather[0].description}</p>
        </div>
      )}

      {forecastData.length > 0 && (
        <div className="bg-white bg-opacity-40 text-black-900 shadow-lg rounded-lg p-4 sm:p-5 w-full max-w-md sm:max-w-xl md:max-w-4xl">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 text-center">4-Day Forecast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {Object.entries(getDailyForecast())
              .slice(0, 4)
              .map(([date, items]) => {
                const dailyTemp = items.reduce((sum, item) => sum + item.main.temp, 0) / items.length;
                const weatherIcon = items[0].weather[0].icon;
                const dayName = new Date(date).toLocaleString('default', { weekday: 'long' });
                return (
                  <div key={date} className="flex flex-col items-center bg-blue-200 bg-opacity-30 p-2 sm:p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2">{dayName}</h3>
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
                      alt="forecast icon"
                      className={`w-8 h-8 sm:w-12 sm:h-12 ${getWeatherIconClass(weatherIcon)}`}
                    />
                    <p className="text-sm sm:text-lg mt-1 sm:mt-2">{Math.round(dailyTemp)}°C</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
