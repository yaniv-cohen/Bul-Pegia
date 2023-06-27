
export const ColorButton = ({ color, onClick
    // setChosenOption, targetSlot,
}: {
    color: string,
    onClick: Function
    // setChosenOption: Function,
    // targetSlot: number
}) => {
    return (
        <li className={"slot "+color} onClick={() => onClick()}>
            {
                color
            }
        </li>

    )
}
