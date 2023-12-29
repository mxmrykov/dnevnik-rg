export default function XlHeader(text: string, additionalStyle: object) {
    return <h1 className="xl-header" style={additionalStyle}>{text}</h1>
}

export function XlHeaderColored(text: string) {
    return <h1 className="xl-header colored">{text}</h1>
}