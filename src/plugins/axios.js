import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjAwYzZjOGY0MWFmMmFmNDg3N2ZhYjViZDIxYzQ4ZSIsInN1YiI6IjY1MDlhYTVlNDJkOGE1N2U5YjhlYmJhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pRl3s7X8-nixuy5BrdoOHbtoLjOlSeuCnr0ccr-ZeQ8`
  }
})

export default api
