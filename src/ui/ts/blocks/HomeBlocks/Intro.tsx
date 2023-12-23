//@ts-ignore
import {XxlHeader, XxlHeaderColored} from "../../elements/headers/Xxl-header.tsx";
//@ts-ignore
import Space from "../../elements/headers/Space.tsx";
//@ts-ignore
import XlHeader from "../../elements/headers/Xl-header.tsx";
//@ts-ignore
import Island from "../block/Island.tsx";
//@ts-ignore
import RedirectionButton from "../../elements/buttons/Button.tsx";

export default function Intro() {
    return <section>
        <section>
            <article>
                <div className="line">
                    {XxlHeaderColored("Онлайн")}
                    {Space()}
                    {XxlHeader("тренировки")}
                </div>
                {XlHeader("По художественной гимнастике")}
                {Island("Проходят в удобном формате. Вы можете тренироваться из любой точки Мира. Для этого понадобится мобильное устройство, планшет или ноутбук, всё необходимое для вашего вида спорта (предметы и инвентарь).")}
                <div className="line">
                    {XxlHeader("Начни свой путь к")}
                    {Space()}
                    {XxlHeaderColored("победе")}
                    {XxlHeader("!")}
                </div>
                {XlHeader("Вместе с Дарьей Дубовой")}
                {RedirectionButton("/#first-class", "Записаться")}
            </article>
            <aside>

            </aside>
        </section>
    </section>
}