import axios from 'axios'

export default axios.create({
  baseURL: process.env.REACT_APP_TOORNAMENT_API_URI,
  headers: {'X-Api-Key': process.env.REACT_APP_TOORNAMENT_API_KEY}
})