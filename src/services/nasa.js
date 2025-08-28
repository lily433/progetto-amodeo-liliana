/*
Chiamate Ajax alle API della Nasa
* libreria axios
*/

import axios from 'axios'

// Initialize Axios
const BASE_NASA_URL = 'https://api.nasa.gov'
const API_KEY = '9S8k0piF9WjyQ83SfOTcQffdudTqeykVGPsEj5K2'

axios.interceptors.request.use((config) => {
  if (config.url.startsWith(BASE_NASA_URL)) {
    const separator = config.url.includes('?') ? '&' : '?'
    config.url += `${separator}api_key=${API_KEY}`
  }
  return config
})

export default {
  getDayPic: async function (today) {
    const endpointURL = `/planetary/apod?date=${today}`
    return axios({
      url: BASE_NASA_URL + endpointURL,
      method: 'get',
    })
  },
  getAsteroidsNeows: async function (fromDate, toDate) {
    const endpointURL = `/neo/rest/v1/feed?start_date=${fromDate}&end_date=${toDate}`
    return axios({
      url: BASE_NASA_URL + endpointURL,
      method: 'get',
    })
  },
  getMarsRoverPhotos: async function () {
    const endpointURL = `/mars-photos/api/v1/rovers/curiosity/photos?sol=1000`
    return axios({
      url: BASE_NASA_URL + endpointURL,
      method: 'get',
    })
  },
}
