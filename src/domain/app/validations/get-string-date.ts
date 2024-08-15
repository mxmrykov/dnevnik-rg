export default function getStringDate(): string {
    const DATE = new Date()
    return DATE.getFullYear() + "-" +
        (DATE.getMonth() + 1 > 9 ? DATE.getMonth() + 1 : "0" + (DATE.getMonth() + 1).toString())
        + "-" + (DATE.getDate() > 9 ? DATE.getDate() : "0" + DATE.getDate().toString())
}