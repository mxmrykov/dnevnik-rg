// @ts-ignore
import RedirectionButton from '../../elements/buttons/Button.tsx';
import "../../../css/blocks.css"

export default function HeaderHome() {
    return <header className="home-header">
        <li>
            {RedirectionButton("/auth", "Войти")}
        </li>
    </header>
}