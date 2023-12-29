import axios from "axios";

export const SERVER: string = "http://localhost:8000";

export const API_GROUP_V1_ROUTE: string = "/api/v1";

export const instance = axios.create({
    baseURL: SERVER + API_GROUP_V1_ROUTE,
    timeout: 10000,
})