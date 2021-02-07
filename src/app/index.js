import React from "react";

import Form from "../sections/Form";
import Weather from "../sections/Weather";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [weatherObject, setWeatherObject] = React.useState(null);

  const isMounted = React.useRef(false);

  function getWeatherData(nextCityName) {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${nextCityName}&units=metric&appid=432c18e4aeca52d54dae45cb325ffa1c`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get weather data");
        }

        return response.json();
      })
      .then((result) => {
        if (!isMounted.current) {
          return;
        }

        setWeatherObject(result);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isMounted.current) {
          return;
        }

        alert("Failed to get weather data");
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="app">
      <Form isFormDisabled={isLoading} onGetWeather={getWeatherData} />
      {weatherObject !== null ? (
        <Weather weatherObject={weatherObject} />
      ) : null}
    </div>
  );
}

export default App;
