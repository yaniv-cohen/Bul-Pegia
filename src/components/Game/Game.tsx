import { useState } from "react";
import { GameType } from "../../types/Game";
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
import { validResult } from "../../utils/validResult";
import { Option } from "../StartGame/Options/Option";
import { Circles } from "../utils/Circle/Circles";

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
    <main
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <MainCard>
        <ToggleButton
          text={useCheatPanel ? "הסתר X " : "אלגוריתם חכם >"}
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
              <>
                <FlexColumn>
                  <Option text={`שחורים`} currentValue={manual.black}>
                    <div>
                      <Circles color="black" count={manual.black} />
                      <Button
                        onClick={() => {
                          if (manual.black < slots.length) {
                            const newBlack = manual.black + 1;
                            const maxWhite = slots.length - newBlack;
                            setManual({
                              black: newBlack,
                              white: Math.min(manual.white, maxWhite),
                            });
                          }
                        }}
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => {
                          if (manual.black > 0) {
                            setManual({
                              black: manual.black - 1,
                              white: manual.white,
                            });
                          }
                        }}
                      >
                        -
                      </Button>
                    </div>
                  </Option>

                  <Option text={`לבנים`} currentValue={manual.white}>
                    <div>
                      <Circles color="white" count={manual.white} />
                      <Button
                        onClick={() => {
                          if (manual.white < slots.length) {
                            const newWhite = manual.white + 1;
                            const maxBlack = slots.length - newWhite;
                            setManual({
                              black: Math.min(manual.black, maxBlack),
                              white: newWhite,
                            });
                          }
                        }}
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => {
                          if (manual.white > 0) {
                            setManual({
                              black: manual.black,
                              white: manual.white - 1,
                            });
                          }
                        }}
                      >
                        -
                      </Button>
                    </div>
                  </Option>
                </FlexColumn>
                <FlexColumn>
                  {/* <div>
                    {JSON.stringify(manual)}
                    {JSON.stringify(game)}
                  </div> */}
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
              </>
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
