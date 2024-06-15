// @ts-ignore
import React, {useState} from "react";
import "../../css/pages/userspage.css"
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
import {
    adminListModel,
    adminModel,
    coachListModel,
    coachModel, pupilListModel,
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
import PageForbidden from "../blocks/forbidden/Page-forbidden.tsx";
// @ts-ignore
import XlHeader, {XlHeaderColored} from "../elements/headers/Xl-header.tsx";
import {IoPersonAddSharp} from "react-icons/io5";
import {IoIosArrowForward} from "react-icons/io";
import {MdDeleteOutline, MdOutlineUnarchive} from "react-icons/md";
// @ts-ignore
import PreloadListAdmins from "../../../domain/http/preload-lists/preload-list-admins.ts";
// @ts-ignore
import PreloadListCoaches from "../../../domain/http/preload-lists/preload-list-coaches.ts";
// @ts-ignore
import PreloadListPupils from "../../../domain/http/preload-lists/preload-list-pupils.ts";
// @ts-ignore
import Sidebar from "../blocks/side-menu/Sidebar.tsx";
// @ts-ignore
import PreloadCoachPupils from "../../../domain/http/preload-lists/preload-coach-pupils.ts";
// @ts-ignore
import DialogWindow from "../dialog/Dialog-window.tsx";
import BuildDialogDeleteClassWarning from "../../../domain/app/dialog-building/build-dialog-delete-class-warning";
import deleteClass from "../../../domain/http/classes/delete-class";
// @ts-ignore
import BuildDialogDeleteUserWarning from "../../../domain/app/dialog-building/build-dialog-delete-user.tsx";
// @ts-ignore
import BuildDialogArchiveUserWarning from "../../../domain/app/dialog-building/build-dialog-archive-user.tsx";
import deletePupil from "../../../domain/http/users/delete-pupil";

export default function UsersPage(): React.JSX.Element {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [shortAdminList, setShortAdminList] = useState<adminListModel[]>()
    const [shortCoachList, setShortCoachList] = useState<coachListModel[]>()
    const [shortPupilList, setShortPupilList] = useState<pupilListModel[]>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [dropDownAdminsActive, setDropDownAdminsActive] = useState<boolean>(false)
    const [dropDownCoachesActive, setDropDownCoachesActive] = useState<boolean>(false)
    const [dropDownPupilsActive, setDropDownPupilsActive] = useState<boolean>(false)
    const [dialog, setDialog] = useState<React.JSX.Element>()

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
                localStorage.getItem("role") === "ADMIN" && PreloadListAdmins().then(r => {
                    if (r.error) {
                        setMessage(Message("ERROR", r.message))
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                    } else {
                        setShortAdminList(r.user)
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                        setMessage(Message("SUCCESS", r.message))
                    }
                })
                localStorage.getItem("role") === "ADMIN" && PreloadListCoaches().then(r => {
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
                if (localStorage.getItem("role") === "ADMIN") targetFuncListPupils = PreloadListPupils()
                else if (localStorage.getItem("role") === "COACH") targetFuncListPupils = PreloadCoachPupils()
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
        {dialog}
        {user?.role === "ADMIN" || user?.role === "COACH" ?
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
                {user?.role === "ADMIN" && <article className={"full-width-window-homepage"}>
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
                        {shortAdminList?.length !== 0 ?
                            <section style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                                flexWrap: "wrap",
                                width: "100%"
                            }}>
                                {shortAdminList?.map(admin => {
                                    return <article className={"users-list-user line"}
                                                    onClick={() => window.location.href = `/user/${admin?.key}`}>
                                        <img src={admin?.logo_uri} alt="admin logo" className={"image-s"}
                                             style={{marginInline: 10}}/>
                                        <aside className={"col"} style={{
                                            alignItems: "start",
                                            height: 70,
                                            justifyContent: "space-around"
                                        }}>
                                            <h1 style={{fontSize: "1.2rem", color: "white"}}>{admin?.fio}</h1>
                                            <h2 style={{fontSize: "1.0rem", color: "lightgrey"}}>ID: {admin?.key}</h2>
                                        </aside>
                                    </article>
                                })}
                            </section>
                            : <p className={"subtext"}>Администраторы не найдены</p>}
                    </data>
                </article>}
                {user?.role === "ADMIN" && <article className={"full-width-window-homepage"}>
                    <header
                        className={"line"}
                        onClick={() => setDropDownCoachesActive(!dropDownCoachesActive)}
                        style={{userSelect: "none"}}
                    >
                        <IoIosArrowForward
                            style={dropDownCoachesActive && {transform: "rotate(90deg)", margin: 5}}
                            size={30}
                            color={"white"}/>
                        {XlHeader("Тренеры", {color: "white"})}
                    </header>
                    <data className={`dropdown-menu ${dropDownCoachesActive ? "dropdown-active" : ""}`}>
                        {shortCoachList?.length !== 0 ?
                            <section style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                                flexWrap: "wrap",
                                width: "100%"
                            }}>
                                {shortCoachList?.map(coach => {
                                    return <article className={"users-list-user line"}
                                                    onClick={() => window.location.href = `/user/${coach?.key}`}>
                                        <img src={coach?.logo_uri} alt="admin logo" className={"image-s"}
                                             style={{marginInline: 10}}/>
                                        <aside className={"col"} style={{
                                            alignItems: "start",
                                            height: 70,
                                            justifyContent: "space-around"
                                        }}>
                                            <h1 style={{fontSize: "1.2rem", color: "white"}}>{coach?.fio}</h1>
                                            <h2 style={{
                                                fontSize: "1.0rem",
                                                color: "lightgrey"
                                            }}>ID: {coach?.key}</h2>
                                        </aside>
                                        <aside
                                            style={{
                                                display: "flex"
                                            }}>
                                            <MdDeleteOutline
                                                title={"Удалить"}
                                                className={"delete-user-ico"}
                                                color={"lightgrey"}
                                                size={34}
                                                onClick={e => {
                                                    e.preventDefault()

                                                }}
                                            />
                                            <MdOutlineUnarchive
                                                title={"Архивировать"}
                                                className={"delete-user-ico"}
                                                color={"lightgrey"}
                                                size={34}
                                                onClick={e => {
                                                    e.preventDefault()
                                                }}
                                            />
                                        </aside>
                                    </article>
                                })}
                            </section>
                            : <p className={"subtext"}>Тренеры не найдены</p>}
                    </data>
                </article>}
                <article className={"full-width-window-homepage"}>
                    <header
                        className={"line"}
                        onClick={() => setDropDownPupilsActive(!dropDownPupilsActive)}
                        style={{userSelect: "none"}}
                    >
                        <IoIosArrowForward
                            style={dropDownPupilsActive && {transform: "rotate(90deg)", margin: 5}}
                            size={30}
                            color={"white"}/>
                        {XlHeader("Ученицы", {color: "white"})}
                    </header>
                    <data className={`dropdown-menu ${dropDownPupilsActive ? "dropdown-active" : ""}`}>
                        {shortPupilList?.length !== 0 ?
                            <section style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                                flexWrap: "wrap",
                                width: "100%"
                            }}>
                                {shortPupilList?.map(pupil => {
                                    return <article className={"users-list-user line"}>
                                        <img src={pupil?.logo_uri} alt="admin logo" className={"image-s"}
                                             style={{marginInline: 10}}/>
                                        <aside
                                            onClick={() => window.location.href = `/user/${pupil?.key}`}
                                            className={"col"}
                                            style={{
                                                alignItems: "start",
                                                height: 70,
                                                justifyContent: "space-around"
                                            }}
                                        >
                                            <h1 style={{fontSize: "1.2rem", color: "white"}}>{pupil?.fio}</h1>
                                            <h2 style={{fontSize: "1.0rem", color: "lightgrey"}}>ID: {pupil?.key}</h2>
                                        </aside>
                                        <aside
                                            style={{
                                                display: "flex"
                                            }}>
                                            <MdDeleteOutline
                                                title={"Удалить"}
                                                className={"delete-user-ico"}
                                                color={"lightgrey"}
                                                size={34}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setDialog(DialogWindow("Удаление пользователя",
                                                        <BuildDialogDeleteUserWarning
                                                            userName={pupil?.fio}
                                                            cancelTrigger={() => {
                                                                setDialog(<React.Fragment></React.Fragment>)
                                                            }}
                                                            deleteUserTrigger={() => {

                                                            }}
                                                        />))
                                                }}
                                            />
                                            <MdOutlineUnarchive
                                                title={"Архивировать"}
                                                className={"delete-user-ico"}
                                                color={"lightgrey"}
                                                size={34}
                                                onClick={e => {
                                                    console.log(e)
                                                    e.preventDefault()
                                                    setDialog(DialogWindow("Архивация пользователя",
                                                            <BuildDialogArchiveUserWarning
                                                                userName={pupil?.fio}
                                                                cancelTrigger={() => {
                                                                    setDialog(<React.Fragment></React.Fragment>)
                                                                }}
                                                                archiveUserTrigger={() => {
                                                                    deletePupil(pupil?.key).then(res => {
                                                                        let message = (res?.error ? "Произошла ошибка при удалении ученицы" : "Ученица удалена")
                                                                        setDialog(<React.Fragment></React.Fragment>)
                                                                        setMessage(Message((res?.error ? "ERROR" : "INFO"), message))
                                                                        setTimeout(() => setMessage(
                                                                            <React.Fragment></React.Fragment>), 5100)
                                                                    })
                                                                }}
                                                            />
                                                        )
                                                    )
                                                }}
                                            />
                                        </aside>
                                    </article>
                                })}
                            </section>
                            : <p className={"subtext"}>Ученицы не найдены</p>}
                    </data>
                </article>
            </section> :
            <div className={"col-center"} style={{width: "100%", height: "100vh"}}>
                {PageForbidden()}
            </div>
        }
    </section>
}