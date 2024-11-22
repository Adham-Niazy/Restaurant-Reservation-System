import axios from 'axios';

const customAxiosInstance = axios.create();

customAxiosInstance.defaults.baseURL = 'https://api.foodics.dev/v5';
// Setting Global Axios
customAxiosInstance.interceptors.request.use((config) => {
  const token = process.env.VUE_APP_AUTH_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});
customAxiosInstance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  console.error(error)
  return Promise.reject(error)
})

export default customAxiosInstance;