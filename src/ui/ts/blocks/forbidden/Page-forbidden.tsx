// @ts-ignore
import React from "react";
// @ts-ignore
import {XxlHeader, XxlHeaderColored} from "../../elements/headers/Xxl-header.tsx";
// @ts-ignore
import Space from "../../elements/headers/Space.tsx";
// @ts-ignore
import RedirectionButton from "../../elements/buttons/Button.tsx";

export default function PageForbidden(): React.JSX.Element {
    return <article className={"forbidden-dialog"}>
        <div className={"line"}>
            {XxlHeader("Доступ", undefined)}
            {Space()}
            {XxlHeaderColored("запрещён", undefined)}
        </div>
        <p style={{marginBlock: 10, textAlign: "justify"}}>
            Похоже, у вас нехватает прав, чтобы посетить эту страницу.
            Если произошла ошибка, пожалуйста, обратитесь к администратору.
        </p>
        <p style={{fontWeight: 400, fontSize: "0.9rem"}}>
            Рекомендованные действия:<br/>
            - Перезагрузить страницу<br/>
            - Выйти из аккаунта и войти ещё раз<br/>
        </p>
        <p style={{marginBlock: 10}} className={"col-center"}>
            {RedirectionButton("/home", "На главную")}
        </p>
    </article>
}