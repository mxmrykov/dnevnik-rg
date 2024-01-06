// @ts-ignore
import Space from "../../../ui/ts/elements/headers/Space.tsx";
// @ts-ignore
import React from "react";

export default function BuildDialogNewUser(fio: string, userID: number, checksum: string): React.JSX.Element {
    return <article
        className={"col-center"}>
        {Space()}
        <p style={{fontWeight: 600, fontSize: "1.0rem"}}>
            {fio}
        </p>
        {Space()}
        <div>
            <p>
                ID Пользователя: {userID}
            </p>
            <p>
                Пароль: {checksum}
            </p>
        </div>
        {Space()}
        <p className={"subtext"} style={{textAlign: "center"}}>
            Скопируйте эти данные и вышлите конечному пользователю
        </p>
        {Space()}
        <footer className={"line"}>
            <button
                className={"button-basic"}
                style={{marginInline: 5}}
                onClick={() => {
                    navigator.clipboard.writeText(`${fio}\nID: ${userID}\nПароль: ${checksum}`)
                }}>
                Скопировать данные
            </button>
            <button
                className={"button-basic"}
                onClick={() => {
                    window.location.href = ""
                }}>
                Закрыть
            </button>
        </footer>
    </article>
}