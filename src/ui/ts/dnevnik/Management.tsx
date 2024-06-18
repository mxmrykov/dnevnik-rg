// @ts-ignore
import Sidebar from "../blocks/side-menu/Sidebar.tsx";
// @ts-ignore
import Notifications from "../blocks/Notifications.tsx";
// @ts-ignore
import React, {useState} from "react";
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
import PageForbidden from "../blocks/forbidden/Page-forbidden.tsx";
// @ts-ignore
import XlHeader from "../elements/headers/Xl-header.tsx";
// @ts-ignore
import GetArchivedUsers from "../../../domain/http/users/get-archived-users.ts";
// @ts-ignore
import DeArchUser from "../blocks/ManagePage/DeArchUser.tsx";
// @ts-ignore
import DeArchiveUser from "../../../domain/http/users/dearchive-user.ts";

export default function Management(): React.JSX.Element {

    const [user, setUser] = useState<pupilModel | coachModel | adminModel>()
    const [message, setMessage] = useState<React.JSX.Element>(<React.Fragment></React.Fragment>)
    const [dialog, setDialog] = useState<React.JSX.Element>()
    const [dataPreloaded, setDataPreloaded] = useState<boolean>(false)
    const [preloadArchivePupilsList, setPreloadArchivePupilsList] =
        useState<pupilListModel[]>(undefined)
    const [preloadArchiveCoachesList, setPreloadArchiveCoachesList] =
        useState<coachListModel[]>(undefined)

    const [selectedDeArchPupil, setSelectedDeArchPupil] = useState<number>(null)
    const [selectedDeArchCoach, setSelectedDeArchCoach] = useState<number>(null)

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
                if (r.user?.role === "ADMIN") {
                    const neededLists: string[] = ["pupil", "coach"]
                    neededLists.forEach(userType => {
                        GetArchivedUsers(userType).then(response => {
                            if (response.error) {
                                setMessage(Message("ERROR", "Ошибка загрузки арх. пользователей"))
                                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                            } else {
                                userType === "pupil" ?
                                    setPreloadArchivePupilsList(response.data) :
                                    setPreloadArchiveCoachesList(response.data)
                                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                                setMessage(Message("SUCCESS", "Арх. Пользователи подгружены"))
                            }
                        })
                    })
                }
            }
        })
        setDataPreloaded(true)
    }

    const handleDeArchUser = e => {
        let targetFunc;
        if (e.target.id === "Ученицы") {
            targetFunc = DeArchiveUser("pupil", selectedDeArchPupil)
        } else if (e.target.id === "Тренеры") {
            targetFunc = DeArchiveUser("coach", selectedDeArchCoach)
        }
        targetFunc.then(res => {
            if (res.error) {
                setMessage(Message("ERROR", "Ошибка разархивации пользователя"))
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
            } else {
                setTimeout(() => setMessage(<React.Fragment></React.Fragment>), 5100)
                setMessage(Message("SUCCESS", "Пользователь разархивирован"))
            }
        })
    }


    return <section className={"home-section"}>
        {message}
        {Sidebar({img: user?.logo_uri, fio: user?.fio})}
        {Notifications()}
        {dialog}
        {user?.role === "ADMIN" ? <section
                className={"homepage-section"}>
                <article className={"full-width-window-homepage"}>
                    {XlHeader("Архивироанные пользователи", {color: "white"})}
                    <DeArchUser
                        userType="Тренеры"
                        preloadList={preloadArchiveCoachesList}
                        setSelectedDAUser={setSelectedDeArchCoach}
                        deArchUserTrigger={handleDeArchUser}
                    />
                    <hr color={"grey"}/>
                    <DeArchUser
                        userType="Ученицы"
                        preloadList={preloadArchivePupilsList}
                        setSelectedDAUser={setSelectedDeArchPupil}
                        deArchUserTrigger={handleDeArchUser}
                    />
                </article>
            </section> :
            <div className={"col-center"} style={{width: "100%", height: "100vh"}}>
                {PageForbidden()}
            </div>
        }
    </section>
}