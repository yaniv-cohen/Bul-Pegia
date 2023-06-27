import { Button } from "@chakra-ui/react"
import { FlexColumn } from "../../utils/FlexColoumn"
import { Option } from "./Option"

export const StartGameOptions = ({
    slotsCount,
    colorsCount,
    incrementSlotsCount,
    incrementColorsCount
}: {
    slotsCount: number,
    colorsCount: number,
    incrementSlotsCount: (arg0: number) => void,
    incrementColorsCount: (arg0: number) => void
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
    </FlexColumn>
)
