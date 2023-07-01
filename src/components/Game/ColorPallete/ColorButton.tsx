
export const ColorButton = ({ color, onClick
}: {
    color: string,
    onClick: Function
}) => {
    return (
        <li className={"slot " + color} onClick={() => onClick()}>
            {color[0].toUpperCase()+ color.slice(1)}
        </li>

    )
}
