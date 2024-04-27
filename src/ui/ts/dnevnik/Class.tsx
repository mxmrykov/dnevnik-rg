// @ts-ignore
import React, {useState} from "react";
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
import Sidebar from "../blocks/side-menu/Sidebar.tsx";
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
import {useParams} from "react-router-dom";
// @ts-ignore
import {XlHeaderColored} from "../elements/headers/Xl-header.tsx";
// @ts-ignore
import GetClassInfo from "../../../domain/http/classes/get-class-info.ts";
// @ts-ignore
import {InnerTokenModel} from "../../../domain/constants/jwt.ts";
// @ts-ignore
import {ShortClassInfo} from "../../../domain/constants/class.ts";
// @ts-ignore
import ClassInfoBlock from "../blocks/calendar/ClassInfoBlock.tsx";
// @ts-ignore
import ClassNotFound from "../blocks/calendar/ClassNotFound.tsx";

export default function Class(): React.JSX.Element {

    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dialog, setDialog] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [classInfo, setClassInfo] = useState<ShortClassInfo>()
    const [classNotFound, setClassNotFound] = useState<boolean>(false)

    const [tokenPayload] = useState<InnerTokenModel>(
        JSON.parse(
            atob(
                localStorage.getItem("token").split(".")[1]
            )
        )
    )

    let {id} = useParams();

    const DATE = new Date()
    const [today] = useState<string>(
        DATE.getFullYear().toString() +
        "-" + ((DATE.getMonth() + 1) < 10 ? "0" + (DATE.getMonth() + 1).toString() : (DATE.getMonth() + 1).toString()) +
        "-" + (DATE.getDate() < 10 ? "0" + DATE.getDate().toString() : DATE.getDate().toString())
    )

    if (!dataPreloaded) {
        if (!authValid()) exit()
        PreloadUser().then(r => {
            if (r.error) {
                setMessage(Message("ERROR", r.message))
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                return
            } else {
                setUser(r.user)
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                setMessage(Message("SUCCESS", r.message))

            }
            GetClassInfo(
                "/classes/get/" + tokenPayload.role.toLowerCase() + "?classId=" + id
            ).then(response => {
                if (response.error) {
                    if (response.message === "Занятия не существует") {
                        setClassNotFound(true)
                        return
                    }
                    setMessage(Message("ERROR", "Ошибка загрузки данных о занятии"))
                    setTimeout(() => {
                        setMessage(<React.Fragment></React.Fragment>)
                    }, 5100)
                    return
                }
                setMessage(Message("INFO", "Данные получены"))
                setTimeout(() => {
                    setMessage(<React.Fragment></React.Fragment>)
                }, 5100)
                setClassInfo(response.classes)
            })
        })

        setDataPreloaded(true)
    }

    return <section className={"home-section"}>
        {message}
        {Sidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
        {dialog}
        <section className={"homepage-section"}>
            <header className={"line"} style={{justifyContent: "space-between"}}>
                <div className={"greeting-header-home col-center"}>
                    {XlHeaderColored("Информация о занятии")}
                </div>
            </header>
            {classNotFound ?
                <section style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ClassNotFound/>
                </section>
                :
                <ClassInfoBlock classInfo={classInfo}/>
            }
        </section>
    </section>
}