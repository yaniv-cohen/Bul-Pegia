
export const ColorButton = ({ color, onClick
}: {
    color: string,
    onClick: Function
}) => {
    return (
        <li className={"slot " + color} onClick={() => onClick()}>
            {color}
        </li>

    )
}
