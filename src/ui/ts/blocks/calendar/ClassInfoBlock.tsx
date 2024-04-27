// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore
import XlHeader, {XlHeaderColored} from "../../elements/headers/Xl-header.tsx";
// @ts-ignore
import {getMonthName} from "../../../../domain/app/get-day-of-week.ts";

export default function ClassInfoBlock({classInfo}): React.JSX.Element {

    const DATE = new Date()
    const [today] = useState<string>(
        DATE.getFullYear().toString() +
        "-" + ((DATE.getMonth() + 1) < 10 ? "0" + (DATE.getMonth() + 1).toString() : (DATE.getMonth() + 1).toString()) +
        "-" + (DATE.getDate() < 10 ? "0" + DATE.getDate().toString() : DATE.getDate().toString())
    )

    const [classState, setClassState] = useState<React.JSX.Element>()

    useEffect(() => {
        if (!classInfo?.scheduled) {
            setClassState(<span style={{color: "orange", marginLeft: 10}}>[Отменено]</span>)
        } else if ((addTimes([classInfo?.class_time, classInfo?.class_duration])
            > (DATE.getHours() + ":" + getMinutes())) && (
            today >= classInfo?.class_date)) {
            setClassState(<span
                style={{color: "lawngreen", marginLeft: 10}}>[Завершено]</span>)
        } else {
            setClassState(<span style={{color: "skyblue", marginLeft: 10}}>[По расписанию]</span>)
        }
    }, [classInfo?.scheduled])

    function getMinutes(): string {
        return (DATE.getMinutes() < 10 ? "0" + DATE.getMinutes().toString() : DATE.getMinutes().toString())
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

    return <section>
        <section
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap"
            }}
        >
            <div className={"greeting-header-home line"}>
                {XlHeaderColored("ID:")}
                {XlHeader(classInfo?.key, {marginLeft: -20, color: "white"})}
            </div>
            <div className={"greeting-header-home line"} style={{width: 260, maxWidth: "50%"}}>
                <h3 className={"colored"}>
                    {classInfo?.coach.split(" ")[0]}
                </h3>
                <h3 style={{color: "white", marginLeft: 10}}>
                    {classInfo?.coach.split(" ")[1]}
                </h3>
                <h3 style={{color: "white", marginLeft: 10}}>
                    {classInfo?.coach.split(" ")[2]}
                </h3>
            </div>
        </section>
        <article
            className={"class-info"}
            style={{
                width: 500,
                maxWidth: "95%"
            }}
        >
            <header
                style={{
                    padding: 10
                }}
            >
                <h2>
                    {
                        <span className={"colored"}>{classInfo?.class_date.split("-")[2] + " "}</span>
                    }
                    {getMonthName(
                        Number(classInfo?.class_date.split("-")[1]) - 1
                    )},
                    {
                        <span style={{marginLeft: 10}}>
                            {classInfo?.class_date.split("-")[0]}
                        </span>
                    },
                    {classState}
                </h2>
            </header>
            <article style={{
                marginTop: 20,
                padding: 15,
                paddingTop: 0
            }}>
                <h3 style={{
                    marginBottom: 10,
                }}>
                    Время: <h3 className={"colored"}>{classInfo?.class_time} - {
                    classInfo?.class_time && classInfo?.class_duration && addTimes([classInfo?.class_time, classInfo?.class_duration])
                }</h3>
                </h3>
                <h3 style={{
                    marginBottom: 10,
                }}>
                    Ученицы: <h3 className={"colored"}>{classInfo?.pupil?.map((pupil: string, index: number) => {
                    return (index + 1 === classInfo?.pupil?.length) ? pupil : pupil + ", "
                })}</h3>
                </h3>
                <h3
                    style={{
                        marginBottom: 10,
                    }}>
                    Тип занятия: <h3
                    className={"colored"}>{classInfo?.class_type === "SINGLE" ? "Одиночное" : "Групповое"}</h3>
                </h3>
                <h3
                    style={{
                        marginBottom: 10,
                    }}>
                    Открыто для записи: <h3 className={"colored"}>{classInfo?.is_open_to_sign_up ? "Да" : "Нет"}</h3>
                </h3>
            </article>
        </article>
    </section>
}