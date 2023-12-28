import {adminModel, coachModel, pupilModel} from "./users-models";

export type PreloadPupilResponse = {
    data: pupilModel
    status_code: number;
    message: string;
    isError: boolean;
}
export type PreloadCoachResponse = {
    data: coachModel
    status_code: number;
    message: string;
    isError: boolean;
}
export type PreloadAdminResponse = {
    data: adminModel
    status_code: number;
    message: string;
    isError: boolean;
}