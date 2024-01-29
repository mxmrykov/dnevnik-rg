// @ts-ignore
import * as constants from "../constants/api.ts"

// @ts-ignore
import {coachModel} from "../constants/users-models.ts";
// @ts-ignore
import {PreloadCoachResponse} from "../constants/response.ts";
import axios from "axios";

export default async function PreloadCoach():
    Promise<{ error: boolean, message: string, user: coachModel }> {
    if (!
        (localStorage.getItem("role") === "COACH")
    ) return Promise.resolve(
        {error: true, message: "Роль пользователя не совпадает для запроса", user: null}
    )
    return await constants.instance.get<PreloadCoachResponse>(
        "/users/coach/get?coachId=" + localStorage.getItem("key"),
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