// @ts-ignore
import HeaderHome from './blocks/headers/HeaderHome.tsx';
// @ts-ignore
import Intro from "./blocks/HomeBlocks/Intro.tsx";
import "../css/preset.css"
import "../css/global.css"

export default function Home() {
    return (
        <section className="home-section">
            {<HeaderHome/>}
            {<Intro/>}
        </section>
    )
}