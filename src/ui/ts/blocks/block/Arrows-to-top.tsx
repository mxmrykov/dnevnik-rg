import "../../../css/animations.css"
export default function ArrowsToTop(isSubtitled: boolean, subtitle: string) {
    return <div className={"line-middle col"} style={{animation: "1s ease 0s infinite normal none running bounce"}}>
        <div>
            <p style={{color: 'rgb(171, 171, 171)', marginBottom: -14}}>∧</p>
            <p style={{color: 'rgb(171, 171, 171)'}}>∧</p>
        </div>
        {
            isSubtitled && <p className={"subtext"} style={{color: 'rgb(89, 89, 89)'}}>{subtitle}</p>
        }
    </div>
}