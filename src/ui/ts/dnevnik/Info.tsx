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
// @ts-ignore
import Space from "../elements/headers/Space.tsx";
import {MdDownload} from "react-icons/md";

function importAll(r: any) {
    return r.keys().map(r);
}

// @ts-ignore
const rules = importAll(require.context("../../content/documents/rules", false, /\.(jpg)$/))

export default function Info(): React.JSX.Element {
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
        <section
            className={"homepage-section"}
            style={{marginBottom: 25}}>
            <header className={"line"} style={{justifyContent: "space-between"}}>
                <div className={"greeting-header-home col-center"}>
                    {XlHeader("Условия", {color: "white"})}
                    {Space()}
                    {XlHeaderColored("пользования")}
                </div>
                <a
                    className={"button-basic line"}
                    style={{justifyContent: "space-between", marginInline: 12}}
                    href={"/rules.pdf"}
                    download={true}
                >
                    <MdDownload size={20}/>
                    <p>Скачать</p>
                </a>
            </header>
            <section className={"document-parent"}>
                {
                    rules?.map((page: any, key: number) => {
                        return <img className={"document-page"} src={page} alt={key.toString()}/>
                    })
                }
            </section>
        </section>
    </section>
}