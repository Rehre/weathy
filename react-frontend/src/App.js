import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import zeroFill from "zero-fill";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [weatherDataResult, setWeatherDataResult] = React.useState({});

  function fetchWeatherDataBasedOnCoordinate(position) {
    fetch(
      `/weather_forecast/${position.coords.latitude}/${position.coords.longitude}`
    )
      .then((response) => response.json())
      .then((result) => {
        setWeatherDataResult(result);
        setIsLoading(false);
      })
      .catch(() => alert("Failed to get weather data"));
  }

  function getDateInText(date) {
    const currentDate = new Date(date * 1000);

    return `${zeroFill(2, currentDate.getDate())}/${zeroFill(
      2,
      currentDate.getMonth() + 1
    )}/${zeroFill(4, currentDate.getFullYear())} ${zeroFill(
      2,
      currentDate.getHours()
    )}:${zeroFill(2, currentDate.getMinutes())}`;
  }

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        fetchWeatherDataBasedOnCoordinate
      );
    } else {
      alert("Geolocation tracking is not available/permitted in your browser.");
    }
  }, []);

  return (
    <div className="main-app">
      <div className="header">WEATHY</div>
      <div className="body-content">
        {isLoading ? (
          <div className="loading">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        ) : (
          <div className="weather-data-content">
            <div className="weather-data-content__location">
              <h2 className="weather-data-content__location__title">
                LOCATION
              </h2>
              <h2 className="weather-data-content__location__city-name">
                {weatherDataResult.city.name}
              </h2>
            </div>
            <div className="weather-data-content__big-weather-card">
              <div className="weather-data-content__big-weather-card__card">
                <img
                  src={`http://openweathermap.org/img/w/${weatherDataResult.list[0].weather[0].icon}.png`}
                  alt="weather"
                  width="150"
                  height="150"
                />
                <div className="weather-data-content__big-weather-card__card__weather-info">
                  <div className="weather-data-content__big-weather-card__card__weather-info__temp">
                    {weatherDataResult.list[0].main.temp}&#176;
                  </div>
                  <div className="weather-data-content__big-weather-card__card__weather-info__desc">
                    {weatherDataResult.list[0].weather[0].main}
                  </div>

                  <div className="weather-data-content__big-weather-card__card__weather-info__date">
                    {getDateInText(weatherDataResult.list[0].dt)}
                  </div>
                </div>
              </div>
            </div>
            <div className="weather-data-content__list-forecast">
              <div className="weather-data-content__list-forecast__title">
                <div className="gray-line" />
                OTHER FORECASTS
                <div className="gray-line" />
              </div>
              <div className="weather-data-content__list-forecast__list">
                {weatherDataResult.list.map((item, index) => {
                  if (index === 0) return null;

                  return (
                    <div className="weather-data-content__list-forecast__list__card">
                      <img
                        src={`http://openweathermap.org/img/w/${weatherDataResult.list[index].weather[0].icon}.png`}
                        alt="weather"
                        width="100"
                        height="100"
                      />
                      <div className="weather-data-content__list-forecast__list__card__weather-info">
                        <div className="weather-data-content__list-forecast__list__card__weather-info__temp">
                          {weatherDataResult.list[index].main.temp}&#176;
                        </div>
                        <div className="weather-data-content__list-forecast__list__card__weather-info__desc">
                          {weatherDataResult.list[index].weather[0].main}
                        </div>

                        <div className="weather-data-content__list-forecast__list__card__weather-info__date">
                          {getDateInText(weatherDataResult.list[index].dt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
