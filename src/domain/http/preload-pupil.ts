// @ts-ignore
import * as constants from "../constants/api.ts"

// @ts-ignore
import {pupilModel} from "../constants/users-models.ts";
// @ts-ignore
import {PreloadPupilResponse} from "../constants/response.ts";
import axios from "axios";

export default async function PreloadPupil():
    Promise<{ error: boolean, message: string, user: pupilModel }> {
    if (!
        (localStorage.getItem("role") === "PUPIL")
    ) return Promise.resolve(
        {error: true, message: "Роль пользователя не совпадает для запроса", user: null}
    )
    return await constants.instance.get<PreloadPupilResponse>(
        "/users/pupil/get",
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
            return {error: error.response.data.isError, message: error.response.data.message, user: null};
        } else return {error: true, message: "Неизвестная ошибка", user: null};
    })
}