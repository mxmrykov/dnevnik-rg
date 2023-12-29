import {Route, Routes} from "react-router-dom";
import Home from "./ui/ts/Home.tsx";
import Authorization from "./ui/ts/authorization/Authorization.tsx";
import Homepage from "./ui/ts/dnevnik/Homepage.tsx";

const homePath = {route: "/", elem: <Home/>}
const homePagePath = {route: "/home", elem: <Homepage/>}
const authPath = {route: "/auth", elem: <Authorization/>}

export default function App() {
  return <Routes>
    <Route path={homePath.route} element={homePath.elem} />
    <Route path={authPath.route} element={authPath.elem} />
    <Route path={homePagePath.route} element={homePagePath.elem} />
  </Routes>
}