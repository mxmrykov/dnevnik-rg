// @ts-ignore
import * as constants from "../../constants/api.ts";
import axios from "axios";
// @ts-ignore
import {getFullAdminResponse, getFullCoachResponse} from "../../constants/response.ts";
// @ts-ignore
import {adminFullModel, coachFullModel, newCoachModel} from "../../constants/users-models.ts";

export default async function
(coach: newCoachModel):
    Promise<{ error: boolean, text: string, data: coachFullModel}> {
    return await constants.instance.post<getFullCoachResponse>(
        "/users/coach/create",
        {
            fio: coach.fio,
            home_city: coach.home_city,
            training_city: coach.training_city,
            birthday: coach.birthday,
            about: coach.about
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