export const JWT_SECRET = "fb72b59c761f46c0690fdff1e15"

export type InnerTokenModel = {
    key: number,
    check_sum: string,
    role: string,
    exp: number,
    iss: string
}