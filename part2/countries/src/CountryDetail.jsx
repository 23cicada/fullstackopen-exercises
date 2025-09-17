const CountryDetail = ({ country, weather: { loading, data } }) => {
  const { name: { common }, capital = common, area, languages, flags } = country;
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
      {loading ? <div>Loading...</div> : data && (
        <>
          <div>Temperature {data.main.temp} °C</div>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            width={100}
            height={100}
          />
          <div>Wind {data.wind.speed} m/s</div>
        </>
      )}
    </>
  );
};

export default CountryDetail;
