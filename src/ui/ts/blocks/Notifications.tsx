// @ts-ignore
import React, {useState} from "react";
import { MdNotificationsNone } from "react-icons/md";
import '../../css/sub-styles/notifications.css'

export default function Notifications(): React.JSX.Element {
    const [menuActive, setMenuActive] = useState<boolean>(false)
    return <section>
        <nav className={`notification-menu col ${menuActive && "notification-active"}`}>
            <MdNotificationsNone
                className={"notification-activator"} color={"#262626"}
                onClick={() => setMenuActive(!menuActive)}
            />

        </nav>
        <div
            className={`blured-bg ${menuActive && "blured-bg-active"}`}
            onClick={() => setMenuActive(!menuActive)}
        />
    </section>
}