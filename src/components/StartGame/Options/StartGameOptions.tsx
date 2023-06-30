import { Button } from "@chakra-ui/react"
import { FlexColumn } from "../../utils/FlexColoumn"
import { Option } from "./Option"

export const StartGameOptions = ({
    slotsCount,
    colorsCount,
    incrementSlotsCount,
    incrementColorsCount,
    allowRepeats,
    toggleAllowRepeats
}: {
    slotsCount: number,
    colorsCount: number,
    incrementSlotsCount: (arg0: number) => void,
    incrementColorsCount: (arg0: number) => void,
    allowRepeats: boolean,
    toggleAllowRepeats: () => void,
}) => (
    <FlexColumn>
        <Option text={`מספר מקומות`} currentValue={slotsCount}>
            <div>
                <Button onClick={() => {
                    incrementSlotsCount(1)
                }}>+</Button>
                <Button onClick={() => {
                    incrementSlotsCount(- 1)
                }}>-</Button>
            </div>
        </Option>
        <Option text={`מספר צבעים`} currentValue={colorsCount}>
            <div>
                <Button onClick={() => {
                    console.log(incrementColorsCount);

                    incrementColorsCount(1)
                }}>+</Button>
                <Button onClick={() => {
                    console.log("minus");

                    incrementColorsCount(-1)
                }}>-</Button>
            </div>
        </Option>
        <Option text={`חזרה על צבעים`} currentValue={allowRepeats ? 'כן' : 'לא'}>
            <div>
                <Button onClick={() => {
                    console.log('toggle to ', !allowRepeats);
                    toggleAllowRepeats()
                }}>Toggle</Button>
            </div>
        </Option>
    </FlexColumn>
)
