import {useEffect, useState} from "react";
import services from "./services/index.js";

const CountryDetail = ({ country }) => {
  const { name: { common }, capital = common, area, languages, flags } = country;
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const abort = new AbortController();
    const { capitalInfo, latlng } = country;
    let lat, lon
    if (capitalInfo.latlng) {
      [lat, lon] = capitalInfo.latlng
    } else {
      [lat, lon] = latlng
    }
    setLoading(true)
    services.queryCountryWeather(
      { lat, lon },
      { signal: abort.signal }
    )
      .then(setWeather)
      .finally(() => setLoading(false));
    return () => {
      abort.abort()
    }
  }, [country])

  return (
    <>
      <h1>{common}</h1>
      <div>Capital {capital}</div>
      <div>Area {area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <h2>Weather in {capital}</h2>
      {loading ? <div>Loading...</div> : weather && (
        <>
          <div>Temperature {weather.main.temp} °C</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width={100}
            height={100}
          />
          <div>Wind {weather.wind.speed} m/s</div>
        </>
      )}
    </>
  );
};

export default CountryDetail;
