import axios from "axios";

const axiosInstance = axios.create({
	baseURL:
		import.meta.env.VITE_REACT_APP_BACKEND_BASEURL + "api" ||
		"http://localhost:2000",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
