export const Circles = ({ color, count }: { color: string, count: number }) => {
    return <span className={color}>{new Array(count).fill("●")}</span>
}
