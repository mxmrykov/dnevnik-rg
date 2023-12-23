import "../../../css/elements.css"
export default function RedirectionButton (uriTo: string, text: string) {
    return <button className="button-basic" onClick={() => {
        window.location.href = uriTo
    }}>
        {text}
    </button>
}