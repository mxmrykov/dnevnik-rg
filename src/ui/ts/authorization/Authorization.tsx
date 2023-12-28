import "../../css/preset.css"
import "../../css/global.css"
//@ts-ignore
import XlHeader, {XlHeaderColored} from "../elements/headers/Xl-header.tsx";
//@ts-ignore
import Space from "../elements/headers/Space.tsx";
//@ts-ignore
import {Button} from "../elements/buttons/Button.tsx";
//@ts-ignore
import Message from "../message-aside/Message.tsx";
//@ts-ignore
import React, {useState} from "react";
//@ts-ignore
import Authorize from "../../../domain/http/auth.ts";
//@ts-ignore
import authValid from "../../../domain/app/auth-check.ts";

export default function Authorization() {
    const [xUserId, setXUserId] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [message, setMessage] = useState<React.JSX.Element>()
    if (authValid()) window.location.href = '/home'
    return <section className={"home-section"}>
        {message}
        <div className={"full-height-center"}>
            <div className={"dialog-translucent col"}>
                <article className={"col"}>
                    <img alt={"logo"} src={"/logo512.png"} className={"image-s"}/>
                    <p className={"line"}>
                        {XlHeader("Вход в", {color: "white"})}
                        {Space()}
                        {XlHeaderColored("аккаунт")}
                    </p>
                </article>
                <article className={"col"}>
                    <input className={"input-translucent"} placeholder={"Ваш ID"} value={xUserId} type="text"
                           onChange={(e) => setXUserId(e.target.value)}/>
                    <input className={"input-translucent"} placeholder={"Ваш пароль"} value={password} type="text"
                           onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={() => {
                        let auth = Authorize({xUserId, password})
                            .then((result) => {
                                if (result.error) {
                                    setMessage(Message("ERROR", result.text))
                                    setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                } else {
                                    setMessage(Message("SUCCESS", result.text))
                                    setTimeout(() => window.location.href = "/home")
                                }
                            })
                    }} className={"button-basic"} style={{marginBlock: 12}}>
                        Войти
                    </button>
                </article>
            </div>
        </div>
    </section>
}