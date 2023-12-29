// @ts-ignore
import React from "react";
// @ts-ignore
import HeaderHome from './blocks/headers/HeaderHome.tsx';
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
import {Helmet} from 'react-helmet';
import "../css/preset.css"
import "../css/global.css"
import "../css/sub-styles/slider.css"
import "../css/adapt/media.css"

function importAll(r: any) {
    return r.keys().map(r);
}

// @ts-ignore
const socialIcons = importAll(require.context("../content/social-icons", false, /\.(png)$/))
// @ts-ignore
const imageGalleryOne = importAll(require.context("../content/image-gallery-2", false, /\.(JPG)$/))
// @ts-ignore
const imageGalleryTwo = importAll(require.context("../content/image-gallery-1", false, /\.(JPG)$/))
// @ts-ignore
const imageGalleryThree = importAll(require.context("../content/image-gallery-3", false, /\.(jpg)$/))

const socialNames = [
    {name: "E-mail", address: "dubova_dv99@mail.ru"},
    {name: "Instagram", address: "@dariadubova__rg.school"},
    {name: "Telegram", address: "Daria Dubova"},
    {name: "VK", address: "Художественная гимнастика. Тренер Дубова Дарья"}]

export default function Home(): React.JSX.Element {
    return (
        <section className="home-section">
            <Helmet>
                <script defer={true} src={"/script.js"}></script>
            </Helmet>
            {<HeaderHome/>}
            <section className={"intro"}>
                <article className={"lined-col"} style={{textAlign: "center"}}>
                    <div className="line">
                        {XxlHeaderColored("Онлайн", undefined)}
                        {<Space/>}
                        {XxlHeader("тренировки", undefined)}
                    </div>
                    {XlHeader("По художественной гимнастике", undefined)}
                    {
                        Island(
                            "Проходят в удобном формате. Вы можете тренироваться из любой точки Мира. Для этого понадобится мобильное устройство, планшет или ноутбук, всё необходимое для вашего вида спорта (предметы и инвентарь).",
                            undefined,
                            undefined)
                    }
                    <div className="line">
                        {XxlHeader("Начни свой путь", {fontSize: "1.6rem"})}
                        {<Space/>}
                        {XxlHeaderColored("к победе", {fontSize: "1.6rem"})}
                        {XxlHeader("!", {fontSize: "1.6rem"})}
                    </div>
                    {XlHeader("Вместе с Дарьей Дубовой", undefined)}
                    {<Space/>}
                    {RedirectionButton("/#first-class", "Записаться")}
                    {ArrowsToTop(true, "Запишись на первое занятие и получи скидку 10%!")}
                </article>
                <aside>
                    <img className={"image image-m"} id={"head-image"} src={introLogo} alt={"intro"}/>
                </aside>
            </section>
            <section className={"intro"}>
                <article className={"lined-col"}>
                    <div className="line">
                        {XxlHeader("Наша", undefined)}
                        {<Space/>}
                        {XxlHeaderColored("цель", undefined)}
                    </div>
                    {Island(undefined,
                        [
                            <React.Fragment><p>✔ Cоздать комфортные условия для занятий.</p><br/></React.Fragment>,
                            <React.Fragment><p>✔ Достичь заметного результата уже спустя месяц тренировок.</p>
                                <br/></React.Fragment>,
                            <React.Fragment><p>✔ Проведение наставнических сессий во время тренировок во избежание, как
                                физического, так и психологического травмирования.</p></React.Fragment>],
                        undefined
                    )}
                </article>
                <article className={"lined-col"}>
                    <div className="line">
                        {XxlHeaderColored("Социальные", undefined)}
                        {<Space/>}
                        {XxlHeader("сети", undefined)}
                    </div>
                    {socials()}
                </article>
            </section>
            <section className={"lined col"} style={{maxWidth: '95%', marginBottom: 50}}>
                <div className="line">
                    {XxlHeader("Дарья", undefined)}
                    {<Space/>}
                    {XxlHeaderColored("Дубова", undefined)}
                </div>
                {XlHeader("О себе", undefined)}
                <section className={"intro"} style={{marginBlock: 15}}>
                    <aside>
                        {galleryOne()}
                    </aside>
                    <article>
                        {Island(undefined,
                            [
                                <React.Fragment><p>Родилась в 1999 году в городе Воронеж. Карьера по художественной
                                    гимнастике началась с 4 лет в СШОР №1 города Воронеж.</p></React.Fragment>,
                                <React.Fragment><p>Спустя время, Дарью пригласили тренироваться на базу Олимпийского
                                    резерва «Динамо-Дмитров», откуда вскоре ее пригласили
                                    в Сборную команду России по групповым упражнениям, для подготовки к Первенству
                                    Европы.</p>
                                </React.Fragment>,
                                <React.Fragment><p>На этом Дарья не закончила свою спортивную карьеру, а решила
                                    сменить вид спорта!</p><br/>
                                </React.Fragment>,
                                <React.Fragment><p>За всю историю спортивной карьеры, Дарья успела посетить такие
                                    страны , как: Китай, Австрия, Португалия, Румыния, Италия, Болгария, Белоруссия,
                                    Финляндия, Эстония, Франция, Бразилия и т.д.</p>
                                </React.Fragment>],
                            {fontSize: "0.9rem", textAlign: "left", letterSpacing: 1, width: 350}
                        )}
                    </article>
                </section>
                <section className={"intro"} style={{marginBlock: 0}}>
                    <article>
                        {Island(undefined,
                            [
                                <React.Fragment><p>Дарья является Мастером спорта международного класса, член
                                    сборной команды России , с 2013-го по 2016-ый года.</p><br/></React.Fragment>,
                                <React.Fragment>
                                    <p style={{textDecoration: "underline", fontWeight: 600, textAlign: "center"}}>Художественная
                                        гимнастика.</p><br/>
                                </React.Fragment>,
                                <React.Fragment><p>– Победительница Юношеских Олимпийских Игр</p>
                                    <br/></React.Fragment>,
                                <React.Fragment><p>– Двукратная победительница первенства Европы</p>
                                    <br/></React.Fragment>,
                                <React.Fragment><p>– Победительница международных турниров, этапов
                                    кубка Мира и всероссийских соревнований. Выступала в личной
                                    программе и групповых упражнениях.
                                </p><br/></React.Fragment>,
                                <React.Fragment>
                                    <p style={{textDecoration: "underline", fontWeight: 600, textAlign: "center"}}>Эстетическая
                                        гимнастика.</p><br/>
                                </React.Fragment>,
                                <React.Fragment><p>В период с 2017-2020 года выступала за сборную России по эстетической
                                    гимнастике</p><br/></React.Fragment>,
                                <React.Fragment><p>– Выиграла Чемпионат Мира в командном зачете и бронзу в
                                    многоборье</p>
                                    <br/></React.Fragment>,
                                <React.Fragment><p>– Бронзовый призер Чемпионата Европы</p>
                                    <br/></React.Fragment>,
                                <React.Fragment><p>– Серебряный призер Чемпионата России
                                </p><br/></React.Fragment>,
                                <React.Fragment><p>– Чемпионка Москвы</p>
                                    <br/></React.Fragment>,
                                <React.Fragment><p>– Призер этапов кубков мира</p>
                                    <br/></React.Fragment>,
                            ],
                            {fontSize: "0.8rem", textAlign: "left", letterSpacing: 1, width: 350}
                        )}
                    </article>
                    <aside>
                        {galleryTwo()}
                    </aside>
                </section>
            </section>
            <section className={"lined col"} style={{maxWidth: '95%'}}>
                <div className="line">
                    {XxlHeader("Тренерство и", {fontSize: "1.6rem"})}
                    {<Space/>}
                    {XxlHeaderColored("образование", {fontSize: "1.6rem"})}
                </div>
                <section className={"intro"} style={{marginBlock: 15}}>
                    <article>
                        {Island(undefined,
                            [
                                <React.Fragment><p>Родилась в 1999 году в городе Воронеж. Карьера по художественной
                                    гимнастике началась с 4 лет в СШОР №1 города Воронеж.</p></React.Fragment>,
                                <React.Fragment><p>Спустя время, Дарью пригласили тренироваться на базу Олимпийского
                                    резерва «Динамо-Дмитров», откуда вскоре ее пригласили
                                    в Сборную команду России по групповым упражнениям, для подготовки к Первенству
                                    Европы.</p>
                                </React.Fragment>,
                                <React.Fragment><p>На этом Дарья не закончила свою спортивную карьеру, а решила
                                    сменить вид спорта!</p><br/>
                                </React.Fragment>,
                                <React.Fragment><p>За всю историю спортивной карьеры, Дарья успела посетить такие
                                    страны , как: Китай, Австрия, Португалия, Румыния, Италия, Болгария, Белоруссия,
                                    Финляндия, Эстония, Франция, Бразилия и т.д.</p>
                                </React.Fragment>],
                            {fontSize: "0.9rem", textAlign: "left", letterSpacing: 1, width: 350}
                        )}
                    </article>
                    <aside>
                        {galleryThree()}
                    </aside>
                </section>
                <section className={"intro"} style={{marginBlock: 0}}>
                    <article>
                        {Island(undefined,
                            [
                                <React.Fragment><p>– Проведено на высшем уровне 50 тренировочных сборов</p>
                                    <br/></React.Fragment>,
                                <React.Fragment><p>– 10 мастер классов по всей России</p>
                                    <br/></React.Fragment>,
                                <React.Fragment><p>– 30 спортсменок из разных уголков Мира и России, с которыми она
                                    работает 4 года в онлайн формате - свыше 3.000 часов тренировок.
                                </p></React.Fragment>,
                            ],
                            {fontSize: "0.8rem", textAlign: "left", letterSpacing: 1, width: 350}
                        )}
                    </article>
                    <article>
                        {Island("Так же с 2019 года, Дарья проводит свои турниры в Воронеже и Москве.\n" +
                            "\"Межрегиональный турнир на призы Чемпионки Юношеских Олимпийских Игр Дарьи Дубовой - Достижение». Каждый Турнир собирает более 300 участниц из разных городов нашей страны.",
                            undefined,
                            {fontSize: "0.8rem", textAlign: "left", letterSpacing: 1, width: 350}
                        )}
                    </article>

                </section>
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

const galleryOne = () => {
    return <div className={"slider"}>
        {imageGalleryOne.map((o: any, key: number) => {
            return <p className={"item"}>
                <img src={o} alt={key.toString()} className={"image image-m"} style={{marginInline: 0}}/>
            </p>
        })}
        <p className="previous" id="previous">&lt;</p>
        <p className="next" id="next">&gt;</p>
    </div>
}

const galleryTwo = () => {
    return <div className={"slider"}>
        {imageGalleryTwo.map((o: any, key: number) => {
            return <p className={"item_1"}>
                <img src={o} alt={key.toString()} className={"image image-m"} style={{marginInline: 0}}/>
            </p>
        })}
        <p className="previous" id="previous_1">&lt;</p>
        <p className="next" id="next_1">&gt;</p>
    </div>
}

const galleryThree = () => {
    return <div className={"slider"}>
        {imageGalleryThree.map((o: any, key: number) => {
            return <p className={"item_2"}>
                <img src={o} alt={key.toString()} className={"image image-m"} style={{marginInline: 0}}/>
            </p>
        })}
        <p className="previous" id="previous_2">&lt;</p>
        <p className="next" id="next_2">&gt;</p>
    </div>
}