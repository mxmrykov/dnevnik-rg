// @ts-ignore
import React from "react";
// @ts-ignore
import DialogWindow from "../dialog/Dialog-window.tsx";
// @ts-ignore
import BuildDialogArchiveUserWarning from "../../../domain/app/dialog-building/build-dialog-archive-user.tsx";
// @ts-ignore
import archiveUser from "../../../domain/http/users/archive-user.ts";
// @ts-ignore
import Message from "../message-aside/Message.tsx";
import {MdOutlineUnarchive} from "react-icons/md";

export default function ArchiveBtn({user, userType, setDialog, setMessage}): React.JSX.Element {
    return <MdOutlineUnarchive
        title={"Архивировать"}
        className={"delete-user-ico"}
        color={"lightgrey"}
        size={34}
        onClick={e => {
            console.log(e)
            e.preventDefault()
            setDialog(DialogWindow("Архивация пользователя",
                    <BuildDialogArchiveUserWarning
                        userName={user?.fio}
                        cancelTrigger={() => {
                            setDialog(<React.Fragment></React.Fragment>)
                        }}
                        archiveUserTrigger={() => {
                            archiveUser(user?.key, userType).then(res => {
                                let message = (res?.error ? "Произошла ошибка при архивации пользователя" : "Пользователь архивирован")
                                setDialog(<React.Fragment></React.Fragment>)
                                setMessage(Message((res?.error ? "ERROR" : "INFO"), message))
                                setTimeout(() => setMessage(
                                    <React.Fragment></React.Fragment>), 5100)
                            })
                        }}
                    />
                )
            )
        }}
    />
}