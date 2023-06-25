import { useState } from "react"

export const Slot = ({ slot, chosen, index, setChosenOption, ColorList }: {
    slot: string[],
    chosen: string,
    index: number,
    setChosenOption: Function,
    ColorList: any[]
}) => {

    const [selfIndex, setSelfIndex] = useState(0)
    const incrementSelfCounter = () => {

        if (selfIndex === ColorList.length) {
            setSelfIndex(0)
        }
        else {
            setSelfIndex(selfIndex + 1)
        }
    }
    return (
        <li onClick={() => {
            incrementSelfCounter()
            setChosenOption(index, ColorList[selfIndex])
        }}>
            {
                slot
            }
        </li>

    )
}