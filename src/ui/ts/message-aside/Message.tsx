import { MdErrorOutline, MdOutlineInfo } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
// @ts-ignore
import Space from "../elements/headers/Space.tsx";

export default function Message(windowType: string, message: string) {
    switch (windowType) {
        case "INFO":
            return <article className={"dialog-message info-colored line"}>
                <MdOutlineInfo color={"#575EFF"} size={25}/>
                {Space()}
                <p>{message}</p>
            </article>
        case "ERROR":
            return <article className={"dialog-message error-colored line"}>
                <MdErrorOutline color={"#C1445C"} size={25}/>
                {Space()}
                <p>{message}</p>
            </article>
        case "SUCCESS":
            return <article className={"dialog-message success-colored line"}>
                <GrStatusGood color={"#077409"} size={25}/>
                {Space()}
                <p>{message}</p>
            </article>
    }
}