// @ts-ignore
import Space from "../../../ui/ts/elements/headers/Space.tsx";
// @ts-ignore
import React from "react";

const BuildDialogDeleteClassWarning = ({classId, coach, times, cancelTrigger, deleteClassTrigger}): React.JSX.Element => {
    return <article
        className={"col-center"}>
        {Space()}
        <p style={{fontWeight: 600, fontSize: "1.0rem"}}>
            Вы действительно хотите удалить это занятие?
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
                onClick={deleteClassTrigger}
            >
                Да, удалить
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

export default BuildDialogDeleteClassWarning