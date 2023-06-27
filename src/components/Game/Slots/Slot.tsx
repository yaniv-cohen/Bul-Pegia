
export const Slot = ({ highlighted, slot, index,
    value, setChosenOption, ColorList,
    setTargetSlot,
    jumpToNextSlot }: {
        jumpToNextSlot: () => void,
        setTargetSlot: (arg0: number) => void,
        highlighted: boolean,
        slot: string[],
        value: string,
        index: number,
        setChosenOption: Function,
        ColorList: any[]
    }) => {

    return (
        <li

            className={"slot " + (value ?? "empty-slot") + (highlighted ? " chosen" : "")}
            onClick={() => { 
                setTargetSlot(index)
            }}
        >
            {
                (value ?? "?")
            }
        </li>

    )
}