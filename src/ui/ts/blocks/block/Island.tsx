// @ts-ignore
import React from "react";

export default function Island(text: string, objects: any, additionalStyles:object) {
    return <div className="island" style={additionalStyles && additionalStyles}>
        {text && text}
        {
            objects && objects.map((object: any, key: number) => {
                return <React.Fragment key={key}>
                    {object}
                </React.Fragment>
            })
        }
    </div>
}