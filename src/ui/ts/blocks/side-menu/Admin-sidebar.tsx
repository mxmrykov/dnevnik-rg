import '../../../css/sub-styles/sidebar.css'
import {IoHomeOutline, IoCalendarClearOutline} from "react-icons/io5";
// @ts-ignore
import React, {useState} from "react";
import {GoHistory} from "react-icons/go";
import {FiUsers} from "react-icons/fi";
import {MdOutlineManageAccounts} from "react-icons/md";
import {IoMenuOutline} from "react-icons/io5";
// @ts-ignore
import exit from "../../../../domain/app/exit.ts";

export default function AdminSidebar(props: { img: string, fio: string }): React.JSX.Element {
    const [menuActive, setMenuActive] = useState<boolean>(false)
    return <section>
        <nav className={`side-menu col ${menuActive && "side-active"}`}>
            <IoMenuOutline
                className={"side-activator"} color={"#262626"}
                onClick={() => setMenuActive(!menuActive)}
            />
            <article className={"sidebar-mini-profile col"}>
                <div className={"line"} style={{width: "100%", justifyContent: "flex-start"}}>
                    <img alt={"mini profile"} className={"image-s-m"} style={{marginInline: 10}} src={props?.img}/>
                    <aside className={"col"} style={{alignItems: "start"}}>
                        <h3>{props?.fio?.split(" ")[1]}</h3>
                        <p>Администратор</p>
                    </aside>
                </div>
                <hr style={{width: "100%"}} color={"grey"}/>
                <a href={"/profile"} style={{color: "white"}}>
                    Мой профиль
                </a>
            </article>
            <ul>
                <li>
                    <a href={"/home"} className={"line"}>
                        <IoHomeOutline size={25} style={{marginInline: 5}}/>
                        Домашняя
                    </a>
                </li>
                <li>
                    <a href={"/calendar"} className={"line"}>
                        <IoCalendarClearOutline size={25} style={{marginInline: 5}}/>
                        Календарь
                    </a>
                </li>
                <li>
                    <a href={"/history"} className={"line"}>
                        <GoHistory size={25} style={{marginInline: 5}}/>
                        История
                    </a>
                </li>
                <li>
                    <a href={"/users"} className={"line"}>
                        <FiUsers size={25} style={{marginInline: 5}}/>
                        Пользователи
                    </a>
                </li>
                <li>
                    <a href={"/manage"} className={"line"}>
                        <MdOutlineManageAccounts size={25} style={{marginInline: 5}}/>
                        Управление
                    </a>
                </li>
            </ul>
            <button onClick={() => exit()} className={"button-basic"}>
                Выйти
            </button>
        </nav>
        <div
            className={`blured-bg ${menuActive && "blured-bg-active"}`}
            onClick={() => setMenuActive(!menuActive)}
        />
    </section>
}