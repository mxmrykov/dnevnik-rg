// @ts-ignore
import React, {useEffect, useState} from "react";
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
// @ts-ignore
import {ShortClassInfo} from "../../../domain/constants/class.ts";
// @ts-ignore
import DayCalendar from "../blocks/calendar/DayCalendar.tsx";
// @ts-ignore
import CalendarTypeSelector from "../blocks/calendar/CalendarTypeSelector.tsx";
// @ts-ignore
import MenuTypeSelector from "../blocks/calendar/MenuTypeSelector.tsx";
// @ts-ignore
import MonthCalendar from "../blocks/calendar/MonthCalendar.tsx";

export default function Calendar(): React.JSX.Element {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [classes, setClasses] = useState<ShortClassInfo[]>()
    const [menuType, setMenuType] = useState<string>("BLOCK")
    const [dialogWindow, setDialogWindow] = useState<React.JSX.Element>()
    const [calendarType, setCalendarType] = useState<string>("day")

    const [monthAvail, setMonthAvail] = useState<boolean>(true)
    const [menuAvail, setMenuAvail] = useState<boolean>(true)

    const DATE = new Date()
    const [today] = useState<string>(
        DATE.getFullYear().toString() +
        "-" + ((DATE.getMonth() + 1) < 10 ? "0" + (DATE.getMonth() + 1).toString() : (DATE.getMonth() + 1).toString()) +
        "-" + (DATE.getDate() < 10 ? "0" + DATE.getDate().toString() : DATE.getDate().toString())
    )

    if (!dataPreloaded) {
        if (!authValid()) exit()
        if (window.innerWidth < 500) {
            setMenuAvail(false)
        }
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

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, []);

    const handleResize = (e) => {
        if (window.innerWidth < 500) {
            setMenuAvail(false)
            setMenuType("MENU")
        }
        if (window.innerWidth >= 500) {
            setMenuAvail(true)
            setMenuType("BLOCK")
        }
        if (window.innerWidth < 1150) {
            setMonthAvail(false)
            setCalendarType("day")
        }
        if (window.innerWidth >= 1150) {
            setMonthAvail(true)
        }
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
            <CalendarTypeSelector monthAvail={monthAvail} calendarType={calendarType}
                                  setCalendarType={setCalendarType}/>
            <MenuTypeSelector menuType={menuType} menuAvail={menuAvail} setMenuType={setMenuType}/>
            {
                calendarType === "day" && <DayCalendar
                    setMessage={setMessage}
                    setDialog={setDialogWindow}
                    classes={classes}
                    menuType={menuType}
                />
            }
            {
                calendarType === "month" && <MonthCalendar
                    dialogCallback={setDialogWindow}
                    messageCallback={setMessage}
                />
            }
        </section>
    </section>
}