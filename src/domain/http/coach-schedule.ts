// @ts-ignore
import * as constants from "../constants/api.ts"

// @ts-ignore
import {getCoachSchedule} from "../constants/response.ts";
import axios from "axios";
// @ts-ignore
import {timeAvailability} from "../constants/sub-objects.ts";

export default async function GetCoachSchedule(coachId: number, date: string):
    Promise<{ error: boolean, message: string, schedule: timeAvailability[] }> {
    if (!
            (localStorage.getItem("role") === "ADMIN")
        || (localStorage.getItem("role") === "COACH")
    ) return Promise.resolve(
        {error: true, message: "Роль пользователя не совпадает для запроса", schedule: null}
    )
    return await constants.instance.get<getCoachSchedule>(
        `/classes/coach/schedule?coachId=${coachId}&date=${date}`,
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(response => {
        return {error: false, message: response?.data?.message, schedule: response?.data?.data}
    }).catch(error => {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") return {
                error: true,
                message: "Ошибка получения данных с сервера",
                schedule: null
            };
            return {error: true, message: error.response?.data?.message, schedule: null};
        } else {
            return {error: true, message: "Неизвестная ошибка", schedule: null};
        }
    })
}