import {Route, Routes} from "react-router-dom";
import Home from "./ui/ts/Home.tsx";
import Authorization from "./ui/ts/authorization/Authorization.tsx";

const homePath = {route: "/", elem: <Home/>}
const authPath = {route: "/auth", elem: <Authorization/>}

export default function App() {
  return <Routes>
    <Route path={homePath.route} element={homePath.elem} />
    <Route path={authPath.route} element={authPath.elem} />
  </Routes>
}