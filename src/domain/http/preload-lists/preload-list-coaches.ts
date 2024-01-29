// @ts-ignore
import {coachListModel} from "../../constants/users-models.ts";
// @ts-ignore
import * as constants from "../../constants/api.ts";
// @ts-ignore
import {PreloadCoachList} from "../../constants/response.ts";
import axios from "axios";

export default async function PreloadListCoaches():
    Promise<{ error: boolean, message: string, user: coachListModel[] }> {
    if (!
        (localStorage.getItem("role") === "ADMIN")
    ) return Promise.resolve(
        {error: true, message: "Роль пользователя не совпадает для запроса", user: null}
    )
    return await constants.instance.get<PreloadCoachList>(
        "/users/coach/list",
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token")
            }
        }

    ).then(response => {
        return {error: false, message: response.data.message, user: response.data.data}
    }).catch(error => {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") return {error: true, message: "Ошибка получения данных с сервера", user: undefined};
            return {error: error.response.data.isError, message: error.response.data.message, user: null};
        } else return {error: true, message: "Неизвестная ошибка", user: null};
    })
}