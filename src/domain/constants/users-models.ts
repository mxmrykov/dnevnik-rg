export type pupilModel = {
    UDID: number;
    key: number;
    fio: string;
    date_reg: string;
    logo_uri: string;
    role: string;
    coach: number;
    home_city: string;
    training_city: string;
    birthday: string;
    about: string;
    coach_review: string;
}

export type coachModel = {
    UDID: number;
    key: number;
    fio: string;
    date_reg: string;
    logo_uri: string;
    role: string;
    home_city: string;
    training_city: string;
    birthday: string;
    about: string;
}

export type adminModel = {
    UDID: number;
    key: number;
    fio: string;
    date_reg: string;
    logo_uri: string;
    role: string;
}