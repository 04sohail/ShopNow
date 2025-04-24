import axios from "axios";
export const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("Inside error interceptor", error);
        if (error.response && error.response.status === 401) {
            if (error.response.data.detail === "Missing token") {
                console.log("redirecting to login due to token expiry");
                window.location.href = "/login"; // Redirect on token expiry
            }
        }
        return Promise.reject(error);
    }
);

export default api;