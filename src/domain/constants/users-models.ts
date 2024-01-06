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

export type pupilFullModel = {
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
    private: {
        checksum: string;
        last_update: string;
        token: string;
    }
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

export type coachFullModel = {
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
    private: {
        checksum: string;
        last_update: string;
        token: string;
    }
}

export type adminModel = {
    UDID: number;
    key: number;
    fio: string;
    date_reg: string;
    logo_uri: string;
    role: string;
}

export type adminFullModel = {
    UDID: number;
    key: number;
    fio: string;
    date_reg: string;
    logo_uri: string;
    role: string;
    private: {
        checksum: string;
        last_update: string;
        token: string;
    }
}

export type adminListModel = {
    key: number;
    fio: string;
    logo_uri: string;
}

export type coachListModel = {
    key: number;
    fio: string;
    logo_uri: string;
}

export type pupilListModel = {
    key: number;
    fio: string;
    logo_uri: string;
}

export type newAdminModel = {
    fio: string;
    role: string;
}

export type newCoachModel = {
    fio: string;
    role: string;
    home_city: string;
    training_city: string;
    birthday: string;
    about: string;
}

export type newPupilModel = {
    fio: string;
    role: string;
    coach: number;
    home_city: string;
    training_city: string;
    birthday: string;
    about: string;
    coach_review: string;
}