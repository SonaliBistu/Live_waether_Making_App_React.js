import React, { useState } from "react";
import WeatherBackground from "./components/weatherBackground";

import {
  FaSearch,
  FaTint,
  FaWind,
  FaTemperatureHigh,
  FaMapMarkerAlt,
  FaCloudSun,
  FaEye,
} from "react-icons/fa";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "437012c904982af9eb69aba587fe26ad";

  const getWeather = async (cityName) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
      }

      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      getWeather(city);
    }
  };

  const isNight =
    weather &&
    (Date.now() / 1000 < weather.sys.sunrise ||
      Date.now() / 1000 > weather.sys.sunset);

  return (
    <div className="min-h-screen relative overflow-hidden">

      <WeatherBackground
        condition={weather?.weather[0]?.main}
        isNight={isNight}
      />

      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">

        <div className="w-full max-w-md rounded-[32px] overflow-hidden border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]">

          <div className="p-4 text-white">

            <div className="flex justify-between items-center mb-5">

              <div>

                <h1 className="text-3xl font-black tracking-wide">
                  Weather
                </h1>

                <p className="text-gray-200 mt-1 text-xs">
                  Real Time Forecast
                </p>

              </div>

              <div className="bg-white/20 p-2 rounded-2xl">

                <FaCloudSun
                  size={24}
                  className="text-yellow-300"
                />

              </div>

            </div>

            <div className="flex items-center gap-2 mb-4">

              <input
                type="text"
                placeholder="Search city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="flex-1 bg-white/15 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder:text-gray-200 outline-none focus:border-cyan-300 transition"
              />

              <button
                onClick={handleSearch}
                className="bg-gradient-to-br from-cyan-400 to-blue-500 hover:scale-105 transition duration-300 p-3 rounded-2xl shadow-lg"
              >
                <FaSearch size={16} />
              </button>

            </div>

            {loading ? (

              <div className="flex flex-col items-center justify-center py-10">

                <div className="w-12 h-12 border-4 border-white/30 border-t-cyan-300 rounded-full animate-spin"></div>

                <p className="mt-4 text-lg font-semibold">
                  Loading...
                </p>

              </div>

            ) : weather && weather.main ? (

              <div>

                <div className="text-center">

                  <div className="flex justify-center items-center gap-2">

                    <FaMapMarkerAlt className="text-red-400" />

                    <h2 className="text-2xl font-bold tracking-wide">
                      {weather.name}
                    </h2>

                  </div>

                  <p className="capitalize text-gray-200 mt-2 text-sm">
                    {weather.weather[0].description}
                  </p>

                  <div className="flex justify-center items-center mt-5">

                    <FaTemperatureHigh
                      size={30}
                      className="text-orange-300 mr-2"
                    />

                    <h1 className="text-[58px] leading-none font-black drop-shadow-2xl">
                      {Math.round(weather.main.temp)}°
                    </h1>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">

                  <div className="bg-white/10 border border-white/10 rounded-[22px] p-3 backdrop-blur-xl hover:scale-105 transition duration-300">

                    <FaTint
                      size={20}
                      className="mx-auto text-cyan-300 mb-2"
                    />

                    <p className="text-center text-gray-200 text-xs">
                      Humidity
                    </p>

                    <h3 className="text-center text-xl font-bold mt-1">
                      {weather.main.humidity}%
                    </h3>

                  </div>

                  <div className="bg-white/10 border border-white/10 rounded-[22px] p-3 backdrop-blur-xl hover:scale-105 transition duration-300">

                    <FaWind
                      size={20}
                      className="mx-auto text-white mb-2"
                    />

                    <p className="text-center text-gray-200 text-xs">
                      Wind
                    </p>

                    <h3 className="text-center text-xl font-bold mt-1">
                      {weather.wind.speed} m/s
                    </h3>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">

                  <div className="bg-gradient-to-br from-blue-500/30 to-cyan-400/20 rounded-[22px] p-3 border border-white/10">

                    <p className="text-gray-200 text-xs">
                      Feels Like
                    </p>

                    <h2 className="text-xl font-black mt-1">
                      {Math.round(weather.main.feels_like)}°
                    </h2>

                  </div>

                  <div className="bg-gradient-to-br from-purple-500/30 to-pink-400/20 rounded-[22px] p-3 border border-white/10">

                    <FaEye
                      size={16}
                      className="mb-1 text-white"
                    />

                    <p className="text-gray-200 text-xs">
                      Visibility
                    </p>

                    <h2 className="text-xl font-black mt-1">
                      {weather.visibility / 1000} km
                    </h2>

                  </div>

                </div>

              </div>

            ) : (

              <div className="text-center py-10">

                <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-xl">

                  <FaCloudSun
                    size={45}
                    className="text-yellow-300"
                  />

                </div>

                <h2 className="text-2xl font-black">
                  Weather App
                </h2>

                <p className="mt-2 text-sm text-gray-200">
                  Search city for live weather
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default App;