// @ts-ignore
import React from "react";
// @ts-ignore
import Space from "../../../ui/ts/elements/headers/Space.tsx";

const BuildDialogDeleteUserWarning = ({userName, cancelTrigger, deleteUserTrigger}): React.JSX.Element => {
    return <article
        className={"col-center"}>
        {Space()}
        <p style={{fontWeight: 600, fontSize: "1.0rem"}}>
            Вы действительно хотите удалить этого пользователя?
        </p>
        {Space()}
        <div>
            <p>
                Пользователь: {userName}
            </p>
        </div>
        {Space()}
        <footer className={"line"}>
            <button
                className={"button-basic"}
                onClick={deleteUserTrigger}
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

export default BuildDialogDeleteUserWarning