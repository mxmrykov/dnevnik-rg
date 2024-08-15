// @ts-ignore
import React from "react";
// @ts-ignore
import Space from "../../elements/headers/Space.tsx";
// @ts-ignore
import RedirectionButton from "../../elements/buttons/Button.tsx";
// @ts-ignore
import XlHeader from "../../elements/headers/Xl-header.tsx";

export default function ClassNotFound(): React.JSX.Element {
    return <article className={"forbidden-dialog"}>
        <div className={"line"}>
            {XlHeader("Занятие", undefined)}
            {Space()}
            {XlHeader("не существует", {color: "#E41655"})}
        </div>
        <p style={{marginBlock: 10, textAlign: "justify"}}>
            Похоже, такого занятия не существует, оно было удалено
            или у вас нет к нему доступа.
        </p>
        <p style={{fontWeight: 400, fontSize: "0.9rem"}}>
            Рекомендованные действия:<br/>
            - Перезагрузить страницу<br/>
            - Выйти из аккаунта и войти ещё раз<br/>
        </p>
        <p style={{marginBlock: 10}} className={"col-center"}>
            {RedirectionButton("/calendar", "В календарь")}
        </p>
    </article>
}