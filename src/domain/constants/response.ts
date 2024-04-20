import {
    adminFullModel,
    adminListModel,
    adminModel, coachFullModel,
    coachListModel,
    coachModel, pupilFullModel,
    pupilListModel,
    pupilModel, pupilsBdays
} from "./users-models";
import {cancelClassModel, deleteClassModel, timeAvailability} from "./sub-objects";
import {ShortClassInfo} from "./class";

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

export type getFullCoachResponse = {
    data: coachFullModel,
    status_code: number;
    message: string;
    isError: boolean;
}
export type getFullPupilResponse = {
    data: pupilFullModel,
    status_code: number;
    message: string;
    isError: boolean;
}
export type getPupilsNearestBdayList = {
    data: pupilsBdays[],
    status_code: number;
    message: string;
    isError: boolean;
}
export type getCoachSchedule = {
    data: timeAvailability[],
    status_code: number;
    message: string;
    isError: boolean;
}

export type CreateClassResponse = {
    data: number,
    status_code: number;
    message: string;
    isError: boolean;
}

export type GetTodayClass = {
    data: ShortClassInfo[],
    status_code: number;
    message: string;
    isError: boolean;
}

export type CancelClass = {
    data: cancelClassModel,
    status_code: number,
    message: string,
    isError: boolean
}

export type DeleteClass = {
    data: deleteClassModel,
    status_code: number,
    message: string,
    isError: boolean
}