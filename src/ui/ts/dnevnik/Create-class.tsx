// @ts-ignore
import React, {useState} from "react";
// @ts-ignore
import Sidebar from "../blocks/side-menu/Sidebar.tsx";
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
// @ts-ignore
import {
    adminModel,
    coachListModel,
    coachModel,
    pupilListModel,
    pupilModel
    // @ts-ignore
} from "../../../domain/constants/users-models.ts";
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
// @ts-ignore
import PreloadListCoaches from "../../../domain/http/preload-lists/preload-list-coaches.ts";
// @ts-ignore
import PreloadCoachPupils from "../../../domain/http/preload-lists/preload-coach-pupils.ts";
// @ts-ignore
import PreloadListPupils from "../../../domain/http/preload-lists/preload-list-pupils.ts";

export default function CreateClass(): React.JSX.Element {

    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()

    const [newClassType, setNewClassType] = useState<string>()
    const [newClassCoach, setNewClassCoach] = useState<number>()
    const [newMultipleClassNumber, setNewMultipleClassNumber] = useState<number>(0)

    const [shortCoachList, setShortCoachList] = useState<coachListModel[]>()
    const [shortPupilList, setShortPupilList] = useState<pupilListModel[]>()

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
                r?.user?.role === "ADMIN" && PreloadListCoaches().then(r => {
                    if (r.error) {
                        setMessage(Message("ERROR", r.message))
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                    } else {
                        setShortCoachList(r.user)
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                        setMessage(Message("SUCCESS", r.message))
                    }
                })
                let targetFuncListPupils: Promise<{ error: boolean, message: string, user: pupilListModel[] }>
                if (r?.user?.role === "ADMIN") targetFuncListPupils = PreloadListPupils()
                else if (r?.user?.role === "COACH") targetFuncListPupils = PreloadCoachPupils()
                targetFuncListPupils?.then(r => {
                    if (r.error) {
                        setMessage(Message("ERROR", r.message))
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                    } else {
                        setShortPupilList(r.user)
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                        setMessage(Message("SUCCESS", r.message))
                    }
                })
            }
        })
        setDataPreloaded(true)
    }
    return <section className={"home-section"}>
        {message}
        {Sidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
        <section className={"homepage-section"}>
            <section className={"homepage-section"}
                     style={{alignItems: "center", width: 900, maxWidth: "95%", marginBottom: 15}}>
                <header className={"line"} style={{justifyContent: "space-between", width: "100%"}}>
                    <div className={"greeting-header-home line"} style={{width: "auto"}}>
                        {XlHeaderColored("Создание")}
                        {Space()}
                        {XlHeader("нового занятия", {color: "white"})}
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
                    <div
                        className={"line"}
                        style={{justifyContent: "center"}}
                    >
                        <span className={"line"}>
                            <label style={{color: "white", textAlign: "left", marginInline: 10}}>Тип занятия</label>
                            <select
                                className={"input-translucent"}
                                style={{padding: "7px 12px"}}
                                onChange={e => {
                                    setNewClassType(e.target.value)
                                }}
                            >
                                    <option disabled={true} selected={true}>Тип</option>
                                    <option value="single">Одиночное</option>
                                    <option value="multiple">Групповое</option>
                            </select>
                        </span>
                        {newClassType === "multiple" && <span className={"line"}>
                            <label
                                style={{color: "white", textAlign: "left", marginInline: 10}}>Количество учениц</label>
                            <select
                                className={"input-translucent"}
                                style={{padding: "7px 12px"}}
                                onChange={e => {
                                    setNewMultipleClassNumber(Number(e.target.value))
                                }}
                            >
                                    <option disabled={true} selected={true}>Количество учениц</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                            </select>
                        </span>}
                    </div>
                </article>
                {
                    ((newClassType === "single") || (newClassType === "multiple" && newMultipleClassNumber !== 0)) &&
                    <article
                        className={"full-width-window-homepage"}
                        style={{width: 800, maxWidth: "95%"}}>
                        <header
                            className={"line"}
                            style={{marginBlock: 15}}
                        >
                            {XlHeader("Детали", {color: "white"})}
                        </header>
                        <div className={"line"} style={{justifyContent: "space-evenly", flexWrap: "wrap"}}>
                            {user?.role === "ADMIN" && <span className={"col"}>
                                <label style={{
                                    color: "white",
                                    textAlign: "left",
                                    marginBottom: 10
                                }}>
                                    {// @ts-ignore
                                        user?.role === "COACH" ? "Тренер (вы)" : "Тренер"
                                    }
                                </label>
                                {user?.role === "ADMIN" ? <select
                                    className={"input-translucent"}
                                    style={{padding: "7px 12px", marginBottom: 12}}
                                    onChange={e => {
                                        setNewClassCoach(Number(e.target.value))
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
                            {
                                (newClassType === "multiple" && newMultipleClassNumber !== 0) &&
                                <span className={"col"}>
                                <label style={{
                                    color: "white",
                                    textAlign: "left",
                                    marginBottom: 10
                                }}>
                                    Ученицы
                                </label>
                                    <data className={"col"}>
                                        {
                                            Array.apply(0, Array(newMultipleClassNumber)).map(num => {
                                                return <select
                                                    className={"input-translucent"}
                                                    style={{padding: "7px 12px", marginBottom: 5}}
                                                    key={num}>
                                                    <option selected={true} disabled={true}>Ученица</option>
                                                    {shortPupilList?.map((p, i) => {
                                                        return <option
                                                            key={i}
                                                            value={p?.fio}
                                                        >
                                                            {p?.fio}
                                                        </option>
                                                    })}
                                                </select>
                                            })
                                        }
                                    </data>
                            </span>
                            }
                            {
                                newClassType === "single" &&
                                <span className={"col"}>
                                <label style={{
                                    color: "white",
                                    textAlign: "left",
                                    marginBottom: 10
                                }}>
                                    Ученица
                                </label>
                                    <data className={"col"}>
                                        <select
                                            className={"input-translucent"}
                                            style={{padding: "7px 12px", marginBottom: 5}}
                                        >
                                            <option selected={true} disabled={true}>Ученица</option>
                                            {shortPupilList?.map((p, i) => {
                                                return <option
                                                    key={i}
                                                    value={p?.fio}
                                                >
                                                    {p?.fio}
                                                </option>
                                            })}
                                        </select>
                                    </data>
                            </span>
                            }
                        </div>
                    </article>
                }
            </section>
        </section>
    </section>
}