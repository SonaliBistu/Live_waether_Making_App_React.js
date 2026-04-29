import React from "react";

import Thunderstorm from "../assets/Thunderstorm.gif";
import Rain from "../assets/Rain.gif";
import Snow from "../assets/Snow.gif";
import ClearDay from "../assets/ClearDay.gif";
import ClearNight from "../assets/ClearNight.gif";
import CloudDay from "../assets/CloudDay.gif";
import CloudNight from "../assets/CloudNight.gif";
import Haze from "../assets/Haze.gif";
import Home from "../assets/Home.Webp"

const WeatherBackground = ({ condition, isNight }) => {

  const gifs = {
    thunderstorm: Thunderstorm,
    rain: Rain,
    snow: Snow,
    clearDay: ClearDay,
    clearNight: ClearNight,
    cloudDay: CloudDay,
    cloudNight: CloudNight,
    haze: Haze,
    default: Home,
  };

  const getBackground = () => {

    if (!condition) {
      return gifs.default;
    }

    const weather = condition.toLowerCase();

    if (weather.includes("thunder")) {
      return gifs.thunderstorm;
    }

    if (
      weather.includes("rain") ||
      weather.includes("drizzle")
    ) {
      return gifs.rain;
    }

    if (weather.includes("snow")) {
      return gifs.snow;
    }

    if (weather.includes("cloud")) {
      return isNight
        ? gifs.cloudNight
        : gifs.cloudDay;
    }

    if (weather.includes("clear")) {
      return isNight
        ? gifs.clearNight
        : gifs.clearDay;
    }

    if (
      weather.includes("mist") ||
      weather.includes("fog") ||
      weather.includes("haze")
    ) {
      return gifs.haze;
    }

    return gifs.default;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">

      <img
        src={getBackground()}
        alt="Weather Background"
        className="w-full h-full object-cover"
      />

    </div>
  );
};

export default WeatherBackground;