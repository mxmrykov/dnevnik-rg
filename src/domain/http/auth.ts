type AuthResponse = ({
    data: {

    }
    StatusCode: number;
    Message: string;
    IsError: boolean;
})
export default function Authorize(user: { xUserId: string; password: string; }):
    { error: boolean, text: string} {
    let xUserId = user.xUserId, checksum = user.password
    if (xUserId?.length != 10) {
        return {error: true, text: "Логин должен содержать 10 цифр"}
    }
    if (checksum?.length != 7) {
        return {error: true, text: "Пароль должен содержать 7 символов"}
    }

}
