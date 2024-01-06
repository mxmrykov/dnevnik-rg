// @ts-ignore
import {adminListModel} from "../../constants/users-models.ts";
// @ts-ignore
import * as constants from "../../constants/api.ts";
// @ts-ignore
import {PreloadAdminList} from "../../constants/response.ts";
import axios from "axios";

export default async function PreloadListAdmins():
    Promise<{ error: boolean, message: string, user: adminListModel[] }> {
    if (!
        (localStorage.getItem("role") === "ADMIN")
    ) return Promise.resolve(
        {error: true, message: "Роль пользователя не совпадает для запроса", user: null}
    )
    return await constants.instance.get<PreloadAdminList>(
        "/users/admin/list",
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