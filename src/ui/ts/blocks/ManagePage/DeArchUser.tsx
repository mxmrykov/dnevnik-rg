// @ts-ignore
import React from "react";

export default function DeArchUser({userType, preloadList, setSelectedDAUser, deArchUserTrigger}): React.JSX.Element {
    return <div
        style={{
            marginBlock: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <h1
            style={{
                color: "white",
                marginInline: 15
            }}
        >
            {userType}
        </h1>
        <select
            className={"input-translucent"}
            style={{padding: "7px 12px"}}
            onChange={e => {
                setSelectedDAUser(Number(e.target.value))
            }}
        >
            <option
                selected={true}
                disabled={true}
            >
                Выберете ученицу
            </option>
            {
                preloadList?.map(archUser => {
                    return <option
                        key={archUser?.key}
                        value={archUser?.key}
                    >
                        {archUser?.fio}
                    </option>
                })
            }
        </select>
        <button
            className={"button-basic"}
            style={{marginInline: 5}}
            onClick={deArchUserTrigger}
        >
            Разархивировать
        </button>
    </div>
}