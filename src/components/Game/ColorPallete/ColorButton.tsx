
export const ColorButton = ({ color, onClick
}: {
    color: string,
    onClick: Function
}) => {
    return (
        <li className={"slot " + color} onClick={() => onClick()}>
                <span
              key={ color}
              className={
                "color-result " + color
              }
            > 
            </span>
        </li>

    )
}
