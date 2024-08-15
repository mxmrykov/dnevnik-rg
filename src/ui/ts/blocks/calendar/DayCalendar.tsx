// @ts-ignore
import React, {useState} from "react";
// @ts-ignore
import {ShortClassInfo} from "../../../../domain/constants/class.ts";
// @ts-ignore
import {XlHeaderColored} from "../../elements/headers/Xl-header.tsx";
// @ts-ignore
import DialogWindow from "../../dialog/Dialog-window.tsx";
// @ts-ignore
import BuildDialogCancelClassWarning from "../../../../domain/app/dialog-building/build-dialog-cancel-class-warning.tsx";
// @ts-ignore
import cancelClass from "../../../../domain/http/classes/cancel-class.ts";
// @ts-ignore
import Message from "../../message-aside/Message.tsx";
// @ts-ignore
import BuildDialogDeleteClassWarning from "../../../../domain/app/dialog-building/build-dialog-delete-class-warning.tsx";
// @ts-ignore
import deleteClass from "../../../../domain/http/classes/delete-class.ts";

export default function DayCalendar({classes, menuType, setDialog, setMessage}): React.JSX.Element {

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
        let hour = (mins / 60 | 0)
        let hourString = ""
        if (hour < 10) {
            hourString = `0${hour}`
        } else {
            hourString = `${hour}`
        }
        return hourString + ':' + ('0' + (mins % 60)).slice(-2);
    }

    function getMinutes(): string {
        return (DATE.getMinutes() < 10 ? "0" + DATE.getMinutes().toString() : DATE.getMinutes().toString())
    }

    return <section
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
            flexWrap: "wrap",
            maxWidth: "100%"
        }}
    >
        {classes?.map((_class: ShortClassInfo, index: number) => {
            return <a
                style={menuType === "BLOCK" ? {
                    width: "95%",
                } : {
                    width: 460,
                    maxWidth: "100%"
                }}
                href={"/calendar/class/" + _class.key}>
                <div
                    className={menuType === "BLOCK" ? "class-info" : "class-info width_grided"}
                    key={index}
                    style={{padding: 25}}
                >
                        <span className={menuType === "BLOCK" ? "line" : "col"}>
                            {XlHeaderColored(
                                _class?.class_time + " - " +
                                addTimes([_class?.class_time, _class?.class_duration])
                            )}
                            <h2>{menuType === "BLOCK" ? ", " + _class.coach : _class.coach}</h2>
                            {(!_class.scheduled && !_class.deleted) &&
                                <h2 style={{color: "orange", marginLeft: 8}}>{"[Отменено]"}</h2>}
                            {
                                (_class.scheduled &&
                                    addTimes([_class.class_time, _class.class_duration]) < (DATE.getHours() + ":" + getMinutes())
                                    && !_class.deleted
                                )
                                && <h2 style={{color: "lawngreen", marginLeft: 8}}>{"[Завершено]"}</h2>
                            }
                            {(_class.deleted) &&
                                <h2 style={{color: "orangered", marginLeft: 8}}>{"[Удалено]"}</h2>}
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
                            style={{
                                marginRight: 10
                            }}
                            onClick={e => {
                                e.preventDefault()
                                setDialog(
                                    DialogWindow("Отмена занятия",
                                        <BuildDialogCancelClassWarning
                                            classId={_class.key}
                                            coach={_class.coach}
                                            times={_class.class_time + "-" + addTimes([_class.class_time, _class.class_duration])}
                                            cancelTrigger={() => {
                                                setDialog(<React.Fragment></React.Fragment>)
                                            }}
                                            cancelClassTrigger={() => {
                                                cancelClass(_class?.key).then(res => {
                                                    if (!res?.error) {
                                                        _class.scheduled = false
                                                    }
                                                    let message = (res?.error ? "Произошла ошибка при отмене занятия" : "Занятие отменено")
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
                        >
                            Отменить занятие
                        </button>
                        <button
                            className={"button-basic"}
                            onClick={e => {
                                e.preventDefault()
                                setDialog(DialogWindow("Удаление занятия",
                                        <BuildDialogDeleteClassWarning
                                            classId={_class.key}
                                            coach={_class.coach}
                                            times={_class.class_time + "-" + addTimes([_class.class_time, _class.class_duration])}
                                            cancelTrigger={() => {
                                                setDialog(<React.Fragment></React.Fragment>)
                                            }}
                                            deleteClassTrigger={() => {
                                                deleteClass(_class?.key).then(res => {
                                                    if (!res?.error) {
                                                        _class.deleted = true
                                                    }
                                                    let message = (res?.error ? "Произошла ошибка при удалении занятия" : "Занятие удалено")
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
}