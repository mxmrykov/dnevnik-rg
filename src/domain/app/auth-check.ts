let roles: string[];
roles = ["PUPIL", "ADMIN", "COACH"];

export default function authValid(): boolean {
    return localStorage.getItem("token")?.length === 235 &&
        localStorage.getItem("key")?.length === 10 &&
        roles.includes(localStorage.getItem("role"))
}