import {Route, Routes} from "react-router-dom";
import Home from "./ui/ts/Home.tsx";

const homePath = {route: "/"}

export default function App() {
  return <Routes>
    <Route path={homePath.route} element={<Home/>} />
  </Routes>
}