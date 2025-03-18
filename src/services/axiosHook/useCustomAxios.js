import axios from 'axios'
import { useEffect } from 'react'

axios.defaults.baseURL = 'http://192.168.1.181:8080'

const useCustomAxios = () => {
	useEffect(() => {
		const requestInterceptor = axios.interceptors.request.use(
			(config) => {
				config.headers['Accept'] = '*/*'
				config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQURNIiwiRGVwYXJ0bWVudCI6IlRFU1QiLCJDb21wYW55IjoiVEVTVCIsIkxhbmd1YWdlIjoiRU5HIiwiQ3VycmVuY3kiOiJURVNUIiwiRGl2aXNpb24iOiJURVNUIiwic3ViIjoiQ0xKTyIsImlhdCI6MTc0MTg2Mzg1NiwiZXhwIjoxNzQxODkyNjU2fQ.fOP3MMBcMnujR_lY8se840mHUJVFsIQ1NhGrzEY-Q7M`
				return config
			},
			(error) => {
				return Promise.reject(error)
			}
		)

		const responseInterceptor = axios.interceptors.response.use(
			(response) => {
				return response
			},
			(error) => {
				console.log('error')
				return Promise.reject(error)
			}
		)

		return () => {
			axios.interceptors.request.eject(requestInterceptor)
			axios.interceptors.response.eject(responseInterceptor)
		}
	}, [])

	return axios
}

export default useCustomAxios

