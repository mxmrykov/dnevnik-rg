// @ts-ignore
import {Class} from "../../constants/class";
// @ts-ignore
import * as constants from "../../constants/api.ts";
import {CreateClassResponse} from "../../constants/response";
import axios from "axios";

export default async function createClass(classInfo: Class):
    Promise<{ error: boolean, text: string, data: number }> {
    if (classInfo.classType === "single") {
        classInfo.capacity = 1
    }
    return await constants.instance.post<CreateClassResponse>(
        "/classes/new",
        {
            pupil: classInfo.pupils,
            coach: classInfo.coach,
            capacity: classInfo.capacity,
            classDate: classInfo.classDate,
            classTime: classInfo.classTime,
            duration: classInfo.duration,
            price: classInfo.price,
            classType: classInfo.classType.toUpperCase(),
            isOpen: classInfo.isOpen
        },
        {
            headers: {
                "X-User-Id": localStorage.getItem("key"),
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    ).then(response => {
        return {error: false, text: "Занятие создано", data: response.data.data};
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