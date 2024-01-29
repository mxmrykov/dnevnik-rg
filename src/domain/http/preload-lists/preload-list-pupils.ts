// @ts-ignore
import {pupilListModel} from "../../constants/users-models.ts";
// @ts-ignore
import * as constants from "../../constants/api.ts";
// @ts-ignore
import {PreloadPupilList} from "../../constants/response.ts";
import axios from "axios";

export default function PreloadListPupils():
    Promise<{ error: boolean, message: string, user: pupilListModel[]}> {
    if (!
        (localStorage.getItem("role") === "ADMIN")
    ) return Promise.resolve(
        {error: true, message: "Роль пользователя не совпадает для запроса", user: null}
    )
    return constants.instance.get<PreloadPupilList>(
        "/users/pupil/list",
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