// @ts-ignore
import React from "react";
// @ts-ignore
import Space from "../../../ui/ts/elements/headers/Space.tsx";

export default function BuildDialogClassinfo({times, coach, classId, pupils, cancelTrigger, classType, isOpen}): React.JSX.Element {
    return <article
        className={"col-center"}>
        {Space()}
        <div>
            <p style={{
                marginBottom: 10
            }}>
                Время: <p className={"colored"}>{times}</p>
            </p>
            <p style={{
                marginBottom: 10
            }}>
                Тренер: <p className={"colored"}>{coach}</p>
            </p>
            <p
                style={{
                    marginBottom: 10
                }}>
                ID занятия: <p className={"colored"}>{classId}</p>
            </p>
            <p style={{
                marginBottom: 10
            }}>
                Ученицы: <p className={"colored"}>{pupils?.map((pupil: string, index: number) => {
                return (index + 1 === pupils.length) ? pupil : pupil + ", "
            })}</p>
            </p>
            <p
                style={{
                    marginBottom: 10
                }}>
                Тип занятия: <p className={"colored"}>{classType === "SINGLE" ? "Одиночное" : "Групповое"}</p>
            </p>
            <p
                style={{
                    marginBottom: 10
                }}>
                Открыто для записи: <p className={"colored"}>{isOpen ? "Да" : "Нет"}</p>
            </p>
        </div>
        {Space()}
        <footer className={"line"}>
            <button
                className={"button-basic"}
                onClick={cancelTrigger}
                style={{
                    marginInline: 3
                }}
            >
                Закрыть
            </button>
        </footer>
    </article>
}