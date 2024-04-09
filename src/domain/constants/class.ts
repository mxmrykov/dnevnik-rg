export type Class = {
    pupils: number[],
    capacity: number,
    coach: number,
    classDate: string,
    classTime: string,
    duration: string,
    price: number,
    classType: string,
    isOpen: boolean,
}

export type ShortClassInfo = {
    key: number,
    coach: string,
    pupil: string[],
    class_time: string,
    class_duration: string,
    class_type: string,
    pupil_count: number,
    is_open_to_sign_up: boolean,
}