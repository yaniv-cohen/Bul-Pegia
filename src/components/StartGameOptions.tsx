import { Button } from "@chakra-ui/react"

export const StartGameOptions = ({
    slotsCount,
    startGameFunction,
    optionsCount,
    setSlotsCount
}: {
    slotsCount: number,
    startGameFunction: Function,
    optionsCount: number,
    setSlotsCount: Function
}) => (
    <div>
        <Button onClick={() => {
            setSlotsCount(slotsCount + 1)
        }}>+</Button>
        <Button onClick={() => {
            setSlotsCount(slotsCount - 1)
        }}>-</Button>
    </div>
)