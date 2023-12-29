import "../../../css/elements.css"

export default function RedirectionButton(uriTo: string, text: string) {
    return <button className="button-basic" onClick={() => {
        window.location.href = uriTo
    }}>
        {text}
    </button>
}

export function Button(props: {text: string, additionalStyles: object}) {
    return <button className="button-basic" style={props.additionalStyles}>
        {props.text}
    </button>
}