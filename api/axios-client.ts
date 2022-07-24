import axios from 'axios'
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
interface ServerResponse {
  data: any
}

const axiosClient = axios.create({
	baseURL: publicRuntimeConfig.apiUrl || 'https://api.gameforearn.com',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true
})

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response: ServerResponse) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error.response.data)
	}
)

export default axiosClient