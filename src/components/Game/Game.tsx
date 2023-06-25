import { Flex } from "@chakra-ui/react"
import { useState } from "react"
import { GameType } from "../../types/Game"
import { History } from "../../types/historyTypes"
import { COLOR_LIST } from "../../utils/letters"
import CheatPanel from "./CheatPanel/CheatPanel"
import HistoryPanel from "./HistoryPanel/HistoryPanel"
import SlotAccordion from "../SlotAccordion"
import SubmitButton from "../SubmitButton"
import { ToggleButton } from "../utils/ToggleButton"
import { GameParagraph } from "./GameParagraph"

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
        <div>
            <GameParagraph game={game} />
            <HistoryPanel history={history}></HistoryPanel>
            <SubmitButton arr={chosenOptions} func={submit}></SubmitButton>
            <Flex>
                {slots.map((slot, index) => (
                    <SlotAccordion
                        chosen={chosenOptions[index]}
                        index={index + 1}
                        slot={slot}
                        setChosenOption={setChosenOption}
                        ColorList={COLOR_LIST}
                    ></SlotAccordion>
                ))}
            </Flex>
        </div>
                    
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