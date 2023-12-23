export function XxlHeader(text: string, additionalStyle: object) {
    return <h1 className="xxl-header" style={additionalStyle && additionalStyle}>{text}</h1>
}

export function XxlHeaderColored(text: string, additionalStyle: object) {
    return <h1 className="xxl-header colored" style={additionalStyle && additionalStyle}>{text}</h1>
}