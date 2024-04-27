// @ts-ignore
import Space from "../../../ui/ts/elements/headers/Space.tsx";
// @ts-ignore
import React, {useState} from "react";

export default function BuildDialogNewClass(
    coach: string,
    date: string,
    time: string,
    duration: string,
    isOpen: boolean,
    key: number
): React.JSX.Element {
    return <article
        className={"col-center"}>
        {Space()}
        <p style={{fontWeight: 600, fontSize: "1.0rem"}}>
            {coach}
        </p>
        {Space()}
        <div>
            <p>
                Дата: {date}
            </p>
            <p>
                Время: {time}
            </p>
            <p>
                Длительность: {duration}
            </p>
            <p>
                Открыто для записи: {isOpen ? "Да" : "Нет"}
            </p>
        </div>
        {Space()}
        <p className={"subtext"} style={{textAlign: "center"}}>
            Ссылка на занятие:
        </p>
        {Space()}
        <footer className={"line"}>
            <input
                className={"input-translucent"}
                style={{
                    marginInline: 5,
                }}
                value={`${window.location.host}/calendar/class/${key}`}
                disabled={true}
            />
            <button
                className={"button-basic"}
                onClick={() => {
                    navigator.clipboard.writeText(`${window.location.host}/calendar/class/${key}`)
                    alert('Ссылка скопирована')
                }}>
                Копировать
            </button>
        </footer>
        <button
            className={"button-basic"}
            onClick={() => window.location.href = "/calendar"}
        >
            Закрыть
        </button>
    </article>
}