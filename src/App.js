import {Route, Routes} from "react-router-dom";
import Home from "./ui/ts/Home.tsx";
import Authorization from "./ui/ts/authorization/Authorization.tsx";
import Homepage from "./ui/ts/dnevnik/Homepage.tsx";
import UsersPage from "./ui/ts/dnevnik/Users-page.tsx";
import CreateUser from "./ui/ts/dnevnik/Create-user.tsx";
import Info from "./ui/ts/dnevnik/Info.tsx";
import Calendar from "./ui/ts/dnevnik/Calendar.tsx";
import CreateClass from "./ui/ts/dnevnik/Create-class.tsx";

const homePath = {route: "/", elem: <Home/>}
const homePagePath = {route: "/home", elem: <Homepage/>}
const authPath = {route: "/auth", elem: <Authorization/>}
const usersPageDnevnikPath = {route: "/users", elem: <UsersPage/>}
const createUserPath = {route: "/users/create", elem: <CreateUser/>}
const infoPath = {route: "/info", elem: <Info/>}
const calendarPath = {route: "/calendar", elem: <Calendar/>}
const newClassPath = {route: "/calendar/create", elem: <CreateClass/>}

export default function App() {
    return <Routes>
        <Route path={homePath.route} element={homePath.elem}/>
        <Route path={authPath.route} element={authPath.elem}/>
        <Route path={homePagePath.route} element={homePagePath.elem}/>
        <Route path={usersPageDnevnikPath.route} element={usersPageDnevnikPath.elem}/>
        <Route path={createUserPath.route} element={createUserPath.elem}/>
        <Route path={infoPath.route} element={infoPath.elem}/>
        <Route path={calendarPath.route} element={calendarPath.elem}/>
        <Route path={newClassPath.route} element={newClassPath.elem}/>
    </Routes>
}