export default function exit() {
    localStorage.removeItem("key")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    window.location.href = '/auth'
}