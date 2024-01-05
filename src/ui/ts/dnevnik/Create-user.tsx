// @ts-ignore
import AdminSidebar from "../blocks/side-menu/Admin-sidebar.tsx";
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore
import authValid from "../../../domain/app/auth-check.ts";
// @ts-ignore
import exit from "../../../domain/app/exit.ts";
// @ts-ignore
import {PreloadUser} from "../../../domain/http/user-preload.ts";
// @ts-ignore
import Message from "../message-aside/Message.tsx";
import {
    adminModel, coachListModel,
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
// @ts-ignore
import PreloadListCoaches from "../../../domain/http/preload-lists/preload-list-coaches.ts";
// @ts-ignore
import isAdminValid, {isCoachValid, isPupilValid} from "../../../domain/app/validations/new-user-validation.ts";
// @ts-ignore
import DialogWindow from "../dialog/Dialog-window.tsx";
// @ts-ignore
import NewAdmin from "../../../domain/http/users/new-admin.ts";

export default function CreateUser() {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [newUser, setNewUser] =
        useState<newAdminModel | newCoachModel | newPupilModel>()
    const [shortCoachList, setShortCoachList] = useState<coachListModel[]>()
    const [dialogWindow, setDialogWindow] = useState<React.JSX.Element>()
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
        {dialogWindow}
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
                                onChange={e => {
                                    setNewUser(
                                        prevState => ({
                                            ...prevState, role: e.target.value
                                        }))
                                    e.target.value === "COACH" && PreloadListCoaches().then(r => {
                                        if (r.error) {
                                            setMessage(Message("ERROR", r.message))
                                            setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                        } else {
                                            setShortCoachList(r.user)
                                            setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                            setMessage(Message("SUCCESS", r.message))
                                        }
                                    })
                                }}
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
                                onChange={e => setNewUser(
                                    prevState => ({
                                        ...prevState, fio: e.target.value
                                    }))
                                }
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
                                    onChange={e => setNewUser(
                                        prevState => ({
                                            ...prevState, home_city: e.target.value
                                        }))
                                    }
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
                                    onChange={e => setNewUser(
                                        prevState => ({
                                            ...prevState, training_city: e.target.value
                                        }))
                                    }
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
                                    onChange={e => setNewUser(
                                        prevState => ({
                                            ...prevState, birthday: e.target.value
                                        }))
                                    }
                                />
                            </span>
                            {newUser?.role === "PUPIL" && <span className={"col"}>
                                <label style={{
                                    color: "white",
                                    textAlign: "left"
                                }}>
                                    {// @ts-ignore
                                        user?.role === "COACH" ? "Тренер (вы)" : "Тренер"
                                    }
                                </label>
                                {user?.role === "ADMIN" ? <select
                                    className={"input-translucent"}
                                    style={{padding: "7px 12px", marginBottom: 12}}
                                    onChange={e => setNewUser(
                                        prevState => ({
                                            ...prevState, coach: e.target.value
                                        }))
                                    }>
                                    {shortCoachList?.map(coach => {
                                        let fi = coach?.fio.split(" ")
                                        return <option value={coach?.key}>
                                            {fi[0] + " " + fi[1]}
                                        </option>
                                    })}
                                </select> : <input
                                    className={"input-translucent"}
                                    value={user?.key}
                                    disabled={true}
                                />}
                            </span>}
                            <textarea
                                className={"input-translucent"}
                                style={{width: 280, maxWidth: "95%"}}
                                rows={5}
                                placeholder={"О себе"}
                                onChange={e => setNewUser(
                                    prevState => ({
                                        ...prevState, about: e.target.value
                                    }))
                                }>
                            </textarea>
                            {
                                newUser?.role === "PUPIL" &&
                                <textarea
                                    className={"input-translucent"}
                                    style={{width: 280, maxWidth: "95%"}}
                                    rows={5}
                                    placeholder={"Комментарий от тренера"}
                                    onChange={e => setNewUser(
                                        prevState => ({
                                            ...prevState, coach_review: e.target.value
                                        }))
                                    }>
                            </textarea>
                            }
                        </div>
                    </article>
                }
                <footer
                    className={"line"}
                    style={{justifyContent: "center"}}
                >
                    <button
                        className={"button-basic"}
                        onClick={() => {
                            switch (newUser?.role) {
                                case "ADMIN":
                                    if (isAdminValid(newUser as newCoachModel)) {
                                        NewAdmin(newUser?.fio).then(r => {
                                            if (r.error) {
                                                setMessage(Message("ERROR", r.text))
                                                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                            } else {
                                                setDialogWindow(DialogWindow("Пользователь создан", <article
                                                    className={"col-center"}>
                                                    {Space()}
                                                    <p>
                                                        ID Пользователя: {r?.data?.key}
                                                    </p>
                                                    <p>
                                                        Пароль: {r?.data?.private?.checksum}
                                                    </p>
                                                    <p className={"subtext"} style={{textAlign: "center"}}>
                                                        Скопируйте эти данные и вышлите конечному пользователю
                                                    </p>
                                                    {Space()}
                                                    <footer className={"line"}>
                                                        <button
                                                            className={"button-basic"}
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(`${r?.data?.key}\n${r?.data?.private?.checksum}`)
                                                            }}>
                                                            Скопировать данные
                                                        </button>
                                                        <button
                                                            className={"button-basic"}
                                                            onClick={() => {
                                                                setDialogWindow(<React.Fragment></React.Fragment>)
                                                            }}>
                                                            Закрыть
                                                        </button>
                                                    </footer>
                                                </article>))
                                            }
                                        })
                                    } else {
                                        setMessage(Message("ERROR", "Неверно заполнены поля"))
                                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                    }
                                    break
                                case "COACH":
                                    if (isCoachValid(newUser as newCoachModel)) {

                                    } else {
                                        setMessage(Message("ERROR", "Неверно заполнены поля"))
                                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                    }
                                    break
                                case "PUPIL":
                                    if (isPupilValid(newUser as newPupilModel)) {
                                        // http request
                                    } else {
                                        setMessage(Message("ERROR", "Неверно заполнены поля"))
                                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                    }
                                    break
                            }
                        }}
                    >
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