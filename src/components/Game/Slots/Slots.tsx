import { COLOR_LIST } from "../../../utils/letters"
import { FlexRow } from "../../utils/FlexRow"
import { FlexRowUl } from "../../utils/FlexRowUl"
import { Slot } from "./Slot"

export const Slots = ({ slots, setChosenOption, chosenOptions,
    targetSlot,
    setTargetSlot
}: {
    targetSlot: number,
    setTargetSlot: (arg0: number) => void,

    slots: Array<string[]>,

    chosenOptions: string[],
    setChosenOption: Function
}) => {

    return (
        <FlexRowUl >
            {
                slots.map((slot, index) => (
                    <Slot
                    key={index}
                        setTargetSlot={setTargetSlot}
                        highlighted={index === targetSlot}
                        value={chosenOptions[index]}
                        index={index}
                        slot={slot}
                        jumpToNextSlot={()=>{}}
                        setChosenOption={setChosenOption}
                        ColorList={COLOR_LIST}
                    ></Slot>
                ))
            }
        </FlexRowUl>


    )
}