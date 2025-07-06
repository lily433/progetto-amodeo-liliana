/*
Chiamate Ajax alle API della Nasa
* libreria axios
*/

import axios from 'axios'

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
  getDayPic: async function () {
    const endpointURL = '/planetary/apod?date=2025-07-05'
    return axios({
      url: BASE_NASA_URL + endpointURL,
      method: 'get',
    })
  },
}
