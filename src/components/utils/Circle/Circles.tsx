export const Circles = ({ color, count }: { color: string, count: number }) => {
    return <span className={'circle ' + color+"-result"}>{new Array(count).fill("●")}</span>
}
