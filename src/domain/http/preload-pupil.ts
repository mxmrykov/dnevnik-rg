// @ts-ignore
import * as constants from "../constants/api.ts"

// @ts-ignore
import {pupilModel} from "../constants/users-models.ts";
// @ts-ignore
import {PreloadPupilResponse} from "../constants/response.ts";
import axios from "axios";

export default async function PreloadPupil():
    Promise<{ error: boolean, message: string, user: pupilModel }> {
    return await constants.instance.get<PreloadPupilResponse>(
        "/users/pupil/get?pupilId=" + localStorage.getItem("key"),
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