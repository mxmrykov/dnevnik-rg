// @ts-ignore
import * as constants from "../../constants/api.ts";
import axios from "axios";
// @ts-ignore
import {getFullAdminResponse, getFullCoachResponse, getFullPupilResponse} from "../../constants/response.ts";
import {
    newPupilModel,
    pupilFullModel
    // @ts-ignore
} from "../../constants/users-models.ts";

export default async function NewPupil
(pupil: newPupilModel):
    Promise<{ error: boolean, text: string, data: pupilFullModel}> {
    return await constants.instance.post<getFullPupilResponse>(
        "/users/pupil/create",
        {
            fio: pupil.fio,
            home_city: pupil.home_city,
            training_city: pupil.training_city,
            birthday: pupil.birthday,
            coach: Number(pupil.coach),
            about: pupil.about,
            coach_review: pupil.coach_review
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