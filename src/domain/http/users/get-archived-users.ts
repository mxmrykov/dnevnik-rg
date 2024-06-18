import {coachListModel, pupilListModel} from "../../constants/users-models";
// @ts-ignore
import * as constants from "../../constants/api.ts";
// @ts-ignore
import {PreloadCoachList, PreloadPupilList} from "../../constants/response.ts";
import axios from "axios";

export default async function GetArchivedUsers(type: string):
    Promise<{ error: boolean, text: string, data: pupilListModel[] | coachListModel[] }> {
    return await constants.instance.get<PreloadPupilList | PreloadCoachList>(
        "/users/" + type + "/archive/get",
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        return {error: false, text: "Список архивированных пользователей получен", data: response.data.data};
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