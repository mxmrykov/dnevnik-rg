// @ts-ignore
import {ShortClassInfo} from "../../../../domain/constants/class.ts";
// @ts-ignore
import {XlHeaderColored} from "../../elements/headers/Xl-header.tsx";
// @ts-ignore
import React from "react";
// @ts-ignore
import {getMonthName} from "../../../../domain/app/get-day-of-week.ts";

export default function ListHistory({history}): React.JSX.Element {

    const DATE = new Date()

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

    return <section className={"col"}>
        {
            history?.map((class_: ShortClassInfo, idx: number) => {
                return <article
                    className={"class-info"}
                    key={idx}
                    style={{padding: 25}}
                >
                    <span className={"col"}>
                        {XlHeaderColored(
                            class_.class_date.split("-")[2] + " "
                            + getMonthName(
                                Number(class_.class_date.split("-")[1]) - 1
                            ) + " " + class_.class_date.split("-")[0]
                        )}
                        <span className={"line"}>
                            <p
                                style={{fontSize: "1.5rem"}}
                            >
                            {
                                class_?.class_time + " - " +
                                addTimes(
                                    [class_?.class_time, class_?.class_duration]
                                )
                            }
                        </p>
                        <h2>{", " + class_.coach}</h2>
                            {(!class_.scheduled && !class_.deleted) &&
                                <h2 style={{color: "orange", marginLeft: 8}}>{"[Отменено]"}</h2>}
                            {
                                (class_.scheduled &&
                                    addTimes([class_.class_time, class_.class_duration]) < (DATE.getHours() + ":" + getMinutes())
                                    && !class_.deleted
                                )
                                && <h2 style={{color: "lawngreen", marginLeft: 8}}>{"[Завершено]"}</h2>
                            }
                            {(class_.deleted) && <h2 style={{color: "orangered", marginLeft: 8}}>{"[Удалено]"}</h2>}
                        </span>
                    </span>
                    <hr
                        color={"grey"}
                        // @ts-ignore
                        width={"100%"}
                    />
                    <span className={"inbox-pupil-list"}>
                        <h3>
                            Ученицы:
                            {class_?.pupil?.map((val: string, index: number) => {
                                return <React.Fragment>
                                    {" " + val + ((index < (class_?.pupil?.length - 1)) ? ", " : "")}
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
                                                {" " + class_?.class_time}
                                            </span>
                                        </h4>
                            </span>
                            <span>
                                        <h4 style={{marginBlock: 5}}>
                                            Длительность:
                                            <span className={"colored"}>
                                                {" " + class_?.class_duration}
                                            </span>
                                        </h4>
                                    </span>
                            <span style={{marginBlock: 5}}>
                                        <h4>
                                            Тип занятия:
                                            <span className={"colored"}>
                                                {class_?.class_type === "SINGLE" && " Одиночное"}
                                                {class_?.class_type === "MULTIPLE" && " Групповое"}
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
                                                {class_?.is_open_to_sign_up ? " Да" : " Нет"}
                                            </span>
                                        </h4>
                                    </span>
                            <span style={{marginBlock: 5}}>
                                        <h4>
                                            Количество учениц:
                                            <span className={"colored"}>
                                                {" " + class_?.pupil_count}
                                            </span>
                                        </h4>
                                    </span>
                        </article>
                    </div>
                    <div className={"col"}>
                        <a
                            href={"/class/edit/" + class_?.key}
                            title={"Перейти на страницу редактирования оценок и комментариев"}
                        >
                            <button
                                className={"button-basic"}
                            >
                                Редактировать оценки
                            </button>
                        </a>
                    </div>
                </article>
            })
        }
    </section>
}