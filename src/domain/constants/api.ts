import axios from "axios";

let api_port: string = "8000"

console.log(process.env)

if (process.env.BUILD_ENV === "stage") api_port = "8001"

export var SERVER: string = "http://localhost:" + api_port;

export const API_GROUP_V1_ROUTE: string = "/api/v1";

export const instance = axios.create({
    baseURL: SERVER + API_GROUP_V1_ROUTE,
    timeout: 10000,
})