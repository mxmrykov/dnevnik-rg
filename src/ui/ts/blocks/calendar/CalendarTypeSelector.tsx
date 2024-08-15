// @ts-ignore
import React from "react";
// @ts-ignore
import XlHeader from "../../elements/headers/Xl-header.tsx";

export default function CalendarTypeSelector({monthAvail, calendarType, setCalendarType}): React.JSX.Element {
    return <article className={"full-width-window-homepage"}>
        <header className={"line"}>
            {XlHeader("Фильтры", {color: "white"})}
        </header>
        <div
            className={"line"}
            style={{margin: 15}}
        >
                    <span className={"line"}>
                            <label style={{color: "white", textAlign: "left", marginInline: 10}}>Период</label>
                            <select
                                className={"input-translucent"}
                                style={{padding: "7px 12px"}}
                                onChange={e => setCalendarType(e.target.value)}
                                value={calendarType}
                            >
                                    <option value="day">День</option>
                                    <option disabled={!monthAvail} value="month">Месяц</option>
                            </select>
                        </span>
        </div>
    </article>
}