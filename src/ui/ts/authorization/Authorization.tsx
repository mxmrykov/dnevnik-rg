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

export default function Authorization() {
    const [xUserId, setXUserId] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [message, setMessage] = useState<React.JSX.Element>()
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
                    <input className={"input-translucent"} placeholder={"Ваш ID"} value={xUserId} type="text" onChange={(e) => {
                        let i = e.target.value.replace(/[^0-9]/gm, "")
                        if (xUserId?.length < 10 || i?.length < 10) setXUserId(i)
                    }}/>
                    <input className={"input-translucent"} placeholder={"Ваш пароль"} value={password} type="text" onChange={(e) => {
                        let p = e.target.value.replace(/[^0-9A-z]/gm, "")
                        if (password?.length < 7 || p?.length < 7) setPassword(p)
                    }}/>
                    <button onClick={() => {
                        let error = Authorize({xUserId, password})
                        if (error?.error) {
                            setMessage(Message("ERROR", error.text))
                            setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                        }
                    }} className={"button-basic"} style={{marginBlock: 12}}>
                        Войти
                    </button>
                </article>
            </div>
        </div>
    </section>
}