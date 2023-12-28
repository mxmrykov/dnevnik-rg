// @ts-ignore
import React, {useEffect, useState} from "react";
import "../../css/preset.css"
import "../../css/global.css"
//@ts-ignore
import authValid from "../../../domain/app/auth-check.ts";
//@ts-ignore
import exit from "../../../domain/app/exit.ts";
//@ts-ignore
import PreloadPupil from "../../../domain/http/preload-pupil.ts";
//@ts-ignore
import Message from "../message-aside/Message.tsx";
import {adminModel, coachModel, pupilModel} from "../../../domain/constants/users-models";
//@ts-ignore
import {PreloadUser} from "../../../domain/http/user-preload.ts";
//@ts-ignore
import AdminSidebar from "../blocks/side-menu/Admin-sidebar.tsx";
//@ts-ignore
import Notifications from "../blocks/Notifications.tsx";

export default function Homepage() {
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
        {AdminSidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
    </section>
}