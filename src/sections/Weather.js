import React from "react";
import PropTypes from "prop-types";

const Weather = ({ weatherObject }) => {
  return (
    <section className="weather">
      <header>
        <h1 className="weather__header-text">{weatherObject.name}</h1>
      </header>
      <img
        className="weather__icon"
        src={`http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@4x.png`}
        alt="sunny"
      />
      <footer className="weather__footer">
        <h1 className="weather__footer-text">
          {weatherObject.main.temp.toFixed(2)}&deg;
        </h1>
        <h1 className="weather__footer-text-subtitle">
          {weatherObject.weather[0].description.toUpperCase()}
        </h1>
      </footer>
    </section>
  );
};

Weather.propTypes = {
  weatherObject: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]).isRequired,
};

export default Weather;
