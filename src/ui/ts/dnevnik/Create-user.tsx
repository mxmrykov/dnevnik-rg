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
// @ts-ignore
import NewCoach from "../../../domain/http/users/new-coach.ts";
// @ts-ignore
import BuildDialogNewUser from "../../../domain/app/dialog-building/build-dialog-new-user.tsx";
// @ts-ignore
import NewPupil from "../../../domain/http/users/new-pupil.ts";
// @ts-ignore
import Sidebar from "../blocks/side-menu/Sidebar.tsx";

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
        localStorage.getItem("role") === "COACH" && setNewUser(
            prevState => ({
                ...prevState, role: "PUPIL", coach: localStorage.getItem("key")
            })
        )
        setDataPreloaded(true)
    }
    return <section className={"home-section"}>
        {message}
        {Sidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
        {dialogWindow}
        {user?.role === "ADMIN" || user?.role === "COACH" ?
            <section className={"homepage-section"}
                     style={{alignItems: "center", width: 900, maxWidth: "95%", marginBottom: 15}}>
                <header className={"line"} style={{justifyContent: "space-between", width: "100%"}}>
                    <div className={"greeting-header-home line"} style={{width: "auto"}}>
                        {XlHeaderColored("Создание")}
                        {Space()}
                        {XlHeader("нового пользователя", {color: "white"})}
                    </div>
                </header>
                <article
                    className={"full-width-window-homepage"}
                    style={{width: 800, maxWidth: "95%"}}>
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
                                    e.target.value === "PUPIL" && user?.role === "ADMIN" && PreloadListCoaches().then(r => {
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
                                {user?.role === "ADMIN" && <React.Fragment>
                                    <option value="ADMIN">Администратор</option>
                                    <option value="COACH">Тренер</option>
                                    <option value="PUPIL">Ученица</option>
                                </React.Fragment>}
                                {user?.role === "COACH" && <React.Fragment>
                                    <option value="PUPIL" selected={true} disabled={true}>Ученица</option>
                                </React.Fragment>}
                            </select>
                        </span>
                        <span className={"col"}>
                            <label style={{color: "white", marginBottom: -10, textAlign: "left"}}>ФИО</label>
                            <input
                                className={"input-translucent"}
                                placeholder={"Иванов Иван Иванович"}
                                style={{width: 300, maxWidth: "75%"}}
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
                        style={{width: 800, maxWidth: "95%"}}>
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
                                    style={{marginInline: 3}}
                                    placeholder={"Например, Москва"}
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
                                    style={{marginInline: 3}}
                                    placeholder={"Например, Москва"}
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
                                    textAlign: "left",
                                    marginBottom: user?.role === "COACH" && -10
                                }}>
                                    {// @ts-ignore
                                        user?.role === "COACH" ? "Тренер (вы)" : "Тренер"
                                    }
                                </label>
                                {user?.role === "ADMIN" ? <select
                                    className={"input-translucent"}
                                    style={{padding: "7px 12px", marginBottom: 12}}
                                    onChange={e => {
                                        console.log(e.target.value)
                                        setNewUser(
                                            prevState => ({
                                                ...prevState, coach: e.target.value
                                            }))
                                    }
                                    }>
                                    <option selected={true} disabled={true}>Выберете тренера</option>
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
                                style={{width: 280, maxWidth: "95%", marginBlock: 5}}
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
                                    style={{width: 280, maxWidth: "95%", marginBlock: 5}}
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
                                    if (isAdminValid(newUser as newAdminModel)) {
                                        NewAdmin(newUser?.fio).then(r => {
                                            if (r.error) {
                                                setMessage(Message("ERROR", r.text))
                                                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                            } else {
                                                setDialogWindow(DialogWindow("Пользователь создан", BuildDialogNewUser(r?.data?.fio, r?.data?.key, r?.data?.private?.checksum)))
                                            }
                                        })
                                    } else {
                                        setMessage(Message("ERROR", "Неверно заполнены поля"))
                                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                    }
                                    break
                                case "COACH":
                                    if (isCoachValid(newUser as newCoachModel)) {
                                        NewCoach(newUser as newCoachModel).then(r => {
                                            if (r.error) {
                                                setMessage(Message("ERROR", r.text))
                                                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                            } else {
                                                setDialogWindow(DialogWindow("Пользователь создан", BuildDialogNewUser(r?.data?.fio, r?.data?.key, r?.data?.private?.checksum)))
                                            }
                                        })
                                    } else {
                                        setMessage(Message("ERROR", "Неверно заполнены поля"))
                                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                    }
                                    break
                                case "PUPIL":
                                    if (isPupilValid(newUser as newPupilModel)) {
                                        NewPupil(newUser as newPupilModel).then(r => {
                                            if (r.error) {
                                                setMessage(Message("ERROR", r.text))
                                                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                            } else {
                                                setDialogWindow(DialogWindow("Пользователь создан", BuildDialogNewUser(r?.data?.fio, r?.data?.key, r?.data?.private?.checksum)))
                                            }
                                        })
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