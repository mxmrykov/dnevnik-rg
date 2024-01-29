// @ts-ignore
import * as constants from "../../constants/api.ts";
import axios from "axios";
// @ts-ignore
import {getFullAdminResponse} from "../../constants/response.ts";
import {adminFullModel} from "../../constants/users-models";

export default async function NewAdmin(fio: string):
    Promise<{ error: boolean, text: string, data: adminFullModel}> {
    return await constants.instance.post<getFullAdminResponse>(
        "/users/admin/create",
        {
            fio: fio
        },
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        return {error: false, text: "Данные получены", data: response.data.data};
    }).catch(error => {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") return {error: true, text: "Ошибка получения данных с сервера", data: undefined};
            if (error.response?.status === 401) {
                return {error: true, text: "Неверные данные для входа", data: undefined};
            } else if (error.response?.status === 400) {
                return {error: true, text: "Заполните поля правильно", data: undefined};
            } else return {error: true, text: "Ошибка запроса", data: undefined};
        } else {
            console.log(error);
            return {error: true, text: "Неизвестная ошибка", data: undefined};
        }
    });
}