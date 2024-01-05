import {
    adminFullModel,
    adminListModel,
    adminModel,
    coachListModel,
    coachModel,
    pupilListModel,
    pupilModel
} from "./users-models";

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

export type PreloadAdminList = {
    data: adminListModel[]
    status_code: number;
    message: string;
    isError: boolean;
}

export type PreloadCoachList = {
    data: coachListModel[]
    status_code: number;
    message: string;
    isError: boolean;
}

export type PreloadPupilList = {
    data: pupilListModel[]
    status_code: number;
    message: string;
    isError: boolean;
}

export type getFullAdminResponse = {
    data: adminFullModel,
    status_code: number;
    message: string;
    isError: boolean;
}