import { useState } from "react"
import { GameType } from "../../types/Game"
import { History } from "../../types/historyTypes"
import { COLOR_LIST } from "../../utils/letters"
import CheatPanel from "./CheatPanel/CheatPanel"
import HistoryPanel from "./HistoryPanel/HistoryPanel"
import SlotAccordion from "../SlotAccordion"
import SubmitButton from "../utils/SubmitButton"
import { ToggleButton } from "../utils/ToggleButton"
import { GameParagraph } from "./GameParagraph"
import { FlexColumn } from "../utils/FlexColoumn"
import { MainCard } from "../utils/MainCard"
import { FlexRow } from "../utils/FlexRow"
import { Slots } from "./Slots/Slots"
import { ColorButtonPallete } from "./ColorPallete/ColorButtonPallete"
import { getFirstEmptyIndex } from "../../utils/getFirstEmptyIndex"

export const Game = (
    { game, history, chosenOptions, submit, slots, usedColors,
        allPossibleOptions, setChosenOptions, setChosenOption }: {
            game: GameType,
            history: History,
            chosenOptions: any[],
            submit: Function,
            slots: Array<string[]>,
            usedColors: string[],
            allPossibleOptions: any[],
            setChosenOptions: Function, setChosenOption: (arg0: number, arg1: any) => any
        }

) => {

    const [useCheatPanel, setUseCheatPanel] = useState(false);
    const [targetSlot, setTargetSlot] = useState(0);

    const toggleUseCheatPanel = () => {
        setUseCheatPanel(!useCheatPanel);
    };

    const setOptionByCurrentSlot = (color: string) => {
        setChosenOption(targetSlot, color)
        jumpToNextSlot()
    }


    const jumpToNextSlot = () => {
        const nextEmptySlotIndex = getFirstEmptyIndex(chosenOptions, targetSlot)
        console.log("next empty is " + nextEmptySlotIndex);

        setTargetSlot(nextEmptySlotIndex ?? 0)
    }

    return <main style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <MainCard>
            <ColorButtonPallete colors={usedColors}
                setOptionByCurrentSlot={setOptionByCurrentSlot}
                jumpToNextSlot={jumpToNextSlot}
            />
        </MainCard>
        <MainCard>
            <FlexColumn>
                <GameParagraph game={game} />
                <SubmitButton arr={chosenOptions} func={submit}></SubmitButton>

                <Slots
                    chosenOptions={chosenOptions}
                    slots={slots}
                    setChosenOption={setChosenOption}
                    targetSlot={targetSlot}
                    setTargetSlot={setTargetSlot}
                />
                <HistoryPanel history={history}></HistoryPanel>
            </FlexColumn>
        </MainCard>
        <aside className="CheatPanel">
            <ToggleButton
                text={useCheatPanel ? "X" : "CheatPanel >"}
                fn={toggleUseCheatPanel}
            ></ToggleButton>
            {useCheatPanel ? (
                <CheatPanel
                    setSelection={setChosenOptions}
                    options={allPossibleOptions}
                />
            ) : (
                <></>
            )}
        </aside>
    </main>


}