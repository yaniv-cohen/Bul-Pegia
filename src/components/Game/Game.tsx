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

export const Game = (
    { game, history, chosenOptions, submit, slots,
        allPossibleOptions, setChosenOptions, setChosenOption }: {
            game: GameType,
            history: History,
            chosenOptions: any[],
            submit: Function,
            slots: Array<string[]>,
            allPossibleOptions: any[],
            setChosenOptions: Function, setChosenOption: (arg0: number, arg1: any) => any
        }

) => {

    const [useCheatPanel, setUseCheatPanel] = useState(false);
    const toggleUseCheatPanel = () => {
        setUseCheatPanel(!useCheatPanel);
    };
    return <>
        <MainCard>
            <FlexColumn>
                <GameParagraph game={game} />
                <SubmitButton arr={chosenOptions} func={submit}></SubmitButton>
                <Slots
                    chosenOptions={chosenOptions}
                    slots={slots}
                    setChosenOption={setChosenOption}
                />
                <FlexRow >
                    {slots.map((slot, index) => (
                        <SlotAccordion
                            chosen={chosenOptions[index]}
                            index={index + 1}
                            slot={slot}
                            setChosenOption={setChosenOption}
                            ColorList={COLOR_LIST}
                        ></SlotAccordion>
                    ))}
                </FlexRow>
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
    </>


}