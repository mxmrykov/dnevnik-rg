// @ts-ignore
import React, {useState} from "react";
import "../../css/pages/userspage.css"
// @ts-ignore
import AdminSidebar from "../blocks/side-menu/Admin-sidebar.tsx";
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
// @ts-ignore
import {adminListModel, adminModel, coachModel, pupilModel} from "../../../domain/constants/users-models.ts";
// @ts-ignore
import authValid from "../../../domain/app/auth-check.ts";
// @ts-ignore
import exit from "../../../domain/app/exit.ts";
// @ts-ignore
import {PreloadUser} from "../../../domain/http/user-preload.ts";
// @ts-ignore
import Message from "../message-aside/Message.tsx";
// @ts-ignore
import PageForbidden from "../blocks/forbidden/Page-forbidden.tsx";
// @ts-ignore
import XlHeader, {XlHeaderColored} from "../elements/headers/Xl-header.tsx";
import {IoPersonAddSharp} from "react-icons/io5";
import {IoIosArrowForward} from "react-icons/io";
// @ts-ignore
import PreloadListAdmins from "../../../domain/http/preload-lists/preload-list-admins.ts";

export default function UsersPage(): React.JSX.Element {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [shortAdminList, setShortAdminList] = useState<adminListModel[]>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [dropDownAdminsActive, setDropDownAdminsActive] = useState<boolean>(false)
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
        PreloadListAdmins().then(r => {
            if (r.error) {
                setMessage(Message("ERROR", r.message))
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
            } else {
                setShortAdminList(r.user)
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
        {user?.role === "ADMIN" ? <React.Fragment>
                <section className={"homepage-section"}>
                    <header className={"line"} style={{justifyContent: "space-between"}}>
                        <div className={"greeting-header-home col-center"}>
                            {XlHeaderColored("Пользователи")}
                        </div>
                        <a href={"/users/create"} className={"button-basic line"}
                           style={{justifyContent: "space-between", marginInline: 12}}>
                            <IoPersonAddSharp size={20}/>
                            Создать
                        </a>
                    </header>
                    <article className={"full-width-window-homepage"}>
                        <header
                            className={"line"}
                            onClick={() => setDropDownAdminsActive(!dropDownAdminsActive)}
                            style={{userSelect: "none"}}
                        >
                            <IoIosArrowForward
                                style={dropDownAdminsActive && {transform: "rotate(90deg)", margin: 5}}
                                size={30}
                                color={"white"}/>
                            {XlHeader("Администраторы", {color: "white"})}
                        </header>
                        <data className={`dropdown-menu ${dropDownAdminsActive ? "dropdown-active" : ""}`}>
                            {shortAdminList.length !== 0 ?
                                <section style={{display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", width: "100%"}}>
                                    {shortAdminList.map(admin => {
                                        return <article className={"users-list-user line"} onClick={() => window.location.href = `/user/${admin?.key}`}>
                                            <img src={admin?.logo_uri} alt="admin logo" className={"image-s"} style={{marginInline: 10}}/>
                                            <aside className={"col"} style={{alignItems: "start", height: 70, justifyContent: "space-around"}}>
                                                <h1 style={{fontSize: "1.2rem", color: "white"}}>{admin?.fio}</h1>
                                                <h2 style={{fontSize: "1.0rem", color: "lightgrey"}}>ID: {admin?.key}</h2>
                                            </aside>
                                        </article>
                                    })}
                                </section>
                                : <p className={"subtext"}>Администраторы не найдены</p>}
                        </data>
                    </article>
                </section>
            </React.Fragment> :
            <div className={"col-center"} style={{width: "100%", height: "100vh"}}>
                {PageForbidden()}
            </div>
        }
    </section>
}