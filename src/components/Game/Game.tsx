import { useState } from "react";
import { GameState, GameType } from "../../types/Game";
import { History, Result } from "../../types/historyTypes";
import CheatPanel from "./CheatPanel/CheatPanel";
import HistoryPanel from "./HistoryPanel/HistoryPanel";
import SubmitButton from "../utils/SubmitButton";
import { ToggleButton } from "../utils/ToggleButton";
import { GameParagraph } from "./GameParagraph";
import { FlexColumn } from "../utils/FlexColoumn";
import { MainCard } from "../utils/MainCard";
import { Slots } from "./Slots/Slots";
import { ColorButtonPallete } from "./ColorPallete/ColorButtonPallete";
import { getFirstEmptyIndex } from "../../utils/getFirstEmptyIndex";
import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FlexRow } from "../utils/FlexRow";
import { validResult } from "../utils/validResult";

export const Game = ({
  game,
  history,
  chosenOptions,
  submit,
  slots,
  usedColors,
  allPossibleOptions,
  setChosenOptions,
  setChosenOption,
  vsComputer,
}: {
  game: GameType;
  history: History;
  chosenOptions: any[];
  submit: (arr: string[], manualInput?: Result) => void;
  slots: Array<string[]>;
  usedColors: string[];
  allPossibleOptions: any[];
  setChosenOptions: Function;
  setChosenOption: (arg0: number, arg1: any) => any;
  vsComputer: boolean;
}) => {
  const [useCheatPanel, setUseCheatPanel] = useState(false);
  const [targetSlot, setTargetSlot] = useState(0);
  const [manual, setManual] = useState<Result>({ black: 0, white: 0 });

  const toggleUseCheatPanel = () => {
    setUseCheatPanel(!useCheatPanel);
  };

  const setOptionByCurrentSlot = (color: string) => {
    setChosenOption(targetSlot, color);
    jumpToNextSlot();
  };

  const jumpToNextSlot = () => {
    const nextEmptySlotIndex = getFirstEmptyIndex(chosenOptions, targetSlot);
    console.log("next empty is " + nextEmptySlotIndex);
    if (nextEmptySlotIndex === undefined) {
      if (targetSlot >= slots.length - 1) {
        setTargetSlot(0);
      } else {
        setTargetSlot(targetSlot + 1);
      }
    } else {
      setTargetSlot(nextEmptySlotIndex ?? targetSlot + 1);
    }
  };

  return (
    <main style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <MainCard>
        <ToggleButton
          text={useCheatPanel ? "X" : "רמי הרמאי >"}
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
      </MainCard>

      <MainCard>
        <FlexColumn>
          <GameParagraph game={game} />
          <Slots
            chosenOptions={chosenOptions}
            slots={slots}
            setChosenOption={setChosenOption}
            targetSlot={targetSlot}
            setTargetSlot={setTargetSlot}
          />
          <div>
            {vsComputer ? (
              <SubmitButton arr={chosenOptions} func={submit}></SubmitButton>
            ) : (
              <FlexColumn>
                <div>{JSON.stringify(manual)}</div>
                <FlexRow className="spaced-rtl">
                  <label htmlFor="blacks">{"שחורים"}</label>
                  <NumberInput
                    name="blacks"
                    defaultValue={manual.white}
                    value={manual.black}
                    max={slots.length}
                    min={0}
                    keepWithinRange={true}
                    clampValueOnBlur={true}
                    onChange={(valueString) =>
                      setManual({
                        ...manual,
                        black: parseInt(valueString),
                      })
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FlexRow>
                <FlexRow className="spaced-rtl">
                  <label htmlFor="whites">{"לבנים"}</label>
                  <NumberInput
                    name="whites"
                    defaultValue={manual.white}
                    value={manual.white}
                    max={slots.length}
                    min={0}
                    keepWithinRange={true}
                    clampValueOnBlur={true}
                    onChange={(valueString) =>
                      setManual({
                        ...manual,
                        white: parseInt(valueString),
                      })
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FlexRow>
                <SubmitButton
                  arr={chosenOptions}
                  func={() => {
                    if (validResult(manual, slots.length)) {
                      submit(chosenOptions, manual);
                    } else {
                      alert("ניקוד לא חוקי");
                      setManual({ black: 0, white: 0 });
                    }
                  }}
                ></SubmitButton>
              </FlexColumn>
            )}
          </div>
          <HistoryPanel
            setChosenOption={setChosenOption}
            history={history}
          ></HistoryPanel>
        </FlexColumn>
      </MainCard>
      <MainCard>
        <ColorButtonPallete
          colors={usedColors}
          setOptionByCurrentSlot={setOptionByCurrentSlot}
          jumpToNextSlot={jumpToNextSlot}
        />
      </MainCard>
    </main>
  );
};
