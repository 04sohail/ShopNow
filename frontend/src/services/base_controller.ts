import axios from "axios";

export const api = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "http://192.168.0.32:8000",
});
