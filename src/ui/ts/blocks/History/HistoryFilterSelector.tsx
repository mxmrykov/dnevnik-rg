// @ts-ignore
import XlHeader from "../../elements/headers/Xl-header.tsx";
// @ts-ignore
import React from "react";

export default function HistoryFilterSelector({
                                                  setFilteredCoachID,
                                                  setFilteredPupilID,
                                                  coachesList,
                                                  pupilsList,
                                                  defaultSelectedCoachID,
                                                  defaultSelectedPupilID
                                              }): React.JSX.Element {

    return <article className={"full-width-window-homepage"}>
        <header className={"line"}>
            {XlHeader("Фильтры", {color: "white"})}
        </header>
        <div
            className={"line"}
            style={{margin: 15}}
        >
            <span
                className={"line"}
            >
                <label
                    style={{
                        color: "white",
                        textAlign: "left",
                        marginInline: 10
                    }}>
                    Тренер
                </label>
                <select
                    className={"input-translucent"}
                    style={{padding: "7px 12px"}}
                    onChange={e => {
                        setFilteredCoachID(e)
                    }}
                    value={
                        (defaultSelectedCoachID === undefined || defaultSelectedCoachID === null)
                            ? "0"
                            : defaultSelectedCoachID
                    }
                >
                    <option
                        value={"0"}
                    >
                        Не выбрано
                    </option>
                    {
                        coachesList?.map(coach => {
                            console.log(coach)
                            return <option
                                key={coach?.key}
                                value={coach?.key}
                            >
                                {coach?.fio}
                            </option>
                        })
                    }
                </select>
            </span>
            <span
                className={"line"}
            >
                <label
                    style={{
                        color: "white",
                        textAlign: "left",
                        marginInline: 10
                    }}>
                    Ученица
                </label>
                <select
                    className={"input-translucent"}
                    style={{padding: "7px 12px"}}
                    onChange={e => {
                        setFilteredPupilID(e)
                    }}
                    value={
                        (defaultSelectedPupilID === undefined || defaultSelectedPupilID === null)
                            ? "0"
                            : defaultSelectedPupilID
                    }
                >
                    <option
                        value={"0"}
                    >
                        Не выбрано
                    </option>
                    {
                        pupilsList?.map(pupil => {
                            return <option
                                key={pupil?.key}
                                value={pupil?.key}
                            >
                                {pupil?.fio}
                            </option>
                        })
                    }
                </select>
            </span>
        </div>

    </article>
}