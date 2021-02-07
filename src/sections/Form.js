import React from "react";
import PropTypes from "prop-types";

const Form = ({ isFormDisabled, onGetWeather }) => {
  const [cityName, setCityName] = React.useState("");

  return (
    <section className="form">
      <header>
        <h1 className="form__header-text">Weather App</h1>
      </header>
      <form
        className="form__input-container"
        onSubmit={(ev) => {
          ev.preventDefault();
          if (isFormDisabled) return;
          onGetWeather(cityName);
        }}
      >
        <input
          className="form__city-name-input"
          type="text"
          placeholder="City Name"
          value={cityName}
          onChange={(ev) => setCityName(ev.target.value)}
          disabled={isFormDisabled}
        />
        <button
          className="form__get-weather-button"
          type="submit"
          disabled={isFormDisabled}
        >
          {isFormDisabled ? "Loading" : "GET WEATHER"}
        </button>
      </form>
    </section>
  );
};

Form.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  onGetWeather: PropTypes.func.isRequired,
};

export default Form;
