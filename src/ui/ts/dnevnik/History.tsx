// @ts-ignore
import Sidebar from "../blocks/side-menu/Sidebar.tsx";
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
// @ts-ignore
import React, {useEffect, useState} from "react";
import {
    adminModel,
    coachListModel,
    coachModel,
    pupilListModel,
    pupilModel
    // @ts-ignore
} from "../../../domain/constants/users-models.ts";
// @ts-ignore
import authValid from "../../../domain/app/auth-check.ts";
// @ts-ignore
import exit from "../../../domain/app/exit.ts";
// @ts-ignore
import {PreloadUser} from "../../../domain/http/user-preload.ts";
// @ts-ignore
import Message from "../message-aside/Message.tsx";
// @ts-ignore
import {XlHeaderColored} from "../elements/headers/Xl-header.tsx";
// @ts-ignore
import HistoryFilterSelector from "../blocks/History/HistoryFilterSelector.tsx";
// @ts-ignore
import {ShortClassInfo} from "../../../domain/constants/class.ts";
// @ts-ignore
import PreloadListCoaches from "../../../domain/http/preload-lists/preload-list-coaches.ts";
// @ts-ignore
import PreloadListPupils from "../../../domain/http/preload-lists/preload-list-pupils.ts";
// @ts-ignore
import PreloadCoachPupils from "../../../domain/http/preload-lists/preload-coach-pupils.ts";
// @ts-ignore
import GetClassesHistory from "../../../domain/http/classes/get-classes-history.ts";

import {useSearchParams} from 'react-router-dom';
// @ts-ignore
import Space from "../elements/headers/Space.tsx";
// @ts-ignore
import ListHistory from "../blocks/History/ListHistory.tsx";

export default function History(): React.JSX.Element {
    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [shortCoachList, setShortCoachList] = useState<coachListModel[]>()
    const [shortPupilList, setShortPupilList] = useState<pupilListModel[]>()

    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dialogWindow, setDialogWindow] = useState<React.JSX.Element>()

    const [history, setHistory] = useState<ShortClassInfo[]>()

    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)

    const [searchParams, setSearchParams] = useSearchParams();

    if (!dataPreloaded) {
        if (!authValid()) exit()
        PreloadUser().then(r => {
            if (r.error) {
                setMessage(Message("ERROR", r.message))
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
            } else {
                setUser(r.user)
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                setMessage(Message("SUCCESS", r.message))
                let route: string
                switch (r?.user?.role) {
                    case "ADMIN":
                        route = "/classes/history/admin"
                        break
                    case "COACH":
                        route = "/classes/history/coach"
                        break
                    case "PUPIL":
                        route = "/classes/history/pupil"
                        break
                }

                r?.user?.role === "ADMIN" && PreloadListCoaches().then(r => {
                    if (r.error) {
                        setMessage(Message("ERROR", r.message))
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                    } else {
                        setShortCoachList(r.user)
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                        setMessage(Message("SUCCESS", r.message))
                    }
                })
                let targetFuncListPupils: Promise<{ error: boolean, message: string, user: pupilListModel[] }>
                if (r?.user?.role === "ADMIN") targetFuncListPupils = PreloadListPupils()
                else if (r?.user?.role === "COACH") targetFuncListPupils = PreloadCoachPupils()
                targetFuncListPupils?.then(r => {
                    if (r.error) {
                        setMessage(Message("ERROR", r.message))
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                    } else {
                        setShortPupilList(r.user)
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                        setMessage(Message("SUCCESS", r.message))
                    }
                })

                GetClassesHistory(route, searchParams.get('filterCoachID'), searchParams.get('filterPupilID')).then(responseHistory => {
                    if (responseHistory.error) {
                        setMessage(Message("ERROR", responseHistory.message))
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                    } else {
                        setHistory(responseHistory.classes)
                        setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                        setMessage(Message("SUCCESS", responseHistory.message))
                    }
                })
            }
        })

        setDataPreloaded(true)
    }

    const getHistoryClasses = () => {
        let route: string
        switch (localStorage.getItem("role")) {
            case "ADMIN":
                route = "/classes/history/admin"
                break
            case "COACH":
                route = "/classes/history/coach"
                break
            case "PUPIL":
                route = "/classes/history/pupil"
                break
        }

        GetClassesHistory(route, searchParams.get('filterCoachID'), searchParams.get('filterPupilID')).then(responseHistory => {
            if (responseHistory.error) {
                setMessage(Message("ERROR", responseHistory.message))
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
            } else {
                setHistory(responseHistory.classes)
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                setMessage(Message("SUCCESS", responseHistory.message))
            }
        })
    }

    const setFilteredCoach = e => {
        if (e.target.value === "0") deleteQueryParam("filterCoachID")
        else {
            searchParams.set('filterCoachID', e.target.value)
            setSearchParams(searchParams)
        }
        getHistoryClasses()
    }

    const setFilteredPupil = e => {
        if (e.target.value === "0") deleteQueryParam("filterPupilID")
        else {
            searchParams.set('filterPupilID', e.target.value)
            setSearchParams(searchParams)
        }
        getHistoryClasses()
    }

    const deleteQueryParam = (prm: string) => {
        setSearchParams((params) => {
            params.delete(prm);
            return params;
        });
    }

    return <section className={"home-section"}>
        {message}
        {Sidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
        {dialogWindow}
        <section className={"homepage-section"}>
            <header className={"line"} style={{justifyContent: "space-between"}}>
                <div className={"greeting-header-home col-center"}>
                    {XlHeaderColored("История")}
                </div>
            </header>
            <HistoryFilterSelector
                setFilteredCoachID={setFilteredCoach}
                setFilteredPupilID={setFilteredPupil}
                coachesList={shortCoachList}
                pupilsList={shortPupilList}
                defaultSelectedCoachID={searchParams.get('filterCoachID')}
                defaultSelectedPupilID={searchParams.get('filterPupilID')}
            />
            {
                history?.length === 0 ?
                    <article
                        className={"empty-history-block"}
                    >
                        Упс, похоже,
                        {Space()}
                        {XlHeaderColored("история")}
                        {Space()}
                        пуста
                    </article> :
                    <ListHistory
                        history={history}
                    />
            }
        </section>
    </section>
}