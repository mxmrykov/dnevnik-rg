// @ts-ignore
import {deleteClassModel} from "../../constants/sub-objects.ts";
// @ts-ignore
import * as constants from "../../constants/api.ts";
// @ts-ignore
import {DeletePupil} from "../../constants/response.ts";
import axios from "axios";

export default async function archivePupil(pupilId: number):
    Promise<{ error: boolean, text: string, data: deleteClassModel }> {
    return await constants.instance.post<DeletePupil>(
        "/users/pupil/archive?pupilId=" + pupilId,
        {},
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        return {error: false, text: "Ученица архивирована", data: response.data.data};
    }).catch(error => {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") return {
                error: true,
                text: "Ошибка получения данных с сервера",
                data: undefined
            };
            if (error.response?.status === 401) {
                return {error: true, text: "Неверные данные авторизации", data: undefined};
            } else if (error.response?.status === 400) {
                return {error: true, text: "Заполните поля правильно", data: undefined};
            } else return {error: true, text: "Ошибка запроса", data: undefined};
        } else {
            return {error: true, text: "Неизвестная ошибка", data: undefined};
        }
    });
}