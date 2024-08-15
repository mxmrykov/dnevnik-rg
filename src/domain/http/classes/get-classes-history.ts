// @ts-ignore
import {ShortClassInfo} from "../../constants/class.ts";
// @ts-ignore
import * as constants from "../../constants/api.ts";
// @ts-ignore
import {GetTodayClass} from "../../constants/response.ts";
import axios from "axios";

export default async function GetClassesHistory(route: string, filteredCoachID: string, filteredPupilID: string):
    Promise<{ error: boolean, message: string, classes: ShortClassInfo[] }> {
    let additionalRoute = "?"

    filteredCoachID !== undefined && filteredCoachID !== null && (additionalRoute += `filterCoachID=${filteredCoachID}&`)
    filteredPupilID !== undefined && filteredPupilID !== null && (additionalRoute += `filterPupilID=${filteredPupilID}&`)

    return await constants.instance.get<GetTodayClass>(
        route + additionalRoute,
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token")
            }
        }
    ).then(response => {
        return {error: false, message: response.data.message, classes: response.data.data}
    }).catch(error => {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") return {
                error: true,
                message: "Ошибка получения данных с сервера",
                classes: undefined
            };
            return {error: error.response.data.isError, message: error.response.data.message, classes: null};
        } else return {error: true, message: "Неизвестная ошибка", classes: null};
    })
}