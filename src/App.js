import {Route, Routes} from "react-router-dom";
import Home from "./ui/ts/Home.tsx";
import Authorization from "./ui/ts/authorization/Authorization.tsx";
import Homepage from "./ui/ts/dnevnik/Homepage.tsx";
import UsersPage from "./ui/ts/dnevnik/Users-page.tsx";

const homePath = {route: "/", elem: <Home/>}
const homePagePath = {route: "/home", elem: <Homepage/>}
const authPath = {route: "/auth", elem: <Authorization/>}
const usersPageDnevnikPath = {route: "/users", elem: <UsersPage/>}

export default function App() {
    return <Routes>
        <Route path={homePath.route} element={homePath.elem}/>
        <Route path={authPath.route} element={authPath.elem}/>
        <Route path={homePagePath.route} element={homePagePath.elem}/>
        <Route path={usersPageDnevnikPath.route} element={usersPageDnevnikPath.elem}/>

    </Routes>
}