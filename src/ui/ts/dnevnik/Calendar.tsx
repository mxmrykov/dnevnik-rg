// @ts-ignore
import React, {useState} from "react";
// @ts-ignore
import Sidebar from "../blocks/side-menu/Sidebar.tsx";
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
// @ts-ignore
import {adminModel, coachModel, pupilModel} from "../../../domain/constants/users-models.ts";
// @ts-ignore
import authValid from "../../../domain/app/auth-check.ts";
// @ts-ignore
import exit from "../../../domain/app/exit.ts";
// @ts-ignore
import {PreloadUser} from "../../../domain/http/user-preload.ts";
// @ts-ignore
import Message from "../message-aside/Message.tsx";
// @ts-ignore
import XlHeader, {XlHeaderColored} from "../elements/headers/Xl-header.tsx";
import {FaPlus} from "react-icons/fa6";

export default function Calendar(): React.JSX.Element {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
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
        {Sidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
        <section className={"homepage-section"}>
            <header className={"line"} style={{justifyContent: "space-between"}}>
                <div className={"greeting-header-home col-center"}>
                    {XlHeaderColored("Календарь")}
                </div>
                <a href={"/calendar/create"} className={"button-basic line"}
                   style={{justifyContent: "space-between", marginInline: 12}}>
                    <FaPlus size={20} style={{marginRight: 5}}/>
                    Новое занятие
                </a>
            </header>
            <article className={"full-width-window-homepage"}>
                <header className={"line"}>
                    {XlHeader("Фильтры", {color: "white"})}
                </header>
                <div
                    className={"line"}
                    style={{margin: 15}}
                >
                    <span className={"line"}>
                            <label style={{color: "white", textAlign: "left", marginInline: 10}}>Период</label>
                            <select
                                className={"input-translucent"}
                                style={{padding: "7px 12px"}}>
                                    <option value="day">День</option>
                                    <option value="month">Месяц</option>
                            </select>
                        </span>
                    {/*<span className={"line"}>*/}
                    {/*    <input type={"checkbox"}/>*/}
                    {/*    <label style={{color: "white", textAlign: "left", marginInline: 10}}>Оплаченные</label>*/}
                    {/*</span>*/}
                </div>
            </article>
        </section>
    </section>
}