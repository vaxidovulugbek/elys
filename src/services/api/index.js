import axios from "axios";
import { storage } from "services/storage";
import config from "config";

export const httpCLient = axios.create({
	baseURL: config.baseUrl,
});

httpCLient.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = `Bearer ${storage.get("token")}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// request.interceptors.response.use(
// 	(response) => {
// 		console.log(response);
// 	},
// 	(error) => {
// 		console.log(error);
// 		return Promise.reject(error);
// 	}
// );

// request.defaults.params = {};
// request.defaults.params["_f"] = "json";
// request.defaults.headers.common["Accept"] = "application/json";
// request.defaults.headers.common["Cache-Control"] = "no-cache";
// request.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";
