import {useEffect, useMemo, useState, useRef} from "react";
import CountryDetail from "./CountryDetail";
import services from "./services/index.js";
import useDebounce from './useDebounce.js'

const DEBOUNCE_DELAY = 300;
const MAX_DISPLAY_COUNT = 10;

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState({
    loading: false, data: null
  })
  const keyword = useDebounce(value, DEBOUNCE_DELAY)
  const abortControllerRef = useRef(null);

  useEffect(() => {
    services.queryAllCountries().then(setCountries)
  }, []);

  const filteredCountries = useMemo(() => {
    if (!countries || !keyword.trim()) {
      return [];
    }
    return countries.filter(({ name: { common, official }}) =>
      [common, official].some(name => name.toLowerCase().includes(keyword))
    )
  }, [keyword, countries])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      handleCountrySelect(filteredCountries[0]);
    } else {
      setCountry(null);
      setWeather({ loading: false, data: null });
    }
  }, [filteredCountries]);

  const handleCountrySelect = async country => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    setCountry(country);
    const { capitalInfo, latlng } = country;
    let lat, lon
    if (capitalInfo.latlng) {
      [lat, lon] = capitalInfo.latlng
    } else {
      [lat, lon] = latlng
    }
    setWeather({ loading: true, data: null })
    const result = await services.queryCountryWeather(
      { lat, lon },
      { signal: abortControllerRef.current.signal }
    )
    setWeather({ loading: false, data: result})
  }

  const renderTooManyMatches = () => (
    <span>Too many matches, specify another filter</span>
  );

  const renderCountryList = (countries) =>
    countries.map(country => (
      <div key={country.name.common}>
        {country.name.common} {' '}
        <button onClick={() => handleCountrySelect(country)}>
          Show
        </button>
      </div>
    ));

  if (countries === null) return <div>Loading...</div>

  return (
    <>
      <div>
        find countries {' '}
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && value.trim()) {
              setCountry(null)
            }
          }}
        />
      </div>
      {
        country ? <CountryDetail country={country} weather={weather}/>
          : filteredCountries.length > MAX_DISPLAY_COUNT ? renderTooManyMatches()
            : renderCountryList(filteredCountries)
      }
    </>
  )
}

export default App
