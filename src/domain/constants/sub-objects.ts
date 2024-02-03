export type timeAvailability = {
    [key: string]: timeSlot
}

type timeSlot = {
    general: boolean
    half_hour_free: boolean
    hour_free: boolean
    one_half_hour_free: boolean
    two_hour_free: boolean
    two_half_hour_free: boolean
    three_hour_free: boolean
}
export type timeSlotExtended = {
    time: string
    general: boolean
    half_hour_free: boolean
    hour_free: boolean
    one_half_hour_free: boolean
    two_hour_free: boolean
    two_half_hour_free: boolean
    three_hour_free: boolean
}