// @ts-ignore
import {adminModel, coachModel, pupilModel} from "../constants/users-models";
// @ts-ignore
import PreloadPupil from "./preload-pupil.ts";
// @ts-ignore
import PreloadCoach from "./preload-coach.ts";
// @ts-ignore
import PreloadAdmin from "./preload-admin.ts";
// @ts-ignore
import exit from "../app/exit.ts";

export function PreloadUser():
    Promise<{ error: boolean; message: string; user: pupilModel|coachModel|adminModel }> {
    switch (localStorage.getItem("role")) {
        case "PUPIL":
            return PreloadPupil()
        case "COACH":
            return PreloadCoach()
        case "ADMIN":
            return PreloadAdmin()
        default:
            exit()
    }
}