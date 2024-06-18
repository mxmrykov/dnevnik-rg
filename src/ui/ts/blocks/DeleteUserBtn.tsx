// @ts-ignore
import React from "react";
// @ts-ignore
import DialogWindow from "../dialog/Dialog-window.tsx";
// @ts-ignore
import BuildDialogDeleteUserWarning from "../../../domain/app/dialog-building/build-dialog-delete-user.tsx";
// @ts-ignore
import deleteUser from "../../../domain/http/users/delete-user.ts";
// @ts-ignore
import Message from "../message-aside/Message.tsx";
import {MdDeleteOutline} from "react-icons/md";

export default function DeleteUserButton({user, userType, setDialog, setMessage}): React.JSX.Element {
    return <MdDeleteOutline
        title={"Удалить"}
        className={"delete-user-ico"}
        color={"lightgrey"}
        size={34}
        onClick={e => {
            e.preventDefault()
            setDialog(DialogWindow("Удаление пользователя",
                <BuildDialogDeleteUserWarning
                    userName={user?.fio}
                    cancelTrigger={() => {
                        setDialog(<React.Fragment></React.Fragment>)
                    }}
                    deleteUserTrigger={() => {
                        deleteUser(user?.key, userType).then(res => {
                            let message = (res?.error ? "Произошла ошибка при удалении пользователя" : "Пользователь удален")
                            setDialog(<React.Fragment></React.Fragment>)
                            setMessage(Message((res?.error ? "ERROR" : "INFO"), message))
                            setTimeout(() => setMessage(
                                <React.Fragment></React.Fragment>), 5100)
                        })
                    }}
                />))
        }}
    />
}