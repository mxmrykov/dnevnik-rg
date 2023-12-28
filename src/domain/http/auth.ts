// @ts-ignore
import * as constants from "../constants/api.ts"
import axios from "axios";

type AuthResponse = {
    data: {
        key: number;
        token: string;
        role: string;
    }
    StatusCode: number;
    Message: string;
    IsError: boolean;
}
export default function Authorize(user: { xUserId: string; password: string; }):
    Promise<{ error: boolean, text: string }> {
    let xUserId = user.xUserId, checksum = user.password
    return constants.instance.post<AuthResponse>(
        "/auth",
        {
            checksum: checksum
        }, {
            headers: {
                "X-User-Id": xUserId,
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        localStorage.setItem("key", response.data.data.key.toString())
        localStorage.setItem("token", response.data.data.token)
        localStorage.setItem("role", response.data.data.role)
        return {error: false, text: "Данные получены"};
    }).catch(error => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status == 401) {
                return {error: true, text: "Неверные данные для входа"};
            } else if (error.response?.status == 400) {
                return {error: true, text: "Заполните поля правильно"};
            } else return {error: true, text: "Ошибка запроса"};
        } else {
            console.log(error);
            return {error: true, text: "Неизвестная ошибка"};
        }
    });
}
