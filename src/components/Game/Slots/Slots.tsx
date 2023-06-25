import { COLOR_LIST } from "../../../utils/letters"
import { Slot } from "./Slot"

export const Slots = ({ slots, setChosenOption, chosenOptions }: {
    slots: Array<string[]>,
    chosenOptions: string[],
    setChosenOption: Function
}) => {
    return (
        <ul>
            {
                slots.map((slot, index) => (
                    <Slot
                        chosen={chosenOptions[index]}
                        index={index}
                        slot={slot}
                        setChosenOption={setChosenOption}
                        ColorList={COLOR_LIST}
                    ></Slot>
                ))
            }
        </ul>

    )
}