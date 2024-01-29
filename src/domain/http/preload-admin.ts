// @ts-ignore
import * as constants from "../constants/api.ts"

// @ts-ignore
import {adminModel} from "../constants/users-models.ts";
// @ts-ignore
import {PreloadAdminResponse} from "../constants/response.ts";
import axios from "axios";

export default async function PreloadAdmin():
    Promise<{ error: boolean, message: string, user: adminModel }> {
    if (!
        (localStorage.getItem("role") === "ADMIN")
    ) return Promise.resolve(
        {error: true, message: "Роль пользователя не совпадает для запроса", user: null}
    )
    return await constants.instance.get<PreloadAdminResponse>(
        "/users/admin/get",
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token")
            }
        }

    ).then(response => {
        return {error: false, message: response?.data?.message, user: response?.data?.data}
    }).catch(error => {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") return {error: true, message: "Ошибка получения данных с сервера", user: null};
            return {error: true, message: error.response?.data?.message, user: null};
        } else {
            return {error: true, message: "Неизвестная ошибка", user: null};
        }
    })
}