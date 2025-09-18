import { useEffect, useMemo, useState } from "react";
import CountryDetail from "./CountryDetail";
import services from "./services/index.js";
import useDebounce from './useDebounce.js'

const DEBOUNCE_DELAY = 300;
const MAX_DISPLAY_COUNT = 10;

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const keyword = useDebounce(value, DEBOUNCE_DELAY)

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
    setCountry(filteredCountries.length === 1 ? filteredCountries[0] : null);
  }, [filteredCountries]);

  const renderTooManyMatches = () => (
    <span>Too many matches, specify another filter</span>
  );

  const renderCountryList = (countries) =>
    countries.map(country => (
      <div key={country.name.common}>
        {country.name.common} {' '}
        <button onClick={() => setCountry(country)}>
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
        country ? <CountryDetail country={country}/>
          : filteredCountries.length > MAX_DISPLAY_COUNT ? renderTooManyMatches()
            : renderCountryList(filteredCountries)
      }
    </>
  )
}

export default App
