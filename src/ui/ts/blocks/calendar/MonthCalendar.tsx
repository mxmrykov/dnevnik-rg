// @ts-ignore
import React, {useState} from "react";
// @ts-ignore
import {MicroClasses, MicroClassesMap} from "../../../../domain/constants/class.ts";
// @ts-ignore
import {InnerTokenModel} from "../../../../domain/constants/jwt.ts";
// @ts-ignore
import GetClassesMonth from "../../../../domain/http/classes/get-classes-month.ts";
// @ts-ignore
import Message from "../../message-aside/Message.tsx";
// @ts-ignore
import {getMonthName} from "../../../../domain/app/get-day-of-week.ts";
import {IoMdInformationCircleOutline} from "react-icons/io";
import {MdDeleteOutline} from "react-icons/md";
// @ts-ignore
import DialogWindow from "../../dialog/Dialog-window.tsx";
// @ts-ignore
import GetClassInfo from "../../../../domain/http/classes/get-class-info.ts";
// @ts-ignore
import BuildDialogClassinfo from "../../../../domain/app/dialog-building/build-dialog-classinfo.tsx";
// @ts-ignore
import BuildDialogDeleteClassWarning from "../../../../domain/app/dialog-building/build-dialog-delete-class-warning.tsx";
// @ts-ignore
import deleteClass from "../../../../domain/http/classes/delete-class.ts";

export default function MonthCalendar({messageCallback, dialogCallback}): React.JSX.Element {

    const [calendar, setCalendar] = useState<MicroClassesMap[]>()
    const [preload, setPreload] = useState<boolean>()

    const [tokenPayload] = useState<InnerTokenModel>(
        JSON.parse(
            atob(
                localStorage.getItem("token").split(".")[1]
            )
        )
    )

    if (!preload) {
        const route: string = `/classes/get/month/${tokenPayload.role.toLowerCase()}`
        GetClassesMonth(route).then(resp => {
            if (resp.error) {
                messageCallback(Message("ERROR", "Ошибка загрузки календаря"))
                console.log(resp.message)
                setTimeout(() => {
                    messageCallback(<React.Fragment></React.Fragment>)
                }, 5100)
            }
            messageCallback(Message("INFO", "Календарь загружен"))
            setCalendar(resp.classes)
            setTimeout(() => {
                messageCallback(<React.Fragment></React.Fragment>)
            }, 5100)
        })
        setPreload(true)
    }

    function addTimes(timeArray: string[]) {
        let mins = timeArray.reduce((acc, time) => {
            let [h, m] = time.split(':');
            acc += Number(h) * 60 + Number(m) * 1;
            return acc;
        }, 0);
        let hour = (mins / 60 | 0)
        let hourString = ""
        if (hour < 10) {
            hourString = `0${hour}`
        } else {
            hourString = `${hour}`
        }
        return hourString + ':' + ('0' + (mins % 60)).slice(-2);
    }

    // @ts-ignore
    return <section className={"calendar-month"}>
        {
            calendar && Object.keys(calendar)?.map(date => (
                <article className={"calendar-day"}>
                    <h3
                        style={{
                            marginLeft: 5
                        }}
                    >
                        {
                            date.split("-")[2] + " "
                        }
                        {
                            getMonthName(
                                Number(date.split("-")[1]) - 1
                            )}
                    </h3>
                    {/*@ts-ignore*/}
                    <div
                        style={{
                            height: 107,
                            overflowY: "scroll",
                        }}
                    >
                        {calendar[date].map(class_ => {
                            return <a href={"/calendar/class/" + class_.key} style={{
                                fontSize: "0.8rem",
                                marginLeft: 5,
                                marginBottom: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                                      className={"dayClass"}
                            >
                                <p
                                    className={"hover-colored"}
                                >
                                    {class_.class_time} - {addTimes([class_.class_time, class_.class_duration])}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <p
                                        style={{
                                            height: 18
                                        }}
                                        className={"hover-colored"}
                                    >
                                        <IoMdInformationCircleOutline
                                            onClick={e => {
                                                e.preventDefault()
                                                GetClassInfo(
                                                    "/classes/get/" + tokenPayload.role.toLowerCase() + "?classId=" + class_.key
                                                ).then(response => {
                                                    if (response.error) {
                                                        messageCallback(Message("ERROR", "Ошибка загрузки данных о занятии"))
                                                        setTimeout(() => {
                                                            messageCallback(<React.Fragment></React.Fragment>)
                                                        }, 5100)
                                                        return
                                                    }
                                                    dialogCallback(
                                                        DialogWindow("Информация о занятии", <BuildDialogClassinfo
                                                            classType={response.classes.class_type}
                                                            isOpen={response.classes.is_open_to_sign_up}
                                                            times={`${class_.class_time} - ${addTimes([class_.class_time, class_.class_duration])}`}
                                                            coach={response.classes.coach}
                                                            classId={response.classes.key}
                                                            pupils={response.classes.pupil}
                                                            cancelTrigger={() => dialogCallback(
                                                                <React.Fragment></React.Fragment>)}
                                                        />)
                                                    )
                                                })
                                            }}
                                            size={18}/>
                                    </p>
                                    <p
                                        style={{
                                            height: 18
                                        }}
                                        className={"hover-colored"}
                                    >
                                        <MdDeleteOutline
                                            style={{
                                                transition: "0.2s ease"
                                            }}
                                            onClick={e => {
                                                e.preventDefault()
                                                GetClassInfo(
                                                    "/classes/get/" + tokenPayload.role.toLowerCase() + "?classId=" + class_.key
                                                ).then(response => {
                                                    if (response.error) {
                                                        messageCallback(Message("ERROR", "Ошибка загрузки данных о занятии"))
                                                        setTimeout(() => {
                                                            messageCallback(<React.Fragment></React.Fragment>)
                                                        }, 5100)
                                                        return
                                                    }
                                                    dialogCallback(DialogWindow("Удаление занятия",
                                                            <BuildDialogDeleteClassWarning
                                                                classId={class_.key}
                                                                coach={response.classes.coach}
                                                                times={class_.class_time + "-" + addTimes([class_.class_time, class_.class_duration])}
                                                                cancelTrigger={() => {
                                                                    dialogCallback(<React.Fragment></React.Fragment>)
                                                                }}
                                                                deleteClassTrigger={() => {
                                                                    deleteClass(class_?.key).then(res => {
                                                                        if (!res?.error) {
                                                                            class_.deleted = true
                                                                        }
                                                                        let message = (res?.error ? "Произошла ошибка при удалении занятия" : "Занятие удалено")
                                                                        dialogCallback(<React.Fragment></React.Fragment>)
                                                                        messageCallback(Message((res?.error ? "ERROR" : "INFO"), message))
                                                                        setTimeout(() => messageCallback(
                                                                            <React.Fragment></React.Fragment>), 5100)
                                                                    })
                                                                }}
                                                            />
                                                        )
                                                    )
                                                })
                                            }}
                                            size={18}
                                        />
                                    </p>
                                </div>
                            </a>
                        })}
                    </div>
                </article>
            ))}
    </section>
}