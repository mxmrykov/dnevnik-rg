// @ts-ignore
import morning from "../../ui/content/day-icons/morning.png"
// @ts-ignore
import day from "../../ui/content/day-icons/day.png"
// @ts-ignore
import evening from "../../ui/content/day-icons/evening.png"
// @ts-ignore
import night from "../../ui/content/day-icons/night.png"

export type greeting = {
    greeting: string;
    src: morning|day|evening|night;
}
export default function getGreeting(): greeting {
    let date = new Date(), time = date.getHours();

    switch (time === 0) {
        case time > 22 || time < 6:
            return {greeting: "Доброй ночи", src: night}
        case time >= 6 && time < 10:
            return {greeting: "Доброе утро", src: morning}
        case time >= 10 && time < 16:
            return {greeting: "Добрый день", src: day}
        case time >= 16 && time <= 22:
            return {greeting: "Добрый вечер", src: evening}
    }
}