// @ts-ignore
import AdminSidebar from "./Admin-sidebar.tsx";
// @ts-ignore
import CoachSidebar from "./Coach-sidebar.tsx";
// @ts-ignore
import React from "react";
// @ts-ignore
import PupilSidebar from "./Pupil-sidebar.tsx";

export default function Sidebar(props: {img: string, fio: string}): React.JSX.Element {
    switch (localStorage.getItem("role")) {
        case "ADMIN":
            return AdminSidebar(props);
        case "COACH":
            return CoachSidebar(props);
        case "PUPIL":
            return PupilSidebar(props);
    }
}