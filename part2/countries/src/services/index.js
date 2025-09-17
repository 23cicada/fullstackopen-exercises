import axios from 'axios'

const queryAllCountries = () =>
  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => response.data)

const queryCountryWeather = ({ lat, lon }, option) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}&units=metric`, option)
    .then(response => response.data)
}
export default {
  queryAllCountries,
  queryCountryWeather,
}
