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
import {IoList, IoGridOutline} from "react-icons/io5";
// @ts-ignore
import GetClassesToday from "../../../domain/http/classes/get-classes-today.ts";
import {ShortClassInfo} from "../../../domain/constants/class";
// @ts-ignore
import BuildDialogCancelClassWarning from "../../../domain/app/dialog-building/build-dialog-cancel-class-warning.tsx";
// @ts-ignore
import DialogWindow from "../dialog/Dialog-window.tsx";

export default function Calendar(): React.JSX.Element {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [classes, setClasses] = useState<ShortClassInfo[]>()
    const [menuType, setMenuType] = useState<string>("BLOCK")
    const [dialogWindow, setDialogWindow] = useState<React.JSX.Element>()
    const DATE = new Date()
    const [today] = useState<string>(
        DATE.getFullYear().toString() +
        "-" + ((DATE.getMonth() + 1) < 10 ? "0" + (DATE.getMonth() + 1).toString() : (DATE.getMonth() + 1).toString()) +
        "-" + (DATE.getDate() < 10 ? "0" + DATE.getDate().toString() : DATE.getDate().toString())
    )

    function addTimes(timeArray: string[]) {
        let mins = timeArray.reduce((acc, time) => {
            let [h, m] = time.split(':');
            acc += Number(h) * 60 + Number(m) * 1;
            return acc;
        }, 0);
        return (mins / 60 | 0) + ':' + ('0' + (mins % 60)).slice(-2);
    }


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
                let key: number
                let route: string
                switch (localStorage.getItem("role")) {
                    case "ADMIN":
                        key = 0;
                        route = "/classes/get/today/admin"
                        break
                    case "COACH":
                        key = Number(localStorage.getItem("key"))
                        route = "/classes/get/today/coach"
                        break
                    case "PUPIL":
                        route = "/classes/get/today/pupil"
                        // @ts-ignore
                        key = r.user.coach
                        break
                }
                GetClassesToday(route, today, key).then(r => {
                    if (r.error) {
                        setMessage(Message("ERROR", r.message))
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                    } else {
                        setClasses(r.classes)
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
        {dialogWindow}
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
            <span
                className={"line bordered-block"}
                style={{margin: "0 auto"}}
            >
                <p
                    className={menuType === "BLOCK" && "colored_bg"}
                    style={{width: 32, height: 32, cursor: "pointer", padding: 3, borderRadius: 5}}
                    onClick={() => setMenuType("BLOCK")}
                >
                    <IoList size={32} color={"white"}/>
                </p>
                <p
                    className={menuType === "MENU" ? "colored_bg line" : "line"}
                    style={{width: 30, height: 30, cursor: "pointer", padding: 3, borderRadius: 5}}
                    onClick={() => setMenuType("MENU")}
                >
                    <IoGridOutline size={28} color={"white"}/>
                </p>
            </span>
            <section
                style={menuType === "BLOCK" ? {
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "nowrap"
                } : {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexWrap: "wrap"
                }}
            >
                {classes?.map((_class: ShortClassInfo, index: number) => {
                    return <a
                        style={menuType === "BLOCK" ? {
                            width: "95%",
                        } : {
                            width: 500
                        }}
                        href={"/calendar/" + _class.key}>
                        <div
                            className={menuType === "BLOCK" ? "class-info" : "class-info width_grided"}
                            key={index}
                            style={{padding: 25, marginInline: 10}}
                        >
                        <span className={"line"}>
                            {XlHeaderColored(
                                _class?.class_time + " - " +
                                addTimes([_class?.class_time, _class?.class_duration])
                            )}
                            <h2>{menuType === "BLOCK" && ", " + _class.coach}</h2>
                        </span>
                            <span style={{
                                marginBlock: 15,
                                height: 65,
                                overflowY: "scroll",
                                backgroundColor: "rgba(0, 0, 0, 0.35)",
                                padding: 8,
                                fontSize: "0.9rem",
                                borderRadius: 5,
                                boxShadow: "0px -16px 8px -13px rgba(0,0,0,0.45) inset"
                            }}>
                                <h3>
                                    Ученицы:
                                    {_class?.pupil?.map((val: string, index: number) => {
                                        return <React.Fragment>
                                            {" " + val + ((index < (_class?.pupil?.length - 1)) ? ", " : "")}
                                        </React.Fragment>
                                    })}
                                </h3>
                            </span>
                            <div className={"line"} style={{justifyContent: "space-around", width: "100%"}}>
                                <article>
                                    <span>
                                        <h3 style={{marginBlock: 12}}>
                                            Основная информация:
                                        </h3>
                                    </span>
                                    <span>
                                        <h4 style={{marginBlock: 5}}>
                                            Время:
                                            <span className={"colored"}>
                                                {" " + _class?.class_time}
                                            </span>
                                        </h4>
                                    </span>
                                    <span>
                                        <h4 style={{marginBlock: 5}}>
                                            Длительность:
                                            <span className={"colored"}>
                                                {" " + _class?.class_duration}
                                            </span>
                                        </h4>
                                    </span>
                                    <span style={{marginBlock: 5}}>
                                        <h4>
                                            Тип занятия:
                                            <span className={"colored"}>
                                                {_class?.class_type === "SINGLE" && " Одиночное"}
                                                {_class?.class_type === "MULTIPLE" && " Групповое"}
                                            </span>
                                        </h4>
                                    </span>
                                </article>
                                <article>
                                    <span>
                                        <h3 style={{marginBlock: 15}}>
                                            Дополнительно:
                                        </h3>
                                    </span>
                                    <span>
                                        <h4 style={{marginBlock: 5}}>
                                            Открыто для записи:
                                            <span className={"colored"}>
                                                {_class?.is_open_to_sign_up ? " Да" : " Нет"}
                                            </span>
                                        </h4>
                                    </span>
                                    <span style={{marginBlock: 5}}>
                                        <h4>
                                            Количество учениц:
                                            <span className={"colored"}>
                                                {" " + _class?.pupil_count}
                                            </span>
                                        </h4>
                                    </span>
                                </article>
                            </div>
                            <article
                                className={"line"}
                                style={{
                                    justifyContent: "space-around",
                                    width: 300,
                                    maxWidth: "95%",
                                    margin: "0 auto",
                                    marginBlock: 15
                                }}>
                                <button
                                    className={"button-basic terracota_bg"}
                                    onClick={e => {
                                        e.preventDefault()
                                        setDialogWindow(
                                            DialogWindow("Отмена занятия",
                                                <BuildDialogCancelClassWarning
                                                    classId={_class.key}
                                                    coach={_class.coach}
                                                    times={addTimes([_class.class_time, _class.class_duration])}
                                                    cancelTrigger={() => {
                                                        setDialogWindow(<React.Fragment></React.Fragment>)
                                                    }}
                                                />
                                            )
                                        )
                                    }}
                                >
                                    Отменить занятие
                                </button>
                                <button
                                    className={"button-basic"}
                                    onClick={e => {
                                        e.preventDefault()
                                        setDialogWindow(
                                            DialogWindow("Удаление занятия",
                                                <BuildDialogCancelClassWarning
                                                    classId={_class.key}
                                                    coach={_class.coach}
                                                    times={addTimes([_class.class_time, _class.class_duration])}
                                                    cancelTrigger={() => {
                                                        setDialogWindow(<React.Fragment></React.Fragment>)
                                                    }}
                                                />
                                            )
                                        )
                                    }}
                                >
                                    Удалить занятие
                                </button>
                            </article>
                        </div>
                    </a>
                })}
                {
                    classes === null &&
                    <div
                        className={"class-info width_grided"}
                        style={{marginTop: 50, height: 70}}
                    >
                        <h2
                            style={{textAlign: "center", width: "100%"}}
                        >
                            Занятий на сегодня нет
                        </h2>
                    </div>
                }
            </section>
        </section>
    </section>
}