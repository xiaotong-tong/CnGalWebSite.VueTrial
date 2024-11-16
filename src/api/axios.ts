import axios from "axios";

const http = axios.create({
	baseURL: "https://api.cngal.org"
});

// http.interceptors.request.use(
// 	(config) => {
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

export default http;
