// @ts-ignore
import AdminSidebar from "../blocks/side-menu/Admin-sidebar.tsx";
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
// @ts-ignore
import React, {useState} from "react";
// @ts-ignore
import authValid from "../../../domain/app/auth-check.ts";
// @ts-ignore
import exit from "../../../domain/app/exit.ts";
// @ts-ignore
import {PreloadUser} from "../../../domain/http/user-preload.ts";
// @ts-ignore
import Message from "../message-aside/Message.tsx";
import {
    adminModel,
    coachModel,
    newAdminModel,
    newCoachModel, newPupilModel,
    pupilModel
    // @ts-ignore
} from "../../../domain/constants/users-models.ts";
// @ts-ignore
import PageForbidden from "../blocks/forbidden/Page-forbidden.tsx";
// @ts-ignore
import XlHeader, {XlHeaderColored} from "../elements/headers/Xl-header.tsx";
// @ts-ignore
import Space from "../elements/headers/Space.tsx";

export default function CreateUser() {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [newUser, setNewUser] =
        useState<newAdminModel | newCoachModel | newPupilModel>()
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
        setNewUser(
            prevState => ({
                ...prevState, role: "ADMIN"
            })
        )
        setDataPreloaded(true)
    }
    return <section className={"home-section"}>
        {message}
        {AdminSidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
        {user?.role === "ADMIN" ?
            <section className={"homepage-section"} style={{alignItems: "center", width: 900, maxWidth: "95%"}}>
                <header className={"line"} style={{justifyContent: "space-between", width: "100%"}}>
                    <div className={"greeting-header-home line"} style={{width: "auto"}}>
                        {XlHeaderColored("Создание")}
                        {Space()}
                        {XlHeader("нового пользователя", {color: "white"})}
                    </div>
                </header>
                <article
                    className={"full-width-window-homepage"}
                    style={{width: 800, maxWidth: "100%"}}>
                    <header
                        className={"line"}
                        style={{marginBlock: 15}}
                    >
                        {XlHeader("Основная информация", {color: "white"})}
                    </header>
                    <div className={"line"} style={{justifyContent: "space-evenly", flexWrap: "wrap"}}>
                        <span className={"col"}>
                            <label style={{color: "white", textAlign: "left"}}>Роль</label>
                            <select
                                className={"input-translucent"}
                                style={{padding: "7px 12px", marginBottom: 12}}
                                onChange={e => setNewUser(
                                    prevState => ({
                                        ...prevState, role: e.target.value
                                    }))
                                }
                            >
                                <option value="ADMIN">Администратор</option>
                                <option value="COACH">Тренер</option>
                                <option value="PUPIL">Ученица</option>
                            </select>
                        </span>
                        <span className={"col"}>
                            <label style={{color: "white", marginBottom: -10, textAlign: "left"}}>ФИО</label>
                            <input
                                className={"input-translucent"}
                                placeholder={"Иванов Иван Иванович"}
                                style={{width: 300, maxWidth: "95%"}}
                            />
                        </span>
                    </div>
                </article>
                {newUser?.role !== "ADMIN" &&
                    <article
                        className={"full-width-window-homepage"}
                        style={{width: 800, maxWidth: "100%"}}>
                        <header
                            className={"line"}
                            style={{marginBlock: 15}}
                        >
                            {XlHeader("Дополнительная информация", {color: "white"})}
                        </header>
                        <div className={"line"} style={{justifyContent: "space-around", flexWrap: "wrap"}}>
                            <span className={"col"}>
                                <label style={{
                                    color: "white",
                                    marginBottom: -10,
                                    textAlign: "left"
                                }}>Город</label>
                                <input
                                    className={"input-translucent"}
                                    placeholder={"Москва"}
                                />
                            </span>
                            <span className={"col"}>
                                <label style={{
                                    color: "white",
                                    marginBottom: -10,
                                    textAlign: "left"
                                }}>Место тренировок</label>
                                <input
                                    className={"input-translucent"}
                                    placeholder={"Москва"}
                                />
                            </span>
                            <span className={"col"}>
                                <label style={{
                                    color: "white",
                                    marginBottom: -10,
                                    textAlign: "left"
                                }}>День рождения</label>
                                <input
                                    className={"input-translucent"}
                                    type={"date"}
                                />
                            </span>
                        </div>
                    </article>
                }
                <footer
                    className={"line"}
                    style={{justifyContent: "center"}}
                >
                    <button className={"button-basic"}>
                        Создать
                    </button>
                </footer>
            </section>
            : <div className={"col-center"} style={{width: "100%", height: "100vh"}}>
                {PageForbidden()}
            </div>
        }
    </section>
}