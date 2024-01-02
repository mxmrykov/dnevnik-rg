import {
    newAdminModel,
    newCoachModel,
    newPupilModel,
} from "../../constants/users-models";

export default function isUserValid(user: newCoachModel|newAdminModel|newPupilModel, userRole: string): boolean {
    switch (userRole) {
        case "ADMIN":
            return user?.fio.split(" ").length === 3
        case "COACH":
            return user?.fio.split(" ").length === 3 &&
                user?.home_city.length > 0
    }
}