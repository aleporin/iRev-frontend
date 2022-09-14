import axios from 'axios'

export const BASE_URL = 'http://localhost:3001/api'

// export const BASE_URL = 'https://irev-backend.herokuapp.com/api'

const Client = axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
