import { Button } from "@chakra-ui/react"
import { FlexColumn } from "../../utils/FlexColoumn"
import { Option } from "./Option"
import { SwitchRect } from "../../utils/Switch"
export const StartGameOptions = ({
    slotsCount,
    colorsCount,
    maxTurns,
    incrementSlotsCount,
    incrementColorsCount,
    incrementMaxTurns,
    allowRepeats,
    toggleAllowRepeats
}: {
    slotsCount: number,
    colorsCount: number,
    maxTurns:number,
    incrementSlotsCount: (arg0: number) => void,
    incrementColorsCount: (arg0: number) => void,
    incrementMaxTurns: (arg0: number) => void,
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
        <Option text={`מספר ניסיונות:`} currentValue={maxTurns}>
            <div>
                <Button onClick={() => {
                    incrementMaxTurns(1)
                }}>+</Button>
                <Button onClick={() => {
                    incrementMaxTurns(-1)
                }}>-</Button>
            </div>
        </Option>
        <Option text={`חזרה על צבעים`} currentValue={allowRepeats ? 'כן' : 'לא'}>
            <div>
                <SwitchRect value={allowRepeats} toggleFunction={toggleAllowRepeats}></SwitchRect>
            </div>
        </Option>

    </FlexColumn>
)
