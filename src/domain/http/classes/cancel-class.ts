// @ts-ignore
import * as constants from "../../constants/api.ts";
import {CancelClass} from "../../constants/response";
import {cancelClassModel} from "../../constants/sub-objects";
import axios from "axios";

export default async function cancelClass(classId: number):
    Promise<{ error: boolean, text: string, data: cancelClassModel }> {
    return await constants.instance.post<CancelClass>(
        "/classes/cancel?classId=" + classId,
        {},
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        return {error: false, text: "Занятие отменено", data: response.data.data};
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
            console.log(error);
            return {error: true, text: "Неизвестная ошибка", data: undefined};
        }
    });
}