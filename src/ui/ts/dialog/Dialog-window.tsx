// @ts-ignore
import React from "react";
// @ts-ignore
import XlHeader from "../elements/headers/Xl-header.tsx";

export default function DialogWindow
(header: string, body: React.JSX.Element): React.JSX.Element {
    return <React.Fragment>
        <div className={"dialog-window-bgblur"}/>
        <section
            style={{
                height: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <article className={"dialog-window"}>
                <header>
                    {XlHeader(header, undefined)}
                </header>
                {body}
            </article>
        </section>
    </React.Fragment>
}