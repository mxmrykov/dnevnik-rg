import {
    newAdminModel,
    newCoachModel,
    newPupilModel,
} from "../../constants/users-models";

export default function isAdminValid(user: newAdminModel): boolean {
    return user?.fio.split(" ").length === 3
}

export function isCoachValid(user: newCoachModel): boolean {
    return user?.fio.split(" ").length === 3
        && user?.home_city.length > 0
        && user?.training_city.length > 0
        && user?.birthday.length > 0
}

export function isPupilValid(user: newPupilModel): boolean {
    return user?.fio.split(" ").length === 3
        && user?.home_city.length > 0
        && user?.training_city.length > 0
        && user?.birthday.length > 0
        && user?.coach > 1000000000
}