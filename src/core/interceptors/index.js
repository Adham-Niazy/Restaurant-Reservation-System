import axios from 'axios';
// Setting Global Axios
axios.defaults.baseURL = 'https://api.foodics.dev/v5'
axios.interceptors.request.use((config) => {
  const token = process.env.VUE_APP_AUTH_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});
axios.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  console.error(error)
  return Promise.reject(error)
})