// @ts-ignore
import {pupilsBdays} from "../../constants/users-models.ts";
// @ts-ignore
import * as constants from "../../constants/api.ts";
// @ts-ignore
import {getPupilsNearestBdayList} from "../../constants/response.ts";
import axios from "axios";

export default async function GetNearestBdays():
    Promise<{ error: boolean, message: string, bdayList: pupilsBdays[] }> {
    if (!
        (localStorage.getItem("role") === "ADMIN" ||
            localStorage.getItem("role") === "COACH")
    ) return Promise.resolve(
        {error: true, message: "Роль пользователя не совпадает для запроса", bdayList: null}
    )
    return await constants.instance.get<getPupilsNearestBdayList>(
        "/additional/birthday/list?coachId=" + localStorage.getItem("key"),
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(response => {
        return {error: false, message: response.data.message, bdayList: response.data.data}
    }).catch(error => {
        if (axios.isAxiosError(error)) {
            return {error: error.response.data.isError, message: error.response.data.message, bdayList: null};
        } else return {error: true, message: "Неизвестная ошибка", bdayList: null};
    })
}