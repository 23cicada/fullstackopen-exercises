import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data)
    })
  }, []);

  const matchingCountries = value.trim() ? countries.filter(item =>
    [item.name.common, item.name.official].some(name => name.toLowerCase().includes(value.trim().toLowerCase()))
  ) : []

  const renderTooManyMatches = () => (
    <span>Too many matches, specify another filter</span>
  );

  const renderCountryList = (countries) =>
    countries.map(({ name: { common, official } }) => (
      <div key={common}>{common} - {official}</div>
    ));

  const renderCountryDetail = (country) => {
    const { name: { common }, capital, area, languages, flags } = country;
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
      </>
    );
  };

  return (
    <>
      <div>
        find countries {' '}
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      {
        matchingCountries.length > 10 && renderTooManyMatches()
      }
      {
        matchingCountries.length <= 10 && matchingCountries.length > 1 &&
        renderCountryList(matchingCountries)
      }
      {
        matchingCountries.length === 1 &&
        renderCountryDetail(matchingCountries[0])
      }
    </>
  )
}

export default App
