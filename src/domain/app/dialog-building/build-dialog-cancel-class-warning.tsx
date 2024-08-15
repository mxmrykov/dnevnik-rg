// @ts-ignore
import Space from "../../../ui/ts/elements/headers/Space.tsx";
// @ts-ignore
import React from "react";

const BuildDialogCancelClassWarning = ({
                                           classId,
                                           coach,
                                           times,
                                           cancelTrigger,
                                           cancelClassTrigger
                                       }): React.JSX.Element => {
    return <article
        className={"col-center"}>
        {Space()}
        <p style={{fontWeight: 600, fontSize: "1.0rem", textAlign: "center"}}>
            Вы действительно хотите отменить это занятие?
        </p>
        {Space()}
        <div>
            <p>
                Время: {times}
            </p>
            <p>
                Тренер: {coach}
            </p>
            <p>
                ID занятия: {classId}
            </p>
        </div>
        {Space()}
        <footer className={"line"}>
            <button
                className={"button-basic"}
                onClick={cancelClassTrigger}
            >
                Да, отменить
            </button>
            <button
                className={"button-basic"}
                onClick={cancelTrigger}
                style={{
                    marginInline: 3
                }}
            >
                Нет, оставить
            </button>
        </footer>
    </article>
}

export default BuildDialogCancelClassWarning