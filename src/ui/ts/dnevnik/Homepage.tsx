// @ts-ignore
import React, {useState} from "react";
import "../../css/preset.css"
import "../../css/global.css"
import "../../css/pages/homepage.css"
//@ts-ignore
import authValid from "../../../domain/app/auth-check.ts";
//@ts-ignore
import exit from "../../../domain/app/exit.ts";
//@ts-ignore
import Message from "../message-aside/Message.tsx";
import {adminModel, coachModel, pupilModel} from "../../../domain/constants/users-models";
//@ts-ignore
import {PreloadUser} from "../../../domain/http/user-preload.ts";
//@ts-ignore
import AdminSidebar from "../blocks/side-menu/Admin-sidebar.tsx";
//@ts-ignore
import Notifications from "../blocks/Notifications.tsx";
// @ts-ignore
import getGreeting, {greeting} from "../../../domain/app/get-greeting.ts";
// @ts-ignore
import XlHeader, {XlHeaderColored} from "../elements/headers/Xl-header.tsx";
// @ts-ignore
import Space from "../elements/headers/Space.tsx";
// @ts-ignore
import GetDayOfWeek from "../../../domain/app/get-day-of-week.ts";

export default function Homepage() {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [greeting] = useState<greeting>(getGreeting())
    if (!dataPreloaded) {
        if (!authValid()) exit()
        PreloadUser().then(r => {
            if (r.error) {
                setMessage(Message("ERROR", r.message))
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
            } else {
                setUser(r.user)
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                setMessage(Message("SUCCESS", r.message))
            }
        })
        setDataPreloaded(true)
    }
    return <section className={"home-section"}>
        {message}
        {AdminSidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
        <section className={"homepage-section"}>
            <header className={"line"}>
                <div className={"greeting-header-home line"}>
                    <img alt={"greeting"} className={"image-s"} src={greeting?.src}/>
                    <article>
                        <h3 style={{color: "white"}}>{greeting?.greeting},</h3>
                        {XlHeaderColored(user?.fio?.split(" ")[1] + "!")}
                    </article>
                </div>
                <div className={"greeting-header-home line"}>
                    <h1 style={{fontSize: "3.5rem"}}>{GetDayOfWeek()}</h1>
                    <article>
                        <h3 style={{color: "white"}}>{greeting?.greeting},</h3>
                        {XlHeaderColored(user?.fio?.split(" ")[1] + "!")}
                    </article>
                </div>
            </header>
            <article className={"full-width-window-homepage"}>
                <header className={"line"}>
                    {XlHeader("Ближайшие дни", {color: "white"})}
                    {Space()}
                    {XlHeaderColored("рождения:")}
                </header>
                <data>

                </data>
            </article>
            <article className={"full-width-window-homepage"}>
                <header className={"line"}>
                    {XlHeader("Предстоящие", {color: "white"})}
                    {Space()}
                    {XlHeaderColored("занятия:")}
                </header>
                <data>

                </data>
            </article>
        </section>
    </section>
}