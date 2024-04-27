// @ts-ignore
import React from "react";
import {IoGridOutline, IoList} from "react-icons/io5";

export default function MenuTypeSelector({menuType, menuAvail, setMenuType}): React.JSX.Element {
    return <span
        className={"line bordered-block"}
        style={{margin: "0 auto"}}
    >
                <p
                    className={menuType === "BLOCK" && "colored_bg"}
                    style={{width: 32, height: 32, cursor: "pointer", padding: 3, borderRadius: 5}}
                    onClick={() => {
                        menuAvail && setMenuType("BLOCK")
                    }}
                >
                    <IoList size={32} color={menuAvail ? "white" : "grey"}/>
                </p>
                <p
                    className={menuType === "MENU" ? "colored_bg line" : "line"}
                    style={{width: 30, height: 30, cursor: "pointer", padding: 3, borderRadius: 5}}
                    onClick={() => setMenuType("MENU")}
                >
                    <IoGridOutline size={28} color={"white"}/>
                </p>
            </span>
}