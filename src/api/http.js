import axios from 'axios'
const http = axios.create({
  baseURL: 'https://www.easy-mock.com/mock/5b84cf91f7615d46c8184b1e/smailMall',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
const handleRequestSuccess = (config) => {
  return config
}
const handleRequestError = (error) => {
  return Promise.reject(error)
}
const handleResponseSuccess = (response) => {
  console.log(response)
  console.log(response.data)
  // if (response.status === 200) {
  //   return response.data
  // }
}
const handleResponseError = (error) => {
  return Promise.reject(error)
}
http.interceptors.request.use(handleRequestSuccess, handleRequestError)
http.interceptors.response.use(handleResponseSuccess, handleResponseError)
export {
  http
}
