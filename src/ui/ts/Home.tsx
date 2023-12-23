// @ts-ignore
import HeaderHome from './blocks/headers/HeaderHome.tsx';
// @ts-ignore
import Intro from "./blocks/HomeBlocks/Intro.tsx";
import "../css/preset.css"
import "../css/global.css"
// @ts-ignore
import {XxlHeader, XxlHeaderColored} from "./elements/headers/Xxl-header.tsx";
// @ts-ignore
import Space from "./elements/headers/Space.tsx";
// @ts-ignore
import XlHeader from "./elements/headers/Xl-header.tsx";
// @ts-ignore
import Island from "./blocks/block/Island.tsx";
// @ts-ignore
import RedirectionButton from "./elements/buttons/Button.tsx";
// @ts-ignore
import ArrowsToTop from "./blocks/block/Arrows-to-top.tsx";
// @ts-ignore
import introLogo from "../content/Intro-logo.jpg";
// @ts-ignore
import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
const images = [
    {
        original: 'https://dnevnik-rg.ru/static/media/about10.525e562547ecd0ad4c4d.JPG',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        sizes: {
            width: 250,
            height: 250
        }

    },
    {
        original: 'https://dnevnik-rg.ru/static/media/about14.e5df89d3988b0ded45bb.JPG',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/',
        sizes: {
            width: 250,
            height: 250
        }
    },
    {
        original: 'https://dnevnik-rg.ru/static/media/about10.525e562547ecd0ad4c4d.JPG',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/',
        sizes: {
            width: 250,
            height: 250
        }
    }
]

function importAll(r) {
    return r.keys().map(r);
}

// @ts-ignore
const socialIcons = importAll(require.context("../content/social-icons", false, /\.(png)$/))
const socialNames = [
    {name: "E-mail", address: "dubova_dv99@mail.ru"},
    {name: "Instagram", address: "@dariadubova__rg.school"},
    {name: "Telegram", address: "Daria Dubova"},
    {name: "VK", address: "Художественная гимнастика. Тренер Дубова Дарья"}]

export default function Home(): React.JSX.Element {
    socials()
    return (
        <section className="home-section">
            {<HeaderHome/>}
            <section className={"intro"}>
                <article className={"lined-col"}>
                    <div className="line">
                        {XxlHeaderColored("Онлайн")}
                        {<Space/>}
                        {XxlHeader("тренировки")}
                    </div>
                    {XlHeader("По художественной гимнастике")}
                    {
                        Island(
                        "Проходят в удобном формате. Вы можете тренироваться из любой точки Мира. Для этого понадобится мобильное устройство, планшет или ноутбук, всё необходимое для вашего вида спорта (предметы и инвентарь).",
                            undefined,
                        undefined)
                    }
                    <div className="line">
                        {XxlHeader("Начни свой путь к")}
                        {<Space/>}
                        {XxlHeaderColored("победе")}
                        {XxlHeader("!")}
                    </div>
                    {XlHeader("Вместе с Дарьей Дубовой")}
                    {<Space/>}
                    {RedirectionButton("/#first-class", "Записаться")}
                    {ArrowsToTop(true, "Запишись на первое занятие и получи скидку 10%!")}
                </article>
                <aside>
                    <img className={"image image-m"} src={introLogo} alt={"intro-image"}/>
                </aside>
            </section>
            <section className={"intro"}>
                <article className={"lined-col"}>
                    <div className="line">
                        {XxlHeader("Наша")}
                        {<Space/>}
                        {XxlHeaderColored("цель")}
                    </div>
                    {Island(undefined,
                        [
                            <React.Fragment><p>✔ Cоздать комфортные условия для занятий.</p><br/></React.Fragment>,
                            <React.Fragment><p>✔ Достичь заметного результата уже спустя месяц тренировок.</p><br/></React.Fragment>,
                            <React.Fragment><p>✔ Проведение наставнических сессий во время тренировок во избежание, как физического, так и психологического травмирования.</p></React.Fragment>],
                        undefined
                    )}
                </article>
                <article className={"lined-col"}>
                    <div className="line">
                        {XxlHeader("Мы в")}
                        {<Space/>}
                        {XxlHeaderColored("социальных")}
                        {<Space/>}
                        {XxlHeader("сетях")}
                    </div>
                    {socials()}
                </article>
                <ImageGallery
                    lazyLoad={true}
                    items={images}
                    showThumbnails={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    autoPlay={true}
                />
            </section>
        </section>
    )
}

const socials = () => {
    return socialIcons.map((o: any, key: number) => {
        return Island(
            undefined,
            [<React.Fragment>
                <img className={"image image-xs"} alt={socialNames[key].name} src={o}/>
                <div style={{display: 'flex', flexDirection: "column"}}>
                    <p>{socialNames[key].name}</p>
                    <p className={"subtext"}>{socialNames[key].address}</p>
                </div>
            </React.Fragment>],
            {marginBlock: 7, display: 'flex', alignItems: 'center', width: 275, textAlign: 'left'}
        )
    })
}