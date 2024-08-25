import axios from "axios";

let api_port: string = "8000"

if (process.env.REACT_APP_BUILD_E === "stage") api_port = "8001"

let HOST: string = "http://localhost:"

if (process.env.REACT_APP_HOST !== "") HOST = process.env.REACT_APP_HOST

let SERVER: string = HOST + api_port;

export const API_GROUP_V1_ROUTE: string = "/api/v1";

export const instance = axios.create({
    baseURL: SERVER + API_GROUP_V1_ROUTE,
    timeout: 10000,
})