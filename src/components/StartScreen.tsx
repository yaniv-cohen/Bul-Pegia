import { MAX_SLOTS_COUNT, MIN_SLOTS_COUNT } from "../gameSettings"
import OptionsIncrementCard from "./OptionsIncrementCard"
import { StartHeader } from "./StartHeader"

export const StartScreen = (
    slotsCount: number,
    optionsCount: number,
    startGameFunction: Function,
    setSlotsCount: any,
    children: any) => {
    return <> <StartHeader
        optionsCount={optionsCount}
        slotsCount={slotsCount}
        startGameFunction={startGameFunction}
    >
        <OptionsIncrementCard
            optionsCount={optionsCount}
            slotsCount={slotsCount}
            min={MIN_SLOTS_COUNT}
            max={MAX_SLOTS_COUNT}
            func1={setSlotsCount}
        ></OptionsIncrementCard>
    </StartHeader>
        <img
            width="300px"
            src="https://play-lh.googleusercontent.com/AKwkpj-Eq6SgEXu9SlSYO-cMMIIGh62Zqp012IaWmuFOlyM-B_y7BvDfJ9FEtvSWy6s"
        />

    </>



}